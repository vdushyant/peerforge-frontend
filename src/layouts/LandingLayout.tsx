import Navbar from "@/sections/landing/Navbar";
import HeroSection from "@/sections/landing/HeroSection";
import Footer from "@/sections/landing/Footer";
import HowItWorksSection from "@/sections/landing/HowItWorksSection";
import StatsSection from "@/sections/landing/StatsSection";
import FeaturedMentorsSection from "@/sections/landing/FeaturedMentorsSection";
import SkillsSection from "@/sections/landing/SkillsSection";
import TestimonialsSection from "@/sections/landing/TestimonialsSection";
import CTASection from "@/sections/landing/CTASection";

export default function LandingLayout() {
  return (
    <>
      <>
        <>
          <>
            <Navbar />

            <HeroSection />

            <StatsSection />

            <HowItWorksSection />

            <SkillsSection />

            <FeaturedMentorsSection />

            <TestimonialsSection />

            <CTASection />

            <Footer />
          </>
        </>
      </>
    </>
  );
}