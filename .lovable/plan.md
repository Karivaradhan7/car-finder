
## Problem Analysis

The core issues are:
1. **Wrong images**: The AI picks from a small fixed list (only luxury/sports cars) — so Toyota Innova gets matched to Toyota Supra image, which is completely wrong
2. **Image loading failure**: Unsplash direct photo URLs sometimes fail or return wrong images
3. **No dataset-based images**: The user wants images from the actual vehicle dataset (color + brand + model match)

## Root Cause
The edge function system prompt has only ~24 luxury car images (Ferrari, Porsche, BMW, etc.). When someone inputs "White Toyota Innova" or "Red Honda City", the AI picks the closest from a wrong list.

## Solution Plan

### 1. Build a comprehensive frontend image map (deterministic, no AI guess)
Instead of letting the AI pick the image URL (which it gets wrong), I will:
- Create a `src/data/vehicleImageMap.ts` with a large curated map of `brand → model → color → imageUrl`
- Use reliable Unsplash **search-style** URLs that are specific: `https://images.unsplash.com/search/photos?query=white+toyota+innova`
- Actually use Unsplash's `source.unsplash.com` with specific search queries like `https://source.unsplash.com/featured/400x300?white,toyota,innova`

**Better approach**: Use a deterministic mapping in the FRONTEND (VehicleResultCard) that overrides whatever imageUrl the AI returns, based on `brand + color + vehicleType`.

### 2. Fix the edge function to NOT pick imageUrl
- Remove `imageUrl` from AI output entirely
- Instead, have the frontend compute the correct image URL based on `brand`, `model`, `color` fields returned by AI

### 3. Frontend image resolver
Create `src/lib/vehicleImageResolver.ts`:
```
getVehicleImage(brand, model, color) → imageUrl
```
Uses a lookup map first, then falls back to a clean Unsplash source URL:
`https://source.unsplash.com/400x300/?${color}+${brand}+${model}+car`

This way:
- White Toyota Innova → searches for "white toyota innova car" 
- Black BMW 3 Series → searches for "black bmw 3 series car"
- Red Honda City → searches for "red honda city car"

### 4. Add a demo example prefill
Add a "Try Example" button on the witness input panel that pre-fills:
- Color: White
- Brand: Toyota  
- Model: Innova
- Type: SUV
- Location: MG Road, Bangalore
- Time: 18:00 - 19:00
- Partial plate: KA-05

This lets the user click one button to see the correct output immediately.

## Files to Change
1. **`src/lib/vehicleImageResolver.ts`** — NEW: Brand/model/color → image URL resolver
2. **`supabase/functions/analyze-vehicle/index.ts`** — Remove imageUrl from AI, let frontend handle it; also add more Indian car brands (Maruti, Mahindra, Tata, Hyundai)
3. **`src/components/VehicleResultCard.tsx`** — Use `vehicleImageResolver` instead of `result.imageUrl`
4. **`src/components/WitnessInputPanel.tsx`** — Add "Try Example" prefill button

## Key Improvement: Color + Brand Priority
The image resolver will prioritize: **exact brand+model match** → **brand match** → **color+type fallback**

Example mappings:
- Toyota Innova (any color) → photo of Toyota Innova
- Hyundai Creta White → white SUV
- Maruti Swift Red → red hatchback
- BMW 3 Series Black → black BMW sedan
