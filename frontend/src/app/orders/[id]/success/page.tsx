"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import api from "@/utils/api";
import { 
  CheckCircle2, 
  Package, 
  ArrowRight, 
  Mail, 
  Sparkles,
  ArrowLeft,
  ShoppingBag,
  MessageSquare
} from "lucide-react";
import { motion } from "framer-motion";
import FeedbackModal from "@/components/feedback/FeedbackModal";

const OrderSuccess = () => {
  const { id } = useParams();
  const [order, setOrder] = useState<any>(null);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data: response } = await api.get(`/orders/${id}`);
        setOrder(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrder();
  }, [id]);

  return (
    <div className="bg-[#0B0B0B] min-h-screen text-white pb-20">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 pt-44 text-center space-y-12">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative inline-block"
        >
           <div className="absolute inset-0 bg-indigo-500 blur-[100px] opacity-20" />
           <div className="relative w-32 h-32 rounded-[2.5rem] bg-indigo-500 flex items-center justify-center shadow-2xl shadow-indigo-500/40">
              <CheckCircle2 size={64} className="text-white" />
           </div>
        </motion.div>

        <div className="space-y-6">
           <h1 className="text-6xl lg:text-8xl font-black tracking-tighter uppercase leading-none">Manifest <span className="text-neutral-500 font-light italic">Secured</span></h1>
           <p className="text-neutral-500 text-xl font-light max-w-xl mx-auto">Protocol Success. Your artisanal assets are now entering the fulfillment sequence. A confirmation has been transmitted to your communication line.</p>
        </div>

        <div className="bg-[#111111]/50 border border-white/5 rounded-[3rem] p-10 max-w-2xl mx-auto space-y-8 relative overflow-hidden group">
           <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
           
           <div className="flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
              <div className="text-left space-y-1">
                 <p className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-600">Secure Order ID</p>
                 <h3 className="text-lg font-bold text-indigo-400">#{id}</h3>
              </div>
              <div className="text-right space-y-1">
                 <p className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-600">Est. Fulfillment</p>
                 <h3 className="text-lg font-bold">4-6 Protocol Cycles (Days)</h3>
              </div>
           </div>

           <div className="h-px bg-white/5 w-full" />

           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
              <div className="space-y-2">
                 <Mail size={20} className="text-indigo-400 mx-auto" />
                 <p className="text-[9px] font-black uppercase tracking-widest text-neutral-500">Email Alerts Active</p>
              </div>
              <div className="space-y-2">
                 <Package size={20} className="text-indigo-400 mx-auto" />
                 <p className="text-[9px] font-black uppercase tracking-widest text-neutral-500">Inventory Reserved</p>
              </div>
              <div className="space-y-2">
                 <Sparkles size={20} className="text-indigo-400 mx-auto" />
                 <p className="text-[9px] font-black uppercase tracking-widest text-neutral-500">Boutique Curated</p>
              </div>
           </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-8">
           <Link href="/" className="px-10 py-5 bg-white text-black text-[11px] font-black uppercase tracking-[0.4em] rounded-2xl hover:bg-indigo-500 hover:text-white transition-all shadow-xl active:scale-[0.98] flex items-center gap-4 group">
              Return to Catalog <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
           </Link>
           <button 
             onClick={() => setIsFeedbackOpen(true)}
             className="px-10 py-5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[11px] font-black uppercase tracking-[0.4em] rounded-2xl hover:bg-indigo-500 hover:text-white transition-all flex items-center gap-4 group"
           >
              <MessageSquare size={18} /> Share Narrative
           </button>
           <Link href="/orders" className="px-10 py-5 bg-white/5 text-neutral-500 border border-white/5 text-[11px] font-black uppercase tracking-[0.4em] rounded-2xl hover:text-white hover:border-white/20 transition-all flex items-center gap-4 group">
              <Package size={18} /> View Logistics
           </Link>
        </div>
      </main>

      <FeedbackModal 
        isOpen={isFeedbackOpen} 
        onClose={() => setIsFeedbackOpen(false)} 
        orderId={id as string} 
      />
    </div>
  );
};

export default OrderSuccess;
