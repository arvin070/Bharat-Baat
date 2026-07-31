import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.use(express.json({ limit: "10mb" }));

// Initialize Gemini Client safely
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// Persona system instructions for Bharat Baat
const PERSONA_INSTRUCTIONS: Record<string, string> = {
  "Sarah Jenkins":
    "You are Sarah Jenkins, a passionate UI/UX Design Lead working on Bharat Baat design systems. You talk about typography scales, 8px grids, padding, active states, cyber-noir aesthetics, and Figma tokens. Keep responses brief, friendly, natural for a messaging app, and use relevant emojis like 🚀, 🎨, ✨.",
  "Alex Chen":
    "You are Alex Chen, a Senior Full-Stack Engineer working on Bharat Baat. You talk about PR reviews, Git branches, backend APIs, performance optimization, and TypeScript. Keep responses concise and practical like chat messages.",
  "Design Sync Group":
    "You are Mike, the Product Manager in the Design Sync Group chat. You coordinate design tokens, sprint goals, and team syncs. Keep replies succinct and focused on project milestones.",
  "Bharat AI Assistant":
    "You are Bharat AI Assistant, a smart cybernetic companion integrated into Bharat Baat. You provide sharp, helpful, intelligent answers in tech, design, code, and daily tasks.",
};

// API Endpoint for Chat
app.post("/api/chat", async (req, res) => {
  try {
    const { message, persona = "Sarah Jenkins", history = [] } = req.body;

    const ai = getGeminiClient();
    if (!ai) {
      // Smart fallbacks when API key isn't populated
      const fallbackResponses: Record<string, string[]> = {
        "Sarah Jenkins": [
          "That's a great point! I'll update the Figma components and check the contrast ratios.",
          "Awesome! Bumping the padding to 64px on desktop definitely gives it that airy, cyber-noir feel.",
          "I've updated the component tokens on our design system repository. Take a look when free!",
        ],
        "Alex Chen": [
          "I just reviewed your commit! Everything looks solid. Merging to main now.",
          "Let's double-check the server endpoints for latency. I'll run a quick bench test.",
          "Sounds good! The PR is approved and built successfully.",
        ],
        "Design Sync Group": [
          "Mike: Perfect, let's lock in the component specs for tomorrow's standup.",
          "Priya: I'll prepare the responsive breakpoints presentation.",
          "Mike: Thanks everyone! Sync at 10 AM.",
        ],
        "Bharat AI Assistant": [
          "Namaste! How can I assist you further with Bharat Baat today?",
          "I've processed your query. Let me know if you need code generation, text analysis, or design ideas!",
        ],
      };

      const options = fallbackResponses[persona] || fallbackResponses["Sarah Jenkins"];
      const reply = options[Math.floor(Math.random() * options.length)];
      return res.json({ text: reply, isFallback: true });
    }

    const systemInstruction =
      PERSONA_INSTRUCTIONS[persona] || PERSONA_INSTRUCTIONS["Bharat AI Assistant"];

    // Format chat history for Gemini contents
    const contents: any[] = [];
    if (history && Array.isArray(history)) {
      for (const msg of history.slice(-6)) {
        contents.push({
          role: msg.sender === "user" ? "user" : "model",
          parts: [{ text: msg.text }],
        });
      }
    }
    contents.push({
      role: "user",
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents,
      config: {
        systemInstruction,
        temperature: 0.8,
      },
    });

    res.json({ text: response.text || "Got it!" });
  } catch (error: any) {
    console.error("Error in /api/chat:", error);
    res.status(500).json({ error: error.message || "Failed to generate AI response" });
  }
});

// API Endpoint for TTS Voice Generation
app.post("/api/tts", async (req, res) => {
  try {
    const { text, voiceName = "Kore" } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.status(400).json({ error: "Gemini API key not configured for TTS" });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-tts-preview",
      contents: [{ parts: [{ text }] }],
      config: {
        responseModalities: ["AUDIO"],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName },
          },
        },
      },
    });

    const base64Audio =
      response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

    if (base64Audio) {
      res.json({ audio: base64Audio });
    } else {
      res.status(500).json({ error: "No audio generated" });
    }
  } catch (error: any) {
    console.error("Error in /api/tts:", error);
    res.status(500).json({ error: error.message || "TTS error" });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Bharat Baat server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
