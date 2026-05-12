import { useNavigate } from "@tanstack/react-router";
import {
  Headphones,
  Home,
  LogOut,
  Moon,
  Package,
  Settings,
  Sun,
  TrendingUp,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useAppContext } from "../../context/AppContext";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { icon: Home, label: "হোম", to: "/" as const },
  { icon: Package, label: "আমার অর্ডার", to: "/products" as const },
  { icon: Wallet, label: "ওয়ালেট", to: "/profile" as const },
  { icon: TrendingUp, label: "ইনকাম রিপোর্ট", to: "/daily" as const },
  { icon: Users, label: "রেফারেল", to: "/profile" as const },
  { icon: Settings, label: "সেটিংস", to: "/profile" as const },
  { icon: Headphones, label: "কাস্টমার সাপোর্ট", to: "/profile" as const },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();

  const handleNav = (to: string) => {
    void navigate({ to });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            data-ocid="sidebar.backdrop"
            className="fixed inset-0 z-50 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.aside
            data-ocid="sidebar.panel"
            className="fixed left-0 top-0 bottom-0 z-50 w-72 bg-card flex flex-col shadow-2xl"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 250 }}
          >
            {/* Sidebar header */}
            <div className="bg-primary px-5 pt-10 pb-6 flex items-center justify-between">
              <div>
                <h2 className="text-primary-foreground font-bold text-xl font-display">
                  রিসেল পণ্য BD
                </h2>
                <p className="text-primary-foreground/70 text-sm mt-0.5">
                  {state.user.name}
                </p>
              </div>
              <button
                type="button"
                data-ocid="sidebar.close_button"
                onClick={onClose}
                className="text-primary-foreground/80 hover:text-primary-foreground p-1 rounded-lg transition-smooth"
                aria-label="সাইডবার বন্ধ করুন"
              >
                <X size={22} />
              </button>
            </div>

            {/* Menu items */}
            <nav className="flex-1 overflow-y-auto py-2">
              {menuItems.map(({ icon: Icon, label, to }, idx) => (
                <motion.button
                  key={label}
                  type="button"
                  data-ocid={`sidebar.menu_item.${idx + 1}`}
                  onClick={() => handleNav(to)}
                  className="w-full flex items-center gap-3 px-5 py-3.5 text-foreground hover:bg-muted transition-smooth text-left"
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon size={20} className="text-primary" />
                  <span className="font-body text-[15px]">{label}</span>
                </motion.button>
              ))}

              <div className="h-px bg-border mx-4 my-2" />

              <motion.button
                type="button"
                data-ocid="sidebar.logout_button"
                onClick={onClose}
                className="w-full flex items-center gap-3 px-5 py-3.5 text-destructive hover:bg-muted transition-smooth text-left"
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <LogOut size={20} />
                <span className="font-body text-[15px]">লগআউট</span>
              </motion.button>
            </nav>

            {/* Dark mode toggle at bottom */}
            <div className="border-t border-border p-4">
              <button
                type="button"
                data-ocid="sidebar.darkmode_toggle"
                onClick={() =>
                  dispatch({ type: "SET_DARK_MODE", payload: !state.darkMode })
                }
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-muted hover:bg-muted/80 transition-smooth"
              >
                <div className="flex items-center gap-3">
                  {state.darkMode ? (
                    <Moon size={18} className="text-primary" />
                  ) : (
                    <Sun size={18} className="text-primary" />
                  )}
                  <span className="font-body text-sm text-foreground">
                    {state.darkMode ? "ডার্ক মোড" : "লাইট মোড"}
                  </span>
                </div>
                <div
                  className={`w-10 h-5 rounded-full transition-smooth relative ${state.darkMode ? "bg-primary" : "bg-border"}`}
                >
                  <div
                    className={`absolute top-0.5 w-4 h-4 rounded-full bg-card shadow transition-smooth ${state.darkMode ? "left-5" : "left-0.5"}`}
                  />
                </div>
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
