"use client";

import React from "react";
import { useAppStore } from "@/lib/store";

const Footer = () => {
  const { language, getText } = useAppStore();

  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">
              {getText("About Wezo", "عن ويزو")}
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="/about-us" className="hover:underline">
                  {getText("About Us", "من نحن")}
                </a>
              </li>
              <li>
                <a href="/careers" className="hover:underline">
                  {getText("Careers", "وظائف")}
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:underline">
                  {getText("Contact Us", "اتصل بنا")}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">
              {getText("For Buyers", "للمشترين")}
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="/how-to-shop" className="hover:underline">
                  {getText("How to Shop", "كيفية التسوق")}
                </a>
              </li>
              <li>
                <a href="/payment-methods" className="hover:underline">
                  {getText("Payment Methods", "طرق الدفع")}
                </a>
              </li>
              <li>
                <a href="/shipping-info" className="hover:underline">
                  {getText("Shipping & Delivery", "الشحن والتوصيل")}
                </a>
              </li>
              <li>
                <a href="/returns-policy" className="hover:underline">
                  {getText("Returns & Refunds", "الإرجاع والاسترداد")}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">
              {getText("For Sellers", "للبائعين")}
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  {getText("Become a Seller", "كن بائعاً")}
                </a>
              </li>
              <li>
                <a href="/seller-policies" className="hover:underline">
                  {getText("Seller Policies", "سياسات البائع")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  {getText("Seller Dashboard", "لوحة تحكم البائع")}
                </a>
              </li>
              <li>
                <a href="/seller-support" className="hover:underline">
                  {getText("Seller Support", "دعم البائع")}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">
              {getText("Legal", "قانوني")}
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="/terms" className="hover:underline">
                  {getText("Terms of Service", "شروط الخدمة")}
                </a>
              </li>
              <li>
                <a href="/privacy-policy" className="hover:underline">
                  {getText("Privacy Policy", "سياسة الخصوصية")}
                </a>
              </li>
              <li>
                <a href="/cookies-policy" className="hover:underline">
                  {getText("Cookie Policy", "سياسة ملفات تعريف الارتباط")}
                </a>
              </li>
              <li>
                <a href="/intellectual-property" className="hover:underline">
                  {getText("Intellectual Property", "الملكية الفكرية")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700 text-center">
          <p>
            {getText(
              "© 2025 Wezo. All rights reserved.",
              "© 2025 ويزو. جميع الحقوق محفوظة.",
            )}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
