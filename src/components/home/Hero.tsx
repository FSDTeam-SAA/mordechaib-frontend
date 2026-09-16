import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays,  CircleCheck, Sparkles,  } from "lucide-react";

const Hero = () => {
  const points = [
    { lead: "conversation", text: "becomes action." },
    { lead: "action", text: "becomes progress." },
    { lead: "CEO", text: "becomes more efficient." },
  ];

  return (
    <section
      className="relative min-h-screen overflow-hidden bg-cover bg-center bg-no-repeat px-4 pb-12 pt-28 sm:px-6 lg:px-8 lg:pb-20 lg:pt-36"
      style={{ backgroundImage: "url('/herobg.png')" }}
    >
      <div className="container mx-auto grid items-center gap-10 lg:grid-cols-[1.05fr_0.85fr]">
        <div className="max-w-[800px]">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-[#5B7FF01A] px-3 py-2 text-[14px] font-medium text-[#5B7FF0]">
            <Sparkles size={13} />
            AI Workforce Operating System for Small Businesses
          </div>

          <h1 className="text-4xl font-bold !leading-[1.2] tracking-normal text-[#0E1224] sm:text-5xl lg:text-[44px] xl:text-[60px]">
            Operate With the{" "}
            <span className="text-[#5B7FF0]">Efficiency of a World Class CEO</span>{" "}
            Automatically
          </h1>

          <p className="mt-4 w-full font-normal text-sm leading-relaxed text-[#6B6B6B] sm:text-xl">
            After every client call, simply record a quick voice note. Your AI Chief of
            Staff instantly understands the conversation, turns it into structured
            execution, updates your CRM, schedules meetings, follows up with clients,
            and keeps your entire business moving without you needing to manage the
            details.
          </p>

          <div className="mt-4 space-y-3">
            {points.map((point) => (
              <div key={point.lead} className="flex items-center gap-3 text-base font-medium text-[#6B6B6B]">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ">
                  <CircleCheck className="text-[#5B7FF0]"  />
                </span>
                <span>
                  Every <span className="text-[#5B7FF0]">{point.lead}</span> {point.text}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-4 relative">
            <Link
              href="#trial"
              className="inline-flex h-12 items-center gap-2 rounded-md bg-[#5B7FF0] px-6 text-base font-semibold text-white shadow-sm"
            >
              Start Free Trial
              <ArrowRight size={15} />
            </Link>
            <Link
              href="#meeting"
              className="inline-flex h-10 items-center gap-2 rounded-md px-1 text-base font-medium text-[#5B7FF0]"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#5B7FF0] bg-white ">
                <CalendarDays size={20} />
              </span>
              Book A Meeting
            </Link>
            <Image
              src="/sinature.png"
              alt="AI workforce dashboard"
              width={1000}
              height={1000}
              priority
              className="w-[212px] h-[50px] object-cover  absolute bottom-[-40px] left-[280px]"
            />
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[760px] lg:mx-0 lg:max-w-none">
          <Image
            src="/hero_image.png"
            alt="AI workforce dashboard"
            width={1000}
            height={1000}
            priority
            className="w-full "
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
