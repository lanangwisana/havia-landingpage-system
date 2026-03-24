"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Users, ArrowRight } from "lucide-react";

// Counter (TETAP)
const Counter = ({
  value,
  duration = 2000,
}: {
  value: number;
  duration?: number;
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const increment = value / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}+</span>;
};

export default function About({ cmsData }: { cmsData: any }) {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  // ================= CMS DATA =================
  const accent =
    cmsData?.landingpage_about_accent || "About";

  const p1 =
    cmsData?.landingpage_about_p1 ||
    "Halo! Kami Havia Studio. Studio Arsitektur yang hadir untuk membantu anda mewujudkan desain bangunan terbaik sesuai kebutuhan anda melalui kolaborasi dalam pelaksanaannya.";

  const p2 =
    cmsData?.landingpage_about_p2 ||
    "Dengan pengalaman hampir 10 tahun di dunia rancang bangun, kami semakin yakin untuk bisa membantu lebih banyak visi menjadi nyata. Setiap proyek adalah dialog antara ruang, material, dan lingkungan.";

  const stat1ValRaw =
    cmsData?.landingpage_about_stat1_val || "120+";

  const stat1Label =
    cmsData?.landingpage_about_stat1_label ||
    "Projects Completed";

  const stat2ValRaw =
    cmsData?.landingpage_about_stat2_val || "10";

  const stat2Label =
    cmsData?.landingpage_about_stat2_label ||
    "Years of Practice";

  // convert string → number buat counter
  const stat1Val = parseInt(stat1ValRaw);
  const stat2Val = parseInt(stat2ValRaw);

  return (
    <section
      id="about"
      className="relative pt-20 md:pt-20 pb-20 md:pb-20 bg-[#f2f1f0] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* HEADER (UI TETAP, TEXT CMS) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-[#2c2a29]">
            {accent}
          </h2>
          <div className="w-12 h-[2px] bg-[#c69c3d]/50 mt-2" />
        </motion.div>

        {/* DESKTOP */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* TEXT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >

            {/* PARAGRAF */}
            <div className="space-y-4 text-[#2c2a29]/60">
              <p className="text-sm leading-relaxed text-justify">{p1}</p>
              <p className="text-sm leading-relaxed text-justify">{p2}</p>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-2 gap-8 pt-4">
              <div>
                <p className="text-3xl lg:text-4xl text-[#2c2a29] font-light">
                  <Counter value={stat1Val} />
                </p>
                <p className="text-[10px] text-[#2c2a29]/60 mt-2 tracking-wide">
                  {stat1Label}
                </p>
              </div>

              <div>
                <p className="text-3xl lg:text-4xl text-[#2c2a29] font-light">
                  <Counter value={stat2Val} />
                </p>
                <p className="text-[10px] text-[#2c2a29]/60 mt-2 tracking-wide">
                  {stat2Label}
                </p>
              </div>
            </div>

            {/* BUTTON */}
            <div className="flex gap-8 pt-4">
              <Link
                href="/about?tab=team"
                className="group relative inline-flex items-center transition-all duration-300 rounded-lg"
                onMouseEnter={() => setHoveredButton("team")}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <span className="text-xs tracking-wider text-[#2c2a29]/60 group-hover:text-[#c69c3d] transition-colors">
                  View More
                </span>
                <ArrowRight
                  size={14}
                  className="text-[#2c2a29]/60 group-hover:text-[#c69c3d] group-hover:translate-x-1 transition-all"
                />

                {/* Tooltip */}
                <span
                  className={`absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#2c2a29] text-white text-xs py-2 px-3 transition-all duration-300 rounded ${
                    hoveredButton === "team"
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-2 pointer-events-none"
                  }`}
                >
                  Meet Our Team & Gallery
                </span>
              </Link>
            </div>
          </motion.div>

          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden group">
              <Image
                src="/havia-photo-1.png"
                alt="Havia Studio Team"
                fill
                className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
              />

              {/* CAPTION */}
              <div className="absolute bottom-0 left-0 right-0 z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <div className="bg-white/90 backdrop-blur-sm py-3 px-4">
                  <p className="text-xs uppercase tracking-wider text-[#2c2a29] text-center">
                    The Team
                  </p>
                  <p className="text-[10px] font-light text-[#2c2a29]/60 text-center">
                    Creative minds behind the work
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* MOBILE */}
        <div className="lg:hidden space-y-6">
          
          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src="/havia-photo-1.png"
                alt="Havia Studio Team"
                fill
                className="object-cover"
              />

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent py-3 px-4">
                <p className="text-xs uppercase tracking-wider text-white/90">
                  The Team
                </p>
                <p className="text-[10px] text-white/60">
                  Creative minds behind the work
                </p>
              </div>
            </div>
          </motion.div>

          {/* TEXT */}
          <motion.div className="space-y-4 text-[#2c2a29]/70">
            <p className="text-sm leading-relaxed text-justify">{p1}</p>
            <p className="text-sm leading-relaxed text-justify">{p2}</p>
          </motion.div>

          {/* STATS */}
          <motion.div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-3xl text-[#2c2a29] font-light">
                <Counter value={stat1Val} />
              </p>
              <p className="text-[10px] text-[#2c2a29]/40 mt-2 tracking-wide">
                {stat1Label}
              </p>
            </div>

            <div>
              <p className="text-3xl text-[#2c2a29] font-light">
                <Counter value={stat2Val} />
              </p>
              <p className="text-[10px] text-[#2c2a29]/40 mt-2 tracking-wide">
                {stat2Label}
              </p>
            </div>
          </motion.div>

          {/* BUTTON */}
          <Link
            href="/about?tab=team"
            className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-[#c69c3d] transition-all duration-300 w-full"
          >
            <span className="text-xs uppercase tracking-wider text-[#2c2a29] group-hover:text-white">
              View More
            </span>
            <ArrowRight className="text-[#2c2a29] group-hover:text-white" />
          </Link>
        </div>
      </div>
    </section>
  );
}