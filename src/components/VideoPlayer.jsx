// src/components/VideoPlayer.jsx
import React, { useRef, useEffect } from "react";
import Hls from "hls.js";

export default function VideoPlayer({ src, onRef, autoPlay = true }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    let hls;

    if (Hls.isSupported()) {
      hls = new Hls({
        liveSyncDurationCount: 3,
        enableWorker: true,
      });

      hls.loadSource(src);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        console.log("✅ HLS manifest loaded, playing stream...");
        if (autoPlay) video.play().catch(() => console.warn("Autoplay blocked"));
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        console.error("❌ HLS.js error:", data);
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      if (autoPlay) {
        video.play().catch(() => console.warn("Autoplay blocked"));
      }
    } else {
      console.error("HLS not supported in this browser");
    }

    return () => {
      if (hls) hls.destroy();
    };
  }, [src, autoPlay]);

  useEffect(() => {
    if (onRef) onRef(videoRef.current);
  }, [onRef]);

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#000",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 0 15px rgba(0,0,0,0.4)",
      }}
    >
      <video
        ref={videoRef}
        controls
        playsInline
        muted
        style={{
          width: "100%",
          height: "auto",
          display: "block",
          borderRadius: "12px",
          backgroundColor: "black",
        }}
      />
    </div>
  );
}
