import { v } from "convex/values";
import { action } from "./_generated/server";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export const generateAudioAction = action({
//   args: { input: v.string(), voice: v.string() },
//   handler: async (_, { voice, input }) => {
//     const mp3 = await openai.audio.speech.create({
//       model: "gpt-4o-mini-tts",
//       voice: voice as SpeechCreateParams["voice"],
//       input: input,
//     });

//     const buffer = await mp3.arrayBuffer();

//     return buffer;
//   },
// });

// convex/generateAudioAction.ts
// convex/openai/generateAudioAction.ts

export const generateAudioAction = action({
  args: { input: v.string() },
  handler: async (_, { input }) => {
    if (!input || input.trim().length === 0) {
      throw new Error("Input text is required");
    }

    const query = encodeURIComponent(input.trim().slice(0, 200)); // limit length
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${query}&tl=en&client=tw-ob`;

    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/110.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Google TTS request failed: ${response.status} - ${errorText}`
      );
    }

    const buffer = await response.arrayBuffer();
    return buffer;
  },
});

export const generateThumbnailWithoutApiKey = action({
  args: { prompt: v.string() },
  handler: async (_, { prompt }) => {
    const response = await fetch(
      "https://stabilityai-stable-diffusion.hf.space/run/predict",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: [prompt],
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Hugging Face error:", errorText);
      throw new Error("Failed to generate image");
    }

    const result = await response.json();
    const imagePath = result.data?.[0]; // Base64 encoded image or path

    if (!imagePath || typeof imagePath !== "string") {
      throw new Error("Image not returned");
    }

    // Some Spaces return URLs, others return base64
    const imageResponse = imagePath.startsWith("data:image/")
      ? await fetch(imagePath)
      : await fetch(
          "https://stabilityai-stable-diffusion.hf.space" + imagePath
        );

    const buffer = await imageResponse.arrayBuffer();
    return buffer;
  },
});
