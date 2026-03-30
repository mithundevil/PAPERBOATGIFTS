"use client";

import Hero from "@/components/home/Hero";
import CategoryGrid from "@/components/home/CategoryGrid";
import BestSellers from "@/components/home/BestSellers";
import Testimonials from "@/components/home/Testimonials";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-white">
      <Hero />
      
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <CategoryGrid />
      </motion.div>

      <BestSellers />

      <Testimonials />

      {/* Luxury Brand Statement */}
      <section className="section-spacing bg-black text-white">
        <div className="container-premium text-center space-y-12">
           <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 1.2 }}
             className="max-w-4xl mx-auto space-y-10"
           >
              <h2 className="text-4xl md:text-6xl font-outfit italic tracking-tighter">"A memory is a gift that can be opened again and again."</h2>
              <div className="w-20 h-px bg-neutral-600 mx-auto" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-10">
                 <div className="space-y-4">
                    <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-neutral-400">Pristine Quality</h4>
                    <p className="text-sm font-light leading-relaxed">Museum-grade materials and archival inks ensure your memories last generations.</p>
                 </div>
                 <div className="space-y-4 border-y md:border-y-0 md:border-x border-neutral-800 py-10 md:py-0">
                    <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-neutral-400">Handcrafted Soul</h4>
                    <p className="text-sm font-light leading-relaxed">Each piece is individually assembled by artisans with decades of experience.</p>
                 </div>
                 <div className="space-y-4">
                    <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-neutral-400">Global Elegance</h4>
                    <p className="text-sm font-light leading-relaxed">A modern aesthetic that complements the most sophisticated interiors.</p>
                 </div>
              </div>
           </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-spacing">
        <div className="container-premium text-center space-y-8">
           <h2 className="text-4xl font-outfit font-bold tracking-tighter">Ready to Create Your Own?</h2>
           <p className="text-neutral-500 font-light max-w-lg mx-auto">Embark on a journey of curation and personalization today.</p>
           <Link href="/products/frames" className="btn-luxury inline-block">
             Start Designing
           </Link>
        </div>
      </section>
    </main>
  );
}
