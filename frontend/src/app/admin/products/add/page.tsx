"use client";

import { useState } from "react";
import AdminLayout from "@/components/admin/layout/AdminLayout";
import api from "@/utils/api";
import Button from "@/components/admin/ui/Button";
import { Input, Textarea, Select } from "@/components/admin/ui/Inputs";
import { 
  ArrowLeft, 
  Upload, 
  Plus, 
  X,
  Diamond,
  Layers,
  FileText,
  Boxes,
  Image as ImageIcon,
  Sparkles,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Toast from "@/components/admin/ui/Toast";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("frames");
  const [description, setDescription] = useState("");
  const [startingPrice, setStartingPrice] = useState("");
  const [stock, setStock] = useState("");
  const [images, setImages] = useState<any[]>([]);
  const [sizes, setSizes] = useState<{ label: string; price: number; dimensions?: string }[]>([
    { label: "Classic Small", price: 0, dimensions: "4x4" }
  ]);
  const [supportsCustomText, setSupportsCustomText] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const router = useRouter();

  const handleUpload = async (e: any) => {
    const files = e.target.files;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }
    setUploading(true);
    try {
      const { data: response } = await api.post("/upload", formData);
      setImages([...images, ...response]);
      setToast({ message: "Assets acquired successfully", type: "success" });
    } catch (err) {
      setToast({ message: "Asset acquisition protocol failed", type: "error" });
    } finally {
      setUploading(false);
    }
  };

  const addSize = () => {
    setSizes([...sizes, { label: "", price: 0, dimensions: "" }]);
  };

  const removeSize = (index: number) => {
    setSizes(sizes.filter((_, i) => i !== index));
  };

  const updateSize = (index: number, field: string, value: any) => {
    const newSizes = [...sizes];
    (newSizes[index] as any)[field] = field === "price" ? Number(value) : value;
    setSizes(newSizes);
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const submitHandler = async (e: any) => {
    e.preventDefault();
    try {
      await api.post("/products", {
        name,
        category,
        description,
        startingPrice: Number(startingPrice),
        countInStock: Number(stock),
        images,
        sizes,
        supportsCustomText
      });
      setToast({ message: "Product registered in master catalog", type: "success" });
      setTimeout(() => router.push("/admin/products"), 2000);
    } catch (err) {
      setToast({ message: "Catalog sequence initialization failed", type: "error" });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-12 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
           <div className="flex items-center gap-6">
              <Link href="/admin/products">
                 <button className="p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-admin-accent hover:border-admin-accent hover:text-white transition-all text-neutral-500 group">
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                 </button>
              </Link>
              <div className="space-y-1">
                 <h2 className="text-4xl font-bold text-white tracking-tighter uppercase leading-none">Catalog <span className="text-neutral-500 font-light italic">Expansion</span></h2>
                 <p className="text-[10px] uppercase font-bold tracking-[0.4em] text-neutral-600">Protocol: Asset Registration 4.0</p>
              </div>
           </div>
           
           <div className="hidden md:flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/5 rounded-2xl">
              <Sparkles size={16} className="text-admin-accent" />
              <span className="text-[10px] uppercase tracking-widest font-bold text-neutral-400">Premium Curated Asset</span>
           </div>
        </div>

        <form onSubmit={submitHandler} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
           {/* Left: General Info */}
           <div className="lg:col-span-8 space-y-10">
              <div className="bg-[#0B0B0B] border border-[#1F1F1F] rounded-[2.5rem] p-10 space-y-10 shadow-2xl relative overflow-hidden group">
                 <div className="absolute inset-0 bg-gradient-to-br from-[#6366F1]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                 
                 <div className="flex items-center gap-4 relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-[#111111] border border-[#1F1F1F] flex items-center justify-center text-[#6366F1] shadow-inner group-hover:scale-110 transition-transform duration-500">
                       <FileText size={20} />
                    </div>
                    <h3 className="text-xl font-black text-white uppercase tracking-tighter">Identity Specification</h3>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                    <Input 
                      label="Asset Name"
                      required
                      placeholder="Ex: Ethereal Wedding Narrative"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <Select 
                      label="Protocol Category"
                      options={[
                        { label: "Bespoke Frames", value: "frames" },
                        { label: "Memory Albums", value: "albums" },
                        { label: "Ritual Mugs", value: "mugs" },
                        { label: "Instant Polaroids", value: "polaroids" },
                        { label: "Gallery Posters", value: "posters" }
                      ]}
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    />
                 </div>

                 <div className="space-y-6 relative z-10">
                    <div className="flex items-center justify-between">
                       <div className="flex items-center gap-4">
                          <Layers size={18} className="text-[#6366F1]" />
                          <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-neutral-600">Size Matrices</h4>
                       </div>
                       <button 
                         type="button" 
                         onClick={addSize}
                         className="px-6 py-2.5 bg-[#111111] border border-[#1F1F1F] text-[#6366F1] text-[10px] uppercase tracking-widest font-black rounded-xl hover:text-white hover:bg-[#6366F1] hover:border-[#6366F1] transition-all shadow-lg"
                       >
                          <Plus size={14} className="inline mr-2" /> Add Protocol
                       </button>
                    </div>
                    
                    <div className="space-y-4">
                       {sizes.map((s, idx) => (
                          <div key={idx} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end bg-[#111111]/30 p-6 rounded-[1.5rem] border border-[#1F1F1F] group/row hover:border-[#6366F1]/30 transition-all duration-500">
                             <div className="md:col-span-1">
                                <Input 
                                  label="Label" 
                                  placeholder="Small" 
                                  value={s.label} 
                                  onChange={(e) => updateSize(idx, "label", e.target.value)} 
                                />
                             </div>
                             <div>
                                <Input 
                                  label="Valuation (₹)" 
                                  type="number" 
                                  placeholder="0" 
                                  value={s.price} 
                                  onChange={(e) => updateSize(idx, "price", e.target.value)} 
                                />
                             </div>
                             <div>
                                <Input 
                                  label="Dimensions" 
                                  placeholder="4x4" 
                                  value={s.dimensions || ""} 
                                  onChange={(e) => updateSize(idx, "dimensions", e.target.value)} 
                                />
                             </div>
                             <div className="flex justify-end pb-2">
                                <button type="button" onClick={() => removeSize(idx)} className="p-3 bg-white/5 text-neutral-600 hover:text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all border border-transparent hover:border-rose-500/20">
                                   <X size={18} />
                                </button>
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>

                 <div className="flex items-center gap-4 p-8 bg-[#111111] border border-[#1F1F1F] rounded-2xl relative z-10 shadow-inner group/toggle overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#6366F1]/5 to-transparent opacity-0 group-hover/toggle:opacity-100 transition-opacity" />
                    <input 
                      type="checkbox" 
                      id="customText" 
                      className="w-6 h-6 accent-[#6366F1] cursor-pointer" 
                      checked={supportsCustomText}
                      onChange={(e) => setSupportsCustomText(e.target.checked)}
                    />
                    <label htmlFor="customText" className="text-[10px] font-black text-white uppercase tracking-[0.3em] cursor-pointer">
                       Enable Artisanal Inscription Protocol
                    </label>
                 </div>

                 <Textarea 
                   label="Artisanal Narrative"
                   required
                   placeholder="Describe the aesthetic essence and crafted history of this piece..."
                   value={description}
                   onChange={(e) => setDescription(e.target.value)}
                   className="relative z-10"
                 />
              </div>

              <div className="bg-[#0B0B0B] border border-[#1F1F1F] rounded-[2.5rem] p-10 space-y-10 shadow-2xl relative overflow-hidden group">
                 <div className="absolute inset-0 bg-gradient-to-tr from-[#6366F1]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                 
                 <div className="flex items-center gap-4 relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-[#111111] border border-[#1F1F1F] flex items-center justify-center text-[#6366F1] shadow-inner group-hover:scale-110 transition-transform duration-500">
                       <Boxes size={20} />
                    </div>
                    <h3 className="text-xl font-black text-white uppercase tracking-tighter">Inventory Parameters</h3>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                    <Input 
                      label="Base Valuation (₹)"
                      required
                      type="number"
                      placeholder="999"
                      value={startingPrice}
                      onChange={(e) => setStartingPrice(e.target.value)}
                    />
                    <Input 
                      label="Protocol Units"
                      required
                      type="number"
                      placeholder="100"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                    />
                 </div>
              </div>
           </div>

           {/* Right: Asset Management */}
           <div className="lg:col-span-4 space-y-10">
              <div className="bg-[#0B0B0B] border border-[#1F1F1F] rounded-[2.5rem] p-10 space-y-10 h-full flex flex-col shadow-2xl relative overflow-hidden group">
                 <div className="absolute inset-0 bg-gradient-to-bl from-[#6366F1]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                 
                 <div className="flex items-center gap-4 relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-[#111111] border border-[#1F1F1F] flex items-center justify-center text-[#6366F1] shadow-inner group-hover:scale-110 transition-transform duration-500">
                       <ImageIcon size={20} />
                    </div>
                    <h3 className="text-xl font-black text-white uppercase tracking-tighter">Visual Identity</h3>
                 </div>

                 <div className="space-y-6 relative z-10">
                    <div className="grid grid-cols-2 gap-6">
                       {images.map((img, idx) => (
                          <div key={idx} className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-[#1F1F1F] group/img shadow-xl">
                             <img src={img.url} className="w-full h-full object-cover filter grayscale group-hover/img:grayscale-0 transition-all duration-700" />
                             <button 
                               type="button"
                               onClick={() => removeImage(idx)}
                               className="absolute top-3 right-3 p-2 bg-black/60 text-white rounded-xl opacity-0 group-hover/img:opacity-100 transition-all hover:bg-rose-500"
                             >
                                <X size={14} />
                             </button>
                          </div>
                       ))}
                       {images.length < 5 && (
                          <div className="relative aspect-[3/4] flex flex-col justify-center items-center gap-4 border-2 border-dashed border-[#1F1F1F] rounded-2xl hover:border-[#6366F1]/50 transition-all group/upload cursor-pointer bg-[#111111]/50 hover:bg-[#6366F1]/5 shadow-inner">
                             <div className="w-12 h-12 rounded-2xl bg-[#111111] border border-[#1F1F1F] flex items-center justify-center text-neutral-700 group-hover/upload:text-[#6366F1] group-hover/upload:scale-110 transition-all duration-500 shadow-xl">
                                <Plus size={18} />
                             </div>
                             <span className="text-[9px] font-black uppercase tracking-[0.3em] text-neutral-700 group-hover/upload:text-white transition-colors text-center">Protocol<br/>Acquire</span>
                             <input 
                               type="file" 
                               multiple 
                               onChange={handleUpload} 
                               className="absolute inset-0 opacity-0 cursor-pointer" 
                             />
                          </div>
                       )}
                    </div>
                 </div>

                 <div className="pt-10 space-y-6 relative z-10 mt-auto">
                    <button 
                      type="submit" 
                      disabled={images.length === 0 || uploading}
                      className="w-full py-6 bg-[#6366F1] text-white text-[11px] uppercase tracking-[0.5em] font-black rounded-2xl shadow-2xl shadow-indigo-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-30 disabled:scale-100 flex items-center justify-center gap-4"
                    >
                       {uploading ? (
                         <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                       ) : (
                         <>Initialize Protocol <ArrowRight size={18} /></>
                       )}
                    </button>
                    <p className="text-center text-[9px] text-neutral-700 font-black uppercase tracking-[0.4em]">Authorized Endpoint: OB-ALPHA</p>
                 </div>
              </div>
           </div>
        </form>

        <AnimatePresence>
          {toast && (
            <Toast 
              message={toast.message} 
              type={toast.type} 
              onClose={() => setToast(null)} 
            />
          )}
        </AnimatePresence>
      </div>
    </AdminLayout>
  );
};

export default AddProduct;
