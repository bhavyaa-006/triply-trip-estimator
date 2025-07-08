import React from "react";
export default function GradientButton({ children, ...props }) {
  return (
    <button
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
      }}
      {...props}
    >
      {children}
    </button>
  );
}