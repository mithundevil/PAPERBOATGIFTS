"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { motion, AnimatePresence } from "framer-motion";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-admin-bg font-inter text-neutral-300">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <motion.div 
        animate={{ marginLeft: isSidebarOpen ? 280 : 80 }}
        className="transition-all duration-500 min-h-screen flex flex-col"
      >
        <Topbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} isSidebarOpen={isSidebarOpen} />
        <main className="flex-1 p-8 lg:p-12 max-w-7xl mx-auto w-full">
           <AnimatePresence mode="wait">
             <motion.div
               key="page-content"
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               transition={{ duration: 0.5 }}
             >
                {children}
             </motion.div>
           </AnimatePresence>
        </main>

        <footer className="p-8 border-t border-white/5 bg-admin-bg text-[10px] uppercase tracking-[0.4em] font-bold text-neutral-700 text-center">
           Paperboat Enterprise System • Protocol v4.2.0
        </footer>
      </motion.div>
    </div>
  );
};

export default AdminLayout;
