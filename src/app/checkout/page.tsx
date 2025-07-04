"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, CreditCard, Banknote, Truck } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { formatPrice } from "@/lib/data";
import { useToast } from "@/components/ui/toast-simple";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language, getText, cart, cartTotal, clearCart } = useAppStore();
  const [paymentMethod, setPaymentMethod] = useState("bank-transfer");
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    saveInfo: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate processing
    setTimeout(() => {
      clearCart();
      toast({
        title: getText("Order Placed Successfully!", "تم تقديم الطلب بنجاح!"),
        description: getText(
          "You will receive a confirmation email shortly.",
          "ستتلقى رسالة تأكيد بالبريد الإلكتروني قريباً.",
        ),
      });
      navigate("/order-confirmation");
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">
              {getText("Your cart is empty", "سلتك فارغة")}
            </h1>
            <p className="text-gray-600 mb-4">
              {getText(
                "Add some products to your cart before checkout.",
                "أضف بعض المنتجات إلى سلتك قبل الدفع.",
              )}
            </p>
            <Button onClick={() => navigate("/products")}>
              {getText("Browse Products", "تصفح المنتجات")}
            </Button>
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
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" onClick={() => navigate(-1)}>
              <ArrowLeft
                className={`h-4 w-4 ${language === "ar" ? "rotate-180 ml-2" : "mr-2"}`}
              />
              {getText("Back", "رجوع")}
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {getText("Checkout", "الدفع")}
              </h1>
              <p className="text-gray-600">
                {getText("Complete your order", "أكمل طلبك")}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Checkout Form */}
              <div className="lg:col-span-2 space-y-6">
                {/* Shipping Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {getText("Shipping Information", "معلومات الشحن")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">
                          {getText("First Name", "الاسم الأول")}
                        </Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">
                          {getText("Last Name", "اسم العائلة")}
                        </Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">
                          {getText("Email", "البريد الإلكتروني")}
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">
                          {getText("Phone Number", "رقم الهاتف")}
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="address">
                        {getText("Address", "العنوان")}
                      </Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">
                          {getText("City", "المدينة")}
                        </Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">
                          {getText("State", "الولاية")}
                        </Label>
                        <Input
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="zipCode">
                          {getText("ZIP Code", "الرمز البريدي")}
                        </Label>
                        <Input
                          id="zipCode"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="saveInfo"
                        checked={formData.saveInfo}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({
                            ...prev,
                            saveInfo: checked as boolean,
                          }))
                        }
                      />
                      <Label htmlFor="saveInfo">
                        {getText(
                          "Save this information for next time",
                          "احفظ هذه المعلومات للمرة القادمة",
                        )}
                      </Label>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Method */}
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {getText("Payment Method", "طريقة الدفع")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup
                      value={paymentMethod}
                      onValueChange={setPaymentMethod}
                    >
                      <div className="flex items-center space-x-2 p-4 border rounded-lg">
                        <RadioGroupItem
                          value="bank-transfer"
                          id="bank-transfer"
                        />
                        <Banknote className="h-5 w-5" />
                        <Label htmlFor="bank-transfer" className="flex-1">
                          <div>
                            <p className="font-medium">
                              {getText("Bank Transfer", "تحويل بنكي")}
                            </p>
                            <p className="text-sm text-gray-600">
                              {getText(
                                "Transfer directly to our bank account",
                                "حول مباشرة إلى حسابنا البنكي",
                              )}
                            </p>
                          </div>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2 p-4 border rounded-lg">
                        <RadioGroupItem
                          value="cash-on-delivery"
                          id="cash-on-delivery"
                        />
                        <Truck className="h-5 w-5" />
                        <Label htmlFor="cash-on-delivery" className="flex-1">
                          <div>
                            <p className="font-medium">
                              {getText("Cash on Delivery", "الدفع عند التسليم")}
                            </p>
                            <p className="text-sm text-gray-600">
                              {getText(
                                "Pay when your order is delivered",
                                "ادفع عند تسليم طلبك",
                              )}
                            </p>
                          </div>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2 p-4 border rounded-lg opacity-50">
                        <RadioGroupItem value="card" id="card" disabled />
                        <CreditCard className="h-5 w-5" />
                        <Label htmlFor="card" className="flex-1">
                          <div>
                            <p className="font-medium">
                              {getText("Credit/Debit Card", "بطاقة ائتمان/خصم")}
                            </p>
                            <p className="text-sm text-gray-600">
                              {getText("Coming Soon", "قريباً")}
                            </p>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>
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
                    {/* Cart Items */}
                    <div className="space-y-3">
                      {cart.map((item) => (
                        <div key={item.id} className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium line-clamp-1">
                              {item.title}
                            </p>
                            <p className="text-xs text-gray-600">
                              {getText("Qty", "الكمية")}: {item.quantity}
                            </p>
                          </div>
                          <p className="text-sm font-medium">
                            {formatPrice(item.price * item.quantity, language)}
                          </p>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    {/* Totals */}
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

                    <Button
                      type="submit"
                      className="w-full"
                      size="lg"
                      disabled={isProcessing}
                    >
                      {isProcessing
                        ? getText("Processing...", "جاري المعالجة...")
                        : getText("Place Order", "تقديم الطلب")}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CheckoutPage;
