import axios from 'axios';

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

function formatPrompt(monthly_savings, departure, arrival, days, people) {
  return (
    `You are a travel cost assistant. ` +
    `A user wants to plan a trip with these details:\n` +
    `- Monthly savings: ₹${monthly_savings}\n` +
    `- Departure city: ${departure}\n` +
    `- Arrival city: ${arrival}\n` +
    `- Number of days: ${days}\n` +
    `- Number of people: ${people}\n\n` +
    `Your task:\n` +
    `1. Compare the total cost for all people for these transport modes: flight, train, and cruise/ship. ` +
    `Use realistic, up-to-date prices for India (do not assume flights are always cheapest). ` +
    `If train is the cheapest, use the lowest available AC 3-tier ticket price for all people. ` +
    `If flight is the cheapest, use the lowest available economy class flight ticket price for all people. ` +
    `If cruise/ship is the cheapest, use the lowest available cruise or ship ticket price for all people. ` +
    `Pick the absolute cheapest mode and use that in your answer.\n` +
    `2. For hotel, use the lowest available 3-star hotel price in ${arrival}. ` +
    `Assume one room can be shared by 2 people. Calculate the number of rooms needed as the ceiling of (number of people / 2). ` +
    `Calculate the total hotel cost for all rooms and all days.\n` +
    `3. Add the transport and hotel costs to get the total trip cost.\n` +
    `4. Respond ONLY with valid JSON in this exact format (no extra text):\n` +
    `{\n` +
    `  "total_trip_cost": <number>,\n` +
    `  "transport_mode": "<flight/train/ship>",\n` +
    `  "transport_cost": <number>,\n` +
    `  "hotel_cost": <number>,\n` +
    `  "recommendations": [<string>, ...]\n` +
    `}\n` +
    `5. In "recommendations", include 3-5 of the best things to do or see in ${arrival}.\n` +
    `Be concise, accurate, and do not include any explanation or extra text outside the JSON.`
  );
}

function parseLLMResponse(responseText) {
  const match = responseText.match(/\{[\s\S]*\}/);
  if (match) {
    try {
      return JSON.parse(match[0]);
    } catch (e) {
      console.error("LLM JSON parse error:", e);
    }
  }
  return null;
}

async function queryMistral(prompt) {
  const headers = {
    "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
    "Content-Type": "application/json",
    "HTTP-Referer": "https://triply-trip-estimator.vercel.app",
    "X-Title": "Trip Estimator"
  };
  
  const payload = {
    "model": "mistralai/mistral-7b-instruct",
    "messages": [
      { "role": "user", "content": prompt }
    ],
    "temperature": 0.7
  };
  
  const response = await axios.post(OPENROUTER_API_URL, payload, { headers });
  return response.data.choices[0].message.content;
}

function safeFloat(val) {
  try {
    return parseFloat(val);
  } catch (e) {
    return 0.0;
  }
}

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
    const monthly_savings = safeFloat(data.monthly_income || data.monthly_savings);
    const departure = (data.departure || '').trim();
    const arrival = (data.arrival || '').trim();
    const days = parseInt(data.days, 10) || 1;
    const people = parseInt(data.people, 10) || 1;

    if (!monthly_savings || !departure || !arrival || !days || !people) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const prompt = formatPrompt(monthly_savings, departure, arrival, days, people);
    const responseText = await queryMistral(prompt);
    console.log("LLM response:", responseText);
    
    const llmData = parseLLMResponse(responseText);
    console.log("Parsed LLM data:", llmData);

    if (!llmData) {
      return res.status(500).json({ error: 'Could not parse LLM response' });
    }

    let months_to_save = null;
    if (llmData.total_trip_cost && monthly_savings > 0) {
      months_to_save = Math.round((llmData.total_trip_cost / monthly_savings) * 100) / 100;
    }

    return res.status(200).json({
      "total_trip_cost": llmData.total_trip_cost || 0,
      "transport_mode": llmData.transport_mode || "",
      "transport_cost": llmData.transport_cost || 0,
      "hotel_cost": llmData.hotel_cost || 0,
      "recommendations": llmData.recommendations || [],
      "months_to_save": months_to_save
    });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
