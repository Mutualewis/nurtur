/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dna, Users, Brain, TrendingUp, Star, Target, Award, Lightbulb, Shield, Zap, Download } from "lucide-react";
import jsPDF from "jspdf";
// import { OpenAI } from "openai";

interface AssessmentResultsProps {
  genetics?: any;
  family?: any;
  assessment?: any;
}

const AssessmentResults: React.FC<AssessmentResultsProps> = ({ genetics, family, assessment }) => {
  const [loading, setLoading] = useState(false);
  const [aiResult, setAiResult] = useState("");
  const [careerPredictions, setCareerPredictions] = useState<any[]>([]);
  const [traitScores, setTraitScores] = useState<any[]>([]);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3001/api/analyze", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userResponses: {
              genetics,
              family,
              assessment,
            },
          }),
        });
        if (!response.ok) {
          setAiResult("Error fetching prediction. Using mock data.");
          setCareerPredictions([
            { career: "Software Development Engineer", confidence: 95, match: "Excellent" },
            { career: "Technical Project Manager", confidence: 85, match: "Very Good" },
            { career: "Solution Architect", confidence: 75, match: "Good" },
          ]);
          setTraitScores([
            { trait: "Problem Solving", score: 90 },
            { trait: "Technical Skills", score: 85 },
            { trait: "Communication", score: 80 },
            { trait: "Leadership", score: 70 },
            { trait: "Innovation", score: 85 },
          ]);
          setLoading(false);
          return;
        }
        const data = await response.json();

        if (data.isError) {
          console.warn("Server error:", data.error);
        }

        const analysis = data.analysis;
        setAiResult(analysis);

        try {
          // Try to parse the career predictions and trait scores from the analysis
          const lines = analysis.split("\n");
          const careerMatches = lines
            .filter((line) => line.includes("- "))
            .slice(0, 3)
            .map((line) => ({
              career: line.replace("- ", "").trim(),
              confidence: Math.floor(Math.random() * 30) + 70, // Random score between 70-100
              match: ["Excellent", "Very Good", "Good"][Math.floor(Math.random() * 3)],
            }));

          const traits = ["Problem Solving", "Technical Skills", "Communication", "Leadership", "Innovation"];

          const traitScoresData = traits.map((trait) => ({
            trait,
            score: Math.floor(Math.random() * 30) + 70, // Random score between 70-100
          }));

          setCareerPredictions(careerMatches);
          setTraitScores(traitScoresData);
        } catch (err) {
          console.warn("Error parsing analysis:", err);
          setCareerPredictions([]);
          setTraitScores([]);
        }
      } catch (err) {
        setAiResult("Error fetching prediction.");
        setCareerPredictions([]);
        setTraitScores([]);
      }
      setLoading(false);
    };
    fetchResults();
  }, [genetics, family, assessment]);

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-genetics";
    if (confidence >= 80) return "text-secondary";
    if (confidence >= 70) return "text-primary";
    return "text-warning";
  };

  const getMatchBadgeVariant = (match: string) => {
    switch (match) {
      case "Excellent":
        return "genetics";
      case "Very Good":
        return "secondary";
      case "Good":
        return "default";
      default:
        return "outline";
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Career Path Prediction Results", 10, 10);
    doc.text(aiResult, 10, 20);
    doc.save("career-path-results.pdf");
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-genetics/10 text-genetics text-sm font-medium">
          <TrendingUp className="h-4 w-4 mr-2" />
          Analysis Complete
        </div>
        <h1 className="text-4xl font-bold">Your Career Predictions</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Based on your genetic markers, family history, and psychometric analysis, here are your personalized career
          recommendations.
        </p>
      </div>

      {/* Analysis Summary */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-6 text-center space-y-4">
          <Dna className="h-12 w-12 mx-auto text-genetics" />
          <div>
            <h3 className="font-semibold">Genetic Analysis</h3>
            <p className="text-sm text-muted-foreground">{genetics?.selectedMarkers?.length || 0} markers analyzed</p>
          </div>
        </Card>
        <Card className="p-6 text-center space-y-4">
          <Users className="h-12 w-12 mx-auto text-secondary" />
          <div>
            <h3 className="font-semibold">Family History</h3>
            <p className="text-sm text-muted-foreground">Family patterns identified</p>
          </div>
        </Card>
        <Card className="p-6 text-center space-y-4">
          <Brain className="h-12 w-12 mx-auto text-primary" />
          <div>
            <h3 className="font-semibold">Psychometric Tests</h3>
            <p className="text-sm text-muted-foreground">Personality profile complete</p>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Career Predictions */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold">Recommended Career Paths</h2>
          {loading ? (
            <div className="text-center text-muted-foreground">Predicting career path...</div>
          ) : (
            <div className="space-y-4">
              {careerPredictions.length > 0 ? (
                careerPredictions.map((career: any, index: number) => (
                  <Card key={index} className="p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-semibold">{career.career}</h3>
                          <Badge variant={getMatchBadgeVariant(career.match) as any}>{career.match}</Badge>
                        </div>
                        <p className="text-muted-foreground">{career.description}</p>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${getConfidenceColor(career.confidence)}`}>
                          {career.confidence}%
                        </div>
                        <div className="text-xs text-muted-foreground">Confidence</div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Progress value={career.confidence} className="h-2" />
                      <div className="grid sm:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Key Skills:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {career.skills?.map((skill: string, i: number) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Growth:</span>
                          <div className="font-medium text-genetics">{career.growth}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Salary Range:</span>
                          <div className="font-medium">{career.salary}</div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="text-muted-foreground">No career predictions available.</div>
              )}
            </div>
          )}
        </div>

        {/* Trait Analysis */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Your Trait Profile</h2>
          <Card className="p-6 space-y-6">
            <div className="text-center">
              <Shield className="h-12 w-12 mx-auto text-genetics mb-2" />
              <h3 className="font-semibold">Personality Strengths</h3>
              <p className="text-sm text-muted-foreground">Based on scientific analysis</p>
            </div>
            <div className="space-y-4">
              {traitScores.length > 0 ? (
                traitScores.map((trait: any, index: number) => {
                  const IconComponent = trait.icon ? trait.icon : Star;
                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <IconComponent className={`h-4 w-4 ${trait.color || "text-primary"}`} />
                          <span className="text-sm font-medium">{trait.trait}</span>
                        </div>
                        <span className={`text-sm font-bold ${trait.color || "text-primary"}`}>{trait.score}%</span>
                      </div>
                      <Progress value={trait.score} className="h-2" />
                    </div>
                  );
                })
              ) : (
                <div className="text-muted-foreground">No trait scores available.</div>
              )}
            </div>
          </Card>
          <Card className="p-6 space-y-4">
            <h3 className="font-semibold">Recommended Actions</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Star className="h-4 w-4 text-genetics mt-0.5 flex-shrink-0" />
                <span>Focus on data analysis and research roles</span>
              </li>
              <li className="flex items-start gap-2">
                <Star className="h-4 w-4 text-genetics mt-0.5 flex-shrink-0" />
                <span>Develop leadership skills for career advancement</span>
              </li>
              <li className="flex items-start gap-2">
                <Star className="h-4 w-4 text-genetics mt-0.5 flex-shrink-0" />
                <span>Consider creative problem-solving roles</span>
              </li>
            </ul>
            <Button variant="default" className="w-full mt-4" onClick={handleDownloadPDF}>
              <Download className="mr-2 h-4 w-4" />
              Download Full Report
            </Button>
          </Card>
        </div>
      </div>

      {/* Disclaimer */}
      <Card className="p-6 bg-muted/50 border-warning/20">
        <p className="text-sm text-muted-foreground text-center">
          <strong>Disclaimer:</strong> These predictions are based on AI analysis and are for demonstration purposes
          only. Real career decisions should consider multiple factors including personal interests, education, and
          market conditions.
        </p>
      </Card>
    </div>
  );
};

export default AssessmentResults;
