"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function Header({ cmsData }: { cmsData?: any }) {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#portfolio" },
    { label: "Client", href: "#trust" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white backdrop-blur-md shadow-sm"
          : "bg-transparent"
      } h-16`}
    >
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">

        {/* LOGO */}
        <a href="/" className="relative w-20 h-6">
          <Image
            src="/logo-havia-primary-black.png"
            alt="Havia Studio"
            fill
            className="object-contain"
          />
        </a>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-7">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onMouseEnter={() => setHoveredLink(item.label)}
              onMouseLeave={() => setHoveredLink(null)}
              className="relative text-[12px] tracking-[0.2em] text-[#2c2a29]/80 hover:text-[#2c2a29] transition-colors"
            >
              {item.label}

              <span
                className={`absolute -bottom-1 left-0 h-[1px] bg-havia-gold transition-all duration-300 ${
                  hoveredLink === item.label ? "w-full" : "w-0"
                }`}
              />
            </a>
          ))}
        </nav>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden text-[#2c2a29]"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden transition-all duration-500 overflow-hidden ${
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-havia-offwhite px-6 pt-6 pb-8 flex flex-col gap-6 border-t border-[#2c2a29]/10">

          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="text-sm uppercase tracking-[0.2em] text-[#2c2a29]"
            >
              {item.label}
            </a>
          ))}

        </div>
      </div>

    </header>
  );
}