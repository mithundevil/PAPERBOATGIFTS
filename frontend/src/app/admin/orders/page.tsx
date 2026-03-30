"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/layout/AdminLayout";
import api from "@/utils/api";
import Button from "@/components/admin/ui/Button";
import Badge from "@/components/admin/ui/Badge";
import { 
  ShoppingBag, 
  Search, 
  Eye, 
  Clock, 
  CheckCircle, 
  Truck, 
  ArrowRight,
  MoreVertical,
  Filter,
  Download,
  AlertCircle
} from "lucide-react";
import { motion } from "framer-motion";
import OrderModal from "@/components/admin/ui/OrderModal";

const AdminOrders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchOrders = async () => {
    try {
      const { data: response } = await api.get("/orders");
      setOrders(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      if (status === "Delivered") {
        await api.put(`/orders/${id}/deliver`);
      }
      fetchOrders();
    } catch (err) {
      alert("Fulfillment protocol synchronization error.");
    }
  };

  const statusBadge = (isPaid: boolean, isDelivered: boolean) => {
    if (isDelivered) return <Badge variant="success">Fulfilled</Badge>;
    if (isPaid) return <Badge variant="info">Paid / Pending</Badge>;
    return <Badge variant="pending">Awaiting Sync</Badge>;
  };

  return (
    <AdminLayout>
      <div className="space-y-12">
        {/* Cinematic Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
           <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <div className="w-8 h-px bg-admin-accent" />
                 <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-neutral-500">Sales Intelligence</span>
              </div>
              <h1 className="text-5xl font-bold text-white tracking-tighter leading-none">Acquisition <span className="text-neutral-500 font-light italic">Registry</span></h1>
           </div>
           
           <div className="flex items-center gap-4">
              <div className="admin-card px-8 py-4 flex items-center gap-6 border-none bg-admin-sidebar shadow-2xl">
                 <div className="text-right">
                    <p className="text-[9px] uppercase font-bold text-neutral-600 tracking-[0.2em] mb-1">Total Liquidity Flow</p>
                    <p className="text-2xl font-bold text-white tracking-tighter">₹{orders.reduce((acc, o) => acc + o.totalPrice, 0).toLocaleString()}</p>
                 </div>
                 <div className="w-12 h-12 rounded-2xl bg-admin-accent/20 flex items-center justify-center text-admin-accent shadow-glow">
                    <TrendingUp size={24} />
                 </div>
              </div>
           </div>
        </div>

        {/* Sophisticated Table Container */}
        <div className="admin-card overflow-hidden">
           {/* Table Filters */}
           <div className="p-8 border-b border-white/5 flex flex-col lg:flex-row justify-between items-center gap-6 bg-white/[0.02]">
              <div className="relative w-full lg:w-[500px]">
                 <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-600 group-focus-within:text-admin-accent transition-colors" size={18} />
                 <input 
                   type="text" 
                   placeholder="Universal search by Acquisition ID or Curator Identity..." 
                   className="w-full bg-admin-sidebar border border-white/5 rounded-2xl pl-14 pr-6 py-4 text-xs text-white placeholder:text-neutral-700 focus:outline-none focus:ring-1 focus:ring-admin-accent/50 focus:bg-admin-bg transition-all"
                 />
              </div>
              <div className="flex items-center gap-4">
                 <button className="flex items-center gap-2 px-6 py-3 bg-white/5 text-neutral-400 text-[10px] uppercase tracking-widest font-bold rounded-xl hover:text-white hover:bg-white/10 transition-all border border-white/5">
                    <Filter size={14} /> Protocol Filter
                 </button>
                 <button className="flex items-center gap-2 px-6 py-3 bg-white/5 text-neutral-400 text-[10px] uppercase tracking-widest font-bold rounded-xl hover:text-white hover:bg-white/10 transition-all border border-white/5">
                    <Download size={14} /> Export Registry
                 </button>
              </div>
           </div>

           {/* High-Contrast Table */}
           <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className="bg-admin-bg text-[10px] uppercase tracking-[0.4em] font-bold text-neutral-600 border-b border-white/5">
                       <th className="px-10 py-6">Trace Identity</th>
                       <th className="px-10 py-6">Curator Profile</th>
                       <th className="px-10 py-6 text-center">Fulfillment Status</th>
                       <th className="px-10 py-6">Valuation Transfer</th>
                       <th className="px-10 py-6 text-right">Operations</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-white/5">
                    {loading ? (
                       [1,2,3,4,5].map(i => <tr key={i}><td colSpan={5} className="px-10 py-12 bg-white/[0.01] animate-pulse opacity-10" /></tr>)
                    ) : orders.map((order) => (
                      <motion.tr 
                        key={order._id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="hover:bg-white/[0.03] transition-all group duration-500"
                      >
                         <td className="px-10 py-8">
                            <div className="flex items-center gap-4">
                               <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-neutral-500 group-hover:text-admin-accent transition-all duration-500 border border-white/5 group-hover:border-admin-accent/50 group-hover:shadow-glow">
                                  <ShoppingBag size={18} />
                               </div>
                               <div className="space-y-1">
                                  <span className="text-sm font-bold text-white tracking-tighter">#{order._id.slice(-8).toUpperCase()}</span>
                                  <p className="text-[9px] text-neutral-600 font-medium tracking-widest">{new Date(order.createdAt).toLocaleDateString()}</p>
                               </div>
                            </div>
                         </td>
                         <td className="px-10 py-8">
                            <div className="space-y-1">
                               <p className="text-sm font-bold text-white uppercase group-hover:text-admin-accent transition-colors">{order.user?.name || "Premium Client"}</p>
                               <p className="text-[10px] text-neutral-600 tracking-widest font-mono truncate max-w-[150px]">{order.user?.email || "anonymous@secure.net"}</p>
                            </div>
                         </td>
                         <td className="px-10 py-8 text-center uppercase">
                            {statusBadge(order.isPaid, order.isDelivered)}
                         </td>
                         <td className="px-10 py-8">
                            <div className="space-y-1">
                               <span className="text-xl font-bold text-white tracking-tighter">₹{order.totalPrice.toLocaleString()}</span>
                               <p className="text-[9px] text-neutral-600 tracking-widest font-bold uppercase">{order.paymentMethod}</p>
                            </div>
                         </td>
                         <td className="px-10 py-8 text-right">
                             <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                                <Button 
                                  size="sm" 
                                  variant="secondary" 
                                  className="p-3"
                                  onClick={() => {
                                     setSelectedOrder(order);
                                     setIsModalOpen(true);
                                  }}
                                >
                                  <Eye size={16} />
                                </Button>
                                {!order.isDelivered && (
                                  <Button 
                                    size="sm" 
                                    variant="primary" 
                                    className="p-3"
                                    onClick={() => updateStatus(order._id, "Delivered")}
                                  >
                                    <Truck size={16} />
                                  </Button>
                                )}
                                <Button size="sm" variant="ghost" className="p-3"><MoreVertical size={16} /></Button>
                             </div>
                         </td>
                      </motion.tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>
      </div>

      <OrderModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        order={selectedOrder}
        onDeliver={(id) => updateStatus(id, "Delivered")}
      />
    </AdminLayout>
  );
};

// Internal Import helper
const TrendingUp = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
);

export default AdminOrders;
