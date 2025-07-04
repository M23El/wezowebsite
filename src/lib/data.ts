export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  images?: string[];
  rating: number;
  seller: string;
  category: string;
  description?: string;
  stock?: number;
}

export const mockProducts: Product[] = [
  {
    id: "1",
    title: "سماعات لاسلكية فاخرة",
    price: 12999,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&q=80",
    ],
    rating: 4.5,
    seller: "متجر الإلكترونيات",
    category: "electronics",
    description:
      "سماعات لاسلكية عالية الجودة مع تقنية إلغاء الضوضاء وبطارية تدوم 30 ساعة.",
    stock: 15,
  },
  {
    id: "2",
    title: "ساعة ذكية متطورة",
    price: 19999,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
    rating: 4.8,
    seller: "متجر التكنولوجيا",
    category: "electronics",
    description: "ساعة ذكية مع مراقبة الصحة وإشعارات الهاتف ومقاومة للماء.",
    stock: 8,
  },
  {
    id: "3",
    title: "هاتف ذكي جديد",
    price: 49999,
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02ff9?w=500&q=80",
    rating: 4.9,
    seller: "متجر الإلكترونيات",
    category: "electronics",
    description: "هاتف ذكي بأحدث المواصفات وكاميرا عالية الدقة.",
    stock: 5,
  },
  {
    id: "4",
    title: "حقيبة جلدية أنيقة",
    price: 8999,
    image:
      "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=500&q=80",
    rating: 4.2,
    seller: "متجر الأزياء",
    category: "fashion",
    description: "حقيبة جلدية طبيعية عالية الجودة ومناسبة لجميع المناسبات.",
    stock: 20,
  },
];

export const getProductById = (id: string): Product | undefined => {
  return mockProducts.find((product) => product.id === id);
};

export const formatPrice = (price: number, language: string = "ar"): string => {
  // Force English numerals for all numbers
  const formattedNumber = price.toLocaleString("en");
  if (language === "ar") {
    return `${formattedNumber} ج.س`;
  }
  return `SDG ${formattedNumber}`;
};

export const categories = [
  { id: "electronics", name: { en: "Electronics", ar: "إلكترونيات" } },
  { id: "fashion", name: { en: "Fashion", ar: "أزياء" } },
  { id: "home", name: { en: "Home & Kitchen", ar: "المنزل والمطبخ" } },
  { id: "beauty", name: { en: "Beauty", ar: "الجمال" } },
  { id: "personal-care", name: { en: "Personal Care", ar: "العناية الشخصية" } },
  { id: "sports", name: { en: "Sports", ar: "رياضة" } },
  { id: "games", name: { en: "Games", ar: "ألعاب" } },
  { id: "books", name: { en: "Books", ar: "كتب" } },
];
