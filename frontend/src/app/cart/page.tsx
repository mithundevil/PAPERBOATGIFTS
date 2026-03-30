"use client";

import { useCart } from "@/context/CartContext";
import Navbar from "@/components/layout/Navbar";
import Link from "next/link";
import { 
  Trash2, 
  ArrowRight, 
  ShoppingBag,
  ArrowLeft,
  CreditCard,
  Truck,
  ShieldCheck,
  Package
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CartPage = () => {
  const { cartItems, removeFromCart, itemsPrice, shippingPrice, totalPrice } = useCart();

  return (
    <div className="bg-[#0B0B0B] min-h-screen text-white pb-20">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pt-32 lg:pt-44">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Left: Cart Items */}
          <div className="lg:col-span-8 flex-1 space-y-12">
            <div className="flex items-center justify-between">
               <div className="space-y-1">
                  <h1 className="text-4xl lg:text-6xl font-black tracking-tighter uppercase leading-tight">Your <span className="text-neutral-500 font-light italic text-5xl">Manifest</span></h1>
                  <p className="text-[10px] uppercase font-bold tracking-[0.4em] text-neutral-600">Protocol: {cartItems.length} Core Assets Identified</p>
               </div>
               <Link href="/">
                  <button className="flex items-center gap-3 text-[10px] uppercase tracking-widest font-black text-neutral-500 hover:text-white transition-colors group">
                     <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Continue Discovery
                  </button>
               </Link>
            </div>

            <div className="space-y-6">
              <AnimatePresence mode="popLayout">
                {cartItems.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="py-32 flex flex-col items-center justify-center gap-6 border border-white/5 bg-white/5 rounded-[3rem] text-neutral-600"
                  >
                    <ShoppingBag size={48} className="opacity-20" />
                    <p className="text-sm uppercase tracking-widest font-black">Memory registry is vacant.</p>
                  </motion.div>
                ) : (
                  cartItems.map((item, idx) => (
                    <motion.div 
                      key={`${item.product}-${item.size}`}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="group relative flex flex-col md:flex-row items-center gap-8 bg-[#111111]/50 border border-white/5 p-8 rounded-[2.5rem] hover:bg-white/5 transition-all duration-500 hover:border-indigo-500/30"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      
                      <div className="relative w-32 h-40 rounded-2xl overflow-hidden border border-white/10 group-hover:scale-105 transition-transform duration-700">
                         <img src={item.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                      </div>

                      <div className="flex-1 space-y-4 relative z-10 w-full">
                         <div className="flex justify-between items-start">
                            <div className="space-y-1">
                               <h3 className="text-xl font-black uppercase tracking-tighter leading-tight">{item.name}</h3>
                               <p className="text-[10px] uppercase tracking-widest font-bold text-neutral-500">{item.size} Protocol</p>
                            </div>
                            <span className="text-xl font-bold">₹{item.price}</span>
                         </div>

                         <div className="flex flex-wrap gap-3">
                            {item.customText && (
                               <div className="px-4 py-2 bg-white/5 rounded-full border border-white/5 flex items-center gap-2">
                                  <span className="text-[9px] font-black uppercase tracking-widest text-neutral-600">Inscription:</span>
                                  <span className="text-[10px] font-bold text-indigo-400">"{item.customText}"</span>
                               </div>
                            )}
                            {item.customImage && (
                               <div className="px-4 py-2 bg-white/5 rounded-full border border-white/5 flex items-center gap-2">
                                  <Package size={12} className="text-neutral-600" />
                                  <span className="text-[10px] font-bold text-indigo-400">Custom Asset Linked</span>
                               </div>
                            )}
                            <div className="px-4 py-2 bg-white/5 rounded-full border border-white/5 flex items-center gap-2">
                               <span className="text-[9px] font-black uppercase tracking-widest text-neutral-600">Unit Count:</span>
                               <span className="text-[10px] font-bold">{item.qty}</span>
                            </div>
                         </div>
                      </div>

                      <button 
                        onClick={() => removeFromCart(item.product, item.size)}
                        className="p-4 bg-white/5 text-neutral-600 hover:text-rose-500 hover:bg-rose-500/10 rounded-2xl transition-all border border-transparent hover:border-rose-500/20"
                      >
                         <Trash2 size={18} />
                      </button>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right: Summary */}
          <div className="lg:w-[400px] shrink-0">
             <div className="sticky top-44 bg-[#0B0B0B] border border-[#1F1F1F] rounded-[3rem] p-10 space-y-10 shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent" />
                
                <h2 className="text-2xl font-black uppercase tracking-tighter relative z-10">Financial <span className="text-neutral-500 font-light italic">Manifest</span></h2>

                <div className="space-y-6 relative z-10">
                   <div className="flex justify-between items-center px-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Subtotal Acquisition</span>
                      <span className="text-lg font-bold">₹{itemsPrice}</span>
                   </div>
                   <div className="flex justify-between items-center px-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Shipping Logistics</span>
                      <span className="text-lg font-bold">₹{shippingPrice}</span>
                   </div>
                   <div className="h-px bg-white/5 w-full" />
                   <div className="flex justify-between items-center px-2 pt-2">
                      <span className="text-[11px] font-black uppercase tracking-[0.3em]">Total Valuation</span>
                      <span className="text-3xl font-black text-indigo-500">₹{totalPrice}</span>
                   </div>
                </div>

                <div className="space-y-4 relative z-10">
                   <Link href="/checkout">
                      <button 
                        disabled={cartItems.length === 0}
                        className="w-full py-6 bg-white text-black text-[11px] font-black uppercase tracking-[0.4em] rounded-2xl hover:bg-indigo-500 hover:text-white transition-all shadow-xl disabled:opacity-20 active:scale-[0.98] flex items-center justify-center gap-4 group"
                      >
                         Initiate Checkout <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                   </Link>
                </div>

                <div className="grid grid-cols-1 gap-6 pt-10 relative z-10 border-t border-white/5">
                   <div className="flex items-center gap-4 group/item">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-indigo-400 group-hover/item:scale-110 transition-transform">
                         <Truck size={18} />
                      </div>
                      <div className="space-y-0.5">
                         <p className="text-[9px] font-black uppercase tracking-widest text-white">Ethical Fulfillment</p>
                         <p className="text-[9px] text-neutral-600 font-bold uppercase tracking-tighter">Carbon-Neutral Logistics</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-4 group/item">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-indigo-400 group-hover/item:scale-110 transition-transform">
                         <ShieldCheck size={18} />
                      </div>
                      <div className="space-y-0.5">
                         <p className="text-[9px] font-black uppercase tracking-widest text-white">Quantum Encryption</p>
                         <p className="text-[9px] text-neutral-600 font-bold uppercase tracking-tighter">Secure Protocol Verified</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default CartPage;
