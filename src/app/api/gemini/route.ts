import type { NextRequest } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface GeminiApiRecieverProps {
  story: string;
  checkLegs?: boolean;
}

const stringDetector = (text: string): boolean => {
  if (text == undefined || text == null || text == "" || text.length <= 0)
    return false;

  return true;
};

export async function POST(request: NextRequest) {
  const body: GeminiApiRecieverProps = await request.json();

  if (!stringDetector(body.story)) {
    return Response.json(
      {
        message: `Please enter story teller!`,
      },
      { status: 400 }
    );
  }

  // Contact to GeminiAPI
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
  const model = genAI.getGenerativeModel({
     model: "gemini-2.0-flash-lite"
    });
    const schema = await model.generateContent(body.story);

  return Response.json({ message: schema }, { status: 200 });
}
