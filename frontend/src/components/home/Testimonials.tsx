"use client";

import { useEffect, useState } from "react";
import api from "@/utils/api";
import { Star, Quote, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const fallbackFeedbacks = [
  {
    _id: "fb-1",
    name: "Aanya Mehta",
    rating: 5,
    message: "The linen album is absolutely breath-taking. The packaging was so minimalist and beautiful, it made the perfect wedding gift."
  },
  {
    _id: "fb-2",
    name: "Kabir Sharma",
    rating: 5,
    message: "Ordering via WhatsApp was incredibly seamless. They guided me through custom design options for my Polaroid print box."
  },
  {
    _id: "fb-3",
    name: "Rohan Das",
    rating: 5,
    message: "I ordered three Gilded Edge Posters for my home gallery. The quality of paper and print is beyond exceptional."
  }
];

const Testimonials = () => {
  const [feedbacks, setFeedbacks] = useState<any[]>([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const { data: response } = await api.get("/feedback");
        if (response.data && response.data.length > 0) {
          setFeedbacks(response.data);
        } else {
          setFeedbacks(fallbackFeedbacks);
        }
      } catch (err) {
        console.error("Failed to fetch feedbacks, loading fallback:", err);
        setFeedbacks(fallbackFeedbacks);
      }
    };
    fetchFeedbacks();
  }, []);

  return (
    <section className="py-32 bg-[#0B0B0B] border-y border-white/5 relative overflow-hidden">
       {/* Background Accents */}
       <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
       <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />

       <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center space-y-4 mb-20">
             <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em]">
                <Sparkles size={12} /> Social Resonance
             </div>
             <h2 className="text-4xl lg:text-6xl font-black tracking-tighter uppercase">Artisanal <span className="text-neutral-500 font-light italic">Narratives</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {feedbacks.map((fb, idx) => (
                <motion.div
                  key={fb._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white/5 border border-white/5 p-10 rounded-[2.5rem] relative group hover:border-indigo-500/30 transition-all duration-500"
                >
                   <Quote className="absolute top-8 right-8 text-indigo-500/20 w-12 h-12 group-hover:text-indigo-500/40 transition-colors" />
                   
                   <div className="flex gap-1 mb-6">
                      {[...Array(fb.rating)].map((_, i) => (
                         <Star key={i} size={14} className="fill-indigo-400 text-indigo-400" />
                      ))}
                   </div>

                   <p className="text-neutral-400 font-light leading-relaxed mb-8 italic">"{fb.message}"</p>
                   
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-black text-xs uppercase">
                         {fb.name.charAt(0)}
                      </div>
                      <div className="space-y-0.5">
                         <h4 className="text-[10px] font-black uppercase tracking-widest text-white">{fb.name}</h4>
                         <p className="text-[9px] text-neutral-600 font-bold uppercase tracking-tighter">Verified Protocol User</p>
                      </div>
                   </div>
                </motion.div>
             ))}
          </div>
       </div>
    </section>
  );
};

export default Testimonials;
