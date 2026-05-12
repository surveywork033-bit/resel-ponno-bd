import {
  ChevronDown,
  ChevronUp,
  Edit,
  Gift,
  Link2,
  Lock,
  LogOut,
  Mail,
  MapPin,
  Phone,
  Share2,
  TrendingUp,
  User,
  Wallet,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { incomeHistory, orderHistory, userProfile } from "../data/fakeData";
import type { IncomeEntry, Order } from "../types";

const REFERRAL_TOTAL = 18;
const REFERRAL_EARNINGS = 3600;

// --- Status Badge ---
function StatusBadge({ status }: { status: Order["status"] }) {
  const map: Record<Order["status"], { label: string; cls: string }> = {
    সম্পন্ন: {
      label: "সম্পন্ন",
      cls: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
    },
    প্রক্রিয়াধীন: {
      label: "প্রক্রিয়াধীন",
      cls: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300",
    },
    বাতিল: {
      label: "বাতিল",
      cls: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
    },
  };
  const { label, cls } = map[status];
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${cls}`}>
      {label}
    </span>
  );
}

// --- Income Type Badge ---
function TypeBadge({ type }: { type: IncomeEntry["type"] }) {
  const map: Record<IncomeEntry["type"], string> = {
    কমিশন: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    বোনাস: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
    রেফারেল:
      "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
  };
  return (
    <span
      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${map[type]}`}
    >
      {type}
    </span>
  );
}

// --- Accordion Section ---
function AccordionSection({
  title,
  icon,
  children,
  ocid,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  ocid: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3.5 transition-smooth hover:bg-muted/30"
        data-ocid={ocid}
      >
        <div className="flex items-center gap-2.5">
          <span className="text-primary">{icon}</span>
          <span className="font-semibold text-sm text-foreground">{title}</span>
        </div>
        <span className="text-muted-foreground">
          {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div className="px-4 pb-4 pt-1 border-t border-border/60">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Stagger Variants ---
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" as const },
  },
} as const;

export default function ProfilePage() {
  const { state } = useAppContext();

  return (
    <motion.div
      className="px-4 py-5 space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Section 1 — Avatar & Identity */}
      <motion.div
        variants={cardVariants}
        className="flex flex-col items-center gap-2 py-6 bg-card rounded-2xl shadow-sm border border-border"
        data-ocid="profile.header_card"
      >
        <div className="relative">
          <div className="w-24 h-24 rounded-full ring-4 ring-primary/70 overflow-hidden shadow-lg">
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userProfile.name)}&background=16a34a&color=fff&size=100`}
              alt={userProfile.name}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="absolute bottom-0.5 right-0.5 w-5 h-5 bg-green-500 border-2 border-card rounded-full" />
        </div>
        <h2 className="text-lg font-bold text-foreground mt-1">
          {userProfile.name}
        </h2>
        <p className="text-sm text-muted-foreground">{userProfile.mobile}</p>
        <p className="text-xs text-muted-foreground">
          যোগদান: {userProfile.joinedDate}
        </p>
      </motion.div>

      {/* Section 2 — Wallet Balance */}
      <motion.div
        variants={cardVariants}
        className="rounded-2xl overflow-hidden shadow-md"
        data-ocid="profile.wallet_card"
      >
        <div
          className="px-5 py-5"
          style={{
            background:
              "linear-gradient(135deg, #16a34a 0%, #15803d 60%, #166534 100%)",
          }}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-white/80 text-xs font-medium mb-1">
                আমার ওয়ালেট
              </p>
              <p className="text-white text-3xl font-bold tracking-tight">
                ৳{state.walletBalance.toLocaleString("bn-BD")}
              </p>
              <p className="text-white/70 text-xs mt-1">মোট ব্যালেন্স</p>
            </div>
            <div className="bg-white/20 rounded-xl p-3">
              <Wallet size={26} className="text-white" />
            </div>
          </div>
          <button
            type="button"
            className="mt-4 w-full bg-white/20 hover:bg-white/30 text-white text-sm font-semibold py-2 rounded-xl transition-smooth border border-white/30"
            data-ocid="profile.withdraw_button"
          >
            টাকা উত্তোলন
          </button>
        </div>
      </motion.div>

      {/* Section 3 — User Info */}
      <motion.div
        variants={cardVariants}
        className="bg-card border border-border rounded-2xl shadow-sm divide-y divide-border"
        data-ocid="profile.info_card"
      >
        {[
          { icon: <User size={15} />, label: "নাম", value: userProfile.name },
          {
            icon: <Phone size={15} />,
            label: "মোবাইল",
            value: userProfile.mobile,
          },
          {
            icon: <Mail size={15} />,
            label: "ইমেইল",
            value: userProfile.email,
          },
          {
            icon: <MapPin size={15} />,
            label: "ঠিকানা",
            value: userProfile.address,
          },
        ].map(({ icon, label, value }) => (
          <div key={label} className="flex items-center gap-3 px-4 py-3">
            <span className="text-primary flex-shrink-0">{icon}</span>
            <span className="text-xs text-muted-foreground w-14 flex-shrink-0">
              {label}:
            </span>
            <span className="text-sm font-medium text-foreground truncate">
              {value}
            </span>
          </div>
        ))}
      </motion.div>

      {/* Section 4 — Action Buttons */}
      <motion.div variants={cardVariants} className="space-y-2.5">
        <button
          type="button"
          className="w-full flex items-center gap-3 px-4 py-3.5 bg-card border-2 border-primary/60 rounded-2xl text-primary font-semibold text-sm transition-smooth hover:bg-primary/5 shadow-sm"
          data-ocid="profile.edit_button"
        >
          <Edit size={16} />
          প্রোফাইল সম্পাদনা
        </button>
        <button
          type="button"
          className="w-full flex items-center gap-3 px-4 py-3.5 bg-card border-2 border-primary/60 rounded-2xl text-primary font-semibold text-sm transition-smooth hover:bg-primary/5 shadow-sm"
          data-ocid="profile.change_password_button"
        >
          <Lock size={16} />
          পাসওয়ার্ড পরিবর্তন
        </button>
        <button
          type="button"
          className="w-full flex items-center gap-3 px-4 py-3.5 bg-card border-2 border-destructive/60 rounded-2xl text-destructive font-semibold text-sm transition-smooth hover:bg-destructive/5 shadow-sm"
          data-ocid="profile.logout_button"
        >
          <LogOut size={16} />
          লগআউট
        </button>
      </motion.div>

      {/* Section 5 — Accordion Sections */}
      <motion.div variants={cardVariants} className="space-y-3 pb-2">
        <AccordionSection
          title="অর্ডার ইতিহাস"
          icon={<TrendingUp size={16} />}
          ocid="profile.order_history_toggle"
        >
          <div className="space-y-2.5 pt-1">
            {orderHistory.map((order, i) => (
              <div
                key={order.id}
                className="flex items-start justify-between gap-2 py-2.5 border-b border-border/50 last:border-0"
                data-ocid={`profile.order_item.${i + 1}`}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {order.productName}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {order.date}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                  <span className="text-sm font-bold text-foreground">
                    ৳{order.amount.toLocaleString()}
                  </span>
                  <StatusBadge status={order.status} />
                </div>
              </div>
            ))}
          </div>
        </AccordionSection>

        <AccordionSection
          title="ইনকাম ইতিহাস"
          icon={<Wallet size={16} />}
          ocid="profile.income_history_toggle"
        >
          <div className="space-y-2 pt-1">
            {incomeHistory.map((entry, i) => (
              <div
                key={entry.id}
                className="flex items-center justify-between py-2.5 border-b border-border/50 last:border-0"
                data-ocid={`profile.income_item.${i + 1}`}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {entry.source}
                  </p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <p className="text-xs text-muted-foreground">
                      {entry.date}
                    </p>
                    <TypeBadge type={entry.type} />
                  </div>
                </div>
                <span className="text-sm font-bold text-green-600 dark:text-green-400 ml-2 flex-shrink-0">
                  +৳{entry.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </AccordionSection>

        <AccordionSection
          title="রেফারেল তথ্য"
          icon={<Gift size={16} />}
          ocid="profile.referral_toggle"
        >
          <div className="space-y-3 pt-1">
            <div
              className="rounded-xl px-4 py-3 text-white text-center"
              style={{
                background: "linear-gradient(135deg, #16a34a 0%, #15803d 100%)",
              }}
              data-ocid="profile.referral_code_card"
            >
              <p className="text-xs text-white/80 mb-1">আপনার রেফারেল কোড</p>
              <div className="flex items-center justify-center gap-2">
                <span className="text-xl font-bold tracking-widest">
                  {userProfile.referralCode}
                </span>
                <Link2 size={16} className="text-white/70" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-muted/50 rounded-xl px-3 py-3 text-center">
                <p className="text-2xl font-bold text-foreground">
                  {REFERRAL_TOTAL}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  মোট রেফারেল
                </p>
              </div>
              <div className="bg-muted/50 rounded-xl px-3 py-3 text-center">
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  ৳{REFERRAL_EARNINGS.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">মোট আয়</p>
              </div>
            </div>
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-white transition-smooth hover:opacity-90 shadow-sm"
              style={{
                background: "linear-gradient(90deg, #16a34a, #15803d)",
              }}
              data-ocid="profile.share_referral_button"
            >
              <Share2 size={15} />
              লিংক শেয়ার করুন
            </button>
          </div>
        </AccordionSection>
      </motion.div>
    </motion.div>
  );
}
