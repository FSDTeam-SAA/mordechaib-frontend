import { CheckCircle2, Mic, Rocket, Workflow } from "lucide-react";

const addOns = [
  {
    title: "AI Actions Packs",
    icon: Workflow,
    color: "border-[#5B7FF0]",
    iconBg: "bg-[#5B7FF0]",
    text: "text-[#5B7FF0]",
    items: ["1,000 Ai Actions - $25", "5000 Ai Actions - $90", "10,000 Ai Actions - $300"],
  },
  {
    title: "AI Voice Minutes Packs",
    icon: Mic,
    color: "border-[#D94DCE]",
    iconBg: "bg-[#D94DCE]",
    text: "text-[#D94DCE]",
    items: ["500 Voice Minutes - $12", "2000 Voice Minutes - $40", "10,000 Voice Minutes - $180"],
  },
  {
    title: "Operations Booster Pack",
    icon: Rocket,
    color: "border-[#F59E0B]",
    iconBg: "bg-[#F59E0B]",
    text: "text-[#F59E0B]",
    items: ["+10,000 Ai Actions", "+1,000 Voice Minutes", "Priority Support"],
  },
];

const AddOnsSection = () => {
  return (
    <section className="bg-[linear-gradient(135deg,rgba(91,156,213,0.06)_0%,rgba(217,70,239,0.06)_100%)] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="container mx-auto">
        <div className="flex items-center gap-8">
          <div className="h-px flex-1 bg-[#DDE3F5]" />
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-wide text-[#0E1224] sm:text-4xl lg:text-[44px]">
              ADD - ONS
            </h2>
            <p className="mt-4 text-sm text-[#6B6B6B] sm:text-base">
              Enhance your plan with additional usage packs
            </p>
          </div>
          <div className="h-px flex-1 bg-[#DDE3F5]" />
        </div>

        <div className="mx-auto mt-10 grid max-w-[960px] gap-5 md:grid-cols-3">
          {addOns.map((addOn) => {
            const Icon = addOn.icon;

            return (
              <article
                key={addOn.title}
                className={`rounded-xl border-2 ${addOn.color} bg-white/55 p-4 shadow-sm backdrop-blur`}
              >
                <div className="flex items-center gap-3 border-b border-[#E5E8F2] pb-4">
                  <span className={`flex h-10 w-10 items-center justify-center rounded-full text-white ${addOn.iconBg}`}>
                    <Icon size={20} />
                  </span>
                  <h3 className="text-xl font-bold text-[#0E1224]">{addOn.title}</h3>
                </div>

                <ul className="mt-5 space-y-4">
                  {addOn.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-[#0E1224]">
                      <CheckCircle2 className={`h-4 w-4 shrink-0 ${addOn.text}`} />
                      {item}
                    </li>
                  ))}
                </ul>

                <button className={`mt-7 h-11 w-full rounded-md border text-sm font-medium ${addOn.color} ${addOn.text}`}>
                  Add To Plan
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AddOnsSection;
