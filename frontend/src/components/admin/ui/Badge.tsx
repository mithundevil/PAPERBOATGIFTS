"use client";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "pending" | "success" | "danger" | "info" | "neutral" | "warning";
  className?: string;
}

const Badge = ({ children, variant = "neutral", className = "" }: BadgeProps) => {
  const variants = {
    pending: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    warning: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    success: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    danger: "text-rose-500 bg-rose-500/10 border-rose-500/20",
    info: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
    neutral: "text-neutral-500 bg-neutral-500/10 border-neutral-500/20",
  };

  return (
    <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border transition-all duration-500 ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
