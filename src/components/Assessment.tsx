import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";

interface Question {
  id: number;
  category: string;
  question: string;
  options: {
    text: string;
    trait: string;
    score: number;
  }[];
}

const Assessment = ({ onComplete }: { onComplete: (results: any) => void }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const questions: Question[] = [
    {
      id: 1,
      category: "Risk Tolerance",
      question: "You have to choose: a safe small prize now, or a chance at a bigger prize later?",
      options: [
        { text: "Take the safe small prize now", trait: "conservative", score: 1 },
        { text: "Go for the bigger prize later", trait: "risk-taker", score: 3 },
        { text: "It depends on the situation", trait: "moderate", score: 2 }
      ]
    },
    {
      id: 2,
      category: "Leadership",
      question: "You see a group project falling apart — do you step in to organize, or let others handle it?",
      options: [
        { text: "Step in immediately and organize", trait: "natural-leader", score: 3 },
        { text: "Let others try first, then help", trait: "supportive", score: 2 },
        { text: "Let others handle it completely", trait: "follower", score: 1 }
      ]
    },
    {
      id: 3,
      category: "Fairness",
      question: "You're given 10 coins. Do you keep them all, or share with a friend?",
      options: [
        { text: "Keep all 10 coins for myself", trait: "self-focused", score: 1 },
        { text: "Share equally - 5 coins each", trait: "fair-minded", score: 3 },
        { text: "Give them 3-4 coins", trait: "generous", score: 2 }
      ]
    },
    {
      id: 4,
      category: "Problem Solving",
      question: "Do you prefer puzzles with one right answer or open-ended creative tasks?",
      options: [
        { text: "Puzzles with one clear answer", trait: "analytical", score: 3 },
        { text: "Open-ended creative tasks", trait: "creative", score: 2 },
        { text: "I enjoy both equally", trait: "versatile", score: 1 }
      ]
    },
    {
      id: 5,
      category: "Memory & Focus",
      question: "You're given a memory challenge: recall sequences vs. spotting differences — which do you enjoy more?",
      options: [
        { text: "Recalling sequences", trait: "detail-oriented", score: 3 },
        { text: "Spotting differences", trait: "observant", score: 2 },
        { text: "Neither appeals to me", trait: "big-picture", score: 1 }
      ]
    },
    {
      id: 6,
      category: "Social Interaction",
      question: "At a party, do you prefer talking to one person deeply or mingling with many people?",
      options: [
        { text: "Deep conversation with one person", trait: "introvert", score: 1 },
        { text: "Mingling with many people", trait: "extrovert", score: 3 },
        { text: "A mix of both", trait: "ambivert", score: 2 }
      ]
    },
    {
      id: 7,
      category: "Decision Making",
      question: "When facing a difficult choice, do you decide quickly or take time to think?",
      options: [
        { text: "Decide quickly based on instinct", trait: "intuitive", score: 2 },
        { text: "Take time to analyze all options", trait: "methodical", score: 3 },
        { text: "Ask others for their opinions first", trait: "collaborative", score: 1 }
      ]
    },
    {
      id: 8,
      category: "Learning Style",
      question: "How do you prefer to learn new things?",
      options: [
        { text: "Reading and studying alone", trait: "independent", score: 1 },
        { text: "Hands-on practice and experimentation", trait: "kinesthetic", score: 3 },
        { text: "Discussion and group activities", trait: "social-learner", score: 2 }
      ]
    },
    {
      id: 9,
      category: "Pressure Response",
      question: "How do you handle high-pressure situations?",
      options: [
        { text: "I thrive under pressure", trait: "pressure-positive", score: 3 },
        { text: "I work steadily regardless of pressure", trait: "stable", score: 2 },
        { text: "I prefer low-pressure environments", trait: "pressure-sensitive", score: 1 }
      ]
    },
    {
      id: 10,
      category: "Innovation",
      question: "When given a task, do you prefer following instructions or finding your own way?",
      options: [
        { text: "Follow clear instructions", trait: "structured", score: 1 },
        { text: "Find my own creative approach", trait: "innovative", score: 3 },
        { text: "Combine instructions with my ideas", trait: "adaptive", score: 2 }
      ]
    }
  ];

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const isLastQuestion = currentQuestion === questions.length - 1;
  const hasAnswered = answers[currentQuestion] !== undefined;

  const handleAnswer = (optionIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: optionIndex
    }));
  };

  const handleNext = () => {
    if (isLastQuestion) {
      // Calculate results
      const results = {
        answers,
        traits: calculateTraits(),
        completedAt: new Date().toISOString()
      };
      onComplete(results);
    } else {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const calculateTraits = () => {
    const traitScores: Record<string, number> = {};
    
    Object.entries(answers).forEach(([questionIndex, answerIndex]) => {
      const question = questions[parseInt(questionIndex)];
      const answer = question.options[answerIndex];
      traitScores[answer.trait] = (traitScores[answer.trait] || 0) + answer.score;
    });

    return traitScores;
  };

  const currentQ = questions[currentQuestion];

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-poppins text-2xl font-bold">
            Personality Assessment
          </h2>
          <span className="text-sm text-muted-foreground">
            {currentQuestion + 1} of {questions.length}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">
              Question {currentQ.id}
            </CardTitle>
            <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
              {currentQ.category}
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-lg font-medium">{currentQ.question}</p>
          
          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className={`w-full p-4 text-left rounded-lg border transition-all ${
                  answers[currentQuestion] === index
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border hover:border-primary/50 hover:bg-accent"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{option.text}</span>
                  {answers[currentQuestion] === index && (
                    <CheckCircle className="h-5 w-5 text-primary" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        
        <Button
          onClick={handleNext}
          disabled={!hasAnswered}
          className="shadow-primary"
        >
          {isLastQuestion ? "Complete Assessment" : "Next"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Assessment;