import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import SearchFilters, { Filters } from "@/components/SearchFilters";
import ResultsGrid from "@/components/ResultsGrid";
import { carsDataset, Car } from "@/data/carsDataset";

const Index = () => {
  const [results, setResults] = useState<Car[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (filters: Filters) => {
    const filtered = carsDataset.filter((car) => {
      if (filters.make && car.make !== filters.make) return false;
      if (filters.model && car.model !== filters.model) return false;
      if (filters.year && car.year !== parseInt(filters.year)) return false;
      if (filters.bodyType && car.bodyType !== filters.bodyType) return false;
      if (filters.color && car.color !== filters.color) return false;
      return true;
    });

    setResults(filtered);
    setHasSearched(true);
  };

  const handleClear = () => {
    setResults([]);
    setHasSearched(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <svg className="w-6 h-6 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">VehicleID</h1>
              <p className="text-xs text-muted-foreground">Re-Identification System</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-24">
        <HeroSection />
        
        <div className="max-w-6xl mx-auto space-y-10 pb-20">
          <SearchFilters onSearch={handleSearch} onClear={handleClear} />
          <ResultsGrid cars={results} hasSearched={hasSearched} />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            Powered by Stanford Cars Dataset • Vehicle Re-Identification System
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
