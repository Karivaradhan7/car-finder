import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import WitnessInputPanel, { WitnessFilters } from "@/components/WitnessInputPanel";
import AIProcessingView from "@/components/AIProcessingView";
import VehicleResultsDashboard from "@/components/VehicleResultsDashboard";
import VehicleComparisonView from "@/components/VehicleComparisonView";
import { VehicleResult } from "@/components/VehicleResultCard";
import { Shield, Database, Cpu, Camera, FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { mockVehicleResults, mockSummary, mockTotalCamerasScanned, mockTotalVehiclesDetected } from "@/data/mockVehicleResults";

type AppState = "input" | "processing" | "results";

const Index = () => {
  const [appState, setAppState] = useState<AppState>("input");
  const [results, setResults] = useState<VehicleResult[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [pendingResults, setPendingResults] = useState<VehicleResult[] | null>(null);
  const [apiDone, setApiDone] = useState(false);
  const [analysisSummary, setAnalysisSummary] = useState("");
  const [totalCamerasScanned, setTotalCamerasScanned] = useState(0);
  const [totalVehiclesDetected, setTotalVehiclesDetected] = useState(0);

  const handleSearch = async (filters: WitnessFilters) => {
    console.log("Search filters:", filters);
    setAppState("processing");
    setApiDone(false);
    setPendingResults(null);

    try {
      const { data, error } = await supabase.functions.invoke("analyze-vehicle", {
        body: { witnessDescription: filters },
      });

      if (error) throw new Error(error.message || "Analysis failed");
      if (data?.error) throw new Error(data.error);

      const matches: VehicleResult[] = (data.matches || []).map(
        (m: any, i: number) => ({
          id: m.id || String(i + 1),
          vehicleType: m.vehicleType,
          color: m.color,
          brand: m.brand,
          model: m.model || "Unknown",
          plateNumber: m.plateNumber,
          cameraId: m.cameraId,
          cameraLocation: m.cameraLocation,
          timeDetected: m.timeDetected,
          matchConfidence: m.matchConfidence,
          matchStatus: m.matchStatus,
          description: m.description,
        })
      );

      setAnalysisSummary(data.summary || "");
      setTotalCamerasScanned(data.totalCamerasScanned || 0);
      setTotalVehiclesDetected(data.totalVehiclesDetected || 0);

      setPendingResults(matches);
      setApiDone(true);
    } catch (err: any) {
      console.error("Vehicle analysis error — using mock data:", err);
      toast.info("Live API unavailable — showing demo results");
      // Fallback to mock data so the app works without backend
      setAnalysisSummary(mockSummary);
      setTotalCamerasScanned(mockTotalCamerasScanned);
      setTotalVehiclesDetected(mockTotalVehiclesDetected);
      setPendingResults(mockVehicleResults);
      setApiDone(true);
    }
  };

  const handleProcessingComplete = () => {
    if (pendingResults) {
      setResults(pendingResults);
      setAppState("results");
    }
    // If API hasn't finished yet, wait — the useEffect below handles it
  };

  // When both animation and API are done, show results
  const handleApiAndAnimationReady = () => {
    if (apiDone && pendingResults && appState === "processing") {
      setResults(pendingResults);
      setAppState("results");
    }
  };

  // Check if API finished after animation completed
  if (apiDone && pendingResults && appState === "processing") {
    // Defer to next tick to avoid state update during render
    setTimeout(() => {
      setResults(pendingResults);
      setAppState("results");
    }, 0);
  }

  const handleViewFrame = (id: string) => {
    console.log("View frame:", id);
    setShowComparison(true);
  };

  const handleTrackVehicle = (id: string) => {
    console.log("Track vehicle:", id);
  };

  const handleReset = () => {
    setAppState("input");
    setResults([]);
    setShowComparison(false);
    setPendingResults(null);
    setApiDone(false);
    setAnalysisSummary("");
    setTotalCamerasScanned(0);
    setTotalVehiclesDetected(0);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">AI-Based Witness-Guided Vehicle Re-Identification System</h1>
                <p className="text-xs text-muted-foreground">Crime Scene Investigation • Multi-Camera Surveillance</p>
              </div>
            </div>
            {appState === "results" && (
              <button
                onClick={handleReset}
                className="text-sm text-primary hover:text-primary/80 transition-colors"
              >
                New Search
              </button>
            )}
            <Link
              to="/overview"
              className="flex items-center gap-1.5 text-sm bg-card border border-border rounded-lg px-3 py-1.5 text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
            >
              <FileText className="w-4 h-4" /> Project PPT
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-8 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-2 mb-6">
            <Database className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary">Stanford Cars • CompCars • VeRi-776 • BoxCars • VRIC Datasets</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Vehicle Re-Identification System
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            AI-powered vehicle identification across CCTV and traffic cameras using witness descriptions. 
            Supporting multiple car brands including Toyota, Hyundai, Honda, BMW, Audi, Mercedes, Ford, and more.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mt-8 max-w-2xl mx-auto">
            <div className="bg-card/50 border border-border rounded-lg p-3">
              <Cpu className="w-5 h-5 text-primary mx-auto mb-1" />
              <div className="text-xl font-bold text-foreground">YOLOv8</div>
              <div className="text-xs text-muted-foreground">Detection</div>
            </div>
            <div className="bg-card/50 border border-border rounded-lg p-3">
              <Database className="w-5 h-5 text-primary mx-auto mb-1" />
              <div className="text-xl font-bold text-foreground">431+</div>
              <div className="text-xs text-muted-foreground">Car Models</div>
            </div>
            <div className="bg-card/50 border border-border rounded-lg p-3">
              <Camera className="w-5 h-5 text-primary mx-auto mb-1" />
              <div className="text-xl font-bold text-foreground">5</div>
              <div className="text-xs text-muted-foreground">Datasets</div>
            </div>
            <div className="bg-card/50 border border-border rounded-lg p-3">
              <Shield className="w-5 h-5 text-primary mx-auto mb-1" />
              <div className="text-xl font-bold text-foreground">14</div>
              <div className="text-xs text-muted-foreground">Colors</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-20">
        <div className="max-w-6xl mx-auto space-y-8">
          {appState === "input" && (
            <WitnessInputPanel onSearch={handleSearch} />
          )}

          {appState === "processing" && (
            <AIProcessingView onComplete={handleProcessingComplete} />
          )}

          {appState === "results" && (
            <>
              <VehicleResultsDashboard
                results={results}
                summary={analysisSummary}
                totalCamerasScanned={totalCamerasScanned}
                totalVehiclesDetected={totalVehiclesDetected}
                onViewFrame={handleViewFrame}
                onTrackVehicle={handleTrackVehicle}
              />
              
              {showComparison && (
                <VehicleComparisonView similarityScore={88} />
              )}
            </>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            Powered by Stanford Cars • CompCars • VeRi-776 • BoxCars • VRIC Datasets • Deep Learning Vehicle Re-Identification
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
