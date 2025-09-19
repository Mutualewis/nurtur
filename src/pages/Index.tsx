import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import AssessmentPreview from "@/components/AssessmentPreview";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";
import AssessmentFlow from "@/components/AssessmentFlow";

const Index = () => {
  const [showAssessment, setShowAssessment] = useState(false);

  useEffect(() => {
    const handleStartAssessment = () => {
      setShowAssessment(true);
    };

    window.addEventListener("startAssessment", handleStartAssessment);
    return () => window.removeEventListener("startAssessment", handleStartAssessment);
  }, []);

  if (showAssessment) {
    return <AssessmentFlow onClose={() => setShowAssessment(false)} />;
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Features />
        <AssessmentPreview />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
