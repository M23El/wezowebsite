"use client";

import React, { useState, useEffect } from "react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Heart,
  ShoppingCart,
  Star,
  Minus,
  Plus,
  ArrowLeft,
  Share2,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { getProductById, formatPrice } from "@/lib/data";
import { useToast } from "@/components/ui/toast-simple";
import type { Product } from "@/lib/store";

const ProductDetailPage = () => {
  const { toast } = useToast();
  const {
    language,
    getText,
    addToCart,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } = useAppStore();

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get product ID from URL
    const urlPath = window.location.pathname;
    const productId = urlPath.split("/").pop() || "1";
    const foundProduct = getProductById(productId);

    if (foundProduct) {
      setProduct(foundProduct);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p>{getText("Loading...", "جاري التحميل...")}</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">
              {getText("Product Not Found", "المنتج غير موجود")}
            </h1>
            <p className="text-gray-600 mb-4">
              {getText(
                "The product you're looking for doesn't exist.",
                "المنتج الذي تبحث عنه غير موجود.",
              )}
            </p>
            <a href="/products">
              <Button>{getText("Browse Products", "تصفح المنتجات")}</Button>
            </a>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast({
      title: getText("Added to Cart", "تم إضافة المنتج للسلة"),
      description: getText(
        `${product.title} has been added to your cart`,
        `تم إضافة ${product.title} إلى سلتك`,
      ),
    });
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast({
        title: getText("Removed from Wishlist", "تم إزالة المنتج من المفضلة"),
        description: getText(
          `${product.title} has been removed from your wishlist`,
          `تم إزالة ${product.title} من قائمة المفضلة`,
        ),
      });
    } else {
      addToWishlist(product);
      toast({
        title: getText("Added to Wishlist", "تم إضافة المنتج للمفضلة"),
        description: getText(
          `${product.title} has been added to your wishlist`,
          `تم إضافة ${product.title} إلى قائمة المفضلة`,
        ),
      });
    }
  };

  const images = product.images || [product.image];
  const inWishlist = isInWishlist(product.id);

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
            <span className="text-gray-900">{product.title}</span>
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square bg-white rounded-lg overflow-hidden border">
                <img
                  src={images[selectedImage]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                        selectedImage === index
                          ? "border-blue-600"
                          : "border-gray-200"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <Badge variant="secondary" className="mb-2">
                  {product.seller}
                </Badge>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {product.title}
                </h1>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600">({product.rating})</span>
                </div>
              </div>

              <div className="text-3xl font-bold text-blue-600">
                {formatPrice(product.price, language)}
              </div>

              {product.description && (
                <div>
                  <h3 className="font-semibold mb-2">
                    {getText("Description", "الوصف")}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              )}

              <Separator />

              {/* Quantity and Actions */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="font-medium">
                    {getText("Quantity:", "الكمية:")}
                  </span>
                  <div className="flex items-center border rounded-md">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="px-4 py-2 font-medium">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(quantity + 1)}
                      disabled={quantity >= (product.stock || 10)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  {product.stock && (
                    <span className="text-sm text-gray-600">
                      {product.stock} {getText("in stock", "متوفر")}
                    </span>
                  )}
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={handleAddToCart}
                    className="flex-1"
                    size="lg"
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    {getText("Add to Cart", "أضف للسلة")}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleWishlistToggle}
                    size="lg"
                    className={inWishlist ? "text-red-600 border-red-200" : ""}
                  >
                    <Heart
                      className={`h-5 w-5 ${inWishlist ? "fill-red-600" : ""}`}
                    />
                  </Button>
                  <Button variant="outline" size="lg">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <Truck className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">
                  {getText("Free Delivery", "توصيل مجاني")}
                </h3>
                <p className="text-sm text-gray-600">
                  {getText(
                    "Free delivery on orders over SDG 50,000",
                    "توصيل مجاني للطلبات أكثر من 50,000 ج.س",
                  )}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Shield className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">
                  {getText("Secure Payment", "دفع آمن")}
                </h3>
                <p className="text-sm text-gray-600">
                  {getText("100% secure payment methods", "طرق دفع آمنة 100%")}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <RotateCcw className="h-8 w-8 text-orange-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">
                  {getText("Easy Returns", "إرجاع سهل")}
                </h3>
                <p className="text-sm text-gray-600">
                  {getText("7-day return policy", "سياسة إرجاع لمدة 7 أيام")}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetailPage;
