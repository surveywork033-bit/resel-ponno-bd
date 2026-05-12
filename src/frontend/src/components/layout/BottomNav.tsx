import { Link, useRouterState } from "@tanstack/react-router";
import { BarChart2, Home, ShoppingBag, User } from "lucide-react";
import { useAppContext } from "../../context/AppContext";

const tabs = [
  { to: "/", icon: Home, label: "হোম", ocid: "nav.home_tab" },
  {
    to: "/products",
    icon: ShoppingBag,
    label: "নতুন পণ্য",
    ocid: "nav.products_tab",
  },
  { to: "/daily", icon: BarChart2, label: "প্রতিদিন", ocid: "nav.daily_tab" },
  { to: "/profile", icon: User, label: "প্রোফাইল", ocid: "nav.profile_tab" },
] as const;

export default function BottomNav() {
  const { state } = useAppContext();
  const cartCount = state.cart.reduce((sum, i) => sum + i.quantity, 0);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 h-16 bg-card border-t border-border max-w-[430px] mx-auto"
      aria-label="মূল নেভিগেশন"
    >
      <div className="flex items-stretch h-full">
        {tabs.map(({ to, icon: Icon, label, ocid }) => {
          const isActive =
            to === "/" ? pathname === "/" : pathname.startsWith(to);
          return (
            <Link
              key={to}
              to={to}
              data-ocid={ocid}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 relative transition-smooth ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {isActive && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-b-full" />
              )}
              <div className="relative">
                <Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
                {to === "/products" && cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[9px] font-bold rounded-full min-w-[16px] h-[16px] flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] font-body ${isActive ? "font-bold" : "font-normal"}`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
