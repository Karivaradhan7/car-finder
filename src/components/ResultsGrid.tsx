import { Car } from "@/data/carsDataset";
import CarCard from "./CarCard";
import { Car as CarIcon, SearchX } from "lucide-react";

interface ResultsGridProps {
  cars: Car[];
  hasSearched: boolean;
}

const ResultsGrid = ({ cars, hasSearched }: ResultsGridProps) => {
  if (!hasSearched) {
    return (
      <div className="text-center py-20 animate-fade-in" style={{ animationDelay: "0.3s" }}>
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-secondary mb-6">
          <CarIcon className="w-10 h-10 text-muted-foreground" />
        </div>
        <h3 className="text-2xl font-semibold text-foreground mb-3">
          Start Your Search
        </h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          Use the filters above to search for vehicles by make, model, year, body type, or color.
        </p>
      </div>
    );
  }

  if (cars.length === 0) {
    return (
      <div className="text-center py-20 animate-fade-in">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-secondary mb-6">
          <SearchX className="w-10 h-10 text-muted-foreground" />
        </div>
        <h3 className="text-2xl font-semibold text-foreground mb-3">
          No Vehicles Found
        </h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          No vehicles match your search criteria. Try adjusting your filters to find more results.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          Found <span className="text-primary font-semibold">{cars.length}</span> matching vehicle{cars.length !== 1 ? "s" : ""}
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cars.map((car, index) => (
          <CarCard key={car.id} car={car} index={index} />
        ))}
      </div>
    </div>
  );
};

export default ResultsGrid;
