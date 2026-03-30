"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  { name: "Ananya Sharma", text: "The Spotify frame was absolutely beautiful! My partner loved it. Great quality and fast delivery.", rating: 5 },
  { name: "Rahul Verma", text: "Ordered a magic mug for my parents. The transition is so smooth. Very impressed with the service.", rating: 5 },
  { name: "Priya Das", text: "Handcrafted album was exactly how I imagined. Paper quality is top-notch. Highly recommend!", rating: 4 },
];

const Reviews = () => {
  return (
    <section className="py-32">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-sm uppercase tracking-[0.3em] text-neutral-400 mb-4 block">Testimonials</span>
          <h2 className="text-5xl font-outfit font-bold">Customer Stories</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="p-10 border border-neutral-100 rounded-3xl bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex space-x-1 mb-6 text-black">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="text-neutral-600 italic mb-8 line-clamp-4">"{review.text}"</p>
              <h4 className="font-outfit font-bold uppercase tracking-widest text-sm">- {review.name}</h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
