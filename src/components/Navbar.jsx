import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../assets/logo.png';

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Shop", path: "/shop" },
  { 
    label: "Best Sellers", 
    path: "#bestsellers", 
    isAnchor: true 
  },
  { 
    label: "Gift Ideas", 
    path: "#gift-ideas", 
    isAnchor: true 
  },
];

const ALL_CATEGORIES = [
  "Laptops & PCs", "Smartphones", "Gaming",
  "Audio", "Smart Home", "Wearables", "Accessories",
];

const SEARCH_CATEGORIES = [
  "All", "Laptops", "Smartphones", "Headphones", "Smartwatches",
];

const TRUST_ITEMS = [
  { icon: "🚚", title: "FREE DELIVERY*", sub: "on orders +$99" },
  { icon: "🏷️", title: "PRICE MATCH", sub: "Guarantee" },
  { icon: "⚡", title: "SAME DAY DISPATCH", sub: "before 1pm" },
  { icon: "↩️", title: "EASY RETURN", sub: "Policy" },
];

function NavDropdown({ items }) {
  return (
    <div className="absolute top-full left-0 bg-white border border-gray-200 rounded-md shadow-xl min-w-48 z-50 overflow-hidden hidden group-hover:block">
      {items.map((item) => (
        <a
          key={item}
          href="#"
          className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#08CB00] transition-colors"
        >
          {item}
        </a>
      ))}
    </div>
  );
}

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState("All");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navigate = useNavigate();
  
  // Redux State Connectivity
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);
  const wishlistCount = useSelector((state) => state.wishlist.items.length);

  // Smooth Scroll Logic
  const handleAnchorClick = (e, id) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(id.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If not on home page, navigate home first
      navigate('/');
      setTimeout(() => {
        document.getElementById(id.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&display=swap');
        .mytek-nav * { font-family: 'Barlow', sans-serif; box-sizing: border-box; }
        .nav-link-item::after {
          content: '';
          position: absolute;
          bottom: 0; left: 50%; right: 50%;
          height: 3px;
          background: #08CB00;
          transition: left 0.2s, right 0.2s;
        }
        .nav-link-item:hover::after { left: 0; right: 0; }
        .category-select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M2 4l4 4 4-4'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 8px center;
          background-size: 10px;
          padding-right: 28px;
        }
      `}</style>

      <div className="mytek-nav">
        {/* ROW 1 — Logo · Search · Icons */}
        <header className="bg-white border-b-2 border-gray-100 pt-12">
          <div className="max-w-screen-xl mx-auto px-6 h-[80px] flex items-center gap-6">

            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img src={logo} alt="Mytek Logo" className="h-16 object-contain" />
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-xl ml-auto flex items-center bg-gray-50 rounded-lg border border-gray-200 focus-within:border-[#08CB00] overflow-hidden transition-all">
              <select
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
                className="category-select h-11 bg-transparent border-r border-gray-200 px-3 text-sm font-semibold text-gray-700 cursor-pointer outline-none"
              >
                {SEARCH_CATEGORIES.map((cat) => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for laptops, phones, accessories..."
                className="flex-1 h-11 bg-transparent px-4 text-sm text-gray-800 placeholder-gray-400 outline-none"
              />

              <button className="h-11 w-12 bg-[#253900] hover:bg-[#08CB00] text-white flex items-center justify-center transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"/>
                </svg>
              </button>
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-1 ml-auto">
              {/* Wishlist */}
              <Link to="/wishlist" className="flex flex-col items-center gap-0.5 px-3 py-1 text-gray-600 hover:text-[#08CB00] transition-colors relative">
                <div className="relative">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z"/>
                  </svg>
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-[#08CB00] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-tighter">Wishlist</span>
              </Link>

              {/* Cart */}
              <Link to="/cart" className="flex flex-col items-center gap-0.5 px-3 py-1 text-gray-600 hover:text-[#08CB00] transition-colors relative">
                <div className="relative">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 7h13M7 13H5.4M10 21a1 1 0 100-2 1 1 0 000 2zm7 0a1 1 0 100-2 1 1 0 000 2z"/>
                  </svg>
                  {cartQuantity > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {cartQuantity}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-tighter">My Cart</span>
              </Link>

              <div className="w-px h-10 bg-gray-100 mx-2" />

              {/* Account */}
              <Link to="/account" className="flex flex-col items-center gap-0.5 px-3 py-1 text-gray-600 hover:text-[#08CB00] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
                <span className="text-[10px] font-bold uppercase tracking-tighter">Account</span>
              </Link>

              {/* Mobile Toggle */}
              <button
                className="ml-2 p-2 text-gray-600 hover:text-[#08CB00] transition-colors lg:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>

        </header>

        {/* ROW 2 — Navigation (Desktop) */}
        <nav className="bg-[#253900] h-12 hidden lg:flex items-stretch fixed top-0 left-0 right-0 z-50">
            <div className="max-w-screen-xl mx-auto px-6 flex items-stretch w-full">
              
              {/* Categories Trigger */}
              <div className="group relative flex items-stretch">
                <button className="flex items-center gap-2 px-6 h-full text-white text-xs font-bold tracking-widest bg-black/10 hover:bg-[#08CB00] transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
                  </svg>
                  CATEGORIES
                </button>
                <NavDropdown items={ALL_CATEGORIES} />
              </div>

              {/* Dynamic Links */}
              {NAV_LINKS.map((link) => (
                <div key={link.label} className="relative flex items-stretch">
                  {link.isAnchor ? (
                    <a
                      href={link.path}
                      onClick={(e) => handleAnchorClick(e, link.path)}
                      className="nav-link-item relative flex items-center px-5 h-full text-white text-xs font-bold tracking-widest hover:text-[#08CB00] transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={link.path}
                      className="nav-link-item relative flex items-center px-5 h-full text-white text-xs font-bold tracking-widest hover:text-[#08CB00] transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}

              <Link to="/shop" className="flex items-center gap-1.5 px-6 h-full text-[#08CB00] text-xs font-black tracking-widest hover:bg-white/5 ml-auto">
                ⚡ EXCLUSIVE DEALS
              </Link>
            </div>
          </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#253900] border-t border-white/10 z-40">
              {NAV_LINKS.map((link) => (
                link.isAnchor ? (
                  <a
                    key={link.label}
                    href={link.path}
                    onClick={(e) => handleAnchorClick(e, link.path)}
                    className="block px-6 py-4 text-white text-sm font-bold border-b border-white/5 hover:bg-[#08CB00]"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-6 py-4 text-white text-sm font-bold border-b border-white/5 hover:bg-[#08CB00]"
                  >
                    {link.label}
                  </Link>
                )
              ))}
            </div>
          )}

        {/* TRUST BAR */}
        <div className="bg-gray-50 border-b border-gray-100">
          <div className="max-w-screen-xl mx-auto px-6 flex items-center overflow-x-auto no-scrollbar">
            {TRUST_ITEMS.map((item, i) => (
              <div key={item.title} className="flex items-center">
                <div className="flex items-center gap-3 px-6 py-3 text-gray-700 whitespace-nowrap">
                  <span className="text-xl">{item.icon}</span>
                  <div>
                    <p className="text-[10px] font-bold leading-none mb-1">{item.title}</p>
                    <p className="text-[10px] text-gray-500 leading-none uppercase">{item.sub}</p>
                  </div>
                </div>
                {i < TRUST_ITEMS.length - 1 && <div className="w-px h-6 bg-gray-200" />}
              </div>
            ))}
            
            <div className="ml-auto flex items-center gap-2 px-6 py-3 text-gray-700 whitespace-nowrap">
              <span className="text-lg">📞</span>
              <a href="tel:12345678" className="text-xs font-bold hover:text-[#08CB00] transition-colors">
                Support: 24/7
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}