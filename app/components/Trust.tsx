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

export default function Trust() {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      image: "/havia-testimonial-1.jpg",
      quote:
        "Havia Studio delivered beyond expectation. The design feels timeless and deeply thoughtful.",
      name: "Residential Client",
      role: "Bandung",
    },
    {
      id: 2,
      image: "/havia-testimonial-2.jpg",
      quote:
        "Professional, detail-oriented, and visionary in every aspect of the project execution.",
      name: "Healthcare Project Owner",
      role: "Jakarta",
    },
  ];

  const clients = [
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
    "/logo-client-11.png",
    "/logo-client-12.png",
    "/logo-client-12.png",
  ];

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(14);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setPerPage(6);
      } else {
        setPerPage(14);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(clients.length / perPage);

  const visibleClients = clients.slice((page - 1) * perPage, page * perPage);

  return (
    <section id="trust" className="py-24 bg-havia-offwhite">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Heading */}
        <div className="mb-14">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[1px] w-10 bg-havia-gold" />
            <span className="text-xs tracking-[0.2em] uppercase text-havia-gold font-semibold">
              Testimonial
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-[Helvetica] text-havia-charcoal">
            Trusted By Clients
          </h2>
        </div>

        {/* TESTIMONIALS */}
        <div className="space-y-16 md:space-y-28 mb-24">
          {testimonials.map((item, index) => (
            <div
              key={item.id}
              className="grid md:grid-cols-2 gap-10 md:gap-16 items-center"
            >
              {/* Image */}
              <div className={`${index % 2 !== 0 ? "md:order-2" : ""}`}>
                <div className="relative h-[260px] md:h-[420px] w-full overflow-hidden rounded-xl">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Text */}
              <div className={`${index % 2 !== 0 ? "md:order-1" : ""}`}>
                <p className="text-base md:text-xl leading-relaxed text-havia-charcoal italic">
                  “{item.quote}”
                </p>

                <div className="mt-6 md:mt-8">
                  <p className="text-sm uppercase tracking-[0.2em] text-havia-charcoal">
                    {item.name}
                  </p>
                  <p className="text-sm text-havia-charcoal/60 mt-1 md:mt-2">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CLIENTS */}
        <div className="border-t pt-16">
          {/* HEADING */}
          <div className="relative mb-10 flex items-center">
            {/* GOLD BLOCK */}
            <div className="w-6 md:w-10 h-16 md:h-20 bg-havia-gold mr-6" />

            {/* TEXT + LINE */}
            <div className="flex-1">
              <h3 className="text-xl md:text-2xl font-[Helvetica] text-havia-charcoal mb-2">
                Our Clients
              </h3>
            </div>
          </div>

          {/* LOGO GRID */}
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-6 items-center">
            {visibleClients.map((logo, i) => (
              <div key={i} className="flex justify-center">
                <div className="relative w-full h-[80px] md:h-[90px] border border-[rgba(44,42,41,0.3)] rounded-xl flex items-center justify-center bg-havia-offwhite">
                  <Image
                    src={logo}
                    alt="Client Logo"
                    fill
                    className="object-contain p-4"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* STILL COUNTING */}
          {page === totalPages && (
            <p className="text-center mt-10 text-sm tracking-[0.25em] text-havia-charcoal opacity-40 font-medium">
              — And still counting —
            </p>
          )}

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-6 mt-8">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                className="p-2 border border-havia-charcoal/20 rounded-full hover:border-havia-gold hover:text-[var(--havia-gold)] transition"
              >
                <ChevronLeft size={16} />
              </button>

              <span className="text-xs tracking-widest text-havia-charcoal/60">
                {page} / {totalPages}
              </span>

              <button
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                className="p-2 border border-havia-charcoal/20 rounded-full hover:border-havia-gold hover:text-[var(--havia-gold)] transition"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
