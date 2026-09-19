import PolicyQuestions from "@/components/home/PolicyQuestions";
import PrivacyContent from "./_components/PrivacyContent";
import PrivacyHero from "./_components/PrivacyHero";

function Page() {
  return (
    <main className="min-h-screen bg-white font-sans text-slate-800 antialiased">
      <PrivacyHero />
      <PrivacyContent />
       <PolicyQuestions />
    </main>
  );
}

export default Page;
