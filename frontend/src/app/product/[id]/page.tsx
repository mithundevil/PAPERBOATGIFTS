"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Truck, Award, Plus, Minus, ArrowRight, Upload, MessageCircle } from "lucide-react";
import api from "@/utils/api";
import { ProductDetailsSkeleton } from "@/components/ui/Skeleton";
import { sampleProducts } from "@/utils/sampleData";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState<any>(null);
  const [customText, setCustomText] = useState("");
  const [customImage, setCustomImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [activeImage, setActiveImage] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        if (typeof id === "string" && id.startsWith("sample-")) {
          throw new Error("Sample ID - load locally");
        }
        const { data: response } = await api.get(`/products/${id}`);
        const productData = response.data;
        setProduct(productData);
        if (productData.sizes && productData.sizes.length > 0) {
          setSelectedSize(productData.sizes[0]);
        }
        setActiveImage(productData.images?.[0]?.url || productData.image || "");
      } catch (err) {
        console.error("API fetch failed, checking local samples:", err);
        const sampleProduct = sampleProducts.find(p => p._id === id);
        if (sampleProduct) {
          setProduct(sampleProduct);
          if (sampleProduct.sizes && sampleProduct.sizes.length > 0) {
            setSelectedSize(sampleProduct.sizes[0]);
          }
          setActiveImage(sampleProduct.images?.[0]?.url || sampleProduct.image || "");
        }
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

  const handleWhatsAppOrder = () => {
    const phoneNumber = "919999999999";
    const price = selectedSize ? selectedSize.price : product.startingPrice;
    const sizeStr = selectedSize?.label || "Standard";
    let text = `Hello, I would like to order the following:\n\n*Product*: ${product.name}\n*Size*: ${sizeStr}\n*Price*: ₹${price}\n*Quantity*: ${qty}`;
    if (customText) text += `\n*Custom Text*: ${customText}`;
    if (customImage) text += `\n*Custom Image*: ${customImage}`;
    text += `\n\nPlease let me know how to proceed with payment and delivery.`;
    
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
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
              <img src={customImage || activeImage || product.image} alt={product.name} className="w-full h-full object-contain mix-blend-multiply hover:scale-110 transition-transform duration-1000" />
           </motion.div>
           
           <div className="grid grid-cols-3 gap-6">
              {(product.images?.length > 0 ? product.images : [{ url: product.image, public_id: "default" }]).map((img: any, i: number) => (
                <div 
                  key={i} 
                  onClick={() => setActiveImage(img.url || product.image)}
                  className={`aspect-square bg-neutral-50 rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer flex items-center justify-center p-4 border-2 ${
                    activeImage === (img.url || product.image) ? "border-black opacity-100" : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
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
                  onClick={handleWhatsAppOrder}
                  className="btn-luxury w-full !bg-[#25D366] hover:!bg-[#20ba5a] text-white border-none flex items-center justify-center gap-4 group shadow-[0_10px_30px_rgba(37,211,102,0.35)] hover:shadow-[0_12px_40px_rgba(37,211,102,0.5)] transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer py-4 rounded-xl font-bold tracking-[0.2em] text-xs"
                >
                  <MessageCircle size={16} className="fill-white stroke-none group-hover:scale-110 transition-transform duration-500" />
                  <span>Order via WhatsApp</span>
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
