"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/layout/AdminLayout";
import api from "@/utils/api";
import { Star, MessageSquare, Trash2, Quote, Sparkles } from "lucide-react";

const AdminFeedback = () => {
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFeedbacks = async () => {
    try {
      const { data: response } = await api.get("/feedback");
      setFeedbacks(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const deleteFeedback = async (id: string) => {
    if (confirm("Are you sure you want to remove this testimonial protocol?")) {
      try {
        await api.delete(`/feedback/${id}`);
        fetchFeedbacks();
      } catch (err) {
        alert("Failed to remove feedback.");
      }
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-12">
        <div className="flex items-center justify-between">
            <div className="space-y-1">
               <h1 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">Resonance <span className="text-neutral-500 font-light italic">Registry</span></h1>
               <p className="text-[10px] uppercase font-bold tracking-[0.4em] text-neutral-600">Protocol: Customer Insights & Testimonials</p>
            </div>
            <div className="hidden md:flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/5 rounded-2xl">
               <Sparkles size={16} className="text-[#6366F1]" />
               <span className="text-[10px] uppercase tracking-widest font-bold text-neutral-400">Social Proof Optimization</span>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {feedbacks.map((fb) => (
              <div key={fb._id} className="bg-[#0B0B0B] border border-[#1F1F1F] p-8 rounded-[2.5rem] relative group hover:border-[#6366F1]/30 transition-all duration-500 shadow-2xl">
                 <div className="flex justify-between items-start mb-6">
                    <div className="flex gap-1">
                       {[...Array(fb.rating)].map((_, i) => (
                          <Star key={i} size={14} className="fill-indigo-400 text-indigo-400" />
                       ))}
                    </div>
                    <button 
                      onClick={() => deleteFeedback(fb._id)}
                      className="p-3 bg-white/5 text-neutral-600 hover:text-rose-500 hover:bg-rose-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-all"
                    >
                       <Trash2 size={16} />
                    </button>
                 </div>

                 <p className="text-neutral-400 text-sm font-light leading-relaxed mb-8 italic">"{fb.message}"</p>
                 
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#111111] border border-[#1F1F1F] flex items-center justify-center text-indigo-400 font-black text-xs uppercase">
                       {fb.name.charAt(0)}
                    </div>
                    <div className="space-y-0.5">
                       <h4 className="text-[10px] font-black uppercase tracking-widest text-white">{fb.name}</h4>
                       <p className="text-[9px] text-neutral-600 font-bold uppercase tracking-tighter">Verified Order ID: #{fb.order?.slice(-8).toUpperCase()}</p>
                    </div>
                 </div>
              </div>
           ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminFeedback;
