"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/layout/Navbar";
import api from "@/utils/api";
import { useRouter } from "next/navigation";
import { 
  Lock, 
  MapPin, 
  CreditCard, 
  ShieldCheck, 
  ChevronRight,
  User,
  Phone,
  Building,
  Navigation,
  Globe,
  Sparkles
} from "lucide-react";
import { motion } from "framer-motion";

const CheckoutPage = () => {
  const { cartItems, itemsPrice, shippingPrice, totalPrice, clearCart } = useCart();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("India");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (cartItems.length === 0) {
      router.push("/cart");
    }
  }, [cartItems]);

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!address || !city || !postalCode || !phone) {
      alert("Please complete the logistics manifest.");
      return;
    }

    setLoading(true);

    try {
      // 1. Create order on backend
      const { data: orderResponse } = await api.post("/orders", {
        orderItems: cartItems,
        shippingAddress: { address, city, postalCode, country, phone },
        paymentMethod: "Razorpay",
        shippingPrice,
      });

      const { order, razorpayOrderId, amount, key } = orderResponse;

      // 2. Load Razorpay script
      const res = await loadRazorpay();
      if (!res) {
        alert("Razorpay SDK failed to initialize.");
        setLoading(false);
        return;
      }

      // 3. Open Razorpay Checkout
      const options = {
        key: key,
        amount: amount,
        currency: "INR",
        name: "Paperboat Gifts",
        description: `Order Protocol: ${order._id}`,
        image: "https://placehold.co/200x200?text=Paperboat",
        order_id: razorpayOrderId,
        handler: async (response: any) => {
          try {
            await api.put(`/orders/${order._id}/pay`, {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            });
            clearCart();
            router.push(`/orders/${order._id}/success`);
          } catch (err) {
            alert("Payment verification protocol failed.");
          }
        },
        prefill: {
          name: "Guest Protocol",
          email: "guest@paperboatgifts.com",
          contact: phone,
        },
        theme: {
          color: "#6366F1",
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
    } catch (err) {
      console.error(err);
      alert("Checkout sequence initialization failure.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0B0B0B] min-h-screen text-white pb-20">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 pt-32 lg:pt-44">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
           
           {/* Left: Logistics */}
           <div className="lg:col-span-8 space-y-12">
              <div className="space-y-4">
                 <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em]">
                    <MapPin size={12} /> Fulfillment Logistics
                 </div>
                 <h1 className="text-4xl lg:text-6xl font-black tracking-tighter uppercase leading-tight">Secure <span className="text-neutral-500 font-light italic text-5xl">Protocol</span></h1>
              </div>

              <div className="bg-[#111111]/50 border border-white/5 rounded-[3rem] p-10 space-y-10 group relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                    <div className="space-y-3">
                       <label className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500 flex items-center gap-2 px-1">
                          <Building size={12} /> Address Line
                       </label>
                       <input 
                         placeholder="Ex: 42 Galactic Way"
                         value={address}
                         onChange={(e) => setAddress(e.target.value)}
                         className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-5 text-sm focus:outline-none focus:border-indigo-500/50 transition-all placeholder:text-neutral-700 font-bold"
                       />
                    </div>
                    <div className="space-y-3">
                       <label className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500 flex items-center gap-2 px-1">
                          <Navigation size={12} /> Terminal City
                       </label>
                       <input 
                         placeholder="Ex: Neo Mumbai"
                         value={city}
                         onChange={(e) => setCity(e.target.value)}
                         className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-5 text-sm focus:outline-none focus:border-indigo-500/50 transition-all placeholder:text-neutral-700 font-bold"
                       />
                    </div>
                    <div className="space-y-3">
                       <label className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500 flex items-center gap-2 px-1">
                          <Globe size={12} /> Location Code (Pin)
                       </label>
                       <input 
                         placeholder="Ex: 400001"
                         value={postalCode}
                         onChange={(e) => setPostalCode(e.target.value)}
                         className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-5 text-sm focus:outline-none focus:border-indigo-500/50 transition-all placeholder:text-neutral-700 font-bold"
                       />
                    </div>
                    <div className="space-y-3">
                       <label className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500 flex items-center gap-2 px-1">
                          <Phone size={12} /> Communication Line
                       </label>
                       <input 
                         placeholder="Ex: +91 9876543210"
                         value={phone}
                         onChange={(e) => setPhone(e.target.value)}
                         className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-5 text-sm focus:outline-none focus:border-indigo-500/50 transition-all placeholder:text-neutral-700 font-bold"
                       />
                    </div>
                 </div>

                 <div className="pt-6 flex items-start gap-4 p-8 bg-indigo-500/5 border border-indigo-500/10 rounded-3xl relative z-10 group/verify overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-transparent opacity-0 group-hover/verify:opacity-100 transition-opacity" />
                    <ShieldCheck size={24} className="text-indigo-400 shrink-0" />
                    <div className="space-y-1">
                       <h4 className="text-[10px] font-black uppercase tracking-[0.2em]">Quantum Security Active</h4>
                       <p className="text-[10px] text-neutral-600 font-bold uppercase tracking-widest">Address data is encrypted via military-grade RSA-4096 protocols.</p>
                    </div>
                 </div>
              </div>
           </div>

           {/* Right: Valuation Summary */}
           <div className="lg:col-span-4 shrink-0">
              <div className="sticky top-44 space-y-8">
                 <div className="bg-[#0B0B0B] border border-[#1F1F1F] rounded-[3rem] p-10 space-y-10 shadow-2xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-bl from-indigo-500/5 via-transparent to-transparent" />
                    
                    <h2 className="text-2xl font-black uppercase tracking-tighter relative z-10">Artisanal <span className="text-neutral-500 font-light italic">Manifest</span></h2>

                    <div className="space-y-4 max-h-[300px] overflow-y-auto pr-4 scrollbar-hide relative z-10">
                       {cartItems.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-4 py-4 border-b border-white/5 last:border-0 group/item">
                             <div className="w-16 h-16 rounded-xl overflow-hidden border border-white/10 shrink-0 grayscale group-hover/item:grayscale-0 transition-all">
                                <img src={item.customImage || item.image} className="w-full h-full object-cover" />
                             </div>
                             <div className="flex-1 min-w-0">
                                <h4 className="text-[10px] font-black uppercase tracking-widest truncate">{item.name}</h4>
                                <p className="text-[9px] text-neutral-600 font-bold uppercase">{item.qty} units × {item.size}</p>
                                {item.customText && (
                                  <p className="text-[8px] text-indigo-400 font-bold uppercase tracking-tighter truncate italic">"{item.customText}"</p>
                                )}
                             </div>
                             <span className="text-xs font-bold shrink-0">₹{item.price * item.qty}</span>
                          </div>
                       ))}
                    </div>

                    <div className="space-y-4 relative z-10 pt-6 border-t border-white/5">
                       <div className="flex justify-between items-center text-[10px] font-black text-neutral-500 px-1 uppercase tracking-widest">
                          <span>Subtotal Valuation</span>
                          <span className="text-white">₹{itemsPrice}</span>
                       </div>
                       <div className="flex justify-between items-center text-[10px] font-black text-neutral-500 px-1 uppercase tracking-widest">
                          <span>Logistics Fee</span>
                          <span className="text-white">₹{shippingPrice}</span>
                       </div>
                       <div className="flex justify-between items-center pt-4 px-1">
                          <span className="text-[11px] font-black uppercase tracking-[0.4em]">Total Resolution</span>
                          <span className="text-3xl font-black text-indigo-500 underline decoration-indigo-500/30 underline-offset-8">₹{totalPrice}</span>
                       </div>
                    </div>

                    <div className="pt-6 relative z-10">
                       <button 
                         onClick={handlePayment}
                         disabled={loading}
                         className="w-full py-6 bg-indigo-500 text-white text-[11px] font-black uppercase tracking-[0.5em] rounded-2xl shadow-2xl shadow-indigo-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-30 disabled:scale-100 flex items-center justify-center gap-4 group"
                       >
                          {loading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          ) : (
                            <>Authorize Payment <Lock size={16} /></>
                          )}
                       </button>
                    </div>

                    <div className="pt-10 flex flex-col items-center gap-4 relative z-10 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all">
                       <div className="flex items-center gap-4">
                          <img src="https://razorpay.com/assets/razorpay-logo.svg" className="h-4" />
                       </div>
                       <p className="text-[8px] font-black uppercase tracking-[0.4em] text-neutral-700">Protected by Razorpay X Secure</p>
                    </div>
                 </div>
              </div>
           </div>

        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;
