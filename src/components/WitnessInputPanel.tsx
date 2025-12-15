import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "/components/ui/select";
import { Input } from "/components/ui/input";
import { Button } from "/components/ui/button";
import { Search, Shield } from "lucide-react";

interface WitnessInputPanelProps {
  onSearch: (filters: WitnessFilters) => void;
}

export interface WitnessFilters {
  vehicleType: string;
  vehicleColor: string;
  vehicleBrand: string;
  crimeLocation: string;
  timeRange: string;
}

const WitnessInputPanel = ({ onSearch }: WitnessInputPanelProps) => {
  const [filters, setFilters] = useState<WitnessFilters>({
    vehicleType: "",
    vehicleColor: "",
    vehicleBrand: "",
    crimeLocation: "",
    timeRange: "",
  });

  const vehicleTypes = ["Car", "Bike", "Truck"];
  const vehicleColors = ["White", "Black", "Red", "Blue", "Silver"];
  const vehicleBrands = ["Any", "Toyota", "Hyundai", "Honda", "BMW", "Audi", "Mercedes", "Ford"];

  const handleSearch = () => {
    onSearch(filters);
  };

  return (
    <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
          <Shield className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Witness Input Panel</h2>
          <p className="text-sm text-muted-foreground">Enter vehicle details from witness description</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Vehicle Type</label>
          <Select
            value={filters.vehicleType}
            onValueChange={(value) => setFilters({ ...filters, vehicleType: value })}
          >
            <SelectTrigger className="bg-background/50 border-border">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              {vehicleTypes.map((type) => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Vehicle Color</label>
          <Select
            value={filters.vehicleColor}
            onValueChange={(value) => setFilters({ ...filters, vehicleColor: value })}
          >
            <SelectTrigger className="bg-background/50 border-border">
              <SelectValue placeholder="Select color" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              {vehicleColors.map((color) => (
                <SelectItem key={color} value={color}>{color}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Vehicle Brand</label>
          <Select
            value={filters.vehicleBrand}
            onValueChange={(value) => setFilters({ ...filters, vehicleBrand: value })}
          >
            <SelectTrigger className="bg-background/50 border-border">
              <SelectValue placeholder="Select brand" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              {vehicleBrands.map((brand) => (
                <SelectItem key={brand} value={brand}>{brand}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Crime Location</label>
          <Input
            placeholder="Enter location"
            value={filters.crimeLocation}
            onChange={(e) => setFilters({ ...filters, crimeLocation: e.target.value })}
            className="bg-background/50 border-border"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Time Range</label>
          <Input
            placeholder="e.g., 18:00 - 19:00"
            value={filters.timeRange}
            onChange={(e) => setFilters({ ...filters, timeRange: e.target.value })}
            className="bg-background/50 border-border"
          />
        </div>
      </div>

      <div className="pt-4 border-t border-border/50">
        <p className="text-sm text-muted-foreground mb-4 italic">
          "Witness provides visual details of the vehicle seen at the crime scene."
        </p>
        <Button onClick={handleSearch} className="w-full md:w-auto gap-2">
          <Search className="w-4 h-4" />
          Search Vehicle
        </Button>
      </div>
    </div>
  );
};

export default WitnessInputPanel;
