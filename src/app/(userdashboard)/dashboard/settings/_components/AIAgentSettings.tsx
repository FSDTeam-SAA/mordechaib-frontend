"use client";

import Image from "next/image";
import { useState } from "react";

const agentPreferences = [
  ["Auto-approve low-risk actions", "Automatically approve simple CRM updates without review"],
  ["AI learning mode", "Let agents learn from your approvals and rejections"],
  ["Agent activity notifications", "Notify me when agents complete tasks"],
] as const;

const responseStyles = ["Professional", "Casual", "concise"] as const;

export function AIAgentSettings() {
  const [enabled, setEnabled] = useState(() => agentPreferences.map(() => true));
  const [responseStyle, setResponseStyle] = useState<(typeof responseStyles)[number]>("Professional");

  return (
    <section className="overflow-hidden rounded-lg bg-white">
      <header className="border-b border-[#E4EAF8] p-4">
        <h2 className="text-xl font-medium text-[#0E1224]">AI Agent Settings</h2>
      </header>

      <div className="space-y-2 p-4">
        {agentPreferences.map(([title, description], index) => (
          <div key={title} className="flex min-h-[62px] items-center justify-between gap-4 py-2">
            <div className="min-w-0">
              <h3 className="text-base font-medium text-[#0E1224]">{title}</h3>
              <p className="mt-1 text-xs text-[#8B93B8]">{description}</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={enabled[index]}
              aria-label={`Toggle ${title}`}
              onClick={() => setEnabled((current) => current.map((value, itemIndex) => itemIndex === index ? !value : value))}
              className={`relative h-8 w-[56px] shrink-0 rounded-full p-1 transition-colors ${enabled[index] ? "bg-[#5B7FF0]" : "bg-[#C6CCE2]"}`}
            >
              <span className={`block size-6 rounded-full bg-white shadow-sm transition-transform ${enabled[index] ? "translate-x-6" : "translate-x-0"}`} />
            </button>
          </div>
        ))}

        <div className="pt-2">
          <h3 className="mb-3 text-base font-medium text-[#0E1224]">AI Response Style</h3>
          <div className="grid gap-3 sm:grid-cols-3" role="radiogroup" aria-label="AI response style">
            {responseStyles.map((style) => {
              const active = responseStyle === style;
              return (
                <button
                  key={style}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setResponseStyle(style)}
                  className={`flex h-12 items-center gap-2 rounded-[8px] border px-3 text-left text-sm transition-colors ${active ? "border-[#5B7FF0] bg-[#5B7FF0]/10 text-[#5B7FF0]" : "border-transparent bg-[#F5F7FF] text-[#0E1224]"}`}
                >
                  <Image src="/settings/ai-settings.svg" alt="" width={20} height={20} unoptimized className="size-5" />
                  <span className="truncate">{style}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
