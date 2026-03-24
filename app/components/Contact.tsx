"use client";

import Image from "next/image";
import { Instagram, Linkedin, MapPin, Phone, Mail } from "lucide-react";

export default function Contact({ cmsData }: { cmsData: any }) {
  const tagline = cmsData?.landingpage_contact_p || "Partner terpercaya untuk merancang dan membangun masa depan Anda.";
  const instagramUrl = cmsData?.landingpage_contact_instagram || "https://www.instagram.com/studiohavia/";
  const linkedinUrl = cmsData?.landingpage_contact_linkedin || "https://www.linkedin.com/company/havia-studio/";
  const address = cmsData?.landingpage_contact_address || "Jl. Sulaksana Baru III No.20, Cicaheum, Kec. Kiaracondong, Kota Bandung";
  const mapsUrl = cmsData?.landingpage_contact_maps_url || "https://maps.app.goo.gl/WgGBhZU66tGKscuA7";
  const phone = cmsData?.landingpage_contact_phone || "+62 811 2430 121";
  const email = cmsData?.landingpage_contact_email || "haviastudio@gmail.com";
  const hoursWeekday = cmsData?.landingpage_contact_hours_weekday || "Senin - Jumat / 08:00 - 17:00";
  const hoursWeekend = cmsData?.landingpage_contact_hours_weekend || "Sabtu - Minggu / Tutup";
  const copyright = cmsData?.landingpage_contact_copyright || "\u00A9 2026 Havia Studio. All rights reserved.";

  // Parse weekday/weekend into label + value
  const weekdayParts = hoursWeekday.split(" / ");
  const weekendParts = hoursWeekend.split(" / ");

  // Format phone for WA link (strip spaces, +, -)
  const waPhone = phone.replace(/[\s\-\+]/g, "");

  return (
    <section id="contact" className="bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top Grid */}
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1.6fr_0.6fr_1.2fr]">
          {/* Brand */}
          <div>
            <div className="mb-6">
              <Image
                src="/logo-havia-primary-white.png"
                alt="Havia Studio Logo"
                width={120}
                height={30}
                className="object-contain"
              />
            </div>

            <p className="text-white/70 leading-relaxed mb-8 max-w-sm">
              {tagline}
            </p>

            <div className="flex gap-4">
              <a
                href={instagramUrl}
                target="_blank"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-havia-gold hover:text-[var(--havia-gold)] transition"
              >
                <Instagram size={18} />
              </a>

              <a
                href={linkedinUrl}
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
                href={mapsUrl}
                target="_blank"
                className="flex gap-4 items-start hover:text-white transition"
              >
                <MapPin size={18} className="mt-1 text-havia-gold" />
                <p className="max-w-xs">
                  {address}
                </p>
              </a>
              <h4 className="mt-10 text-sm uppercase tracking-[0.2em] mb-6 text-white/80">
                Kontak
              </h4>
              <a
                href={`https://wa.me/${waPhone}`}
                target="_blank"
                className="flex gap-4 items-center hover:text-white transition"
              >
                <Phone size={18} className="text-havia-gold" />
                <p>{phone}</p>
              </a>

              <a
                href={`mailto:${email}`}
                className="flex gap-4 items-center hover:text-white transition"
              >
                <Mail size={18} className="text-havia-gold" />
                <p>{email}</p>
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
                <span>{weekdayParts[0] || "Senin - Jumat"}</span>
                <span>{weekdayParts[1] || "08:00 - 17:00"}</span>
              </div>

              <div className="flex justify-between">
                <span>{weekendParts[0] || "Sabtu - Minggu"}</span>
                <span className="text-havia-gold">{weekendParts[1] || "Tutup"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mt-16 pt-8 text-center text-sm text-white/40">
          {copyright}
        </div>
      </div>
    </section>
  );
}
