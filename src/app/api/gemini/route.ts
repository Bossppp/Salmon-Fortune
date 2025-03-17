import type { NextRequest } from "next/server";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

interface GeminiApiRecieverProps {
  story: string;
  options?: Map<string, boolean>;
}

// interface GeminiApiResponseProps {
//     luckyTopics: Array<{ topic: string; percentage: number }>;
//     advice: string;
//     options?: Map<string, boolean>;
// }

const stringDetector = (text: string): boolean => {
  return Boolean(text && text.trim().length > 0);
};

export async function POST(request: NextRequest) {
  const body: GeminiApiRecieverProps = await request.json();

  if (!stringDetector(body.story)) {
    return Response.json(
      { message: "Please enter story teller!" },
      { status: 400 }
    );
  }

  // Define the JSON schema for the expected response:
  // - luckyTopics: list of objects containing a lucky topic and its percentage (0-100%)
  // - advice: a string explaining how to address luck-related matters.
  const schema = {
    description: "Lucky analysis and advice",
    type: SchemaType.OBJECT,
    properties: {
      luckyTopics: {
        type: SchemaType.ARRAY,
        description: "List of lucky topics with percentages (0-100%)",
        items: {
          type: SchemaType.OBJECT,
          properties: {
            topic: {
              type: SchemaType.STRING,
              description: "A lucky aspect in a specific area",
              nullable: false,
            },
            percentage: {
              type: SchemaType.NUMBER,
              description: "Luck percentage between 0 and 100",
              nullable: false,
            },
          },
          required: ["topic", "percentage"],
        },
      },
      advice: {
        type: SchemaType.STRING,
        description: "Advice on how to solve issues related to luck",
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

  // Generate content based on the input story.
  const result = await model.generateContent(body.story);

  // Attempt to parse the JSON response.
  try {
    const output = JSON.parse(result.response.text());
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
