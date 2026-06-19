"use client";

import { motion, HTMLMotionProps } from "framer-motion";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "variant"> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

const Button = ({ 
  children, 
  variant = "primary", 
  size = "md", 
  loading, 
  className = "", 
  disabled,
  ...props 
}: ButtonProps) => {
  const baseStyles = "relative inline-flex items-center justify-center font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden";
  
  const variants = {
    primary: "bg-admin-accent text-white shadow-lg shadow-admin-accent/20 hover:bg-admin-accent/80 hover:shadow-admin-accent/40",
    secondary: "bg-transparent border border-admin-border text-neutral-400 hover:text-white hover:border-white/20 hover:bg-white/5",
    danger: "bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white",
    ghost: "bg-transparent text-neutral-500 hover:text-white hover:bg-white/5",
  };

  const sizes = {
    sm: "px-4 py-1.5 text-[10px] uppercase tracking-widest rounded-lg",
    md: "px-6 py-2.5 text-xs uppercase tracking-widest rounded-xl",
    lg: "px-8 py-4 text-sm uppercase tracking-[0.2em] rounded-2xl",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          <span>Processing...</span>
        </div>
      ) : children}
    </motion.button>
  );
};

export default Button;
