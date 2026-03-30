"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, X } from "lucide-react";
import { useEffect } from "react";

interface ToastProps {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
}

const Toast = ({ message, type = "success", onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`fixed bottom-10 right-10 z-[100] flex items-center gap-4 px-8 py-5 rounded-[2rem] shadow-2xl backdrop-blur-xl border ${
        type === "success" 
          ? "bg-[#6366F1]/10 border-[#6366F1]/30 text-white" 
          : "bg-rose-500/10 border-rose-500/30 text-white"
      }`}
    >
      <div className={`p-2 rounded-xl ${type === "success" ? "bg-[#6366F1]/20 text-[#6366F1]" : "bg-rose-500/20 text-rose-500"}`}>
        {type === "success" ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
      </div>
      <div className="space-y-0.5">
         <h4 className="text-[10px] font-black uppercase tracking-widest">{type === "success" ? "Protocol Success" : "Protocol Failure"}</h4>
         <p className="text-sm font-bold opacity-80">{message}</p>
      </div>
      <button onClick={onClose} className="ml-4 p-2 hover:bg-white/5 rounded-lg transition-colors opacity-40 hover:opacity-100">
         <X size={16} />
      </button>
    </motion.div>
  );
};

export default Toast;
