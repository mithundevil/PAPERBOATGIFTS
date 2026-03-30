"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/layout/AdminLayout";
import api from "@/utils/api";
import Button from "@/components/admin/ui/Button";
import Badge from "@/components/admin/ui/Badge";
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  MoreVertical,
  Filter,
  Download,
  Package,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const AdminProducts = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const { data: response } = await api.get("/products");
      setProducts(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteHandler = async (id: string) => {
    if (window.confirm("Perform irreversible de-cataloging of this asset?")) {
      try {
        await api.delete(`/products/${id}`);
        fetchProducts();
      } catch (err) {
        alert("De-cataloging failed.");
      }
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-12">
        {/* Cinematic Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
           <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <div className="w-8 h-px bg-admin-accent" />
                 <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-neutral-500">Asset Management</span>
              </div>
              <h1 className="text-5xl font-bold text-white tracking-tighter leading-none">Catalog <span className="text-neutral-500 font-light italic">Manifest</span></h1>
           </div>
           
           <Link href="/admin/products/add">
              <Button size="lg" className="shadow-2xl shadow-admin-accent/30 group">
                 <Plus size={16} className="mr-3 group-hover:rotate-90 transition-transform duration-500" /> 
                 <span>Register New Asset</span>
              </Button>
           </Link>
        </div>

        {/* Sophisticated Table Container */}
        <div className="bg-[#0B0B0B] border border-[#1F1F1F] rounded-[2.5rem] overflow-hidden shadow-2xl relative group">
           <div className="absolute inset-0 bg-gradient-to-br from-[#6366F1]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
           
           {/* Table Filters */}
           <div className="p-10 border-b border-[#1F1F1F] flex flex-col lg:flex-row justify-between items-center gap-8 bg-white/[0.02] relative z-10">
              <div className="relative w-full lg:w-[500px] group/search">
                 <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-600 group-focus-within/search:text-[#6366F1] transition-colors" size={18} />
                 <input 
                   type="text" 
                   placeholder="Universal search by Identity or Category..." 
                   className="w-full bg-[#111111] border border-[#1F1F1F] rounded-2xl pl-16 pr-8 py-4.5 text-xs text-white placeholder:text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#6366F1]/20 focus:border-[#6366F1] transition-all duration-500 shadow-inner"
                 />
              </div>
              <div className="flex items-center gap-4">
                 <button className="flex items-center gap-3 px-8 py-4 bg-[#111111] text-neutral-500 text-[10px] uppercase tracking-[0.2em] font-black rounded-xl hover:text-white hover:bg-[#6366F1]/10 transition-all border border-[#1F1F1F] hover:border-[#6366F1]/30">
                    <Filter size={14} /> Refine
                 </button>
                 <button className="flex items-center gap-3 px-8 py-4 bg-[#111111] text-neutral-500 text-[10px] uppercase tracking-[0.2em] font-black rounded-xl hover:text-white hover:bg-[#6366F1]/10 transition-all border border-[#1F1F1F] hover:border-[#6366F1]/30">
                    <Download size={14} /> Export
                 </button>
              </div>
           </div>

           {/* High-Contrast Table */}
           <div className="overflow-x-auto relative z-10">
              <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className="bg-black/20 text-[9px] uppercase tracking-[0.4em] font-black text-neutral-700 border-b border-[#1F1F1F]">
                       <th className="px-10 py-8">Identity & Narrative</th>
                       <th className="px-10 py-8">Category</th>
                       <th className="px-10 py-8">Availability</th>
                       <th className="px-10 py-8">Valuation</th>
                       <th className="px-10 py-8 text-right">Operations</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-[#1F1F1F]">
                    {loading ? (
                       [1,2,3,4,5].map(i => <tr key={i}><td colSpan={5} className="px-10 py-16 animate-pulse opacity-10 bg-white/5" /></tr>)
                    ) : products.map((p) => (
                      <motion.tr 
                        key={p._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="hover:bg-[#6366F1]/[0.02] transition-all group duration-500"
                      >
                         <td className="px-10 py-10">
                            <div className="flex items-center gap-8">
                               <div className="w-24 h-28 bg-[#111111] rounded-2xl border border-[#1F1F1F] p-5 flex items-center justify-center relative overflow-hidden group-hover:border-[#6366F1]/30 transition-all duration-700 shadow-xl group-hover:shadow-[#6366F1]/5 group-hover:-rotate-1">
                                  <img src={p.images?.[0]?.url || p.image} className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-700" />
                                  <div className="absolute inset-0 bg-gradient-to-tr from-[#6366F1]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                               </div>
                               <div className="space-y-2">
                                  <p className="text-sm font-black text-white group-hover:text-[#6366F1] transition-colors leading-tight uppercase tracking-tight">{p.name}</p>
                                  <p className="text-[9px] text-neutral-700 tracking-[0.3em] font-black uppercase">PROTOCOL ID: {p._id.slice(-8).toUpperCase()}</p>
                               </div>
                            </div>
                         </td>
                         <td className="px-10 py-10">
                            <Badge variant="neutral" className="border-[#1F1F1F] bg-[#111111]/50">{p.category}</Badge>
                         </td>
                         <td className="px-10 py-10">
                            <div className="flex items-center gap-4">
                               <div className={`w-1.5 h-1.5 rounded-full ${p.countInStock > 0 ? 'bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.8)]' : 'bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.8)]'}`} />
                               <span className="text-xs font-black text-white uppercase tracking-tighter">{p.countInStock} Units</span>
                            </div>
                         </td>
                         <td className="px-10 py-10">
                            <span className="text-lg font-black text-white tracking-tighter">₹{p.startingPrice.toLocaleString()}</span>
                         </td>
                         <td className="px-10 py-10 text-right">
                            <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 translate-x-10 group-hover:translate-x-0 transition-all duration-700">
                               <Link href={`/admin/products/edit/${p._id}`}>
                                  <button title="Edit Asset" className="p-4 bg-[#111111] border border-[#1F1F1F] rounded-2xl text-neutral-400 hover:text-white hover:border-[#6366F1]/50 hover:bg-[#6366F1]/10 transition-all duration-500">
                                     <Edit3 size={18} />
                                  </button>
                               </Link>
                               <button 
                                 title="Terminate Asset"
                                 className="p-4 bg-[#111111] border border-[#1F1F1F] rounded-2xl text-neutral-400 hover:text-red-400 hover:border-red-400/50 hover:bg-red-400/10 transition-all duration-500"
                                 onClick={() => deleteHandler(p._id)}
                               >
                                 <Trash2 size={18} />
                               </button>
                               <button className="p-4 bg-[#111111] border border-[#1F1F1F] rounded-2xl text-neutral-400 hover:text-white transition-all">
                                  <MoreVertical size={18} />
                               </button>
                            </div>
                         </td>
                      </motion.tr>
                    ))}
                 </tbody>
              </table>
           </div>

           {/* Footer Pagination */}
           <div className="p-10 border-t border-[#1F1F1F] flex justify-between items-center bg-white/[0.01] relative z-10">
              <span className="text-[10px] uppercase font-black text-neutral-700 tracking-[0.3em]">Protocol Display: 01-10 of {products.length} Assets</span>
              <div className="flex gap-3">
                 <button className="px-8 py-3 bg-[#111111] border border-[#1F1F1F] text-neutral-700 text-[10px] uppercase tracking-widest font-black rounded-xl disabled:opacity-30">Previous</button>
                 <button className="px-8 py-3 bg-[#111111] border border-[#1F1F1F] text-neutral-500 text-[10px] uppercase tracking-widest font-black rounded-xl hover:text-white hover:border-[#6366F1]/50 transition-all">Next</button>
              </div>
           </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminProducts;
