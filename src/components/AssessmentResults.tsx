import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, Download, Trophy, Target } from "lucide-react";

interface AssessmentResultsProps {
  results: {
    answers: Record<number, number>;
    traits: Record<string, number>;
    completedAt: string;
  };
  onRestart: () => void;
}

const AssessmentResults = ({ results, onRestart }: AssessmentResultsProps) => {
  // Calculate top traits
  const sortedTraits = Object.entries(results.traits)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

  const topTrait = sortedTraits[0];
  const maxScore = Math.max(...Object.values(results.traits));

  // Career suggestions based on top traits
  const getCareerSuggestions = (trait: string) => {
    const careerMap: Record<string, string[]> = {
      "natural-leader": ["Project Manager", "CEO", "Team Lead", "Director"],
      "analytical": ["Data Scientist", "Engineer", "Researcher", "Analyst"],
      "creative": ["Designer", "Artist", "Writer", "Architect"],
      "innovative": ["Entrepreneur", "Inventor", "Product Manager", "Consultant"],
      "fair-minded": ["Judge", "HR Manager", "Mediator", "Social Worker"],
      "pressure-positive": ["Surgeon", "Pilot", "Emergency Responder", "Athlete"],
      "social-learner": ["Teacher", "Trainer", "Coach", "Counselor"],
      "methodical": ["Accountant", "Quality Assurance", "Planner", "Auditor"],
      "independent": ["Freelancer", "Researcher", "Writer", "Programmer"],
      "extrovert": ["Sales", "Marketing", "Public Relations", "Event Planning"]
    };
    
    return careerMap[trait] || ["Explore various fields", "Consider interdisciplinary roles"];
  };

  const suggestions = topTrait ? getCareerSuggestions(topTrait[0]) : [];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Trophy className="h-8 w-8 text-primary mr-3" />
          <h2 className="font-poppins text-3xl font-bold">
            Assessment Complete!
          </h2>
        </div>
        <p className="text-lg text-muted-foreground">
          Here's your child's personality profile and career insights
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-8">
        {/* Top Traits */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="mr-2 h-5 w-5 text-primary" />
              Personality Traits
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {sortedTraits.map(([trait, score]) => (
              <div key={trait} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium capitalize">
                    {trait.replace('-', ' ')}
                  </span>
                  <Badge variant={trait === topTrait[0] ? "default" : "secondary"}>
                    {Math.round((score / maxScore) * 100)}%
                  </Badge>
                </div>
                <Progress 
                  value={(score / maxScore) * 100} 
                  className="h-2"
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Career Suggestions */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Career Path Suggestions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-3">
                Based on your strongest trait: <strong>{topTrait?.[0].replace('-', ' ')}</strong>
              </p>
              <div className="grid gap-2">
                {suggestions.slice(0, 4).map((career, index) => (
                  <div key={index} className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                    <span className="font-medium text-primary">{career}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upgrade Prompt */}
      <Card className="shadow-primary border-primary/20 mb-6">
        <CardContent className="p-8 text-center">
          <h3 className="font-poppins text-xl font-semibold mb-4">
            Want deeper insights?
          </h3>
          <p className="text-muted-foreground mb-6">
            Upgrade to Family Plus for detailed analysis, development plans, and ongoing tracking as your child grows.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="shadow-primary">
              Upgrade to Family Plus
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg">
              <Download className="mr-2 h-4 w-4" />
              Download Report
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <Button variant="outline" onClick={onRestart}>
          Take Assessment Again
        </Button>
      </div>
    </div>
  );
};

export default AssessmentResults;