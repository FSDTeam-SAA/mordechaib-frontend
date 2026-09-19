import PolicyQuestions from "@/components/home/PolicyQuestions";
import TermsContent from "./_components/TermsContent";
import TermsHero from "./_components/TermsHero";

function Page() {
  return (
    <main className="min-h-screen bg-white font-sans text-slate-800 antialiased">
      <TermsHero />
      <TermsContent />
         <PolicyQuestions />
    </main>
  );
}

export default Page;
