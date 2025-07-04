"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/ProductGrid";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { categories } from "@/lib/data";

const CategoryProductsPage = () => {
  const { category } = useParams();
  const { language, getText } = useAppStore();
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    const foundCategory = categories.find((cat) => cat.id === category);
    if (foundCategory) {
      setCategoryName(
        language === "en" ? foundCategory.name.en : foundCategory.name.ar,
      );
    }
  }, [category, language]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
            <a href="/" className="hover:text-blue-600">
              {getText("Home", "الرئيسية")}
            </a>
            <span>/</span>
            <a href="/products" className="hover:text-blue-600">
              {getText("Products", "المنتجات")}
            </a>
            <span>/</span>
            <span className="text-gray-900">{categoryName}</span>
          </div>

          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => window.history.back()}
            className="mb-6"
          >
            <ArrowLeft
              className={`h-4 w-4 ${language === "ar" ? "rotate-180 ml-2" : "mr-2"}`}
            />
            {getText("Back", "رجوع")}
          </Button>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {categoryName}
            </h1>
            <p className="text-gray-600">
              {getText(
                `Discover products in ${categoryName}`,
                `اكتشف المنتجات في ${categoryName}`,
              )}
            </p>
          </div>

          <ProductGrid language={language} selectedCategory={category} />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CategoryProductsPage;
