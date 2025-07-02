"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  ChevronDown,
  Menu,
  X,
  Store,
  CheckCircle,
  Truck,
  Shield,
  DollarSign,
  Phone,
  Mail,
} from "lucide-react";
import ProductGrid from "./ProductGrid";
import ProductCard from "./ProductCard";
import AuthModal from "./AuthModal";

const HomePage = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);
  const [language, setLanguage] = React.useState<"ar" | "en">("ar");
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);
  const [isSellerModalOpen, setIsSellerModalOpen] = React.useState(false);

  // Update document direction and language when language changes
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = language;
    }
  }, [language]);

  const categories = [
    { id: 1, name: { en: "Electronics", ar: "إلكترونيات" }, icon: "📱" },
    { id: 2, name: { en: "Fashion", ar: "أزياء" }, icon: "👗" },
    { id: 3, name: { en: "Home & Kitchen", ar: "المنزل والمطبخ" }, icon: "🏠" },
    { id: 4, name: { en: "Beauty", ar: "الجمال" }, icon: "💄" },
    { id: 5, name: { en: "Toys & Games", ar: "ألعاب" }, icon: "🎮" },
    { id: 6, name: { en: "Books", ar: "كتب" }, icon: "📚" },
  ];

  const featuredProducts = [
    {
      id: 1,
      title: { en: "Smartphone X Pro", ar: "هاتف ذكي X برو" },
      price: 49999,
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02ff9?w=500&q=80",
      seller: { en: "Tech Store", ar: "متجر التقنية" },
      rating: 4.5,
    },
    {
      id: 2,
      title: { en: "Wireless Headphones", ar: "سماعات لاسلكية" },
      price: 8999,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
      seller: { en: "Audio World", ar: "عالم الصوت" },
      rating: 4.2,
    },
    {
      id: 3,
      title: { en: "Smart Watch", ar: "ساعة ذكية" },
      price: 19999,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
      seller: { en: "Gadget Hub", ar: "مركز الأجهزة" },
      rating: 4.7,
    },
    {
      id: 4,
      title: { en: "Laptop Pro", ar: "لابتوب برو" },
      price: 129999,
      image:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80",
      seller: { en: "Computer World", ar: "عالم الكمبيوتر" },
      rating: 4.8,
    },
  ];

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en");
  };

  return (
    <div
      className={`min-h-screen bg-gray-50 ${language === "ar" ? "rtl" : "ltr"}`}
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-10 border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <button
                className={`md:hidden ${language === "ar" ? "ml-2" : "mr-2"}`}
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                <Menu className="h-6 w-6" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">W</span>
                </div>
                <h1 className="text-3xl font-bold text-blue-600">Wezo</h1>
              </div>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 mx-8 relative">
              <Input
                type="text"
                placeholder={
                  language === "en"
                    ? "Search for products..."
                    : "ابحث عن المنتجات..."
                }
                className={`w-full ${language === "ar" ? "pl-10 pr-4" : "pr-10 pl-4"} h-11 rounded-full border-2 border-gray-200 focus:border-blue-500`}
              />
              <Search
                className={`absolute ${language === "ar" ? "left-3" : "right-3"} top-3 h-5 w-5 text-gray-400`}
              />
            </div>

            {/* Actions */}
            <div
              className={`flex items-center ${language === "ar" ? "space-x-reverse space-x-3" : "space-x-3"}`}
            >
              <button
                onClick={toggleLanguage}
                className="px-3 py-1 text-sm font-medium bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
              >
                {language === "en" ? "عربي" : "English"}
              </button>

              <button
                className={`hidden md:flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 ${language === "ar" ? "flex-row-reverse" : ""}`}
              >
                <ShoppingCart
                  className={`h-5 w-5 ${language === "ar" ? "ml-1" : "mr-1"}`}
                />
                <span>{language === "en" ? "Cart" : "السلة"}</span>
              </button>

              <button
                className={`hidden md:flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 ${language === "ar" ? "flex-row-reverse" : ""}`}
              >
                <Heart
                  className={`h-5 w-5 ${language === "ar" ? "ml-1" : "mr-1"}`}
                />
                <span>{language === "en" ? "Wishlist" : "المفضلة"}</span>
              </button>

              <button
                onClick={() => setIsAuthModalOpen(true)}
                className={`flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 ${language === "ar" ? "flex-row-reverse" : ""}`}
              >
                <User
                  className={`h-5 w-5 ${language === "ar" ? "ml-1" : "mr-1"}`}
                />
                <span>{language === "en" ? "Account" : "الحساب"}</span>
              </button>

              <Button
                onClick={() => setIsSellerModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 md:px-6 py-2 rounded-lg font-medium shadow-md transition-all duration-200 text-sm md:text-base"
              >
                {language === "en" ? "Become a Seller" : "كن بائعاً"}
              </Button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="mt-4 md:hidden relative">
            <Input
              type="text"
              placeholder={
                language === "en"
                  ? "Search for products..."
                  : "ابحث عن المنتجات..."
              }
              className={`w-full ${language === "ar" ? "pl-10 pr-4" : "pr-10 pl-4"} h-11 rounded-full border-2 border-gray-200`}
            />
            <Search
              className={`absolute ${language === "ar" ? "left-3" : "right-3"} top-3 h-5 w-5 text-gray-400`}
            />
          </div>

          {/* Categories Navigation */}
          <nav
            className={`hidden md:flex mt-4 ${language === "ar" ? "space-x-reverse space-x-6" : "space-x-6"}`}
          >
            {categories.map((category) => (
              <a
                key={category.id}
                href="#"
                className="text-gray-600 hover:text-blue-600 font-medium flex items-center gap-2"
              >
                <span className="text-lg">{category.icon}</span>
                {language === "en" ? category.name.en : category.name.ar}
              </a>
            ))}
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 font-medium flex items-center"
            >
              {language === "en" ? "More" : "المزيد"}
              <ChevronDown
                className={`h-4 w-4 ${language === "ar" ? "mr-1" : "ml-1"}`}
              />
            </a>
          </nav>

          {/* Mobile Menu */}
          {showMobileMenu && (
            <div className="md:hidden mt-4 bg-white border rounded-md p-4 shadow-md">
              <div className="grid grid-cols-2 gap-4">
                {categories.map((category) => (
                  <a
                    key={category.id}
                    href="#"
                    className="text-gray-600 hover:text-blue-600 font-medium py-2"
                  >
                    {language === "en" ? category.name.en : category.name.ar}
                  </a>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t grid grid-cols-2 gap-4">
                <Button
                  onClick={() => setIsSellerModalOpen(true)}
                  className="w-full"
                >
                  {language === "en" ? "Become a Seller" : "كن بائعاً"}
                </Button>
                <Button variant="outline" className="w-full">
                  {language === "en" ? "My Orders" : "طلباتي"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {language === "en"
              ? "Sudan's First E-Commerce Marketplace"
              : "أول سوق للتجارة الإلكترونية في السودان"}
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            {language === "en"
              ? "Shop thousands of products with convenient delivery options"
              : "تسوق آلاف المنتجات مع خيارات توصيل مريحة"}
          </p>
          <div className="flex justify-center">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
            >
              {language === "en" ? "Start Shopping" : "ابدأ التسوق"}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Featured Categories */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">
            {language === "en" ? "Shop by Category" : "تسوق حسب الفئة"}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Card
                key={category.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">{category.icon}</span>
                  </div>
                  <h3 className="font-medium text-gray-700">
                    {language === "en" ? category.name.en : category.name.ar}
                  </h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              {language === "en" ? "Featured Products" : "منتجات مميزة"}
            </h2>
            <Button variant="link" className="text-blue-600">
              {language === "en" ? "View All" : "عرض الكل"}
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                title={language === "en" ? product.title.en : product.title.ar}
                price={product.price}
                image={product.image}
                seller={
                  language === "en" ? product.seller.en : product.seller.ar
                }
                rating={product.rating}
                isRTL={language === "ar"}
              />
            ))}
          </div>
        </section>

        {/* Deals & Promotions */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              {language === "en" ? "Deals & Promotions" : "صفقات وعروض"}
            </h2>
            <Badge variant="outline" className="text-red-500 border-red-500">
              {language === "en" ? "Limited Time" : "لوقت محدود"}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="overflow-hidden">
              <div className="relative h-48 md:h-64 bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center p-6 text-white">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2">
                    {language === "en" ? "Flash Sale" : "تخفيضات سريعة"}
                  </h3>
                  <p className="mb-4">
                    {language === "en"
                      ? "Up to 50% off on electronics"
                      : "خصم يصل إلى 50٪ على الإلكترونيات"}
                  </p>
                  <Button
                    size="sm"
                    className="bg-white text-red-500 hover:bg-gray-100"
                  >
                    {language === "en" ? "Shop Now" : "تسوق الآن"}
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="overflow-hidden">
              <div className="relative h-48 md:h-64 bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center p-6 text-white">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2">
                    {language === "en" ? "New Arrivals" : "وصل حديثاً"}
                  </h3>
                  <p className="mb-4">
                    {language === "en"
                      ? "Discover the latest fashion trends"
                      : "اكتشف أحدث صيحات الموضة"}
                  </p>
                  <Button
                    size="sm"
                    className="bg-white text-blue-500 hover:bg-gray-100"
                  >
                    {language === "en" ? "Explore" : "استكشف"}
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Browse by Category Tabs */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">
            {language === "en"
              ? "Browse Popular Categories"
              : "تصفح الفئات الشائعة"}
          </h2>

          <Tabs defaultValue="electronics" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="electronics">
                {language === "en" ? "Electronics" : "إلكترونيات"}
              </TabsTrigger>
              <TabsTrigger value="fashion">
                {language === "en" ? "Fashion" : "أزياء"}
              </TabsTrigger>
              <TabsTrigger value="home">
                {language === "en" ? "Home & Kitchen" : "المنزل والمطبخ"}
              </TabsTrigger>
              <TabsTrigger value="beauty">
                {language === "en" ? "Beauty" : "الجمال"}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="electronics" className="mt-0">
              <ProductGrid language={language} />
            </TabsContent>

            <TabsContent value="fashion" className="mt-0">
              <ProductGrid language={language} />
            </TabsContent>

            <TabsContent value="home" className="mt-0">
              <ProductGrid language={language} />
            </TabsContent>

            <TabsContent value="beauty" className="mt-0">
              <ProductGrid language={language} />
            </TabsContent>
          </Tabs>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">
                {language === "en" ? "About Wezo" : "عن ويزو"}
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:underline">
                    {language === "en" ? "About Us" : "من نحن"}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    {language === "en" ? "Careers" : "وظائف"}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    {language === "en" ? "Press" : "الصحافة"}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    {language === "en" ? "Contact Us" : "اتصل بنا"}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">
                {language === "en" ? "For Buyers" : "للمشترين"}
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:underline">
                    {language === "en" ? "How to Shop" : "كيفية التسوق"}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    {language === "en" ? "Payment Methods" : "طرق الدفع"}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    {language === "en"
                      ? "Shipping & Delivery"
                      : "الشحن والتوصيل"}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    {language === "en"
                      ? "Returns & Refunds"
                      : "الإرجاع والاسترداد"}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">
                {language === "en" ? "For Sellers" : "للبائعين"}
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:underline">
                    {language === "en" ? "Become a Seller" : "كن بائعاً"}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    {language === "en" ? "Seller Policies" : "سياسات البائع"}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    {language === "en"
                      ? "Seller Dashboard"
                      : "لوحة تحكم البائع"}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    {language === "en" ? "Seller Support" : "دعم البائع"}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">
                {language === "en" ? "Legal" : "قانوني"}
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:underline">
                    {language === "en" ? "Terms of Service" : "شروط الخدمة"}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    {language === "en" ? "Privacy Policy" : "سياسة الخصوصية"}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    {language === "en"
                      ? "Cookie Policy"
                      : "سياسة ملفات تعريف الارتباط"}
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    {language === "en"
                      ? "Intellectual Property"
                      : "الملكية الفكرية"}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-700 text-center">
            <p>
              {language === "en"
                ? "© 2025 Wezo. All rights reserved."
                : "© 2025 ويزو. جميع الحقوق محفوظة."}
            </p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        language={language}
      />

      {/* Seller Information Modal */}
      <Dialog open={isSellerModalOpen} onOpenChange={setIsSellerModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] bg-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center text-blue-600 mb-2">
              {language === "en"
                ? "Sell with us on Wezo"
                : "البيع معنا على Wezo | ويزو"}
            </DialogTitle>
            <DialogDescription className="text-center text-gray-600">
              {language === "en"
                ? "Join Sudan's first e-commerce marketplace"
                : "انضم إلى أول سوق إلكتروني سوداني"}
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="max-h-[70vh] pr-4">
            <div
              className={`space-y-6 ${language === "ar" ? "text-right" : "text-left"}`}
              dir={language === "ar" ? "rtl" : "ltr"}
            >
              {/* Introduction */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
                <p className="text-gray-700 leading-relaxed">
                  {language === "en"
                    ? "Do you have products and want to sell them online? Join Wezo platform, Sudan's first e-commerce marketplace that allows sellers to display and sell their products easily using bank transfer as a secure payment method."
                    : "هل تمتلك منتجات وتريد بيعها أونلاين؟ انضم إلى منصة ويزو، أول سوق إلكتروني سوداني يتيح للبائعين عرض منتجاتهم وبيعها بكل سهولة باستخدام التحويل البنكي كوسيلة دفع آمنة."}
                </p>
              </div>

              {/* Features */}
              <div>
                <h3
                  className={`text-xl font-bold text-blue-600 mb-4 flex items-center gap-2 ${language === "ar" ? "flex-row-reverse" : ""}`}
                >
                  <Store className="h-6 w-6" />
                  {language === "en"
                    ? "Benefits of Selling on Wezo"
                    : "مميزات البيع على ويزو"}
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div
                      className={`flex items-start gap-3 ${language === "ar" ? "flex-row-reverse" : ""}`}
                    >
                      <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">
                        {language === "en"
                          ? "Sudanese platform dedicated entirely to local shopping"
                          : "منصة سودانية مخصصة بالكامل للتسوق المحلي"}
                      </span>
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div
                      className={`flex items-start gap-3 ${language === "ar" ? "flex-row-reverse" : ""}`}
                    >
                      <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">
                        {language === "en"
                          ? "List your products for free with no registration fees"
                          : "عرض منتجاتك مجانًا بدون رسوم تسجيل"}
                      </span>
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div
                      className={`flex items-start gap-3 ${language === "ar" ? "flex-row-reverse" : ""}`}
                    >
                      <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">
                        {language === "en"
                          ? "Easy dashboard to manage products and orders"
                          : "لوحة تحكم سهلة لإدارة المنتجات والطلبات"}
                      </span>
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div
                      className={`flex items-start gap-3 ${language === "ar" ? "flex-row-reverse" : ""}`}
                    >
                      <Truck className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">
                        {language === "en"
                          ? "Direct delivery within Sudanese cities"
                          : "توصيل مباشر داخل المدن السودانية"}
                      </span>
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div
                      className={`flex items-start gap-3 ${language === "ar" ? "flex-row-reverse" : ""}`}
                    >
                      <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">
                        {language === "en"
                          ? "Option to ship products to Wezo center and we'll sell and deliver them on your behalf"
                          : "إمكانية شحن المنتجات إلى مركز ويزو وسنقوم نحن ببيعها وتوصيلها نيابة عنك"}
                      </span>
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div
                      className={`flex items-start gap-3 ${language === "ar" ? "flex-row-reverse" : ""}`}
                    >
                      <DollarSign className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">
                        {language === "en"
                          ? "We only take 5% commission on each successful sale"
                          : "نأخذ فقط 5% عمولة على كل عملية بيع ناجحة"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Seller Requirements */}
              <div>
                <h3
                  className={`text-xl font-bold text-orange-600 mb-4 flex items-center gap-2 ${language === "ar" ? "flex-row-reverse" : ""}`}
                >
                  <Shield className="h-6 w-6" />
                  {language === "en" ? "Seller Requirements" : "شروط البائعين"}
                </h3>
                <div className="bg-orange-50 p-4 rounded-lg space-y-3">
                  <p className="text-gray-700">
                    {language === "en"
                      ? "• Products must be original, new, and of good quality."
                      : "• أن تكون المنتجات أصلية، جديدة، وجيدة الجودة."}
                  </p>
                  <p className="text-gray-700">
                    {language === "en"
                      ? "• Pricing must be reasonable and suitable for the market, as products with excessive prices or poor quality will be automatically rejected."
                      : "• التسعير يجب أن يكون منطقيًا ومناسبًا للسوق، لأن المنتجات ذات الأسعار المبالغ فيها أو الجودة الضعيفة ستُرفض تلقائيًا."}
                  </p>
                  <p className="text-gray-700">
                    {language === "en"
                      ? "• Commitment to prepare and deliver orders within 2 to 5 business days."
                      : "• الالتزام بتجهيز وتوصيل الطلبات خلال 2 إلى 5 أيام عمل."}
                  </p>
                  <p className="text-gray-700">
                    {language === "en"
                      ? "• Provide high-quality images and accurate description for each product."
                      : "• توفير صور عالية الجودة ووصف دقيق لكل منتج."}
                  </p>
                  <p className="text-gray-700">
                    {language === "en"
                      ? "• Have a Sudanese bank account in the seller's name."
                      : "• وجود حساب بنكي سوداني باسم البائع."}
                  </p>
                </div>
              </div>

              {/* Prohibited Items */}
              <div>
                <h3 className="text-xl font-bold text-red-600 mb-4">
                  {language === "en" ? "Prohibited Items:" : "يُمنع بيع:"}
                </h3>
                <div className="bg-red-50 p-4 rounded-lg space-y-2">
                  <p className="text-gray-700">
                    {language === "en"
                      ? "• Fake or counterfeit products"
                      : "• المنتجات المزيفة أو المقلدة"}
                  </p>
                  <p className="text-gray-700">
                    {language === "en"
                      ? "• Medicines without license"
                      : "• الأدوية بدون ترخيص"}
                  </p>
                  <p className="text-gray-700">
                    {language === "en"
                      ? "• Content that violates local laws or customs"
                      : "• المحتويات المخالفة للقوانين أو الأعراف المحلية"}
                  </p>
                </div>
              </div>

              {/* Commission System */}
              <div>
                <h3
                  className={`text-xl font-bold text-purple-600 mb-4 flex items-center gap-2 ${language === "ar" ? "flex-row-reverse" : ""}`}
                >
                  <DollarSign className="h-6 w-6" />
                  {language === "en" ? "Commission System" : "نظام العمولة"}
                </h3>
                <div className="bg-purple-50 p-4 rounded-lg space-y-3">
                  <p className="text-gray-700">
                    {language === "en"
                      ? "• Our commission is fixed: only 5% of each successful order value."
                      : "• عمولتنا ثابتة: 5% فقط من قيمة كل طلب ناجح."}
                  </p>
                  <p className="text-gray-700">
                    {language === "en"
                      ? "• No monthly or hidden fees."
                      : "• لا توجد رسوم شهرية أو خفية."}
                  </p>
                  <p className="text-gray-700">
                    {language === "en"
                      ? "• Your profits will be transferred to your bank account within 24 hours after order confirmation."
                      : "• يتم تحويل أرباحك إلى حسابك البنكي خلال 24 ساعة بعد تأكيد الطلب."}
                  </p>
                </div>
              </div>

              {/* Wezo Center Option */}
              <div>
                <h3
                  className={`text-xl font-bold text-teal-600 mb-4 flex items-center gap-2 ${language === "ar" ? "flex-row-reverse" : ""}`}
                >
                  <Truck className="h-6 w-6" />
                  {language === "en"
                    ? "Storage and Delivery via Wezo Center"
                    : "خيار التخزين والتوصيل عبر مركز ويزو"}
                </h3>
                <div className="bg-teal-50 p-4 rounded-lg space-y-3">
                  <p className="text-gray-700">
                    {language === "en"
                      ? "If you can't deliver yourself, you can ship your products to Wezo center in Khartoum or Port Sudan, and we will handle:"
                      : "إذا لم تتمكن من التوصيل بنفسك، يمكنك شحن منتجاتك إلى مركز ويزو في الخرطوم أو بورتسودان، وسنتولى نحن:"}
                  </p>
                  <div
                    className={`${language === "ar" ? "mr-4" : "ml-4"} space-y-2`}
                  >
                    <p className="text-gray-700">
                      {language === "en"
                        ? "• Product storage"
                        : "• تخزين المنتجات"}
                    </p>
                    <p className="text-gray-700">
                      {language === "en"
                        ? "• Display them on the website"
                        : "• عرضها على الموقع"}
                    </p>
                    <p className="text-gray-700">
                      {language === "en"
                        ? "• Receive orders"
                        : "• استلام الطلبات"}
                    </p>
                    <p className="text-gray-700">
                      {language === "en"
                        ? "• Package and deliver products to customers"
                        : "• تغليف وتوصيل المنتجات للعملاء"}
                    </p>
                    <p className="text-gray-700">
                      {language === "en"
                        ? "• Transfer profits to you after sale"
                        : "• تحويل الأرباح إليك بعد البيع"}
                    </p>
                  </div>
                </div>
              </div>

              {/* How to Start */}
              <div>
                <h3 className="text-xl font-bold text-indigo-600 mb-4">
                  {language === "en" ? "How to Get Started?" : "كيف تبدأ؟"}
                </h3>
                <div className="bg-indigo-50 p-4 rounded-lg space-y-3">
                  <p className="text-gray-700">
                    {language === "en"
                      ? "1. Register via [Seller Registration Form]."
                      : "1. سجّل عبر [نموذج تسجيل البائعين]."}
                  </p>
                  <p className="text-gray-700">
                    {language === "en"
                      ? "2. Choose whether you will deliver yourself or via Wezo center."
                      : "2. اختر إذا كنت ستقوم بالتوصيل بنفسك أو عبر مركز ويزو."}
                  </p>
                  <p className="text-gray-700">
                    {language === "en"
                      ? "3. Add your products, images, and prices."
                      : "3. أضف منتجاتك، الصور، والأسعار."}
                  </p>
                  <p className="text-gray-700">
                    {language === "en"
                      ? "4. Monitor orders and profit records from the dashboard."
                      : "4. راقب الطلبات وسجلات الأرباح من لوحة التحكم."}
                  </p>
                  <p className="text-gray-700">
                    {language === "en"
                      ? "5. Receive profits after each successful sale."
                      : "5. استلم الأرباح بعد كل عملية بيع ناجحة."}
                  </p>
                </div>
              </div>

              {/* Support */}
              <div>
                <h3 className="text-xl font-bold text-green-600 mb-4">
                  {language === "en" ? "Seller Support" : "دعم البائعين"}
                </h3>
                <div className="bg-green-50 p-4 rounded-lg space-y-3">
                  <p className="text-gray-700 mb-3">
                    {language === "en"
                      ? "We are here to help you every step of the way."
                      : "نحن هنا لمساعدتك في كل خطوة."}
                  </p>
                  <div
                    className={`flex items-center gap-3 mb-2 ${language === "ar" ? "flex-row-reverse" : ""}`}
                  >
                    <Phone className="h-5 w-5 text-green-600" />
                    <span className="text-gray-700">
                      {language === "en"
                        ? "WhatsApp: +249 xxx xxx xxx"
                        : "واتساب: +249 xxx xxx xxx"}
                    </span>
                  </div>
                  <div
                    className={`flex items-center gap-3 mb-2 ${language === "ar" ? "flex-row-reverse" : ""}`}
                  >
                    <Mail className="h-5 w-5 text-green-600" />
                    <span className="text-gray-700">
                      {language === "en"
                        ? "Email: sellers@wezo.sd"
                        : "بريد إلكتروني: sellers@wezo.sd"}
                    </span>
                  </div>
                  <p className="text-gray-700">
                    {language === "en"
                      ? "Support is available daily from 9 AM to 9 PM."
                      : "الدعم متاح يوميًا من الساعة 9 صباحًا حتى 9 مساءً."}
                  </p>
                </div>
              </div>

              {/* CTA Button */}
              <div className="text-center pt-4">
                <Button
                  onClick={() => {
                    setIsSellerModalOpen(false);
                    setIsAuthModalOpen(true);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-lg"
                >
                  {language === "en" ? "Start Selling Now" : "ابدأ البيع الآن"}
                </Button>
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HomePage;
