"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, X, Send, Sparkles, ArrowRight } from "lucide-react";
import api from "@/utils/api";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
}

const FeedbackModal = ({ isOpen, onClose, orderId }: FeedbackModalProps) => {
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/feedback", {
        rating,
        message,
        order: orderId,
      });
      setSubmitted(true);
      setTimeout(onClose, 2000);
    } catch (err) {
      alert("Feedback transmission failed. Please retry.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[200]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 m-auto w-full max-w-lg h-fit bg-[#111111] border border-white/10 rounded-[3rem] p-12 z-[210] shadow-2xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-transparent pointer-events-none" />
            
            <button onClick={onClose} className="absolute top-8 right-8 text-neutral-500 hover:text-white transition-colors">
              <X size={24} />
            </button>

            {submitted ? (
              <div className="py-20 text-center space-y-6">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-20 h-20 bg-indigo-500 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-indigo-500/40"
                >
                   <Send size={32} className="text-white" />
                </motion.div>
                <h3 className="text-2xl font-black uppercase tracking-tighter">Narrative Received</h3>
                <p className="text-neutral-500 text-sm font-light">Your testimonial has been integrated into our artisanal registry.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-[9px] font-black uppercase tracking-widest">
                    <Sparkles size={10} /> Experience Protocol
                  </div>
                  <h2 className="text-4xl font-black tracking-tighter uppercase leading-tight">Share Your <span className="text-neutral-500 font-light italic">Narrative</span></h2>
                </div>

                <div className="space-y-4">
                   <p className="text-[10px] uppercase tracking-widest font-black text-neutral-500 text-center">Quality Resonance</p>
                   <div className="flex justify-center gap-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className="transition-transform active:scale-90"
                        >
                          <Star
                            size={32}
                            fill={star <= rating ? "#6366F1" : "transparent"}
                            className={star <= rating ? "text-indigo-500" : "text-neutral-800"}
                          />
                        </button>
                      ))}
                   </div>
                </div>

                <div className="space-y-3">
                   <label className="text-[10px] font-black uppercase tracking-widest text-neutral-600 px-2">The Aesthetic Review</label>
                   <textarea
                     required
                     value={message}
                     onChange={(e) => setMessage(e.target.value)}
                     className="w-full bg-white/5 border border-white/5 rounded-2xl p-6 text-sm focus:outline-none focus:border-indigo-500/50 transition-all min-h-[150px] placeholder:text-neutral-800"
                     placeholder="How does your artisanal piece resonate with you?"
                   />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-5 bg-indigo-500 text-white text-[10px] font-black uppercase tracking-[0.4em] rounded-xl shadow-xl shadow-indigo-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-30 disabled:scale-100 flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>Transmit Feedback <ArrowRight size={16} /></>
                  )}
                </button>
                
                <p className="text-[8px] text-center text-neutral-700 font-black uppercase tracking-widest">Authorized by Paperboat Gifts Aesthetic Registry</p>
              </form>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default FeedbackModal;
