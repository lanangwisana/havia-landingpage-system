"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

interface SplashScreenProps {
  children: React.ReactNode;
  firstFillDuration?: number;
  secondFillDuration?: number;
}

export default function SplashScreen({
  children,
  firstFillDuration = 1600,
  secondFillDuration = 1200,
}: SplashScreenProps) {
  const [showSplash, setShowSplash] = useState(true);
  const [fillStage, setFillStage] = useState(0);

  const splashRef = useRef<HTMLDivElement>(null);
  const bgLayersRef = useRef<(HTMLDivElement | null)[]>([]);
  const logoContainerRef = useRef<HTMLDivElement>(null);
  const exitTriggered = useRef(false);

  const exitColors = [
    "#2c2a29", // charcoal
    "#f4ebd4", // cream
    "#f2f1f0", // offwhite
    "#c69c3d", // gold
  ];

  useEffect(() => {
    const t = setTimeout(() => setFillStage(1), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (fillStage === 1) {
      const t = setTimeout(() => setFillStage(2), firstFillDuration);
      return () => clearTimeout(t);
    }
  }, [fillStage, firstFillDuration]);

  useEffect(() => {
    if (fillStage === 2 && !exitTriggered.current) {
      exitTriggered.current = true;

      const exitTimer = setTimeout(() => {
        if (!bgLayersRef.current.length) return;

        const layers = bgLayersRef.current.filter(Boolean);

        const tl = gsap.timeline({
          onComplete: () => setShowSplash(false),
        });

        tl.to(logoContainerRef.current, {
          opacity: 0,
          duration: 0.4,
          ease: "power2.out",
        });

        tl.to(
          layers,
          {
            y: "-100%",
            duration: 0.8,
            ease: "power4.inOut",
            stagger: {
              each: 0.12, 
            },
          },
          "-=0.2"
        );
      }, secondFillDuration);

      return () => clearTimeout(exitTimer);
    }
  }, [fillStage, secondFillDuration]);

  if (!showSplash) return <>{children}</>;

  return (
    <div
      ref={splashRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#2c2a29" }}
    >
      {/* BACKGROUND LAYERS */}
      {exitColors.map((color, idx) => (
        <div
          key={idx}
          ref={(el) => {
            bgLayersRef.current[idx] = el;
          }}
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundColor: color,
            zIndex: exitColors.length - idx,
            transform: "translateY(0%)",
          }}
        />
      ))}

      {/* LOGO */}
      <div
        ref={logoContainerRef}
        className="relative w-32 h-32 md:w-40 md:h-40 z-20"
      >
        <Image
          src="/logo-havia-alt-white.png"
          alt="Havia"
          fill
          className="object-contain opacity-20"
          priority
        />

        {/* Fill 1 */}
        <div
          className="absolute inset-0"
          style={{
            clipPath:
              fillStage >= 1 ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)",
            transition: `clip-path ${firstFillDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
          }}
        >
          <Image
            src="/logo-havia-alt-white.png"
            alt="Fill 1"
            fill
            className="object-contain"
          />
        </div>

        {/* Fill 2 */}
        <div
          className="absolute inset-0"
          style={{
            clipPath:
              fillStage >= 2 ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)",
            transition: `clip-path ${secondFillDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
          }}
        >
          <Image
            src="/logo-havia-primary-white.png"
            alt="Fill 2"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}