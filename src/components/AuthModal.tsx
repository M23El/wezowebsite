"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Lock, Phone, User } from "lucide-react";

interface AuthModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  defaultTab?: "login" | "register";
  language?: "ar" | "en";
}

const AuthModal = ({
  isOpen = true,
  onClose = () => {},
  defaultTab = "login",
  language = "ar",
}: AuthModalProps) => {
  const [activeTab, setActiveTab] = useState<"login" | "register">(defaultTab);
  const [accountType, setAccountType] = useState<"buyer" | "seller">("buyer");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[450px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {activeTab === "login"
              ? language === "ar"
                ? "تسجيل الدخول"
                : "Login"
              : language === "ar"
                ? "إنشاء حساب"
                : "Create Account"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {activeTab === "login"
              ? language === "ar"
                ? "أدخل بيانات الدخول للوصول إلى حسابك"
                : "Enter your credentials to access your account"
              : language === "ar"
                ? "أنشئ حسابًا جديدًا للتسوق أو البيع على ويزو"
                : "Create a new account to shop or sell on Wezo"}
          </DialogDescription>
        </DialogHeader>

        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "login" | "register")}
          className="w-full"
        >
          <TabsList className="grid grid-cols-2 w-full mb-6">
            <TabsTrigger value="login">
              {language === "ar" ? "تسجيل الدخول" : "Login"}
            </TabsTrigger>
            <TabsTrigger value="register">
              {language === "ar" ? "حساب جديد" : "Register"}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4">
            <div className="space-y-4">
              <div className="relative">
                <Label htmlFor="email-login">
                  {language === "ar" ? "البريد الإلكتروني" : "Email"}
                </Label>
                <div className="relative">
                  <Input
                    id="email-login"
                    type="email"
                    placeholder="your@email.com"
                    className={language === "ar" ? "pr-10" : "pl-10"}
                  />
                  <Mail
                    className={`absolute ${language === "ar" ? "right-3" : "left-3"} top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5`}
                  />
                </div>
              </div>

              <div className="relative">
                <Label htmlFor="password-login">
                  {language === "ar" ? "كلمة المرور" : "Password"}
                </Label>
                <div className="relative">
                  <Input
                    id="password-login"
                    type="password"
                    placeholder="••••••••"
                    className={language === "ar" ? "pr-10" : "pl-10"}
                  />
                  <Lock
                    className={`absolute ${language === "ar" ? "right-3" : "left-3"} top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5`}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div
                  className={`flex items-center ${language === "ar" ? "space-x-reverse space-x-2" : "space-x-2"}`}
                >
                  <Checkbox id="remember" />
                  <Label htmlFor="remember" className="text-sm">
                    {language === "ar" ? "تذكرني" : "Remember me"}
                  </Label>
                </div>
                <Button variant="link" className="text-sm p-0">
                  {language === "ar" ? "نسيت كلمة المرور؟" : "Forgot password?"}
                </Button>
              </div>

              <Button className="w-full">
                {language === "ar" ? "تسجيل الدخول" : "Login"}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="register" className="space-y-4">
            <div className="space-y-4">
              <div
                className={`flex justify-center ${language === "ar" ? "space-x-reverse space-x-4" : "space-x-4"} mb-4`}
              >
                <div
                  className={`flex items-center ${language === "ar" ? "space-x-reverse space-x-2" : "space-x-2"}`}
                >
                  <input
                    type="radio"
                    id="buyer"
                    name="accountType"
                    checked={accountType === "buyer"}
                    onChange={() => setAccountType("buyer")}
                  />
                  <Label htmlFor="buyer">
                    {language === "ar" ? "مشتري" : "Buyer"}
                  </Label>
                </div>
                <div
                  className={`flex items-center ${language === "ar" ? "space-x-reverse space-x-2" : "space-x-2"}`}
                >
                  <input
                    type="radio"
                    id="seller"
                    name="accountType"
                    checked={accountType === "seller"}
                    onChange={() => setAccountType("seller")}
                  />
                  <Label htmlFor="seller">
                    {language === "ar" ? "بائع" : "Seller"}
                  </Label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <Label htmlFor="first-name">
                    {language === "ar" ? "الاسم الأول" : "First Name"}
                  </Label>
                  <div className="relative">
                    <Input
                      id="first-name"
                      placeholder={
                        language === "ar" ? "الاسم الأول" : "First Name"
                      }
                      className={language === "ar" ? "pr-10" : "pl-10"}
                    />
                    <User
                      className={`absolute ${language === "ar" ? "right-3" : "left-3"} top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5`}
                    />
                  </div>
                </div>

                <div className="relative">
                  <Label htmlFor="last-name">
                    {language === "ar" ? "اسم العائلة" : "Last Name"}
                  </Label>
                  <div className="relative">
                    <Input
                      id="last-name"
                      placeholder={
                        language === "ar" ? "اسم العائلة" : "Last Name"
                      }
                      className={language === "ar" ? "pr-10" : "pl-10"}
                    />
                    <User
                      className={`absolute ${language === "ar" ? "right-3" : "left-3"} top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5`}
                    />
                  </div>
                </div>
              </div>

              <div className="relative">
                <Label htmlFor="email-register">
                  {language === "ar" ? "البريد الإلكتروني" : "Email"}
                </Label>
                <div className="relative">
                  <Input
                    id="email-register"
                    type="email"
                    placeholder="your@email.com"
                    className={language === "ar" ? "pr-10" : "pl-10"}
                  />
                  <Mail
                    className={`absolute ${language === "ar" ? "right-3" : "left-3"} top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5`}
                  />
                </div>
              </div>

              <div className="relative">
                <Label htmlFor="phone">
                  {language === "ar" ? "رقم الهاتف" : "Phone Number"}
                </Label>
                <div className="relative">
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+249 XX XXX XXXX"
                    className={language === "ar" ? "pr-10" : "pl-10"}
                  />
                  <Phone
                    className={`absolute ${language === "ar" ? "right-3" : "left-3"} top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5`}
                  />
                </div>
              </div>

              <div className="relative">
                <Label htmlFor="password-register">
                  {language === "ar" ? "كلمة المرور" : "Password"}
                </Label>
                <div className="relative">
                  <Input
                    id="password-register"
                    type="password"
                    placeholder="••••••••"
                    className={language === "ar" ? "pr-10" : "pl-10"}
                  />
                  <Lock
                    className={`absolute ${language === "ar" ? "right-3" : "left-3"} top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5`}
                  />
                </div>
              </div>

              <div
                className={`flex items-center ${language === "ar" ? "space-x-reverse space-x-2" : "space-x-2"}`}
              >
                <Checkbox id="terms" />
                <Label htmlFor="terms" className="text-sm">
                  {language === "ar"
                    ? "أوافق على الشروط والأحكام"
                    : "I agree to the terms and conditions"}
                </Label>
              </div>

              <Button className="w-full">
                {accountType === "buyer"
                  ? language === "ar"
                    ? "إنشاء حساب مشتري"
                    : "Create Buyer Account"
                  : language === "ar"
                    ? "إنشاء حساب بائع"
                    : "Create Seller Account"}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
