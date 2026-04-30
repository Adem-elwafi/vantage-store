import React, { useRef, useState, useEffect, useCallback } from 'react';
import { FiStar, FiShoppingCart, FiHeart, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../features/cart/cartSlice';
import { addToWishlist } from '../features/wishlist/wishlistSlice';
import { useProducts } from '../hooks/useProducts';
import ProductCard from './ProductCard'; 
const Bestsellers = () => {
  const carouselRef = useRef(null);
  const modalRef = useRef(null);
  const lastFocusedElement = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [touchStartX, setTouchStartX] = useState(0);
  const [modalProduct, setModalProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { getBestsellers } = useProducts();
  const bestsellerList = getBestsellers();
  const dispatch = useDispatch();

  useEffect(() => {
    const updateLayout = () => {
      const width = window.innerWidth;
      if (width >= 1024) setItemsPerPage(4);
      else if (width >= 640) setItemsPerPage(2);
      else setItemsPerPage(1);
    };

    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, []);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    el.scrollTo({ left: el.clientWidth * currentIndex, behavior: 'smooth' });
  }, [currentIndex]);

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
  }, [isModalOpen]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const pageCount = Math.max(1, Math.ceil(bestsellerList.length / itemsPerPage));

  const handlePrev = useCallback(() => {
    setCurrentIndex((index) => Math.max(index - 1, 0));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((index) => Math.min(index + 1, pageCount - 1));
  }, [pageCount]);

  const onTouchStart = useCallback((event) => {
    setTouchStartX(event.touches[0].pageX);
  }, []);

  const onTouchEnd = useCallback(
    (event) => {
      const diff = touchStartX - event.changedTouches[0].pageX;
      if (diff > 50) handleNext();
      if (diff < -50) handlePrev();
    },
    [handleNext, handlePrev, touchStartX]
  );

  const openModal = useCallback((product) => {
    lastFocusedElement.current = document.activeElement;
    setModalProduct(product);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setModalProduct(null);
    document.body.style.overflow = '';

    if (lastFocusedElement.current && typeof lastFocusedElement.current.focus === 'function') {
      lastFocusedElement.current.focus();
    }
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
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold border-b-2 border-[#08CB00] pb-1">
          Best Sellers
        </h2>
        <a href="/shop" className="text-sm text-[#08CB00] hover:underline">
          View All
        </a>
      </div>

      <div className="relative">
        <button
          type="button"
          aria-label="Previous"
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-[#EEEEEE] p-2 shadow transition-colors hover:bg-[#08CB00] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          <FiChevronLeft className="h-5 w-5 text-gray-600" />
        </button>

        <div
          ref={carouselRef}
          onScroll={() => {
            const el = carouselRef.current;
            if (!el) return;
            const nextIndex = Math.round(el.scrollLeft / el.clientWidth);
            setCurrentIndex(Math.max(0, Math.min(nextIndex, pageCount - 1)));
          }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
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

          {!bestsellerList.length && (
            <div className="w-full rounded-2xl border border-dashed border-black/20 p-10 text-center text-gray-600">
              No best sellers found.
            </div>
          )}
        </div>

        <button
          type="button"
          aria-label="Next"
          onClick={handleNext}
          disabled={currentIndex >= pageCount - 1}
          className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-[#EEEEEE] p-2 shadow transition-colors hover:bg-[#08CB00] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          <FiChevronRight className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      <div className="mt-4 flex justify-center space-x-2">
        {Array.from({ length: pageCount }).map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setCurrentIndex(index)}
            className={`h-2.5 rounded-full transition-all ${currentIndex === index ? 'w-8 bg-[#08CB00]' : 'w-2.5 bg-black/20'}`}
            aria-label={`Go to page ${index + 1}`}
          />
        ))}
      </div>

      <div
        className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 transition-opacity duration-300 ${isModalOpen ? 'z-50 opacity-100' : 'pointer-events-none opacity-0'}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={closeModal}
      >
        {modalProduct && (
          <div
            ref={modalRef}
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-[#EEEEEE] transform transition-all"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="sticky top-0 flex items-center justify-between border-b border-[#000000] bg-[#EEEEEE] p-4">
              <h2 id="modal-title" className="text-2xl font-semibold">
                {modalProduct.name}
              </h2>
              <button
                type="button"
                aria-label="Close modal"
                onClick={closeModal}
                className="rounded-full p-1 text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 hover:text-gray-700"
                autoFocus
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="gap-6 p-6 md:flex">
              <div className="mb-6 md:mb-0 md:w-1/2">
                <img
                  src={modalProduct.image}
                  alt={modalProduct.name}
                  className="h-64 w-full rounded-lg object-cover md:h-80"
                  loading="lazy"
                />
              </div>

              <div className="md:w-1/2">
                <div className="mb-4">
                  <div className="mb-2 flex items-center">
                    <div className="mr-2 flex items-center">
                      {[...Array(5)].map((_, index) => (
                        <svg
                          key={index}
                          className={`h-5 w-5 ${index < modalProduct.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">{modalProduct.rating}/5.0</span>
                  </div>

                  <div className="mb-4 text-2xl font-bold text-gray-900">
                    ${modalProduct.onSale ? modalProduct.salePrice : modalProduct.price}
                    {modalProduct.onSale && (
                      <span className="ml-2 text-sm text-gray-500 line-through">
                        ${modalProduct.price}
                      </span>
                    )}
                  </div>
                </div>

                <p className="mb-6 text-gray-700">{modalProduct.description}</p>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={(event) => {
                      handleAddToCart(modalProduct, event);
                      closeModal();
                    }}
                    className="flex-1 rounded bg-[#253900] px-6 py-3 text-white transition hover:bg-[#08CB00] focus:outline-none focus:ring-2 focus:ring-[#08CB00] focus:ring-offset-2"
                  >
                    Add to Cart
                  </button>
                  <button
                    type="button"
                    onClick={(event) => handleAddToWishlist(modalProduct, event)}
                    className="rounded-full p-3 text-[#000000] transition hover:text-[#08CB00] focus:outline-none focus:ring-2 focus:ring-[#08CB00] focus:ring-offset-2"
                    aria-label="Add to wishlist"
                  >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Bestsellers;
