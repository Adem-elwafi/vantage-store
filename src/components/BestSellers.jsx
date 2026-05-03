import React, { useRef, useState, useEffect, useCallback } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../features/cart/cartSlice';
import { addToWishlist } from '../features/wishlist/wishlistSlice';
import { useProducts } from '../hooks/useProducts';
import { useCarousel } from '../hooks/useCarousel';
import ProductCard from './ProductCard'; 


const Bestsellers = () => {
  const modalRef = useRef(null);
  const lastFocusedElement = useRef(null);
  const [modalProduct, setModalProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { getBestsellers } = useProducts();
  const bestsellerList = getBestsellers();
  const dispatch = useDispatch();



const {
  carouselRef,
  currentIndex,
  setCurrentIndex,
  handlePrev,
  handleNext,
  onTouchStart,
  onTouchEnd,
  pageCount,
  onScroll
} = useCarousel(bestsellerList.length);
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
    <section className="max-w-8xl mx-auto px-4 py-12">
    <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold border-b-2 border-[#08CB00] pb-1">Best Sellers</h2>
        <a href="/shop" className="text-sm text-[#08CB00] hover:underline">View All</a>
    </div>

<div className="relative">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          aria-label="Previous"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full bg-[#EEEEEE] p-2 shadow hover:bg-[#08CB00] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiChevronLeft className="h-5 w-5 text-gray-600" />
        </button>

        <div
          ref={carouselRef}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onScroll={onScroll}
          className="flex space-x-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 scrollbar-hide"
        >
          {bestsellerList.map((p) => (
            <ProductCard 
              key={p.id} 
              product={p} 
              onAddToCart={handleAddToCart}
              onAddToWishlist={handleAddToWishlist}
              onQuickView={openModal}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={currentIndex >= pageCount - 1}
          aria-label="Next"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-full bg-[#EEEEEE] p-2 shadow hover:bg-[#08CB00] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiChevronRight className="h-5 w-5 text-gray-600" />
        </button>
      </div>

        <div className="flex justify-center space-x-2 mt-4">
                {Array.from({ length: pageCount }).map((_, i) => (
                <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`w-3 h-3 rounded-full ${i === currentIndex ? 'bg-[#08CB00]' : 'bg-black/30'}`}
                    aria-label={`Go to page ${i + 1}`}
                />
                ))}
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
