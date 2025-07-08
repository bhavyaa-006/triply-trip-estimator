import React, { useState } from "react";
import { Link } from "react-router-dom";

// All images below are from Google Images (for demo/outline purposes)
const welcomeImages = [
  {
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80", // fallback Unsplash
    caption: "Explore the Mountains"
  },
  {
    url: "https://www.gstatic.com/webp/gallery/1.jpg",
    caption: "Discover Vibrant Cities"
  },
  {
    url: "https://www.gstatic.com/webp/gallery/2.jpg",
    caption: "Relax on Beautiful Beaches"
  },
  {
    url: "https://www.gstatic.com/webp/gallery/3.jpg",
    caption: "Marvel at Historic Wonders"
  },
  {
    url: "https://www.gstatic.com/webp/gallery/4.jpg",
    caption: "Experience Nature's Beauty"
  },
  {
    url: "https://www.gstatic.com/webp/gallery/5.jpg",
    caption: "Adventure Awaits"
  }
];

const welcomeStyles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #181c24 0%, #232b3b 100%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Montserrat', Segoe UI, sans-serif",
    padding: "2rem",
  },
  card: {
    background: "rgba(30,34,44,0.97)",
    borderRadius: "22px",
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.25)",
    padding: "2.5rem 2rem",
    maxWidth: 700,
    width: "100%",
    margin: "1rem 0",
    textAlign: "center",
    color: "#fff",
    backdropFilter: "blur(6px)",
    position: "relative"
  },
  title: {
    fontSize: "3rem",
    fontWeight: 800,
    color: "#a991f7",
    marginBottom: "1rem",
    letterSpacing: "2px",
    fontFamily: "'Montserrat', Segoe UI, sans-serif",
  },
  tagline: {
    fontSize: "1.5rem",
    color: "#e0e0e0",
    marginBottom: "2rem",
    fontWeight: 600,
    letterSpacing: "1px",
    fontFamily: "'Montserrat', Segoe UI, sans-serif",
  },
  imageSlider: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "2.5rem",
    gap: "1.5rem"
  },
  arrow: {
    fontSize: "2.5rem",
    color: "#a991f7",
    background: "none",
    border: "none",
    cursor: "pointer",
    userSelect: "none",
    padding: "0 1rem",
    transition: "color 0.2s",
  },
  img: {
    width: 420,
    height: 270,
    objectFit: "cover",
    borderRadius: "18px",
    boxShadow: "0 4px 16px rgba(31,38,135,0.18)",
    border: "3px solid #393e4a",
    transition: "box-shadow 0.2s"
  },
  caption: {
    marginTop: "1rem",
    fontSize: "1.25rem",
    color: "#6e7ff3",
    fontWeight: 600,
    fontFamily: "'Montserrat', Segoe UI, sans-serif",
    letterSpacing: "1px"
  },
  button: {
    marginTop: "2rem",
    padding: "1.1rem 2.8rem",
    background: "linear-gradient(90deg, #a991f7 0%, #6e7ff3 100%)",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    fontWeight: 700,
    fontSize: "1.2rem",
    cursor: "pointer",
    textDecoration: "none",
    boxShadow: "0 2px 12px rgba(118, 75, 162, 0.13)",
    transition: "background 0.2s",
    display: "inline-block",
    fontFamily: "'Montserrat', Segoe UI, sans-serif",
  }
};

function Welcome() {
  const [current, setCurrent] = useState(0);

  const prevImage = () => setCurrent((current - 1 + welcomeImages.length) % welcomeImages.length);
  const nextImage = () => setCurrent((current + 1) % welcomeImages.length);

  return (
    <div style={welcomeStyles.container}>
      <div style={welcomeStyles.card}>
        <div style={welcomeStyles.title}>Triply-Trip Estimator</div>
        <div style={welcomeStyles.tagline}>Trips at your fingertips</div>
        <div style={welcomeStyles.imageSlider}>
          <button style={welcomeStyles.arrow} onClick={prevImage} aria-label="Previous image">
            &#8592;
          </button>
          <div>
            <img
              src={welcomeImages[current].url}
              alt={welcomeImages[current].caption}
              style={welcomeStyles.img}
            />
            <div style={welcomeStyles.caption}>{welcomeImages[current].caption}</div>
          </div>
          <button style={welcomeStyles.arrow} onClick={nextImage} aria-label="Next image">
            &#8594;
          </button>
        </div>
        <Link to="/estimator" style={welcomeStyles.button}>
          Start Estimating
        </Link>
      </div>
    </div>
  );
}

export default Welcome;