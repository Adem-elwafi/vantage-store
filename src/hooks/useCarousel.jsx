import { useState, useEffect, useCallback, useRef } from 'react';

export const useCarousel = (itemCount) => {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [touchStartX, setTouchStartX] = useState(0);

  // Responsive Layout Logic
  useEffect(() => {
    const updateLayout = () => {
      const w = window.innerWidth;
      if (w >= 1024) setItemsPerPage(4);
      else if (w >= 640) setItemsPerPage(2);
      else setItemsPerPage(1);
    };
    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, []);

  // Smooth Scroll Execution
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    // compute page width (container width divided by visible items)
    const pageWidth = el.clientWidth / Math.max(1, itemsPerPage);
    const scrollAmount = pageWidth * currentIndex;
    el.scrollTo({ left: scrollAmount, behavior: 'smooth' });
  }, [currentIndex, itemsPerPage]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((i) => Math.max(i - 1, 0));
  }, []);

  const handleNext = useCallback(() => {
    const maxIndex = Math.ceil(itemCount / itemsPerPage) - 1;
    setCurrentIndex((i) => Math.min(i + 1, maxIndex));
  }, [itemCount, itemsPerPage]);

  // Touch Gesture Handlers[cite: 2]
  const onTouchStart = useCallback((e) => {
    setTouchStartX(e.touches[0].pageX);
  }, []);

  const onTouchEnd = useCallback((e) => {
    const diff = touchStartX - e.changedTouches[0].pageX;
    if (diff > 50) handleNext();
    if (diff < -50) handlePrev();
  }, [handleNext, handlePrev, touchStartX]);

  const onScroll = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    const pageWidth = el.clientWidth / Math.max(1, itemsPerPage);
    const index = Math.round(el.scrollLeft / pageWidth);
    setCurrentIndex(Math.max(0, Math.min(index, Math.ceil(itemCount / itemsPerPage) - 1)));
  }, [itemsPerPage, itemCount]);

  return {
    carouselRef,
    currentIndex,
    setCurrentIndex,
    itemsPerPage,
    handlePrev,
    handleNext,
    onTouchStart,
    onTouchEnd,
    pageCount: Math.ceil(itemCount / itemsPerPage),
    onScroll
  };
};