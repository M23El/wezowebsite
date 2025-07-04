"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import RTLWrapper from "@/components/layout/RTLWrapper";
import { useAppStore } from "@/lib/store";
import {
  Search,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Package,
  TrendingUp,
  AlertTriangle,
  Filter,
  ArrowLeft,
  Star,
} from "lucide-react";

const SellerProductsPage = () => {
  const { language, getText } = useAppStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  // Mock products data
  const products = [
    {
      id: "1",
      name: getText("Wireless Headphones", "سماعات لاسلكية"),
      price: 12999,
      stock: 25,
      sales: 45,
      rating: 4.5,
      status: getText("Active", "نشط"),
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&q=80",
      category: getText("Electronics", "إلكترونيات"),
      dateAdded: "2025-01-10",
    },
    {
      id: "2",
      name: getText("Smart Watch", "ساعة ذكية"),
      price: 19999,
      stock: 12,
      sales: 28,
      rating: 4.8,
      status: getText("Active", "نشط"),
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&q=80",
      category: getText("Electronics", "إلكترونيات"),
      dateAdded: "2025-01-08",
    },
    {
      id: "3",
      name: getText("Leather Bag", "حقيبة جلدية"),
      price: 8999,
      stock: 0,
      sales: 15,
      rating: 4.2,
      status: getText("Out of Stock", "نفد المخزون"),
      image:
        "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=100&q=80",
      category: getText("Fashion", "أزياء"),
      dateAdded: "2025-01-05",
    },
    {
      id: "4",
      name: getText("Smartphone", "هاتف ذكي"),
      price: 49999,
      stock: 8,
      sales: 62,
      rating: 4.9,
      status: getText("Active", "نشط"),
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02ff9?w=100&q=80",
      category: getText("Electronics", "إلكترونيات"),
      dateAdded: "2025-01-03",
    },
    {
      id: "5",
      name: getText("Office Chair", "كرسي مكتب"),
      price: 14999,
      stock: 18,
      sales: 22,
      rating: 4.0,
      status: getText("Draft", "مسودة"),
      image:
        "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=100&q=80",
      category: getText("Furniture", "أثاث"),
      dateAdded: "2025-01-01",
    },
  ];

  const stats = [
    {
      title: getText("Total Products", "إجمالي المنتجات"),
      value: products.length.toString(),
      icon: Package,
      color: "text-blue-600",
    },
    {
      title: getText("Active Products", "المنتجات النشطة"),
      value: products
        .filter((p) => p.status === getText("Active", "نشط"))
        .length.toString(),
      icon: TrendingUp,
      color: "text-green-600",
    },
    {
      title: getText("Out of Stock", "نفد المخزون"),
      value: products.filter((p) => p.stock === 0).length.toString(),
      icon: AlertTriangle,
      color: "text-red-600",
    },
    {
      title: getText("Total Sales", "إجمالي المبيعات"),
      value: products.reduce((sum, p) => sum + p.sales, 0).toString(),
      icon: TrendingUp,
      color: "text-purple-600",
    },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "active" && product.status === getText("Active", "نشط")) ||
      (activeTab === "draft" && product.status === getText("Draft", "مسودة")) ||
      (activeTab === "out-of-stock" && product.stock === 0);
    return matchesSearch && matchesTab;
  });

  const formatPrice = (price: number) => {
    return language === "ar"
      ? `${price.toLocaleString()} ج.س`
      : `SDG ${price.toLocaleString()}`;
  };

  const getStatusBadge = (status: string, stock: number) => {
    if (stock === 0) {
      return (
        <Badge variant="destructive">
          {getText("Out of Stock", "نفد المخزون")}
        </Badge>
      );
    }
    if (status === getText("Active", "نشط")) {
      return <Badge variant="default">{status}</Badge>;
    }
    return <Badge variant="secondary">{status}</Badge>;
  };

  const handleDeleteProduct = (productId: string) => {
    // Handle product deletion
    console.log("Delete product:", productId);
  };

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
                {getText("My Products", "منتجاتي")}
              </h1>
              <p className="text-gray-600">
                {getText(
                  "Manage your product inventory",
                  "إدارة مخزون منتجاتك",
                )}
              </p>
            </div>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            {getText("Add Product", "إضافة منتج")}
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stat.value}
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

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder={getText(
                    "Search products...",
                    "البحث عن المنتجات...",
                  )}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  {getText("Filter", "تصفية")}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Products Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{getText("Products", "المنتجات")}</CardTitle>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="all">
                    {getText("All", "الكل")} ({products.length})
                  </TabsTrigger>
                  <TabsTrigger value="active">
                    {getText("Active", "نشط")} (
                    {
                      products.filter(
                        (p) => p.status === getText("Active", "نشط"),
                      ).length
                    }
                    )
                  </TabsTrigger>
                  <TabsTrigger value="draft">
                    {getText("Draft", "مسودة")} (
                    {
                      products.filter(
                        (p) => p.status === getText("Draft", "مسودة"),
                      ).length
                    }
                    )
                  </TabsTrigger>
                  <TabsTrigger value="out-of-stock">
                    {getText("Out of Stock", "نفد المخزون")} (
                    {products.filter((p) => p.stock === 0).length})
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">
                          {product.name}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {product.category}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(product.rating)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">
                            ({product.rating})
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-8">
                      <div className="text-center">
                        <p className="text-sm text-gray-600">
                          {getText("Price", "السعر")}
                        </p>
                        <p className="font-semibold">
                          {formatPrice(product.price)}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">
                          {getText("Stock", "المخزون")}
                        </p>
                        <p
                          className={`font-semibold ${product.stock === 0 ? "text-red-600" : ""}`}
                        >
                          {product.stock}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">
                          {getText("Sales", "المبيعات")}
                        </p>
                        <p className="font-semibold">{product.sales}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">
                          {getText("Status", "الحالة")}
                        </p>
                        {getStatusBadge(product.status, product.stock)}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                {getText("Delete Product", "حذف المنتج")}
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                {getText(
                                  "Are you sure you want to delete this product? This action cannot be undone.",
                                  "هل أنت متأكد من حذف هذا المنتج؟ لا يمكن التراجع عن هذا الإجراء.",
                                )}
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>
                                {getText("Cancel", "إلغاء")}
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteProduct(product.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                {getText("Delete", "حذف")}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {getText("No products found", "لا توجد منتجات")}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {getText(
                      "No products match your search criteria.",
                      "لا توجد منتجات تطابق معايير البحث.",
                    )}
                  </p>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    {getText("Add Your First Product", "أضف منتجك الأول")}
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </RTLWrapper>
  );
};

export default SellerProductsPage;
