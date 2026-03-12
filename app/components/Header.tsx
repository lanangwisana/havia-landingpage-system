"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function Header({ cmsData }: { cmsData: any }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="fixed top-6 left-0 w-full z-50 flex justify-center px-6">
        <div
          className={`transition-all duration-500 rounded-full border 
          ${scrolled 
            ? "w-full max-w-5xl bg-black/60 backdrop-blur-3xl border-white/15 shadow-[0_10px_40px_rgba(0,0,0,0.4)]" 
            : "w-full max-w-3xl bg-white/10 backdrop-blur-xl border-white/20"}`}
        >
          <nav
            className={`flex items-center justify-between transition-all duration-500
            ${scrolled ? "px-5 py-2.5" : "px-4 py-2.5"}`}
          >
            {/* Logo */}
            <a
              href="#hero"
              className={`relative transition-all duration-500 
              ${scrolled ? "w-[120px] h-[32px]" : "w-[105px] h-[26px]"}`}
            >
              <Image
                src="/logo-havia-primary-white.png"
                alt="Havia Studio Logo"
                fill
                priority
                className="object-contain"
              />
            </a>

            {/* Desktop Menu */}
            <ul
              className={`hidden md:flex items-center uppercase tracking-[0.2em] text-white transition-all duration-500
              ${scrolled ? "gap-10 text-xs" : "gap-8 text-[11px]"}`}
            >
              <li><a href="#about" className="hover:text-[var(--havia-gold)] transition">About</a></li>
              <li><a href="#portfolio" className="hover:text-[var(--havia-gold)] transition">Portfolio</a></li>
              <li><a href="#trust" className="hover:text-[var(--havia-gold)] transition">Testimonial</a></li>
              <li><a href="#contact" className="hover:text-[var(--havia-gold)] transition">Contact</a></li>
            </ul>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="fixed top-24 left-0 w-full flex justify-center z-40 px-6 md:hidden">
          <div className="w-full max-w-md rounded-2xl bg-black/70 backdrop-blur-2xl border border-white/10 p-6 shadow-xl">
            <ul className="flex flex-col items-center gap-6 uppercase tracking-[0.2em] text-white text-sm">
              <li><a href="#about" onClick={()=>setMenuOpen(false)}>About</a></li>
              <li><a href="#portfolio" onClick={()=>setMenuOpen(false)}>Portfolio</a></li>
              <li><a href="#trust" onClick={()=>setMenuOpen(false)}>Testimonial</a></li>
              <li><a href="#contact" onClick={()=>setMenuOpen(false)}>Contact</a></li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}