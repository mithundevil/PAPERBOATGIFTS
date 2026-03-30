"use client";

import { motion } from "framer-motion";

interface SkeletonProps {
  className?: string;
  count?: number;
}

export const Skeleton = ({ className, count = 1 }: SkeletonProps) => {
  return (
    <>
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className={`bg-neutral-100 rounded-2xl ${className}`}
        />
      ))}
    </>
  );
};

export const ProductCardSkeleton = () => (
  <div className="space-y-6 p-8 bg-neutral-50 rounded-2xl border border-neutral-100/50">
    <Skeleton className="aspect-[4/5] w-full bg-white rounded-xl" />
    <div className="space-y-2 flex flex-col items-center">
       <Skeleton className="h-2 w-20" />
       <Skeleton className="h-6 w-40" />
       <Skeleton className="h-3 w-56" />
    </div>
    <div className="flex items-center justify-center gap-4">
       <Skeleton className="h-4 w-24" />
       <Skeleton className="h-4 w-12" />
    </div>
  </div>
);

export const ProductDetailsSkeleton = () => (
  <div className="container-premium grid grid-cols-1 lg:grid-cols-2 gap-20 py-32">
    <div className="space-y-8">
       <Skeleton className="aspect-[4/5] w-full rounded-3xl" />
       <div className="grid grid-cols-3 gap-6">
          <Skeleton className="aspect-square rounded-2xl" count={3} />
       </div>
    </div>
    <div className="space-y-12">
       <div className="space-y-4">
          <Skeleton className="h-2 w-24" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-10 w-40" />
       </div>
       <div className="space-y-8">
          <Skeleton className="h-20 w-full rounded-full" />
          <Skeleton className="h-12 w-32 rounded-full" />
       </div>
       <div className="space-y-4">
          <Skeleton className="h-14 w-full rounded-full" />
          <Skeleton className="h-14 w-full rounded-full" />
       </div>
    </div>
  </div>
);
