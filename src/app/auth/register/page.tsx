"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Mail, Lock, User, Phone, ArrowLeft } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { useToast } from "@/components/ui/toast-simple";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language, getText, setUser } = useAppStore();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    accountType: "buyer",
    agreeToTerms: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: getText("Error", "خطأ"),
        description: getText(
          "Passwords do not match",
          "كلمات المرور غير متطابقة",
        ),
        variant: "destructive",
      });
      return;
    }

    if (!formData.agreeToTerms) {
      toast({
        title: getText("Error", "خطأ"),
        description: getText(
          "Please agree to the terms and conditions",
          "يرجى الموافقة على الشروط والأحكام",
        ),
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate registration
    setTimeout(() => {
      setUser({
        id: "1",
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        type: formData.accountType as "buyer" | "seller",
      });

      toast({
        title: getText("Account Created", "تم إنشاء الحساب"),
        description: getText(
          "Welcome to Wezo! Your account has been created successfully.",
          "مرحباً بك في ويزو! تم إنشاء حسابك بنجاح.",
        ),
      });

      setIsLoading(false);
      navigate("/");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft
            className={`h-4 w-4 ${language === "ar" ? "rotate-180 ml-2" : "mr-2"}`}
          />
          {getText("Back", "رجوع")}
        </Button>

        <Card>
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">W</span>
            </div>
            <CardTitle className="text-2xl">
              {getText("Create Account", "إنشاء حساب")}
            </CardTitle>
            <p className="text-gray-600">
              {getText(
                "Join Wezo to start shopping or selling",
                "انضم إلى ويزو لبدء التسوق أو البيع",
              )}
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Account Type */}
              <div>
                <Label className="text-base font-medium">
                  {getText("Account Type", "نوع الحساب")}
                </Label>
                <RadioGroup
                  value={formData.accountType}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, accountType: value }))
                  }
                  className="flex gap-6 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="buyer" id="buyer" />
                    <Label htmlFor="buyer">{getText("Buyer", "مشتري")}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="seller" id="seller" />
                    <Label htmlFor="seller">{getText("Seller", "بائع")}</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">
                    {getText("First Name", "الاسم الأول")}
                  </Label>
                  <div className="relative">
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder={getText("First Name", "الاسم الأول")}
                      className={language === "ar" ? "pr-10" : "pl-10"}
                      required
                    />
                    <User
                      className={`absolute ${language === "ar" ? "right-3" : "left-3"} top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5`}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="lastName">
                    {getText("Last Name", "اسم العائلة")}
                  </Label>
                  <div className="relative">
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder={getText("Last Name", "اسم العائلة")}
                      className={language === "ar" ? "pr-10" : "pl-10"}
                      required
                    />
                    <User
                      className={`absolute ${language === "ar" ? "right-3" : "left-3"} top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5`}
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email">
                  {getText("Email Address", "البريد الإلكتروني")}
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className={language === "ar" ? "pr-10" : "pl-10"}
                    required
                  />
                  <Mail
                    className={`absolute ${language === "ar" ? "right-3" : "left-3"} top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5`}
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <Label htmlFor="phone">
                  {getText("Phone Number", "رقم الهاتف")}
                </Label>
                <div className="relative">
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+249 XX XXX XXXX"
                    className={language === "ar" ? "pr-10" : "pl-10"}
                    required
                  />
                  <Phone
                    className={`absolute ${language === "ar" ? "right-3" : "left-3"} top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5`}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <Label htmlFor="password">
                  {getText("Password", "كلمة المرور")}
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className={language === "ar" ? "pr-10" : "pl-10"}
                    required
                  />
                  <Lock
                    className={`absolute ${language === "ar" ? "right-3" : "left-3"} top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5`}
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <Label htmlFor="confirmPassword">
                  {getText("Confirm Password", "تأكيد كلمة المرور")}
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className={language === "ar" ? "pr-10" : "pl-10"}
                    required
                  />
                  <Lock
                    className={`absolute ${language === "ar" ? "right-3" : "left-3"} top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5`}
                  />
                </div>
              </div>

              {/* Terms Agreement */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({
                      ...prev,
                      agreeToTerms: checked as boolean,
                    }))
                  }
                />
                <Label htmlFor="agreeToTerms" className="text-sm">
                  {getText(
                    "I agree to the Terms and Conditions",
                    "أوافق على الشروط والأحكام",
                  )}
                </Label>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading
                  ? getText("Creating Account...", "جاري إنشاء الحساب...")
                  : formData.accountType === "buyer"
                    ? getText("Create Buyer Account", "إنشاء حساب مشتري")
                    : getText("Create Seller Account", "إنشاء حساب بائع")}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {getText("Already have an account?", "لديك حساب بالفعل؟")}{" "}
                <Button
                  variant="link"
                  className="p-0 text-blue-600"
                  onClick={() => navigate("/auth/login")}
                >
                  {getText("Sign in", "تسجيل الدخول")}
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
