// src/OverlayEditor.jsx
import React from 'react';

export default function OverlayEditor({ overlays, onUpdate, onDelete }) {
  if (!overlays || overlays.length === 0) return <p>No overlays available.</p>;

  return (
    <div style={{ border: '1px solid #ccc', padding: 12, borderRadius: 8 }}>
      <h3>Overlay Editor</h3>
      {overlays.map(overlay => (
        <div
          key={overlay._id}
          style={{
            marginBottom: 12,
            padding: 8,
            border: '1px solid #eee',
            borderRadius: 4,
            background: '#fafafa'
          }}
        >
          <strong>{overlay.type.toUpperCase()}</strong> — ID: {overlay._id}
          <div style={{ marginTop: 4 }}>
            <label>
              Text / URL:{' '}
              {overlay.type === 'text' ? (
                <input
                  type="text"
                  value={overlay.content.text}
                  onChange={e =>
                    onUpdate(overlay._id, {
                      content: { ...overlay.content, text: e.target.value }
                    })
                  }
                  style={{ width: '70%' }}
                />
              ) : (
                <input
                  type="text"
                  value={overlay.content.url}
                  onChange={e =>
                    onUpdate(overlay._id, {
                      content: { ...overlay.content, url: e.target.value }
                    })
                  }
                  style={{ width: '70%' }}
                />
              )}
            </label>
          </div>

          <div style={{ marginTop: 4 }}>
            <label>
              X:{' '}
              <input
                type="number"
                step="0.01"
                value={overlay.position.x}
                onChange={e =>
                  onUpdate(overlay._id, {
                    position: { ...overlay.position, x: parseFloat(e.target.value) }
                  })
                }
                style={{ width: 60 }}
              />
            </label>{' '}
            <label>
              Y:{' '}
              <input
                type="number"
                step="0.01"
                value={overlay.position.y}
                onChange={e =>
                  onUpdate(overlay._id, {
                    position: { ...overlay.position, y: parseFloat(e.target.value) }
                  })
                }
                style={{ width: 60 }}
              />
            </label>
          </div>

          <div style={{ marginTop: 4 }}>
            <label>
              Width:{' '}
              <input
                type="number"
                step="0.01"
                value={overlay.size.w}
                onChange={e =>
                  onUpdate(overlay._id, {
                    size: { ...overlay.size, w: parseFloat(e.target.value) }
                  })
                }
                style={{ width: 60 }}
              />
            </label>{' '}
            <label>
              Height:{' '}
              <input
                type="number"
                step="0.01"
                value={overlay.size.h}
                onChange={e =>
                  onUpdate(overlay._id, {
                    size: { ...overlay.size, h: parseFloat(e.target.value) }
                  })
                }
                style={{ width: 60 }}
              />
            </label>
          </div>

          <div style={{ marginTop: 4 }}>
            <label>
              Z-index:{' '}
              <input
                type="number"
                value={overlay.zIndex || 1}
                onChange={e =>
                  onUpdate(overlay._id, { zIndex: parseInt(e.target.value, 10) })
                }
                style={{ width: 60 }}
              />
            </label>{' '}
            <label>
              Visible:{' '}
              <input
                type="checkbox"
                checked={overlay.visible}
                onChange={e =>
                  onUpdate(overlay._id, { visible: e.target.checked })
                }
              />
            </label>
          </div>

          <button
            onClick={() => onDelete(overlay._id)}
            style={{
              marginTop: 8,
              background: 'red',
              color: 'white',
              border: 'none',
              padding: '4px 8px',
              borderRadius: 4,
              cursor: 'pointer'
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
