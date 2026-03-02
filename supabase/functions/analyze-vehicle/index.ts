import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { witnessDescription, imageBase64 } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = `You are an AI-powered vehicle detection and re-identification system used in crime scene investigations. You simulate a multi-stage pipeline:
1. YOLOv8 vehicle detector scans CCTV & traffic camera footage
2. Color-CNN classifies vehicle color from HSV analysis  
3. ResNet-50/MobileNetV2 extracts deep appearance embeddings trained on Stanford Cars, CompCars, VeRi-776, BoxCars, and VRIC datasets
4. OCR module reads license plates (partial matching supported)
5. Cosine similarity matching re-identifies vehicles across cameras

Given a witness description (color, brand, model, type, location, time, partial plate number), generate realistic CCTV detection results.

For each detection provide:
- Vehicle type, color, brand, model (realistic models for the brand)
- A detected license plate number (if witness gave partial plate, some results should match that pattern with realistic full plates, others may differ)
- Camera ID (realistic format like CAM-NH48-017, CCTV-MG-RD-003, TC-JN-045)
- Camera location (realistic street/intersection names near the crime location)
- Time detected (realistic timestamps near the witness time range)
- Match confidence percentage (0-100)
- Match status: "exact" (>85%) or "partial" (60-85%)
- A brief description of the CCTV frame context (e.g., "Vehicle spotted turning left at Main St intersection")
- An imageUrl: pick the BEST matching image URL from this curated list based on the vehicle brand/model/type detected. ONLY use URLs from this list, pick the closest match:
  TOYOTA: Innova/MPV → "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/2016_Toyota_Innova_2.0_G_%28facelift%2C_brown%29%2C_front_8.21.18.jpg/320px-2016_Toyota_Innova_2.0_G_%28facelift%2C_brown%29%2C_front_8.21.18.jpg"
  TOYOTA: Camry/Sedan → "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/2021_Toyota_Camry_%28XV70%2C_facelift%29%2C_front_8.27.20.jpg/320px-2021_Toyota_Camry_%28XV70%2C_facelift%29%2C_front_8.27.20.jpg"
  TOYOTA: Fortuner/SUV → "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Toyota_Fortuner_facelift_2019_%28cropped%29.jpg/320px-Toyota_Fortuner_facelift_2019_%28cropped%29.jpg"
  TOYOTA: Corolla/Sedan → "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/2019_Toyota_Corolla_sedan_%28facelift%2C_blue%29%2C_front_8.23.19.jpg/320px-2019_Toyota_Corolla_sedan_%28facelift%2C_blue%29%2C_front_8.23.19.jpg"
  HYUNDAI: Creta/SUV → "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Hyundai_Creta_facelift_%28India%29%2C_front_8.15.22.jpg/320px-Hyundai_Creta_facelift_%28India%29%2C_front_8.15.22.jpg"
  HYUNDAI: i20/Hatchback → "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/2021_Hyundai_i20_1.0_T-GDi_Premium_%28UK%29%2C_front_8.15.21.jpg/320px-2021_Hyundai_i20_1.0_T-GDi_Premium_%28UK%29%2C_front_8.15.21.jpg"
  HONDA: City/Sedan → "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/2021_Honda_City_e%3AHEV_%28GN6%29%2C_front_8.18.22.jpg/320px-2021_Honda_City_e%3AHEV_%28GN6%29%2C_front_8.18.22.jpg"
  HONDA: Civic/Sedan → "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/2022_Honda_Civic_e%3AHEV_%28FL4%29%2C_front_9.5.22.jpg/320px-2022_Honda_Civic_e%3AHEV_%28FL4%29%2C_front_9.5.22.jpg"
  BMW: 3 Series/Sedan → "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/2019_BMW_330i_M_Sport_%28G20%29%2C_front_8.28.19.jpg/320px-2019_BMW_330i_M_Sport_%28G20%29%2C_front_8.28.19.jpg"
  BMW: X5/SUV → "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/2019_BMW_X5_xDrive30d_%28G05%29%2C_front_7.15.19.jpg/320px-2019_BMW_X5_xDrive30d_%28G05%29%2C_front_7.15.19.jpg"
  MERCEDES: C-Class/Sedan → "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/2022_Mercedes-Benz_C300_AMG_Line_%28W206%29%2C_front_9.12.22.jpg/320px-2022_Mercedes-Benz_C300_AMG_Line_%28W206%29%2C_front_9.12.22.jpg"
  AUDI: A4/Sedan → "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/2020_Audi_A4_S_Line_35_TDI_S-A_%28B9%2C_facelift%2C_grey%29%2C_front_8.12.20.jpg/320px-2020_Audi_A4_S_Line_35_TDI_S-A_%28B9%2C_facelift%2C_grey%29%2C_front_8.12.20.jpg"
  FORD: Endeavour/SUV → "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/2022_Ford_Everest_Titanium%2B_4WD_%28Thailand%29%2C_front_10.22.22.jpg/320px-2022_Ford_Everest_Titanium%2B_4WD_%28Thailand%29%2C_front_10.22.22.jpg"
  SUZUKI: Swift/Hatchback → "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/2021_Suzuki_Swift_Sport_%28AZ%2C_facelift%29%2C_front_8.16.21.jpg/320px-2021_Suzuki_Swift_Sport_%28AZ%2C_facelift%29%2C_front_8.16.21.jpg"
  MAHINDRA: Scorpio/SUV → "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Mahindra_Scorpio_N%2C_front_left.jpg/320px-Mahindra_Scorpio_N%2C_front_left.jpg"
  GENERIC: Sedan → "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/2019_Toyota_Camry_%28XV70%29_sedan_%282019-11-01%29_01.jpg/320px-2019_Toyota_Camry_%28XV70%29_sedan_%282019-11-01%29_01.jpg"
  GENERIC: SUV → "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Toyota_Fortuner_facelift_2019_%28cropped%29.jpg/320px-Toyota_Fortuner_facelift_2019_%28cropped%29.jpg"
  GENERIC: Truck → "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/2020_Ford_F-150_XLT_SuperCrew_%28facelift%29%2C_front_9.17.20.jpg/320px-2020_Ford_F-150_XLT_SuperCrew_%28facelift%29%2C_front_9.17.20.jpg"
  GENERIC: Bike/Motorcycle → "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/2020_Royal_Enfield_Meteor_350_%28Fireball%29%2C_left.jpg/320px-2020_Royal_Enfield_Meteor_350_%28Fireball%29%2C_left.jpg"
  Choose the URL that best matches the brand and model. If no exact match, use the generic one for the vehicle type.

Generate 4-6 realistic vehicle matches with varying confidence. At least 2 should be high-confidence exact matches. Include camera locations near the crime location given by the witness.`;

    const userMessage = imageBase64
      ? [
          {
            type: "text",
            text: `Witness Description: ${JSON.stringify(witnessDescription)}. Analyze this vehicle image and match against CCTV footage.`,
          },
          {
            type: "image_url",
            image_url: { url: imageBase64 },
          },
        ]
      : `Witness Crime Scene Report: ${JSON.stringify(witnessDescription)}. Search all CCTV cameras in the area and find matching vehicles.`;

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userMessage },
          ],
          tools: [
            {
              type: "function",
              function: {
                name: "report_vehicle_detections",
                description:
                  "Report detected vehicles from CCTV analysis matching witness description",
                parameters: {
                  type: "object",
                  properties: {
                    summary: {
                      type: "string",
                      description: "Brief summary of the CCTV analysis",
                    },
                    totalCamerasScanned: { type: "number" },
                    totalVehiclesDetected: { type: "number" },
                    matches: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          id: { type: "string" },
                          vehicleType: { type: "string" },
                          color: { type: "string" },
                          brand: { type: "string" },
                          model: { type: "string" },
                          plateNumber: { type: "string", description: "Detected license plate" },
                          cameraId: { type: "string" },
                          cameraLocation: { type: "string", description: "Street or intersection name" },
                          timeDetected: { type: "string" },
                          matchConfidence: { type: "number" },
                          matchStatus: {
                            type: "string",
                            enum: ["exact", "partial"],
                          },
                          description: { type: "string", description: "Brief context of the CCTV frame" },
                          imageUrl: { type: "string", description: "Unsplash vehicle image URL" },
                        },
                        required: [
                          "id",
                          "vehicleType",
                          "color",
                          "brand",
                          "model",
                          "cameraId",
                          "cameraLocation",
                          "timeDetected",
                          "matchConfidence",
                          "matchStatus",
                          "description",
                          "imageUrl",
                        ],
                      },
                    },
                  },
                  required: [
                    "summary",
                    "totalCamerasScanned",
                    "totalVehiclesDetected",
                    "matches",
                  ],
                  additionalProperties: false,
                },
              },
            },
          ],
          tool_choice: {
            type: "function",
            function: { name: "report_vehicle_detections" },
          },
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Usage limit reached. Please add credits." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const text = await response.text();
      console.error("AI gateway error:", response.status, text);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];

    if (!toolCall) {
      throw new Error("No tool call response from AI");
    }

    const result = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("analyze-vehicle error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
