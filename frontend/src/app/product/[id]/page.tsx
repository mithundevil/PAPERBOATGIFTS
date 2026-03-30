"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Truck, Award, Plus, Minus, ArrowRight, Upload } from "lucide-react";
import api from "@/utils/api";
import { useCart } from "@/context/CartContext";
import { ProductDetailsSkeleton } from "@/components/ui/Skeleton";

const ProductDetails = () => {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState<any>(null);
  const [customText, setCustomText] = useState("");
  const [customImage, setCustomImage] = useState("");
  const [uploading, setUploading] = useState(false);
  
  const { addToCart } = useCart();

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data: response } = await api.get(`/products/${id}`);
        const productData = response.data;
        setProduct(productData);
        if (productData.sizes && productData.sizes.length > 0) {
          setSelectedSize(productData.sizes[0]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  const handleImageUpload = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("images", file);

    setUploading(true);
    try {
      const { data } = await api.post("/upload/customer", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setCustomImage(data[0].url);
    } catch (err) {
      console.error(err);
      alert("Asset acquisition failure.");
    } finally {
      setUploading(false);
    }
  };

  if (loading || !product) return (
     <div className="bg-white min-h-screen pt-32 pb-20">
        <ProductDetailsSkeleton />
     </div>
  );

  return (
    <div className="bg-white min-h-screen pt-32 pb-20">
      <div className="container-premium grid grid-cols-1 lg:grid-cols-2 gap-20">
        
        {/* Left: Cinematic Visuals */}
        <div className="space-y-8">
           <motion.div 
             initial={{ opacity: 0, scale: 1.1 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 1.5 }}
             className="aspect-[4/5] bg-neutral-50 rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center p-20"
           >
              <img src={customImage || product.images?.[0]?.url || product.image} alt={product.name} className="w-full h-full object-contain mix-blend-multiply hover:scale-110 transition-transform duration-1000" />
           </motion.div>
           
           <div className="grid grid-cols-3 gap-6">
              {(product.images?.length > 0 ? product.images : [1,2,3]).map((img: any, i: number) => (
                <div key={i} className="aspect-square bg-neutral-50 rounded-2xl overflow-hidden hover:opacity-100 opacity-60 transition-opacity cursor-pointer flex items-center justify-center p-4">
                   <img src={img.url || product.image} className="w-full h-full object-contain grayscale hover:grayscale-0 transition-all" />
                </div>
              ))}
           </div>
        </div>

        {/* Right: Refined Controls */}
        <div className="flex flex-col justify-start space-y-12">
           <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.6em] font-bold text-neutral-400">Exclusive Gifting</span>
              <h1 className="text-5xl md:text-6xl font-outfit font-bold tracking-tighter leading-tight">{product.name}</h1>
              <div className="flex items-center gap-6">
                 <span className="text-3xl font-outfit font-bold silver-text-gradient">₹{selectedSize ? selectedSize.price : product.startingPrice}</span>
                 <div className="px-3 py-1 bg-black text-white text-[9px] uppercase tracking-widest font-bold">Premium Protocol</div>
              </div>
           </div>

           <div className="space-y-8">
              <div className="space-y-4">
                <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-neutral-500">Choice of Dimension</h4>
                <div className="flex flex-wrap gap-4">
                   {product.sizes?.map((s: any) => (
                      <button 
                        key={s.label} 
                        onClick={() => setSelectedSize(s)}
                        className={`px-8 py-3 text-[11px] uppercase tracking-widest font-bold border rounded-full transition-all duration-500 flex flex-col items-center ${
                          selectedSize?.label === s.label ? 'bg-black text-white border-black scale-105 shadow-xl' : 'border-neutral-200 hover:border-black text-neutral-400 hover:text-black'
                        }`}
                      >
                         <span>{s.label}</span>
                         {s.dimensions && <span className="text-[8px] opacity-60 mt-0.5">{s.dimensions}</span>}
                      </button>
                   ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {product.supportsCustomText && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-neutral-500">Artisanal Inscription</h4>
                    <input 
                      type="text" 
                      placeholder="Enter message for personalization..." 
                      className="w-full bg-neutral-50 border border-neutral-100 rounded-2xl px-6 py-4 text-xs focus:ring-1 focus:ring-black outline-none transition-all"
                      value={customText}
                      onChange={(e) => setCustomText(e.target.value)}
                    />
                  </motion.div>
                )}

                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-neutral-500">Bespoke Asset (Image)</h4>
                  <div className="relative group/upload">
                    <input 
                      type="file" 
                      onChange={handleImageUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    />
                    <div className="w-full bg-neutral-50 border border-dashed border-neutral-200 rounded-2xl px-6 py-4 text-xs flex items-center justify-between group-hover/upload:border-black transition-all">
                       <span className="text-neutral-400">{uploading ? "Acquiring..." : customImage ? "Asset Captured" : "Upload Custom Photo"}</span>
                       <Upload size={14} className="text-neutral-400 group-hover/upload:text-black" />
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="space-y-4">
                <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-neutral-500">Quantity</h4>
                <div className="flex items-center space-x-6 border border-neutral-100 w-fit rounded-full px-6 py-2 bg-neutral-50">
                   <button onClick={() => setQty(Math.max(1, qty - 1))} className="hover:text-neutral-400 transition-colors"><Minus size={16} /></button>
                   <span className="text-lg font-outfit font-bold w-4 text-center">{qty}</span>
                   <button onClick={() => setQty(qty + 1)} className="hover:text-neutral-400 transition-colors"><Plus size={16} /></button>
                </div>
              </div>
           </div>

            <div className="space-y-4">
               <button 
                 onClick={() => addToCart({ 
                   product: product._id,
                   name: product.name,
                   image: product.images?.[0]?.url || product.image,
                   price: selectedSize ? selectedSize.price : product.startingPrice, 
                   qty, 
                   size: selectedSize?.label || "Standard",
                   customText,
                   customImage 
                 })}
                 className="btn-luxury w-full flex items-center justify-center gap-4 group"
               >
                 <span>Add to Collection</span>
                 <Plus size={16} className="group-hover:rotate-90 transition-transform duration-500" />
               </button>
               <button 
                 onClick={() => {
                   addToCart({ 
                     product: product._id,
                     name: product.name,
                     image: product.images?.[0]?.url || product.image,
                     price: selectedSize ? selectedSize.price : product.startingPrice, 
                     qty, 
                     size: selectedSize?.label || "Standard",
                     customText,
                     customImage 
                   });
                   router.push("/checkout");
                 }}
                 className="btn-luxury-outline w-full"
               >
                 Immediate Acquisition
               </button>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-neutral-100">
              <div className="flex flex-col items-center text-center space-y-3">
                 <div className="w-12 h-12 rounded-full border border-neutral-100 flex items-center justify-center text-neutral-400">
                    <Truck size={20} strokeWidth={1.5} />
                 </div>
                 <span className="text-[9px] uppercase tracking-[0.3em] font-bold">Premium Shipping</span>
              </div>
              <div className="flex flex-col items-center text-center space-y-3">
                 <div className="w-12 h-12 rounded-full border border-neutral-100 flex items-center justify-center text-neutral-400">
                    <Shield size={20} strokeWidth={1.5} />
                 </div>
                 <span className="text-[9px] uppercase tracking-[0.3em] font-bold">Secure Gateway</span>
              </div>
              <div className="flex flex-col items-center text-center space-y-3">
                 <div className="w-12 h-12 rounded-full border border-neutral-100 flex items-center justify-center text-neutral-400">
                    <Award size={20} strokeWidth={1.5} />
                 </div>
                 <span className="text-[9px] uppercase tracking-[0.3em] font-bold">Authentic Craft</span>
              </div>
           </div>

           <div className="space-y-4">
              <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-neutral-500">The Story</h4>
              <p className="text-neutral-500 font-light leading-relaxed">
                 An exquisite fusion of artisanal heritage and contemporary minimalism. Hand-finished by our master conservators, this piece is designed to transform a singular memory into a legacy. Crafted from archival-grade materials selected for their tactile purity and enduring resilience.
              </p>
           </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;
