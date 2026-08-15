"use client";

import { useEffect, useState } from "react";
import { Mail, Info } from "lucide-react";

interface Section {
  id: string;
  number: string;
  title: string;
  content: Array<string | { text: string; bullets?: string[] }>;
}

const termsSections: Section[] = [
  {
    id: "section-1",
    number: "1.",
    title: "Introduction",
    content: [
      "Welcome to Noltra.ai. These Terms & Conditions govern your access to and use of our AI-powered business operating system, including all features, AI agents, automation tools, and related services.",
      "By creating an account or using Noltra.ai, you agree to comply with these terms. If you do not agree with any part of these Terms & Conditions, please discontinue use of the platform.",
    ],
  },
  {
    id: "section-2",
    number: "2.",
    title: "User Accounts",
    content: [
      "To access Noltra.ai, you must create an account using accurate and up-to-date information. You are responsible for maintaining the security of your account and for all activities performed under it.",
      {
        text: "As a user, you agree to:",
        bullets: [
          "Provide accurate registration information.",
          "Keep your login credentials secure.",
          "Manage team member access responsibly.",
          "Notify us immediately if you suspect unauthorized access.",
        ],
      },
    ],
  },
  {
    id: "section-3",
    number: "3.",
    title: "Acceptable Use",
    content: [
      {
        text: "Noltra.ai is designed to support legitimate business operations and productivity. Users must use the platform responsibly and in compliance with applicable laws. You agree not to:",
        bullets: [
          "Use the platform for illegal or fraudulent activities.",
          "Upload malicious software or harmful content.",
          "Attempt unauthorized access to any account or system.",
          "Interfere with the platform's security or performance.",
          "Misuse AI-generated content in violation of applicable laws.",
        ],
      },
      "Violation of these rules may result in temporary suspension or permanent termination of your account.",
    ],
  },
  {
    id: "section-4",
    number: "4.",
    title: "AI Services & Responsibilities",
    content: [
      "Noltra.ai uses artificial intelligence to automate workflows, generate insights, summarize conversations, and assist with business operations.",
      "While we continuously improve the accuracy of our AI services, AI-generated recommendations should be treated as guidance rather than professional advice. Users remain responsible for reviewing, verifying, and approving all AI-generated content before making business decisions.",
    ],
  },
  {
    id: "section-5",
    number: "5.",
    title: "Subscription & Billing",
    content: [
      "Certain features require an active subscription. By subscribing to a paid plan, you agree to the applicable pricing and billing terms.",
      {
        text: "Your subscription may include:",
        bullets: [
          "Monthly or annual billing cycles.",
          "Automatic renewal unless cancelled.",
          "Access to premium AI features.",
          "Plan upgrades or downgrades.",
          "Billing history and payment management.",
        ],
      },
      "Failure to complete payments may result in limited access to premium services.",
    ],
  },
  {
    id: "section-6",
    number: "6.",
    title: "Data & Privacy",
    content: [
      "Your privacy and business data are important to us. Information such as contacts, documents, voice recordings, and workflow data is processed only to deliver and improve our services. We apply industry-standard security practices to protect your information and handle all personal data in accordance with our Privacy Policy.",
    ],
  },
  {
    id: "section-7",
    number: "7.",
    title: "Intellectual Property",
    content: [
      "All software, platform design, AI technologies, branding, logos, documentation, and related materials are the exclusive property of Noltra.ai or its licensors.",
      {
        text: "Without prior written permission, you may not:",
        bullets: [
          "Copy or reproduce platform content.",
          "Modify or redistribute our software.",
          "Use Noltra.ai branding or logos commercially.",
          "Create derivative works based on our platform.",
        ],
      },
    ],
  },
  {
    id: "section-8",
    number: "8.",
    title: "Limitation of Liability",
    content: [
      "To the fullest extent permitted by law, Noltra.ai shall not be liable for indirect, incidental, or consequential damages arising from the use of the platform. This includes business interruptions, data loss, missed opportunities, or reliance on AI-generated recommendations. Users remain responsible for evaluating AI outputs before making important business decisions.",
    ],
  },
  {
    id: "section-9",
    number: "9.",
    title: "Changes to These Terms",
    content: [
      "We may update these Terms & Conditions from time to time to reflect platform improvements, legal requirements, or operational changes. Significant updates will be communicated through the platform or by email when appropriate. Continued use of Noltra.ai after changes become effective constitutes acceptance of the updated Terms & Conditions.",
    ],
  },
  {
    id: "section-10",
    number: "10.",
    title: "Contact Information",
    content: [
      "If you have any questions, concerns, or requests regarding these Terms & Conditions, our support team is here to help.",
      {
        text: "Contact Information:",
        bullets: [
          "Email: legal@noltra.ai",
          "Website: www.noltra.ai",
          "Business Hours: Monday – Friday, 9:00 AM – 6:00 PM",
          "Response Time: Within 1–2 business days",
        ],
      },
    ],
  },
];

function TermsAndCondition() {
  const [activeId, setActiveId] = useState<string>("section-1");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      for (const item of termsSections) {
        const element = document.getElementById(item.id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveId(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: "smooth" });
      setActiveId(id);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 antialiased">
      {/* Hero Header Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#D9EBFF] via-[#EEF5FF] to-white pb-14 pt-16 sm:pb-20 sm:pt-24 text-center border-b border-slate-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
            Terms &amp; conditions |{" "}
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Noltra
            </span>
          </h1>
          <p className="mt-3 text-sm sm:text-base font-medium text-slate-400">
            Last update: 29/05/2026
          </p>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column - Table of Contents Sidebar */}
          <aside className="lg:col-span-3">
            <div className="sticky top-24 space-y-8">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-4">
                  Contents
                </h3>
                <nav className="space-y-1">
                  {termsSections.map((item, idx) => {
                    const isActive = activeId === item.id;
                    return (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        onClick={(e) => scrollToSection(e, item.id)}
                        className={`block py-1.5 px-3 text-xs sm:text-sm font-medium rounded-r-md transition-all duration-200 border-l-2 ${
                          isActive
                            ? "border-blue-600 text-blue-600 font-bold bg-blue-50/70"
                            : "border-transparent text-slate-400 hover:text-slate-700 hover:border-slate-300"
                        }`}
                      >
                        {idx + 1}. {item.title}
                      </a>
                    );
                  })}
                </nav>
              </div>

              {/* Sidebar Help Widget */}
              <div className="pt-6 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-900">Need help?</h4>
                <p className="mt-1 text-[11px] leading-relaxed text-slate-400">
                  Questions about these terms? Our legal team is here to assist.
                </p>
              </div>
            </div>
          </aside>

          {/* Right Column - Main Document Content */}
          <main className="lg:col-span-9 space-y-8">
            {/* Top Amber Warning / Summary Callout Box */}
            <div className="rounded-xl bg-[#FFFBEB] border border-[#FDE68A] p-4 sm:p-5 flex items-start gap-3 shadow-xs">
              <div className="rounded-full bg-amber-100 p-1 text-amber-600 shrink-0 mt-0.5">
                <Info size={16} />
              </div>
              <p className="text-xs sm:text-sm text-amber-900 leading-relaxed font-normal">
                <span className="font-bold text-amber-950">Summary:</span> By
                using Noltra, you agree to use the platform lawfully, keep your
                credentials secure, and understand that AI outputs require human
                review. Your data is private — we never train shared models on it.
              </p>
            </div>

            {/* Document Sections */}
            <div className="space-y-10 sm:space-y-12">
              {termsSections.map((sec) => (
                <section
                  key={sec.id}
                  id={sec.id}
                  className="scroll-mt-28 border-b border-slate-100 pb-8 last:border-b-0"
                >
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-3 tracking-tight">
                    {sec.number} {sec.title}
                  </h2>
                  <div className="space-y-3 text-xs sm:text-sm leading-relaxed text-slate-500 font-normal">
                    {sec.content.map((block, i) => {
                      if (typeof block === "string") {
                        return <p key={i}>{block}</p>;
                      }
                      return (
                        <div key={i} className="space-y-2">
                          <p>{block.text}</p>
                          {block.bullets && (
                            <ul className="list-disc pl-5 space-y-1.5 text-slate-500">
                              {block.bullets.map((b, idx) => (
                                <li key={idx}>{b}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>

            {/* Bottom Hero Card Component */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#6366F1] via-[#4F46E5] to-[#3B82F6] text-white p-8 sm:p-14 text-center mt-16 shadow-xl shadow-indigo-500/10">
              {/* Concentric Circle Backdrop Effect */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-20">
                <div className="size-[500px] rounded-full border border-white/40 flex items-center justify-center">
                  <div className="size-[400px] rounded-full border border-white/50 flex items-center justify-center">
                    <div className="size-[300px] rounded-full border border-white/60 flex items-center justify-center">
                      <div className="size-[200px] rounded-full border border-white/70"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative z-10 max-w-lg mx-auto">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
                  Questions about these Terms?
                </h3>
                <p className="text-indigo-100 text-xs sm:text-sm mb-8 font-normal">
                  Our legal team is happy to clarify any section before you sign up.
                </p>

                {/* Hand drawn arrow icon graphic */}
                <div className="relative inline-block">
                  <svg
                    className="absolute -left-12 -top-8 w-10 h-10 text-white/80 hidden sm:block"
                    viewBox="0 0 50 50"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M10 40 Q 25 10 40 30" />
                    <path d="M35 32 L 40 30 L 38 22" />
                  </svg>
                  <a
                    href="mailto:legal@noltra.ai"
                    className="inline-flex items-center gap-2.5 bg-white text-slate-900 hover:bg-slate-50 transition-all duration-200 font-semibold text-xs sm:text-sm px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                  >
                    <Mail className="w-4 h-4 text-slate-700" />
                    <span>legal@noltra.ai</span>
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default TermsAndCondition;
