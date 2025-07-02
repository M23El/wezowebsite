"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import RTLWrapper from "@/components/layout/RTLWrapper";
import { useAppStore } from "@/lib/store";
import {
  User,
  MapPin,
  CreditCard,
  Bell,
  Shield,
  Globe,
  Save,
  Edit,
  Trash2,
  Plus,
  ArrowLeft,
  Phone,
  Mail,
  Calendar,
  Camera,
} from "lucide-react";

const ProfileSettings = () => {
  const { language, getText, setLanguage } = useAppStore();
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);

  const addresses = [
    {
      id: "1",
      type: getText("Home", "المنزل"),
      name: getText("Ahmed Ali", "أحمد علي"),
      address: getText(
        "Street 15, Block 7, Khartoum",
        "الشارع 15، المربع 7، الخرطوم",
      ),
      phone: "+249 123 456 789",
      isDefault: true,
    },
    {
      id: "2",
      type: getText("Work", "العمل"),
      name: getText("Ahmed Ali", "أحمد علي"),
      address: getText(
        "Office Building, Downtown, Khartoum",
        "مبنى المكاتب، وسط البلد، الخرطوم",
      ),
      phone: "+249 987 654 321",
      isDefault: false,
    },
  ];

  const paymentMethods = [
    {
      id: "1",
      type: getText("Bank Transfer", "تحويل بنكي"),
      details: getText("Bank of Khartoum - ****1234", "بنك الخرطوم - ****1234"),
      isDefault: true,
    },
    {
      id: "2",
      type: getText("Mobile Money", "المحفظة الإلكترونية"),
      details: getText("Zain Cash - ****5678", "زين كاش - ****5678"),
      isDefault: false,
    },
  ];

  return (
    <RTLWrapper className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="sm">
            <ArrowLeft
              className={`h-4 w-4 ${language === "ar" ? "rotate-180" : ""}`}
            />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {getText("Profile Settings", "إعدادات الملف الشخصي")}
            </h1>
            <p className="text-gray-600">
              {getText(
                "Manage your account settings and preferences",
                "إدارة إعدادات حسابك وتفضيلاتك",
              )}
            </p>
          </div>
        </div>

        {/* Main Content */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile">
              {getText("Profile", "الملف الشخصي")}
            </TabsTrigger>
            <TabsTrigger value="addresses">
              {getText("Addresses", "العناوين")}
            </TabsTrigger>
            <TabsTrigger value="payments">
              {getText("Payments", "المدفوعات")}
            </TabsTrigger>
            <TabsTrigger value="notifications">
              {getText("Notifications", "الإشعارات")}
            </TabsTrigger>
            <TabsTrigger value="security">
              {getText("Security", "الأمان")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {getText("Personal Information", "المعلومات الشخصية")}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    {isEditing
                      ? getText("Cancel", "إلغاء")
                      : getText("Edit", "تعديل")}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Picture */}
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-12 w-12 text-blue-600" />
                    </div>
                    {isEditing && (
                      <Button
                        size="sm"
                        className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">
                      {getText("Ahmed Ali", "أحمد علي")}
                    </h3>
                    <p className="text-gray-600">
                      {getText("Buyer Account", "حساب مشتري")}
                    </p>
                    <Badge variant="outline" className="mt-1">
                      {getText("Verified", "موثق")}
                    </Badge>
                  </div>
                </div>

                <Separator />

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">
                      {getText("First Name", "الاسم الأول")}
                    </Label>
                    <Input
                      id="firstName"
                      defaultValue={getText("Ahmed", "أحمد")}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">
                      {getText("Last Name", "اسم العائلة")}
                    </Label>
                    <Input
                      id="lastName"
                      defaultValue={getText("Ali", "علي")}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      {getText("Email", "البريد الإلكتروني")}
                    </Label>
                    <div className="relative">
                      <Input
                        id="email"
                        type="email"
                        defaultValue="ahmed@example.com"
                        disabled={!isEditing}
                        className={language === "ar" ? "pr-10" : "pl-10"}
                      />
                      <Mail
                        className={`absolute ${language === "ar" ? "right-3" : "left-3"} top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400`}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      {getText("Phone Number", "رقم الهاتف")}
                    </Label>
                    <div className="relative">
                      <Input
                        id="phone"
                        type="tel"
                        defaultValue="+249 123 456 789"
                        disabled={!isEditing}
                        className={language === "ar" ? "pr-10" : "pl-10"}
                      />
                      <Phone
                        className={`absolute ${language === "ar" ? "right-3" : "left-3"} top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400`}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="birthdate">
                      {getText("Birth Date", "تاريخ الميلاد")}
                    </Label>
                    <div className="relative">
                      <Input
                        id="birthdate"
                        type="date"
                        defaultValue="1990-01-01"
                        disabled={!isEditing}
                        className={language === "ar" ? "pr-10" : "pl-10"}
                      />
                      <Calendar
                        className={`absolute ${language === "ar" ? "right-3" : "left-3"} top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400`}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">
                      {getText("Language", "اللغة")}
                    </Label>
                    <div className="relative">
                      <select
                        id="language"
                        value={language}
                        onChange={(e) =>
                          setLanguage(e.target.value as "ar" | "en")
                        }
                        disabled={!isEditing}
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="ar">العربية</option>
                        <option value="en">English</option>
                      </select>
                      <Globe
                        className={`absolute ${language === "ar" ? "right-3" : "left-3"} top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none`}
                      />
                    </div>
                  </div>
                </div>

                {isEditing && (
                  <div className="flex justify-end gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                    >
                      {getText("Cancel", "إلغاء")}
                    </Button>
                    <Button onClick={() => setIsEditing(false)}>
                      <Save className="h-4 w-4 mr-2" />
                      {getText("Save Changes", "حفظ التغييرات")}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="addresses" className="space-y-6">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {getText("Delivery Addresses", "عناوين التوصيل")}
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    {getText("Add Address", "إضافة عنوان")}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {addresses.map((address) => (
                    <div key={address.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="outline">{address.type}</Badge>
                              {address.isDefault && (
                                <Badge variant="default" className="text-xs">
                                  {getText("Default", "افتراضي")}
                                </Badge>
                              )}
                            </div>
                            <p className="font-medium">{address.name}</p>
                            <p className="text-gray-600 text-sm">
                              {address.address}
                            </p>
                            <p className="text-gray-600 text-sm">
                              {address.phone}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments" className="space-y-6">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {getText("Payment Methods", "طرق الدفع")}
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    {getText("Add Payment Method", "إضافة طريقة دفع")}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <CreditCard className="h-5 w-5 text-gray-400" />
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-medium">{method.type}</p>
                              {method.isDefault && (
                                <Badge variant="default" className="text-xs">
                                  {getText("Default", "افتراضي")}
                                </Badge>
                              )}
                            </div>
                            <p className="text-gray-600 text-sm">
                              {method.details}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>
                  {getText("Notification Preferences", "تفضيلات الإشعارات")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">
                        {getText("Order Updates", "تحديثات الطلبات")}
                      </p>
                      <p className="text-sm text-gray-600">
                        {getText(
                          "Get notified about order status changes",
                          "احصل على إشعارات حول تغييرات حالة الطلب",
                        )}
                      </p>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">
                        {getText("Promotions", "العروض الترويجية")}
                      </p>
                      <p className="text-sm text-gray-600">
                        {getText(
                          "Receive promotional offers and discounts",
                          "احصل على العروض الترويجية والخصومات",
                        )}
                      </p>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">
                        {getText("New Products", "المنتجات الجديدة")}
                      </p>
                      <p className="text-sm text-gray-600">
                        {getText(
                          "Get notified about new product arrivals",
                          "احصل على إشعارات حول وصول منتجات جديدة",
                        )}
                      </p>
                    </div>
                    <input type="checkbox" className="rounded" />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">
                        {getText("Security Alerts", "تنبيهات الأمان")}
                      </p>
                      <p className="text-sm text-gray-600">
                        {getText(
                          "Important security notifications",
                          "إشعارات الأمان المهمة",
                        )}
                      </p>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                </div>
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  {getText("Save Preferences", "حفظ التفضيلات")}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>
                  {getText("Security Settings", "إعدادات الأمان")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">
                          {getText("Change Password", "تغيير كلمة المرور")}
                        </p>
                        <p className="text-sm text-gray-600">
                          {getText(
                            "Update your account password",
                            "تحديث كلمة مرور حسابك",
                          )}
                        </p>
                      </div>
                      <Button variant="outline">
                        {getText("Change", "تغيير")}
                      </Button>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">
                          {getText(
                            "Two-Factor Authentication",
                            "المصادقة الثنائية",
                          )}
                        </p>
                        <p className="text-sm text-gray-600">
                          {getText(
                            "Add an extra layer of security",
                            "أضف طبقة إضافية من الأمان",
                          )}
                        </p>
                      </div>
                      <Button variant="outline">
                        {getText("Enable", "تفعيل")}
                      </Button>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">
                          {getText("Login Activity", "نشاط تسجيل الدخول")}
                        </p>
                        <p className="text-sm text-gray-600">
                          {getText(
                            "View recent login activity",
                            "عرض نشاط تسجيل الدخول الأخير",
                          )}
                        </p>
                      </div>
                      <Button variant="outline">
                        {getText("View", "عرض")}
                      </Button>
                    </div>
                  </div>
                  <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-red-800">
                          {getText("Delete Account", "حذف الحساب")}
                        </p>
                        <p className="text-sm text-red-600">
                          {getText(
                            "Permanently delete your account and data",
                            "حذف حسابك وبياناتك نهائياً",
                          )}
                        </p>
                      </div>
                      <Button variant="destructive">
                        {getText("Delete", "حذف")}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </RTLWrapper>
  );
};

export default ProfileSettings;
