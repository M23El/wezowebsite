"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/ProductGrid";
import { useAppStore } from "@/lib/store";

const ProductsPage = () => {
  const { language, getText } = useAppStore();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {getText("All Products", "جميع المنتجات")}
            </h1>
            <p className="text-gray-600">
              {getText(
                "Discover thousands of products from trusted sellers",
                "اكتشف آلاف المنتجات من البائعين الموثوقين",
              )}
            </p>
          </div>

          <ProductGrid language={language} />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductsPage;
