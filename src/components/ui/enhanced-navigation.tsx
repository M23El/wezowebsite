"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useAppStore } from "@/lib/store";
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  Store,
  Globe,
  Bell,
  Settings,
  LogOut,
  Package,
  CreditCard,
  MapPin,
} from "lucide-react";

interface EnhancedNavigationProps {
  onAuthModalOpen?: () => void;
  onSellerModalOpen?: () => void;
  className?: string;
}

const EnhancedNavigation: React.FC<EnhancedNavigationProps> = ({
  onAuthModalOpen = () => {},
  onSellerModalOpen = () => {},
  className = "",
}) => {
  const { language, getText, setLanguage, user } = useAppStore();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const categories = [
    { id: 1, name: { en: "Electronics", ar: "إلكترونيات" }, icon: "📱" },
    { id: 2, name: { en: "Fashion", ar: "أزياء" }, icon: "👗" },
    { id: 3, name: { en: "Home & Kitchen", ar: "المنزل والمطبخ" }, icon: "🏠" },
    { id: 4, name: { en: "Beauty", ar: "الجمال" }, icon: "💄" },
    { id: 5, name: { en: "Sports", ar: "الرياضة" }, icon: "⚽" },
    { id: 6, name: { en: "Books", ar: "كتب" }, icon: "📚" },
  ];

  const userMenuItems = [
    {
      icon: User,
      label: getText("My Profile", "ملفي الشخصي"),
      href: "/profile/settings",
    },
    {
      icon: Package,
      label: getText("My Orders", "طلباتي"),
      href: "/orders",
    },
    {
      icon: Heart,
      label: getText("Wishlist", "المفضلة"),
      href: "/wishlist",
    },
    {
      icon: MapPin,
      label: getText("Addresses", "العناوين"),
      href: "/profile/settings?tab=addresses",
    },
    {
      icon: CreditCard,
      label: getText("Payment Methods", "طرق الدفع"),
      href: "/profile/settings?tab=payments",
    },
    {
      icon: Settings,
      label: getText("Settings", "الإعدادات"),
      href: "/profile/settings",
    },
  ];

  const sellerMenuItems = [
    {
      icon: Store,
      label: getText("Dashboard", "لوحة التحكم"),
      href: "/seller/dashboard",
    },
    {
      icon: Package,
      label: getText("Products", "المنتجات"),
      href: "/seller/products",
    },
    {
      icon: ShoppingCart,
      label: getText("Orders", "الطلبات"),
      href: "/seller/orders",
    },
  ];

  return (
    <header
      className={`bg-white shadow-md sticky top-0 z-50 border-b ${className}`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <button
              className={`md:hidden ${language === "ar" ? "ml-2" : "mr-2"}`}
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              {showMobileMenu ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
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
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === "en" ? "ar" : "en")}
              className="flex items-center gap-2"
            >
              <Globe className="h-4 w-4" />
              {language === "en" ? "عربي" : "English"}
            </Button>

            {/* Cart */}
            <Button
              variant="ghost"
              size="sm"
              className={`hidden md:flex items-center ${language === "ar" ? "flex-row-reverse" : ""}`}
            >
              <div className="relative">
                <ShoppingCart className="h-5 w-5" />
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  3
                </Badge>
              </div>
              <span className={language === "ar" ? "mr-2" : "ml-2"}>
                {getText("Cart", "السلة")}
              </span>
            </Button>

            {/* Wishlist */}
            <Button
              variant="ghost"
              size="sm"
              className={`hidden md:flex items-center ${language === "ar" ? "flex-row-reverse" : ""}`}
            >
              <div className="relative">
                <Heart className="h-5 w-5" />
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  5
                </Badge>
              </div>
              <span className={language === "ar" ? "mr-2" : "ml-2"}>
                {getText("Wishlist", "المفضلة")}
              </span>
            </Button>

            {/* Notifications */}
            {user && (
              <Button variant="ghost" size="sm">
                <div className="relative">
                  <Bell className="h-5 w-5" />
                  <div className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></div>
                </div>
              </Button>
            )}

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className={`flex items-center ${language === "ar" ? "flex-row-reverse" : ""}`}
                >
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-blue-600" />
                  </div>
                  <span
                    className={`${language === "ar" ? "mr-2" : "ml-2"} hidden md:block`}
                  >
                    {user.name || getText("Account", "الحساب")}
                  </span>
                </Button>

                {/* User Dropdown */}
                {showUserMenu && (
                  <div
                    className={`absolute ${language === "ar" ? "left-0" : "right-0"} mt-2 w-64 bg-white rounded-lg shadow-lg border z-50`}
                  >
                    <div className="p-4 border-b">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                      <Badge variant="outline" className="mt-1">
                        {getText(
                          user.type === "seller" ? "Seller" : "Buyer",
                          user.type === "seller" ? "بائع" : "مشتري",
                        )}
                      </Badge>
                    </div>

                    <div className="py-2">
                      {userMenuItems.map((item, index) => {
                        const Icon = item.icon;
                        return (
                          <a
                            key={index}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 ${language === "ar" ? "flex-row-reverse" : ""}`}
                          >
                            <Icon className="h-4 w-4" />
                            {item.label}
                          </a>
                        );
                      })}

                      {user.type === "seller" && (
                        <>
                          <div className="border-t my-2"></div>
                          {sellerMenuItems.map((item, index) => {
                            const Icon = item.icon;
                            return (
                              <a
                                key={index}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 ${language === "ar" ? "flex-row-reverse" : ""}`}
                              >
                                <Icon className="h-4 w-4" />
                                {item.label}
                              </a>
                            );
                          })}
                        </>
                      )}

                      <div className="border-t my-2"></div>
                      <button
                        className={`flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 text-red-600 w-full ${language === "ar" ? "flex-row-reverse" : ""}`}
                      >
                        <LogOut className="h-4 w-4" />
                        {getText("Sign Out", "تسجيل الخروج")}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={onAuthModalOpen}
                className={`flex items-center ${language === "ar" ? "flex-row-reverse" : ""}`}
              >
                <User className="h-5 w-5" />
                <span className={language === "ar" ? "mr-2" : "ml-2"}>
                  {getText("Account", "الحساب")}
                </span>
              </Button>
            )}

            {/* Become Seller Button */}
            {(!user || user.type !== "seller") && (
              <Button
                onClick={onSellerModalOpen}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 md:px-6 py-2 rounded-lg font-medium shadow-md transition-all duration-200 text-sm md:text-base"
              >
                {getText("Become a Seller", "كن بائعاً")}
              </Button>
            )}
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

        {/* Desktop Categories Navigation */}
        <NavigationMenu className="hidden md:flex mt-4 w-full">
          <NavigationMenuList className="flex-wrap justify-start">
            {categories.map((category) => (
              <NavigationMenuItem key={category.id}>
                <NavigationMenuLink
                  href={`/category/${category.id}`}
                  className="text-gray-600 hover:text-blue-600 font-medium flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-50"
                >
                  <span className="text-lg">{category.icon}</span>
                  {language === "en" ? category.name.en : category.name.ar}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-gray-600 hover:text-blue-600 font-medium">
                {getText("More", "المزيد")}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[400px] gap-3 p-4">
                  <div className="row-span-3">
                    <NavigationMenuLink
                      href="/categories"
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-blue-500 to-blue-600 p-6 no-underline outline-none focus:shadow-md"
                    >
                      <div className="mb-2 mt-4 text-lg font-medium text-white">
                        {getText("All Categories", "جميع الفئات")}
                      </div>
                      <p className="text-sm leading-tight text-blue-100">
                        {getText(
                          "Browse all product categories",
                          "تصفح جميع فئات المنتجات",
                        )}
                      </p>
                    </NavigationMenuLink>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden mt-4 bg-white border rounded-md p-4 shadow-md">
            <div className="grid grid-cols-2 gap-4 mb-4">
              {categories.map((category) => (
                <a
                  key={category.id}
                  href={`/category/${category.id}`}
                  className="text-gray-600 hover:text-blue-600 font-medium py-2 flex items-center gap-2"
                >
                  <span>{category.icon}</span>
                  {language === "en" ? category.name.en : category.name.ar}
                </a>
              ))}
            </div>

            <div className="border-t pt-4 grid grid-cols-2 gap-4">
              <Button variant="outline" className="w-full">
                <ShoppingCart className="h-4 w-4 mr-2" />
                {getText("Cart", "السلة")}
              </Button>
              <Button variant="outline" className="w-full">
                <Heart className="h-4 w-4 mr-2" />
                {getText("Wishlist", "المفضلة")}
              </Button>
              {!user && (
                <Button onClick={onAuthModalOpen} className="w-full col-span-2">
                  <User className="h-4 w-4 mr-2" />
                  {getText("Sign In", "تسجيل الدخول")}
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default EnhancedNavigation;
