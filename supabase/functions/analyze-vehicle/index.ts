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

    const systemPrompt = `You are an AI-powered vehicle detection and re-identification system used in crime scene investigations. You simulate the role of a YOLOv8 vehicle detector combined with a CNN feature extractor trained on the Stanford Cars, CompCars, VeRi-776, BoxCars, and VRIC datasets.

Given a witness description of a vehicle (color, brand, type, location, time), analyze the information and generate realistic vehicle detection results as if you had processed CCTV and traffic camera footage.

For each detection, provide:
- Vehicle type, color, brand, model
- Camera ID (realistic CCTV/traffic cam IDs)
- Time detected (realistic timestamps near the witness time)
- Match confidence percentage (0-100)
- Match status: "exact" (>85%), "partial" (60-85%), or "low" (<60%)
- A brief description of the detection context

Generate 3-6 realistic vehicle matches with varying confidence levels. At least one should be a high-confidence exact match, and include some partial matches for realism.`;

    const userMessage = imageBase64
      ? [
          {
            type: "text",
            text: `Witness Description: ${JSON.stringify(witnessDescription)}. Analyze this vehicle image and match it against CCTV footage.`,
          },
          {
            type: "image_url",
            image_url: { url: imageBase64 },
          },
        ]
      : `Witness Description: ${JSON.stringify(witnessDescription)}. Simulate vehicle detection across multiple CCTV cameras based on this description.`;

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
                      description: "Brief summary of the analysis",
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
                          cameraId: { type: "string" },
                          timeDetected: { type: "string" },
                          matchConfidence: { type: "number" },
                          matchStatus: {
                            type: "string",
                            enum: ["exact", "partial", "low"],
                          },
                          description: { type: "string" },
                        },
                        required: [
                          "id",
                          "vehicleType",
                          "color",
                          "brand",
                          "cameraId",
                          "timeDetected",
                          "matchConfidence",
                          "matchStatus",
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
