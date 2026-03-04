"use client";

import Image from "next/image";
import { Instagram, Linkedin, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-8">

        {/* Top Grid */}
        <div className="grid md:grid-cols-3 gap-16">

          {/* Left - Brand */}
          <div>
            {/* Logo Image */}
            <div className="mb-6">
              <Image
                src="/logo-havia-primary-white.png"  
                alt="Havia Studio Logo"
                width={140}
                height={36}
                className="object-contain"
              />
            </div>

            <p className="text-white/70 leading-relaxed mb-8 max-w-sm">
              Partner terpercaya untuk merancang dan membangun masa depan
              Anda di Bandung.
            </p>

            {/* Social */}
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/studiohavia/"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-havia-gold hover:text-[var(--havia-gold)] transition"
              >
                <Instagram size={18} />
              </a>

              <a
                href="https://www.linkedin.com/company/havia-studio/"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-havia-gold hover:text-[var(--havia-gold)] transition"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Middle - Contact */}
          <div>
            <h4 className="text-sm uppercase tracking-[0.2em] mb-6 text-white/80">
              Kontak
            </h4>

            <div className="space-y-5 text-white/70">

              <div className="flex gap-4 items-start">
                <MapPin size={18} className="mt-1 text-havia-gold" />
                <p>
                  Jl. Sulaksana Baru III No.20, Cicaheum, <br />
                  Kec. Kiaracondong, Kota Bandung, Jawa Barat
                </p>
              </div>

              <div className="flex gap-4 items-center">
                <Phone size={18} className="text-havia-gold" />
                <p>+628112430121</p>
              </div>

              <div className="flex gap-4 items-center">
                <Mail size={18} className="text-havia-gold" />
                <p>haviastudio@gmail.com</p>
              </div>

            </div>
          </div>

          {/* Right - Operational Hours */}
          <div>
            <h4 className="text-sm uppercase tracking-[0.2em] mb-6 text-white/80">
              Jam Operasional
            </h4>

            <div className="space-y-4 text-white/70">

              <div className="flex justify-between">
                <span>Senin - Jumat</span>
                <span>09:00 - 17:00</span>
              </div>

              <div className="flex justify-between">
                <span>Sabtu - Minggu</span>
                <span className="text-havia-gold">Tutup</span>
              </div>

            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mt-16 pt-8 text-center text-sm text-white/40">
          © 2026 Havia Studio. All rights reserved.
        </div>

      </div>
    </footer>
  );
}