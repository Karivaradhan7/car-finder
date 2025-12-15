import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tag, Search, RotateCcw } from "lucide-react";
import { makes, bodyTypes, colors, years, getModelsByMake } from "@/data/carsDataset";

export interface TagFilters {
  make: string;
  model: string;
  year: string;
  bodyType: string;
  color: string;
}

interface MediaTaggingProps {
  onSearch: (filters: TagFilters) => void;
  onClear: () => void;
  disabled?: boolean;
}

const MediaTagging = ({ onSearch, onClear, disabled }: MediaTaggingProps) => {
  const [filters, setFilters] = useState<TagFilters>({
    make: "",
    model: "",
    year: "",
    bodyType: "",
    color: "",
  });

  const availableModels = filters.make ? getModelsByMake(filters.make) : [];

  const handleFilterChange = (key: keyof TagFilters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    
    // Reset model when make changes
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

  const hasFilters = Object.values(filters).some(v => v !== "");

  return (
    <Card className="glass-card p-6 border-border/50">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <Tag className="w-5 h-5 text-primary" />
        Tag Car Features
      </h3>

      <p className="text-sm text-muted-foreground mb-4">
        Select the features of the car visible in your uploaded media to find matching vehicles.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {/* Make */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Make</label>
          <Select
            value={filters.make}
            onValueChange={(value) => handleFilterChange("make", value)}
            disabled={disabled}
          >
            <SelectTrigger className="bg-muted/50 border-border/50">
              <SelectValue placeholder="Select make" />
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
          <label className="text-sm font-medium text-muted-foreground">Model</label>
          <Select
            value={filters.model}
            onValueChange={(value) => handleFilterChange("model", value)}
            disabled={disabled || !filters.make}
          >
            <SelectTrigger className="bg-muted/50 border-border/50">
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
          <label className="text-sm font-medium text-muted-foreground">Year</label>
          <Select
            value={filters.year}
            onValueChange={(value) => handleFilterChange("year", value)}
            disabled={disabled}
          >
            <SelectTrigger className="bg-muted/50 border-border/50">
              <SelectValue placeholder="Select year" />
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
          <label className="text-sm font-medium text-muted-foreground">Body Type</label>
          <Select
            value={filters.bodyType}
            onValueChange={(value) => handleFilterChange("bodyType", value)}
            disabled={disabled}
          >
            <SelectTrigger className="bg-muted/50 border-border/50">
              <SelectValue placeholder="Select body type" />
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
          <label className="text-sm font-medium text-muted-foreground">Color</label>
          <Select
            value={filters.color}
            onValueChange={(value) => handleFilterChange("color", value)}
            disabled={disabled}
          >
            <SelectTrigger className="bg-muted/50 border-border/50">
              <SelectValue placeholder="Select color" />
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

      <div className="flex gap-3">
        <Button
          onClick={handleSearch}
          disabled={disabled || !hasFilters}
          className="flex-1 bg-primary hover:bg-primary/90"
        >
          <Search className="w-4 h-4 mr-2" />
          Find Matching Vehicles
        </Button>
        
        <Button
          variant="outline"
          onClick={handleClear}
          disabled={disabled}
          className="border-border/50"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Clear
        </Button>
      </div>
    </Card>
  );
};

export default MediaTagging;
