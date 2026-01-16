import axios from 'axios';

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = req.body;
    const userMessage = (data.message || '').trim();

    if (!userMessage) {
      return res.status(400).json({ error: "No message provided." });
    }

    const systemPrompt = (
      "You are a helpful travel assistant. " +
      "Answer questions about trips, places to eat, sightseeing, and travel tips. " +
      "Be concise and friendly."
    );

    const messages = [
      { "role": "system", "content": systemPrompt },
      { "role": "user", "content": userMessage }
    ];

    const headers = {
      "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://triply-trip-estimator.vercel.app",
      "X-Title": "Trip Estimator Chat"
    };

    const payload = {
      "model": "mistralai/mistral-7b-instruct",
      "messages": messages,
      "temperature": 0.7
    };

    const response = await axios.post(OPENROUTER_API_URL, payload, { headers });
    console.log("OpenRouter status:", response.status);
    
    const reply = response.data.choices[0].message.content;
    return res.status(200).json({ "reply": reply });
  } catch (error) {
    console.error("Chatbot error:", error.message);
    return res.status(500).json({ error: "Sorry, I couldn't find an answer." });
  }
}
