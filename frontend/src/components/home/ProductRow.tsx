"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/components/product/ProductCard";
import api from "@/utils/api";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ProductRow = ({ title, category }: { title: string; category?: string }) => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const url = category ? `/products?category=${category}` : "/products";
        const { data } = await api.get(url);
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [category]);

  const scrollRight = (id: string) => {
    document.getElementById(id)!.scrollBy({ left: 300, behavior: 'smooth' });
  };
  const scrollLeft = (id: string) => {
    document.getElementById(id)!.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const rowId = `row-${title.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div className="container mx-auto px-6 mb-12 bg-white py-6 shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      
      <div className="relative group">
        <button 
          onClick={() => scrollLeft(rowId)}
          className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-300 p-2 shadow-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronLeft size={24} />
        </button>
        
        <div 
          id={rowId}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 snap-x"
        >
          {loading ? (
            [1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="min-w-[200px] h-[300px] bg-gray-100 animate-pulse rounded-lg" />
            ))
          ) : (
            products.map((p) => (
              <div key={p._id} className="min-w-[200px] snap-start">
                <ProductCard product={p} />
              </div>
            ))
          )}
        </div>

        <button 
          onClick={() => scrollRight(rowId)}
          className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-300 p-2 shadow-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default ProductRow;
