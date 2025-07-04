"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  Globe,
  Home,
  ChevronDown,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { categories } from "@/lib/data";

const Header = () => {
  const { language, getText, setLanguage, setAuthModalOpen } = useAppStore();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en");
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 border-b">
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
            <a href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">W</span>
              </div>
              <h1 className="text-3xl font-bold text-blue-600">Wezo</h1>
            </a>
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
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="hidden md:flex items-center gap-2"
            >
              <Globe className="h-4 w-4" />
              {language === "en" ? "عربي" : "English"}
            </Button>

            <a href="/">
              <Button
                variant="ghost"
                size="sm"
                className={`hidden md:flex items-center ${language === "ar" ? "flex-row-reverse" : ""}`}
              >
                <Home
                  className={`h-5 w-5 ${language === "ar" ? "ml-1" : "mr-1"}`}
                />
                <span>{getText("Main Page", "الصفحة الرئيسية")}</span>
              </Button>
            </a>

            <a href="/cart">
              <Button
                variant="ghost"
                size="sm"
                className={`hidden md:flex items-center ${language === "ar" ? "flex-row-reverse" : ""}`}
              >
                <ShoppingCart
                  className={`h-5 w-5 ${language === "ar" ? "ml-1" : "mr-1"}`}
                />
                <span>{language === "en" ? "Cart" : "السلة"}</span>
              </Button>
            </a>

            <a href="/wishlist">
              <Button
                variant="ghost"
                size="sm"
                className={`hidden md:flex items-center ${language === "ar" ? "flex-row-reverse" : ""}`}
              >
                <Heart
                  className={`h-5 w-5 ${language === "ar" ? "ml-1" : "mr-1"}`}
                />
                <span>{language === "en" ? "Wishlist" : "المفضلة"}</span>
              </Button>
            </a>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setAuthModalOpen(true)}
              className={`flex items-center ${language === "ar" ? "flex-row-reverse" : ""}`}
            >
              <User
                className={`h-5 w-5 ${language === "ar" ? "ml-1" : "mr-1"}`}
              />
              <span>{language === "en" ? "Account" : "الحساب"}</span>
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
          {categories.slice(0, 5).map((category) => (
            <a
              key={category.id}
              href={`/products/${category.id}`}
              className="text-gray-600 hover:text-blue-600 font-medium flex items-center gap-2"
            >
              {language === "en" ? category.name.en : category.name.ar}
            </a>
          ))}
          <div className="relative group">
            <button className="text-gray-600 hover:text-blue-600 font-medium flex items-center">
              {getText("More", "المزيد")}
              <ChevronDown
                className={`h-4 w-4 ${language === "ar" ? "mr-1" : "ml-1"}`}
              />
            </button>
            <div className="absolute top-full left-0 mt-2 w-48 bg-white border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              {categories.slice(5).map((category) => (
                <a
                  key={category.id}
                  href={`/products/${category.id}`}
                  className="block px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                >
                  {language === "en" ? category.name.en : category.name.ar}
                </a>
              ))}
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden mt-4 bg-white border rounded-md p-4 shadow-md">
            <div className="space-y-4">
              <Button
                variant="ghost"
                onClick={toggleLanguage}
                className="w-full justify-start"
              >
                <Globe className="h-4 w-4 mr-2" />
                {language === "en" ? "عربي" : "English"}
              </Button>
              <a href="/" className="block">
                <Button variant="ghost" className="w-full justify-start">
                  <Home className="h-4 w-4 mr-2" />
                  {getText("Main Page", "الصفحة الرئيسية")}
                </Button>
              </a>
              <a href="/cart" className="block">
                <Button variant="ghost" className="w-full justify-start">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {language === "en" ? "Cart" : "السلة"}
                </Button>
              </a>
              <a href="/wishlist" className="block">
                <Button variant="ghost" className="w-full justify-start">
                  <Heart className="h-4 w-4 mr-2" />
                  {language === "en" ? "Wishlist" : "المفضلة"}
                </Button>
              </a>
              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-900 mb-2">
                  {getText("Categories", "الفئات")}
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((category) => (
                    <a
                      key={category.id}
                      href={`/products/${category.id}`}
                      className="text-gray-600 hover:text-blue-600 font-medium py-1"
                    >
                      {language === "en" ? category.name.en : category.name.ar}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
