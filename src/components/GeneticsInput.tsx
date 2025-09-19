import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Dna, Upload, FileText, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GeneticsInputProps {
  onNext: (data: any) => void;
}

const GeneticsInput = ({ onNext }: GeneticsInputProps) => {
  const { toast } = useToast();
  const [selectedMarkers, setSelectedMarkers] = useState<string[]>([]);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const mockGeneMarkers = [
    { id: "COMT", name: "COMT Gene", description: "Affects dopamine processing and attention" },
    { id: "BDNF", name: "BDNF Gene", description: "Influences memory and learning" },
    { id: "5-HTTLPR", name: "5-HTTLPR", description: "Serotonin transport, mood regulation" },
    { id: "DRD4", name: "DRD4 Gene", description: "Dopamine receptor, novelty seeking" },
    { id: "CACNA1C", name: "CACNA1C", description: "Calcium channels, creativity" },
    { id: "FOXP2", name: "FOXP2 Gene", description: "Language and communication abilities" },
  ];

  const handleMarkerToggle = (markerId: string) => {
    setSelectedMarkers((prev) =>
      prev.includes(markerId) ? prev.filter((id) => id !== markerId) : [...prev, markerId]
    );
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (
        file.type === "text/csv" ||
        file.type === "application/json" ||
        file.name.endsWith(".csv") ||
        file.name.endsWith(".json")
      ) {
        setUploadedFile(file);
        toast({
          title: "File uploaded successfully",
          description: `${file.name} has been uploaded for analysis.`,
        });
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a CSV or JSON file.",
          variant: "destructive",
        });
      }
    }
  };

  const handleNext = () => {
    if (selectedMarkers.length === 0 && !uploadedFile) {
      toast({
        title: "Selection required",
        description: "Please select gene markers or upload a file to continue.",
        variant: "destructive",
      });
      return;
    }

    const geneticsData = {
      selectedMarkers,
      uploadedFile: uploadedFile?.name,
      timestamp: new Date().toISOString(),
    };

    onNext(geneticsData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-genetics/10 text-genetics text-sm font-medium">
          <Dna className="h-4 w-4 mr-2" />
          Step 1 of 3
        </div>
        <h1 className="text-4xl font-bold">Genetic Analysis</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Select mock genetic markers or upload your genetic data to begin the career prediction analysis.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* File Upload Option */}
        <Card className="p-6 space-y-6">
          <div className="text-center">
            <Upload className="h-12 w-12 mx-auto text-primary mb-4" />
            <h3 className="text-lg font-semibold mb-2">Upload Genetic Data</h3>
            <p className="text-muted-foreground text-sm">Upload your genetic analysis file (CSV or JSON format)</p>
          </div>

          <div className="space-y-4">
            <Label htmlFor="genetics-file" className="cursor-pointer">
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors">
                {uploadedFile ? (
                  <div className="space-y-2">
                    <CheckCircle className="h-8 w-8 mx-auto text-genetics" />
                    <p className="text-sm font-medium">{uploadedFile.name}</p>
                    <p className="text-xs text-muted-foreground">File ready for analysis</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <FileText className="h-8 w-8 mx-auto text-muted-foreground" />
                    <p className="text-sm">Click to upload your genetic data file</p>
                    <p className="text-xs text-muted-foreground">Supports CSV and JSON files</p>
                  </div>
                )}
              </div>
              <Input
                id="genetics-file"
                type="file"
                accept=".csv,.json"
                onChange={handleFileUpload}
                className="hidden"
              />
            </Label>
          </div>
        </Card>

        {/* Manual Selection Option */}
        <Card className="p-6 space-y-6">
          <div className="text-center">
            <Dna className="h-12 w-12 mx-auto text-genetics mb-4" />
            <h3 className="text-lg font-semibold mb-2">Select Mock Gene Markers</h3>
            <p className="text-muted-foreground text-sm">
              Choose from our predefined genetic markers for demo purposes
            </p>
          </div>

          <div className="space-y-4">
            {mockGeneMarkers.map((marker) => (
              <div
                key={marker.id}
                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <Checkbox
                  id={marker.id}
                  checked={selectedMarkers.includes(marker.id)}
                  onCheckedChange={() => handleMarkerToggle(marker.id)}
                  className="mt-1"
                />
                <div className="space-y-1 flex-1">
                  <Label htmlFor={marker.id} className="text-sm font-medium cursor-pointer">
                    {marker.name}
                  </Label>
                  <p className="text-xs text-muted-foreground">{marker.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="text-center space-y-4">
        <div className="text-sm text-muted-foreground">
          Selected markers: {selectedMarkers.length} | File uploaded: {uploadedFile ? "Yes" : "No"}
        </div>
        <Button
          onClick={handleNext}
          size="lg"
          className="text-lg px-8 py-6 shadow-primary transition-bounce hover:scale-105"
        >
          Continue to Family History
        </Button>
      </div>
    </div>
  );
};

export default GeneticsInput;
