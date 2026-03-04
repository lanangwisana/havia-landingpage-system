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
      className="relative h-screen flex items-end pb-48"
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
      <div className="relative z-10 max-w-7xl mx-auto px-8 w-full text-havia-white">
        <div className="max-w-xl">

          <div className="flex items-center gap-4 mb-6">
            <div className="h-[1px] w-10 bg-havia-gold" />
            <span className="text-xs tracking-[0.4em] text-havia-gold uppercase">
              Architecture & Build Studio, Bandung
            </span>
          </div>

          <h1 className="font-[Helvetica] text-4xl md:text-6xl leading-tight">
            Designing Space.
          </h1>

          <h1 className="font-[Helvetica] italic text-4xl md:text-6xl text-neutral-300">
            Building Legacy.
          </h1>

          <p className="mt-8 text-base text-neutral-200 leading-relaxed">
            We craft refined architectural concepts and execute them with
            precision—bringing residential and commercial visions to life.
          </p>

          <div className="mt-10 flex items-center gap-10">
            <a
              href="https://wa.me/628112430121"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-havia-gold text-black text-xs uppercase tracking-widest hover:opacity-90 transition"
            >
              Hubungi Kami
            </a>

            <a
              href="#portfolio"
              className="inline-flex items-center gap-3 text-havia-white group text-sm"
            >
              <span className="border-b border-havia-white pb-1">
                Lihat Portfolio
              </span>
              <span className="transition group-hover:translate-x-2">
                →
              </span>
            </a>
          </div>

        </div>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-16 right-16 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-[2px] transition-all duration-500 ${
              index === current
                ? "w-14 bg-havia-gold"
                : "w-6 bg-white/40"
            }`}
          />
        ))}
      </div>

    </section>
  );
}