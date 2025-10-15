// src/main.jsx
import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import NavBar from "./components/NavBar.jsx";
import VideoPlayer from "./components/VideoPlayer.jsx";
import OverlayLayer from "./components/OverlayLayer.jsx";
import OverlayEditor from "./components/OverlayEditor.jsx";
import "./index.css";

const API_BASE = "http://localhost:5000/api";

function App() {
  const [streamUrl, setStreamUrl] = useState("");
  const [overlays, setOverlays] = useState([]);
  const [videoSize, setVideoSize] = useState({ width: 0, height: 0 });
  const [darkMode, setDarkMode] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    fetchOverlays();
  }, []);

  const fetchOverlays = async () => {
    try {
      const res = await axios.get(`${API_BASE}/overlays`);
      setOverlays(res.data || []);
    } catch (err) {
      console.error("fetch overlays error:", err);
    }
  };

  const handleVideoRef = (v) => {
    videoRef.current = v;
    if (!v) return;

    v.onloadedmetadata = () => {
      setVideoSize({ width: v.videoWidth, height: v.videoHeight });
    };
    v.onplay = v.onplaying = () => setIsLive(true);
    v.onpause = v.onended = () => setIsLive(false);
  };

  const addOverlay = async (type) => {
    const base = {
      streamId: "default",
      type,
      position: { x: 0.05, y: 0.05 },
      size: { w: 0.2, h: 0.1 },
      zIndex: 1,
      visible: true,
      content: type === "text" ? { text: "LIVE" } : { url: "/uploads/example.png" },
    };
    try {
      const res = await axios.post(`${API_BASE}/overlays`, base);
      setOverlays((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("addOverlay error:", err);
    }
  };

  const updateOverlay = async (id, changes) => {
    try {
      const res = await axios.put(`${API_BASE}/overlays/${id}`, changes);
      setOverlays((prev) => prev.map((o) => (o._id === id ? res.data : o)));
    } catch (err) {
      console.error("updateOverlay error:", err);
    }
  };

  const deleteOverlay = async (id) => {
    try {
      await axios.delete(`${API_BASE}/overlays/${id}`);
      setOverlays((prev) => prev.filter((o) => o._id !== id));
    } catch (err) {
      console.error("deleteOverlay error:", err);
    }
  };

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <>
      <div style={{ maxWidth: 1100, margin: "18px auto 0", padding: "0 20px" }}>
        <NavBar
          isLive={isLive}
          darkMode={darkMode}
          onToggleDark={setDarkMode}
          onUrlQuickSet={setStreamUrl}
        />
      </div>

      <div id="root">
        <h2>🎥 RTSP Overlay Dashboard</h2>

        <div style={{ marginBottom: 12 }}>
          <label>HLS URL:</label>
          <input
            value={streamUrl}
            onChange={(e) => setStreamUrl(e.target.value)}
            placeholder="http://127.0.0.1:5000/static/stream/stream.m3u8"
          />
        </div>

        <div style={{ position: "relative", width: "100%", maxWidth: 960 }}>
          <VideoPlayer src={streamUrl} onRef={handleVideoRef} />
          <OverlayLayer
            overlays={overlays}
            videoSize={videoSize}
            onUpdate={updateOverlay}
            onDelete={deleteOverlay}
          />
        </div>

        <div style={{ marginTop: 12 }}>
          <button onClick={() => addOverlay("text")}>Add Text Overlay</button>
          <button onClick={() => addOverlay("image")}>Add Image Overlay</button>
          <button onClick={fetchOverlays}>Reload Overlays</button>
        </div>

        <div className="overlay-editor" style={{ marginTop: 16 }}>
          <OverlayEditor
            overlays={overlays}
            onUpdate={updateOverlay}
            onDelete={deleteOverlay}
          />
        </div>

        <footer>
         
        </footer>
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
