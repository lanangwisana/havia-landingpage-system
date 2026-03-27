"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Counter = ({
  value,
  duration = 2000,
}: {
  value: number;
  duration?: number;
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
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
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, duration]);

  return <span ref={ref}>{count}+</span>;
};

export default function About({ cmsData }: { cmsData: any }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHoveringImage, setIsHoveringImage] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const accent = cmsData?.landingpage_about_accent || "About Havia";
  const p1 =
    cmsData?.landingpage_about_p1 ||
    "Halo! Kami Havia Studio. Studio Arsitektur yang hadir untuk membantu anda mewujudkan desain bangunan terbaik melalui kolaborasi yang mendalam.";
  const p2 =
    cmsData?.landingpage_about_p2 ||
    "Dengan pengalaman hampir 10 tahun di dunia rancang bangun, kami percaya setiap proyek adalah dialog antara ruang, material, dan lingkungan.";

  const stat1ValRaw = cmsData?.landingpage_about_stat1_val || "120+";
  const stat1Label =
    cmsData?.landingpage_about_stat1_label || "Projects Completed";
  const stat2ValRaw = cmsData?.landingpage_about_stat2_val || "10";
  const stat2Label =
    cmsData?.landingpage_about_stat2_label || "Years of Practice";

  const stat1Val = parseInt(stat1ValRaw);
  const stat2Val = parseInt(stat2ValRaw);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("mousemove", move);
    };
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    ScrollTrigger.getAll().forEach((st) => {
      if (st.vars.trigger === sectionRef.current) st.kill();
    });

    const ctx = gsap.context(() => {
      gsap.set(
        [
          ".about-accent",
          ".about-desc",
          ".about-stats",
          ".about-image",
          ".about-cta",
        ],
        {
          opacity: 0,
        },
      );
      gsap.set(".about-accent", { y: 100 });
      gsap.set(".about-accent-line", { width: 0 });
      gsap.set(".about-desc", { y: 50 });
      gsap.set(".about-stats", { y: 30 });
      gsap.set(".about-image", { scale: 0.9, x: 50 });
      gsap.set(".about-cta", { y: 20 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: isMobile ? "top 80%" : "top top",
          end: isMobile ? "+=100%" : "+=400%",
          scrub: isMobile ? 1 : 2,
          pin: !isMobile,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(".about-accent", {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power2.out",
      })
        .to(
          ".about-accent-line",
          { width: 40, duration: 0.8, ease: "power2.out" },
          "<",
        )
        .to(
          ".about-desc",
          { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" },
          "+=0.3",
        )
        .to(
          ".about-stats",
          { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" },
          "+=0.3",
        )
        .to(
          ".about-image",
          { opacity: 1, scale: 1, x: 0, duration: 1.5, ease: "power2.out" },
          "+=0.3",
        )
        .to(
          ".about-cta",
          { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
          "+=0.3",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full bg-[var(--havia-charcoal)] text-[var(--havia-offwhite)] overflow-hidden font-sans"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-6 py-12 md:py-20 min-h-screen flex flex-col justify-center">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <div className="about-accent">
              <h2
                className="text-3xl md:text-5xl font-light uppercase tracking-[2px]"
                style={{ fontFamily: "'Helvetica', Helvetica, sans-serif" }}
              >
                {accent}
              </h2>
              <div className="about-accent-line h-px bg-[var(--havia-gold)] mt-2 md:mt-3" />
            </div>

            <div className="about-desc mt-8 space-y-4">
              <p className="text-sm md:text-base text-[var(--havia-offwhite)]/80 leading-relaxed font-sans">
                {p1}
              </p>
              <p className="text-sm md:text-base text-[var(--havia-offwhite)]/60 leading-relaxed font-sans">
                {p2}
              </p>
            </div>

            <div className="about-stats mt-10 flex gap-12">
              <div>
                <p
                  className="text-3xl md:text-4xl font-light text-[var(--havia-gold)]"
                  style={{
                    fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
                  }}
                >
                  <Counter value={stat1Val} />
                </p>
                <p className="text-xs tracking-widest text-[var(--havia-offwhite)]/50 mt-1 font-sans">
                  {stat1Label}
                </p>
              </div>
              <div>
                <p
                  className="text-3xl md:text-4xl font-light text-[var(--havia-gold)]"
                  style={{
                    fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
                  }}
                >
                  <Counter value={stat2Val} />
                </p>
                <p className="text-xs tracking-widest text-[var(--havia-offwhite)]/50 mt-1 font-sans">
                  {stat2Label}
                </p>
              </div>
            </div>

            <div className="about-cta mt-12 hidden lg:block">
              <Link
                href="/about?tab=team"
                className="inline-flex items-center gap-2 bg-[var(--havia-charcoal)] border border-[var(--havia-gold)] text-white px-6 py-3 rounded-full hover:bg-[var(--havia-gold)] hover:border-[var(--havia-gold)] hover:text-[var(--havia-charcoal)] transition-all duration-300"
              >
                <span className="text-xs uppercase tracking-wider font-sans">
                  View More
                </span>
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>

          <div>
            <Link
              href="/about?tab=team"
              className="about-image relative aspect-[4/3] w-full overflow-hidden rounded-lg shadow-2xl block cursor-none"
              onMouseEnter={() => !isMobile && setIsHoveringImage(true)}
              onMouseLeave={() => !isMobile && setIsHoveringImage(false)}
            >
              <Image
                src="/havia-photo-1.png"
                alt="Havia Studio Team"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <p className="text-xs uppercase tracking-wider text-white/90 text-center font-sans">
                  The Team
                </p>
                <p className="text-[10px] text-white/70 text-center font-sans">
                  Creative minds behind the work
                </p>
              </div>
            </Link>

            <div className="about-cta mt-8 lg:hidden">
              <Link
                href="/about?tab=team"
                className="inline-flex items-center gap-2 bg-[var(--havia-charcoal)] border border-[var(--havia-gold)] text-white px-6 py-3 rounded-full hover:bg-[var(--havia-gold)] hover:border-[var(--havia-gold)] hover:text-[var(--havia-charcoal)] transition-all duration-300"
              >
                <span className="text-xs uppercase tracking-wider font-sans">
                  View More
                </span>
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Cursor */}
      {!isMobile && isHoveringImage && (
        <div
          className="fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2"
          style={{ left: cursorPos.x, top: cursorPos.y }}
        >
          <div className="bg-white/20 backdrop-blur-md rounded-full px-6 py-3 border border-white/30 shadow-lg">
            <span
              className="text-white text-xs uppercase tracking-wider whitespace-nowrap font-sans"
              style={{ fontFamily: "'Open Sans', sans-serif" }}
            >
              Meet Our Team
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
