import React from 'react';
import { Link } from 'react-router-dom';
import {
  FiMonitor,
  FiSmartphone,
  FiCpu,
  FiHeadphones,
  FiHome,
  FiWatch,
  FiPackage,
  FiWifi,
} from 'react-icons/fi';

const categories = [
  {
    name: 'Laptops & PCs',
    icon: FiMonitor,
    count: 48,
    slug: 'laptops-pcs'
  },
  {
    name: 'Smartphones',
    icon: FiSmartphone,
    count: 36,
    slug: 'smartphones'
  },
  {
    name: 'Gaming',
    icon: FiCpu,
    count: 52,
    slug: 'gaming'
  },
  {
    name: 'Audio',
    icon: FiHeadphones,
    count: 42,
    slug: 'audio'
  },
  {
    name: 'Smart Home',
    icon: FiHome,
    count: 31,
    slug: 'smart-home'
  },
  {
    name: 'Wearables',
    icon: FiWatch,
    count: 27,
    slug: 'wearables'
  },
  {
    name: 'Accessories',
    icon: FiPackage,
    count: 63,
    slug: 'accessories'
  },
  {
    name: 'Networking',
    icon: FiWifi,
    count: 29,
    slug: 'networking'
  },
];

const Categories = () => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
        {categories.map((category, index) => (
          <Link
            to={`/category/${category.slug}`} 
            key={index}
            className="group rounded-xl border border-gray-200 bg-gray-50 p-4 transition-all duration-200 hover:border-[var(--color-secondary)] hover:shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 transition-colors duration-200 group-hover:border-[var(--color-secondary)] group-hover:text-[var(--color-secondary)]">
                <category.icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <h3 className="truncate text-sm font-semibold text-gray-900 md:text-base">{category.name}</h3>
                <p className="text-xs text-gray-500">{category.count} products</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
