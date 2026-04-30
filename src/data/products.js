const products = [
  {
    id: 1,
    name: 'Gaming Laptop Pro',
    price: 1499.99,
    salePrice: 1299.99,
    onSale: true,
    bestseller: true,
    category: 'Laptops',
    image: 'https://macfinder.co.uk/wp-content/uploads/2022/12/img-MacBook-Pro-Retina-14-Inch-23934.jpg',
    rating: 5,
    description: 'High-performance gaming laptop with RTX 4070, 32GB RAM, and 1TB NVMe SSD.',
    isNew: false
  },
  {
    id: 2,
    name: '4K Monitor 32"',
    price: 499.99,
    salePrice: null,
    onSale: false,
    bestseller: true,
    category: 'Laptops',
    image: 'https://eshop.hkcsl.com/on/demandware.static/-/Sites-master-hkt-hk/default/dwcdd8cb96/images/IP15_promaxscol/4019641_1.jpg',
    rating: 5,
    description: '32-inch 4K UHD monitor with HDR and 144Hz refresh rate.',
    isNew: false
  },
  {
    id: 3,
    name: 'Mechanical Keyboard Pro',
    price: 149.99,
    salePrice: 129.99,
    onSale: true,
    bestseller: true,
    category: 'Accessories',
    image: 'https://static1.pocketnowimages.com/wordpress/wp-content/uploads/styles/xxlarge/public/2022-05/LI%20WH1000%20XM5%20Colors.jpg',
    rating: 4,
    description: 'RGB mechanical keyboard with Cherry MX switches and aluminum frame.',
    isNew: false
  },
  {
    id: 4,
    name: 'Noise Cancelling Headphones',
    price: 349.99,
    salePrice: null,
    onSale: false,
    bestseller: true,
    category: 'Headphones',
    image: 'https://360-reader.com/wp-content/uploads/2023/07/Samsung-Galaxy-Watch-Band-20mm.png',
    rating: 5,
    description: 'Premium wireless headphones with industry-leading noise cancellation.',
    isNew: false
  },
  {
    id: 102,
    name: 'iPhone 15 Pro',
    price: 999.00,
    salePrice: null,
    onSale: false,
    bestseller: false,
    category: 'Smartphones',
    rating: 4.7,
    isNew: true,
    image: 'https://eshop.hkcsl.com/on/demandware.static/-/Sites-master-hkt-hk/default/dwcdd8cb96/images/IP15_promaxscol/4019641_1.jpg',
    description: 'The latest iPhone with Titanium design and A17 Pro chip.'
  }
  // ... remaining merged products truncated for brevity
];

export default products;