import { Button } from "/components/ui/button";
import { Badge } from "/components/ui/badge";
import { Eye, Navigation, Car } from "lucide-react";

export interface VehicleResult {
  id: string;
  vehicleType: string;
  color: string;
  brand: string;
  model?: string;
  cameraId: string;
  timeDetected: string;
  matchConfidence: number;
  matchStatus: "exact" | "partial";
}

interface VehicleResultCardProps {
  result: VehicleResult;
  onViewFrame: (id: string) => void;
  onTrackVehicle: (id: string) => void;
}

const VehicleResultCard = ({ result, onViewFrame, onTrackVehicle }: VehicleResultCardProps) => {
  const isExactMatch = result.matchStatus === "exact";

  return (
    <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-5 space-y-4 hover:border-primary/50 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-muted/50 flex items-center justify-center">
            <Car className="w-6 h-6 text-muted-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">
              {result.brand !== "Unknown" ? `${result.brand} ${result.model || ""}`.trim() : "Unknown Vehicle"}
            </h3>
            <p className="text-sm text-muted-foreground">{result.vehicleType} • {result.color}</p>
          </div>
        </div>
        <Badge
          variant={isExactMatch ? "default" : "secondary"}
          className={isExactMatch 
            ? "bg-green-500/20 text-green-400 border-green-500/30" 
            : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
          }
        >
          {isExactMatch ? "MATCH FOUND" : "PARTIAL MATCH"}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="space-y-1">
          <span className="text-muted-foreground">Camera ID</span>
          <p className="font-medium text-foreground">{result.cameraId}</p>
        </div>
        <div className="space-y-1">
          <span className="text-muted-foreground">Time Detected</span>
          <p className="font-medium text-foreground">{result.timeDetected}</p>
        </div>
        <div className="space-y-1">
          <span className="text-muted-foreground">Brand</span>
          <p className="font-medium text-foreground">{result.brand}</p>
        </div>
        <div className="space-y-1">
          <span className="text-muted-foreground">Match Confidence</span>
          <p className={`font-bold ${isExactMatch ? "text-green-400" : "text-yellow-400"}`}>
            {result.matchConfidence}%
          </p>
        </div>
      </div>

      <div className="flex gap-2 pt-2 border-t border-border/50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewFrame(result.id)}
          className="flex-1 gap-2"
        >
          <Eye className="w-4 h-4" />
          View Frame
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onTrackVehicle(result.id)}
          className="flex-1 gap-2"
        >
          <Navigation className="w-4 h-4" />
          Track Vehicle
        </Button>
      </div>
    </div>
  );
};

export default VehicleResultCard;
