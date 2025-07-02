"use client";

import React, { useEffect } from "react";
import { useAppStore } from "@/lib/store";

interface RTLWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const RTLWrapper: React.FC<RTLWrapperProps> = ({
  children,
  className = "",
}) => {
  const { language } = useAppStore();

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = language;
    }
  }, [language]);

  return (
    <div
      className={`${language === "ar" ? "rtl" : "ltr"} ${className}`}
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      {children}
    </div>
  );
};

export default RTLWrapper;
