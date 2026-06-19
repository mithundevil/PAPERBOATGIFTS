"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const categories = [
  { name: "Frames", type: "Classic Bespoke", image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop", href: "/products/frames" },
  { name: "Albums", type: "Timeless Stories", image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop", href: "/products/albums" },
  { name: "Mugs", type: "Daily Rituals", image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=800&auto=format&fit=crop", href: "/products/mugs" },
  { name: "Polaroids", type: "Instant Memories", image: "https://images.unsplash.com/photo-1610484826967-09c5720778c7?q=80&w=800&auto=format&fit=crop", href: "/products/polaroids" },
  { name: "Posters", type: "Gallery Walls", image: "https://images.unsplash.com/photo-1580136608260-4eb11f4b24fe?q=80&w=800&auto=format&fit=crop", href: "/products/posters" },
];

const CategoryGrid = () => {
  return (
    <div className="section-spacing bg-white">
      <div className="container-premium">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-20 gap-4 md:gap-8">
          <div className="space-y-2 md:space-y-4">
            <span className="text-[10px] uppercase tracking-[0.6em] font-bold text-neutral-400">Our Collections</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-outfit font-bold tracking-tighter">Choose Your Aesthetic</h2>
          </div>
          <Link href="/products" className="text-[10px] uppercase tracking-[0.4em] font-bold border-b border-black pb-2 hover:text-neutral-500 hover:border-neutral-500 transition-all shrink-0">
            View All Categories
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {categories.map((cat, idx) => (
            <Link 
              href={cat.href} 
              key={idx} 
              className={`group relative overflow-hidden h-[260px] sm:h-[300px] md:h-[400px] ${idx === 0 || idx === 3 ? 'lg:col-span-2' : ''}`}
            >
              <div className="absolute inset-0 z-10 bg-black/20 group-hover:bg-black/40 transition-colors duration-700" />
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" 
              />
              
              <div className="absolute inset-x-5 md:inset-x-10 bottom-5 md:bottom-10 z-20 flex justify-between items-end">
                <div className="space-y-1 md:space-y-2">
                   <p className="text-[9px] md:text-[10px] uppercase tracking-[0.6em] font-bold text-white/70">{cat.type}</p>
                   <h3 className="text-2xl md:text-4xl font-outfit font-bold text-white tracking-tighter">{cat.name}</h3>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/30 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all duration-500">
                  <span className="text-xl md:text-2xl">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryGrid;
