"use client"
import React, { useState } from "react";
import Image from "next/image";

function ForgotPasswordForm() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle OTP sending logic here
    console.log("OTP sent to:", email);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Form */}
      <div className="flex w-full items-center justify-center bg-gray-50 px-4 py-10 sm:px-8 sm:py-12 lg:w-1/2">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-7 sm:mb-8">
            <h1 className="mb-2 text-[28px] font-bold text-blue-600 sm:text-4xl">
              Forgot Password
            </h1>
            <p className="text-gray-500 text-sm">
              Enter your email to recover your password
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="hello@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Send OTP Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors shadow-md"
            >
              Send OTP
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
          alt="Food distribution"
          className="absolute inset-0 w-full h-full object-contain"
        />
      </div>
    </div>
  );
}

export default ForgotPasswordForm;
