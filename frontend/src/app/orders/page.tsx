"use client";

import { useState, useEffect } from "react";
import api from "@/utils/api";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Package, 
  ChevronRight, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ShoppingBag,
  ArrowRight,
  ExternalLink
} from "lucide-react";
import Link from "next/link";
import { ProductCardSkeleton } from "@/components/ui/Skeleton";

const MyOrders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data: response } = await api.get("/orders/myorders");
        if (response.data && Array.isArray(response.data)) {
          setOrders(response.data);
        }
      } catch (err) {
        console.warn("Acquisition history retrieval inhibited - awaiting authorization.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return (
     <div className="min-h-screen pt-32 pb-20 container-premium">
        <div className="space-y-8">
           {[1,2,3].map(i => <div key={i} className="h-64 bg-neutral-50 animate-pulse rounded-3xl" />)}
        </div>
     </div>
  );

  return (
    <div className="min-h-screen pt-32 pb-20 bg-white">
      <div className="container-premium max-w-4xl mx-auto space-y-16">
        {/* Header */}
        <div className="space-y-4">
           <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-black" />
              <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-neutral-400">Client Account</span>
           </div>
           <h1 className="text-6xl font-bold text-black tracking-tighter leading-none">Acquisition <span className="text-neutral-300 font-light italic">History</span></h1>
        </div>

        {orders.length === 0 ? (
           <div className="py-20 text-center space-y-8">
              <div className="w-24 h-24 bg-neutral-50 rounded-full flex items-center justify-center mx-auto text-neutral-300">
                 <ShoppingBag size={40} strokeWidth={1} />
              </div>
              <div className="space-y-2">
                 <p className="text-2xl font-bold tracking-tight">Your collection is empty.</p>
                 <p className="text-neutral-400 text-sm">Begin your journey of artisanal memories today.</p>
              </div>
              <Link href="/products/frames">
                 <button className="btn-premium px-12">Explore Collections</button>
              </Link>
           </div>
        ) : (
           <div className="space-y-10">
              {orders.map((order, idx) => (
                 <motion.div 
                   key={order._id}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: idx * 0.1 }}
                   className="group p-8 md:p-12 bg-white border border-neutral-100 rounded-[2.5rem] hover:border-black transition-all duration-700 hover:shadow-2xl hover:shadow-neutral-200/50"
                 >
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
                       <div className="space-y-2">
                          <p className="text-[10px] uppercase font-bold tracking-widest text-neutral-400">Order Protocol: #{order._id.slice(-8).toUpperCase()}</p>
                          <div className="flex items-center gap-3">
                             <Clock size={14} className="text-neutral-400" />
                             <span className="text-sm font-medium">{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                          </div>
                       </div>
                       
                       <div className="flex items-center gap-4">
                          <div className={`flex items-center gap-2 px-6 py-2 rounded-full border ${order.isPaid ? 'bg-green-50 border-green-100 text-green-600' : 'bg-amber-50 border-amber-100 text-amber-600'} text-[10px] uppercase font-bold tracking-widest`}>
                             {order.isPaid ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                             {order.isPaid ? 'Transaction Verified' : 'Awaiting Payment'}
                          </div>
                          <div className={`flex items-center gap-2 px-6 py-2 rounded-full border ${order.isDelivered ? 'bg-black text-white' : 'bg-neutral-50 border-neutral-100 text-neutral-400'} text-[10px] uppercase font-bold tracking-widest`}>
                             {order.isDelivered ? 'Asset Delivered' : 'In Transit'}
                          </div>
                       </div>
                    </div>

                    <div className="space-y-8">
                       {order.orderItems.map((item: any, i: number) => (
                          <div key={i} className="flex items-center justify-between group/item">
                             <div className="flex items-center gap-8">
                                <div className="w-20 h-24 bg-neutral-50 rounded-2xl overflow-hidden border border-neutral-100 p-2 group-hover/item:border-black transition-colors">
                                   <img src={item.images?.[0]?.url || item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                                </div>
                                <div className="space-y-1">
                                   <p className="text-lg font-bold tracking-tight">{item.name}</p>
                                   <p className="text-xs text-neutral-400 uppercase tracking-widest font-medium">Protocol: {item.size}</p>
                                   {item.customText && (
                                      <p className="text-xs italic text-neutral-500 mt-2 font-light">" {item.customText} "</p>
                                   )}
                                </div>
                             </div>
                             <div className="text-right">
                                <p className="text-lg font-bold tracking-tighter">₹{item.price.toLocaleString()}</p>
                                <p className="text-[10px] uppercase font-bold text-neutral-400">Qty: {item.qty}</p>
                             </div>
                          </div>
                       ))}
                    </div>

                    <div className="mt-12 pt-8 border-t border-dashed border-neutral-200 flex flex-col md:flex-row justify-between items-end md:items-center gap-6">
                       <div className="flex items-center gap-4 text-neutral-400 group-hover:text-black transition-colors">
                          <MapPin size={16} />
                          <p className="text-xs font-medium">{order.shippingAddress.address}, {order.shippingAddress.city}</p>
                       </div>
                       <div className="space-y-1 text-right">
                          <p className="text-[10px] uppercase font-bold text-neutral-400 tracking-widest">Global Valuation</p>
                          <p className="text-4xl font-bold tracking-tighter">₹{order.totalPrice.toLocaleString()}</p>
                       </div>
                    </div>
                 </motion.div>
              ))}
           </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
