import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Award, ArrowRight } from "lucide-react";

const AssessmentPreview = () => {
  const sampleQuestions = [
    {
      id: 1,
      category: "Risk Tolerance",
      question: "You have to choose: a safe small prize now, or a chance at a bigger prize later?",
      type: "Decision-based"
    },
    {
      id: 2,
      category: "Leadership",
      question: "You see a group project falling apart — do you step in to organize, or let others handle it?",
      type: "Behavioral"
    },
    {
      id: 3,
      category: "Fairness",
      question: "You're given 10 coins. Do you keep them all, or share with a friend?",
      type: "Ethics-based"
    }
  ];

  return (
    <section id="assessment" className="py-20 lg:py-32">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="font-poppins text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              The <span className="text-gradient">10-Question</span> Assessment
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Gamified questions inspired by Pymetrics that reveal your child's unique personality traits and career potential
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 text-primary" />
                <span>10-15 minutes</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4 text-primary" />
                <span>Ages 8+</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Award className="h-4 w-4 text-primary" />
                <span>Science-backed</span>
              </div>
            </div>
          </div>

          <div className="grid gap-6 mb-12">
            <h3 className="font-poppins text-xl font-semibold text-center mb-6">
              Sample Assessment Questions
            </h3>
            
            {sampleQuestions.map((question, index) => (
              <Card key={question.id} className="shadow-card hover:shadow-primary transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-medium">
                      Question {question.id}
                    </CardTitle>
                    <div className="flex gap-2">
                      <Badge variant="secondary">{question.category}</Badge>
                      <Badge variant="outline">{question.type}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {question.question}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Card className="max-w-md mx-auto shadow-primary border-primary/20">
              <CardContent className="p-8">
                <h3 className="font-poppins text-xl font-semibold mb-4">
                  Ready to discover your child's potential?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Start with our free assessment and get basic insights, or upgrade for detailed analysis.
                </p>
                <Button 
                  size="lg" 
                  className="w-full shadow-primary"
                  onClick={() => window.dispatchEvent(new CustomEvent('startAssessment'))}
                >
                  Start Free Assessment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AssessmentPreview;