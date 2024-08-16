const { CohereClient } = require("cohere-ai");
import next from "next";
import { NextResponse } from "next/server";

const systemPrompt = `
You are a flashcard creator, you take in text and create multiple flashcards from it. Make sure to create exactly 10 flashcards.
Both front and back should be one sentence long.
You should return in the following format
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

  // Parse the JSON response from the OpenAI API
  // const flashcards = response.text;
  // remove ```json from the start and end of the response
  const start = response.text.indexOf("{");
  const end = response.text.lastIndexOf("}");
  response.text = response.text.substring(start, end + 1);

  console.log(response.text);
  
  const parsedFlashcards = JSON.parse(response.text);

  

  // Return the flashcards as a JSON response
  // const nextResponse = new NextResponse(flashcards);
  // console.log(nextResponse);

  // return nextResponse;
  return NextResponse.json(parsedFlashcards.flashcards);
}
