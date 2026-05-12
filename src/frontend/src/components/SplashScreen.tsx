import { motion } from "motion/react";

interface SplashScreenProps {
  onDone: () => void;
}

export default function SplashScreen({ onDone }: SplashScreenProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-primary"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      onAnimationComplete={onDone}
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        className="flex flex-col items-center gap-4"
        onAnimationComplete={() => {
          setTimeout(onDone, 900);
        }}
      >
        <motion.div
          className="w-24 h-24 rounded-2xl bg-primary-foreground/20 flex items-center justify-center shadow-2xl"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <span className="text-4xl">🛒</span>
        </motion.div>
        <motion.h1
          className="text-3xl font-bold text-primary-foreground font-display"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          রিসেল পণ্য BD
        </motion.h1>
        <motion.p
          className="text-primary-foreground/70 text-sm"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          সেরা রিসেলার প্ল্যাটফর্ম
        </motion.p>
        <motion.div
          className="mt-4 flex gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-primary-foreground/60"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 0.6, delay: i * 0.15, repeat: 2 }}
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
