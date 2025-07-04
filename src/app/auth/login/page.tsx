"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Lock, ArrowLeft } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { useToast } from "@/components/ui/toast-simple";

const LoginPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language, getText, setUser } = useAppStore();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
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
    setIsLoading(true);

    // Simulate login
    setTimeout(() => {
      setUser({
        id: "1",
        name: getText("Ahmed Ali", "أحمد علي"),
        email: formData.email,
        type: "buyer",
      });

      toast({
        title: getText("Login Successful", "تم تسجيل الدخول بنجاح"),
        description: getText("Welcome back!", "مرحباً بعودتك!"),
      });

      setIsLoading(false);
      navigate("/");
    }, 1500);
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
              {getText("Welcome Back", "مرحباً بعودتك")}
            </CardTitle>
            <p className="text-gray-600">
              {getText(
                "Sign in to your account to continue",
                "سجل دخولك للمتابعة",
              )}
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
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

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={formData.remember}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({
                        ...prev,
                        remember: checked as boolean,
                      }))
                    }
                  />
                  <Label htmlFor="remember" className="text-sm">
                    {getText("Remember me", "تذكرني")}
                  </Label>
                </div>
                <Button variant="link" className="text-sm p-0">
                  {getText("Forgot password?", "نسيت كلمة المرور؟")}
                </Button>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading
                  ? getText("Signing in...", "جاري تسجيل الدخول...")
                  : getText("Sign In", "تسجيل الدخول")}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {getText("Don't have an account?", "ليس لديك حساب؟")}{" "}
                <Button
                  variant="link"
                  className="p-0 text-blue-600"
                  onClick={() => navigate("/auth/register")}
                >
                  {getText("Sign up", "إنشاء حساب")}
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
