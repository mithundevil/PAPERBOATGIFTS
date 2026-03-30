"use client";

import { useState, useEffect } from "react";
import { 
  Bell, 
  Search, 
  Menu as MenuIcon, 
  X,
  Plus,
  Command,
  Sun,
  LifeBuoy
} from "lucide-react";

interface TopbarProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Topbar = ({ toggleSidebar, isSidebarOpen }: TopbarProps) => {
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    const info = localStorage.getItem("userInfo");
    if (info) setUserInfo(JSON.parse(info));
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-[#0B0B0B]/80 backdrop-blur-2xl py-5 px-10 flex items-center justify-between border-b border-[#1F1F1F]">
      <div className="flex items-center gap-6">
         <button onClick={toggleSidebar} className="p-2.5 hover:bg-white/5 rounded-2xl text-neutral-400 lg:hidden border border-white/5 transition-all">
            <MenuIcon size={20} />
         </button>
         
         <div className="hidden lg:flex items-center bg-[#111111] border border-[#1F1F1F] rounded-2xl px-5 py-2.5 gap-4 focus-within:ring-2 ring-[#6366F1]/20 transition-all w-[400px] shadow-inner">
            <Search size={16} className="text-neutral-600" />
            <input 
              type="text" 
              placeholder="Instant Acquisition Search..." 
              className="bg-transparent border-none outline-none text-xs text-white flex-1 placeholder:text-neutral-700 font-medium" 
            />
            <div className="flex items-center gap-1.5 bg-black/50 px-2.5 py-1 rounded-lg border border-white/5">
               <Command size={10} className="text-neutral-600" />
               <span className="text-[9px] text-neutral-600 font-black uppercase tracking-widest">K</span>
            </div>
         </div>
      </div>

      <div className="flex items-center gap-8">
         <div className="flex items-center gap-3 border-r border-[#1F1F1F] pr-8 hidden sm:flex">
            <button title="Help Center" className="p-3 text-neutral-500 hover:text-white hover:bg-white/5 rounded-2xl transition-all border border-transparent hover:border-white/5">
               <LifeBuoy size={20} strokeWidth={1.5} />
            </button>
            <button title="Notifications" className="p-3 text-neutral-500 hover:text-white hover:bg-white/5 rounded-2xl transition-all relative border border-transparent hover:border-white/5">
               <Bell size={20} strokeWidth={1.5} />
               <span className="absolute top-3.5 right-3.5 w-2 h-2 bg-[#6366F1] rounded-full border-2 border-[#0B0B0B] shadow-[0_0_10px_rgba(99,102,241,1)] animate-pulse" />
            </button>
         </div>

         <div className="flex items-center gap-5 group cursor-pointer">
            <div className="text-right hidden md:block group-hover:translate-x-[-4px] transition-transform">
               <p className="text-xs font-black text-white tracking-tight uppercase">{userInfo?.name || 'Master Overseer'}</p>
               <p className="text-[9px] text-[#6366F1] uppercase tracking-[0.4em] font-black mt-0.5 opacity-80">PRO LEVEL</p>
            </div>
            <div className="relative">
               <div className="w-12 h-12 rounded-[20px] bg-gradient-to-tr from-[#6366F1] to-[#818CF8] p-[1.5px] shadow-xl shadow-indigo-500/10 group-hover:scale-110 transition-transform duration-500">
                  <div className="w-full h-full bg-[#0B0B0B] rounded-[18.5px] flex items-center justify-center text-white font-black text-sm border border-white/5">
                     {userInfo?.name?.[0]?.toUpperCase() || 'P'}
                  </div>
               </div>
               <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-[3px] border-[#0B0B0B]" />
            </div>
         </div>
      </div>
    </header>
  );
};

export default Topbar;
