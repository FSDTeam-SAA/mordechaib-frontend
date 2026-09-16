import { Building2, CheckCircle2, DollarSign, Rocket, Zap } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$49",
    note: "/mo",
    description: "For solo operators and early-stage businesses.",
    icon: Rocket,
    color: "border-[#5B7FF0]",
    button: "Start Free Trial",
    features: [
      "6 AI Agents",
      "500 AI Actions / month",
      "1,000 CRM Contacts",
      "Unlimited Voice Notes",
      "Core AI Workflows",
      "Standard Support",
      "Advanced ROI Dashboard",
      "1 User",
      "50 AI Voice Minutes / month",
      "Call Recording",
      "Call Summaries",
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
    features: [
      "5,000 AI Actions / month",
      "10,000 CRM Contacts",
      "Unlimited Voice Notes",
      "Advanced ROI Dashboard",
      "5 Users",
      "API Access & Integrations",
      "Priority Support",
      "150 AI Voice Minutes / month",
      "Call Recording",
      "AI Call Summaries",
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
    features: [
      "15,000 AI Actions / month",
      "25,000 CRM Contacts",
      "10 Users",
      "300 AI Voice Minutes / month",
      "Advanced AI Workflows",
      "Private AI Model Options",
      "Dedicated Success Manager",
      "SLA",
      "Priority Integrations",
      "Call Recording",
      "AI Call Summaries",
    ],
  },
  {
    name: "CUSTOM / ORGANIZATION",
    price: "Variable Pricing",
    description: "For organizations that need custom AI systems, integrations, or infrastructure.",
    icon: Zap,
    color: "border-[#A855F7]",
    button: "Contact Sales",
    custom: true,
    features: [
      "Custom AI agent development",
      "Custom integrations",
      "Private dataset training",
      "Dedicated AI engine",
      "Custom SLAs",
      "SLA-backed reliability",
      "Private/hybrid deployment",
      "Industry-specific automations",
      "High-volume AI Actions or call minutes",
      "Engineering pods",
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
                <ul className="mt-6 space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-2 text-base text-normal text-[#0E1224]">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#5BA5E8]" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className={`mt-auto h-12 rounded-lg border border-[#5B7FF0] text-sm font-semibold ${plan.popular ? "bg-[#5B7FF0] text-white" : "text-[#5B7FF0]"}`}>
                  {plan.button}
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
