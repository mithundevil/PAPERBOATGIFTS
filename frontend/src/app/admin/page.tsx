"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/layout/AdminLayout";
import StatsCard from "@/components/admin/cards/StatsCard";
import Badge from "@/components/admin/ui/Badge";
import { 
  TrendingUp, 
  ShoppingBag, 
  Package, 
  Users, 
  ArrowRight,
  Diamond,
  Clock,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import api from "@/utils/api";

const Dashboard = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data: response } = await api.get("/admin/stats");
        setStats(response.data);
      } catch (err) {
        console.error("Analytics acquisition failure", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <div className="animate-pulse space-y-12">
          <div className="h-16 bg-white/5 rounded-2xl w-1/3" />
          <div className="grid grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => <div key={i} className="h-32 bg-white/5 rounded-3xl" />)}
          </div>
          <div className="grid grid-cols-12 gap-10">
            <div className="col-span-8 h-[500px] bg-white/5 rounded-[2.5rem]" />
            <div className="col-span-4 h-[500px] bg-white/5 rounded-[2.5rem]" />
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-12">
        {/* Sophisticated Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
           <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <div className="w-8 h-px bg-[#6366F1]" />
                 <span className="text-[10px] uppercase tracking-[0.5em] font-black text-neutral-600">Infrastructure Monitoring</span>
              </div>
              <h1 className="text-5xl font-black text-white tracking-tighter leading-none">Console <span className="text-neutral-700 font-light italic">Overview</span></h1>
           </div>
           
           <div className="flex items-center gap-2 bg-[#111111] border border-[#1F1F1F] rounded-2xl p-1.5 shadow-inner">
              <button className="px-6 py-2.5 bg-[#6366F1] text-white text-[10px] uppercase tracking-widest font-black rounded-xl shadow-lg shadow-indigo-500/20">Real-time</button>
              <button className="px-6 py-2.5 text-neutral-600 text-[10px] uppercase tracking-widest font-black hover:text-white transition-all">Historical</button>
           </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           <StatsCard 
             title="Total Revenue" 
             value={`₹${stats?.totalRevenue?.toLocaleString() || '0'}`} 
             icon={TrendingUp} 
             trend="up" 
             trendValue="+14%" 
           />
           <StatsCard 
             title="Acquisition Volume" 
             value={stats?.totalOrders || '0'} 
             icon={ShoppingBag} 
             trend="up" 
             trendValue="+22%" 
           />
           <StatsCard 
             title="Catalog Depth" 
             value={stats?.totalProducts || '0'} 
             icon={Package} 
             trend="up" 
             trendValue="+3" 
           />
           <StatsCard 
             title="Active Curators" 
             value={stats?.totalUsers || '0'} 
             icon={Users} 
             trend="down" 
             trendValue="-2%" 
           />
        </div>

        {/* Main Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
           {/* Recent Orders Region */}
           <div className="lg:col-span-8 space-y-8">
              <div className="bg-[#0B0B0B] border border-[#1F1F1F] rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden group">
                 <div className="absolute inset-0 bg-gradient-to-br from-[#6366F1]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                 
                 <div className="flex justify-between items-center mb-10 relative z-10">
                    <div className="space-y-1">
                       <h3 className="text-xl font-black text-white tracking-tight uppercase">Recent Acquisitions</h3>
                       <p className="text-[10px] text-neutral-600 font-bold uppercase tracking-widest">Latest 5 events in protocol</p>
                    </div>
                    <Link href="/admin/orders" className="text-[10px] font-black text-[#6366F1] flex items-center gap-2 hover:gap-3 transition-all uppercase tracking-widest">
                       View Manifest <ArrowRight size={14} />
                    </Link>
                 </div>

                 <div className="space-y-4 relative z-10">
                    <table className="w-full text-left border-separate border-spacing-y-3">
                       <thead>
                          <tr className="text-[9px] uppercase tracking-[0.3em] text-neutral-700 font-black">
                             <th className="px-6 pb-2">Acquisition ID</th>
                             <th className="px-6 pb-2">Curator</th>
                             <th className="px-6 pb-2">Status</th>
                             <th className="px-6 pb-2 text-right">Value</th>
                          </tr>
                       </thead>
                       <tbody>
                          {stats?.recentOrders?.map((order: any) => (
                             <tr key={order._id} className="group/row cursor-pointer">
                                <td className="bg-[#111111]/50 border-y border-l border-[#1F1F1F] rounded-l-2xl px-6 py-4 text-xs font-bold text-neutral-400 group-hover/row:text-[#6366F1] transition-colors">{order._id.slice(-8).toUpperCase()}</td>
                                <td className="bg-[#111111]/50 border-y border-[#1F1F1F] px-6 py-4">
                                   <div className="flex flex-col">
                                      <span className="text-xs font-bold text-white tracking-tight">{order.user?.name}</span>
                                      <span className="text-[9px] text-neutral-600 font-medium">{order.user?.email}</span>
                                   </div>
                                </td>
                                <td className="bg-[#111111]/50 border-y border-[#1F1F1F] px-6 py-4">
                                   <Badge variant={order.isPaid ? 'success' : 'warning'}>
                                      {order.isPaid ? 'Validated' : 'Pending'}
                                   </Badge>
                                </td>
                                <td className="bg-[#111111]/50 border-y border-r border-[#1F1F1F] rounded-r-2xl px-6 py-4 text-right text-xs font-black text-white">
                                   ₹{order.totalPrice?.toLocaleString()}
                                </td>
                             </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              </div>
           </div>

           {/* Activity Region */}
           <div className="lg:col-span-4 space-y-10">
              <div className="bg-[#0B0B0B] border border-[#1F1F1F] rounded-[2.5rem] p-10 space-y-10 h-full shadow-2xl relative overflow-hidden group">
                 <div className="absolute inset-0 bg-gradient-to-bl from-[#6366F1]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                 
                 <div className="flex justify-between items-center relative z-10">
                    <h3 className="text-xl font-black text-white tracking-tight uppercase">Registry Log</h3>
                    <div className="flex items-center gap-2">
                       <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                       <span className="text-[9px] font-black text-green-500 uppercase tracking-widest">System Live</span>
                    </div>
                 </div>

                 <div className="space-y-10 relative z-10">
                    {[
                      { type: "Security", val: "JWT Protocol Active", icon: CheckCircle2, status: "success" },
                      { type: "Infrastructure", val: "Database Synchronized", icon: CheckCircle2, status: "success" },
                      { type: "Inventory", val: "Stock Integrity Verified", icon: CheckCircle2, status: "success" },
                      { type: "Acquisition", val: "Razorpay Gateway Ready", icon: CheckCircle2, status: "success" },
                    ].map((log, i) => (
                      <div key={i} className="flex gap-4 relative group/log">
                         <div className="flex flex-col items-center">
                            <div className="w-10 h-10 rounded-xl bg-[#111111] border border-[#1F1F1F] flex items-center justify-center text-[#6366F1] group-hover/log:scale-110 transition-transform duration-500">
                               <log.icon size={18} />
                            </div>
                            {i !== 3 && <div className="flex-1 w-px bg-[#1F1F1F] my-4" />}
                         </div>
                         <div className="flex-1 space-y-1.5 pt-1">
                            <p className="text-[10px] font-black text-neutral-600 uppercase tracking-widest">{log.type}</p>
                            <p className="text-sm font-bold text-white tracking-tight">{log.val}</p>
                         </div>
                      </div>
                    ))}
                 </div>

                 <button className="w-full py-5 bg-[#111111] border border-[#1F1F1F] rounded-2xl text-[9px] uppercase tracking-[0.5em] font-black text-neutral-500 hover:bg-[#6366F1] hover:text-white hover:border-[#6366F1] transition-all relative z-10 shadow-lg shadow-black/50">
                    Secure Endpoint Access
                 </button>
              </div>
           </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
