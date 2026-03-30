"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/utils/api";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/register";
      const payload = isLogin ? { email, password } : { name, email, phone, password };
      
      const { data } = await api.post(endpoint, payload);
      
      localStorage.setItem("userInfo", JSON.stringify(data));
      
      if (data.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 flex items-center justify-center bg-neutral-50 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10 border border-neutral-100"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl font-outfit font-bold mb-2">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-neutral-400 text-sm">
            {isLogin ? "Enter your details to access your luxury account" : "Join the world of premium gifting"}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 text-xs p-4 rounded-xl mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <>
              <div>
                <label className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 mb-2 block">Full Name</label>
                <input
                  type="text"
                  required
                  className="w-full border-b border-neutral-200 py-3 focus:outline-none focus:border-black transition-colors"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 mb-2 block">Phone Number</label>
                <input
                  type="tel"
                  required
                  className="w-full border-b border-neutral-200 py-3 focus:outline-none focus:border-black transition-colors"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </>
          )}

          <div>
            <label className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 mb-2 block">Email Address</label>
            <input
              type="email"
              required
              className="w-full border-b border-neutral-200 py-3 focus:outline-none focus:border-black transition-colors"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 mb-2 block">Password</label>
            <input
              type="password"
              required
              className="w-full border-b border-neutral-200 py-3 focus:outline-none focus:border-black transition-colors"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-premium w-full mt-4 flex items-center justify-center"
          >
            {loading ? "Processing..." : isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <div className="mt-8 text-center text-sm">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-neutral-400 hover:text-black transition-colors"
          >
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
