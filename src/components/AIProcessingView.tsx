import { useEffect, useState } from "react";
import { Check, Loader2 } from "lucide-react";

interface AIProcessingViewProps {
  onComplete: () => void;
}

const processingSteps = [
  "Extracting video frames from CCTV and traffic cameras",
  "Detecting vehicles using YOLOv8 AI detector",
  "Analyzing vehicle color using Color-CNN classifier",
  "Identifying brand & model using Stanford Cars + CompCars + VeRi-776 datasets",
  "Extracting deep appearance embeddings with ResNet-50 backbone",
  "Matching vehicles with witness-provided attributes",
  "Re-identifying the same vehicle across multiple cameras using triplet loss features",
];

const AIProcessingView = ({ onComplete }: AIProcessingViewProps) => {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (currentStep < processingSteps.length) {
      const timer = setTimeout(() => {
        setCompletedSteps((prev) => [...prev, currentStep]);
        setCurrentStep((prev) => prev + 1);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      const completeTimer = setTimeout(onComplete, 500);
      return () => clearTimeout(completeTimer);
    }
  }, [currentStep, onComplete]);

  return (
    <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-xl font-semibold text-foreground mb-2">AI Processing & Analysis</h2>
        <p className="text-muted-foreground">Running vehicle identification pipeline</p>
      </div>

      <div className="space-y-4 max-w-2xl mx-auto">
        {processingSteps.map((step, index) => {
          const isCompleted = completedSteps.includes(index);
          const isCurrent = currentStep === index && !isCompleted;

          return (
            <div
              key={index}
              className={`flex items-center gap-4 p-4 rounded-lg transition-all duration-300 ${
                isCompleted
                  ? "bg-primary/10 border border-primary/30"
                  : isCurrent
                  ? "bg-accent/20 border border-accent/30"
                  : "bg-muted/20 border border-border/50"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  isCompleted
                    ? "bg-primary text-primary-foreground"
                    : isCurrent
                    ? "bg-accent/50"
                    : "bg-muted/50"
                }`}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4" />
                ) : isCurrent ? (
                  <Loader2 className="w-4 h-4 animate-spin text-accent" />
                ) : (
                  <span className="text-xs text-muted-foreground">{index + 1}</span>
                )}
              </div>
              <span
                className={`text-sm ${
                  isCompleted
                    ? "text-foreground"
                    : isCurrent
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>

      <div className="text-center pt-6 border-t border-border/50">
        <div className="flex items-center justify-center gap-3">
          <Loader2 className="w-5 h-5 animate-spin text-primary" />
          <span className="text-muted-foreground animate-pulse">
            Searching for matching vehicles across surveillance cameras…
          </span>
        </div>
      </div>
    </div>
  );
};

export default AIProcessingView;
