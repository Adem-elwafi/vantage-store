import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useProducts } from '../hooks/useProducts';

const PRIMARY = '#0A0A0F';
const SECONDARY = '#1A1A2E';
const ACCENT = '#C9A84C';
const SURFACE = '#E8E8E8';
const ACCENT_MUTED = 'rgba(201,168,76,0.14)';

const Tag = ({ children }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', gap: 4,
    background: ACCENT_MUTED, color: SECONDARY,
    fontSize: 11, fontWeight: 700, letterSpacing: '0.06em',
    textTransform: 'uppercase', padding: '3px 8px',
    borderRadius: 4, border: `1px solid rgba(201,168,76,0.25)`,
  }}>
    {children}
  </span>
);

const SaleBadge = () => (
  <div style={{
    position: 'absolute', top: 14, right: 14, zIndex: 10,
    background: ACCENT, color: PRIMARY,
    fontSize: 11, fontWeight: 800, letterSpacing: '0.07em',
    textTransform: 'uppercase', padding: '4px 10px',
    borderRadius: 20, boxShadow: '0 2px 8px rgba(201,168,76,0.25)',
    lineHeight: 1,
  }}>
    Sale
  </div>
);

const GiftCard = ({ product, size = 'regular', style = {} }) => {
  const [hovered, setHovered] = useState(false);
  const displayPrice = product.onSale ? product.salePrice : product.price;
  const isLarge = size === 'large';

  return (
    <a
      href={`/shop/${product.id}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'block', position: 'relative',
        height: isLarge ? '100%' : '100%',
        borderRadius: 20, overflow: 'hidden',
        textDecoration: 'none', background: SECONDARY,
        cursor: 'pointer', flexShrink: 0,
        boxShadow: hovered
          ? `0 20px 48px rgba(0,0,0,0.28), 0 0 0 2px ${ACCENT}`
          : '0 4px 16px rgba(0,0,0,0.12)',
        transition: 'box-shadow 0.32s cubic-bezier(0.23,1,0.32,1)',
        ...style,
      }}
    >
      {product.onSale && <SaleBadge />}

      <img
        src={product.image}
        alt={product.name}
        style={{
          width: '100%', height: '100%', objectFit: 'cover',
          display: 'block',
          transform: hovered ? 'scale(1.06)' : 'scale(1)',
          transition: 'transform 0.55s cubic-bezier(0.23,1,0.32,1)',
          filter: hovered ? 'brightness(0.72)' : 'brightness(0.6)',
        }}
      />

      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: isLarge ? 28 : 18,
      }}>
        {isLarge && (
          <Tag>🎁 Gift Pick</Tag>
        )}

        <h3 style={{
          margin: isLarge ? '10px 0 6px' : '8px 0 4px',
          color: '#fff',
          fontSize: isLarge ? 22 : 15,
          fontWeight: 700,
          lineHeight: 1.25,
          letterSpacing: '-0.01em',
          textShadow: '0 1px 4px rgba(0,0,0,0.5)',
        }}>
          {product.name}
        </h3>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span style={{
            color: ACCENT,
            fontSize: isLarge ? 26 : 18,
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: '-0.02em',
          }}>
            ${Number(displayPrice).toFixed(2)}
          </span>
          {product.onSale && (
            <span style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: isLarge ? 14 : 12,
              textDecoration: 'line-through',
              fontWeight: 500,
            }}>
              ${Number(product.price).toFixed(2)}
            </span>
          )}
          {product.onSale && (
            <span style={{
              background: 'rgba(201,168,76,0.18)',
              color: ACCENT,
              fontSize: 11, fontWeight: 700,
              padding: '2px 7px', borderRadius: 20,
              letterSpacing: '0.03em',
            }}>
              {Math.round((1 - product.salePrice / product.price) * 100)}% off
            </span>
          )}
        </div>

        <div style={{
          overflow: 'hidden',
          maxHeight: hovered ? 48 : 0,
          opacity: hovered ? 1 : 0,
          transition: 'max-height 0.35s cubic-bezier(0.23,1,0.32,1), opacity 0.28s ease',
          marginTop: hovered ? 12 : 0,
        }}>
          <span style={{
            display: 'block', textAlign: 'center',
            background: ACCENT, color: '#000',
            fontWeight: 800, fontSize: 13,
            letterSpacing: '0.04em', textTransform: 'uppercase',
            padding: '11px 20px', borderRadius: 12,
            width: '100%',
          }}>
            View Gift →
          </span>
        </div>
      </div>
    </a>
  );
};

const GiftIdeas = () => {
  const { getGiftIdeas } = useProducts();
  const giftIdeas = getGiftIdeas();

  const [page, setPage] = useState(0);
  const autoRef = useRef(null);
  const CARDS_PER_PAGE = 4; // 1 large + 3 small
  const totalPages = Math.ceil(giftIdeas.length / CARDS_PER_PAGE);

  const goTo = useCallback((idx) => {
    setPage(((idx % totalPages) + totalPages) % totalPages);
  }, [totalPages]);

  useEffect(() => {
    if (giftIdeas.length <= CARDS_PER_PAGE) return;
    autoRef.current = setInterval(() => goTo(p => p + 1), 5000);
    return () => clearInterval(autoRef.current);
  }, [giftIdeas.length, goTo]);

  const resetTimer = () => {
    clearInterval(autoRef.current);
    autoRef.current = setInterval(() => goTo(p => p + 1), 5000);
  };

  const handleNav = (dir) => {
    goTo(page + dir);
    resetTimer();
  };

  if (!giftIdeas.length) {
    return (
      <div style={{ textAlign: 'center', padding: '48px 0' }}>
        <p style={{ color: '#888', fontSize: 15 }}>No gift ideas available at the moment. Check back soon!</p>
      </div>
    );
  }

  const startIdx = page * CARDS_PER_PAGE;
  const pageItems = giftIdeas.slice(startIdx, startIdx + CARDS_PER_PAGE);
  // pad if last page is short
  while (pageItems.length < CARDS_PER_PAGE) {
    pageItems.push(giftIdeas[pageItems.length % giftIdeas.length]);
  }
  const [hero, ...smalls] = pageItems;

  return (
    <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>

      {/* Header */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        marginBottom: 28,
      }}>
        <div>
          <p style={{
            margin: '0 0 4px',
            fontSize: 12, fontWeight: 700,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            color: SECONDARY,
          }}>
            Curated for you
          </p>
          <h2 style={{
            margin: 0,
            fontSize: 32, fontWeight: 800,
            letterSpacing: '-0.03em', lineHeight: 1,
            color: 'inherit',
          }}>
            Gift Ideas
            <span style={{
              display: 'inline-block', width: 7, height: 7,
              background: ACCENT, borderRadius: '50%',
              marginLeft: 5, verticalAlign: 'middle', marginBottom: 4,
            }} />
          </h2>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {totalPages > 1 && (
            <div style={{ display: 'flex', gap: 6 }}>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setPage(i); resetTimer(); }}
                  style={{
                    width: i === page ? 24 : 8, height: 8,
                    borderRadius: 4, border: 'none', padding: 0,
                    background: i === page ? ACCENT : 'rgba(10,10,15,0.15)',
                    cursor: 'pointer',
                    transition: 'width 0.3s ease, background 0.2s',
                  }}
                />
              ))}
            </div>
          )}
          <a href="/shop" style={{
            fontSize: 13, fontWeight: 700,
            color: SECONDARY, textDecoration: 'none',
            display: 'flex', alignItems: 'center', gap: 4,
            padding: '8px 16px', borderRadius: 20,
            border: `1.5px solid ${ACCENT}`,
            transition: 'background 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = ACCENT_MUTED}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            View All →
          </a>
        </div>
      </div>

      {/* Main Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '280px 280px',
        gap: 16,
        position: 'relative',
      }}>
        {/* Hero card: spans both rows */}
        <div style={{ gridRow: '1 / 3', gridColumn: '1' }}>
          <GiftCard product={hero} size="large" style={{ height: '100%' }} />
        </div>

        {/* Three smaller cards */}
        {smalls.slice(0, 3).map((product, i) => (
          <div key={`small-${i}`} style={{
            gridRow: i === 0 ? '1' : i === 1 ? '2' : '2',
            gridColumn: i < 2 ? '2' : '2',
          }}>
            <GiftCard product={product} size="regular" style={{ height: '100%' }} />
          </div>
        ))}
      </div>

      {/* Nav arrows */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 24 }}>
          {[
            { dir: -1, label: '←' },
            { dir: 1, label: '→' },
          ].map(({ dir, label }) => (
            <button
              key={dir}
              onClick={() => handleNav(dir)}
              style={{
                width: 44, height: 44, borderRadius: '50%',
                border: `1.5px solid rgba(0,0,0,0.15)`,
                background: 'transparent',
                fontSize: 18, fontWeight: 600,
                cursor: 'pointer', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                color: 'inherit',
                transition: 'background 0.2s, border-color 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = ACCENT;
                e.currentTarget.style.borderColor = ACCENT;
                e.currentTarget.style.color = PRIMARY;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(0,0,0,0.15)';
                e.currentTarget.style.color = 'inherit';
              }}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </section>
  );
};

export default GiftIdeas;