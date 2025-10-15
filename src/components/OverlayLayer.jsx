// src/OverlayLayer.jsx
import React from 'react';
import { Rnd } from 'react-rnd';

// Helpers to convert between normalized (0-1) and pixel coordinates
function toPx(norm, total) { return Math.round(norm * total); }
function toNorm(px, total) { return px / total; }

export default function OverlayLayer({ overlays, videoSize, onUpdate, onDelete }) {
  if (!videoSize.width || !videoSize.height) return null;

  return (
    <>
      {overlays.map(overlay => {
        const { position, size, content, type, _id } = overlay;

        const style = {
          border: '1px dashed red',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: type === 'text' ? 'rgba(255,0,0,0.2)' : 'transparent',
          zIndex: overlay.zIndex || 1,
        };

        return (
          <Rnd
            key={_id}
            bounds="parent"
            size={{
              width: toPx(size.w, videoSize.width),
              height: toPx(size.h, videoSize.height)
            }}
            position={{
              x: toPx(position.x, videoSize.width),
              y: toPx(position.y, videoSize.height)
            }}
            onDragStop={(e, d) => {
              onUpdate(_id, {
                position: {
                  x: toNorm(d.x, videoSize.width),
                  y: toNorm(d.y, videoSize.height)
                }
              });
            }}
            onResizeStop={(e, direction, ref, delta, position) => {
              onUpdate(_id, {
                size: {
                  w: toNorm(ref.offsetWidth, videoSize.width),
                  h: toNorm(ref.offsetHeight, videoSize.height)
                },
                position: {
                  x: toNorm(position.x, videoSize.width),
                  y: toNorm(position.y, videoSize.height)
                }
              });
            }}
          >
            {type === 'text' ? (
              <span>{content.text}</span>
            ) : (
              <img src={content.url} alt="" style={{ width: '100%', height: '100%' }} />
            )}
            <button
              onClick={() => onDelete(_id)}
              style={{ position: 'absolute', top: 0, right: 0 }}
            >
              ✕
            </button>
          </Rnd>
        );
      })}
    </>
  );
}
