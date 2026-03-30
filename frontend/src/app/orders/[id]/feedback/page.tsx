"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import api from "@/utils/api";
import { 
  Star, 
  Send, 
  MessageSquare, 
  Sparkles,
  ArrowLeft,
  Heart
} from "lucide-react";
import { motion } from "framer-motion";

const FeedbackPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState<any>(null);
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await api.get(`/orders/${id}`);
        setOrder(data);
        if (!data.isDelivered) {
          alert("Feedback protocol only available post-fulfillment.");
          router.push("/");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post("/feedback", {
        rating,
        message,
        order: id,
        product: order.orderItems[0].product
      });
      alert("Feedback transmitted successfully. Thank you for your resonance.");
      router.push("/");
    } catch (err) {
      alert("Feedback acquisition failure.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="min-h-screen bg-black" />;

  return (
    <div className="bg-[#0B0B0B] min-h-screen text-white pb-20">
      <Navbar />

      <main className="max-w-3xl mx-auto px-6 pt-44 space-y-16">
        <div className="text-center space-y-4">
           <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em]">
              <Heart size={12} /> Post-Fulfillment Engagement
           </div>
           <h1 className="text-5xl lg:text-7xl font-black tracking-tighter uppercase leading-tight">Shared <span className="text-neutral-500 font-light italic text-5xl">Resonance</span></h1>
           <p className="text-neutral-500 text-lg font-light">Your experience shapes our artisanal future. Share your narrative.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#111111]/50 border border-white/5 rounded-[3rem] p-12 space-y-12 relative overflow-hidden group">
           <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
           
           <div className="space-y-6 text-center relative z-10">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-600 px-1">Valuation Rating</h3>
              <div className="flex justify-center gap-4">
                 {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      onClick={() => setRating(star)}
                      className="transition-transform hover:scale-125 duration-300"
                    >
                       <Star 
                         size={48} 
                         className={star <= (hoveredRating || rating) ? "text-indigo-400 fill-indigo-400" : "text-neutral-800"} 
                       />
                    </button>
                 ))}
              </div>
           </div>

           <div className="space-y-4 relative z-10">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-600 px-1 flex items-center gap-2">
                 <MessageSquare size={14} /> Artisanal Narrative
              </label>
              <textarea 
                rows={6}
                placeholder="Share your aesthetic experience..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-white/5 border border-white/5 rounded-[2rem] px-8 py-8 text-sm focus:outline-none focus:border-indigo-500/50 transition-all placeholder:text-neutral-700 font-bold resize-none"
              />
           </div>

           <div className="relative z-10">
              <button 
                type="submit"
                disabled={submitting}
                className="w-full py-6 bg-indigo-500 text-white text-[11px] font-black uppercase tracking-[0.5em] rounded-2xl shadow-2xl shadow-indigo-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-30 disabled:scale-100 flex items-center justify-center gap-4 group"
              >
                 {submitting ? (
                   <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                 ) : (
                   <>Transmit Feedback <Send size={16} /></>
                 )}
              </button>
           </div>
        </form>
      </main>
    </div>
  );
};

export default FeedbackPage;
