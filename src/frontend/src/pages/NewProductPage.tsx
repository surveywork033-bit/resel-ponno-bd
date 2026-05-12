import { Search, ShoppingCart, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { products } from "../data/fakeData";
import type { Product } from "../types";

const CATEGORIES = ["সব", "ইলেকট্রনিক্স", "ফ্যাশন", "গৃহস্থালি", "বিউটি", "খাদ্য"];

function Toast({ message, visible }: { message: string; visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-[#16a34a] text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg pointer-events-none"
          data-ocid="products.success_state"
        >
          ✓ {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ProductCard({
  product,
  index,
  onAddToCart,
}: {
  product: Product;
  index: number;
  onAddToCart: (p: Product) => void;
}) {
  const discountedPrice = Math.round(
    product.price * (1 - product.discountPercent / 100),
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      whileHover={{ scale: 1.02 }}
      className="relative bg-card rounded-2xl shadow-sm border border-border overflow-hidden flex flex-col"
      data-ocid={`products.item.${index + 1}`}
    >
      {product.discountPercent > 0 && (
        <span className="absolute top-2 left-2 z-10 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
          -{product.discountPercent}%
        </span>
      )}

      <div className="relative w-full aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.namebn}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="p-2.5 flex flex-col gap-1 flex-1">
        <p className="text-foreground text-xs font-semibold leading-snug line-clamp-2">
          {product.namebn}
        </p>

        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="text-[#16a34a] font-bold text-sm">
            ৳{discountedPrice}
          </span>
          {product.discountPercent > 0 && (
            <span className="text-muted-foreground text-[10px] line-through">
              ৳{product.price}
            </span>
          )}
        </div>

        <p className="text-[#16a34a] text-[10px] font-medium">
          লাভ: ৳{product.resellerProfit}
        </p>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => onAddToCart(product)}
          className="mt-auto w-full bg-[#16a34a] hover:bg-[#15803d] text-white text-xs font-semibold py-1.5 rounded-lg transition-smooth flex items-center justify-center gap-1"
          data-ocid={`products.add_button.${index + 1}`}
          type="button"
        >
          <ShoppingCart size={12} />
          কার্টে যোগ করুন
        </motion.button>
      </div>
    </motion.div>
  );
}

export default function NewProductPage() {
  const { state, dispatch } = useAppContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("সব");
  const [toastVisible, setToastVisible] = useState(false);
  const [toastTimer, setToastTimer] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);

  const cartCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  const filtered = products.filter((p) => {
    const matchesSearch = p.namebn
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "সব" || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = useCallback(
    (product: Product) => {
      dispatch({ type: "ADD_TO_CART", payload: { product, quantity: 1 } });
      setToastVisible(true);
      if (toastTimer) clearTimeout(toastTimer);
      const t = setTimeout(() => setToastVisible(false), 2200);
      setToastTimer(t);
    },
    [dispatch, toastTimer],
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col min-h-full"
      data-ocid="products.page"
    >
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm border-b border-border px-3 pt-3 pb-2 space-y-2">
        <div className="flex items-center justify-between">
          <h1 className="text-base font-bold text-foreground">নতুন প্রোডাক্ট</h1>
          <div className="relative" data-ocid="products.cart_count">
            <ShoppingCart size={22} className="text-foreground" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </div>
        </div>

        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="পণ্য খুঁজুন..."
            className="w-full pl-9 pr-9 py-2 text-sm bg-muted rounded-xl border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#16a34a] transition-smooth"
            data-ocid="products.search_input"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              data-ocid="products.clear_search_button"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div
          className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide"
          data-ocid="products.category_filter"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-semibold transition-smooth ${
                activeCategory === cat
                  ? "bg-[#16a34a] text-white shadow-sm"
                  : "bg-muted text-muted-foreground hover:bg-muted/70"
              }`}
              data-ocid={`products.category_tab.${cat}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 p-3">
        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-16 gap-4"
            data-ocid="products.empty_state"
          >
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
              <Search size={36} className="text-muted-foreground" />
            </div>
            <div className="text-center">
              <p className="text-foreground font-semibold text-base">
                কোনো পণ্য পাওয়া যায়নি
              </p>
              <p className="text-muted-foreground text-sm mt-1">
                অন্য কীওয়ার্ড বা ক্যাটাগরি দিয়ে চেষ্টা করুন
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("সব");
              }}
              className="px-5 py-2 bg-[#16a34a] text-white rounded-xl text-sm font-semibold transition-smooth hover:bg-[#15803d]"
              data-ocid="products.reset_filter_button"
            >
              সব পণ্য দেখুন
            </button>
          </motion.div>
        ) : (
          <>
            <p className="text-muted-foreground text-xs mb-3">
              {filtered.length}টি পণ্য পাওয়া গেছে
            </p>
            <div className="grid grid-cols-2 gap-3">
              {filtered.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <Toast message="কার্টে যোগ হয়েছে!" visible={toastVisible} />
    </motion.div>
  );
}
