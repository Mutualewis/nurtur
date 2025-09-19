import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Users, TrendingUp } from "lucide-react";
import heroImage from "@/assets/hero-family.jpg";

const Hero = () => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5" />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Content */}
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium bg-primary/10 text-primary border-primary/20 mb-8">
              <Sparkles className="mr-1 h-3 w-3" />
              AI-Powered Career Predictions
            </div>

            {/* Main headline */}
            <h1 className="font-poppins text-4xl font-bold tracking-tight lg:text-6xl mb-6">
              Unlock Your Child's
              <span className="text-gradient block">Future Potential</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg lg:text-xl text-muted-foreground mb-10 leading-relaxed">
              From prenatal insights to career guidance, Nurtur combines genetics, psychology, and AI to reveal your
              child's unique path to success.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button
                size="lg"
                className="text-lg px-8 py-6 shadow-primary transition-bounce hover:scale-105"
                onClick={() => window.dispatchEvent(new Event("startAssessment"))}
              >
                Start Free Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                Watch Demo
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-col sm:flex-row items-start gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                <span>50,000+ families trust Nurtur</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span>93% prediction accuracy</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span>Science-backed approach</span>
              </div>
            </div>
          </div>

          {/* Right column - Hero Image */}
          <div className="relative lg:order-last">
            <div className="relative rounded-2xl overflow-hidden shadow-primary">
              <img
                src={heroImage}
                alt="Happy family with child exploring different career possibilities through educational toys and activities"
                className="w-full h-auto object-cover"
              />
              {/* Overlay gradient for better text contrast if needed */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Floating stats cards */}
            <div className="absolute -top-4 -left-4 bg-white rounded-lg p-4 shadow-card border">
              <div className="text-2xl font-bold text-primary">93%</div>
              <div className="text-xs text-muted-foreground">Accuracy Rate</div>
            </div>

            <div className="absolute -bottom-4 -right-4 bg-white rounded-lg p-4 shadow-card border">
              <div className="text-2xl font-bold text-secondary-dark">50K+</div>
              <div className="text-xs text-muted-foreground">Happy Families</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
