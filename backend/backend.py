from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import re
import json

app = Flask(__name__)
CORS(app)

# OpenRouter API endpoint and your API key
OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions"
OPENROUTER_API_KEY = "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"  # <-- Replace with your OpenRouter key

def format_prompt(monthly_savings, departure, arrival, days, people):
    return (
        f"You are a travel cost assistant. "
        f"A user wants to plan a trip with these details:\n"
        f"- Monthly savings: ₹{monthly_savings}\n"
        f"- Departure city: {departure}\n"
        f"- Arrival city: {arrival}\n"
        f"- Number of days: {days}\n"
        f"- Number of people: {people}\n\n"
        f"Your task:\n"
        f"1. Compare the total cost for all people for these transport modes: flight, train, and cruise/ship. "
        f"Use realistic, up-to-date prices for India (do not assume flights are always cheapest). "
        f"If train is the cheapest, use the lowest available AC 3-tier ticket price for all people. "
        f"If flight is the cheapest, use the lowest available economy class flight ticket price for all people. "
        f"If cruise/ship is the cheapest, use the lowest available cruise or ship ticket price for all people. "
        f"Pick the absolute cheapest mode and use that in your answer.\n"
        f"2. For hotel, use the lowest available 3-star hotel price in {arrival}. "
        f"Assume one room can be shared by 2 people. Calculate the number of rooms needed as the ceiling of (number of people / 2). "
        f"Calculate the total hotel cost for all rooms and all days.\n"
        f"3. Add the transport and hotel costs to get the total trip cost.\n"
        f"4. Respond ONLY with valid JSON in this exact format (no extra text):\n"
        f'{{\n'
        f'  "total_trip_cost": <number>,\n'
        f'  "transport_mode": "<flight/train/ship>",\n'
        f'  "transport_cost": <number>,\n'
        f'  "hotel_cost": <number>,\n'
        f'  "recommendations": [<string>, ...]\n'
        f'}}\n'
        f'5. In "recommendations", include 3-5 of the best things to do or see in {arrival}.\n'
        f'Be concise, accurate, and do not include any explanation or extra text outside the JSON.'
    )

def parse_llm_response(response_text):
    match = re.search(r'\{.*\}', response_text, re.DOTALL)
    if match:
        try:
            return json.loads(match.group())
        except Exception as e:
            print("LLM JSON parse error:", e)
    return None

def query_mistral(prompt):
    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:5000",  # Optional, but recommended by OpenRouter
        "X-Title": "Trip Estimator"               # Optional, helps OpenRouter track usage
    }
    payload = {
        "model": "mistralai/mistral-7b-instruct",  # OpenRouter model name
        "messages": [
            {"role": "user", "content": prompt}
        ],
        "temperature": 0.7
    }
    response = requests.post(OPENROUTER_API_URL, headers=headers, json=payload)
    response.raise_for_status()
    data = response.json()
    return data["choices"][0]["message"]["content"]

def safe_float(val):
    try:
        return float(val)
    except (TypeError, ValueError):
        return 0.0

@app.route('/estimate', methods=['POST'])
def estimate():
    data = request.get_json()
    monthly_savings = safe_float(data.get('monthly_income') or data.get('monthly_savings'))
    departure = data.get('departure', '').strip()   # <-- FIXED
    arrival = data.get('arrival', '').strip()       # <-- FIXED
    days = int(data.get('days', 1))
    people = int(data.get('people', 1))

    if not (monthly_savings and departure and arrival and days and people):
        return jsonify({'error': 'Missing required fields'}), 400

    prompt = format_prompt(monthly_savings, departure, arrival, days, people)
    response_text = query_mistral(prompt)
    print("LLM response:", response_text)
    llm_data = parse_llm_response(response_text)
    print("Parsed LLM data:", llm_data)

    if not llm_data:
        return jsonify({'error': 'Could not parse LLM response'}), 500

    months_to_save = None
    if llm_data.get("total_trip_cost") and monthly_savings > 0:
        months_to_save = round(float(llm_data["total_trip_cost"]) / monthly_savings, 2)

    return jsonify({
        "total_trip_cost": llm_data.get("total_trip_cost", 0),
        "transport_mode": llm_data.get("transport_mode", ""),
        "transport_cost": llm_data.get("transport_cost", 0),
        "hotel_cost": llm_data.get("hotel_cost", 0),
        "recommendations": llm_data.get("recommendations", []),
        "months_to_save": months_to_save
    })

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data.get("message", "").strip()
    if not user_message:
        return jsonify({"error": "No message provided."}), 400

    # You can customize the system prompt as needed
    system_prompt = (
        "You are a helpful travel assistant. "
        "Answer questions about trips, places to eat, sightseeing, and travel tips. "
        "Be concise and friendly."
    )
    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_message}
    ]

    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:5000",
        "X-Title": "Trip Estimator Chat"
    }
    payload = {
        "model": "mistralai/mistral-7b-instruct",
        "messages": messages,
        "temperature": 0.7
    }

    try:
        response = requests.post(OPENROUTER_API_URL, headers=headers, json=payload)
        print("OpenRouter status:", response.status_code)
        print("OpenRouter response:", response.text)
        response.raise_for_status()
        data = response.json()
        reply = data["choices"][0]["message"]["content"]
        return jsonify({"reply": reply})
    except Exception as e:
        print("Chatbot error:", e)
        return jsonify({"error": "Sorry, I couldn't find an answer."}), 500

if __name__ == '__main__':
    app.run(debug=True)