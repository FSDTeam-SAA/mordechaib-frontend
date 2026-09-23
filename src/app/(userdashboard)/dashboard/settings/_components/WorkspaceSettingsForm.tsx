"use client";

import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { CloudUpload } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const companyFields = [
  ["companyName", "Company Name", "dd compalnu", "text"],
  ["website", "Website (optional)", "https://yourcompany.com", "url"],
  ["industry", "Industry", "Real Estate", "text"],
  ["teamSize", "Team Size", "11-50 employees", "text"],
  ["email", "Email address", "john@acmecorp.com", "email"],
  ["phone", "Phone", "+1 (555) 123-4567", "tel"],
  ["businessHours", "Business hours", "9 :00 Am to 5:00 Pm", "text"],
  ["language", "Language", "English", "text"],
] as const;

const addressFields = [
  ["city", "city", "Washington Dc"],
  ["street", "Street", "82/1 road"],
  ["state", "State", "Washington Dc"],
  ["zipCode", "State zip code", "1234"],
] as const;

const fieldClassName =
  "h-[51px] rounded-xl border-0 bg-[#F5F7FF] p-4 text-base text-[#0E1224] shadow-none focus-visible:ring-1 focus-visible:ring-[#5B7FF0] md:text-base";

export function WorkspaceSettingsForm() {
  const fileInput = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast.success("Workspace settings saved successfully.");
  };

  const selectLogo = (event: ChangeEvent<HTMLInputElement>) => {
    setFileName(event.target.files?.[0]?.name ?? "");
  };

  return (
    <section className="overflow-hidden rounded-lg bg-white">
      <header className="border-b border-[#E4EAF8] p-4">
        <h2 className="text-xl font-medium text-[#0E1224]">Company Details</h2>
      </header>

      <form onSubmit={submit}>
        <div className="p-4">
          <div className="grid gap-4 sm:grid-cols-2">
            {companyFields.map(([name, label, value, type]) => (
              <label key={name} className="min-w-0">
                <span className="mb-2 block text-base leading-[1.2] text-[#8B93B8]">{label}</span>
                <Input name={name} type={type} defaultValue={value} className={fieldClassName} />
              </label>
            ))}
          </div>

          <h3 className="mb-2 mt-3 text-xl font-medium text-[#0E1224]">Service Address</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {addressFields.map(([name, label, value]) => (
              <label key={name} className="min-w-0">
                <span className="mb-2 block text-base leading-[1.2] text-[#8B93B8]">{label}</span>
                <Input name={name} defaultValue={value} className={fieldClassName} />
              </label>
            ))}
          </div>

          <h3 className="mb-4 mt-3 text-xl font-medium text-[#0E1224]">Company Logo</h3>
          <input ref={fileInput} type="file" accept="image/*" onChange={selectLogo} className="sr-only" />
          <button
            type="button"
            onClick={() => fileInput.current?.click()}
            className="flex min-h-[107px] w-full flex-col items-center justify-center gap-2 rounded-xl bg-[#F5F7FF] p-4 text-[#264AFF] outline-none transition-colors hover:bg-[#EEF2FF] focus-visible:ring-2 focus-visible:ring-[#5B7FF0]"
          >
            <CloudUpload className="size-12" strokeWidth={1.15} aria-hidden="true" />
            <span className="max-w-full truncate text-base leading-[1.2]">{fileName || "View File"}</span>
          </button>
        </div>

        <footer className="border-t border-[#E4EAF8] p-4">
          <Button type="submit" className="h-[51px] w-full rounded-[12px] bg-[#5B7FF0] px-8 text-sm font-normal text-white shadow-none hover:bg-[#4E6FDE] sm:w-auto">
            Save Changes
          </Button>
        </footer>
      </form>
    </section>
  );
}
