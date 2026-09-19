import AboutMetrics from "./_components/AboutMetrics";
import AboutHero from "./_components/AboutHero";
import AboutSection from "./_components/AboutSection";
import NoltraAdvantage from "./_components/NoltraAdvantage";
import OurVision from "./_components/OurVision";
import OurMission from "./_components/OurMission";
import OurStory from "./_components/OurStory";
import PolicyQuestions from "@/components/home/PolicyQuestions";

function Page() {
  return (
    <main>
      <AboutHero />
      <AboutMetrics />
      <AboutSection />
      <NoltraAdvantage />
      <OurVision />
      <OurMission />
      <OurStory />
       <PolicyQuestions />
    </main>
  );
}

export default Page;
