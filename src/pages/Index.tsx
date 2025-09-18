import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import AssessmentPreview from "@/components/AssessmentPreview";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";

const Index = () => {
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
