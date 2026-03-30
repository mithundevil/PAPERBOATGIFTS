"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

const Cart = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { cartItems, removeFromCart, cartTotal, updateQty } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-[500px] bg-white z-[110] shadow-2xl flex flex-col p-12"
          >
            <div className="flex justify-between items-center mb-12">
               <div className="space-y-1">
                 <h2 className="text-3xl font-outfit font-bold tracking-tighter uppercase">Your Registry</h2>
                 <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400">{cartItems.length} Handpicked pieces</p>
               </div>
               <button onClick={onClose} className="p-2 hover:bg-neutral-50 rounded-full transition-colors">
                 <X size={24} strokeWidth={1} />
               </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-10 pr-4 custom-scrollbar">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                   <div className="w-20 h-px bg-neutral-200" />
                   <p className="text-neutral-500 font-light text-sm italic">"A registry waiting for its story."</p>
                   <button onClick={onClose} className="btn-luxury-outline">Discover Collections</button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <motion.div 
                    layout
                    key={`${item.product}-${item.size}`} 
                    className="flex gap-8 group"
                  >
                    <div className="w-32 h-40 bg-neutral-50 rounded-2xl flex-shrink-0 flex items-center justify-center p-6 border border-neutral-100 overflow-hidden">
                       <img src={item.customImage || item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-2">
                       <div className="space-y-1">
                          <h3 className="text-lg font-outfit font-bold tracking-tighter truncate">{item.name}</h3>
                          <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest font-bold text-neutral-400">
                             <span>{item.size || "Standard"}</span>
                          </div>
                       </div>
                       
                       <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 border border-neutral-100 rounded-full px-4 py-1.5 bg-neutral-50 scale-90 -ml-2">
                             <button onClick={() => updateQty(item.product, item.size, Math.max(1, item.qty - 1))}><Minus size={12} /></button>
                             <span className="text-sm font-bold w-4 text-center">{item.qty}</span>
                             <button onClick={() => updateQty(item.product, item.size, item.qty + 1)}><Plus size={12} /></button>
                          </div>
                          <span className="text-lg font-outfit font-bold">₹{(item.price * item.qty).toLocaleString()}</span>
                       </div>

                       <button 
                         onClick={() => removeFromCart(item.product, item.size)}
                         className="text-[9px] uppercase tracking-widest text-neutral-400 hover:text-black transition-colors w-fit"
                       >
                          Remove Piece
                       </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="pt-12 mt-12 border-t border-neutral-100 space-y-8">
                 <div className="flex justify-between items-baseline">
                    <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-neutral-400">Total Valuation</span>
                    <span className="text-4xl font-outfit font-bold tracking-tighter">₹{cartTotal}</span>
                 </div>
                 <Link 
                   href="/checkout" 
                   onClick={onClose}
                   className="btn-luxury w-full flex items-center justify-center gap-4 group"
                 >
                    <span>Proceed to Acquisition</span>
                    <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-500" />
                 </Link>
                 <button onClick={onClose} className="w-full text-[10px] uppercase tracking-[0.4em] font-bold text-neutral-400 hover:text-black transition-colors">
                    Continue Browsing
                 </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;
