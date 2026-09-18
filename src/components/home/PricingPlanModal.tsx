"use client";

import { useState } from "react";
import { ArrowLeft, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const addOns = [
  {
    id: "meetings",
    title: "AI Meeting Capture - 30 hours",
    price: 32,
    description: "Recommended if you need 11-40 hours total",
  },
  {
    id: "calls",
    title: "Call Minutes - 2,000 minutes",
    price: 40,
    description: "Add only if 150 included minutes are not enough",
  },
  {
    id: "actions",
    title: "AI Actions - 5,000 actions",
    price: 90,
    description: "Optional extra monthly capacity",
  },
] as const;

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

  const basePrice = Number(price.replace(/[^0-9.]/g, "")) || 0;
  // const addOnTotal = addOns.reduce(
    // (total, addOn) => total + (selectedAddOns.includes(addOn.id) ? addOn.price : 0),
    // 0
  // );
  // const monthlyTotal = basePrice + addOnTotal;

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      setStep("configure");
      setSelectedAddOns([]);
    }
  };

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
          className={`mt-5 h-12 rounded-lg border border-[#5B7FF0] text-sm font-semibold transition-colors ${
            popular
              ? "bg-[#5B7FF0] text-white hover:bg-[#4D70DC]"
              : "text-[#5B7FF0] hover:bg-[#EEF3FF]"
          }`}
        >
          {custom ? "Contact Sales" : "Start Free Trial"}
        </button>
      </DialogTrigger>

      <DialogContent className="max-h-[92dvh] w-[calc(100%-24px)] max-w-[540px] overflow-y-auto rounded-xl border-0 bg-white p-4 shadow-2xl sm:w-full sm:p-7">
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
                {custom ? "Custom pricing" : `${price}/month`} · 7-day free trial · 10 meeting hours included
              </p>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-bold text-[#0E1224]">Add optional capacity</h3>
              <p className="mt-1 text-xs leading-relaxed text-[#6B7280] sm:text-sm">
                Select only the capacity you expect to need beyond your plan.
              </p>

              <div className="mt-4 space-y-3">
                {addOns.map((addOn) => {
                  const selected = selectedAddOns.includes(addOn.id);

                  return (
                    <label
                      key={addOn.id}
                      className={`flex cursor-pointer gap-3 rounded-lg border p-4 transition-colors ${
                        selected ? "border-[#5B7FF0] bg-[#F5F7FF]" : "border-[#DFE4F2] bg-white"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={() => toggleAddOn(addOn.id)}
                        className="sr-only"
                      />
                      <span
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
                          selected
                            ? "border-[#5B7FF0] bg-[#5B7FF0] text-white"
                            : "border-[#9AA8C7] bg-white text-transparent"
                        }`}
                      >
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold leading-snug text-[#0E1224]">
                          {addOn.title}
                        </span>
                        <span className="mt-1 block text-xs leading-relaxed text-[#7A849D]">
                          ${addOn.price}/month · {addOn.description}
                        </span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setStep("review")}
              className="mt-6 h-12 w-full rounded-md bg-[#5B7FF0] text-sm font-semibold text-white transition-colors hover:bg-[#4D70DC]"
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
                  <p className="mt-2 text-xs text-[#7A849D]">Begins after the 7-day free trial</p>
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
                    {addOns
                      .filter((addOn) => selectedAddOns.includes(addOn.id))
                      .map((addOn) => (
                        <div key={addOn.id} className="flex justify-between gap-4 text-sm">
                          <span className="text-[#0E1224]">{addOn.title}</span>
                          <span className="shrink-0 font-semibold text-[#7655F6]">${addOn.price}/mo</span>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>

          

            <button
              type="button"
              onClick={() => handleOpenChange(false)}
              className="mt-6 h-12 w-full rounded-md bg-[#5B7FF0] text-sm font-semibold text-white transition-colors hover:bg-[#4D70DC]"
            >
              {custom ? "Contact sales" : "Start 7-day free trial"}
            </button>

            <button
              type="button"
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
