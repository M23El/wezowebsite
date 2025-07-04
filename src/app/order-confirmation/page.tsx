"use client";

import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Package, Truck, Home } from "lucide-react";
import { useAppStore } from "@/lib/store";

const OrderConfirmationPage = () => {
  const { language, getText } = useAppStore();

  const orderNumber =
    "WZ" + Math.random().toString(36).substr(2, 9).toUpperCase();
  const estimatedDelivery = new Date(
    Date.now() + 5 * 24 * 60 * 60 * 1000,
  ).toLocaleDateString(language === "ar" ? "ar-SD" : "en-US");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            {/* Success Icon */}
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>

            {/* Success Message */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {getText("Order Placed Successfully!", "تم تقديم الطلب بنجاح!")}
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              {getText(
                "Thank you for your order. We'll send you a confirmation email shortly.",
                "شكراً لك على طلبك. سنرسل لك رسالة تأكيد بالبريد الإلكتروني قريباً.",
              )}
            </p>

            {/* Order Details */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>
                  {getText("Order Details", "تفاصيل الطلب")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">
                    {getText("Order Number", "رقم الطلب")}
                  </span>
                  <span className="font-semibold">{orderNumber}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">
                    {getText("Order Date", "تاريخ الطلب")}
                  </span>
                  <span className="font-semibold">
                    {new Date().toLocaleDateString(
                      language === "ar" ? "ar-SD" : "en-US",
                    )}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">
                    {getText("Estimated Delivery", "التسليم المتوقع")}
                  </span>
                  <span className="font-semibold">{estimatedDelivery}</span>
                </div>
              </CardContent>
            </Card>

            {/* Order Status Steps */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>{getText("Order Status", "حالة الطلب")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-2">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <span className="text-sm font-medium text-green-600">
                      {getText("Order Placed", "تم الطلب")}
                    </span>
                  </div>
                  <div className="flex-1 h-px bg-gray-200 mx-4"></div>
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                      <Package className="h-6 w-6 text-gray-400" />
                    </div>
                    <span className="text-sm text-gray-400">
                      {getText("Processing", "قيد المعالجة")}
                    </span>
                  </div>
                  <div className="flex-1 h-px bg-gray-200 mx-4"></div>
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                      <Truck className="h-6 w-6 text-gray-400" />
                    </div>
                    <span className="text-sm text-gray-400">
                      {getText("Shipped", "تم الشحن")}
                    </span>
                  </div>
                  <div className="flex-1 h-px bg-gray-200 mx-4"></div>
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                      <Home className="h-6 w-6 text-gray-400" />
                    </div>
                    <span className="text-sm text-gray-400">
                      {getText("Delivered", "تم التسليم")}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => (window.location.href = "/")}
                className="px-8"
              >
                {getText("Continue Shopping", "متابعة التسوق")}
              </Button>
              <Button
                variant="outline"
                onClick={() => (window.location.href = "/orders")}
                className="px-8"
              >
                {getText("Track Order", "تتبع الطلب")}
              </Button>
            </div>

            {/* Contact Info */}
            <div className="mt-12 p-6 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">
                {getText("Need Help?", "تحتاج مساعدة؟")}
              </h3>
              <p className="text-blue-700 text-sm">
                {getText(
                  "Contact our customer support team at support@wezo.sd or call +249 123 456 789",
                  "تواصل مع فريق دعم العملاء على support@wezo.sd أو اتصل على +249 123 456 789",
                )}
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderConfirmationPage;
