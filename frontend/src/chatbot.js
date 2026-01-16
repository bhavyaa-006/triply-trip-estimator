import React, { useState, useRef, useEffect } from "react";
import { FaRobot, FaUser } from "react-icons/fa";

const chatContainerStyle = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #232b3b 0%, #181c24 100%)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "2rem"
};

const chatBoxStyle = {
  width: "100%",
  maxWidth: 500,
  minHeight: 400,
  background: "rgba(30,34,44,0.97)",
  borderRadius: "22px",
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)",
  padding: "2rem",
  color: "#fff",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  marginBottom: "2rem"
};

const messageStyle = (isUser) => ({
  alignSelf: isUser ? "flex-end" : "flex-start",
  background: isUser
    ? "linear-gradient(90deg, #a991f7 0%, #6e7ff3 100%)"
    : "rgba(40,44,54,0.97)",
  color: "#fff",
  borderRadius: "16px",
  padding: "0.8rem 1.2rem",
  margin: "0.2rem 0",
  maxWidth: "80%",
  display: "flex",
  alignItems: "center",
  gap: "0.7rem",
  fontSize: "1.08rem"
});

const buttonStyle = {
  padding: "1rem",
  background: "linear-gradient(90deg, #a991f7 0%, #6e7ff3 100%)",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  fontWeight: 700,
  fontSize: "1.15rem",
  cursor: "pointer",
  boxShadow: "0 2px 12px rgba(118, 75, 162, 0.13)",
  transition: "background 0.2s",
  fontFamily: "'Montserrat', Segoe UI, sans-serif"
};

export default function Chatbot() {
  const [messages, setMessages] = useState([
    {
      text: "Hi! I'm your travel assistant. Ask me anything about your trip, places to eat, or sightseeing!",
      isUser: false
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { text: input, isUser: true };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }) // <-- FIXED KEY
      });
      const data = await res.json();
      if (data.reply) {
        setMessages((msgs) => [
          ...msgs,
          { text: data.reply, isUser: false }
        ]);
      } else if (data.error) {
        setMessages((msgs) => [
          ...msgs,
          { text: "Sorry, there was a problem connecting to the assistant.", isUser: false }
        ]);
      }
    } catch {
      setMessages((msgs) => [
        ...msgs,
        { text: "Sorry, there was a problem connecting to the assistant.", isUser: false }
      ]);
    }
    setLoading(false);
  };

  return (
    <div style={chatContainerStyle}>
      <div style={chatBoxStyle}>
        {messages.map((msg, idx) => (
          <div key={idx} style={messageStyle(msg.isUser)}>
            {msg.isUser ? <FaUser /> : <FaRobot />}
            <span>{msg.text}</span>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <form
        onSubmit={sendMessage}
        style={{ width: "100%", maxWidth: 500, display: "flex", gap: "1rem" }}
      >
        <input
          style={{
            flex: 1,
            padding: "0.9rem",
            borderRadius: "12px",
            border: "1.5px solid #393e4a",
            background: "#232b3b",
            color: "#fff",
            fontSize: "1.1rem"
          }}
          placeholder="Ask me anything about your trip..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
        />
        <button
          type="submit"
          style={{
            ...buttonStyle,
            opacity: loading || !input.trim() ? 0.7 : 1
          }}
          disabled={loading || !input.trim()}
        >
          {loading ? "..." : "Send"}
        </button>
      </form>
    </div>
  );
}