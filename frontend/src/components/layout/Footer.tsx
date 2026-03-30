"use client";

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-32 mt-auto">
      <div className="container-premium">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-20">
          <div className="space-y-8 md:col-span-1">
            <Link href="/" className="text-3xl font-outfit font-bold tracking-tighter">
              PAPERBOAT<span className="font-light">GIFTS</span>
            </Link>
            <p className="text-sm text-neutral-400 max-w-xs leading-relaxed">
              Curating high-end bespoke gifts for those who value timeless quality and elegant aesthetics.
            </p>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-neutral-500">Shop</h4>
            <ul className="space-y-4 text-sm text-neutral-300">
              <li><Link href="/products/frames" className="hover:text-white transition-colors">Frames Collection</Link></li>
              <li><Link href="/products/albums" className="hover:text-white transition-colors">Memory Albums</Link></li>
              <li><Link href="/products/mugs" className="hover:text-white transition-colors">Bespoke Mugs</Link></li>
              <li><Link href="/products/polaroids" className="hover:text-white transition-colors">Polaroid Prints</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-neutral-500">Company</h4>
            <ul className="space-y-4 text-sm text-neutral-300">
              <li><Link href="/" className="hover:text-white transition-colors">Our Story</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Sustainability</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-neutral-500">Connect</h4>
            <ul className="space-y-4 text-sm text-neutral-300">
              <li><Link href="/" className="hover:text-white transition-colors">Instagram</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Pinterest</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-32 pt-10 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center gap-8 text-[11px] uppercase tracking-[0.3em] text-neutral-600">
          <p>© 2026 Paperboat Gifts. All Rights Reserved.</p>
          <div className="flex space-x-8">
            <span className="cursor-pointer hover:text-white">India</span>
            <span className="cursor-pointer hover:text-white">English</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
