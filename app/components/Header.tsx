"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header({ cmsData }: { cmsData?: any }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Projects", href: "#portfolio" },
    { label: "About", href: "#about" },
    { label: "Client", href: "#trust" },
    { label: "Contact", href: "#contact" },
  ];

  const handleMenuClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault(); 
    const targetId = href.substring(1); 
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const headerOffset = 64; 
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    } else {
      window.location.href = href;
    }
    setMobileOpen(false); 
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
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
              className="relative text-[12px] tracking-[0.2em] text-[#2c2a29]/80 hover:text-[#2c2a29] transition-colors group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-[1px] bg-[#c69c3d] transition-all duration-300 w-0 group-hover:w-full" />
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
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-white/90 border-t border-[#2c2a29]/10"
            style={{ zIndex: 999 }} 
          >
            <div className="px-6 pt-6 pb-8 flex flex-col gap-6">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleMenuClick(e, item.href)}
                  className="text-sm uppercase tracking-[0.2em] text-[#2c2a29] hover:text-[#c69c3d] transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}