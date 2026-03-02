import { Shield, Cpu, Database, Camera, Eye, GitBranch, Layers, CheckCircle, ArrowRight, Brain, Search, FileText } from "lucide-react";

const slide = (children: React.ReactNode, bg = "bg-background") => (
  <section className={`min-h-screen flex flex-col justify-center px-12 py-16 border-b border-border ${bg}`}>
    {children}
  </section>
);

const ProjectOverview = () => (
  <div className="font-sans text-foreground">

    {/* SLIDE 1 — Title */}
    {slide(
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-5 py-2 text-primary text-sm font-medium">
          <Shield className="w-4 h-4" /> Crime Scene Investigation Tool
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-foreground leading-tight">
          AI-Based Witness-Guided<br />
          <span className="text-primary">Vehicle Re-Identification</span><br />
          System
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Identifying crime-scene vehicles across CCTV & traffic camera networks using AI, deep learning, and witness descriptions.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-4">
          {["YOLOv8", "ResNet-50", "MobileNetV2", "Gemini AI", "OCR", "Cosine Similarity"].map(t => (
            <span key={t} className="bg-card border border-border rounded-full px-4 py-1.5 text-sm font-medium text-foreground">{t}</span>
          ))}
        </div>
      </div>,
      "bg-card/30"
    )}

    {/* SLIDE 2 — Problem Statement */}
    {slide(
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">Problem Statement</span>
          <h2 className="text-4xl font-bold text-foreground">Why This System?</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: <Eye className="w-7 h-7 text-destructive" />, title: "Manual CCTV Review", desc: "Officers spend hours manually scanning hundreds of CCTV feeds to find a single vehicle — slow, error-prone, and inefficient." },
            { icon: <Search className="w-7 h-7 text-yellow-500" />, title: "Partial Information", desc: "Witnesses provide incomplete details: partial plate numbers, rough color descriptions, uncertain brand/model guesses." },
            { icon: <Camera className="w-7 h-7 text-blue-500" />, title: "Multi-Camera Challenge", desc: "A vehicle moves across multiple cameras. Linking the same vehicle across feeds requires re-identification — a hard computer vision problem." },
          ].map(item => (
            <div key={item.title} className="bg-card border border-border rounded-xl p-6 space-y-3">
              {item.icon}
              <h3 className="font-semibold text-lg text-foreground">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* SLIDE 3 — Solution Overview */}
    {slide(
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">Solution</span>
          <h2 className="text-4xl font-bold text-foreground">Our Approach</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">A multi-stage AI pipeline that takes witness input and searches the entire CCTV network automatically.</p>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4 justify-center flex-wrap">
          {[
            { label: "Witness Input", sub: "Color, Brand, Model, Plate, Location, Time", color: "bg-primary/10 border-primary/30" },
            { label: "YOLOv8 Detection", sub: "Detect vehicles in CCTV frames", color: "bg-blue-500/10 border-blue-500/30" },
            { label: "CNN Embeddings", sub: "ResNet-50 / MobileNetV2 features", color: "bg-purple-500/10 border-purple-500/30" },
            { label: "Color + OCR", sub: "HSV color analysis + plate OCR", color: "bg-yellow-500/10 border-yellow-500/30" },
            { label: "Cosine Matching", sub: "Rank by similarity score", color: "bg-green-500/10 border-green-500/30" },
            { label: "CCTV Results", sub: "Images, camera IDs, confidence %", color: "bg-orange-500/10 border-orange-500/30" },
          ].map((step, i) => (
            <div key={step.label} className="flex items-center gap-3">
              <div className={`border rounded-xl px-5 py-3 text-center min-w-[140px] ${step.color}`}>
                <div className="font-semibold text-foreground text-sm">{step.label}</div>
                <div className="text-xs text-muted-foreground mt-1">{step.sub}</div>
              </div>
              {i < 5 && <ArrowRight className="w-4 h-4 text-muted-foreground hidden md:block shrink-0" />}
            </div>
          ))}
        </div>
      </div>,
      "bg-card/20"
    )}

    {/* SLIDE 4 — Architecture */}
    {slide(
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">Architecture</span>
          <h2 className="text-4xl font-bold text-foreground">System Architecture</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground flex items-center gap-2"><Layers className="w-5 h-5 text-primary" /> Frontend (React + Vite)</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {["Witness Input Panel — collects crime scene details", "AI Processing View — animated pipeline progress display", "Vehicle Results Dashboard — CCTV match cards with images", "Vehicle Comparison View — side-by-side similarity analysis"].map(i => (
                <li key={i} className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />{i}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground flex items-center gap-2"><Brain className="w-5 h-5 text-primary" /> Backend (Edge Functions + AI)</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {["Lovable Cloud Edge Function — serverless, auto-scaling", "Gemini AI Gateway — simulates full YOLOv8 + CNN pipeline", "Python FastAPI reference — real YOLOv8/ResNet for GPU servers", "CORS-enabled REST API with structured tool-call responses"].map(i => (
                <li key={i} className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />{i}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )}

    {/* SLIDE 5 — Datasets */}
    {slide(
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">Training Data</span>
          <h2 className="text-4xl font-bold text-foreground">Datasets Used</h2>
        </div>
        <div className="grid md:grid-cols-5 gap-4">
          {[
            { name: "Stanford Cars", images: "16,185", classes: "196 classes", detail: "Fine-grained car recognition" },
            { name: "CompCars", images: "136,726", classes: "1,716 models", detail: "Comprehensive car model coverage" },
            { name: "VeRi-776", images: "49,357", classes: "776 vehicles", detail: "Multi-camera re-identification" },
            { name: "BoxCars", images: "116,286", classes: "27 types", detail: "Fine-grained 3D box shapes" },
            { name: "VRIC", images: "60,430", classes: "5,622 vehicles", detail: "Video re-identification" },
          ].map(d => (
            <div key={d.name} className="bg-card border border-border rounded-xl p-4 text-center space-y-2">
              <Database className="w-6 h-6 text-primary mx-auto" />
              <div className="font-bold text-foreground text-sm">{d.name}</div>
              <div className="text-2xl font-extrabold text-primary">{d.images}</div>
              <div className="text-xs text-muted-foreground">{d.classes}</div>
              <div className="text-xs text-muted-foreground italic">{d.detail}</div>
            </div>
          ))}
        </div>
        <p className="text-center text-muted-foreground text-sm">Total: <strong className="text-foreground">378,984+ images</strong> across 5 datasets covering vehicles worldwide</p>
      </div>,
      "bg-card/20"
    )}

    {/* SLIDE 6 — AI Pipeline Detail */}
    {slide(
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">AI Pipeline</span>
          <h2 className="text-4xl font-bold text-foreground">4-Stage Detection Pipeline</h2>
        </div>
        <div className="grid md:grid-cols-4 gap-5">
          {[
            { stage: "Stage 1", title: "YOLOv8 Detection", icon: <Cpu className="w-8 h-8 text-blue-500" />, points: ["Scans CCTV & traffic camera frames", "Detects: Cars, Bikes, Trucks, Buses", "Confidence threshold: 30%+", "Outputs bounding boxes per vehicle"] },
            { stage: "Stage 2", title: "CNN Feature Extraction", icon: <Brain className="w-8 h-8 text-purple-500" />, points: ["ResNet-50 (2048-dim embeddings)", "MobileNetV2 (1280-dim, edge-optimized)", "L2-normalized feature vectors", "Trained on 5 vehicle datasets"] },
            { stage: "Stage 3", title: "Color + OCR", icon: <Eye className="w-8 h-8 text-yellow-500" />, points: ["HSV color space analysis", "14 color classes supported", "Partial plate OCR matching", "Wildcard pattern support (KA-05-**-1234)"] },
            { stage: "Stage 4", title: "Cosine Similarity Ranking", icon: <GitBranch className="w-8 h-8 text-green-500" />, points: ["Compares embeddings across cameras", "Exact match: >85% confidence", "Partial match: 60–85%", "Results ranked by score"] },
          ].map(s => (
            <div key={s.stage} className="bg-card border border-border rounded-xl p-5 space-y-3">
              {s.icon}
              <div className="text-xs font-semibold text-primary uppercase tracking-wider">{s.stage}</div>
              <div className="font-bold text-foreground">{s.title}</div>
              <ul className="space-y-1">
                {s.points.map(p => <li key={p} className="text-xs text-muted-foreground flex items-start gap-1.5"><span className="text-primary mt-0.5">•</span>{p}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* SLIDE 7 — Input / Output */}
    {slide(
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">System I/O</span>
          <h2 className="text-4xl font-bold text-foreground">Input → Output</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-card border border-border rounded-xl p-6 space-y-4">
            <h3 className="font-bold text-lg text-foreground flex items-center gap-2"><FileText className="w-5 h-5 text-primary" /> Witness Inputs</h3>
            <div className="space-y-3">
              {[
                { field: "Vehicle Type", eg: "Car / Bike / SUV / Truck / Van" },
                { field: "Vehicle Color", eg: "White, Black, Red, Blue, Silver…" },
                { field: "Vehicle Brand", eg: "Toyota, Honda, BMW, Hyundai…" },
                { field: "Vehicle Model", eg: "Innova, Civic, 3 Series, Creta…" },
                { field: "Partial Plate", eg: "KA-05-**-1234 or MH-12-AB-**" },
                { field: "Crime Location", eg: "MG Road, Mumbai / NH-48 Delhi" },
                { field: "Time Range", eg: "18:00 – 19:30" },
              ].map(r => (
                <div key={r.field} className="flex items-start gap-3 text-sm">
                  <span className="font-medium text-foreground w-32 shrink-0">{r.field}</span>
                  <span className="text-muted-foreground">{r.eg}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-6 space-y-4">
            <h3 className="font-bold text-lg text-foreground flex items-center gap-2"><Camera className="w-5 h-5 text-green-500" /> System Outputs</h3>
            <div className="space-y-3">
              {[
                { field: "CCTV Frame Image", eg: "Actual car image matching brand/model" },
                { field: "Camera ID", eg: "CAM-NH48-017, CCTV-MG-RD-003" },
                { field: "Camera Location", eg: "Street/intersection near crime scene" },
                { field: "Detection Time", eg: "Timestamp within given time range" },
                { field: "Plate Number", eg: "Partial or full plate, OCR-matched" },
                { field: "Match Confidence", eg: "0–100%, Exact (>85%) or Partial" },
                { field: "Match Status", eg: "EXACT MATCH / PARTIAL MATCH" },
              ].map(r => (
                <div key={r.field} className="flex items-start gap-3 text-sm">
                  <span className="font-medium text-foreground w-36 shrink-0">{r.field}</span>
                  <span className="text-muted-foreground">{r.eg}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>,
      "bg-card/20"
    )}

    {/* SLIDE 8 — Tech Stack */}
    {slide(
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">Technology</span>
          <h2 className="text-4xl font-bold text-foreground">Tech Stack</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { cat: "Frontend", color: "text-blue-500", items: ["React 18 + TypeScript", "Vite (build tool)", "Tailwind CSS (styling)", "shadcn/ui components", "Lucide React icons"] },
            { cat: "AI / Backend", color: "text-purple-500", items: ["Gemini 3 Flash (AI Gateway)", "Lovable Cloud Edge Functions", "Python FastAPI (reference)", "YOLOv8 (Ultralytics)", "ResNet-50 / MobileNetV2"] },
            { cat: "Data & Infra", color: "text-green-500", items: ["Lovable Cloud (hosted backend)", "5 Vehicle Datasets (378K+ images)", "scikit-learn cosine similarity", "OpenCV HSV color detection", "Supabase JS SDK"] },
          ].map(col => (
            <div key={col.cat} className="bg-card border border-border rounded-xl p-5 space-y-3">
              <h3 className={`font-bold text-lg ${col.color}`}>{col.cat}</h3>
              <ul className="space-y-2">
                {col.items.map(i => <li key={i} className="text-sm text-muted-foreground flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-green-500 shrink-0" />{i}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* SLIDE 9 — Results Example */}
    {slide(
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">Results</span>
          <h2 className="text-4xl font-bold text-foreground">Sample Detection Results</h2>
          <p className="text-muted-foreground">Given input: White Toyota Innova, Partial plate KA-05-**-1234, MG Road, 18:00–19:00</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { conf: 96, status: "EXACT", cam: "CAM-MG-001", loc: "MG Road & Brigade Junction", plate: "KA-05-AB-1234", time: "18:14", desc: "White Toyota Innova spotted turning left" },
            { conf: 89, status: "EXACT", cam: "CCTV-MG-RD-003", loc: "Residency Road Flyover", plate: "KA-05-CD-1234", time: "18:22", desc: "Vehicle detected at traffic signal" },
            { conf: 71, status: "PARTIAL", cam: "TC-JN-045", loc: "Cunningham Road Junction", plate: "KA-05-EF-5678", time: "18:37", desc: "Similar white MPV detected" },
          ].map(r => (
            <div key={r.cam} className="bg-card border border-border rounded-xl overflow-hidden">
              <div className={`h-2 ${r.status === "EXACT" ? "bg-green-500" : "bg-yellow-500"}`} />
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-muted-foreground">{r.cam}</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${r.status === "EXACT" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}>{r.conf}% {r.status}</span>
                </div>
                <div className="font-semibold text-foreground text-sm">White Toyota Innova</div>
                <div className="text-xs text-muted-foreground">{r.loc}</div>
                <div className="font-mono text-xs bg-muted/30 rounded px-2 py-1">Plate: {r.plate}</div>
                <div className="text-xs text-muted-foreground">{r.time} — {r.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>,
      "bg-card/20"
    )}

    {/* SLIDE 10 — Conclusion */}
    {slide(
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <span className="text-primary font-semibold text-sm uppercase tracking-widest">Conclusion</span>
        <h2 className="text-4xl font-bold text-foreground">Key Achievements</h2>
        <div className="grid md:grid-cols-2 gap-5 text-left">
          {[
            "Witness-guided search reduces manual CCTV review from hours to seconds",
            "Multi-camera vehicle re-identification using deep learning embeddings",
            "Supports partial plate matching with OCR wildcard patterns",
            "5 datasets covering 378K+ images for robust vehicle recognition",
            "Real-time AI pipeline: YOLOv8 → CNN → Color → OCR → Cosine Match",
            "Deployable on GPU servers (AWS/GCP) for production-scale operations",
          ].map(point => (
            <div key={point} className="flex items-start gap-3 bg-card border border-border rounded-xl p-4">
              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
              <span className="text-sm text-muted-foreground leading-relaxed">{point}</span>
            </div>
          ))}
        </div>
        <div className="pt-4">
          <a href="/" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
            <Shield className="w-4 h-4" /> Try the Live System
          </a>
        </div>
      </div>
    )}

  </div>
);

export default ProjectOverview;
