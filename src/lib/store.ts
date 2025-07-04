import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  images?: string[];
  rating: number;
  seller: string;
  category: string;
  description?: string;
  stock?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

interface AppState {
  language: "ar" | "en";
  isAuthModalOpen: boolean;
  isSellerModalOpen: boolean;
  user: {
    id?: string;
    name?: string;
    email?: string;
    type?: "buyer" | "seller" | "admin";
  } | null;
  cart: CartItem[];
  wishlist: Product[];
  setLanguage: (language: "ar" | "en") => void;
  setAuthModalOpen: (open: boolean) => void;
  setSellerModalOpen: (open: boolean) => void;
  setUser: (user: AppState["user"]) => void;
  getText: (en: string, ar: string) => string;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  cartTotal: number;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      language: "ar",
      isAuthModalOpen: false,
      isSellerModalOpen: false,
      user: null,
      cart: [],
      wishlist: [],
      setLanguage: (language) => {
        set({ language });
        if (typeof document !== "undefined") {
          document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
          document.documentElement.lang = language;
        }
      },
      setAuthModalOpen: (open) => set({ isAuthModalOpen: open }),
      setSellerModalOpen: (open) => set({ isSellerModalOpen: open }),
      setUser: (user) => set({ user }),
      getText: (en, ar) => (get().language === "en" ? en : ar),
      addToCart: (product, quantity = 1) => {
        const { cart } = get();
        const existingItem = cart.find((item) => item.id === product.id);

        if (existingItem) {
          set({
            cart: cart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item,
            ),
          });
        } else {
          set({ cart: [...cart, { ...product, quantity }] });
        }
      },
      removeFromCart: (productId) => {
        const { cart } = get();
        set({ cart: cart.filter((item) => item.id !== productId) });
      },
      updateCartQuantity: (productId, quantity) => {
        const { cart } = get();
        set({
          cart: cart.map((item) =>
            item.id === productId ? { ...item, quantity } : item,
          ),
        });
      },
      clearCart: () => set({ cart: [] }),
      addToWishlist: (product) => {
        const { wishlist } = get();
        if (!wishlist.find((item) => item.id === product.id)) {
          set({ wishlist: [...wishlist, product] });
        }
      },
      removeFromWishlist: (productId) => {
        const { wishlist } = get();
        set({ wishlist: wishlist.filter((item) => item.id !== productId) });
      },
      isInWishlist: (productId) => {
        const { wishlist } = get();
        return wishlist.some((item) => item.id === productId);
      },
      get cartTotal() {
        const { cart } = get();
        return cart.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        );
      },
    }),
    {
      name: "wezo-app-store",
      partialize: (state) => ({
        language: state.language,
        user: state.user,
        cart: state.cart,
        wishlist: state.wishlist,
      }),
    },
  ),
);
