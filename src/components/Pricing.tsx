import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Crown, Zap } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Freemium",
      price: "Free",
      description: "Perfect for getting started",
      icon: Zap,
      features: [
        "Basic 10-question assessment",
        "3 career matches",
        "Basic personality insights",
        "Limited predictions",
        "Community access"
      ],
      limitations: [
        "No detailed analysis",
        "No prenatal features",
        "No milestone tracking"
      ],
      cta: "Start Free",
      popular: false
    },
    {
      name: "Family Plus",
      price: "$19/month",
      description: "Complete career guidance platform",
      icon: Crown,
      features: [
        "Full psychometric assessment",
        "Unlimited career predictions",
        "Prenatal & postnatal insights",
        "Evolving predictions",
        "Development plans",
        "Milestone tracking",
        "Family profiles (up to 4 children)",
        "Detailed reports & downloads",
        "Priority support",
        "Advanced analytics"
      ],
      limitations: [],
      cta: "Start Premium Trial",
      popular: true
    }
  ];

  return (
    <section id="pricing" className="py-20 lg:py-32 bg-muted/30">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="font-poppins text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Choose Your <span className="text-gradient">Family Plan</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Start free and upgrade when you're ready for complete insights
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative overflow-hidden shadow-card hover:shadow-primary transition-all duration-300 ${
                plan.popular ? 'border-primary ring-2 ring-primary/20 scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-l from-primary to-accent-dark text-white px-4 py-1 text-sm font-medium">
                  <Star className="inline w-3 h-3 mr-1" />
                  Most Popular
                </div>
              )}
              
              <CardHeader className="text-center pb-8 pt-8">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary/10 to-accent/10">
                  <plan.icon className={`h-8 w-8 ${plan.popular ? 'text-primary' : 'text-accent-dark'}`} />
                </div>
                <CardTitle className="text-2xl font-poppins">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gradient">{plan.price}</span>
                  {plan.price !== "Free" && <span className="text-muted-foreground">/month</span>}
                </div>
                <p className="text-muted-foreground mt-2">{plan.description}</p>
              </CardHeader>
              
              <CardContent className="pt-0">
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                  {plan.limitations.map((limitation, limitIndex) => (
                    <li key={limitIndex} className="flex items-start gap-3 opacity-60">
                      <div className="h-5 w-5 shrink-0 mt-0.5 flex items-center justify-center">
                        <div className="h-1 w-3 bg-muted-foreground rounded" />
                      </div>
                      <span className="text-sm text-muted-foreground">{limitation}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'shadow-primary' 
                      : 'variant-outline'
                  }`}
                  variant={plan.popular ? 'default' : 'outline'}
                  size="lg"
                >
                  {plan.cta}
                </Button>
                
                {plan.popular && (
                  <p className="text-center text-xs text-muted-foreground mt-3">
                    30-day money-back guarantee
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Need a plan for schools or counselors?
          </p>
          <Button variant="outline" size="lg">
            Contact Sales
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;