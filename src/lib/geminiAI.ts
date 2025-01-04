import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY!;

const genAI = new GoogleGenerativeAI(apiKey);
// console.log(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export const chatSession = model.startChat({
  generationConfig: generationConfig,
  history: [],
});

// export async function chatSession(): Promise<{
//   sendMessage: (prompt: string) => void;
// }> {
//   return {
//     sendMessage: function (prompt: string): void {
//       console.log(prompt);
//     },
//   };
// }

// interface IChatSession {
//   sendMessage: (prompt: string) => Promise<void>;
// }

// export const chatSession: IChatSession = {
//   sendMessage: async (prompt: string) => console.log(prompt),
// };
