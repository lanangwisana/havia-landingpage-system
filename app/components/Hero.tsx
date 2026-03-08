"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const images = [
  "/havia-project-1.jpg",
  "/havia-project-2.jpg",
  "/havia-project-3.jpg",
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-[85vh] md:min-h-[100vh] flex items-center overflow-hidden"
    >
      {/* Background */}
      {images.map((src, index) => (
        <Image
          key={index}
          src={src}
          alt="Havia Studio Project"
          fill
          priority={index === 0}
          className={`object-cover transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-8 lg:px-12 pt-32 md:pt-40 pb-20 text-havia-white">
        <div className="max-w-xl">
          {/* Small label */}
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[1px] w-10 bg-havia-gold" />
            <span className="text-[10px] md:text-xs tracking-[0.35em] md:tracking-[0.4em] text-havia-gold uppercase">
              Architecture Studio, Indonesia
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-[Helvetica] text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
            Creating Space.
          </h1>

          <h1 className="font-[Helvetica] italic text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-neutral-300">
            Facing the Future.
          </h1>

          <h1 className="font-[Helvetica] text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight md:whitespace-nowrap">
            Designing a Good Life.
          </h1>

          {/* Paragraph */}
          <p className="mt-6 md:mt-8 text-sm md:text-base text-neutral-200 leading-relaxed max-w-lg">
            Havia Studio berkomitmen penuh membantu, melayani, dan mewujudkan
            desain sesuai kebutuhan dan harapan.
          </p>

          {/* Buttons */}
          <div className="mt-8 md:mt-10 flex items-center gap-6 md:gap-10 flex-wrap">
            <a
              href="#contact"
              className="px-5 md:px-6 py-3 bg-havia-gold text-havia-charcoal text-[10px] md:text-xs uppercase tracking-widest hover:opacity-90 transition"
            >
              Contact Us
            </a>

            <a
              href="#portfolio"
              className="inline-flex items-center gap-3 text-havia-white group text-sm"
            >
              <span className="border-b border-havia-white pb-1">
                View Portfolio
              </span>
              <span className="transition group-hover:translate-x-2">→</span>
            </a>
          </div>
        </div>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-10 md:bottom-16 right-6 md:right-16 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-[2px] transition-all duration-500 ${
              index === current
                ? "w-12 md:w-14 bg-havia-gold"
                : "w-5 md:w-6 bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
