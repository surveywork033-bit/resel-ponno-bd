import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { AnimatePresence } from "motion/react";
import { useState } from "react";
import SplashScreen from "./components/SplashScreen";
import AppShell from "./components/layout/AppShell";
import { AppProvider } from "./context/AppContext";
import DailyPage from "./pages/DailyPage";
import HomePage from "./pages/HomePage";
import NewProductPage from "./pages/NewProductPage";
import ProfilePage from "./pages/ProfilePage";

const rootRoute = createRootRoute({
  component: () => (
    <AppShell>
      <Outlet />
    </AppShell>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});
const productsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/products",
  component: NewProductPage,
});
const dailyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/daily",
  component: DailyPage,
});
const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: ProfilePage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  productsRoute,
  dailyRoute,
  profileRoute,
]);
const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default function App() {
  const [splashDone, setSplashDone] = useState(false);

  return (
    <AppProvider>
      <AnimatePresence mode="wait">
        {!splashDone ? (
          <SplashScreen key="splash" onDone={() => setSplashDone(true)} />
        ) : (
          <AppRouter key="app" />
        )}
      </AnimatePresence>
    </AppProvider>
  );
}
