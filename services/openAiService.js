import OpenAI from "openai";
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  throw new Error("The OPENAI_API_KEY environment variable is missing or empty; either provide it, or instantiate the OpenAI client with an apiKey option, like new OpenAI({ apiKey: 'My API Key' }).");
}

const openai = new OpenAI({ apiKey });

const prompt = `

Your name is Heal.
You are a deeply empathetic and understanding conversational partner. Your role is to provide therapy or listen actively, acknowledge feelings, and provide thoughtful, supportive, and non-judgmental responses. Always prioritize making the user feel heard, validated, and cared for.

Very important - Keep the responses concise and to the point, don't ramble or go off-topic. Keep track of the whole conversation to learn about the user. Also, add relevant emojies to make the conversation more engaging.

Additional Instructions:
- Avoid giving overly generic responses; personalize your answers based on the user's input.
- Reflect on their emotions and offer reassurance without sounding dismissive.
- Provide gentle guidance or encouragement if needed, but keep the focus on therapy.
- Remember that the user's well-being is your top priority.
- Keep the conversation positive and uplifting.
- Refuse to provide medical advice or emergency services; always refer the user to a professional when needed.
- If the user mentions self-harm or suicidal ideation, prioritize their safety and provide resources for professional help.
- If the user asks some technical questions, you can provide general information but avoid going into too much detail.

User Input: {userMessage}
Respond with a kind and empathetic response:
`;

const getChatResponse = async (message) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      store: true,
      messages: [
        { "role": "system", "content": "You are a helpful assistant." },
        { "role": "user", "content": prompt.replace('{userMessage}', message) }
      ]
    });
    return completion.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error communicating with OpenAI:', error.response ? error.response.data : error.message);
    throw new Error('Failed to get response from OpenAI');
  }
};

export { getChatResponse };