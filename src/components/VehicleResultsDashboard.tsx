import VehicleResultCard, { VehicleResult } from "./VehicleResultCard";
import { AlertTriangle, Camera, Search, BarChart3 } from "lucide-react";

interface VehicleResultsDashboardProps {
  results: VehicleResult[];
  summary?: string;
  totalCamerasScanned?: number;
  totalVehiclesDetected?: number;
  onViewFrame: (id: string) => void;
  onTrackVehicle: (id: string) => void;
}

const VehicleResultsDashboard = ({
  results,
  summary,
  totalCamerasScanned,
  totalVehiclesDetected,
  onViewFrame,
  onTrackVehicle,
}: VehicleResultsDashboardProps) => {
  const exactMatches = results.filter((r) => r.matchStatus === "exact");
  const partialMatches = results.filter((r) => r.matchStatus === "partial");

  return (
    <div className="space-y-6">
      {/* Summary Banner */}
      {summary && (
        <div className="bg-primary/10 border border-primary/30 rounded-xl p-4">
          <p className="text-sm text-foreground">{summary}</p>
        </div>
      )}

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-card/50 border border-border rounded-lg p-3 text-center">
          <Camera className="w-5 h-5 text-primary mx-auto mb-1" />
          <div className="text-lg font-bold text-foreground">{totalCamerasScanned ?? "—"}</div>
          <div className="text-xs text-muted-foreground">Cameras Scanned</div>
        </div>
        <div className="bg-card/50 border border-border rounded-lg p-3 text-center">
          <Search className="w-5 h-5 text-primary mx-auto mb-1" />
          <div className="text-lg font-bold text-foreground">{totalVehiclesDetected ?? "—"}</div>
          <div className="text-xs text-muted-foreground">Vehicles Detected</div>
        </div>
        <div className="bg-card/50 border border-border rounded-lg p-3 text-center">
          <BarChart3 className="w-5 h-5 text-green-500 mx-auto mb-1" />
          <div className="text-lg font-bold text-green-400">{exactMatches.length}</div>
          <div className="text-xs text-muted-foreground">Exact Matches</div>
        </div>
        <div className="bg-card/50 border border-border rounded-lg p-3 text-center">
          <BarChart3 className="w-5 h-5 text-yellow-500 mx-auto mb-1" />
          <div className="text-lg font-bold text-yellow-400">{partialMatches.length}</div>
          <div className="text-xs text-muted-foreground">Partial Matches</div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">CCTV Vehicle Match Results</h2>
          <p className="text-sm text-muted-foreground">
            {results.length} vehicles identified across surveillance network
          </p>
        </div>
      </div>

      {results.length === 0 ? (
        <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-12 text-center">
          <AlertTriangle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No Matches Found</h3>
          <p className="text-muted-foreground">
            No vehicles matching the witness description were found in the surveillance network.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((result) => (
            <VehicleResultCard
              key={result.id}
              result={result}
              onViewFrame={onViewFrame}
              onTrackVehicle={onTrackVehicle}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default VehicleResultsDashboard;
