import products from '../data/products';

export const useProducts = () => {
  const getProducts = () => products;

  const getBestsellers = () => products.filter(p => p.bestseller);

  const getProductsByCategory = (category) => {
    if (!category || category === 'All') return products;
    return products.filter(p => p.category === category);
  };
  const getGiftIdeas = () => products.filter(p => p.giftIdea); 

  const getNewArrivals = () => products.filter(p => p.isNew);

  return { 
    getProducts, 
    getBestsellers, 
    getProductsByCategory, 
    getNewArrivals,
    getGiftIdeas 
  };
};