import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const { imageBase64, mimeType, framework } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return Response.json(
        { error: "GEMINI_API_KEY is not set in environment variables." },
        { status: 500 }
      );
    }

    if (!imageBase64 || !mimeType) {
      return Response.json(
        { error: "Missing imageBase64 or mimeType in request." },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    // Use gemini-1.5-pro for vision capabilities and complex coding tasks
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `You are an expert frontend developer. 
I am providing you with a screenshot of a user interface design.
Your task is to convert this screenshot into production-ready, pixel-perfect code.

Requirements:
- Framework: ${framework === "nextjs" ? "Next.js (React Server Components where possible, 'use client' where needed)" : "React"}
- Styling: Tailwind CSS
- Do NOT use any external CSS files, use Tailwind utility classes exclusively.
- Use lucide-react for any icons.
- Ensure the layout is responsive (mobile-first).
- Output ONLY valid code within a markdown code block (e.g. \`\`\`tsx ... \`\`\`). Do not include any other explanations.`;

    const imageParts = [
      {
        inlineData: {
          data: imageBase64,
          mimeType,
        },
      },
    ];

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();

    // Extract code block from text (strip markdown wrappers)
    const codeMatch = text.match(/```(?:tsx|ts|jsx|js)?\n([\s\S]*?)```/);
    const code = codeMatch ? codeMatch[1].trim() : text.trim();

    return Response.json({ code });
  } catch (error: any) {
    console.error("Error generating code:", error);
    return Response.json(
      { error: error.message || "An error occurred during generation." },
      { status: 500 }
    );
  }
}
