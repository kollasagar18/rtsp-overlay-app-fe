// src/components/NavBar.jsx
import React from "react";
import { PlayCircle, Moon, Sun } from "lucide-react";

export default function NavBar({
  title = "RTSP Overlay Dashboard",
  isLive = false,
  onUrlQuickSet,
  onToggleDark,
  darkMode,
}) {
  return (
    <header
      className={`app-nav ${darkMode ? "nav-dark" : ""}`}
      style={{ display: "flex", alignItems: "center", gap: 12 }}
    >
      {/* Left Section */}
      <div
        className="nav-left"
        style={{ display: "flex", alignItems: "center", gap: 12 }}
      >
        <div
          className="brand"
          style={{ display: "flex", alignItems: "center", gap: 12 }}
        >
          <div
            className="logo"
            aria-hidden
            style={{
              width: 42,
              height: 42,
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg,#2563eb,#1e40af)",
              color: "white",
              fontWeight: 700,
              fontSize: 18,
            }}
          >
            R
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 16 }}>{title}</div>
            <div style={{ fontSize: 12, color: "var(--muted)" }}>
              Live overlay control
            </div>
          </div>
        </div>

        {/* Live Status */}
        <div
          className="live-indicator"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginLeft: 8,
          }}
        >
          <span className={`dot ${isLive ? "dot-live" : "dot-off"}`} />
          <span style={{ fontSize: 13, color: "var(--muted)" }}>
            {isLive ? "LIVE" : "Idle"}
          </span>
        </div>
      </div>

      {/* Right Section */}
      <div
        style={{
          marginLeft: "auto",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <button
          className="quick-btn"
          onClick={() =>
            onUrlQuickSet &&
            onUrlQuickSet("http://127.0.0.1:5000/static/stream/stream.m3u8")
          }
        >
          <PlayCircle size={16} style={{ marginRight: 6 }} />
          Use Local HLS
        </button>

        <button
          onClick={() => onToggleDark && onToggleDark(!darkMode)}
          className="quick-btn"
          style={{
            background: darkMode
              ? "linear-gradient(135deg,#f59e0b,#b45309)"
              : "linear-gradient(135deg,#1e40af,#2563eb)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
          }}
        >
          {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          {darkMode ? "Light" : "Dark"}
        </button>
      </div>
    </header>
  );
}
