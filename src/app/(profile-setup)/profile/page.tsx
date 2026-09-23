"use client";

import { useState } from "react";
import { toast } from "sonner";
import { CompanyDetailsStep } from "./_components/CompanyDetailsStep";
import { CompleteStep } from "./_components/CompleteStep";
import { IndustryStep } from "./_components/IndustryStep";
import { ProfileProgress } from "./_components/ProfileProgress";
import { TeamSizeStep } from "./_components/TeamSizeStep";
import type { ProfileFormData } from "./_components/types";

const initialData: ProfileFormData = { companyName: "", website: "", phone: "", businessHours: "", city: "", street: "", state: "", zipCode: "", industry: "", teamSize: "" };

export default function ProfilePage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialData);
  const update = (data: Partial<ProfileFormData>) => setFormData((current) => ({ ...current, ...data }));
  const next = () => setStep((current) => Math.min(current + 1, 4));
  const back = () => setStep((current) => Math.max(current - 1, 1));

  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#fffaff_0%,#f6f8ff_55%,#eef2ff_100%)] px-4 py-8 text-[#101427] sm:px-6 sm:py-12 lg:py-16">
      <div className="mx-auto w-full max-w-6xl">
        <ProfileProgress currentStep={step} />
        <div className="mx-auto mt-8 max-w-5xl sm:mt-11">
          {step === 1 && <CompanyDetailsStep data={formData} onChange={update} onNext={next} />}
          {step === 2 && <IndustryStep value={formData.industry} onChange={(industry) => update({ industry })} onBack={back} onNext={next} />}
          {step === 3 && <TeamSizeStep value={formData.teamSize} onChange={(teamSize) => update({ teamSize })} onBack={back} onNext={next} />}
          {step === 4 && <CompleteStep onBack={back} onComplete={() => toast.success("Your business profile is ready.")} />}
        </div>
      </div>
    </main>
  );
}
