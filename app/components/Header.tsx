"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-6 w-full z-50 flex justify-center px-6">
      <div
        className={`transition-all duration-500 rounded-full border 
        ${scrolled 
          ? "w-full max-w-5xl bg-black/60 backdrop-blur-3xl border-white/15 shadow-[0_10px_40px_rgba(0,0,0,0.4)]" 
          : "w-full max-w-3xl bg-white/10 backdrop-blur-l border-white/20"}
        `}
      >
        <nav
          className={`flex items-center justify-between transition-all duration-500
          ${scrolled ? "px-5 py-2.5" : "px-4 py-2.5"}
          `}
        >
          {/* Logo */}
          <a
            href="#hero"
            className={`relative transition-all duration-500 
            ${scrolled ? "w-[120px] h-[32px]" : "w-[105px] h-[26px]"}
            `}
          >
            <Image
              src="/logo-havia-primary-white.png"
              alt="Havia Studio Logo"
              fill
              priority
              className="object-contain"
            />
          </a>

          {/* Menu */}
          <ul
            className={`hidden md:flex items-center uppercase tracking-[0.2em] text-white transition-all duration-500
            ${scrolled ? "gap-10 text-xs" : "gap-8 text-[11px]"}
            `}
          >
            <li><a href="#about" className="hover:text-[var(--havia-gold)] transition">About</a></li>
            <li><a href="#portfolio" className="hover:text-[var(--havia-gold)] transition">Portfolio</a></li>
            <li><a href="#trust" className="hover:text-[var(--havia-gold)] transition">Testimonial</a></li>
            <li><a href="#contact" className="hover:text-[var(--havia-gold)] transition">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}