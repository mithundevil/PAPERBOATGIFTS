"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import ProductCard from "@/components/product/ProductCard";
import api from "@/utils/api";
import { motion } from "framer-motion";
import { ProductCardSkeleton } from "@/components/ui/Skeleton";
import { sampleProducts } from "@/utils/sampleData";

const CategoryPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      if (!category) return;
      const fallbackData = sampleProducts.filter(
        (p) => p.category === (Array.isArray(category) ? category[0] : category)
      );
      try {
        const { data: response } = await api.get(`/products/category/${category}`);
        if (response.data && response.data.length > 0) {
          setProducts(response.data);
        } else {
          setProducts(fallbackData);
        }
      } catch (err) {
        console.error(err);
        setProducts(fallbackData);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [category]);

  return (
    <div className="bg-white min-h-screen">
      {/* Category Header */}
      <div className="pt-28 md:pt-40 pb-10 md:pb-20 border-b border-neutral-100">
         <div className="container-premium space-y-3 md:space-y-4">
            <span className="text-[10px] uppercase tracking-[0.6em] font-bold text-neutral-400">Gallery</span>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-baseline gap-2 md:gap-4">
               <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-outfit font-bold tracking-tighter capitalize">{category} Collection</h1>
               <span className="text-sm font-light text-neutral-500">{products.length} Items Available</span>
            </div>
         </div>
      </div>

      <div className="container-premium py-10 md:py-20">
        {loading ? (
           <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-12">
             {[1,2,3,4,5,6,7,8].map(i => (
               <ProductCardSkeleton key={i} />
             ))}
           </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 md:py-40 border-2 border-dashed border-neutral-100 rounded-3xl">
             <p className="text-neutral-400 uppercase tracking-widest">Collection empty</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-12">
            {products.map((p, idx) => (
              <motion.div
                key={p._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05, duration: 0.8 }}
              >
                <ProductCard product={p} />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Featured Quote or Upsell */}
      <section className="bg-neutral-50 py-32">
         <div className="container-premium text-center space-y-6">
            <p className="text-neutral-500 font-light max-w-lg mx-auto italic text-lg">"Exclusivity is not for everyone, it is for those who appreciate the fine art of gifting."</p>
         </div>
      </section>
    </div>
  );
};

export default CategoryPage;
