import { useState, useEffect } from "react";
import { Search, X, Car, Palette, Calendar, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { makes, bodyTypes, colors, years, getModelsByMake } from "@/data/carsDataset";

export interface Filters {
  make: string;
  model: string;
  year: string;
  bodyType: string;
  color: string;
}

interface SearchFiltersProps {
  onSearch: (filters: Filters) => void;
  onClear: () => void;
}

const SearchFilters = ({ onSearch, onClear }: SearchFiltersProps) => {
  const [filters, setFilters] = useState<Filters>({
    make: "",
    model: "",
    year: "",
    bodyType: "",
    color: "",
  });

  const [availableModels, setAvailableModels] = useState<string[]>([]);

  useEffect(() => {
    if (filters.make) {
      setAvailableModels(getModelsByMake(filters.make));
    } else {
      setAvailableModels([]);
    }
  }, [filters.make]);

  const handleFilterChange = (key: keyof Filters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    if (key === "make") {
      newFilters.model = "";
    }
    setFilters(newFilters);
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  const handleClear = () => {
    setFilters({
      make: "",
      model: "",
      year: "",
      bodyType: "",
      color: "",
    });
    onClear();
  };

  const hasFilters = Object.values(filters).some((v) => v !== "");

  return (
    <div className="glass-card rounded-2xl p-6 md:p-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <Search className="w-5 h-5 text-primary" />
        </div>
        <h2 className="text-xl font-semibold text-foreground">Search Filters</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Make */}
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground flex items-center gap-2">
            <Car className="w-4 h-4" />
            Make
          </label>
          <Select value={filters.make} onValueChange={(v) => handleFilterChange("make", v)}>
            <SelectTrigger className="bg-secondary border-border hover:border-primary/50 transition-colors">
              <SelectValue placeholder="Any make" />
            </SelectTrigger>
            <SelectContent>
              {makes.map((make) => (
                <SelectItem key={make} value={make}>
                  {make}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Model */}
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground flex items-center gap-2">
            <Car className="w-4 h-4" />
            Model
          </label>
          <Select
            value={filters.model}
            onValueChange={(v) => handleFilterChange("model", v)}
            disabled={!filters.make}
          >
            <SelectTrigger className="bg-secondary border-border hover:border-primary/50 transition-colors disabled:opacity-50">
              <SelectValue placeholder={filters.make ? "Select model" : "Select make first"} />
            </SelectTrigger>
            <SelectContent>
              {availableModels.map((model) => (
                <SelectItem key={model} value={model}>
                  {model}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Year */}
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Year
          </label>
          <Select value={filters.year} onValueChange={(v) => handleFilterChange("year", v)}>
            <SelectTrigger className="bg-secondary border-border hover:border-primary/50 transition-colors">
              <SelectValue placeholder="Any year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Body Type */}
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground flex items-center gap-2">
            <Layers className="w-4 h-4" />
            Body Type
          </label>
          <Select value={filters.bodyType} onValueChange={(v) => handleFilterChange("bodyType", v)}>
            <SelectTrigger className="bg-secondary border-border hover:border-primary/50 transition-colors">
              <SelectValue placeholder="Any type" />
            </SelectTrigger>
            <SelectContent>
              {bodyTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Color */}
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Color
          </label>
          <Select value={filters.color} onValueChange={(v) => handleFilterChange("color", v)}>
            <SelectTrigger className="bg-secondary border-border hover:border-primary/50 transition-colors">
              <SelectValue placeholder="Any color" />
            </SelectTrigger>
            <SelectContent>
              {colors.map((color) => (
                <SelectItem key={color} value={color}>
                  {color}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-6">
        <Button onClick={handleSearch} variant="hero" size="lg" className="flex-1 sm:flex-none">
          <Search className="w-5 h-5 mr-2" />
          Find Vehicles
        </Button>
        {hasFilters && (
          <Button onClick={handleClear} variant="outline" size="lg">
            <X className="w-5 h-5 mr-2" />
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  );
};

export default SearchFilters;
