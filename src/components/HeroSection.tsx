import { Car, Scan, Database, Upload } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="relative py-16 md:py-24 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-30 animate-float" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl opacity-20 animate-float" style={{ animationDelay: "3s" }} />
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-in">
          <Database className="w-4 h-4 text-primary" />
          <span className="text-sm text-primary font-medium">Stanford Cars Dataset</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 opacity-0 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <span className="text-foreground">Vehicle</span>
          <br />
          <span className="gradient-text">Re-Identification</span>
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 opacity-0 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          Upload an image or video of a vehicle, tag its features, and find matching cars in our database. Search by make, model, year, body type, or color.
        </p>

        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-4 opacity-0 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary/50 border border-border">
            <Upload className="w-4 h-4 text-primary" />
            <span className="text-sm text-foreground">Image & Video Upload</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary/50 border border-border">
            <Car className="w-4 h-4 text-primary" />
            <span className="text-sm text-foreground">Manual Feature Tagging</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary/50 border border-border">
            <Scan className="w-4 h-4 text-primary" />
            <span className="text-sm text-foreground">Instant Matching</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary/50 border border-border">
            <Database className="w-4 h-4 text-primary" />
            <span className="text-sm text-foreground">Extensive Database</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
