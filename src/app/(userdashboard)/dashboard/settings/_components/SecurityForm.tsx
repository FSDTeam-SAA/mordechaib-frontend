"use client";

import { FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const fields = [
  ["currentPassword", "Current Password", "***************"],
  ["newPassword", "New Password", "Enter Password"],
  ["confirmPassword", "Confirm New Password", "Confirm Password"],
] as const;

export function SecurityForm() {
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast.success("Password updated successfully.");
  };

  return (
    <section className="overflow-hidden rounded-lg bg-white">
      <header className="border-b border-[#E4EAF8] p-4">
        <h2 className="text-xl font-medium text-[#0E1224]">Change Password</h2>
      </header>
      <form onSubmit={submit}>
        <div className="space-y-2 p-4">
          {fields.map(([name, label, placeholder]) => (
            <label key={name} className="block">
              <span className="mb-2 block text-base leading-[1.2] text-[#8B93B8]">
                {label}
              </span>
              <Input
                name={name}
                type="password"
                placeholder={placeholder}
                className="h-[51px] rounded-xl border-0 bg-[#F5F7FF] p-4 text-base text-[#0E1224] shadow-none placeholder:text-[#8B93B8] focus-visible:ring-1 focus-visible:ring-[#5B7FF0] md:text-base"
              />
            </label>
          ))}
        </div>
        <footer className="border-t border-[#E4EAF8] p-4">
          <Button
            type="submit"
            className="h-[51px] w-full rounded-[12px] bg-[#5B7FF0] px-8 text-sm font-normal text-white shadow-none hover:bg-[#4E6FDE] sm:w-auto"
          >
            Save Changes
          </Button>
        </footer>
      </form>
    </section>
  );
}
