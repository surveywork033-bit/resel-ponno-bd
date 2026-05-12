import { Bell, Menu, Wallet } from "lucide-react";
import { useAppContext } from "../../context/AppContext";

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const { state } = useAppContext();
  const cartCount = state.cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 h-14 bg-primary shadow-md"
      style={{ maxWidth: "430px", margin: "0 auto" }}
    >
      <div className="flex items-center justify-between h-full px-4 max-w-[430px] mx-auto">
        {/* Hamburger */}
        <button
          data-ocid="header.menu_button"
          onClick={onMenuClick}
          className="text-primary-foreground p-1 rounded-lg hover:bg-primary-foreground/20 transition-smooth"
          aria-label="মেনু খুলুন"
          type="button"
        >
          <Menu size={24} />
        </button>

        {/* Logo */}
        <h1 className="font-bold text-lg text-primary-foreground font-display tracking-wide">
          রিসেল পণ্য{" "}
          <span className="bg-primary-foreground/20 px-1 rounded">BD</span>
        </h1>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          {/* Bell notification */}
          <button
            data-ocid="header.bell_button"
            className="relative text-primary-foreground p-1 rounded-lg hover:bg-primary-foreground/20 transition-smooth"
            aria-label="নোটিফিকেশন"
            type="button"
          >
            <Bell size={22} />
            {state.notifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center">
                {state.notifications}
              </span>
            )}
          </button>

          {/* Balance pill */}
          <button
            data-ocid="header.balance_button"
            className="flex items-center gap-1 bg-primary-foreground text-primary text-xs font-bold rounded-full px-3 py-1.5 hover:bg-primary-foreground/90 transition-smooth"
            aria-label="ব্যালেন্স দেখুন"
            type="button"
          >
            <Wallet size={13} />
            <span>৳{state.walletBalance.toLocaleString("bn-BD")}</span>
          </button>
        </div>
      </div>

      {cartCount > 0 && (
        <div className="sr-only" aria-live="polite">
          কার্টে {cartCount}টি আইটেম
        </div>
      )}
    </header>
  );
}
