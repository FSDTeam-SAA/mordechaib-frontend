"use client";

import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { checkoutRequest, startCheckout, type CheckoutPlan, type CheckoutAddon } from "@/lib/checkout-api";
import { ArrowLeft } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type PricingPlanModalProps = {
  planName: string;
  price: string;
  popular?: boolean;
  custom?: boolean;
};

const PricingPlanModal = ({
  planName,
  price,
  popular = false,
  custom = false,
}: PricingPlanModalProps) => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"configure" | "review">("configure");
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  const { data: session, status } = useSession();
  const [pending, setPending] = useState(false);
  const inFlight = useRef(false);
  const catalog = useQuery({
    queryKey: ["trial-subscription-plans"], enabled: open && !custom, retry: false,
    queryFn: ({ signal }) => checkoutRequest<CheckoutPlan[]>("/subscription-plans?billingCycle=month", { signal }),
  });
  const addonsQuery = useQuery({
    queryKey: ["trial-addon-products"], enabled: open, retry: false,
    queryFn: ({ signal }) => checkoutRequest<CheckoutAddon[]>("/addon-products", { signal }),
  });
  const addOnGroups = (addonsQuery.data ?? []).map(product => ({
    id: product._id, title: product.name, description: product.description,
    inquiryOnly: product.isInquiryOnly,
    options: product.tiers.map((tier, tierIndex) => ({
      id: `${product._id}:${tierIndex}`, title: tier.label,
      price: product.isInquiryOnly ? null : tier.priceUsd,
    })),
  }));
  const plan = catalog.data?.find(item => item.planType === planName.toUpperCase());
  const basePrice = plan?.priceUsd ?? (Number(price.replace(/[^0-9.]/g, "")) || 0);
  const trialDays = plan?.trialDays ?? 7;
  const handleOpenChange = (nextOpen: boolean) => {
    if (inFlight.current) return;
    setOpen(nextOpen);
    if (!nextOpen) { setStep("configure"); setSelectedAddOns([]); }
  };
  async function handleCheckout() {
    if (inFlight.current) return;
    if (!session?.user?.accessToken) { toast.error("Please sign in before starting your trial."); return; }
    if (!plan || plan.isInquiryOnly || custom) { toast.error("This plan requires contacting sales."); return; }
    if (selectedAddOns.length && (addonsQuery.isFetching || addonsQuery.error)) {
      toast.error("Please reload the add-ons before checking out."); return;
    }
    inFlight.current = true;
    setPending(true);
    try {
      const url = await startCheckout(plan._id, selectedAddOns, addonsQuery.data ?? [], window.location.origin, session.user.accessToken);
      window.location.assign(url);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to start checkout. Please try again.");
      inFlight.current = false;
      setPending(false);
    }
  }

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button
          type="button"
          className={`mt-5 h-12 rounded-[8px] border border-[#5B7FF0] text-sm font-semibold transition-colors ${
            popular
              ? "bg-[#5B7FF0] text-white hover:bg-[#4D70DC]"
              : "text-[#5B7FF0] hover:bg-[#EEF3FF]"
          }`}
        >
          {custom ? "Contact Sales" : "Start Free Trial"}
        </button>
      </DialogTrigger>

      <DialogContent
        data-lenis-prevent
        className="max-h-[92dvh] w-[calc(100%-24px)] max-w-[680px] touch-pan-y overflow-y-auto overscroll-contain rounded-xl border-0 bg-white p-4 shadow-2xl [scrollbar-width:thin] [scrollbar-color:#B8C4EE_transparent] sm:p-7 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#B8C4EE] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:w-1.5"
      >
        {step === "configure" ? (
          <>
            <DialogHeader className="pr-8 text-left">
              <div className="flex items-start gap-3">
              
                <div>
                  <DialogTitle className="text-xl font-bold text-[#0E1224] sm:text-2xl">
                    Configure your plan
                  </DialogTitle>
                  <DialogDescription className="mt-1 text-xs leading-relaxed text-[#6B7280] sm:text-sm">
                    Your base subscription is selected first. Add-ons are optional.
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <div className="mt-3 rounded-lg border border-[#AFC1FF] bg-[#F2F5FF] p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="font-semibold text-[#0E1224]">{planName} plan</p>
                <button
                  type="button"
                  onClick={() => handleOpenChange(false)}
                  className="text-xs font-semibold text-[#5B7FF0]"
                >
                  Change
                </button>
              </div>
              <p className="mt-1 text-xs text-[#596078]">
                {custom ? "Custom pricing" : plan ? `$${basePrice}/month` : price} · {trialDays}-day free trial · {plan?.meetingHoursPerMonth ?? "—"} meeting hours included
              </p>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-bold text-[#0E1224]">Add optional capacity</h3>
              <p className="mt-1 text-xs leading-relaxed text-[#6B7280] sm:text-sm">
                Select only the capacity you expect to need beyond your plan.
              </p>

              <div className="mt-4 space-y-4">
                {!custom && catalog.isPending && <p role="status" className="text-sm text-[#7A849D]">Loading subscription plan…</p>}
                {!custom && catalog.error && <p role="alert" className="text-sm text-red-500">{catalog.error.message} <button type="button" onClick={() => void catalog.refetch()} className="underline">Try again</button></p>}
                {!custom && catalog.data && !plan && <p role="alert" className="text-sm text-red-500">This plan is currently unavailable.</p>}
                {addonsQuery.isPending && <p role="status" className="text-sm text-[#7A849D]">Loading add-ons…</p>}
                {addonsQuery.error && <p role="alert" className="text-sm text-red-500">{addonsQuery.error.message} <button type="button" onClick={() => void addonsQuery.refetch()} className="underline">Try again</button></p>}
                {!addonsQuery.isPending && !addonsQuery.error && !addOnGroups.length && <p className="text-sm text-[#7A849D]">No add-ons available. You can continue with the base plan.</p>}
                {addOnGroups.map((group) => {
                  const selected = group.options.some((option) =>
                    selectedAddOns.includes(option.id)
                  );
                  return (
                    <div
                      key={group.id}
                      className={`rounded-lg border p-4 transition-colors ${selected ? "border-[#5B7FF0] bg-[#F5F7FF]" : "border-[#DFE4F2] bg-white"}`}
                    >
                      <p className="text-sm font-semibold text-[#0E1224]">{group.title}</p>
                      <p className="mt-1 text-xs leading-relaxed text-[#7A849D]">
                        {group.description}
                      </p>
                      <div className="mt-3 space-y-2">
                        {group.options.map((option) => (
                          <label key={option.id} className="flex cursor-pointer items-center gap-3 text-xs text-[#596078] sm:text-sm">
                            <input
                              type="checkbox"
                              disabled={group.inquiryOnly || addonsQuery.isFetching || Boolean(addonsQuery.error)}
                              checked={selectedAddOns.includes(option.id)}
                              onChange={() => toggleAddOn(option.id)}
                              className="h-4 w-4 shrink-0 accent-[#5B7FF0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B7FF0]"
                            />
                            <span>
                              {option.title}
                              {option.price !== null && ` — $${option.price}/month`}
                            </span>
                          </label>
                        ))}
                      </div>
                      {group.inquiryOnly && <p className="ml-7 mt-3 text-xs font-medium text-[#5B7FF0]">Contact sales for pricing</p>}
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              disabled={!custom && (catalog.isPending || Boolean(catalog.error) || !plan)}
              onClick={() => setStep("review")}
              className="mt-6 h-12 w-full rounded-[12px] bg-[#5B7FF0] text-sm font-semibold text-white transition-colors hover:bg-[#4D70DC]"
            >
              Continue to review
            </button>
            <p className="mt-3 text-center text-xs text-[#7A849D]">
              No add-on selected? Continue with the base plan only.
            </p>
          </>
        ) : (
          <>
            <DialogHeader className="pr-8 text-left">
              <div className="flex items-start gap-3">
             
                <div>
                  <DialogTitle className="text-xl font-bold text-[#0E1224] sm:text-2xl">
                    Review and start trial
                  </DialogTitle>
                  <DialogDescription className="mt-1 text-xs leading-relaxed text-[#6B7280] sm:text-sm">
                    Review your plan, costs, and trial terms before confirmation.
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <div className="mt-3">
              <p className="text-[11px] font-bold uppercase text-[#64708D]">Your plan</p>
              <div className="mt-3 flex items-start justify-between gap-4 rounded-lg bg-[#F7F8FC] p-4">
                <div>
                  <p className="font-semibold text-[#0E1224]">{planName}</p>
                  <p className="mt-2 text-xs text-[#7A849D]">Begins after the {trialDays}-day free trial</p>
                </div>
                <p className="shrink-0 text-xl font-bold text-[#7655F6]">
                  {custom ? "Custom" : `$${basePrice}/month`}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-[11px] font-bold uppercase text-[#64708D]">Optional add-ons</p>
              <div className="mt-3 rounded-lg bg-[#F7F8FC] p-4">
                {selectedAddOns.length === 0 ? (
                  <>
                    <p className="text-sm font-semibold text-[#0E1224]">No add-ons selected</p>
                    <p className="mt-2 text-xs text-[#7A849D]">
                      You can add capacity later from Billing & Usage.
                    </p>
                  </>
                ) : (
                  <div className="space-y-3">
                    {addOnGroups
                      .filter((group) =>
                        group.options.some((option) => selectedAddOns.includes(option.id))
                      )
                      .map((group) => (
                        <div key={group.id} className="text-sm">
                          <p className="font-semibold text-[#0E1224]">{group.title}</p>
                          <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-[#596078]">
                            {group.options
                              .filter((option) => selectedAddOns.includes(option.id))
                              .map((option) => (
                                <li key={option.id}>
                                  {option.title}
                                  {option.price !== null && ` — $${option.price}/month`}
                                </li>
                              ))}
                          </ul>
                          <p className="mt-2 text-xs text-[#7A849D]">
                            {group.inquiryOnly ? "Contact sales for pricing" : "Selected capacity included in checkout."}
                          </p>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>

          

            <button
              type="button"
              disabled={pending || status === "loading" || (!custom && (!plan || Boolean(catalog.error)))}
              onClick={() => custom ? handleOpenChange(false) : void handleCheckout()}
              className="mt-6 h-12 w-full rounded-[12px] bg-[#5B7FF0] text-sm font-semibold text-white transition-colors hover:bg-[#4D70DC]"
            >
              {pending ? "Opening checkout…" : custom ? "Contact sales" : trialDays > 0 ? `Start ${trialDays}-day free trial` : "Continue to checkout"}
            </button>

            <button
              type="button"
              disabled={pending}
              onClick={() => setStep("configure")}
              className="mx-auto mt-1 inline-flex items-center gap-1 text-xs font-semibold text-[#5B7FF0]"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to add-ons
            </button>

            <div className="mt-2 border-t border-[#E1E5EF] pt-5">
              <p className="text-[11px] font-bold uppercase text-[#64708D]">After you subscribe</p>
              <p className="mt-2 text-sm leading-relaxed text-[#7A849D]">
                Billing & Usage lets you purchase or update add-ons at any time.
              </p>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PricingPlanModal;
