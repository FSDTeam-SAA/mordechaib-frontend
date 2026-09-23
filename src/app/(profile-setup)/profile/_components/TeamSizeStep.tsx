import { UserRound, UsersRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { StepLayout } from "./StepLayout";

const choices = ["Just me (solo founder)", "2-10 employees", "11-50 employees", "51-100 employees", "100-199 employees", "200+ employees"];
export function TeamSizeStep({ value, onChange, onBack, onNext }: { value: string; onChange: (value: string) => void; onBack: () => void; onNext: () => void }) {
  return <StepLayout title="How big is your team?" description="We'll customize your workflow features accordingly.">
    <div className="grid gap-2 sm:grid-cols-2" role="radiogroup" aria-label="Team size">{choices.map((label, index) => { const Icon = index === 0 ? UserRound : UsersRound; return <button type="button" role="radio" aria-checked={value === label} onClick={() => onChange(label)} className={cn("flex h-11 items-center gap-3 rounded-md border px-4 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5d7df3]", value === label ? "border-[#6f8df3] bg-[#dfe7ff] text-[#4c70ea]" : "border-transparent bg-[#f4f6fd] text-[#8290b4] hover:border-[#cbd5f8]")} key={label}><Icon className="size-4" />{label}</button>; })}</div>
    <div className="mt-8 flex gap-2"><Button type="button" variant="outline" onClick={onBack} className="h-11 w-24 border-[#1c2538]">Back</Button><Button type="button" onClick={onNext} disabled={!value} className="h-11 flex-1 bg-[#5b7ced] hover:bg-[#496be0]">Continue</Button></div>
  </StepLayout>;
}
