import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../features/cart/cartSlice';
import { addToWishlist } from '../features/wishlist/wishlistSlice';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import ProductQuickViewModal from '../components/ProductQuickViewModal';

/* ─── Brand tokens ─────────────────────────────────────────────────── */
const G = '#08CB00';
const GD = '#059900';
const GMUTED = 'rgba(8,203,0,0.10)';

/* ─── Data ──────────────────────────────────────────────────────────── */
const CATEGORIES = ['All', 'Laptops', 'Smartphones', 'Headphones', 'Smartwatches'];

const CATEGORY_ALIAS = {
  'Laptops & PCs': 'Laptops',
  Audio: 'Headphones',
  Wearables: 'Smartwatches',
};

const SLUG_MAP = {
  'laptops-pcs': 'Laptops',
  smartphones: 'Smartphones',
  gaming: 'Gaming',
  audio: 'Headphones',
  wearables: 'Smartwatches',
};

const resolveCategory = (v) => CATEGORY_ALIAS[v] ?? v;

/* ─── Tiny helpers ──────────────────────────────────────────────────── */

/* ─── Styles (inline, theme-safe) ──────────────────────────────────── */
const S = {
  page: {
    minHeight: '100vh',
    background: 'var(--color-background)',
    color: '#1d1d1f',
    paddingTop: 40,
    fontFamily: "'DM Sans', system-ui, sans-serif",
  },
  container: { maxWidth: 1280, margin: '0 auto', padding: '0 24px 64px' },

  /* header strip */
  topBar: {
    display: 'flex', alignItems: 'flex-end',
    justifyContent: 'space-between', flexWrap: 'wrap',
    gap: 20, marginBottom: 36,
  },
  eyebrow: {
    margin: '0 0 4px', fontSize: 12, fontWeight: 700,
    letterSpacing: '0.1em', textTransform: 'uppercase', color: GD,
  },
  pageTitle: {
    margin: 0, fontSize: 34, fontWeight: 800,
    letterSpacing: '-0.03em', lineHeight: 1, color: 'inherit',
  },
  countBadge: {
    fontSize: 13, fontWeight: 600, color: '#888',
    background: 'rgba(0,0,0,0.06)', padding: '4px 12px',
    borderRadius: 20, alignSelf: 'flex-end',
  },

  /* search */
  searchWrap: {
    position: 'relative', display: 'flex',
    alignItems: 'center', marginBottom: 28,
  },
  searchIcon: {
    position: 'absolute', left: 16, top: '50%',
    transform: 'translateY(-50%)', pointerEvents: 'none',
    color: '#aaa', fontSize: 18,
  },
  searchInput: {
    width: '100%', padding: '14px 20px 14px 48px',
    fontSize: 15, fontWeight: 500,
    border: '1.5px solid rgba(0,0,0,0.1)',
    borderRadius: 16, outline: 'none', background: '#fff',
    color: '#1d1d1f', transition: 'border-color 0.2s, box-shadow 0.2s',
  },

  /* category tabs */
  tabRow: {
    display: 'flex', gap: 8, flexWrap: 'wrap',
    marginBottom: 36, alignItems: 'center',
  },

  /* grid */
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    gap: 28,
  },

  /* empty state */
  empty: {
    textAlign: 'center', padding: '80px 20px',
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', gap: 16,
  },
  emptyIcon: {
    width: 80, height: 80, borderRadius: '50%',
    background: GMUTED, display: 'flex',
    alignItems: 'center', justifyContent: 'center',
    fontSize: 36,
  },
  emptyTitle: { fontSize: 20, fontWeight: 700, margin: 0 },
  emptyMsg: { fontSize: 14, color: '#888', margin: 0 },

};

/* ─── CategoryTab ───────────────────────────────────────────────────── */
function CategoryTab({ label, active, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: '9px 20px', borderRadius: 30,
        border: active ? 'none' : '1.5px solid rgba(0,0,0,0.1)',
        background: active ? G : hov ? GMUTED : '#fff',
        color: active ? '#000' : hov ? GD : '#555',
        fontSize: 13, fontWeight: active ? 800 : 600,
        cursor: 'pointer', letterSpacing: active ? '0.02em' : 0,
        transition: 'all 0.2s',
        boxShadow: active ? `0 4px 14px rgba(8,203,0,0.35)` : 'none',
      }}
    >
      {label}
    </button>
  );
}

/* ─── Animated card wrapper ─────────────────────────────────────────── */
function AnimatedCard({ children, index }) {
  const ref = useRef();
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(22px)';
    const t = setTimeout(() => {
      el.style.transition = 'opacity 0.45s ease, transform 0.45s cubic-bezier(0.23,1,0.32,1)';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, index * 55);
    return () => clearTimeout(t);
  }, [index]);
  return (
    <div ref={ref} style={{ padding: '6px' }}>
      {children}
    </div>
  );
}

/* ─── Empty State ───────────────────────────────────────────────────── */
function EmptyState({ onReset }) {
  return (
    <div style={S.empty}>
      <div style={S.emptyIcon}>🔍</div>
      <h3 style={S.emptyTitle}>No products found</h3>
      <p style={S.emptyMsg}>Try adjusting your search or switching categories.</p>
      <button
        onClick={onReset}
        style={{
          marginTop: 4, padding: '10px 24px', borderRadius: 20,
          border: `1.5px solid ${G}`, background: 'transparent',
          color: GD, fontSize: 13, fontWeight: 700, cursor: 'pointer',
          transition: 'background 0.2s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = GMUTED)}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
      >
        Clear filters
      </button>
    </div>
  );
}

/* ─── Main ──────────────────────────────────────────────────────────── */
export default function Shop() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const { getProductsByCategory } = useProducts();
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [modalProduct, setModalProduct] = useState(null);
  const [searchFocused, setSearchFocused] = useState(false);

  const urlSearch = searchParams.get('search') ?? '';
  const urlCategory = searchParams.get('cat') ?? '';

  useEffect(() => {
    setSearchTerm(urlSearch);
    setSelectedCategory(resolveCategory(urlCategory || SLUG_MAP[slug] || 'All'));
  }, [slug, urlCategory, urlSearch]);

  const activeCategory = resolveCategory(selectedCategory);
  const categoryProducts = getProductsByCategory(activeCategory);

  const filteredProducts = categoryProducts.filter((p) => {
    const matchSearch = !searchTerm || p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    return matchSearch && matchCat;
  });

  const handleAddToCart = useCallback((product) => {
    dispatch(addItemToCart({
      id: product.id, name: product.name,
      price: product.onSale ? product.salePrice : product.price,
      image: product.image, quantity: 1,
    }));
  }, [dispatch]);

  const handleAddToWishlist = useCallback((product) => {
    dispatch(addToWishlist(product));
  }, [dispatch]);

  const openModal = (product) => {
    setModalProduct(product);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalProduct(null);
    document.body.style.overflow = '';
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
  };

  return (
    <div style={S.page}>
      <main style={S.container}>

        {/* Top bar */}
        <div style={S.topBar}>
          <div>
            <p style={S.eyebrow}>Browse our collection</p>
            <h1 style={S.pageTitle}>
              Shop
              <span style={{
                display: 'inline-block', width: 8, height: 8,
                background: G, borderRadius: '50%',
                marginLeft: 6, verticalAlign: 'middle', marginBottom: 5,
              }} />
            </h1>
          </div>
          {filteredProducts.length > 0 && (
            <div style={S.countBadge}>
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
            </div>
          )}
        </div>

        {/* Search */}
        <div style={S.searchWrap}>
          <svg
            style={S.searchIcon} width="18" height="18"
            viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search products…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            style={{
              ...S.searchInput,
              borderColor: searchFocused ? G : 'rgba(0,0,0,0.1)',
              boxShadow: searchFocused ? `0 0 0 3px ${GMUTED}` : 'none',
            }}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              style={{
                position: 'absolute', right: 14, top: '50%',
                transform: 'translateY(-50%)',
                width: 28, height: 28, borderRadius: '50%',
                border: 'none', background: 'rgba(0,0,0,0.07)',
                cursor: 'pointer', fontSize: 14, color: '#666',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              ✕
            </button>
          )}
        </div>

        {/* Category tabs */}
        <div style={S.tabRow}>
          {CATEGORIES.map((cat) => (
            <CategoryTab
              key={cat}
              label={cat}
              active={selectedCategory === cat}
              onClick={() => setSelectedCategory(cat)}
            />
          ))}
        </div>

        {/* Grid or empty */}
        {filteredProducts.length === 0 ? (
          <EmptyState onReset={clearFilters} />
        ) : (
          <div style={S.grid}>
            {filteredProducts.map((product, i) => (
              <AnimatedCard key={product.id} index={i}>
                <ProductCard
                  product={product}
                  layout="grid"
                  onAddToCart={() => handleAddToCart(product)}
                  onAddToWishlist={() => handleAddToWishlist(product)}
                  onQuickView={() => openModal(product)}
                />
              </AnimatedCard>
            ))}
          </div>
        )}
      </main>

      {/* Quick View Modal */}
      {modalProduct && (
        <ProductQuickViewModal
          product={modalProduct}
          onClose={closeModal}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
}