"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import RTLWrapper from "@/components/layout/RTLWrapper";
import { useAppStore } from "@/lib/store";
import {
  Users,
  Store,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Ban,
  CheckCircle,
  ArrowLeft,
  Calendar,
  Download,
} from "lucide-react";

const AdminDashboard = () => {
  const { language, getText } = useAppStore();
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    {
      title: getText("Total Users", "إجمالي المستخدمين"),
      value: "2,847",
      change: "+12.5%",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: getText("Active Sellers", "البائعون النشطون"),
      value: "156",
      change: "+8.2%",
      icon: Store,
      color: "text-green-600",
    },
    {
      title: getText("Total Orders", "إجمالي الطلبات"),
      value: "8,924",
      change: "+15.3%",
      icon: ShoppingCart,
      color: "text-purple-600",
    },
    {
      title: getText("Platform Revenue", "إيرادات المنصة"),
      value: getText("SDG 234,567", "ج.س 234,567"),
      change: "+18.7%",
      icon: DollarSign,
      color: "text-orange-600",
    },
  ];

  const recentUsers = [
    {
      id: "1",
      name: getText("Ahmed Ali", "أحمد علي"),
      email: "ahmed@example.com",
      type: getText("Buyer", "مشتري"),
      status: getText("Active", "نشط"),
      joinDate: "2025-01-10",
      orders: 5,
    },
    {
      id: "2",
      name: getText("Fatima Hassan", "فاطمة حسن"),
      email: "fatima@example.com",
      type: getText("Seller", "بائع"),
      status: getText("Active", "نشط"),
      joinDate: "2025-01-08",
      orders: 23,
    },
    {
      id: "3",
      name: getText("Omar Ibrahim", "عمر إبراهيم"),
      email: "omar@example.com",
      type: getText("Buyer", "مشتري"),
      status: getText("Suspended", "معلق"),
      joinDate: "2025-01-05",
      orders: 2,
    },
  ];

  const sellers = [
    {
      id: "1",
      name: getText("Tech Store", "متجر التقنية"),
      owner: getText("Ahmed Ali", "أحمد علي"),
      products: 24,
      sales: getText("SDG 45,231", "ج.س 45,231"),
      rating: 4.5,
      status: getText("Active", "نشط"),
      joinDate: "2024-12-15",
    },
    {
      id: "2",
      name: getText("Fashion Hub", "مركز الأزياء"),
      owner: getText("Fatima Hassan", "فاطمة حسن"),
      products: 18,
      sales: getText("SDG 32,456", "ج.س 32,456"),
      rating: 4.2,
      status: getText("Active", "نشط"),
      joinDate: "2024-12-10",
    },
    {
      id: "3",
      name: getText("Home Essentials", "أساسيات المنزل"),
      owner: getText("Omar Ibrahim", "عمر إبراهيم"),
      products: 12,
      sales: getText("SDG 18,789", "ج.س 18,789"),
      rating: 3.8,
      status: getText("Under Review", "قيد المراجعة"),
      joinDate: "2024-12-05",
    },
  ];

  const reports = [
    {
      id: "1",
      type: getText("Product Report", "بلاغ منتج"),
      reporter: getText("Ahmed Ali", "أحمد علي"),
      reported: getText("Fake Product", "منتج مزيف"),
      status: getText("Pending", "قيد الانتظار"),
      date: "2025-01-15",
      priority: "high",
    },
    {
      id: "2",
      type: getText("Seller Report", "بلاغ بائع"),
      reporter: getText("Fatima Hassan", "فاطمة حسن"),
      reported: getText("Poor Service", "خدمة ضعيفة"),
      status: getText("Investigating", "قيد التحقيق"),
      date: "2025-01-14",
      priority: "medium",
    },
  ];

  return (
    <RTLWrapper className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              <ArrowLeft
                className={`h-4 w-4 ${language === "ar" ? "rotate-180" : ""}`}
              />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {getText("Admin Dashboard", "لوحة تحكم الإدارة")}
              </h1>
              <p className="text-gray-600">
                {getText(
                  "Manage platform users and operations",
                  "إدارة مستخدمي المنصة والعمليات",
                )}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              {getText("Reports", "التقارير")}
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              {getText("Export", "تصدير")}
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stat.value}
                      </p>
                      <p className="text-sm text-green-600 font-medium">
                        {stat.change}
                      </p>
                    </div>
                    <div
                      className={`p-3 rounded-full bg-gray-100 ${stat.color}`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">
              {getText("Overview", "نظرة عامة")}
            </TabsTrigger>
            <TabsTrigger value="users">
              {getText("Users", "المستخدمون")}
            </TabsTrigger>
            <TabsTrigger value="sellers">
              {getText("Sellers", "البائعون")}
            </TabsTrigger>
            <TabsTrigger value="reports">
              {getText("Reports", "البلاغات")}
            </TabsTrigger>
            <TabsTrigger value="analytics">
              {getText("Analytics", "التحليلات")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>
                    {getText("Recent Activity", "النشاط الأخير")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <Users className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium">
                          {getText("New user registered", "مستخدم جديد مسجل")}
                        </p>
                        <p className="text-xs text-gray-600">
                          2 {getText("minutes ago", "دقائق مضت")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <Store className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="text-sm font-medium">
                          {getText("Seller approved", "تم الموافقة على البائع")}
                        </p>
                        <p className="text-xs text-gray-600">
                          15 {getText("minutes ago", "دقيقة مضت")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                      <AlertTriangle className="h-5 w-5 text-orange-600" />
                      <div>
                        <p className="text-sm font-medium">
                          {getText(
                            "New report submitted",
                            "تم تقديم بلاغ جديد",
                          )}
                        </p>
                        <p className="text-xs text-gray-600">
                          1 {getText("hour ago", "ساعة مضت")}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>
                    {getText("Quick Actions", "إجراءات سريعة")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="h-20 flex-col">
                      <Users className="h-6 w-6 mb-2" />
                      {getText("Manage Users", "إدارة المستخدمين")}
                    </Button>
                    <Button variant="outline" className="h-20 flex-col">
                      <Store className="h-6 w-6 mb-2" />
                      {getText("Review Sellers", "مراجعة البائعين")}
                    </Button>
                    <Button variant="outline" className="h-20 flex-col">
                      <AlertTriangle className="h-6 w-6 mb-2" />
                      {getText("Handle Reports", "معالجة البلاغات")}
                    </Button>
                    <Button variant="outline" className="h-20 flex-col">
                      <TrendingUp className="h-6 w-6 mb-2" />
                      {getText("View Analytics", "عرض التحليلات")}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {getText("User Management", "إدارة المستخدمين")}
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder={getText(
                          "Search users...",
                          "البحث عن المستخدمين...",
                        )}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className="text-sm text-gray-600">
                            {getText("Type", "النوع")}
                          </p>
                          <Badge variant="outline">{user.type}</Badge>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-600">
                            {getText("Orders", "الطلبات")}
                          </p>
                          <p className="font-medium">{user.orders}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-600">
                            {getText("Status", "الحالة")}
                          </p>
                          <Badge
                            variant={
                              user.status === getText("Active", "نشط")
                                ? "default"
                                : "destructive"
                            }
                          >
                            {user.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Ban className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sellers" className="space-y-6">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>
                  {getText("Seller Management", "إدارة البائعين")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sellers.map((seller) => (
                    <div
                      key={seller.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <Store className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">{seller.name}</p>
                          <p className="text-sm text-gray-600">
                            {seller.owner}
                          </p>
                          <p className="text-xs text-gray-500">
                            {getText("Joined", "انضم في")} {seller.joinDate}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className="text-sm text-gray-600">
                            {getText("Products", "المنتجات")}
                          </p>
                          <p className="font-medium">{seller.products}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-600">
                            {getText("Sales", "المبيعات")}
                          </p>
                          <p className="font-medium">{seller.sales}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-600">
                            {getText("Rating", "التقييم")}
                          </p>
                          <p className="font-medium">{seller.rating}/5</p>
                        </div>
                        <div className="text-center">
                          <Badge
                            variant={
                              seller.status === getText("Active", "نشط")
                                ? "default"
                                : "secondary"
                            }
                          >
                            {seller.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>
                  {getText("Report Management", "إدارة البلاغات")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reports.map((report) => (
                    <div
                      key={report.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            report.priority === "high"
                              ? "bg-red-100"
                              : report.priority === "medium"
                                ? "bg-yellow-100"
                                : "bg-blue-100"
                          }`}
                        >
                          <AlertTriangle
                            className={`h-5 w-5 ${
                              report.priority === "high"
                                ? "text-red-600"
                                : report.priority === "medium"
                                  ? "text-yellow-600"
                                  : "text-blue-600"
                            }`}
                          />
                        </div>
                        <div>
                          <p className="font-medium">{report.type}</p>
                          <p className="text-sm text-gray-600">
                            {getText("Reporter", "المبلغ")}: {report.reporter}
                          </p>
                          <p className="text-sm text-gray-600">
                            {report.reported}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <p className="text-sm text-gray-600">
                            {getText("Date", "التاريخ")}
                          </p>
                          <p className="text-sm">{report.date}</p>
                        </div>
                        <Badge
                          variant={
                            report.status === getText("Pending", "قيد الانتظار")
                              ? "secondary"
                              : "default"
                          }
                        >
                          {report.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          {getText("Review", "مراجعة")}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>
                    {getText("Platform Growth", "نمو المنصة")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        {getText(
                          "Monthly Active Users",
                          "المستخدمون النشطون شهرياً",
                        )}
                      </span>
                      <span className="font-medium">2,847</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        {getText("New Registrations", "التسجيلات الجديدة")}
                      </span>
                      <span className="font-medium">234</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        {getText("Growth Rate", "معدل النمو")}
                      </span>
                      <span className="font-medium text-green-600">+12.5%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>
                    {getText("Revenue Analytics", "تحليلات الإيرادات")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        {getText("Total Revenue", "إجمالي الإيرادات")}
                      </span>
                      <span className="font-medium">SDG 234,567</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        {getText("Commission Earned", "العمولة المكتسبة")}
                      </span>
                      <span className="font-medium">SDG 11,728</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        {getText("Growth", "النمو")}
                      </span>
                      <span className="font-medium text-green-600">+18.7%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </RTLWrapper>
  );
};

export default AdminDashboard;
