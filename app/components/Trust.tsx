"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Testimonial = {
  id: number;
  image: string;
  quote: string;
  name: string;
  role: string;
};

const staticTestimonials: Testimonial[] = [
  {
    id: 1,
    image: "/logo-client-1.png",
    quote:
      "Havia Studio delivered beyond expectation. The design feels timeless and deeply thoughtful.",
    name: "Edelweiss Hospital",
    role: "Bandung",
  },
  {
    id: 2,
    image: "/logo-client-4.png",
    quote:
      "Professional, detail-oriented, and visionary in every aspect of the project execution.",
    name: "Cendekia Muda Islamic School",
    role: "Bandung",
  },
];

const staticClients = [
  "/logo-client-1.png",
  "/logo-client-2.png",
  "/logo-client-3.png",
  "/logo-client-4.png",
  "/logo-client-5.png",
  "/logo-client-6.png",
  "/logo-client-7.png",
  "/logo-client-8.png",
  "/logo-client-9.png",
  "/logo-client-10.png",
  "/logo-client-11.png",
  "/logo-client-12.png",
];

export default function Trust({ cmsData }: { cmsData: any }) {
  const accent = cmsData?.landingpage_trust_accent || "Testimonial";
  const h2 = cmsData?.landingpage_trust_h2 || "Trusted By Clients";
  const clientHeading = cmsData?.landingpage_trust_client_heading || "Our Clients";
  const footerText = cmsData?.landingpage_trust_footer_text || "\u2014 And still counting \u2014";

  // Use CMS testimonials if available
  const testimonials: Testimonial[] =
    cmsData?.landingpage_trust_testimonials_json &&
    Array.isArray(cmsData.landingpage_trust_testimonials_json) &&
    cmsData.landingpage_trust_testimonials_json.length > 0
      ? cmsData.landingpage_trust_testimonials_json
      : staticTestimonials;

  // Use CMS client logos if available
  const clients: string[] =
    cmsData?.landingpage_trust_clients_json &&
    Array.isArray(cmsData.landingpage_trust_clients_json) &&
    cmsData.landingpage_trust_clients_json.length > 0
      ? cmsData.landingpage_trust_clients_json
      : staticClients;

  return (
    <section id="trust" className="py-24 bg-havia-offwhite">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Heading */}
        <div className="mb-14">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[1px] w-10 bg-havia-gold" />
            <span className="text-xs tracking-[0.2em] uppercase text-havia-gold font-semibold">
              {accent}
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-[Helvetica] text-havia-charcoal">
            {h2}
          </h2>
        </div>

        {/* TESTIMONIALS */}
        <div className="grid gap-10 mb-24 md:grid-cols-2">
          {testimonials.map((item, index) => (
            <div
              key={item.id}
              className={`bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.04)] p-8 md:p-18 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10`}
            >
              {/* Logo / Photo */}
              <div className="relative w-[100px] h-[100px] flex-shrink-0 rounded-lg overflow-hidden border border-[rgba(44,42,41,0.3)] bg-white">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-contain p-3"
                />
              </div>

              {/* Text */}
              <div className="flex-1">
                <p className="text-base md:text-lg leading-relaxed text-havia-charcoal italic">
                  &ldquo;{item.quote}&rdquo;
                </p>

                <div className="w-12 h-[2px] bg-havia-gold mb-4 mt-4"></div>
                <div className="mt-5">
                  <p className="text-sm uppercase tracking-[0.2em] text-havia-charcoal">
                    {item.name}
                  </p>
                  <p className="text-sm text-havia-charcoal/60 mt-1">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CLIENT LOGO CAROUSEL */}
        <div className="border-t pt-16 overflow-hidden">
          {/* HEADING */}
          <div className="relative mb-10 flex items-center">
            <div className="w-6 md:w-10 h-16 md:h-20 bg-havia-gold mr-6" />

            <div className="flex-1">
              <h3 className="text-xl md:text-2xl font-[Helvetica] text-havia-charcoal">
                {clientHeading}
              </h3>
            </div>
          </div>

          <div className="relative w-full overflow-hidden">
            <div className="flex animate-client-scroll gap-4 md:gap-6">
              {[...clients, ...clients].map((logo, i) => (
                <div
                  key={i}
                  className="min-w-[120px] md:min-w-[160px] h-[70px] md:h-[90px] border border-[rgba(44,42,41,0.3)] rounded-xl flex items-center justify-center bg-havia-offwhite"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={logo}
                      alt="Client Logo"
                      fill
                      className="object-contain p-3 md:p-4"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* STILL COUNTING */}
          <p className="text-center mt-10 text-sm tracking-[0.25em] text-havia-charcoal opacity-40 font-medium">
            {footerText}
          </p>
        </div>
      </div>
    </section>
  );
}
