"use client";

import { motion } from "framer-motion";
import { LucideIcon, ArrowUpRight, ArrowDownRight, MoreHorizontal } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: "up" | "down";
  trendValue?: string;
  color?: string;
}

const StatsCard = ({ title, value, icon: Icon, trend, trendValue, color = "indigo" }: StatsCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="admin-card p-8 flex flex-col justify-between h-52 group cursor-pointer"
    >
      <div className="flex justify-between items-start">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-white/5 text-admin-accent group-hover:bg-admin-accent transition-all duration-500 shadow-lg group-hover:shadow-admin-accent/20`}>
          <Icon size={24} className="group-hover:text-white transition-colors" />
        </div>
        <button className="text-neutral-700 hover:text-white transition-colors">
          <MoreHorizontal size={20} />
        </button>
      </div>

      <div className="space-y-4">
        <div className="space-y-1">
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-500">{title}</p>
          <div className="flex items-baseline gap-4">
            <h3 className="text-4xl font-bold text-white tracking-tighter leading-none">{value}</h3>
            {trend && (
              <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-lg border ${
                trend === 'up' ? 'text-green-500 bg-green-500/10 border-green-500/20' : 'text-red-500 bg-red-500/10 border-red-500/20'
              }`}>
                {trend === 'up' ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                {trendValue}
              </div>
            )}
          </div>
        </div>
        
        {/* Progress Bar / Visual Element */}
        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
           <motion.div 
             initial={{ width: 0 }}
             whileInView={{ width: "70%" }}
             transition={{ duration: 1, delay: 0.5 }}
             className="h-full bg-admin-accent shadow-[0_0_10px_rgba(99,102,241,0.5)]"
           />
        </div>
      </div>

      {/* Glow Effect */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-admin-accent/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
    </motion.div>
  );
};

export default StatsCard;
