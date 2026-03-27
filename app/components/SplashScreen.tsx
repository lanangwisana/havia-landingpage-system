"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface SplashScreenProps {
  children: React.ReactNode;
  minDisplayTime?: number;
  fillDuration?: number;
}

export default function SplashScreen({
  children,
  minDisplayTime = 2596,
  fillDuration = 2500,
}: SplashScreenProps) {
  const [showSplash, setShowSplash] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [fillStarted, setFillStarted] = useState(false);

  useEffect(() => {
    const startFill = setTimeout(() => setFillStarted(true), 50);
    const exitTimer = setTimeout(() => setExiting(true), minDisplayTime);

    return () => {
      clearTimeout(startFill);
      clearTimeout(exitTimer);
    };
  }, [minDisplayTime]);

  const handleTransitionEnd = () => {
    if (exiting) setShowSplash(false);
  };

  if (!showSplash) {
    return <>{children}</>;
  }

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden transition-transform duration-700 ease-out ${
        exiting ? "-translate-y-full" : "translate-y-0"
      }`}
      style={{ backgroundColor: "#2c2a29" }}
      onTransitionEnd={handleTransitionEnd}
    >
      <div className="relative w-32 h-32 md:w-40 md:h-40">
        <Image
          src="/logo-havia-alt-white.png"
          alt="Havia"
          fill
          className="object-contain opacity-20"
          priority
        />

        <div
          className="absolute inset-0"
          style={{
            clipPath: fillStarted ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)",
            transition: `clip-path ${fillDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
          }}
        >
          <Image
            src="/logo-havia-alt-white.png"
            alt="Havia Fill"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
