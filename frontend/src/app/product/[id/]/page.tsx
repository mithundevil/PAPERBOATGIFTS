"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/utils/api";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/layout/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingBag, 
  Upload, 
  Sparkles, 
  Check, 
  Plus, 
  Minus,
  Maximize2,
  Type,
  Camera
} from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState<any>(null);
  const [customText, setCustomText] = useState("");
  const [customImage, setCustomImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const { addToCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
        if (data.sizes && data.sizes.length > 0) {
          setSelectedSize(data.sizes[0]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleUpload = async (e: any) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("images", file);
    setUploading(true);
    try {
      const { data } = await api.post("/upload", formData);
      setCustomImage(data[0].url);
    } catch (err) {
      alert("Asset acquisition failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleAddToCart = () => {
    addToCart({
      product: product._id,
      name: product.name,
      image: product.images[0].url,
      price: selectedSize ? selectedSize.price : product.startingPrice,
      qty,
      size: selectedSize ? selectedSize.label : "Standard",
      customText,
      customImage,
    });
    router.push("/cart");
  };

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Initializing protocol...</div>;
  if (!product) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Asset not found.</div>;

  return (
    <div className="bg-[#0B0B0B] min-h-screen text-white pb-20">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 pt-32 lg:pt-44">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left: Gallery */}
          <div className="lg:col-span-7 space-y-8">
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden border border-white/5 bg-[#111111] shadow-2xl group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={product.images[currentImageIndex]?.url}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
                {product.images.map((_: any, idx: number) => (
                  <button 
                    key={idx} 
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-500 ${currentImageIndex === idx ? 'w-8 bg-indigo-500' : 'w-2 bg-white/20'}`}
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
               {product.images.map((img: any, idx: number) => (
                 <button 
                   key={idx}
                   onClick={() => setCurrentImageIndex(idx)}
                   className={`relative aspect-square rounded-2xl overflow-hidden border transition-all duration-300 ${currentImageIndex === idx ? 'border-indigo-500 ring-2 ring-indigo-500/20' : 'border-white/5 hover:border-white/20 opacity-50 hover:opacity-100'}`}
                 >
                   <img src={img.url} className="w-full h-full object-cover" />
                 </button>
               ))}
            </div>
          </div>

          {/* Right: Controls */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em]">
                <Sparkles size={12} /> Artisanal Collection
              </div>
              <h1 className="text-5xl lg:text-7xl font-black tracking-tighter uppercase leading-[0.9]">{product.name}</h1>
              <p className="text-neutral-500 text-lg leading-relaxed font-light">{product.description}</p>
            </div>

            <div className="space-y-10">
              {/* Size Selection */}
              <div className="space-y-6">
                 <div className="flex items-center gap-3">
                   <Maximize2 size={16} className="text-indigo-400" />
                   <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500">Select Dimension</h3>
                 </div>
                 <div className="grid grid-cols-2 gap-3">
                    {product.sizes.map((size: any) => (
                      <button
                        key={size.label}
                        onClick={() => setSelectedSize(size)}
                        className={`px-6 py-5 rounded-2xl border text-left transition-all duration-500 group relative overflow-hidden ${selectedSize?.label === size.label ? 'border-indigo-500 bg-indigo-500/5' : 'border-white/5 bg-white/5 hover:border-white/10'}`}
                      >
                        <div className="flex justify-between items-start relative z-10">
                           <div className="space-y-1">
                              <span className={`text-[11px] font-black uppercase tracking-widest ${selectedSize?.label === size.label ? 'text-white' : 'text-neutral-500'}`}>{size.label}</span>
                              <p className="text-neutral-600 text-[10px] uppercase tracking-tighter">{size.dimensions}</p>
                           </div>
                           <span className="text-md font-bold">₹{size.price}</span>
                        </div>
                        {selectedSize?.label === size.label && (
                           <motion.div layoutId="selection-glow" className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-transparent" />
                        )}
                      </button>
                    ))}
                 </div>
              </div>

              {/* Customization */}
              {product.supportsCustomText && (
                <div className="space-y-6">
                   <div className="flex items-center gap-3">
                     <Type size={16} className="text-indigo-400" />
                     <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500">Artisanal Inscription</h3>
                   </div>
                   <input 
                     type="text"
                     placeholder="Ex: Forever together 2024"
                     value={customText}
                     onChange={(e) => setCustomText(e.target.value)}
                     className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-5 text-sm focus:outline-none focus:border-indigo-500/50 transition-all placeholder:text-neutral-700"
                   />
                </div>
              )}

              <div className="space-y-6">
                 <div className="flex items-center gap-3">
                   <Camera size={16} className="text-indigo-400" />
                   <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500">Memory Acquisition</h3>
                 </div>
                 <div className="relative group">
                    <button className="w-full h-32 border-2 border-dashed border-white/5 rounded-3xl flex flex-col items-center justify-center gap-3 hover:border-indigo-500/30 hover:bg-white/5 transition-all group-hover:scale-[0.99] active:scale-[0.98]">
                       {customImage ? (
                         <div className="relative w-full h-full p-2">
                           <img src={customImage} className="w-full h-full object-cover rounded-2xl" />
                           <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl">
                             <span className="text-[10px] font-black uppercase tracking-widest">Replace Asset</span>
                           </div>
                         </div>
                       ) : (
                         <>
                           <Upload size={24} className="text-neutral-700 group-hover:text-indigo-400 transition-colors" />
                           <span className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-700">Upload Your Image</span>
                         </>
                       )}
                    </button>
                    <input 
                      type="file" 
                      onChange={handleUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer" 
                    />
                    {uploading && (
                       <div className="absolute inset-0 bg-black/60 rounded-3xl flex items-center justify-center">
                          <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                       </div>
                    )}
                 </div>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="pt-8 flex items-center gap-6">
                 <div className="flex items-center bg-white/5 border border-white/5 rounded-2xl p-2 h-16">
                    <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-12 h-full flex items-center justify-center text-neutral-500 hover:text-white transition-colors">
                       <Minus size={16} />
                    </button>
                    <span className="w-12 text-center text-lg font-bold">{qty}</span>
                    <button onClick={() => setQty(qty + 1)} className="w-12 h-full flex items-center justify-center text-neutral-500 hover:text-white transition-colors">
                       <Plus size={16} />
                    </button>
                 </div>
                 
                 <button 
                   onClick={handleAddToCart}
                   className="flex-1 bg-indigo-500 h-16 rounded-2xl flex items-center justify-center gap-4 text-white text-[11px] font-black uppercase tracking-[0.4em] transition-all hover:scale-[1.02] shadow-2xl shadow-indigo-500/20 active:scale-[0.98]"
                 >
                    <ShoppingBag size={20} /> Add to Collection
                 </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
