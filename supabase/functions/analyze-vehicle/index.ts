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
- An imageUrl: generate a realistic placeholder URL in the format "https://images.unsplash.com/photo-XXXXXXXXX?w=400&h=300&fit=crop" using real Unsplash photo IDs for vehicles/cars/traffic. Use these real Unsplash IDs:
  * For white cars: "photo-1549317661-bd32c8ce0afa"
  * For black cars: "photo-1503376780353-7e6692767b70"  
  * For red cars: "photo-1552519507-da3b142c6e3d"
  * For blue cars: "photo-1494976388531-d1058494cdd8"
  * For silver/gray cars: "photo-1553440569-bcc63803a83d"
  * For SUVs: "photo-1519641471654-76ce0107ad1b"
  * For trucks: "photo-1561361513-2d000a50f0dc"
  * For bikes: "photo-1558981806-ec527fa84c39"
  * For generic vehicles: "photo-1492144534655-ae79c964c9d7"
  Mix and vary these across results.

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
