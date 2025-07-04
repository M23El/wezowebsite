"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, ShoppingCart, Trash2, ArrowRight } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { formatPrice } from "@/lib/data";
import { useToast } from "@/components/ui/toast-simple";

const WishlistPage = () => {
  const { toast } = useToast();
  const { language, getText, wishlist, removeFromWishlist, addToCart } =
    useAppStore();

  const handleAddToCart = (product: any) => {
    addToCart(product);
    toast({
      title: getText("Added to Cart", "تم إضافة المنتج للسلة"),
      description: getText(
        `${product.title} has been added to your cart`,
        `تم إضافة ${product.title} إلى سلتك`,
      ),
    });
  };

  const handleRemoveFromWishlist = (
    productId: string,
    productTitle: string,
  ) => {
    removeFromWishlist(productId);
    toast({
      title: getText("Removed from Wishlist", "تم إزالة المنتج من المفضلة"),
      description: getText(
        `${productTitle} has been removed from your wishlist`,
        `تم إزالة ${productTitle} من قائمة المفضلة`,
      ),
    });
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 bg-gray-50">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center max-w-md mx-auto">
              <Heart className="h-16 w-16 text-gray-400 mx-auto mb-6" />
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                {getText("Your Wishlist is Empty", "قائمة المفضلة فارغة")}
              </h1>
              <p className="text-gray-600 mb-8">
                {getText(
                  "Save items you love by clicking the heart icon on any product.",
                  "احفظ المنتجات التي تحبها بالنقر على أيقونة القلب على أي منتج.",
                )}
              </p>
              <Button
                onClick={() => (window.location.href = "/products")}
                size="lg"
              >
                {getText("Start Shopping", "ابدأ التسوق")}
                <ArrowRight
                  className={`h-5 w-5 ${language === "ar" ? "rotate-180 mr-2" : "ml-2"}`}
                />
              </Button>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {getText("My Wishlist", "قائمة المفضلة")}
              </h1>
              <p className="text-gray-600">
                {wishlist.length.toLocaleString("en")}{" "}
                {getText("items saved", "منتج محفوظ")}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.map((product) => (
              <Card
                key={product.id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative">
                  <div className="aspect-square bg-gray-100 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full"
                    onClick={() =>
                      handleRemoveFromWishlist(product.id, product.title)
                    }
                  >
                    <Heart className="h-5 w-5 text-red-500 fill-red-500" />
                  </Button>
                </div>

                <CardContent className="p-4">
                  <div className="mb-2">
                    <p className="text-sm text-gray-600">{product.seller}</p>
                  </div>
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                    {product.title}
                  </h3>
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`h-4 w-4 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-1">
                      ({product.rating.toLocaleString("en")})
                    </span>
                  </div>
                  <div className="text-xl font-bold text-primary mb-4">
                    {formatPrice(product.price, language)}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleAddToCart(product)}
                      className="flex-1"
                      size="sm"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {getText("Add to Cart", "أضف للسلة")}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleRemoveFromWishlist(product.id, product.title)
                      }
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default WishlistPage;
