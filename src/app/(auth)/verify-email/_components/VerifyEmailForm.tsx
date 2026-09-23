"use client";

import { ClipboardEvent, FormEvent, KeyboardEvent, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useAuthPanelAnimation } from "@/lib/useAuthPanelAnimation";

const emptyCode = ["", "", "", "", "", ""];

function VerifyEmailForm() {
  const imagePanelRef = useRef<HTMLDivElement>(null);
  const formPanelRef = useRef<HTMLDivElement>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [otp, setOtp] = useState<string[]>(emptyCode);

  useAuthPanelAnimation(imagePanelRef, formPanelRef, "left");

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const nextOtp = [...otp];
    nextOtp[index] = value.slice(-1);
    setOtp(nextOtp);

    if (value && index < otp.length - 1) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const digits = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!digits) return;

    const nextOtp = [...emptyCode];
    digits.split("").forEach((digit, index) => {
      nextOtp[index] = digit;
    });
    setOtp(nextOtp);
    inputRefs.current[Math.min(digits.length, 5)]?.focus();
  };

  const handleResend = () => {
    setOtp([...emptyCode]);
    inputRefs.current[0]?.focus();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fbfbfc] px-4 py-8 sm:px-8 lg:px-12">
      <section className="grid w-full max-w-[1280px] overflow-hidden rounded-[18px] border border-[#e4e5e9] bg-white shadow-[0_3px_12px_rgba(15,23,42,0.12)] md:grid-cols-2">
        <div
          ref={formPanelRef}
          className="flex min-h-[610px] items-center justify-center px-6 py-10 sm:px-12 lg:px-16 xl:px-[78px]"
        >
          <div className="w-full max-w-[390px]">
            <Link
              href="/login"
              className="mb-8 inline-flex items-center gap-2 text-xs font-medium text-[#111526] transition hover:text-[#5f7ff0]"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to sign in
            </Link>

            <div className="mb-7 text-center">
              <Image
                src="/logo.png"
                alt="Noltra.ai"
                width={76}
                height={76}
                priority
                className="mx-auto mb-5 h-auto w-[76px]"
              />
              <h1 className="text-[30px] font-bold leading-tight text-[#111526] sm:text-[34px]">
                Verify your email
              </h1>
              <p className="mt-3 text-sm text-[#4f5363]">
                We sent a 6-digit code to{" "}
                <span className="font-medium text-[#111526]">you@gmail.com</span>
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-6 gap-2.5 sm:gap-3" role="group" aria-label="Verification code">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(element) => {
                      inputRefs.current[index] = element;
                    }}
                    type="text"
                    inputMode="numeric"
                    autoComplete={index === 0 ? "one-time-code" : "off"}
                    maxLength={1}
                    value={digit}
                    onChange={(event) => handleChange(index, event.target.value)}
                    onKeyDown={(event) => handleKeyDown(index, event)}
                    onPaste={handlePaste}
                    aria-label={`Digit ${index + 1}`}
                    className="aspect-square w-full min-w-0 rounded-lg border border-transparent bg-[#f4f6fd] text-center text-base font-medium text-[#5f7ff0] outline-none transition focus:border-[#5f7ff0] focus:bg-white focus:ring-2 focus:ring-[#5f7ff0]/15"
                    required
                  />
                ))}
              </div>

              <div className="mt-4 text-center text-xs text-[#8B93B8]">
                Didn&apos;t receive it?{" "}
                <button
                  type="button"
                  onClick={handleResend}
                  className="font-semibold text-[#111526] transition hover:text-[#5f7ff0]"
                >
                  Resend code
                </button>
              </div>

              <button
                type="submit"
                disabled={otp.some((digit) => !digit)}
                className="mt-8 flex h-11 w-full items-center justify-center rounded-lg bg-[#5f7ff0] px-4 text-sm font-medium text-white transition hover:bg-[#526fdb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5f7ff0] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Verify email
              </button>
            </form>
          </div>
        </div>

        <div
          ref={imagePanelRef}
          className="relative hidden min-h-[610px] overflow-hidden bg-[#6080f2] md:block"
        >
          <Image
            src="/auth.png"
            alt="Noltra AI product benefits"
            fill
            priority
            sizes="(min-width: 768px) 50vw, 0px"
            className="object-cover"
          />
        </div>
      </section>
    </main>
  );
}

export default VerifyEmailForm;
