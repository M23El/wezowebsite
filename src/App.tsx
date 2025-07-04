import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import ProductsPage from "./app/products/page";
import CategoryProductsPage from "./app/products/[category]/page";
import ProductDetailPage from "./app/products/[id]/page";
import CartPage from "./app/cart/page";
import CheckoutPage from "./app/checkout/page";
import OrderConfirmationPage from "./app/order-confirmation/page";
import LoginPage from "./app/auth/login/page";
import RegisterPage from "./app/auth/register/page";
import ProfileSettings from "./app/profile/settings/page";
import WishlistPage from "./app/wishlist/page";
import SellerDashboard from "./app/seller/dashboard/page";
import AdminDashboard from "./app/admin/dashboard/page";
import { ToastProvider } from "@/components/ui/toast-simple";
import routes from "tempo-routes";

function App() {
  return (
    <ToastProvider>
      <Suspense fallback={<p>Loading...</p>}>
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route
              path="/products/detail/:id"
              element={<ProductDetailPage />}
            />
            <Route
              path="/products/:category"
              element={<CategoryProductsPage />}
            />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route
              path="/order-confirmation"
              element={<OrderConfirmationPage />}
            />
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/register" element={<RegisterPage />} />
            <Route path="/profile/settings" element={<ProfileSettings />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/seller/dashboard" element={<SellerDashboard />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        </>
      </Suspense>
    </ToastProvider>
  );
}

export default App;
