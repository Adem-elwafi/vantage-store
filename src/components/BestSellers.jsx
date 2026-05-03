import React, { useRef, useState, useEffect, useCallback } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../features/cart/cartSlice';
import { addToWishlist } from '../features/wishlist/wishlistSlice';
import { useProducts } from '../hooks/useProducts';
import ProductCard from './ProductCard'; 

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';


// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';

const Bestsellers = () => {
  const modalRef = useRef(null);
  const lastFocusedElement = useRef(null);
  const [modalProduct, setModalProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { getBestsellers } = useProducts();
  const bestsellerList = getBestsellers();
  const dispatch = useDispatch();


  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setModalProduct(null);
    document.body.style.overflow = '';

    if (lastFocusedElement.current && typeof lastFocusedElement.current.focus === 'function') {
      lastFocusedElement.current.focus();
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!isModalOpen) return;

      if (event.key === 'Escape') {
        closeModal();
        return;
      }

      if (event.key !== 'Tab') return;

      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (!focusableElements || focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, closeModal]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);



  const openModal = useCallback((product) => {
    lastFocusedElement.current = document.activeElement;
    setModalProduct(product);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const handleAddToCart = useCallback(
    (product, event) => {
      event?.stopPropagation();
      dispatch(
        addItemToCart({
          id: product.id,
          name: product.name,
          price: product.onSale ? product.salePrice : product.price,
          image: product.image,
          quantity: 1,
        })
      );
    },
    [dispatch]
  );

  const handleAddToWishlist = useCallback(
    (product, event) => {
      event?.stopPropagation();
      dispatch(
        addToWishlist({
          id: product.id,
          name: product.name,
          price: product.onSale ? product.salePrice : product.price,
          image: product.image,
        })
      );
    },
    [dispatch]
  );

  return (
    <section className="max-w-8xl mx-auto px-4 py-16">
  <div className="flex justify-between items-center mb-6 relative z-10 text-black">
      <h2 className="text-3xl font-semibold border-b-2 border-[#08CB00] pb-1">Best Sellers</h2>
      <a href="/shop" className="text-sm text-[#08CB00] hover:underline">View All</a>
  </div>
<div className="relative z-0 overflow-hidden">
  
<Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        style={{ paddingTop: '20px', paddingBottom: '50px' }} 
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        
                   {bestsellerList.map((p,index) => (
                <SwiperSlide key={`bestseller-${p.id}-${index}`} style={{ width: 'auto' }}>
            <ProductCard 
              key={p.id} 
              product={p} 
              onAddToCart={handleAddToCart}
              onAddToWishlist={handleAddToWishlist}
              onQuickView={openModal}
            />
            </SwiperSlide>
          ))}
        
        
      </Swiper>

  </div>

      <div
        className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm transition-opacity duration-300 ${isModalOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={closeModal}
      >
        {modalProduct && (
          <div
            ref={modalRef}
            className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close modal"
              onClick={closeModal}
              className="absolute right-4 top-4 z-10 rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              autoFocus
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="gap-8 p-8 md:flex">
              <div className="md:w-1/2">
                <img
                  src={modalProduct.image}
                  alt={modalProduct.name}
                  className="w-full rounded-xl bg-gray-50 object-contain"
                  loading="lazy"
                />
              </div>

              <div className="md:w-1/2 flex flex-col justify-center">
                <h2 id="modal-title" className="mb-4 text-3xl font-bold text-gray-900">{modalProduct.name}</h2>
                <p className="mb-6 text-gray-700">{modalProduct.description}</p>

                <div className="mb-8 text-2xl font-bold text-[#08CB00]">
                  ${modalProduct.onSale ? modalProduct.salePrice : modalProduct.price}
                  {modalProduct.onSale && (
                    <span className="ml-3 text-base font-medium text-gray-500 line-through">${modalProduct.price}</span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={(event) => {
                    handleAddToCart(modalProduct, event);
                    closeModal();
                  }}
                  className="w-full rounded-xl bg-[#253900] py-4 font-bold text-white transition-colors hover:bg-[#08CB00]"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Bestsellers;
