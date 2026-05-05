import React, { useRef, useState, useEffect, useCallback } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../features/cart/cartSlice';
import { addToWishlist } from '../features/wishlist/wishlistSlice';
import { useProducts } from '../hooks/useProducts';
import ProductCard from './ProductCard'; 
import ProductQuickViewModal from './ProductQuickViewModal';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';


// import required modules
import { EffectCoverflow, Pagination, Scrollbar, Mousewheel } from 'swiper/modules';

const Bestsellers = () => {
  const lastFocusedElement = useRef(null);
  const [modalProduct, setModalProduct] = useState(null);
  const { getBestsellers } = useProducts();
  const bestsellerList = getBestsellers();
  const dispatch = useDispatch();


  const closeModal = useCallback(() => {
    setModalProduct(null);
    document.body.style.overflow = '';

    if (lastFocusedElement.current && typeof lastFocusedElement.current.focus === 'function') {
      lastFocusedElement.current.focus();
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!modalProduct) return;

      if (event.key === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [modalProduct, closeModal]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);



  const openModal = useCallback((product) => {
    lastFocusedElement.current = document.activeElement;
    setModalProduct(product);
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
      <h2 className="text-3xl font-semibold border-b-2 border-[var(--color-secondary)] pb-1">Best Sellers</h2>
      <a href="/shop" className="text-sm text-[var(--color-secondary)] hover:underline">View All</a>
  </div>
<div className="relative z-0 overflow-hidden">
  
<Swiper
  effect={'coverflow'}
  grabCursor={true}
  centeredSlides={true}
  slidesPerView={'auto'}
  mousewheel={true} // 👈 add this
  coverflowEffect={{
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  }}
  pagination={true}
  scrollbar={{ draggable: true, hide: false }}
  modules={[EffectCoverflow, Pagination, Scrollbar, Mousewheel]} // 👈 add Mousewheel
  className="mySwiper"
  style={{ paddingTop: '20px', paddingBottom: '50px' }}
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

      {modalProduct && (
        <ProductQuickViewModal
          product={modalProduct}
          onClose={closeModal}
          onAddToCart={handleAddToCart}
        />
      )}
    </section>
  );
};

export default Bestsellers;
