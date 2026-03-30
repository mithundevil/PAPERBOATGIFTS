"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Laptop, ShieldCheck, Truck } from "lucide-react";

const TrustBadges = () => {
  const badges = [
    { icon: <Truck size={32} />, title: "Pan India Shipping", desc: "Reliable delivery across the country" },
    { icon: <ShieldCheck size={32} />, title: "Secure Payment", desc: "100% safe & encrypted payments" },
    { icon: <Laptop size={32} />, title: "Fast Checkout", desc: "Easy and quick ordering process" },
  ];

  return (
    <section className="py-20 bg-neutral-50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {badges.map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="flex flex-col items-center text-center space-y-4"
            >
              <div className="text-black mb-2">{badge.icon}</div>
              <h3 className="text-lg font-outfit font-bold uppercase tracking-widest">{badge.title}</h3>
              <p className="text-neutral-500 max-w-xs">{badge.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
