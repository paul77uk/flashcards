const { CohereClient } = require("cohere-ai");
import { NextResponse } from "next/server";

const systemPrompt = `
You are a flashcard creator, you take in text and create multiple flashcards from it. Make sure to create exactly 10 flashcards.
Both front and back should be one sentence long.
You should return in the following JSON format:
{
  "flashcards":[
    {
      "front": "Front of the card",
      "back": "Back of the card"
    }
  ]
}
`;

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});
export async function POST(req) {
  const data = await req.text();

  const response = await cohere.chat({
    chatHistory: [
      { role: "USER", message: data },
      // {
      //   role: "CHATBOT",
      //   message:
      //     "The man who is widely credited with discovering gravity is Sir Isaac Newton",
      // },
    ],
    message: systemPrompt,
    // perform web search before answering the question. You can also use your own custom connector.
    connectors: [{ id: "web-search" }],
  });

  console.log(response.text);

  return new NextResponse({
    status: 200,
    body: JSON.stringify({ flashcards: response.text }),
  });
}
