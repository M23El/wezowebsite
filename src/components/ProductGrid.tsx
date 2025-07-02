"use client";

import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Check,
  ChevronDown,
  Filter,
  Grid3X3,
  LayoutGrid,
  List,
  SlidersHorizontal,
} from "lucide-react";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products?: Array<{
    id: string;
    title: string;
    price: number;
    image: string;
    rating: number;
    seller: string;
    category: string;
  }>;
  categories?: string[];
  language?: string;
}

const ProductGrid = ({
  products = [
    {
      id: "1",
      title: "سماعات لاسلكية فاخرة",
      price: 12999,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
      rating: 4.5,
      seller: "متجر الإلكترونيات",
      category: "electronics",
    },
    {
      id: "2",
      title: "حقيبة جلدية أنيقة",
      price: 8999,
      image:
        "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=500&q=80",
      rating: 4.2,
      seller: "متجر الأزياء",
      category: "fashion",
    },
    {
      id: "3",
      title: "ساعة ذكية متطورة",
      price: 19999,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
      rating: 4.8,
      seller: "متجر التكنولوجيا",
      category: "electronics",
    },
    {
      id: "4",
      title: "كرسي مكتب مريح",
      price: 14999,
      image:
        "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500&q=80",
      rating: 4.0,
      seller: "متجر الأثاث",
      category: "furniture",
    },
    {
      id: "5",
      title: "مجموعة عناية بالبشرة",
      price: 5999,
      image:
        "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500&q=80",
      rating: 4.7,
      seller: "متجر التجميل",
      category: "beauty",
    },
    {
      id: "6",
      title: "طاولة قهوة خشبية",
      price: 11999,
      image:
        "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=500&q=80",
      rating: 4.3,
      seller: "متجر الأثاث",
      category: "furniture",
    },
    {
      id: "7",
      title: "هاتف ذكي جديد",
      price: 49999,
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02ff9?w=500&q=80",
      rating: 4.9,
      seller: "متجر الإلكترونيات",
      category: "electronics",
    },
    {
      id: "8",
      title: "حذاء رياضي مريح",
      price: 7999,
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
      rating: 4.4,
      seller: "متجر الرياضة",
      category: "fashion",
    },
  ],
  categories = [
    "الكل",
    "الإلكترونيات",
    "الأزياء",
    "الأثاث",
    "التجميل",
    "الرياضة",
  ],
  language = "ar",
}: ProductGridProps) => {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState<number[]>([0, 10000000]);
  const [selectedCategory, setSelectedCategory] = useState<string>("الكل");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [showFilters, setShowFilters] = useState<boolean>(false);

  // Get currency symbol based on language
  const getCurrencySymbol = () => {
    return language === "en" ? "SDG" : "ج.س";
  };

  // Get text based on language
  const getText = (en: string, ar: string) => {
    return language === "en" ? en : ar;
  };

  // Get translated categories
  const getTranslatedCategories = () => {
    if (language === "en") {
      return ["All", "Electronics", "Fashion", "Furniture", "Beauty", "Sports"];
    }
    return categories;
  };

  const translatedCategories = getTranslatedCategories();

  // Filter products based on selected filters
  const filteredProducts = products.filter((product) => {
    const allCategory = language === "en" ? "All" : "الكل";
    const matchesCategory =
      selectedCategory === allCategory ||
      product.category === selectedCategory.toLowerCase();
    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesCategory && matchesPrice;
  });

  // Sort products based on selected sort option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      default:
        return 0; // featured - no specific sort
    }
  });

  return (
    <div className="w-full bg-white p-4 md:p-6 rounded-lg shadow-sm">
      {/* Top controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold">
            {getText("Products", "المنتجات")}
          </h2>
          <Badge variant="secondary" className="ml-2">
            {sortedProducts.length} {getText("products", "منتج")}
          </Badge>
        </div>

        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="md:hidden"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              {getText("Filters", "الفلاتر")}
            </Button>

            <div className="hidden md:flex items-center border rounded-md">
              <Button
                variant={view === "grid" ? "default" : "ghost"}
                size="sm"
                className="rounded-r-none"
                onClick={() => setView("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={view === "list" ? "default" : "ghost"}
                size="sm"
                className="rounded-l-none"
                onClick={() => setView("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder={getText("Sort by", "ترتيب حسب")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">
                {getText("Featured", "الأكثر شهرة")}
              </SelectItem>
              <SelectItem value="price-low">
                {getText("Price: Low to High", "السعر: من الأقل للأعلى")}
              </SelectItem>
              <SelectItem value="price-high">
                {getText("Price: High to Low", "السعر: من الأعلى للأقل")}
              </SelectItem>
              <SelectItem value="rating">
                {getText("Rating", "التقييم")}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters sidebar - collapsible on mobile */}
        <div
          className={`${showFilters ? "block" : "hidden"} md:block w-full md:w-64 flex-shrink-0`}
        >
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">{getText("Categories", "الفئات")}</h3>
              <ChevronDown className="h-4 w-4" />
            </div>

            <div className="space-y-2 mb-6">
              {translatedCategories.map((category, index) => {
                const originalCategory = categories[index];
                return (
                  <div
                    key={category}
                    className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${selectedCategory === category ? "bg-primary/10 text-primary" : "hover:bg-gray-100"}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    <span>{category}</span>
                    {selectedCategory === category && (
                      <Check className="h-4 w-4" />
                    )}
                  </div>
                );
              })}
            </div>

            <Separator className="my-4" />

            <div className="mb-4">
              <h3 className="font-medium mb-4">
                {getText("Price Range", "نطاق السعر")}
              </h3>
              <div className="px-2">
                <Slider
                  defaultValue={[0, 10000000]}
                  max={10000000}
                  min={0}
                  step={100000}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="mb-6"
                />
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 ml-1">
                      {getCurrencySymbol()}
                    </span>
                    <Input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) =>
                        setPriceRange([parseInt(e.target.value), priceRange[1]])
                      }
                      className="w-20 h-8 text-sm"
                    />
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 ml-1">
                      {getCurrencySymbol()}
                    </span>
                    <Input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], parseInt(e.target.value)])
                      }
                      className="w-20 h-8 text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="flex justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedCategory(getText("All", "الكل"));
                  setPriceRange([0, 10000000]);
                }}
              >
                {getText("Reset", "إعادة ضبط")}
              </Button>
              <Button
                size="sm"
                onClick={() => setShowFilters(false)}
                className="md:hidden"
              >
                {getText("Apply", "تطبيق")}
              </Button>
            </div>
          </div>
        </div>

        {/* Products grid */}
        <div className="flex-1">
          {sortedProducts.length > 0 ? (
            <div
              className={`grid ${view === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"} gap-4`}
            >
              {sortedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  title={product.title}
                  price={product.price}
                  image={product.image}
                  rating={product.rating}
                  seller={product.seller}
                  layout={view}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="text-gray-400 mb-4">
                <LayoutGrid className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium mb-2">
                {getText("No Products Found", "لا توجد منتجات")}
              </h3>
              <p className="text-gray-500 mb-4">
                {getText(
                  "No products found matching your search criteria",
                  "لم يتم العثور على منتجات تطابق معايير البحث الخاصة بك",
                )}
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedCategory(getText("All", "الكل"));
                  setPriceRange([0, 10000000]);
                }}
              >
                {getText("Reset Filters", "إعادة ضبط الفلاتر")}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
