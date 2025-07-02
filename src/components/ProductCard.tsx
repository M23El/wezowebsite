"use client";

import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ProductCardProps {
  id?: string;
  title?: string;
  price?: number;
  image?: string;
  rating?: number;
  seller?: string;
  isRTL?: boolean;
  onAddToCart?: (id: string) => void;
  onAddToWishlist?: (id: string) => void;
}

const ProductCard = ({
  id = "1",
  title = "منتج رائع",
  price = 1999.99,
  image = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80",
  rating = 4.5,
  seller = "متجر الإلكترونيات",
  isRTL = true,
  onAddToCart = () => {},
  onAddToWishlist = () => {},
}: ProductCardProps) => {
  const formattedPrice = isRTL
    ? new Intl.NumberFormat("ar-SD", {
        style: "currency",
        currency: "SDG",
      }).format(price)
    : `${price.toLocaleString()} SDG`;

  const textDirection = isRTL ? "rtl" : "ltr";
  const textAlign = isRTL ? "text-right" : "text-left";

  return (
    <Card className="w-full max-w-[280px] overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <AspectRatio ratio={4 / 3}>
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </AspectRatio>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full"
          onClick={() => onAddToWishlist(id)}
        >
          <Heart className="h-5 w-5 text-gray-600 hover:text-red-500 transition-colors" />
        </Button>
      </div>

      <CardContent className="p-4" dir={textDirection}>
        <div className={`${textAlign} mb-1`}>
          <Badge variant="secondary" className="mb-2">
            {seller}
          </Badge>
        </div>
        <h3 className={`font-semibold text-lg mb-1 line-clamp-2 ${textAlign}`}>
          {title}
        </h3>
        <div
          className={`flex items-center ${isRTL ? "justify-end" : "justify-start"} mb-2`}
        >
          <span className="text-amber-500 mr-1">{rating}</span>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-amber-500 text-amber-500" : "text-gray-300"}`}
              />
            ))}
          </div>
        </div>
        <div className={`text-xl font-bold text-primary ${textAlign}`}>
          {formattedPrice}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button className="w-full" onClick={() => onAddToCart(id)}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          {isRTL ? "أضف إلى السلة" : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
