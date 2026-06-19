"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Search, User, Menu, X, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) setUser(JSON.parse(userInfo));

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: "Home", href: "/", emoji: "🏠" },
    { name: "Frames", href: "/products/frames", emoji: "🖼️" },
    { name: "Albums", href: "/products/albums", emoji: "📔" },
    { name: "Mugs", href: "/products/mugs", emoji: "☕" },
    { name: "Polaroids", href: "/products/polaroids", emoji: "📷" },
    { name: "Posters", href: "/products/posters", emoji: "🎨" },
  ];

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
  };

  const linkVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
          isScrolled ? "bg-white/90 backdrop-blur-xl py-3 shadow-sm" : "bg-transparent py-6 md:py-8"
        }`}
      >
        <div className="container-premium flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-xl md:text-2xl font-outfit font-bold tracking-tighter text-black">
            PAPERBOAT<span className="font-light">GIFTS</span>
          </Link>

          {/* Desktop Center Links */}
          <nav className="hidden lg:flex items-center space-x-12">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-[11px] uppercase tracking-[0.3em] font-medium transition-colors ${
                  pathname === link.href ? "text-indigo-600" : "hover:text-neutral-500"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-4 md:space-x-8">
            <button className="hover:scale-110 transition-transform hidden sm:block">
              <Search size={18} strokeWidth={1.5} />
            </button>
            <Link href="/login" className="hover:scale-110 transition-transform">
              <User size={18} strokeWidth={1.5} />
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden flex items-center justify-center w-9 h-9 rounded-full bg-black text-white hover:bg-neutral-800 transition-colors"
              aria-label="Open menu"
            >
              <Menu size={18} strokeWidth={2} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[99]"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Slide-in Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed top-0 right-0 h-full w-[80vw] max-w-xs bg-[#0B0B0B] z-[100] flex flex-col overflow-hidden"
            >
              {/* Top Bar */}
              <div className="flex justify-between items-center px-6 py-5 border-b border-white/10">
                <span className="text-white font-outfit font-bold tracking-tighter text-lg">
                  PAPERBOAT<span className="font-light">GIFTS</span>
                </span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                >
                  <X size={16} strokeWidth={1.5} />
                </button>
              </div>

              {/* Nav Links */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col px-6 pt-8 gap-1 flex-grow"
              >
                {navLinks.map((link) => (
                  <motion.div key={link.name} variants={linkVariants}>
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 group ${
                        pathname === link.href
                          ? "bg-white/10 text-white"
                          : "text-neutral-400 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <span className="text-lg">{link.emoji}</span>
                      <span className="text-sm font-outfit font-semibold uppercase tracking-[0.2em]">
                        {link.name}
                      </span>
                      {pathname === link.href && (
                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400" />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              {/* Bottom WhatsApp CTA */}
              <div className="px-6 pb-8 pt-4 border-t border-white/10 mt-4">
                <p className="text-[9px] uppercase tracking-[0.4em] text-neutral-600 mb-3 font-bold">
                  Order via
                </p>
                <a
                  href="https://wa.me/919999999999?text=Hello%2C%20I%20would%20like%20to%20place%20an%20order!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white font-outfit font-bold text-[11px] uppercase tracking-[0.2em] py-3.5 rounded-xl shadow-[0_4px_20px_rgba(37,211,102,0.3)] hover:bg-[#20ba5a] hover:shadow-[0_6px_28px_rgba(37,211,102,0.4)] transition-all duration-300"
                >
                  <MessageCircle size={15} className="fill-white stroke-none" />
                  WhatsApp
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
