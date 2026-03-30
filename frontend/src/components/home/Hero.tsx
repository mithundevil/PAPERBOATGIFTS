"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-white">
      {/* Background with slight grid or dots for luxury feel */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />

      <div className="container-premium relative z-20 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-6"
        >
          <span className="text-[10px] uppercase tracking-[0.6em] font-bold text-neutral-400">Memory Curated Excellence</span>
          <h1 className="text-6xl md:text-8xl font-outfit font-bold tracking-tighter leading-[1] max-w-4xl mx-auto">
            Turn Your Memories Into <span className="silver-text-gradient">Timeless Gifts</span>
          </h1>
          <p className="text-lg text-neutral-500 font-light max-w-2xl mx-auto tracking-tight leading-relaxed">
            Every moment holds a story worth telling. Discover our bespoke collection of handcrafted frames, albums, and personalized keepsakes.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10">
            <Link href="/products/frames" className="btn-luxury group flex items-center gap-4">
              <span>Shop Now</span>
              <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform duration-500" />
            </Link>
            <Link href="/" className="text-[10px] uppercase tracking-[0.4em] font-bold border-b border-black pb-2 hover:text-neutral-500 hover:border-neutral-500 transition-all">
              Explore Collection
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Floating Product Images - Abstract/Artistic Placement */}
      <motion.div 
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 -left-20 w-[500px] h-[500px] opacity-40 hidden xl:block"
      >
        <div className="w-full h-full bg-neutral-100 rounded-[5rem] rotate-12 overflow-hidden border border-neutral-200 p-1">
           <img src="/assets/images/hero.png" className="w-full h-full object-cover rounded-[4.5rem]" />
        </div>
      </motion.div>

      <motion.div 
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/4 -right-20 w-[600px] h-[600px] opacity-30 hidden xl:block"
      >
        <div className="w-full h-full bg-neutral-50 rounded-[4rem] -rotate-6 overflow-hidden border border-neutral-100 p-1">
           <img src="/assets/images/cat-frames.png" className="w-full h-full object-cover rounded-[3.5rem]" />
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
         <div className="w-[1px] h-12 bg-gradient-to-t from-black to-transparent" />
         <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Scroll</span>
      </div>
    </div>
  );
};

export default Hero;
