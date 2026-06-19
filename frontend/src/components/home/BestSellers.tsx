"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProductCard from "@/components/product/ProductCard";
import api from "@/utils/api";
import Link from "next/link";
import { sampleProducts } from "@/utils/sampleData";

const BestSellers = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const fallbackProducts = [
        sampleProducts.find((p) => p._id === "sample-frames-1"),
        sampleProducts.find((p) => p._id === "sample-albums-1"),
        sampleProducts.find((p) => p._id === "sample-mugs-1"),
        sampleProducts.find((p) => p._id === "sample-polaroids-1"),
      ].filter(Boolean);

      try {
        const { data: response } = await api.get("/products");
        if (response.data && Array.isArray(response.data) && response.data.length > 0) {
          setProducts(response.data.slice(0, 4));
        } else {
          setProducts(fallbackProducts);
        }
      } catch (err) {
        console.error("API failed to fetch bestsellers, loading fallback:", err);
        setProducts(fallbackProducts);
      }
    };
    fetch();
  }, []);

  return (
    <div className="section-spacing bg-[#FAFAFA]">
      <div className="container-premium">
        <div className="text-center space-y-4 mb-20">
           <span className="text-[10px] uppercase tracking-[0.6em] font-bold text-neutral-400">Pure Distinction</span>
           <h2 className="text-5xl md:text-6xl font-outfit font-bold tracking-tighter">Bespoke Favorites</h2>
           <p className="text-neutral-500 font-light max-w-xl mx-auto">Discover the pieces that defined elegance this season, curated by our master craftsmen.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
           {products.map((p, idx) => (
             <motion.div
               key={p._id}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: idx * 0.1, duration: 0.8 }}
             >
               <ProductCard product={p} />
             </motion.div>
           ))}
        </div>

        <div className="mt-20 flex justify-center">
           <Link href="/products/frames" className="btn-luxury-outline">
              Shop Full Collection
           </Link>
        </div>
      </div>
    </div>
  );
};

export default BestSellers;
