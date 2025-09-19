/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Users, GraduationCap, Briefcase, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FamilyHistoryProps {
  onNext: (data: any) => void;
}

const FamilyHistory = ({ onNext }: FamilyHistoryProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    parents: {
      father: {
        profession: "",
        education: "",
        traits: "",
      },
      mother: {
        profession: "",
        education: "",
        traits: "",
      },
    },
    siblings: {
      count: "",
      talents: [],
    },
    familyTraditions: [],
    culturalBackground: "",
  });

  const professions = [
    "Engineer",
    "Doctor",
    "Teacher",
    "Lawyer",
    "Artist",
    "Business Owner",
    "Scientist",
    "Writer",
    "Nurse",
    "Architect",
    "Accountant",
    "Designer",
    "Developer",
    "Manager",
    "Consultant",
    "Researcher",
    "Other",
  ];

  const educationLevels = [
    "High School",
    "Associate Degree",
    "Bachelor's Degree",
    "Master's Degree",
    "Doctoral Degree",
    "Professional Degree",
    "Other",
  ];

  const handleInputChange = (path: string[], value: string | string[]) => {
    setFormData((prev) => {
      const newData = { ...prev };
      let current: any = newData;

      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]];
      }
      current[path[path.length - 1]] = value;

      return newData;
    });
  };

  const handleNext = () => {
    // Basic validation
    if (!formData.parents.father.profession || !formData.parents.mother.profession) {
      toast({
        title: "Missing Information",
        description: "Please provide basic information about your parents' professions.",
        variant: "destructive",
      });
      return;
    }

    const familyData = {
      ...formData,
      timestamp: new Date().toISOString(),
    };

    onNext(familyData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-medium">
          <Users className="h-4 w-4 mr-2" />
          Step 2 of 3
        </div>
        <h1 className="text-4xl font-bold">Family History Analysis</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Help us understand your family background to identify inherited traits and patterns that influence career
          preferences.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Father's Information */}
        <Card className="p-6 space-y-6">
          <div className="text-center">
            <Briefcase className="h-12 w-12 mx-auto text-primary mb-4" />
            <h3 className="text-lg font-semibold mb-2">Father's Background</h3>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="father-profession">Profession</Label>
              <Select
                value={formData.parents.father.profession}
                onValueChange={(value) => handleInputChange(["parents", "father", "profession"], value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select father's profession" />
                </SelectTrigger>
                <SelectContent>
                  {professions.map((profession) => (
                    <SelectItem key={profession} value={profession}>
                      {profession}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="father-education">Education Level</Label>
              <Select
                value={formData.parents.father.education}
                onValueChange={(value) => handleInputChange(["parents", "father", "education"], value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select education level" />
                </SelectTrigger>
                <SelectContent>
                  {educationLevels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="father-traits">Key Traits & Interests</Label>
              <Textarea
                id="father-traits"
                placeholder="e.g., analytical, creative, leadership, technical..."
                value={formData.parents.father.traits}
                onChange={(e) => handleInputChange(["parents", "father", "traits"], e.target.value)}
              />
            </div>
          </div>
        </Card>

        {/* Mother's Information */}
        <Card className="p-6 space-y-6">
          <div className="text-center">
            <Heart className="h-12 w-12 mx-auto text-secondary mb-4" />
            <h3 className="text-lg font-semibold mb-2">Mother's Background</h3>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="mother-profession">Profession</Label>
              <Select
                value={formData.parents.mother.profession}
                onValueChange={(value) => handleInputChange(["parents", "mother", "profession"], value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select mother's profession" />
                </SelectTrigger>
                <SelectContent>
                  {professions.map((profession) => (
                    <SelectItem key={profession} value={profession}>
                      {profession}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="mother-education">Education Level</Label>
              <Select
                value={formData.parents.mother.education}
                onValueChange={(value) => handleInputChange(["parents", "mother", "education"], value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select education level" />
                </SelectTrigger>
                <SelectContent>
                  {educationLevels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="mother-traits">Key Traits & Interests</Label>
              <Textarea
                id="mother-traits"
                placeholder="e.g., nurturing, organized, artistic, problem-solving..."
                value={formData.parents.mother.traits}
                onChange={(e) => handleInputChange(["parents", "mother", "traits"], e.target.value)}
              />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Siblings Information */}
        <Card className="p-6 space-y-6">
          <div className="text-center">
            <Users className="h-12 w-12 mx-auto text-genetics mb-4" />
            <h3 className="text-lg font-semibold mb-2">Siblings & Family</h3>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sibling-count">Number of Siblings</Label>
              <Input
                id="sibling-count"
                type="number"
                min="0"
                max="20"
                placeholder="0"
                value={formData.siblings.count}
                onChange={(e) => handleInputChange(["siblings", "count"], e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sibling-talents">Siblings' Talents & Interests</Label>
              <div className="grid grid-cols-2 gap-2">
                {["Sports", "Music", "Art", "Science", "Technology", "Leadership", "Business", "Other"].map(
                  (talent) => (
                    <label key={talent} className="flex items-center gap-2">
                      <Checkbox
                        checked={formData.siblings.talents.includes(talent)}
                        onCheckedChange={(checked) => {
                          const newTalents = checked
                            ? [...formData.siblings.talents, talent]
                            : formData.siblings.talents.filter((t: string) => t !== talent);
                          handleInputChange(["siblings", "talents"], newTalents);
                        }}
                      />
                      {talent}
                    </label>
                  )
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Cultural Background */}
        <Card className="p-6 space-y-6">
          <div className="text-center">
            <GraduationCap className="h-12 w-12 mx-auto text-warning mb-4" />
            <h3 className="text-lg font-semibold mb-2">Cultural Background</h3>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="family-traditions">Family Traditions & Values</Label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "Education",
                  "Community",
                  "Religion",
                  "Hard Work",
                  "Creativity",
                  "Service",
                  "Respect",
                  "Honesty",
                  "Discipline",
                  "Teamwork",
                  "Tradition",
                  "Innovation",
                  "Leadership",
                  "Empathy",
                  "Resilience",
                  "Other",
                ].map((tradition) => (
                  <label key={tradition} className="flex items-center gap-2">
                    <Checkbox
                      checked={formData.familyTraditions.includes(tradition)}
                      onCheckedChange={(checked) => {
                        const newTraditions = checked
                          ? [...formData.familyTraditions, tradition]
                          : formData.familyTraditions.filter((t: string) => t !== tradition);
                        handleInputChange(["familyTraditions"], newTraditions);
                      }}
                    />
                    {tradition}
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cultural-background">Cultural/Ethnic Background</Label>
              <Select
                value={formData.culturalBackground}
                onValueChange={(value) => handleInputChange(["culturalBackground"], value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select cultural/ethnic background" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="African">African</SelectItem>
                  <SelectItem value="Asian">Asian</SelectItem>
                  <SelectItem value="European">European</SelectItem>
                  <SelectItem value="Latino/Hispanic">Latino/Hispanic</SelectItem>
                  <SelectItem value="Middle Eastern">Middle Eastern</SelectItem>
                  <SelectItem value="Indigenous">Indigenous</SelectItem>
                  <SelectItem value="Mixed">Mixed</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>
      </div>

      <div className="text-center space-y-4">
        <div className="text-sm text-muted-foreground">
          Your family information helps us identify inherited traits and environmental influences
        </div>
        <Button
          onClick={handleNext}
          size="lg"
          className="text-lg px-8 py-6 shadow-primary transition-bounce hover:scale-105"
        >
          Continue to Psychometric Test
        </Button>
      </div>
    </div>
  );
};

export default FamilyHistory;
