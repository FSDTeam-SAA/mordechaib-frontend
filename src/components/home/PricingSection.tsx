import {
  Building2,
  CalendarDays,
  CheckCircle2,
  DollarSign,
  Mic,
  Phone,
  Rocket,
  Zap,
} from "lucide-react";
import PricingPlanModal from "@/components/home/PricingPlanModal";

const plans = [
  {
    name: "Starter",
    price: "$49",
    note: "/mo",
    description: "For solo operators and early-stage businesses.",
    icon: Rocket,
    color: "border-[#5B7FF0]",
    button: "Start Free Trial",
    groups: [
      {
        title: "Included Monthly Usage",
        items: ["500 AI Actions", "1,000 CRM Contacts", "50 call minutes", "AI Meeting Capture - 10 hours"],
      },
      {
        title: "Core Capabilities",
        items: ["6 AI agents - unlimited voice notes", "Call recording & AI summaries", "Core AI workflows"],
      },
      {
        title: "Support",
        items: ["Standard support - 1 user"],
      },
    ],
  },
  {
    name: "Growth",
    price: "$149",
    note: "/mo",
    description: "For growing teams scaling operations and revenue.",
    icon: Zap,
    color: "border-[#5BA5E8]",
    cardBg:
      "bg-[linear-gradient(135deg,rgba(91,156,213,0.12)_0%,rgba(217,70,239,0.12)_100%)]",
    popular: true,
    button: "Start Free Trial",
    groups: [
      {
        title: "Included Monthly Usage",
        items: ["5,000 AI Actions", "10,000 CRM contacts", "150 call minutes", "AI Meeting Capture - 10 hours"],
      },
      {
        title: "Core Capabilities",
        items: ["6 AI agents - unlimited voice notes", "Call recording & AI summaries", "ROI dashboard / API & integrations"],
      },
      {
        title: "Support",
        items: ["Priority support - 5 users"],
      },
    ],
  },
  {
    name: "Enterprise",
    price: "$349",
    note: "/mo",
    description: "For businesses running AI-driven operations.",
    icon: Building2,
    color: "border-[#F59E0B]",
    button: "Start Free Trial",
    groups: [
      {
        title: "Included Monthly Usage",
        items: ["15,000 AI Actions", "25,000 CRM contacts", "300 call minutes", "AI Meeting Capture - 10 hours"],
      },
      {
        title: "Core Capabilities",
        items: ["10 users / advanced AI workflows", "Private AI model options", "Call recording & AI summaries"],
      },
      {
        title: "Support",
        items: ["Success manager / SLA"],
      },
    ],
  },
  {
    name: "CUSTOM / ORGANIZATION",
    price: "Let's talk",
    description: "Tailored capacity, integrations, and AI.",
    icon: Zap,
    color: "border-[#A855F7]",
    button: "Contact Sales",
    custom: true,
    groups: [
      {
        title: "Tailored Monthly Usage",
        items: ["Custom AI actions & contacts", "Custom call-minute allocation", "AI Meeting Capture - 10 hours+"],
      },
      {
        title: "Custom Solutions",
        items: ["Custom AI agent development", "Private datasets & integrations", "Private / hybrid deployment"],
      },
      {
        title: "Dedicated Partnership",
        items: ["Dedicated AI engineer / custom SLA"],
      },
    ],
  },
];

const PricingSection = () => {
  return (
    <section className=" px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="container mx-auto">
        <div className="mx-auto max-w-[820px] text-center">
          <div className="mb-5 inline-flex items-center gap-1.5 rounded-full bg-[#5B7FF014] px-3 py-1.5 text-xs font-medium text-[#5B7FF0]">
            <DollarSign size={13} />
            Simple Pricing
          </div>
          <h2 className="text-3xl font-bold leading-tight text-[#0E1224] sm:text-4xl lg:text-[46px]">
            Start <span className="text-[#5B7FF0]">Free.</span> Scale When You&apos;re{" "}
            <span className="text-[#5B7FF0]">Ready.</span>
          </h2>
          <p className="mt-4 text-sm text-[#6B6B6B] sm:text-base">
            Enjoy a full 7-day free trial. We&apos;ll only bill your card if you continue after the trial.
          </p>
          <div className="mx-auto mt-7 flex w-full max-w-[330px] rounded-xl bg-[#EEF3FF] p-1">
            <button className="h-11 flex-1 rounded-lg bg-[#5B7FF0] text-sm font-semibold text-white">
              Monthly
            </button>
            <button className="h-11 flex-1 rounded-lg text-sm font-semibold text-[#5B7FF0]">
              Yearly <span className="ml-1 rounded-full bg-[#DDE7FF] px-2 py-1 text-[10px]">2 months free</span>
            </button>
          </div>
        </div>
        
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4 ">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <article
                key={plan.name}
                className={`relative flex rounded-xl border-2 ${plan.color} bg-white p-5 shadow-sm flex-col`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-md bg-[#5B7FF0] px-4 py-1.5 text-xs font-semibold text-white">
                    Most Popular
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5B7FF0] text-white">
                    <Icon size={20} />
                  </span>
                  <h3 className="text-xl font-bold text-[#0E1224]">{plan.name}</h3>
                </div>
                <p className="mt-4 min-h-[42px] text-base  text-[#0E1224]">
                  {plan.description}
                </p>
                <div className="mt-6 border-b pb-6">
                  <span className={plan.custom ? "text-2xl font-bold text-[#0E1224]" : "text-[44px] font-bold leading-none text-[#A567F5]"}>
                    {plan.price}
                  </span>
                  {plan.note && <span className="ml-1 text-sm text-[#7A7A7A]">{plan.note}</span>}
                </div>
                <div className="mt-6 space-y-5">
                  {plan.groups.map((group) => (
                    <div key={group.title}>
                      <h4 className="text-[10px] font-bold uppercase tracking-wide text-[#7A849D]">
                        {group.title}
                      </h4>
                      <ul className="mt-2 space-y-2">
                        {group.items.map((item) => (
                          <li key={item} className="flex gap-2 text-sm leading-relaxed text-[#0E1224]">
                            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#5BA5E8]" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="mt-auto border-t border-[#E5E8F2] pt-4">
                  <p className="text-[18px] font-medium text-[#7A849D]">Communication channels</p>
                  <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2 text-[14px] text-[#596078]">
                    <span className="inline-flex items-center gap-1"><Phone className="h-4 w-4 text-[#D94DCE]" />Calls</span>
                    <span className="inline-flex items-center gap-1"><Mic className="h-4 w-4 text-[#5B7FF0]" />Voice Notes</span>
                    <span className="inline-flex items-center gap-1"><CalendarDays className="h-4 w-4 text-[#5B7FF0]" />Meetings</span>
                  </div>
                </div>

                <PricingPlanModal
                  planName={plan.name}
                  price={plan.price}
                  popular={plan.popular}
                  custom={plan.custom}
                />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
