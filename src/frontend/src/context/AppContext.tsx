import type React from "react";
import { createContext, useContext, useEffect, useReducer } from "react";
import { userProfile } from "../data/fakeData";
import type { CartItem, User } from "../types";

interface AppState {
  user: User;
  walletBalance: number;
  cart: CartItem[];
  darkMode: boolean;
  notifications: number;
}

type AppAction =
  | { type: "SET_DARK_MODE"; payload: boolean }
  | { type: "ADD_TO_CART"; payload: CartItem }
  | { type: "REMOVE_FROM_CART"; payload: number }
  | { type: "SET_WALLET"; payload: number }
  | { type: "SET_NOTIFICATIONS"; payload: number }
  | { type: "SET_USER"; payload: User };

const defaultState: AppState = {
  user: userProfile,
  walletBalance: 5240,
  cart: [],
  darkMode: false,
  notifications: 3,
};

function loadState(): AppState {
  try {
    const saved = localStorage.getItem("reselbd-state");
    if (saved) {
      const parsed = JSON.parse(saved) as Partial<AppState>;
      return { ...defaultState, ...parsed };
    }
  } catch {
    /* ignore */
  }
  return defaultState;
}

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_DARK_MODE":
      return { ...state, darkMode: action.payload };
    case "ADD_TO_CART": {
      const exists = state.cart.find(
        (i) => i.product.id === action.payload.product.id,
      );
      if (exists) {
        return {
          ...state,
          cart: state.cart.map((i) =>
            i.product.id === action.payload.product.id
              ? { ...i, quantity: i.quantity + action.payload.quantity }
              : i,
          ),
        };
      }
      return { ...state, cart: [...state.cart, action.payload] };
    }
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((i) => i.product.id !== action.payload),
      };
    case "SET_WALLET":
      return { ...state, walletBalance: action.payload };
    case "SET_NOTIFICATIONS":
      return { ...state, notifications: action.payload };
    case "SET_USER":
      return { ...state, user: action.payload };
    default:
      return state;
  }
}

interface AppContextValue {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, undefined, loadState);

  useEffect(() => {
    try {
      localStorage.setItem("reselbd-state", JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state]);

  useEffect(() => {
    if (state.darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [state.darkMode]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within AppProvider");
  return ctx;
}
