"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Search, ShoppingBag, User, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import Cart from "@/components/cart/Cart";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const { cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    // Safely check for user info after mount
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) setUser(JSON.parse(userInfo));

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Frames", href: "/products/frames" },
    { name: "Albums", href: "/products/albums" },
    { name: "Mugs", href: "/products/mugs" },
    { name: "Polaroids", href: "/products/polaroids" },
    { name: "Posters", href: "/products/posters" },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
          isScrolled ? "bg-white/80 backdrop-blur-xl py-4 shadow-sm" : "bg-transparent py-8"
        }`}
      >
        <div className="container-premium flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-outfit font-bold tracking-tighter mix-blend-difference text-black">
            PAPERBOAT<span className="font-light">GIFTS</span>
          </Link>

          {/* Center Links */}
          <nav className="hidden lg:flex items-center space-x-12">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-[11px] uppercase tracking-[0.3em] font-medium hover:text-neutral-500 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-8">
             <button className="hover:scale-110 transition-transform hidden sm:block">
                <Search size={20} strokeWidth={1.5} />
             </button>
             {user ? (
               <Link href="/orders" className="hover:scale-110 transition-transform flex items-center gap-2 group">
                  <User size={20} strokeWidth={1.5} className="group-hover:text-neutral-500 transition-colors" />
                  <span className="text-[9px] uppercase font-bold tracking-widest hidden md:block">Orders</span>
               </Link>
             ) : (
               <Link href="/login" className="hover:scale-110 transition-transform">
                  <User size={20} strokeWidth={1.5} />
               </Link>
             )}
             <button 
               onClick={() => setIsCartOpen(true)}
               className="relative hover:scale-110 transition-transform"
             >
                <ShoppingBag size={20} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
             </button>
             <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2">
                <Menu size={24} strokeWidth={1.5} />
             </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 bg-white z-[100] flex flex-col p-10"
          >
            <div className="flex justify-between items-center mb-20">
              <span className="text-xl font-bold tracking-tighter">PAPERBOAT</span>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X size={32} strokeWidth={1} />
              </button>
            </div>
            <div className="flex flex-col space-y-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-4xl font-outfit uppercase tracking-tighter hover:pl-4 transition-all"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;
