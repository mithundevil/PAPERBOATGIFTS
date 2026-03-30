"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0B0B0B]/80 backdrop-blur-3xl z-[100]"
          />
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 lg:p-10 pointer-events-none">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 40 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-2xl bg-[#0B0B0B]/90 border border-[#1F1F1F] rounded-[2.5rem] shadow-2xl relative pointer-events-auto overflow-hidden shadow-indigo-500/5"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-[#6366F1]/5 via-transparent to-[#6366F1]/2 pointer-events-none" />
              
              <div className="p-10 border-b border-[#1F1F1F] flex justify-between items-center bg-white/[0.02] relative z-10">
                <div className="space-y-1">
                  <h3 className="text-2xl font-black text-white tracking-tighter uppercase">{title}</h3>
                  <div className="w-8 h-1 bg-[#6366F1] rounded-full" />
                </div>
                <button 
                  onClick={onClose}
                  className="p-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl transition-all text-neutral-400 hover:text-white group"
                >
                  <X size={20} className="group-hover:rotate-90 transition-transform duration-500" />
                </button>
              </div>
              <div className="p-10 max-h-[70vh] overflow-y-auto no-scrollbar relative z-10">
                {children}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
