"use client"
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Clock } from "lucide-react";

function VerifyEmailForm() {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(59);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").slice(0, 6).split("");
    const newOtp = [...otp];
    pasted.forEach((char, i) => {
      if (/^\d$/.test(char)) newOtp[i] = char;
    });
    setOtp(newOtp);
    inputRefs.current[Math.min(pasted.length, 5)]?.focus();
  };

  const handleResend = () => {
    setTimer(59);
    setOtp(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();
    console.log("OTP resent");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("OTP submitted:", otp.join(""));
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Form */}
      <div className="flex w-full items-center justify-center bg-gray-50 px-4 py-10 sm:px-8 sm:py-12 lg:w-1/2">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-7 sm:mb-8">
            <h1 className="mb-2 text-[28px] font-bold text-blue-600 sm:text-4xl">
              Verify Email
            </h1>
            <p className="text-gray-500 text-sm">
              Enter OTP to verify your email address
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            {/* OTP Inputs */}
            <div className="grid grid-cols-6 gap-2 sm:flex sm:gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => { inputRefs.current[index] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className={`h-11 w-full min-w-0 rounded-lg border text-center text-base font-semibold transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 sm:h-12 sm:w-12 sm:text-lg
                    ${digit ? "border-blue-500 text-blue-600" : "border-gray-300 text-gray-900"}`}
                />
              ))}
            </div>

            {/* Timer & Resend */}
            <div className="flex flex-col gap-3 text-sm min-[380px]:flex-row min-[380px]:items-center min-[380px]:justify-between">
              <div className="flex items-center gap-1 text-gray-500">
                <Clock className="w-4 h-4" />
                <span>{formatTime(timer)}</span>
              </div>
              <div className="text-gray-500">
                Didn&apos;t get a code?{" "}
                <button
                  type="button"
                  onClick={handleResend}
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Resend
                </button>
              </div>
            </div>

            {/* Verify Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors shadow-md"
            >
              Verify
            </button>
          </form>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <Image
          width={400}
          height={400}
          src="/images/signinImage.svg"
          alt="Verify email"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default VerifyEmailForm;
