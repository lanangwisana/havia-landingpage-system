"use client";

import Image from "next/image";
import { Instagram, Linkedin, MapPin, Phone, Mail } from "lucide-react";

export default function Contact({ cmsData }: { cmsData: any }) {
  const tagline =
    cmsData?.landingpage_contact_p ||
    "Creating Space. Facing the Future. Designing a Good Life.";
  const instagramUrl =
    cmsData?.landingpage_contact_instagram ||
    "https://www.instagram.com/studiohavia/";
  const linkedinUrl =
    cmsData?.landingpage_contact_linkedin ||
    "https://www.linkedin.com/company/havia-studio/";
  const address =
    cmsData?.landingpage_contact_address ||
    "Jl. Sulaksana Baru III No.20, Cicaheum, Kec. Kiaracondong, Kota Bandung";
  const mapsUrl =
    cmsData?.landingpage_contact_maps_url ||
    "https://maps.app.goo.gl/WgGBhZU66tGKscuA7";
  const phone = cmsData?.landingpage_contact_phone || "+62 811 2430 121";
  const email = cmsData?.landingpage_contact_email || "haviastudio@gmail.com";
  const hoursWeekday =
    cmsData?.landingpage_contact_hours_weekday ||
    "Senin - Jumat / 08:00 - 17:00";
  const hoursWeekend =
    cmsData?.landingpage_contact_hours_weekend || "Sabtu - Minggu / Tutup";
  const copyright =
    cmsData?.landingpage_contact_copyright ||
    "\u00A9 2026 Havia Studio. All rights reserved.";

  const weekdayParts = hoursWeekday.split(" / ");
  const weekendParts = hoursWeekend.split(" / ");

  const waPhone = phone.replace(/[\s\-\+]/g, "");

  return (
    <section
      id="contact"
      className="bg-[var(--havia-charcoal)] text-white font-sans py-8 md:py-12"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid gap-8 md:gap-12 lg:grid-cols-[1.2fr_1.6fr_0.6fr_1.2fr]">
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

            <p className="text-white/70 leading-relaxed mb-8 max-w-sm text-sm md:text-base">
              {tagline}
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[var(--havia-gold)] transition"
              >
                <Instagram size={18} className="text-white" />
              </a>

              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[var(--havia-gold)] transition"
              >
                <Linkedin size={18} className="text-white" />
              </a>

              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[var(--havia-gold)] transition md:hidden"
              >
                <MapPin size={18} className="text-white" />
              </a>

              <a
                href={`https://wa.me/${waPhone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[var(--havia-gold)] transition md:hidden"
              >
                <Phone size={18} className="text-white" />
              </a>

              <a
                href={`mailto:${email}`}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-[var(--havia-gold)] transition md:hidden"
              >
                <Mail size={18} className="text-white" />
              </a>
            </div>
          </div>

          <div>
            <div className="hidden md:block">
              <h4 className="text-sm uppercase tracking-[0.2em] mb-4 md:mb-6 text-white/80">
                Alamat
              </h4>

              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-4 items-start text-white/80 hover:text-white transition"
              >
                <MapPin size={18} className="mt-1 text-[var(--havia-gold)]" />
                <p className="max-w-xs text-sm md:text-base">{address}</p>
              </a>
            </div>

            <div className="hidden md:block mt-8 md:mt-10">
              <h4 className="text-sm uppercase tracking-[0.2em] mb-4 md:mb-6 text-white/80">
                Kontak
              </h4>

              <a
                href={`https://wa.me/${waPhone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-4 items-center text-white/80 hover:text-white transition"
              >
                <Phone size={18} className="text-[var(--havia-gold)]" />
                <p className="text-sm md:text-base">{phone}</p>
              </a>

              <a
                href={`mailto:${email}`}
                className="flex gap-4 items-center text-white/80 hover:text-white transition mt-3"
              >
                <Mail size={18} className="text-[var(--havia-gold)]" />
                <p className="text-sm md:text-base">{email}</p>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-[0.2em] mb-4 md:mb-6 text-white/80">
              Menu
            </h4>
            <div className="grid grid-cols-2 gap-y-3 text-white/70 md:block md:space-y-3">
              <a
                href="#"
                className="block hover:text-white transition text-sm md:text-base"
              >
                Home
              </a>
              <a
                href="#about"
                className="block hover:text-white transition text-sm md:text-base"
              >
                About
              </a>
              <a
                href="#portfolio"
                className="block hover:text-white transition text-sm md:text-base"
              >
                Projects
              </a>
              <a
                href="#trust"
                className="block hover:text-white transition text-sm md:text-base"
              >
                Client
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-[0.2em] mb-4 md:mb-6 text-white/80">
              Working Hours
            </h4>

            <div className="space-y-4 text-white/70">
              <div className="flex justify-between text-sm md:text-base">
                <span>{weekdayParts[0] || "Senin - Jumat"}</span>
                <span>{weekdayParts[1] || "08:00 - 17:00"}</span>
              </div>

              <div className="flex justify-between text-sm md:text-base">
                <span>{weekendParts[0] || "Sabtu - Minggu"}</span>
                <span className="text-[var(--havia-gold)]">
                  {weekendParts[1] || "Tutup"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 md:mt-16 pt-6 md:pt-8 text-center text-xs md:text-sm text-white/40">
          {copyright}
        </div>
      </div>
    </section>
  );
}
