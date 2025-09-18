import { Card, CardContent } from "@/components/ui/card";
import { Baby, Brain, TrendingUp, Users, Shield, Sparkles } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Baby,
      title: "Prenatal Predictions",
      description: "Get early insights into your child's potential using family genetics and psychometric data.",
      color: "text-primary"
    },
    {
      icon: Brain,
      title: "Psychometric Assessment",
      description: "10 gamified questions reveal personality traits, learning styles, and career inclinations.",
      color: "text-accent-dark"
    },
    {
      icon: TrendingUp,
      title: "Evolving Predictions",
      description: "Watch predictions adapt and improve as your child grows and develops new interests.",
      color: "text-secondary-dark"
    },
    {
      icon: Users,
      title: "Family Profiles",
      description: "Track multiple children with personalized development plans for each family member.",
      color: "text-primary"
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your family's data is encrypted and protected with enterprise-grade security.",
      color: "text-accent-dark"
    },
    {
      icon: Sparkles,
      title: "AI-Powered Insights",
      description: "Advanced algorithms combine multiple data points for accurate career guidance.",
      color: "text-secondary-dark"
    }
  ];

  return (
    <section id="features" className="py-20 lg:py-32 bg-muted/30">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="font-poppins text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Everything You Need to Guide Your Child's
            <span className="text-gradient"> Future</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Comprehensive tools and insights designed for modern families
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="group border-0 shadow-card hover:shadow-primary transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8">
                <div className="mb-6">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                </div>
                <h3 className="font-poppins text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;