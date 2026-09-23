"use client";

import { useState } from "react";

const preferences = [
  ["Email notifications", "Get notified by email for important events"],
  ["In-app notifications", "Show notifications within the dashboard"],
  ["Agent task completions", "When an AI agent finishes a task"],
  ["Meeting reminders", "Reminders 1 hour before scheduled meetings"],
  ["Weekly ROI report", "Receive your weekly savings summary"],
  ["Product updates & news", "New features and Noltra announcements"],
] as const;

export function NotificationPreferences() {
  const [enabled, setEnabled] = useState(() => preferences.map(() => true));

  return (
    <section className="overflow-hidden rounded-lg bg-white">
      <header className="border-b border-[#E4EAF8] p-4"><h2 className="text-xl font-medium text-[#0E1224]">Notification Preferences</h2></header>
      <div className="px-4 py-4">
        {preferences.map(([title, description], index) => (
          <div key={title} className="flex min-h-[62px] items-center justify-between gap-4 py-3">
            <div className="min-w-0"><h3 className="text-base font-medium text-[#0E1224]">{title}</h3><p className="mt-1 text-xs text-[#8B93B8]">{description}</p></div>
            <button type="button" role="switch" aria-checked={enabled[index]} aria-label={`Toggle ${title}`} onClick={() => setEnabled((current) => current.map((value, itemIndex) => itemIndex === index ? !value : value))} className={`relative h-8 w-[56px] shrink-0 rounded-full p-1 transition-colors ${enabled[index] ? "bg-[#5B7FF0]" : "bg-[#C6CCE2]"}`}><span className={`block size-6 rounded-full bg-white shadow-sm transition-transform ${enabled[index] ? "translate-x-6" : "translate-x-0"}`} /></button>
          </div>
        ))}
      </div>
    </section>
  );
}
