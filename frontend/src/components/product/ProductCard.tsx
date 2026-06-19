"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

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

  const handleWhatsAppOrder = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const phoneNumber = "919999999999";
    const text = `Hello, I would like to order the following:\n\n*Product*: ${product.name}\n*Price*: ₹${product.startingPrice}\n\nPlease let me know how to proceed with payment and delivery.`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative flex flex-col justify-between items-center text-center p-4 md:p-8 bg-neutral-50 hover:bg-white transition-all duration-700 rounded-2xl border border-neutral-100/50 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-1 h-full"
    >
      <Link href={`/product/${product._id}`} className="w-full flex-grow flex flex-col">
        <div className="aspect-[4/5] w-full overflow-hidden bg-white rounded-xl mb-6 flex items-center justify-center p-8 relative flex-shrink-0">
          <motion.img 
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            src={product.images?.[0]?.url || product.image || "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop"} 
            alt={product.name} 
            className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-700"
          />
        </div>
        
        <div className="space-y-2 flex-grow flex flex-col justify-start">
           <p className="text-[9px] uppercase tracking-[0.4em] font-bold text-neutral-400">Curated Collection</p>
           <h3 className="text-lg font-outfit font-bold tracking-tighter text-black leading-tight mb-1">{product.name}</h3>
           <p className="text-[10px] text-neutral-500 font-light max-w-[200px] mx-auto line-clamp-2 leading-relaxed">{product.description || "Handcrafted with premium materials for timeless beauty."}</p>
        </div>
      </Link>

      <div className="flex flex-col items-center gap-4 w-full mt-6 pt-4 border-t border-neutral-100/50">
         <span className="text-xs uppercase tracking-widest text-neutral-400 font-medium">From <span className="text-sm font-bold tracking-tighter text-black font-outfit">₹{product.startingPrice}</span></span>
         <button 
           onClick={handleWhatsAppOrder}
           className="w-full bg-[#25D366] text-white hover:bg-[#20ba5a] transition-all duration-300 py-2.5 md:py-3 px-3 md:px-4 rounded-xl font-outfit font-bold text-[9px] md:text-[10px] tracking-[0.1em] md:tracking-[0.15em] uppercase flex items-center justify-center gap-1.5 md:gap-2 shadow-[0_4px_12px_rgba(37,211,102,0.2)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.3)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
           title="Order via WhatsApp"
         >
           <MessageCircle size={14} className="fill-white stroke-none" />
           <span>Order on WhatsApp</span>
         </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
