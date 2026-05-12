import { useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import BottomNav from "./BottomNav";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useRouterState({ select: (s) => s.location });

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Center container — mobile-first 430px max */}
      <div className="relative max-w-[430px] mx-auto min-h-screen bg-background flex flex-col shadow-2xl">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        {/* Page content */}
        <main
          className="flex-1 pt-14 pb-16 overflow-y-auto"
          data-ocid="app.main_content"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
              className="h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>

        <BottomNav />

        {/* Sidebar rendered inside the container */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>
    </div>
  );
}
