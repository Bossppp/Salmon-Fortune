import type { NextRequest } from "next/server";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

interface GeminiApiRecieverProps {
  story: string;
  tones: Array<string>;
}

interface GeminiApiResponseProps {
  prompt: string;
  advice: string;
  luckyTopics: Array<GeminiResponse>;
}

interface GeminiResponse {
  percentage: number;
  reason: string;
  topic: string;
}

const stringDetector = (text: string): boolean => {
  return Boolean(text && text.trim().length > 0);
};

export async function POST(request: NextRequest) {
  const body: GeminiApiRecieverProps = await request.json();

  if (!stringDetector(body.story)) {
    return Response.json(
      { message: "Please enter story telling" },
      { status: 400 }
    );
  }

  if (!Array.isArray(body.tones) || body.tones.length < 1) {
    return Response.json(
      { message: "Please enter at least a tone" },
      { status: 400 }
    );
  }

  const schema = {
    description: "Lucky analysis and advice",
    type: SchemaType.OBJECT,
    properties: {
      luckyTopics: {
        type: SchemaType.ARRAY,
        description:
          "รายชื่อหัวข้อที่โชคดีพร้อมเปอร์เซ็นต์ (0-100%) และเหตุผลที่ได้มา โดยอ้างอิงเนื้อหาจากเรื่องราวของ input prompt",
        items: {
          type: SchemaType.OBJECT,
          properties: {
            topic: {
              type: SchemaType.STRING,
              description: "หัวข้อที่โชคดี",
              nullable: false,
            },
            percentage: {
              type: SchemaType.NUMBER,
              description: "เปอร์เซ็นต์ความโชคดี มีค่าได้เป็น(0-100)",
              nullable: false,
            },
            reason: {
              type: SchemaType.STRING,
              description: "ให้เหตุผลที่คำนวณว่าเป็นหัวข้อที่โชคดี",
              nullable: false,
            },
          },
          required: ["topic", "percentage", "reason"],
        },
      },
      advice: {
        type: SchemaType.STRING,
        description: "คำทำนายจากเรื่องราวที่ให้",
        nullable: false,
      },
    },
    required: ["luckyTopics", "advice"],
  };

  // Initialize Gemini with the JSON output configuration.
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-lite",
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: schema as any,
    },
  });

  const tones = body.tones.join(", ");
  const prompt = `${body.story} \nให้คำตอบมีความโทนในการตอบตลก \nให้จำลองว่าถ้าเป็นคนเหล่าดังนี้ในการตอบคำถาม: ${tones}`;
  try {
    var result = await model.generateContent(prompt);
  } catch (error) {
    console.error((error as any).message);
    return Response.json(
      {
        message: "Error generating content from Gemini.",
      },
      { status: 500 }
    );
  }

  // Attempt to parse the JSON response.
  try {
    const parsedResponse = JSON.parse(result.response.text());
    const output: GeminiApiResponseProps = { prompt: body.story, ...parsedResponse };
    return Response.json(output, { status: 200 });
  } catch (error) {
    return Response.json(
      {
        message: "Error parsing JSON response from Gemini.",
        raw: result.response.text(),
      },
      { status: 500 }
    );
  }
}
