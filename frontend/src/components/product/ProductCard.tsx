"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    startingPrice: number;
    image: string;
    images?: { url: string; public_id: string }[];
    description?: string;
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative flex flex-col items-center text-center space-y-6 p-8 bg-neutral-50 hover:bg-white transition-colors duration-700 rounded-2xl border border-neutral-100/50 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)]"
    >
      <Link href={`/product/${product._id}`} className="w-full">
        <div className="aspect-[4/5] w-full overflow-hidden bg-white rounded-xl mb-8 flex items-center justify-center p-12">
          <motion.img 
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            src={product.images?.[0]?.url || product.image || "https://placehold.co/400x500"} 
            alt={product.name} 
            className="w-full h-full object-contain"
          />
        </div>
        
        <div className="space-y-2">
           <p className="text-[9px] uppercase tracking-[0.4em] font-bold text-neutral-400">Curated Collection</p>
           <h3 className="text-xl font-outfit font-bold tracking-tighter text-black">{product.name}</h3>
           <p className="text-[10px] text-neutral-500 font-light max-w-[200px] mx-auto line-clamp-1">{product.description || "Handcrafted with premium materials for timeless beauty."}</p>
        </div>
      </Link>

      <div className="flex items-center justify-center gap-4 w-full">
         <span className="text-sm font-bold tracking-tighter">FROM ₹{product.startingPrice}</span>
         <div className="w-px h-4 bg-neutral-200" />
         <button 
           onClick={() => addToCart({ 
             product: product._id, 
             name: product.name, 
             image: product.images?.[0]?.url || product.image, 
             price: product.startingPrice, 
             qty: 1, 
             size: "Standard" 
           })}
           className="text-[10px] uppercase tracking-[0.3em] font-bold hover:text-neutral-400 transition-colors flex items-center gap-1"
         >
           <Plus size={14} strokeWidth={3} /> ADD
         </button>
      </div>

      {/* Quick View Overlay (Visual Only) */}
      <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
         <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
            <Plus size={20} strokeWidth={1} />
         </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
