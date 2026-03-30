"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  PlusCircle, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Bell,
  Search,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (o: boolean) => void }) => {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/admin" },
    { name: "Products", icon: Package, href: "/admin/products" },
    { name: "Orders", icon: ShoppingBag, href: "/admin/orders" },
    // { name: "Customers", icon: Users, href: "/admin/customers" }, // Potential future
    { name: "Add Product", icon: PlusCircle, href: "/admin/products/add" },
    { name: "Settings", icon: Settings, href: "/admin/settings" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    router.push("/login");
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        className={`fixed top-0 left-0 h-full bg-admin-sidebar border-r border-admin-border z-50 transition-all duration-500 flex flex-col ${
          isOpen ? "w-72" : "w-0 lg:w-20 overflow-hidden"
        }`}
      >
        {/* Logo Section */}
        <div className="p-6 flex items-center gap-3 border-b border-admin-border">
          <div className="w-10 h-10 bg-admin-accent rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-admin-accent/20">
             <ShoppingBag className="text-white" size={20} />
          </div>
          <span className={`text-xl font-bold tracking-tighter text-white transition-opacity ${isOpen ? "opacity-100" : "opacity-0 invisible lg:hidden"}`}>
            PAPERBOAT <span className="font-light text-neutral-500">ADMIN</span>
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-8 space-y-2 px-3 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-4 p-3 rounded-xl transition-all group ${
                  isActive ? "bg-admin-accent/10 text-admin-accent shadow-sm" : "text-neutral-500 hover:text-white hover:bg-white/5"
                }`}
              >
                <item.icon size={22} className={`${isActive ? "text-admin-accent" : "group-hover:text-white"}`} />
                <span className={`font-medium transition-opacity ${isOpen ? "opacity-100" : "opacity-0 invisible lg:hidden"}`}>
                  {item.name}
                </span>
                {isActive && isOpen && <div className="ml-auto w-1.5 h-1.5 bg-admin-accent rounded-full shadow-[0_0_8px_rgba(79,70,229,1)]" />}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-admin-border">
           <button 
             onClick={handleLogout}
             className="w-full flex items-center gap-4 p-3 rounded-xl text-red-500 hover:bg-red-500/10 transition-all"
           >
              <LogOut size={22} />
              <span className={`font-medium ${isOpen ? "opacity-100" : "opacity-0 invisible lg:hidden"}`}>Sign Out</span>
           </button>
        </div>
      </motion.aside>
    </>
  );
};

const Topbar = ({ toggleSidebar, sidebarOpen }: { toggleSidebar: () => void; sidebarOpen: boolean }) => {
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    const info = localStorage.getItem("userInfo");
    if (info) setUserInfo(JSON.parse(info));
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-admin-bg/60 backdrop-blur-xl border-b border-admin-border py-4 px-8 flex items-center justify-between">
      <div className="flex items-center gap-4">
         <button onClick={toggleSidebar} className="p-2 hover:bg-white/5 rounded-lg text-neutral-400">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
         </button>
         <div className="hidden md:flex items-center gap-2 text-sm text-neutral-500">
            <span>Admin</span>
            <ChevronRight size={14} />
            <span className="text-white font-medium capitalize prose-sm">Dashboard Overview</span>
         </div>
      </div>

      <div className="flex items-center gap-6">
         <div className="hidden sm:flex items-center bg-admin-sidebar border border-admin-border rounded-xl px-4 py-2 gap-3 focus-within:ring-1 ring-admin-accent transition-all">
            <Search size={18} className="text-neutral-500" />
            <input type="text" placeholder="Search data..." className="bg-transparent border-none outline-none text-sm text-white w-40" />
         </div>

         <div className="flex items-center gap-4 border-l border-admin-border pl-6">
            <button className="relative p-2 text-neutral-400 hover:text-white transition-colors">
               <Bell size={20} />
               <span className="absolute top-2 right-2 w-2 h-2 bg-admin-accent rounded-full border-2 border-admin-bg" />
            </button>
            <div className="flex items-center gap-3">
               <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-white">{userInfo?.name || 'Admin User'}</p>
                  <p className="text-[10px] text-neutral-500 uppercase tracking-widest">{userInfo?.role || 'Overseer'}</p>
               </div>
               <div className="w-10 h-10 bg-gradient-to-br from-admin-accent to-purple-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-admin-accent/20">
                  {userInfo?.name?.[0].toUpperCase() || 'A'}
               </div>
            </div>
         </div>
      </div>
    </header>
  );
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-admin-bg font-inter text-neutral-400">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div className={`transition-all duration-500 ${isSidebarOpen ? "lg:ml-72" : "lg:ml-20"}`}>
        <Topbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} sidebarOpen={isSidebarOpen} />
        <main className="p-8 lg:p-12">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
