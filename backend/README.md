# 🚗 Vehicle Re-Identification Backend

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                   Frontend (React)                   │
│         Lovable Cloud Edge Function (proxy)          │
└──────────────────────┬──────────────────────────────┘
                       │ HTTP API
┌──────────────────────▼──────────────────────────────┐
│              Python Backend (FastAPI)                │
│                                                      │
│  ┌─────────────┐  ┌──────────────┐  ┌────────────┐ │
│  │   YOLOv8    │  │  ResNet-50   │  │ MobileNetV2│ │
│  │  Detection  │  │  Features    │  │  Features  │ │
│  └──────┬──────┘  └──────┬───────┘  └─────┬──────┘ │
│         │                │                 │        │
│  ┌──────▼────────────────▼─────────────────▼──────┐ │
│  │         Cosine Similarity Matching              │ │
│  │    Vehicle Re-Identification Engine             │ │
│  └─────────────────────────────────────────────────┘ │
│                                                      │
│  Datasets: Stanford Cars │ CompCars │ VeRi-776       │
│            BoxCars │ VRIC                            │
└──────────────────────────────────────────────────────┘
```

## Setup

```bash
cd backend
pip install -r requirements.txt
python main.py
```

Server runs at `http://localhost:8000`

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Health check & model info |
| `/api/analyze-vehicle` | POST | Full pipeline: detect + extract + match |
| `/api/compare-vehicles` | POST | Compare two vehicle images (ReID) |
| `/api/extract-features` | POST | Extract embedding from single image |

## Models Used

| Component | Model | Purpose |
|-----------|-------|---------|
| Detection | YOLOv8n | Localize vehicles in frames |
| Features | ResNet-50 | High-accuracy appearance embeddings |
| Features | MobileNetV2 | Lightweight alternative for edge |
| Color | HSV Analysis | Dominant color classification |
| Matching | Cosine Similarity | Cross-camera re-identification |

## GPU Deployment

For production, deploy on a GPU instance:
- AWS: `g4dn.xlarge` (T4 GPU)
- GCP: `n1-standard-4` + T4
- Railway / Render: GPU-enabled plans
