import React, { useState } from 'react';

const G = '#08CB00';
const GD = '#059900';
const GMUTED = 'rgba(8,203,0,0.10)';

const fmt = (value) => Number(value).toFixed(2);
const pctOff = (product) => Math.round((1 - product.salePrice / product.price) * 100);

const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.65)',
    backdropFilter: 'blur(6px)',
    zIndex: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  modalBox: {
    background: '#fff',
    borderRadius: 24,
    maxWidth: 880,
    width: '100%',
    maxHeight: '92vh',
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 32px 80px rgba(0,0,0,0.3)',
  },
  modalClose: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
    width: 36,
    height: 36,
    borderRadius: '50%',
    border: '1.5px solid rgba(0,0,0,0.12)',
    background: '#fff',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 18,
    color: '#555',
    transition: 'background 0.2s',
  },
  modalBody: {
    display: 'flex',
    flex: 1,
    overflowY: 'auto',
    flexDirection: 'row',
  },
  modalImg: {
    width: '46%',
    flexShrink: 0,
    background: '#f5f5f5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    position: 'relative',
  },
  modalInfo: {
    flex: 1,
    padding: '40px 36px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    overflowY: 'auto',
  },
};

export default function ProductQuickViewModal({ product, onClose, onAddToCart }) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const price = product.onSale ? product.salePrice : product.price;

  const handleAdd = () => {
    for (let i = 0; i < qty; i += 1) {
      onAddToCart(product);
    }

    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modalBox} onClick={(event) => event.stopPropagation()}>
        <button
          style={styles.modalClose}
          onClick={onClose}
          onMouseEnter={(event) => (event.currentTarget.style.background = '#f0f0f0')}
          onMouseLeave={(event) => (event.currentTarget.style.background = '#fff')}
          aria-label="Close quick view"
        >
          ✕
        </button>

        <div style={styles.modalBody}>
          <div style={styles.modalImg}>
            {product.onSale && (
              <div
                style={{
                  position: 'absolute',
                  top: 20,
                  left: 20,
                  background: '#FF3B30',
                  color: '#fff',
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: '0.07em',
                  textTransform: 'uppercase',
                  padding: '5px 12px',
                  borderRadius: 20,
                  boxShadow: '0 2px 8px rgba(255,59,48,0.35)',
                }}
              >
                {pctOff(product)}% off
              </div>
            )}

            <img
              src={product.image}
              alt={product.name}
              style={{
                maxWidth: '100%',
                maxHeight: 340,
                objectFit: 'contain',
                borderRadius: 12,
                transition: 'transform 0.3s',
              }}
            />
          </div>

          <div style={styles.modalInfo}>
            <p
              style={{
                margin: '0 0 8px',
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: GD,
              }}
            >
              {product.category}
            </p>
            <h2 style={{ margin: '0 0 12px', fontSize: 26, fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
              {product.name}
            </h2>
            <p style={{ margin: '0 0 24px', fontSize: 14, color: '#666', lineHeight: 1.7 }}>
              {product.description}
            </p>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 28 }}>
              <span style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.03em', color: G }}>
                ${fmt(price)}
              </span>
              {product.onSale && (
                <span style={{ fontSize: 16, color: '#aaa', textDecoration: 'line-through', fontWeight: 500 }}>
                  ${fmt(product.price)}
                </span>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#555' }}>Qty</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 0, border: '1.5px solid rgba(0,0,0,0.12)', borderRadius: 12, overflow: 'hidden' }}>
                {[-1, null, 1].map((delta) =>
                  delta === null ? (
                    <span key="val" style={{ width: 44, textAlign: 'center', fontSize: 16, fontWeight: 700 }}>{qty}</span>
                  ) : (
                    <button
                      key={delta}
                      onClick={() => setQty(Math.max(1, qty + delta))}
                      style={{
                        width: 40,
                        height: 40,
                        border: 'none',
                        background: 'rgba(0,0,0,0.04)',
                        cursor: 'pointer',
                        fontSize: 18,
                        fontWeight: 600,
                        color: '#333',
                        transition: 'background 0.15s',
                      }}
                      onMouseEnter={(event) => (event.currentTarget.style.background = GMUTED)}
                      onMouseLeave={(event) => (event.currentTarget.style.background = 'rgba(0,0,0,0.04)')}
                    >
                      {delta === -1 ? '−' : '+'}
                    </button>
                  )
                )}
              </div>
            </div>

            <button
              onClick={handleAdd}
              style={{
                width: '100%',
                padding: '15px 24px',
                background: added ? '#1a1a1a' : G,
                color: added ? '#fff' : '#000',
                border: 'none',
                borderRadius: 14,
                fontSize: 15,
                fontWeight: 800,
                cursor: 'pointer',
                letterSpacing: '0.03em',
                textTransform: 'uppercase',
                transition: 'background 0.3s, transform 0.15s',
                transform: 'scale(1)',
                boxShadow: added ? 'none' : `0 6px 20px rgba(8,203,0,0.35)`,
              }}
              onMouseDown={(event) => (event.currentTarget.style.transform = 'scale(0.98)')}
              onMouseUp={(event) => (event.currentTarget.style.transform = 'scale(1)')}
            >
              {added ? '✓  Added to Cart!' : `Add ${qty > 1 ? `${qty}x ` : ''}to Cart — $${fmt(price * qty)}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}