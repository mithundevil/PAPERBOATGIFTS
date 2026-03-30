"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  PlusCircle, 
  MessageSquare,
  Settings, 
  LogOut, 
  ChevronLeft,
  ChevronRight,
  Diamond
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (o: boolean) => void }) => {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/admin", group: "Overview" },
    { name: "Products", icon: Package, href: "/admin/products", group: "Inventory" },
    { name: "Add Product", icon: PlusCircle, href: "/admin/products/add", group: "Inventory" },
    { name: "Orders", icon: ShoppingBag, href: "/admin/orders", group: "Sales" },
    { name: "Customers", icon: Users, href: "/admin/customers", group: "Sales" },
    { name: "Resonance", icon: MessageSquare, href: "/admin/feedback", group: "System" },
    { name: "Settings", icon: Settings, href: "/admin/settings", group: "System" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    router.push("/login");
  };

  return (
    <motion.aside
      animate={{ width: isOpen ? 280 : 80 }}
      className="fixed top-0 left-0 h-full bg-[#0B0B0B] border-r border-[#1F1F1F] z-50 flex flex-col transition-all duration-500 shadow-2xl"
    >
      {/* Brand Section */}
      <div className="p-8 flex items-center justify-between overflow-hidden">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-[#6366F1] to-[#4F46E5] rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/20 rotate-3 group-hover:rotate-0 transition-transform duration-500">
             <Diamond className="text-white animate-pulse" size={24} />
          </div>
          <AnimatePresence>
            {isOpen && (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col"
              >
                <span className="text-xl font-bold tracking-tighter text-white whitespace-nowrap leading-none">PAPERBOAT</span>
                <span className="text-[10px] uppercase tracking-[0.4em] text-[#6366F1] font-bold mt-1">Command</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-10 px-4 space-y-10 overflow-y-auto no-scrollbar">
         {["Overview", "Inventory", "Sales", "System"].map(group => (
           <div key={group} className="space-y-3">
              {isOpen && (
                <p className="text-[9px] uppercase tracking-[0.5em] font-black text-neutral-700 mb-6 px-4">
                  {group}
                </p>
              )}
              <div className="space-y-1">
                {menuItems.filter(i => i.group === group).map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center gap-4 p-3.5 rounded-2xl transition-all relative group ${
                        isActive ? "bg-white/[0.03] text-white shadow-inner" : "text-neutral-500 hover:text-white hover:bg-white/[0.02]"
                      }`}
                    >
                      <div className={`p-2 rounded-xl transition-all duration-500 ${isActive ? "bg-[#6366F1]/10 text-[#6366F1] shadow-glow" : "group-hover:bg-white/5"}`}>
                        <item.icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                      </div>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.span 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="font-semibold text-sm tracking-tight"
                          >
                            {item.name}
                          </motion.span>
                        )}
                      </AnimatePresence>
                      {isActive && (
                        <motion.div 
                          layoutId="active-indicator"
                          className="absolute left-[-1rem] w-1.5 h-8 bg-[#6366F1] rounded-r-full shadow-[0_0_20px_rgba(99,102,241,0.8)]" 
                        />
                      )}
                    </Link>
                  );
                })}
              </div>
           </div>
         ))}
      </nav>

      {/* Logout */}
      <div className="p-6 border-t border-[#1F1F1F]/50">
         <button 
           onClick={handleLogout}
           className="w-full flex items-center gap-4 p-4 rounded-2xl text-red-400/80 hover:text-red-400 hover:bg-red-400/5 transition-all group border border-transparent hover:border-red-400/10"
         >
            <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
            <AnimatePresence>
              {isOpen && (
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="font-bold text-xs uppercase tracking-widest"
                >
                  Terminate Session
                </motion.span>
              )}
            </AnimatePresence>
         </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
