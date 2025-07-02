"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RTLWrapper from "@/components/layout/RTLWrapper";
import { useAppStore } from "@/lib/store";
import {
  DollarSign,
  Package,
  ShoppingCart,
  TrendingUp,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Download,
  Calendar,
  Users,
  Star,
  ArrowLeft,
} from "lucide-react";

const SellerDashboard = () => {
  const { language, getText } = useAppStore();
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    {
      title: getText("Total Revenue", "إجمالي الإيرادات"),
      value: getText("SDG 45,231", "ج.س 45,231"),
      change: "+20.1%",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: getText("Total Orders", "إجمالي الطلبات"),
      value: "156",
      change: "+15.3%",
      icon: ShoppingCart,
      color: "text-blue-600",
    },
    {
      title: getText("Products", "المنتجات"),
      value: "24",
      change: "+2",
      icon: Package,
      color: "text-purple-600",
    },
    {
      title: getText("Growth Rate", "معدل النمو"),
      value: "12.5%",
      change: "+2.4%",
      icon: TrendingUp,
      color: "text-orange-600",
    },
  ];

  const recentOrders = [
    {
      id: "#12345",
      customer: getText("Ahmed Ali", "أحمد علي"),
      product: getText("Wireless Headphones", "سماعات لاسلكية"),
      amount: getText("SDG 8,999", "ج.س 8,999"),
      status: getText("Pending", "قيد الانتظار"),
      date: "2025-01-15",
    },
    {
      id: "#12346",
      customer: getText("Fatima Hassan", "فاطمة حسن"),
      product: getText("Smart Watch", "ساعة ذكية"),
      amount: getText("SDG 19,999", "ج.س 19,999"),
      status: getText("Shipped", "تم الشحن"),
      date: "2025-01-14",
    },
    {
      id: "#12347",
      customer: getText("Omar Ibrahim", "عمر إبراهيم"),
      product: getText("Laptop Pro", "لابتوب برو"),
      amount: getText("SDG 129,999", "ج.س 129,999"),
      status: getText("Delivered", "تم التسليم"),
      date: "2025-01-13",
    },
  ];

  const products = [
    {
      id: "1",
      name: getText("Wireless Headphones", "سماعات لاسلكية"),
      price: getText("SDG 8,999", "ج.س 8,999"),
      stock: 15,
      sales: 45,
      rating: 4.5,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&q=80",
    },
    {
      id: "2",
      name: getText("Smart Watch", "ساعة ذكية"),
      price: getText("SDG 19,999", "ج.س 19,999"),
      stock: 8,
      sales: 32,
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&q=80",
    },
    {
      id: "3",
      name: getText("Laptop Pro", "لابتوب برو"),
      price: getText("SDG 129,999", "ج.س 129,999"),
      stock: 3,
      sales: 12,
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=100&q=80",
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
                {getText("Seller Dashboard", "لوحة تحكم البائع")}
              </h1>
              <p className="text-gray-600">
                {getText(
                  "Manage your products and orders",
                  "إدارة منتجاتك وطلباتك",
                )}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              {getText("Export", "تصدير")}
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              {getText("Add Product", "إضافة منتج")}
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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">
              {getText("Overview", "نظرة عامة")}
            </TabsTrigger>
            <TabsTrigger value="products">
              {getText("Products", "المنتجات")}
            </TabsTrigger>
            <TabsTrigger value="orders">
              {getText("Orders", "الطلبات")}
            </TabsTrigger>
            <TabsTrigger value="analytics">
              {getText("Analytics", "التحليلات")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Recent Orders */}
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {getText("Recent Orders", "الطلبات الأخيرة")}
                  <Button variant="link" size="sm">
                    {getText("View All", "عرض الكل")}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="font-medium">{order.id}</p>
                          <p className="text-sm text-gray-600">
                            {order.customer}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm">{order.product}</p>
                          <p className="text-sm text-gray-600">{order.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="font-medium">{order.amount}</p>
                        <Badge
                          variant={
                            order.status === getText("Delivered", "تم التسليم")
                              ? "default"
                              : "secondary"
                          }
                        >
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {getText("Product Management", "إدارة المنتجات")}
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder={getText(
                          "Search products...",
                          "البحث عن المنتجات...",
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
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-gray-600">
                            {product.price}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm">{product.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className="text-sm text-gray-600">
                            {getText("Stock", "المخزون")}
                          </p>
                          <p className="font-medium">{product.stock}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-600">
                            {getText("Sales", "المبيعات")}
                          </p>
                          <p className="font-medium">{product.sales}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
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

          <TabsContent value="orders" className="space-y-6">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>
                  {getText("Order Management", "إدارة الطلبات")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="font-medium">{order.id}</p>
                          <p className="text-sm text-gray-600">
                            {order.customer}
                          </p>
                          <p className="text-sm text-gray-600">{order.date}</p>
                        </div>
                        <div>
                          <p className="text-sm">{order.product}</p>
                          <p className="font-medium">{order.amount}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge
                          variant={
                            order.status === getText("Delivered", "تم التسليم")
                              ? "default"
                              : "secondary"
                          }
                        >
                          {order.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          {getText("View Details", "عرض التفاصيل")}
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
                    {getText("Sales Analytics", "تحليلات المبيعات")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        {getText("This Month", "هذا الشهر")}
                      </span>
                      <span className="font-medium">SDG 15,234</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        {getText("Last Month", "الشهر الماضي")}
                      </span>
                      <span className="font-medium">SDG 12,456</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        {getText("Growth", "النمو")}
                      </span>
                      <span className="font-medium text-green-600">+22.3%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>
                    {getText("Customer Insights", "رؤى العملاء")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        {getText("Total Customers", "إجمالي العملاء")}
                      </span>
                      <span className="font-medium">89</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        {getText("Repeat Customers", "العملاء المتكررون")}
                      </span>
                      <span className="font-medium">34</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        {getText("Satisfaction Rate", "معدل الرضا")}
                      </span>
                      <span className="font-medium text-green-600">4.6/5</span>
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

export default SellerDashboard;
