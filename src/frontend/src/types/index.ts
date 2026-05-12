export interface Product {
  id: number;
  namebn: string;
  price: number;
  discountPercent: number;
  resellerProfit: number;
  category: string;
  image: string;
  description?: string;
}

export interface User {
  id: string;
  name: string;
  mobile: string;
  email: string;
  address: string;
  avatarUrl?: string;
  referralCode: string;
  joinedDate: string;
}

export interface Order {
  id: string;
  productName: string;
  date: string;
  amount: number;
  status: "সম্পন্ন" | "প্রক্রিয়াধীন" | "বাতিল";
  quantity: number;
}

export interface IncomeEntry {
  id: string;
  date: string;
  source: string;
  amount: number;
  type: "কমিশন" | "বোনাস" | "রেফারেল";
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface DailyStats {
  todayIncome: number;
  todayOrders: number;
  todayCommission: number;
  newUsers: number;
}

export interface WeeklyStat {
  day: string;
  sales: number;
  orders: number;
}

export interface Notification {
  id: string;
  message: string;
  time: string;
  read: boolean;
}
