"use client";

import React from "react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { formatPrice } from "@/lib/data";
import { useToast } from "@/components/ui/toast-simple";

const CartPage = () => {
  const {
    language,
    getText,
    cart,
    cartTotal,
    updateCartQuantity,
    removeFromCart,
    clearCart,
  } = useAppStore();

  const { toast } = useToast();

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      toast({
        title: getText("Item Removed", "تم حذف المنتج"),
        description: getText(
          "Item has been removed from your cart",
          "تم حذف المنتج من سلتك",
        ),
      });
    } else {
      updateCartQuantity(productId, newQuantity);
    }
  };

  const handleRemoveItem = (productId: string, productTitle: string) => {
    removeFromCart(productId);
    toast({
      title: getText("Item Removed", "تم حذف المنتج"),
      description: getText(
        `${productTitle} has been removed from your cart`,
        `تم حذف ${productTitle} من سلتك`,
      ),
    });
  };

  const handleClearCart = () => {
    clearCart();
    toast({
      title: getText("Cart Cleared", "تم تفريغ السلة"),
      description: getText(
        "All items have been removed from your cart",
        "تم حذف جميع المنتجات من سلتك",
      ),
    });
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 bg-gray-50">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center max-w-md mx-auto">
              <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-6" />
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                {getText("Your Cart is Empty", "سلتك فارغة")}
              </h1>
              <p className="text-gray-600 mb-8">
                {getText(
                  "Looks like you haven't added any items to your cart yet.",
                  "يبدو أنك لم تضف أي منتجات إلى سلتك بعد.",
                )}
              </p>
              <a href="/products">
                <Button size="lg">
                  {getText("Start Shopping", "ابدأ التسوق")}
                  <ArrowRight
                    className={`h-5 w-5 ${language === "ar" ? "rotate-180 mr-2" : "ml-2"}`}
                  />
                </Button>
              </a>
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
            <h1 className="text-3xl font-bold text-gray-900">
              {getText("Shopping Cart", "سلة التسوق")}
            </h1>
            <Button
              variant="outline"
              onClick={handleClearCart}
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              {getText("Clear Cart", "تفريغ السلة")}
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="w-full md:w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <a
                              href={`/products/detail/${item.id}`}
                              className="font-semibold text-lg hover:text-blue-600 transition-colors"
                            >
                              {item.title}
                            </a>
                            <p className="text-gray-600 text-sm">
                              {item.seller}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              handleRemoveItem(item.id, item.title)
                            }
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center border rounded-md">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity - 1)
                              }
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="px-4 py-2 font-medium">
                              {item.quantity.toLocaleString("en")}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity + 1)
                              }
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="text-right">
                            <div className="font-semibold text-lg">
                              {formatPrice(
                                item.price * item.quantity,
                                language,
                              )}
                            </div>
                            <div className="text-sm text-gray-600">
                              {formatPrice(item.price, language)}{" "}
                              {getText("each", "للواحد")}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>
                    {getText("Order Summary", "ملخص الطلب")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>{getText("Subtotal", "المجموع الفرعي")}</span>
                      <span>{formatPrice(cartTotal, language)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{getText("Shipping", "الشحن")}</span>
                      <span className="text-green-600">
                        {getText("Free", "مجاني")}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{getText("Tax", "الضريبة")}</span>
                      <span>{getText("Included", "مشمولة")}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-semibold">
                    <span>{getText("Total", "المجموع")}</span>
                    <span>{formatPrice(cartTotal, language)}</span>
                  </div>

                  <div className="space-y-3 pt-4">
                    <a href="/checkout" className="block">
                      <Button className="w-full" size="lg">
                        {getText("Proceed to Checkout", "متابعة للدفع")}
                        <ArrowRight
                          className={`h-5 w-5 ${language === "ar" ? "rotate-180 mr-2" : "ml-2"}`}
                        />
                      </Button>
                    </a>
                    <a href="/products" className="block">
                      <Button variant="outline" className="w-full">
                        {getText("Continue Shopping", "متابعة التسوق")}
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CartPage;
