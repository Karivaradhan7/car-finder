import VehicleResultCard, { VehicleResult } from "./VehicleResultCard";
import { AlertTriangle } from "lucide-react";

interface VehicleResultsDashboardProps {
  results: VehicleResult[];
  onViewFrame: (id: string) => void;
  onTrackVehicle: (id: string) => void;
}

const VehicleResultsDashboard = ({ results, onViewFrame, onTrackVehicle }: VehicleResultsDashboardProps) => {
  const exactMatches = results.filter((r) => r.matchStatus === "exact");
  const partialMatches = results.filter((r) => r.matchStatus === "partial");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Vehicle Match Results</h2>
          <p className="text-sm text-muted-foreground">
            {results.length} vehicles identified across surveillance network
          </p>
        </div>
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-muted-foreground">{exactMatches.length} Exact</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span className="text-muted-foreground">{partialMatches.length} Partial</span>
          </div>
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
