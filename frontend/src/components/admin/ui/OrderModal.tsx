"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, MapPin, Phone, CreditCard, Tag, FileText, Truck, Upload } from "lucide-react";
import Button from "./Button";
import Badge from "./Badge";

interface OrderModalProps {
  order: any;
  isOpen: boolean;
  onClose: () => void;
  onDeliver: (id: string) => void;
}

const OrderModal = ({ order, isOpen, onClose, onDeliver }: OrderModalProps) => {
  if (!order) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-end">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-2xl h-full bg-admin-sidebar border-l border-white/5 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
               <div className="space-y-1">
                  <div className="flex items-center gap-3">
                     <ShoppingBag size={18} className="text-admin-accent" />
                     <h2 className="text-xl font-bold text-white uppercase tracking-tighter">Order Protocol #{order._id.slice(-8).toUpperCase()}</h2>
                  </div>
                  <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">Initialization: {new Date(order.createdAt).toLocaleString()}</p>
               </div>
               <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-neutral-400 hover:text-white transition-all">
                  <X size={24} />
               </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
               {/* Acquisition Status */}
               <div className="grid grid-cols-2 gap-4">
                  <div className="admin-card p-6 bg-white/[0.01] border-white/5 flex flex-col gap-2">
                     <span className="text-[9px] uppercase font-bold text-neutral-600 tracking-widest">Financial Status</span>
                     <div className="flex items-center gap-2">
                        <CreditCard size={14} className="text-neutral-500" />
                        <span className="text-sm font-bold text-white">{order.isPaid ? "Secured / Paid" : "Awaiting Transaction"}</span>
                     </div>
                  </div>
                  <div className="admin-card p-6 bg-white/[0.01] border-white/5 flex flex-col gap-2">
                     <span className="text-[9px] uppercase font-bold text-neutral-600 tracking-widest">Fulfilment Protocol</span>
                     <div className="flex items-center gap-2">
                        <Truck size={14} className="text-neutral-500" />
                        <span className="text-sm font-bold text-white">{order.isDelivered ? "Manifest Complete" : "Pending Deployment"}</span>
                     </div>
                  </div>
               </div>

               {/* Items Registry */}
               <div className="space-y-6">
                  <div className="flex items-center gap-3">
                     <Tag size={16} className="text-admin-accent" />
                     <h3 className="text-xs uppercase font-bold text-neutral-400 tracking-[0.3em]">Artisanal Assets</h3>
                  </div>
                  <div className="space-y-4">
                     {order.orderItems.map((item: any, idx: number) => (
                        <div key={idx} className="admin-card p-6 bg-white/[0.02] border-white/5 flex gap-6 hover:bg-white/[0.04] transition-all">
                           <div className="w-20 h-24 bg-admin-bg rounded-2xl border border-white/5 flex items-center justify-center p-4">
                              <img src={item.image} className="w-full h-full object-contain mix-blend-lighten" />
                           </div>
                           <div className="flex-1 space-y-3">
                              <div className="flex justify-between items-start">
                                 <div>
                                    <h4 className="text-sm font-bold text-white">{item.name}</h4>
                                    <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">{item.size || "Bespoke Size"}</p>
                                 </div>
                                 <span className="text-sm font-bold text-admin-accent">₹{item.price} x {item.qty}</span>
                              </div>
                              
                              {item.customText && (
                                 <div className="bg-admin-bg/50 border border-admin-accent/20 rounded-xl p-4 space-y-2">
                                    <div className="flex items-center gap-2 text-admin-accent">
                                       <FileText size={12} />
                                       <span className="text-[9px] uppercase font-bold tracking-widest">Custom Inscription</span>
                                    </div>
                                    <p className="text-xs text-neutral-300 italic font-light italic">"{item.customText}"</p>
                                 </div>
                              )}

                              {item.customImage && (
                                 <div className="bg-admin-bg/50 border border-admin-accent/20 rounded-xl p-4 space-y-2">
                                    <div className="flex items-center gap-2 text-admin-accent">
                                       <Upload size={12} />
                                       <span className="text-[9px] uppercase font-bold tracking-widest">Bespoke Asset</span>
                                    </div>
                                    <div className="w-full aspect-video rounded-lg overflow-hidden border border-white/5 bg-black/20">
                                       <img src={item.customImage} className="w-full h-full object-contain" />
                                    </div>
                                 </div>
                              )}
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               {/* Curator Details */}
               <div className="space-y-6">
                  <div className="flex items-center gap-3">
                     <MapPin size={16} className="text-admin-accent" />
                     <h3 className="text-xs uppercase font-bold text-neutral-400 tracking-[0.3em]">Destination Logistics</h3>
                  </div>
                  <div className="admin-card p-8 bg-white/[0.01] border-white/5 space-y-6">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                           <span className="text-[9px] uppercase font-bold text-neutral-600 tracking-widest">Client Identity</span>
                           <p className="text-sm font-bold text-white">{order.user?.name || "Premium Curator"}</p>
                           <p className="text-[10px] text-neutral-500 font-mono italic">{order.user?.email}</p>
                        </div>
                        <div className="space-y-2">
                           <span className="text-[9px] uppercase font-bold text-neutral-600 tracking-widest">Contact Protocol</span>
                           <div className="flex items-center gap-2 text-sm font-bold text-white">
                              <Phone size={14} className="text-neutral-500" />
                              <span>{order.shippingAddress.phone}</span>
                           </div>
                        </div>
                     </div>
                     <div className="pt-6 border-t border-white/5 space-y-2">
                        <span className="text-[9px] uppercase font-bold text-neutral-600 tracking-widest">Secure Dropoff</span>
                        <p className="text-sm text-neutral-300 leading-relaxed font-light font-outfit">
                           {order.shippingAddress.address}, {order.shippingAddress.city}<br />
                           {order.shippingAddress.country} - {order.shippingAddress.postalCode}
                        </p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Footer Actions */}
            <div className="p-8 border-t border-white/5 bg-white/[0.02] flex items-center justify-between">
               <div className="space-y-1">
                  <span className="text-[9px] uppercase font-bold text-neutral-600 tracking-widest">Valuation Total</span>
                  <p className="text-2xl font-bold text-white silver-text-gradient tracking-tighter">₹{order.totalPrice.toLocaleString()}</p>
               </div>
               
               {!order.isDelivered && (
                  <Button 
                    className="px-10 py-6 shadow-glow transition-all active:scale-95" 
                    onClick={() => {
                       onDeliver(order._id);
                       onClose();
                    }}
                  >
                     Authorize Deployment
                  </Button>
               )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default OrderModal;
