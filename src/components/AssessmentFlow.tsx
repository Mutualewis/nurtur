import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import GeneticsInput from "./GeneticsInput";
import FamilyHistory from "./FamilyHistory";
import Assessment from "./Assessment";
import AssessmentResults from "./AssessmentResults";

interface AssessmentFlowProps {
  onClose: () => void;
}

const AssessmentFlow = ({ onClose }: AssessmentFlowProps) => {
  const [stage, setStage] = useState<"intro" | "genetics" | "family" | "assessment" | "results">("intro");
  const [geneticsData, setGeneticsData] = useState<any>(null);
  const [familyData, setFamilyData] = useState<any>(null);
  const [results, setResults] = useState<any>(null);

  const handleStartGenetics = () => setStage("genetics");
  const handleGeneticsNext = (data: any) => {
    setGeneticsData(data);
    setStage("family");
  };
  const handleFamilyNext = (data: any) => {
    setFamilyData(data);
    setStage("assessment");
  };
  const handleAssessmentComplete = (assessmentResults: any) => {
    setResults({ genetics: geneticsData, family: familyData, assessment: assessmentResults });
    setStage("results");
  };
  const handleRestart = () => {
    setResults(null);
    setGeneticsData(null);
    setFamilyData(null);
    setStage("intro");
  };

  if (stage === "genetics") {
    return (
      <div className="min-h-screen bg-background">
        <div className="container py-8">
          <Button variant="ghost" onClick={onClose} className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          <GeneticsInput onNext={handleGeneticsNext} />
        </div>
      </div>
    );
  }

  if (stage === "family") {
    return (
      <div className="min-h-screen bg-background">
        <div className="container py-8">
          <Button variant="ghost" onClick={onClose} className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          <FamilyHistory onNext={handleFamilyNext} />
        </div>
      </div>
    );
  }

  if (stage === "assessment") {
    return (
      <div className="min-h-screen bg-background">
        <div className="container py-8">
          <Button variant="ghost" onClick={onClose} className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          <Assessment onComplete={handleAssessmentComplete} />
        </div>
      </div>
    );
  }

  if (stage === "results") {
    return (
      <div className="min-h-screen bg-background">
        <div className="container py-8">
          <Button variant="ghost" onClick={onClose} className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          <AssessmentResults results={results} onRestart={handleRestart} />
        </div>
      </div>
    );
  }

  // intro
  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <Button variant="ghost" onClick={onClose} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-primary border-primary/20">
            <CardContent className="p-8 text-center">
              <h2 className="font-poppins text-2xl font-bold mb-4">Ready to Start Your Assessment?</h2>
              <p className="text-muted-foreground mb-6">
                This 10-question assessment will take about 10-15 minutes. Answer honestly to get the most accurate
                insights about personality traits and career potential.
              </p>
              <ul className="text-left text-sm text-muted-foreground mb-8 space-y-2">
                <li>• Genetics input</li>
                <li>• Family history</li>
                <li>• 10 science-backed questions</li>
                <li>• Takes 10-15 minutes to complete</li>
                <li>• Get immediate personality insights</li>
                <li>• Receive career path suggestions</li>
              </ul>
              <Button size="lg" onClick={handleStartGenetics} className="w-full shadow-primary">
                Start Assessment
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AssessmentFlow;
