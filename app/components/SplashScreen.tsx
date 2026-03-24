"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface SplashScreenProps {
  children: React.ReactNode;
  minDisplayTime?: number;
}

export default function SplashScreen({ children, minDisplayTime = 2000 }: SplashScreenProps) {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, minDisplayTime);

    return () => clearTimeout(timer);
  }, [minDisplayTime]);

  if (showSplash) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-1000"
        style={{ backgroundColor: "#2c2a29" }}
      >
        <div className="relative w-32 h-32 md:w-40 md:h-40 animate-pulse">
          <Image
            src="/logo-havia-alt-white.png"
            alt="Havia"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      {children}
    </div>
  );
}