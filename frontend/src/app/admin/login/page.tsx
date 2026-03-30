"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import api from "@/utils/api";
import { Ship, Lock, Mail, ArrowRight } from "lucide-react";
import { Input } from "@/components/admin/ui/Inputs";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data: response } = await api.post("/auth/login", { email, password });
      const data = response.data;
      
      localStorage.setItem("userInfo", JSON.stringify(data));
      
      if (data.role === "admin") {
        router.push("/admin");
      } else {
        setError("Unauthorized: These coordinates are restricted to Command Staff.");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Authentication transmission failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#6366F1/0.1,transparent_50%)]" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full relative z-10"
      >
        <div className="bg-[#0B0B0B] border border-[#1F1F1F] rounded-[3rem] p-12 shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-[#6366F1]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          
          <div className="text-center mb-12 relative z-10">
            <div className="w-16 h-16 bg-[#111111] border border-[#1F1F1F] rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-inner text-[#6366F1]">
              <Ship size={28} />
            </div>
            <h1 className="text-2xl font-black text-white uppercase tracking-tighter mb-2 italic">Paperboat <span className="text-[#6366F1] not-italic uppercase tracking-widest">Overseer</span></h1>
            <p className="text-[9px] uppercase font-black tracking-[0.4em] text-neutral-700">Protocol Entry v4.6</p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-rose-500/10 border border-rose-500/20 text-rose-500 text-[9px] font-black uppercase tracking-widest p-4 rounded-xl mb-8 text-center"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-6 relative z-10">
            <div className="space-y-4">
              <Input 
                label="Command Email"
                type="email"
                required
                placeholder="overseer@paperboat.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input 
                label="Access Cipher"
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-[#6366F1] text-white text-[10px] uppercase tracking-[0.4em] font-black rounded-xl shadow-2xl shadow-indigo-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-30 disabled:scale-100 flex items-center justify-center gap-4 group/btn"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Authorize Entry <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" /></>
              )}
            </button>
          </form>

          <p className="text-center mt-10 text-[8px] text-neutral-800 font-bold uppercase tracking-[0.4em]">Authorized Endpoint Only</p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
