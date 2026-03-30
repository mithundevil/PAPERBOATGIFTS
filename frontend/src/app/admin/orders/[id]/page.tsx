"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import AdminLayout from "@/components/admin/layout/AdminLayout";
import api from "@/utils/api";
import Badge from "@/components/admin/ui/Badge";
import Button from "@/components/admin/ui/Button";
import { 
  ArrowLeft, 
  Printer, 
  Package, 
  Truck, 
  CheckCircle,
  CreditCard,
  User,
  MapPin,
  Calendar,
  Box
} from "lucide-react";
import { motion } from "framer-motion";

const OrderDetails = () => {
  const { id } = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [statusLoading, setStatusLoading] = useState(false);

  const fetchOrder = async () => {
    try {
      const { data: response } = await api.get(`/orders/${id}`);
      setOrder(response.data);
    } catch (err) {
      console.error("Fulfillment data acquisition failure", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const updateStatus = async (status: string) => {
    setStatusLoading(true);
    try {
      await api.put(`/orders/${id}/status`, { status });
      fetchOrder();
    } catch (err) {
      alert("Fulfillment status update failed.");
    } finally {
      setStatusLoading(false);
    }
  };

  if (loading) return (
    <AdminLayout>
      <div className="animate-pulse space-y-8">
        <div className="h-8 bg-white/5 w-1/4 rounded-xl" />
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2 h-[600px] bg-white/5 rounded-[2.5rem]" />
          <div className="h-[600px] bg-white/5 rounded-[2.5rem]" />
        </div>
      </div>
    </AdminLayout>
  );

  if (!order) return <AdminLayout><div>Order not found.</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
           <div className="space-y-4">
              <button 
                onClick={() => router.back()}
                className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-black text-[#6366F1] hover:text-white transition-colors"
              >
                <ArrowLeft size={14} /> Back to Manifest
              </button>
              <h1 className="text-4xl font-black text-white tracking-tighter leading-none flex items-center gap-4">
                Acquisition <span className="text-neutral-700 font-light italic">#{order._id.slice(-8).toUpperCase()}</span>
                <Badge variant={order.isPaid ? 'success' : 'warning'}>
                  {order.isPaid ? 'Validated' : 'Pending Verification'}
                </Badge>
              </h1>
           </div>
           
           <div className="flex items-center gap-4">
              <button className="p-4 bg-[#111111] border border-[#1F1F1F] rounded-2xl text-neutral-500 hover:text-white transition-all">
                 <Printer size={18} />
              </button>
              <select 
                className="bg-[#6366F1] text-white text-[10px] uppercase tracking-widest font-black px-8 py-4 rounded-2xl outline-none border-none cursor-pointer shadow-lg shadow-indigo-500/20"
                value={order.status}
                onChange={(e) => updateStatus(e.target.value)}
                disabled={statusLoading}
              >
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Mark Shipped</option>
                <option value="Delivered">Mark Delivered</option>
                <option value="Cancelled">Cancel Order</option>
              </select>
           </div>
        </div>

        {/* Content Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
           {/* Primary Artifacts */}
           <div className="lg:col-span-8 space-y-10">
              <div className="bg-[#0B0B0B] border border-[#1F1F1F] rounded-[2.5rem] p-10 shadow-2xl space-y-10">
                 <div className="flex items-center gap-3">
                    <Box className="text-[#6366F1]" size={20} />
                    <h3 className="text-xl font-black text-white tracking-tight uppercase">Line Items</h3>
                 </div>

                 <div className="space-y-6">
                    {order.orderItems.map((item: any, idx: number) => (
                      <div key={idx} className="flex items-center gap-6 p-6 bg-[#111111]/50 border border-[#1F1F1F] rounded-3xl hover:border-[#6366F1]/30 transition-all group">
                         <div className="w-24 h-24 bg-black rounded-2xl flex items-center justify-center p-4 border border-[#1F1F1F] group-hover:scale-105 transition-transform">
                            <img src={item.image} className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all" />
                         </div>
                         <div className="flex-1 space-y-1">
                            <p className="text-sm font-black text-white uppercase tracking-tight">{item.name}</p>
                            <p className="text-[10px] text-neutral-600 font-bold uppercase tracking-widest">Dimensions: {item.size}</p>
                            {item.customization && (
                              <p className="text-[10px] text-[#6366F1] font-bold italic mt-2 italic px-3 py-1 bg-[#6366F1]/5 rounded-lg border border-[#6366F1]/10 w-fit">
                                Note: "{item.customization}"
                              </p>
                            )}
                         </div>
                         <div className="text-right space-y-1">
                            <p className="text-xs font-bold text-neutral-500">{item.qty} × ₹{item.price}</p>
                            <p className="text-lg font-black text-white">₹{item.qty * item.price}</p>
                         </div>
                      </div>
                    ))}
                 </div>

                 <div className="pt-10 border-t border-[#1F1F1F] space-y-4">
                    <div className="flex justify-between text-neutral-500 text-xs font-bold uppercase tracking-widest">
                       <span>Subtotal Protocol</span>
                       <span>₹{order.itemsPrice}</span>
                    </div>
                    <div className="flex justify-between text-neutral-500 text-xs font-bold uppercase tracking-widest">
                       <span>Logistics Fee</span>
                       <span>₹{order.shippingPrice}</span>
                    </div>
                    <div className="flex justify-between pt-4 border-t border-[#1F1F1F]">
                       <span className="text-xl font-black text-white uppercase tracking-tighter">Total Valuation</span>
                       <span className="text-3xl font-black text-[#6366F1] tracking-tighter">₹{order.totalPrice}</span>
                    </div>
                 </div>
              </div>
           </div>

           {/* Metadata Secondary */}
           <div className="lg:col-span-4 space-y-10">
              {/* Customer Intel */}
              <div className="bg-[#0B0B0B] border border-[#1F1F1F] rounded-[2.5rem] p-10 shadow-2xl space-y-8">
                 <div className="flex items-center gap-3">
                    <User className="text-[#6366F1]" size={20} />
                    <h3 className="text-xl font-black text-white tracking-tight uppercase">Curator Intel</h3>
                 </div>
                 
                 <div className="space-y-6">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 bg-[#111111] rounded-2xl border border-[#1F1F1F] flex items-center justify-center text-white font-black">
                          {order.user?.name?.[0]?.toUpperCase()}
                       </div>
                       <div>
                          <p className="text-sm font-black text-white">{order.user?.name}</p>
                          <p className="text-xs text-neutral-600 font-bold">{order.user?.email}</p>
                       </div>
                    </div>
                    
                    <div className="space-y-4 pt-6 border-t border-[#1F1F1F]">
                       <div className="flex gap-4">
                          <MapPin className="text-neutral-700 shrink-0" size={16} />
                          <div className="text-xs text-neutral-500 font-bold tracking-tight">
                             {order.shippingAddress.address},<br />
                             {order.shippingAddress.city}, {order.shippingAddress.postalCode},<br />
                             {order.shippingAddress.country}
                          </div>
                       </div>
                       <div className="flex gap-4">
                          <Calendar className="text-neutral-700 shrink-0" size={16} />
                          <div className="text-xs text-neutral-500 font-bold uppercase tracking-widest">
                             Registered: {new Date(order.createdAt).toLocaleDateString()}
                          </div>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Status Tracking */}
              <div className="bg-[#0B0B0B] border border-[#1F1F1F] rounded-[2.5rem] p-10 shadow-2xl space-y-8">
                 <div className="flex items-center gap-3">
                    <Truck className="text-[#6366F1]" size={20} />
                    <h3 className="text-xl font-black text-white tracking-tight uppercase">Status Tracker</h3>
                 </div>
                 
                 <div className="space-y-8 relative">
                    <div className="absolute left-6 top-0 bottom-0 w-px bg-[#1F1F1F] z-0" />
                    
                    <div className="flex items-center gap-6 relative z-10">
                       <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 ${order.isPaid ? 'bg-green-500/10 border-green-500 text-green-500' : 'bg-[#111111] border-[#1F1F1F] text-neutral-700'}`}>
                          <CheckCircle size={20} />
                       </div>
                       <div>
                          <p className="text-xs font-black text-white uppercase tracking-widest">Validated</p>
                          <p className="text-[10px] text-neutral-600 font-bold uppercase">{order.isPaid ? 'Acquisition Secure' : 'Awaiting Payment'}</p>
                       </div>
                    </div>

                    <div className="flex items-center gap-6 relative z-10">
                       <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 ${order.isDelivered ? 'bg-green-500/10 border-green-500 text-green-500' : 'bg-[#111111] border-[#1F1F1F] text-neutral-700'}`}>
                          <Truck size={20} />
                       </div>
                       <div>
                          <p className="text-xs font-black text-white uppercase tracking-widest">Logistics</p>
                          <p className="text-[10px] text-neutral-600 font-bold uppercase">{order.isDelivered ? 'Delivered to Curator' : 'In Fulfillment Pipeline'}</p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default OrderDetails;
