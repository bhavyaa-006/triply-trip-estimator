import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Catalogue from "./Catalogue";
import Welcome from "./Welcome";
import Chatbot from "./chatbot";
import GradientButton from "./GradientButton";
import { FaPlaneDeparture } from "react-icons/fa";

// Modern font import (Google Fonts)
const fontLink = document.createElement("link");
fontLink.href = "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;800&display=swap";
fontLink.rel = "stylesheet";
document.head.appendChild(fontLink);

const styles = {
  body: {
    margin: 0,
    minHeight: "100vh",
    background: "linear-gradient(135deg, #232b3b 0%, #181c24 100%)",
    fontFamily: "'Montserrat', 'Segoe UI', sans-serif",
    color: "#fff",
    transition: "background 0.3s",
  },
  nav: {
    display: "flex",
    justifyContent: "center",
    gap: "2rem",
    padding: "1.5rem 0",
    background: "rgba(30,34,44,0.85)",
    boxShadow: "0 2px 12px rgba(31, 38, 135, 0.10)",
    fontWeight: 700,
    fontSize: "1.1rem",
  },
  navLink: {
    color: "#a991f7",
    textDecoration: "none",
    transition: "color 0.2s",
  },
  navLinkHover: {
    color: "#6e7ff3",
  },
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Montserrat', Segoe UI, sans-serif",
    padding: "2rem",
    background: "linear-gradient(135deg, #232b3b 0%, #181c24 100%)",
  },
  card: {
    background: "rgba(30,34,44,0.97)",
    borderRadius: "22px",
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)",
    padding: "2.5rem 2rem",
    maxWidth: 420, // Make sure this matches result
    width: "100%",
    margin: "2rem auto",
    color: "#fff",
    backdropFilter: "blur(6px)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontSize: "2.3rem",
    fontWeight: 800,
    color: "#a991f7",
    marginBottom: "1.5rem",
    textAlign: "center",
    letterSpacing: "2px",
    fontFamily: "'Montserrat', Segoe UI, sans-serif",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.7rem",
  },
  label: {
    display: "block",
    marginBottom: "0.5rem",
    fontWeight: 600,
    color: "#e0e0e0",
    fontFamily: "'Montserrat', Segoe UI, sans-serif",
  },
  input: {
    width: "100%",
    padding: "0.8rem",
    borderRadius: "10px",
    border: "1.5px solid #393e4a",
    marginBottom: "1.3rem",
    fontSize: "1.08rem",
    outline: "none",
    background: "#232b3b",
    color: "#fff",
    fontFamily: "'Montserrat', Segoe UI, sans-serif",
    transition: "border 0.2s",
  },
  error: {
    color: "#ff6b81",
    background: "#2d1a1a",
    borderRadius: "10px",
    padding: "0.9rem",
    marginTop: "1rem",
    textAlign: "center",
    fontWeight: 600,
    fontFamily: "'Montserrat', Segoe UI, sans-serif",
  },
  result: {
    background: "rgba(40,44,54,0.97)",
    borderRadius: "18px",
    boxShadow: "0 2px 12px rgba(118, 75, 162, 0.13)",
    padding: "1.7rem",
    marginTop: "2rem",
    textAlign: "center",
    color: "#fff",
    fontFamily: "'Montserrat', Segoe UI, sans-serif",
    maxWidth: 420, // Match card width
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    boxSizing: "border-box",
  },
  breakdown: {
    textAlign: "left",
    margin: "1.2rem auto 0 auto",
    maxWidth: 380,
    fontSize: "1.08rem",
    color: "#e0e0e0",
    fontFamily: "'Montserrat', Segoe UI, sans-serif",
  },
};

const cityOptions = [
  "Amsterdam", "Athens", "Bangkok", "Barcelona", "Beijing", "Berlin", "Brussels", "Budapest",
  "Buenos Aires", "Cape Town", "Chicago", "Copenhagen", "Delhi", "Doha", "Dubai", "Dublin",
  "Edinburgh", "Helsinki", "Hong Kong", "Istanbul", "Jakarta", "Kuala Lumpur", "Las Vegas",
  "Lisbon", "London", "Los Angeles", "Madrid", "Manila", "Mexico City", "Milan", "Moscow",
  "Munich", "New York", "Osaka", "Paris", "Prague", "Rio de Janeiro", "Rome", "San Francisco",
  "Seoul", "Shanghai", "Singapore", "Stockholm", "Sydney", "Tel Aviv", "Tokyo", "Toronto",
  "Vancouver", "Vienna", "Warsaw", "Zurich"
];

function Estimator() {
  const [form, setForm] = useState({
    monthly_income: "",
    departure: "",
    arrival: "",
    days: 7,
    people: 1,
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatbotReply, setChatbotReply] = useState(""); // <-- NEW

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);
    setChatbotReply(""); // Reset chatbot reply
    setLoading(true);
    try {
      const res = await fetch("https://triply-trip-estimator.onrender.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong");
      } else {
        setResult(data);
        // Call chatbot with a summary question about the trip
        const chatRes = await fetch("http://localhost:5000/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: `Give me a quick tip or fun fact for a trip from ${form.departure} to ${form.arrival}.`
          })
        });
        const chatData = await chatRes.json();
        setChatbotReply(chatData.reply || "");
      }
    } catch (err) {
      setError("Could not connect to backend");
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.title}>
          <FaPlaneDeparture /> Trip Savings Estimator
        </div>
        <form onSubmit={handleSubmit} autoComplete="off">
          <label style={styles.label}>Monthly Savings (INR)</label>
          <input
            style={styles.input}
            type="number"
            name="monthly_income"
            value={form.monthly_income}
            onChange={handleChange}
            required
            min="1"
            placeholder="e.g. 50000"
          />
          <label style={styles.label}>Departure City</label>
          <input
            type="text"
            name="departure"
            value={form.departure}
            onChange={handleChange}
            required
            placeholder="e.g. Delhi"
            style={styles.input}
          />
          <label style={styles.label}>Arrival City</label>
          <input
            type="text"
            name="arrival"
            value={form.arrival}
            onChange={handleChange}
            required
            placeholder="e.g. Paris"
            style={styles.input}
          />
          <label style={styles.label}>Number of Days</label>
          <input
            style={styles.input}
            type="number"
            name="days"
            value={form.days}
            onChange={handleChange}
            min="1"
            required
          />
          <label style={styles.label}>Number of People</label>
          <input
            style={styles.input}
            type="number"
            name="people"
            value={form.people}
            onChange={handleChange}
            min="1"
            required
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "1rem",
              background: "linear-gradient(90deg, #a991f7 0%, #6e7ff3 100%)",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              fontWeight: 700,
              fontSize: "1.15rem",
              cursor: "pointer",
              marginTop: "0.7rem",
              boxShadow: "0 2px 12px rgba(118, 75, 162, 0.13)",
              transition: "background 0.2s",
              fontFamily: "'Montserrat', Segoe UI, sans-serif",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Estimating..." : "Estimate"}
          </button>
        </form>
        {error && <div style={styles.error}>{error}</div>}
        {result && (
          <div style={styles.result}>
            <h3>
              Results for <span style={{ color: "#a991f7" }}>{result.arrival}</span>
            </h3>
            <p style={{ fontSize: "1.3rem", margin: "1rem 0", color: "#6e7ff3" }}>
              <b>Total Trip Cost:</b> ₹{result.total_trip_cost}
            </p>
            <p style={{ fontSize: "1.1rem" }}>
              <b>Months to Save:</b>{" "}
              <span style={{ color: "#ffb86b", fontWeight: 700 }}>{result.months_to_save}</span>
            </p>
            <div style={styles.breakdown}>
              <h4 style={{ marginBottom: "0.5rem", color: "#a991f7" }}>Total Cost Breakdown:</h4>
              <ul style={{ paddingLeft: "1.2rem" }}>
                <li>
                  {result.transport_mode === "train" && (
                    <>
                      The cheapest way to travel is by <b>train</b> (round trip, AC 3-tier, both ways) for <b>{form.people}</b> people, costing <b>₹{result.transport_cost ?? "-"}</b>.
                    </>
                  )}
                  {result.transport_mode === "flight" && (
                    <>
                      The cheapest way to travel is by <b>flight</b> (round trip, economy class, both ways) for <b>{form.people}</b> people, costing <b>₹{result.transport_cost ?? "-"}</b>.
                    </>
                  )}
                  {result.transport_mode === "ship" && (
                    <>
                      The cheapest way to travel is by <b>ship/cruise</b> (round trip, cheapest available, both ways) for <b>{form.people}</b> people, costing <b>₹{result.transport_cost ?? "-"}</b>.
                    </>
                  )}
                </li>
                <li>
                  Hotel for <b>{form.people}</b> people would cost <b>₹{result.hotel_cost ?? "-"}</b>.<br />
                  <span style={{ color: "#bdbdbd", fontSize: "0.98em" }}>
                    (Rooms are expected to be shared by 2 people each)
                  </span>
                </li>
              </ul>
              {chatbotReply && (
                <div style={{ marginTop: "1rem", color: "#6e7ff3", fontStyle: "italic" }}>
                  <b>TravelBot says:</b> {chatbotReply}
                </div>
              )}
            </div>
            {result.recommendations && (
              <div style={{ marginTop: "1.5rem" }}>
                <h4 style={{ color: "#a991f7" }}>Recommendations:</h4>
                <ul>
                  {result.recommendations.map((rec, idx) => (
                    <li key={idx}>{rec}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  // Add hover effect for nav links
  React.useEffect(() => {
    const navLinks = document.querySelectorAll("nav a");
    navLinks.forEach(link => {
      link.addEventListener("mouseenter", () => link.style.color = "#6e7ff3");
      link.addEventListener("mouseleave", () => link.style.color = "#a991f7");
    });
    return () => {
      navLinks.forEach(link => {
        link.removeEventListener("mouseenter", () => link.style.color = "#6e7ff3");
        link.removeEventListener("mouseleave", () => link.style.color = "#a991f7");
      });
    };
  }, []);

  // Set body styles (for background and font)
  React.useEffect(() => {
    Object.entries(styles.body).forEach(([k, v]) => {
      document.body.style[k] = v;
    });
  }, []);

  return (
    <Router>
      <nav style={styles.nav}>
        <Link to="/" style={styles.navLink}>Home</Link>
        <Link to="/estimator" style={styles.navLink}>Estimator</Link>
        <Link to="/catalogue" style={styles.navLink}>Catalogue</Link>
        <Link to="/chatbot" style={styles.navLink}>Chatbot</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/estimator" element={<Estimator />} />
        <Route path="/catalogue" element={<Catalogue />} />
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
    </Router>
  );
}

export default App;

