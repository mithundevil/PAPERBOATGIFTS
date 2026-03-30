"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const categories = [
  { name: "Frames", type: "Classic Bespoke", image: "/assets/images/cat-frames.png", href: "/products/frames" },
  { name: "Albums", type: "Timeless Stories", image: "/assets/images/cat-albums.png", href: "/products/albums" },
  { name: "Mugs", type: "Daily Rituals", image: "/assets/images/cat-mugs.png", href: "/products/mugs" },
  { name: "Polaroids", type: "Instant Memories", image: "/assets/images/cat-polaroids.png", href: "/products/polaroids" },
  { name: "Posters", type: "Gallery Walls", image: "/assets/images/cat-posters.png", href: "/products/posters" },
];

const CategoryGrid = () => {
  return (
    <div className="section-spacing bg-white">
      <div className="container-premium">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.6em] font-bold text-neutral-400">Our Collections</span>
            <h2 className="text-5xl font-outfit font-bold tracking-tighter">Choose Your Aesthetic</h2>
          </div>
          <Link href="/products" className="text-[10px] uppercase tracking-[0.4em] font-bold border-b border-black pb-2 hover:text-neutral-500 hover:border-neutral-500 transition-all">
            View All Categories
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, idx) => (
            <Link 
              href={cat.href} 
              key={idx} 
              className={`group relative overflow-hidden h-[600px] ${idx === 0 || idx === 3 ? 'lg:col-span-2' : ''}`}
            >
              <div className="absolute inset-0 z-10 bg-black/20 group-hover:bg-black/40 transition-colors duration-700" />
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" 
              />
              
              <div className="absolute inset-x-10 bottom-10 z-20 flex justify-between items-end">
                <div className="space-y-2">
                   <p className="text-[10px] uppercase tracking-[0.6em] font-bold text-white/70">{cat.type}</p>
                   <h3 className="text-4xl font-outfit font-bold text-white tracking-tighter">{cat.name}</h3>
                </div>
                <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all duration-500">
                  <span className="text-2xl">→</span>
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
