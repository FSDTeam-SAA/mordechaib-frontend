import Image from "next/image";
import { Bot, CheckCircle2, Mic, TrendingUp } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Leave a Voice Note",
    lead: "Tell Noltra what you need.",
    text: "Follow up with John tomorrow, update his CRM, and schedule a meeting for next week.",
    icon: Mic,
  },
  {
    number: "02",
    title: "Noltra Executes",
    lead: "Your AI Chief of Staff gets to work.",
    text: "It creates tasks, updates your CRM, sends follow-ups, schedules meetings, and routes work to the right AI agent.",
    icon: Bot,
  },
  {
    number: "03",
    title: "Record Your Calls",
    lead: "Let Noltra listen to the conversation.",
    text: "Noltra captures important details from client calls or meetings and lists what needs to happen next.",
    icon: CheckCircle2,
  },
  {
    number: "04",
    title: "Your AI Chief of Staff Takes Over",
    lead: "Turn the conversation into execution.",
    text: "Tasks are created, follow-ups are scheduled, CRM records are updated, and your team knows exactly what needs to happen.",
    icon: TrendingUp,
  },
];

const moduleItems = [
  {
    title: "Voice Note",
    text: "Follow up with Sarah about the proposal.",
    icon: Mic,
  },
  {
    title: "Client Steps",
    text: "Extract next steps and commitments.",
    icon: Bot,
  },
  {
    title: "Execution",
    text: "Create tasks, update CRM and follow up.",
    icon: CheckCircle2,
  },
  {
    title: "Daily Brief",
    text: "Here's what happened and what's next.",
    icon: TrendingUp,
  },
];

const HowItWorks = () => {
  return (
    <section className="overflow-hidden bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-14">
      <div className="container mx-auto">
        <div className="mx-auto w-full text-center">
          <div className="mb-5 inline-flex items-center gap-1.5 rounded-full bg-[#5B7FF014] px-3 py-1.5 text-xs font-medium text-[#5B7FF0]">
            <Bot size={13} />
            How It Works
          </div>

          <h2 className="text-3xl font-bold leading-tight text-[#0E1224] sm:text-4xl lg:text-[48px]">
            Talk to Noltra. It Turns{" "}
            <span className="text-[#5B7FF0]">Conversations Into Execution.</span>
          </h2>

          <p className="mx-auto mt-4 max-w-[780px] text-sm leading-relaxed text-[#6B6B6B] sm:text-base">
            Leave a voice note, finish a client call, or record a meeting. Noltra
            understands what happened and turns it into work.
          </p>
        </div>

        <div className="mt-12 grid items-center gap-10 lg:mt-16 lg:grid-cols-[0.95fr_1fr] lg:gap-16 ">
          <div className="mx-auto w-full ">
            <div className="relative">
              <div className="relative aspect-[1.15/1] overflow-hidden rounded-xl bg-[#F4F7FF] shadow-sm lg:h-[640px] lg:aspect-auto">
                <Image
                  src="/howitwork.png"
                  alt="Noltra execution workspace"
                  fill
                  sizes="(min-width: 1024px) 46vw, 100vw"
                  className="object-cover object-left"
                />
              </div>

              <div className="absolute -bottom-8 right-4 w-[365px] rounded-xl border border-[#E7E9F2] bg-white p-5 shadow-[0_16px_44px_rgba(14,18,36,0.12)] sm:right-[-78px]">
                <h3 className="text-2xl font-midium text-[#0E1224]">Execution Module</h3>
                <div className="mt-4 space-y-3">
                  {moduleItems.map((item) => {
                    const Icon = item.icon;

                    return (
                      <div key={item.title} className="flex gap-3">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#FCE8FF] text-[#D946EF1A]">
                          <Icon size={15} className="text-[#D24FC7]" />
                        </span>
                        <div>
                          <p className="text-base font-medium leading-tight text-[#0E1224]">
                            {item.title}
                          </p>
                          <p className="mt-1 text-sm  text-[#0E1224]">
                            {item.text}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <p className="mt-20 text-2xl font-medium text-[#5B7FF0]">
              You talk. Noltra listens. Noltra executes.
            </p>
          </div>

          <div className="mx-auto w-full max-w-[680px]">
            <div className=" ">
              {steps.map((step) => {
                const Icon = step.icon;

                return (
                  <div
                    key={step.number}
                    className="relative mb-3 bg-white px-5 py-3 last:mb-0 sm:px-7 shadow-md border-l border-[#A9B8F8]"
                  >
                    <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-md bg-[#FCE8FF] text-[#E84BD9] sm:right-6">
                      <Icon size={20} />
                    </span>
                    <p className="text-[32px] font-bold leading-none text-[#5B7FF0]">
                      {step.number}
                    </p>
                    <h3 className="mt-3 pr-12 text-2xl font-semibold text-[#0E1224]">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm font-normal text-[#0E1224]">
                      {step.lead}
                    </p>
                    <p className="mt-2 font-normal text-14 leading-relaxed text-[#0E1224]">
                      {step.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
