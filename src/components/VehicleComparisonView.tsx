import { Camera, Percent } from "lucide-react";

interface VehicleComparisonViewProps {
  similarityScore: number;
}

const VehicleComparisonView = ({ similarityScore }: VehicleComparisonViewProps) => {
  return (
    <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-foreground mb-2">Vehicle Re-Identification</h2>
        <p className="text-sm text-muted-foreground">Cross-camera appearance matching</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <div className="aspect-video bg-muted/30 rounded-lg border border-border flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
            <div className="text-center z-10">
              <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
              <span className="text-muted-foreground text-sm">Crime Scene Camera</span>
            </div>
            <div className="absolute top-3 left-3 bg-red-500/80 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              CCTV-03
            </div>
            <div className="absolute bottom-3 right-3 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded">
              18:42:11
            </div>
          </div>
          <p className="text-center text-sm font-medium text-foreground">Crime Scene Camera</p>
        </div>

        <div className="space-y-3">
          <div className="aspect-video bg-muted/30 rounded-lg border border-border flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent"></div>
            <div className="text-center z-10">
              <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
              <span className="text-muted-foreground text-sm">Traffic Camera</span>
            </div>
            <div className="absolute top-3 left-3 bg-blue-500/80 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              Traffic-Cam-05
            </div>
            <div className="absolute bottom-3 right-3 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded">
              18:44:36
            </div>
          </div>
          <p className="text-center text-sm font-medium text-foreground">Traffic Camera</p>
        </div>
      </div>

      <div className="bg-muted/20 rounded-lg p-4 text-center border border-border/50">
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          "The same vehicle is re-identified across different cameras using deep visual 
          appearance features learned from the Stanford Cars Dataset, enabling identification 
          of any car brand without relying on license plates."
        </p>
        
        <div className="flex items-center justify-center gap-3">
          <Percent className="w-5 h-5 text-primary" />
          <span className="text-lg font-semibold text-foreground">Similarity Score:</span>
          <span className="text-2xl font-bold text-primary">{similarityScore}%</span>
        </div>
      </div>
    </div>
  );
};

export default VehicleComparisonView;
