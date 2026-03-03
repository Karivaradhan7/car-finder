import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Navigation, Car, Camera, MapPin } from "lucide-react";
import { getVehicleImage } from "@/lib/vehicleImageResolver";

export interface VehicleResult {
  id: string;
  vehicleType: string;
  color: string;
  brand: string;
  model?: string;
  plateNumber?: string;
  cameraId: string;
  cameraLocation?: string;
  timeDetected: string;
  matchConfidence: number;
  matchStatus: "exact" | "partial";
  imageUrl?: string;
  description?: string;
}

interface VehicleResultCardProps {
  result: VehicleResult;
  onViewFrame: (id: string) => void;
  onTrackVehicle: (id: string) => void;
}

const VehicleResultCard = ({ result, onViewFrame, onTrackVehicle }: VehicleResultCardProps) => {
  const isExactMatch = result.matchStatus === "exact";
  const [imgError, setImgError] = useState(false);
  const resolvedImage = getVehicleImage(result.brand, result.model, result.vehicleType);

  return (
    <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-colors">
      {/* CCTV Frame Image */}
      <div className="relative w-full h-44 bg-muted/30 flex items-center justify-center overflow-hidden">
        {result.imageUrl && !imgError ? (
          <img
            src={result.imageUrl}
            alt={`CCTV capture of ${result.brand} ${result.model || ""}`}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <Camera className="w-10 h-10" />
            <span className="text-xs">CCTV Frame — {result.cameraId}</span>
          </div>
        )}
        {/* Overlay badges */}
        <div className="absolute top-2 left-2">
          <Badge variant="outline" className="bg-background/80 backdrop-blur-sm text-xs border-border">
            <Camera className="w-3 h-3 mr-1" /> {result.cameraId}
          </Badge>
        </div>
        <div className="absolute top-2 right-2">
          <Badge
            variant={isExactMatch ? "default" : "secondary"}
            className={isExactMatch
              ? "bg-green-500/90 text-white border-green-600"
              : "bg-yellow-500/90 text-white border-yellow-600"
            }
          >
            {result.matchConfidence}%
          </Badge>
        </div>
        <div className="absolute bottom-2 left-2">
          <Badge variant="outline" className="bg-background/80 backdrop-blur-sm text-xs border-border">
            {result.timeDetected}
          </Badge>
        </div>
      </div>

      {/* Details */}
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Car className="w-5 h-5 text-primary" />
            <div>
              <h3 className="font-semibold text-foreground text-sm">
                {result.brand !== "Unknown" ? `${result.brand} ${result.model || ""}`.trim() : "Unknown Vehicle"}
              </h3>
              <p className="text-xs text-muted-foreground">{result.vehicleType} • {result.color}</p>
            </div>
          </div>
          <Badge
            variant={isExactMatch ? "default" : "secondary"}
            className={isExactMatch
              ? "bg-green-500/20 text-green-400 border-green-500/30 text-xs"
              : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs"
            }
          >
            {isExactMatch ? "MATCH" : "PARTIAL"}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          {result.plateNumber && (
            <div className="col-span-2 bg-muted/30 rounded-md px-2 py-1.5">
              <span className="text-muted-foreground">Plate: </span>
              <span className="font-mono font-bold text-foreground">{result.plateNumber}</span>
            </div>
          )}
          {result.cameraLocation && (
            <div className="col-span-2 flex items-center gap-1 text-muted-foreground">
              <MapPin className="w-3 h-3" />
              <span>{result.cameraLocation}</span>
            </div>
          )}
        </div>

        {result.description && (
          <p className="text-xs text-muted-foreground line-clamp-2">{result.description}</p>
        )}

        <div className="flex gap-2 pt-2 border-t border-border/50">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewFrame(result.id)}
            className="flex-1 gap-1 text-xs"
          >
            <Eye className="w-3 h-3" />
            View Frame
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onTrackVehicle(result.id)}
            className="flex-1 gap-1 text-xs"
          >
            <Navigation className="w-3 h-3" />
            Track
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VehicleResultCard;
