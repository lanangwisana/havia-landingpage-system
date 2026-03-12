"use client";

import Image from "next/image";
import { Instagram, Linkedin, MapPin, Phone, Mail } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="bg-black text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-8">
        {/* Top Grid */}
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1.6fr_0.6fr_1.2fr]">
          {/* Brand */}
          <div>
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
              Partner terpercaya untuk merancang dan membangun masa depan Anda.
            </p>

            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/studiohavia/"
                target="_blank"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-havia-gold hover:text-[var(--havia-gold)] transition"
              >
                <Instagram size={18} />
              </a>

              <a
                href="https://www.linkedin.com/company/havia-studio/"
                target="_blank"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-havia-gold hover:text-[var(--havia-gold)] transition"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Kontak */}
          <div>
            <h4 className="text-sm uppercase tracking-[0.2em] mb-6 text-white/80">
              Alamat
            </h4>

            <div className="space-y-5 text-white/70">
              <a
                href="https://maps.app.goo.gl/WgGBhZU66tGKscuA7"
                target="_blank"
                className="flex gap-4 items-start hover:text-white transition"
              >
                <MapPin size={18} className="mt-1 text-havia-gold" />
                <p className="max-w-xs">
                  Jl. Sulaksana Baru III No.20, Cicaheum <br />
                  Kec. Kiaracondong, Kota Bandung
                </p>
              </a>
              <h4 className="mt-10 text-sm uppercase tracking-[0.2em] mb-6 text-white/80">
                Kontak
              </h4>
              <a
                href="https://wa.me/628112430121"
                target="_blank"
                className="flex gap-4 items-center hover:text-white transition"
              >
                <Phone size={18} className="text-havia-gold" />
                <p>+62 811 2430 121</p>
              </a>

              <a
                href="mailto:haviastudio@gmail.com"
                className="flex gap-4 items-center hover:text-white transition"
              >
                <Mail size={18} className="text-havia-gold" />
                <p>haviastudio@gmail.com</p>
              </a>
            </div>
          </div>

          {/* Menu */}
          <div>
            <h4 className="text-sm uppercase tracking-[0.2em] mb-6 text-white/80">
              Menu
            </h4>

            {/* Mobile 2 kolom */}
            <div className="grid grid-cols-2 gap-y-3 text-white/70 md:block md:space-y-3">
              <a href="#hero" className="block hover:text-white transition">
                Home
              </a>

              <a href="#about" className="block hover:text-white transition">
                About
              </a>

              <a
                href="#portfolio"
                className="block hover:text-white transition"
              >
                Portfolio
              </a>

              <a href="#trust" className="block hover:text-white transition">
                Testimonial
              </a>
            </div>
          </div>

          {/* Jam Operasional */}
          <div>
            <h4 className="text-sm uppercase tracking-[0.2em] mb-6 text-white/80">
              Jam Operasional
            </h4>

            <div className="space-y-4 text-white/70">
              <div className="flex justify-between">
                <span>Senin - Jumat</span>
                <span>08:00 - 17:00</span>
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
    </section>
  );
}
