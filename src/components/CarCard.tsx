import { Car as CarIcon, Calendar, Palette, Layers } from "lucide-react";
import { Car } from "/data/carsDataset";

interface CarCardProps {
  car: Car;
  index: number;
}

const CarCard = ({ car, index }: CarCardProps) => {
  return (
    <div
      className="glass-card rounded-2xl overflow-hidden group cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-xl opacity-0 animate-fade-in"
      style={{ animationDelay: `${0.1 * index}s` }}
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={car.image}
          alt={`${car.make} ${car.model}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
        
        {/* Year Badge */}
        <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-primary/90 text-primary-foreground text-xs font-semibold">
          {car.year}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <CarIcon className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">{car.make}</span>
        </div>
        
        <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
          {car.model}
        </h3>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-sm">
            <div className="p-1.5 rounded-md bg-secondary">
              <Layers className="w-3.5 h-3.5 text-muted-foreground" />
            </div>
            <span className="text-muted-foreground">{car.bodyType}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="p-1.5 rounded-md bg-secondary">
              <Palette className="w-3.5 h-3.5 text-muted-foreground" />
            </div>
            <span className="text-muted-foreground">{car.color}</span>
          </div>
        </div>

        {/* Hover indicator */}
        <div className="mt-4 pt-4 border-t border-border/50">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">View Details</span>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
              <svg 
                className="w-4 h-4 text-primary group-hover:text-primary-foreground transition-colors duration-300 transform group-hover:translate-x-0.5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
