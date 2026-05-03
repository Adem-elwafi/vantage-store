import React from 'react';
import { useProducts } from '../hooks/useProducts';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Mousewheel, Autoplay } from 'swiper/modules';

const GiftIdeas = () => {
  const { getGiftIdeas } = useProducts();
  const giftIdeas = getGiftIdeas();





  if (!giftIdeas.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No gift ideas available at the moment. Check back soon!</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold border-b-2 border-[#08CB00] pb-1">Gift Ideas</h2>
        <a href="/shop" className="text-sm text-[#08CB00] hover:underline">View All</a>
      </div>
<Swiper
  effect={'cube'}
  grabCursor={true}
  mousewheel={true}
  autoplay={{ delay: 3000, disableOnInteraction: false }}
  pagination={{ clickable: true }}
  modules={[Pagination, Mousewheel,Autoplay]}
  style={{ paddingBottom: '40px', width: '400px' }}
>
  {giftIdeas.map((product, index) => (
<SwiperSlide key={`gift-${product.id}-${index}`}>
  <div className="rounded-2xl overflow-hidden shadow-md bg-white">
    <img
      src={product.image}
      alt={product.name}
      className="w-full h-56 object-cover"
    />
    <div className="p-4 flex flex-col gap-2">
      <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
      <p className="text-[#08CB00] font-bold text-xl">
        ${product.onSale ? product.salePrice : product.price}
        {product.onSale && (
          <span className="ml-2 text-sm text-gray-400 line-through">${product.price}</span>
        )}
      </p>
      <a
        href={`/shop/${product.id}`}
        className="mt-2 text-center w-full py-2 rounded-xl border-2 border-[#253900] text-[#253900] font-semibold text-sm hover:bg-[#253900] hover:text-white transition-colors"
      >
        View Gift 🎁
      </a>
    </div>
  </div>
</SwiperSlide>
  ))}
</Swiper>
    </div>
  );
};

export default GiftIdeas;