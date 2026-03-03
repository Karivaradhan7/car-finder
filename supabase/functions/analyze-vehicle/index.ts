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
- An imageUrl: pick the BEST matching image URL from this curated list based on the vehicle brand/model/color detected. ONLY use URLs from this exact list, never invent new URLs:
  AUDI R8 Coupe Silver → "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=400&h=300&fit=crop"
  AUDI S4 Sedan Black → "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop"
  BMW M3 Coupe White → "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop"
  BMW X6 SUV Black → "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=400&h=300&fit=crop"
  BMW Z4 Convertible Red → "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=400&h=300&fit=crop"
  Chevrolet Corvette Yellow Coupe → "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop"
  Chevrolet Camaro Red Coupe → "https://images.unsplash.com/photo-1603553329474-99f95f35394f?w=400&h=300&fit=crop"
  Ferrari 458 Red Coupe → "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=300&fit=crop"
  Ferrari California Red Convertible → "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=400&h=300&fit=crop"
  Ford Mustang Blue Coupe → "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400&h=300&fit=crop"
  Ford F-150 White Truck → "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=400&h=300&fit=crop"
  Honda Civic Silver Sedan → "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=400&h=300&fit=crop"
  Lamborghini Aventador Orange Coupe → "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=300&fit=crop"
  Lamborghini Gallardo Yellow Coupe → "https://images.unsplash.com/photo-1621135802920-133df287f89c?w=400&h=300&fit=crop"
  Mercedes-Benz SLS Silver Coupe → "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop"
  Mercedes-Benz C-Class Black Sedan → "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=400&h=300&fit=crop"
  Nissan GT-R Silver Coupe → "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=400&h=300&fit=crop"
  Porsche 911 Turbo White Coupe → "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop"
  Porsche Cayenne Black SUV → "https://images.unsplash.com/photo-1606664949798-c7c8d6fa05a7?w=400&h=300&fit=crop"
  Tesla Model S Red Sedan → "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=300&fit=crop"
  Toyota Supra Orange Coupe → "https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?w=400&h=300&fit=crop"
  Aston Martin V8 Silver Coupe → "https://images.unsplash.com/photo-1596636478939-59fed7a083f2?w=400&h=300&fit=crop"
  Bentley Continental Black Coupe → "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=400&h=300&fit=crop"
  Jaguar XKR Blue Coupe → "https://images.unsplash.com/photo-1617814076668-3dc5c477ba07?w=400&h=300&fit=crop"
  RULE: Match by brand first, then model/type, then color. For Toyota → use Toyota Supra image. For Honda → use Honda Civic image. For Sedan → Mercedes C-Class or Honda Civic. For SUV → BMW X6 or Porsche Cayenne. For Truck → Ford F-150. For sports/coupe → Ferrari or Lamborghini based on color.

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
