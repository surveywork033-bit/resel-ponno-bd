import {
  AlertTriangle,
  ArrowDownToLine,
  BadgeCheck,
  Banknote,
  BookMarked,
  BookOpen,
  Briefcase,
  ClipboardList,
  DollarSign,
  Facebook,
  Gift,
  Globe,
  Handshake,
  Heart,
  Home,
  Layers,
  MapPin,
  Megaphone,
  MessageCircle,
  Monitor,
  PackagePlus,
  Percent,
  PiggyBank,
  Radio,
  Search,
  Send,
  ShoppingCart,
  Smartphone,
  Store,
  Tag,
  TrendingUp,
  Video,
  Wallet,
  Youtube,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { ComponentType } from "react";

// ─── Banner data ─────────────────────────────────────────────────────────────
const banners = [
  {
    bg: "from-green-700 to-green-500",
    tag: "🔥 সেরা অফার",
    title: "রিসেলার হিসেবে আজই শুরু করুন",
    subtitle: "হাজারো পণ্য থেকে বেছে নিন এবং সহজে আয় করুন",
  },
  {
    bg: "from-red-700 to-orange-500",
    tag: "⚡ ফ্ল্যাশ সেল",
    title: "৫০% পর্যন্ত ছাড় পাচ্ছেন আজই",
    subtitle: "সীমিত সময়ের অফার — এখনই সুযোগ নিন",
  },
  {
    bg: "from-blue-700 to-cyan-500",
    tag: "💎 প্রিমিয়াম",
    title: "ভেরিফাইড প্রোডাক্ট থেকে আয় করুন",
    subtitle: "১০০% আসল পণ্য, নিশ্চিত লাভ এবং দ্রুত ডেলিভারি",
  },
  {
    bg: "from-purple-700 to-pink-500",
    tag: "🎁 বিশেষ অফার",
    title: "প্রতিদিন নতুন প্রোডাক্ট যোগ হচ্ছে",
    subtitle: "সর্বশেষ ট্রেন্ডিং পণ্য সবার আগে পান",
  },
];

// ─── Social links data ────────────────────────────────────────────────────────
const socialLinks = [
  { label: "ফেসবুক", bg: "bg-blue-600", Icon: Facebook, href: "#" },
  { label: "ইউটিউব", bg: "bg-red-600", Icon: Youtube, href: "#" },
  { label: "টেলিগ্রাম", bg: "bg-sky-500", Icon: Send, href: "#" },
  { label: "মেসেঞ্জার", bg: "bg-purple-600", Icon: MessageCircle, href: "#" },
];

// ─── Dashboard grid items ─────────────────────────────────────────────────────
type GridItem = { label: string; Icon: ComponentType<{ className?: string }> };

const gridItems: GridItem[] = [
  { label: "রিসেলিং প্রোডাক্ট", Icon: ShoppingCart },
  { label: "প্রোডাক্ট সার্চ", Icon: Search },
  { label: "রিসেলারের ব্লগ", Icon: BookOpen },
  { label: "ই-কমার্স", Icon: Store },
  { label: "লাইভ রেজিস্ট্রেশন", Icon: Radio },
  { label: "ভেরিফাইড প্রোডাক্ট", Icon: BadgeCheck },
  { label: "মোবাইল রিচার্জ", Icon: Smartphone },
  { label: "নিয়োগপ্রাপ্তি", Icon: Briefcase },
  { label: "ঘরবাড়ি", Icon: Home },
  { label: "জেনুইন মার্কেটিং", Icon: Megaphone },
  { label: "নতুন প্রোডাক্ট", Icon: PackagePlus },
  { label: "ওয়ালেট", Icon: Wallet },
  { label: "ফেভারিট প্রোডাক্ট", Icon: Heart },
  { label: "লাভের নিশ্চয়তা", Icon: TrendingUp },
  { label: "উত্তোলন", Icon: ArrowDownToLine },
  { label: "৫% ক্যাশব্যাক", Icon: Percent },
  { label: "মাইক্রোজব", Icon: ClipboardList },
  { label: "জব লোকেশন", Icon: MapPin },
  { label: "বিনিয়োগ", Icon: PiggyBank },
  { label: "প্রোডাক্ট বিক্রি করুন", Icon: Tag },
  { label: "লোন", Icon: Banknote },
  { label: "ডিজিটাল সেল", Icon: Monitor },
  { label: "পার্টনারশিপ", Icon: Handshake },
  { label: "অনলাইন সার্ভিস", Icon: Globe },
  { label: "এক ক্লিক ফ্রি ইনকাম", Icon: Zap },
  { label: "ক্যাশব্যাক অর্ডার সেল", Icon: Gift },
  { label: "যত অফারের প্রোডাক্ট", Icon: Layers },
  { label: "মার্কেটিং প্রোডাক্ট নিয়ম", Icon: BookMarked },
  { label: "দৈনিক ইনকাম দেখুন", Icon: DollarSign },
  { label: "অনলাইন লাইভ প্রো", Icon: Video },
];

// ─── Banner Carousel ──────────────────────────────────────────────────────────
function BannerCarousel() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % banners.length);
    }, 3000);
  };

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % banners.length);
    }, 3000);
    timerRef.current = id;
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goTo = (idx: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setCurrent(idx);
    startTimer();
  };

  return (
    <div
      className="relative rounded-2xl overflow-hidden mx-4 mt-4 shadow-lg"
      style={{ height: 180 }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          className={`absolute inset-0 bg-gradient-to-br ${banners[current].bg} flex flex-col justify-center px-5 py-4`}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
        >
          <span className="text-xs font-semibold text-white/80 mb-1">
            {banners[current].tag}
          </span>
          <h2 className="text-lg font-bold text-white leading-snug mb-1">
            {banners[current].title}
          </h2>
          <p className="text-xs text-white/75 mb-3 leading-relaxed">
            {banners[current].subtitle}
          </p>
          <button
            type="button"
            data-ocid="banner.cta_button"
            className="self-start bg-white text-green-700 text-xs font-bold px-4 py-1.5 rounded-full shadow hover:bg-green-50 transition-smooth"
          >
            এখনই অর্ডার করুন
          </button>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {banners.map((b, i) => (
          <button
            key={b.tag}
            type="button"
            data-ocid={`banner.dot.${i + 1}`}
            onClick={() => goTo(i)}
            className={`w-2 h-2 rounded-full transition-smooth ${
              i === current ? "bg-white scale-125" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Social Links Row ─────────────────────────────────────────────────────────
function SocialLinksRow() {
  return (
    <div className="flex justify-center gap-4 px-4 mt-5">
      {socialLinks.map(({ label, bg, Icon, href }) => (
        <a
          key={label}
          href={href}
          data-ocid={`social.${label}`}
          className="flex flex-col items-center gap-1"
        >
          <motion.div
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.08 }}
            className={`${bg} w-12 h-12 rounded-2xl flex items-center justify-center shadow-md`}
          >
            <Icon className="text-white w-6 h-6" />
          </motion.div>
          <span className="text-[11px] text-muted-foreground font-medium">
            {label}
          </span>
        </a>
      ))}
    </div>
  );
}

// ─── Notice Section ───────────────────────────────────────────────────────────
function NoticeSection() {
  return (
    <div
      data-ocid="notice.section"
      className="mx-4 mt-5 rounded-xl border border-yellow-300 bg-yellow-50 dark:bg-yellow-950/30 dark:border-yellow-700 px-3 py-2.5"
    >
      <div className="flex items-center gap-2 mb-1.5">
        <AlertTriangle className="w-4 h-4 text-yellow-600 flex-shrink-0" />
        <span className="text-sm font-bold text-yellow-800 dark:text-yellow-300">
          গুরুত্বপূর্ণ নোটিশ
        </span>
      </div>
      <div className="overflow-hidden">
        <p className="whitespace-nowrap text-xs text-yellow-700 dark:text-yellow-400 animate-marquee">
          🔔 নতুন প্রোডাক্ট যোগ হয়েছে! এখনই অর্ডার করুন এবং ৫% ক্যাশব্যাক পান। &nbsp;|  📦
          দ্রুত ডেলিভারি সুবিধা পাচ্ছেন সারাদেশে। &nbsp;|  💰 রেফারেল করুন এবং প্রতিটি অর্ডারে
          বোনাস পান। &nbsp;|  🎯 আজকের সেরা অফার মিস করবেন না — সীমিত সময়ের জন্য।
        </p>
      </div>
      <button
        type="button"
        data-ocid="notice.details_button"
        className="mt-2 text-xs font-semibold text-green-700 dark:text-green-400 hover:underline"
      >
        বিস্তারিত দেখুন →
      </button>
    </div>
  );
}

// ─── Dashboard Grid ───────────────────────────────────────────────────────────
function DashboardGrid() {
  return (
    <div className="px-3 mt-5 mb-6">
      <h3 className="text-sm font-bold text-foreground px-1 mb-3">ড্যাশবোর্ড</h3>
      <div className="grid grid-cols-4 gap-2">
        {gridItems.map(({ label, Icon }, idx) => (
          <motion.button
            key={label}
            type="button"
            data-ocid={`dashboard.item.${idx + 1}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.025, duration: 0.3 }}
            className="flex flex-col items-center justify-center gap-1.5 bg-card rounded-xl p-2 shadow-sm border border-border hover:shadow-md hover:border-green-300 transition-smooth"
          >
            <div className="w-9 h-9 rounded-full bg-green-50 dark:bg-green-900/30 flex items-center justify-center">
              <Icon className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
            <span className="text-[9px] leading-tight text-center text-foreground font-medium line-clamp-2">
              {label}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <motion.div
      data-ocid="home.page"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="pb-4"
    >
      <BannerCarousel />
      <SocialLinksRow />
      <NoticeSection />
      <DashboardGrid />
    </motion.div>
  );
}
