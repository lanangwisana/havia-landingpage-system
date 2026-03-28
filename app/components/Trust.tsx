"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";

type Testimonial = {
  id: number;
  image: string;
  quote: string;
  name: string;
  role: string;
  type: "corporate" | "personal";
};

export default function Trust({ cmsData }: { cmsData: any }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filterType, setFilterType] = useState<"corporate" | "personal">(
    "corporate",
  );
  const [direction, setDirection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [hoverLeft, setHoverLeft] = useState(false);
  const [hoverRight, setHoverRight] = useState(false);
  const [isHoveringCarousel, setIsHoveringCarousel] = useState(false);
  const autoScrollInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      image: "/logo-client-1.png",
      quote:
        "Havia Studio delivered beyond expectation. The design feels timeless and deeply thoughtful.",
      name: "Edelweiss Hospital",
      role: "Bandung",
      type: "corporate",
    },
    {
      id: 2,
      image: "/logo-client-4.png",
      quote:
        "Professional, detail-oriented, and visionary in every aspect of the project execution.",
      name: "Cendekia Muda Islamic School",
      role: "Bandung",
      type: "corporate",
    },
    {
      id: 3,
      image: "/logo-client-person.png",
      quote: "Rumah impian kami jadi kenyataan. Terima kasih Havia Studio!",
      name: "Bapak & Ibu Wijaya",
      role: "Client Residential",
      type: "personal",
    },
    {
      id: 4,
      image: "/logo-client-person.png",
      quote: "Detail dan pelayanannya luar biasa. Sangat recommended!",
      name: "Sarah",
      role: "Client Residential",
      type: "personal",
    },
    {
      id: 5,
      image: "/logo-client-person.png",
      quote: "Komunikasi lancar, hasil sesuai ekspektasi. Makasih tim Havia!",
      name: "Fajar Prasetyo",
      role: "Client Residential",
      type: "personal",
    },
  ];

  const filteredTestimonials = testimonials.filter(
    (t) => t.type === filterType,
  );

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
  ];

  const nextSlide = () => {
    if (filteredTestimonials.length === 0) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % filteredTestimonials.length);
    resetAutoScroll();
  };

  const prevSlide = () => {
    if (filteredTestimonials.length === 0) return;
    setDirection(-1);
    setCurrentIndex(
      (prev) =>
        (prev - 1 + filteredTestimonials.length) % filteredTestimonials.length,
    );
    resetAutoScroll();
  };

  const resetAutoScroll = () => {
    if (autoScrollInterval.current) {
      clearInterval(autoScrollInterval.current);
      autoScrollInterval.current = null;
    }
    startAutoScroll();
  };

  const startAutoScroll = () => {
    if (filteredTestimonials.length <= 1) return;
    if (autoScrollInterval.current) clearInterval(autoScrollInterval.current);
    autoScrollInterval.current = setInterval(() => {
      if (!isHoveringCarousel) {
        nextSlide();
      }
    }, 5000); 
  };

  const stopAutoScroll = () => {
    if (autoScrollInterval.current) {
      clearInterval(autoScrollInterval.current);
      autoScrollInterval.current = null;
    }
  };

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, [filteredTestimonials.length, filterType]);

  useEffect(() => {
    setCurrentIndex(0);
    resetAutoScroll();
  }, [filterType]);

  const getCardPosition = (index: number) => {
    const total = filteredTestimonials.length;
    if (total === 0) return 999;

    let distance = (index - currentIndex + total) % total;
    if (distance > Math.floor(total / 2)) distance = distance - total;

    return distance;
  };

  const onDragEnd = (e: any, { offset }: any) => {
    const swipeThreshold = 50;
    if (offset.x > swipeThreshold) {
      prevSlide();
    } else if (offset.x < -swipeThreshold) {
      nextSlide();
    }
  };

  return (
    <section
      id="trust"
      className="relative py-12 md:py-16 bg-[var(--havia-offwhite)]"
      style={{ fontFamily: 'Helvetica, "Open Sans", sans-serif' }}
    >
      <div className="absolute right-[-50px] md:right-0 top-0 md:top-1/3 md:-translate-y-1/2 opacity-[0.05] md:opacity-[0.05] pointer-events-none z-0">
        <Image
          src="/havia-vector.svg"
          alt="Havia Studio Watermark"
          width={700}
          height={400}
          className="object-contain w-[420px] md:w-[700px]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <h2 className="text-2xl font-light tracking-tight text-[var(--havia-charcoal)] mb-4">
            Testimonial
          </h2>
          <div className="header-line w-12 h-[2px] bg-[var(--havia-gold)]/50 mx-auto mb-8" />
        </motion.div>

        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1 bg-[var(--havia-white)] border border-[var(--havia-charcoal)]/10 rounded-full shadow-sm">
            <button
              onClick={() => setFilterType("corporate")}
              className={`
                relative px-6 py-2 text-xs md:text-sm tracking-wider transition-all duration-300 rounded-full
                ${
                  filterType === "corporate"
                    ? "bg-[var(--havia-charcoal)] text-[var(--havia-white)] shadow-md"
                    : "text-[var(--havia-charcoal)]/50 hover:text-[var(--havia-charcoal)]"
                }
              `}
            >
              Corporate (
              {testimonials.filter((t) => t.type === "corporate").length})
            </button>
            <button
              onClick={() => setFilterType("personal")}
              className={`
                relative px-6 py-2 text-xs md:text-sm tracking-wider transition-all duration-300 rounded-full
                ${
                  filterType === "personal"
                    ? "bg-[var(--havia-charcoal)] text-[var(--havia-white)] shadow-md"
                    : "text-[var(--havia-charcoal)]/50 hover:text-[var(--havia-charcoal)]"
                }
              `}
            >
              Personal (
              {testimonials.filter((t) => t.type === "personal").length})
            </button>
          </div>
        </div>

        {/* TESTIMONIALS */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative mb-12"
          onMouseEnter={() => setIsHoveringCarousel(true)}
          onMouseLeave={() => setIsHoveringCarousel(false)}
        >
          {filteredTestimonials.length > 0 && (
            <>
              <div
                className="absolute left-0 top-0 bottom-0 w-16 z-30 flex items-center justify-start"
                onMouseEnter={() => setHoverLeft(true)}
                onMouseLeave={() => setHoverLeft(false)}
                onClick={prevSlide}
              >
                <motion.button
                  initial={{ opacity: 0, x: -10 }}
                  animate={{
                    opacity: hoverLeft ? 1 : 0,
                    x: hoverLeft ? 0 : -10,
                  }}
                  transition={{ duration: 0.2 }}
                  className="text-[var(--havia-charcoal)]"
                >
                  <ChevronLeft size={32} strokeWidth={1.5} />
                </motion.button>
              </div>

              <div
                className="absolute right-0 top-0 bottom-0 w-16 z-30 flex items-center justify-end"
                onMouseEnter={() => setHoverRight(true)}
                onMouseLeave={() => setHoverRight(false)}
                onClick={nextSlide}
              >
                <motion.button
                  initial={{ opacity: 0, x: 10 }}
                  animate={{
                    opacity: hoverRight ? 1 : 0,
                    x: hoverRight ? 0 : 10,
                  }}
                  transition={{ duration: 0.2 }}
                  className="text-[var(--havia-charcoal)]"
                >
                  <ChevronRight size={32} strokeWidth={1.5} />
                </motion.button>
              </div>
            </>
          )}

          <div className="relative min-h-[380px] md:min-h-[400px] flex items-center justify-center overflow-visible">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
              <div className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] border border-[var(--havia-charcoal)] rounded-full animate-spin-slow" />
              <div className="absolute w-[250px] h-[250px] md:w-[450px] md:h-[450px] border border-[var(--havia-charcoal)] rounded-full animate-spin-reverse opacity-50" />
            </div>

            <AnimatePresence initial={false} custom={direction}>
              {filteredTestimonials.map((item, idx) => {
                const position = getCardPosition(idx);

                if (!isMobile && Math.abs(position) > 2) return null;
                if (isMobile && position !== 0) return null; 

                return (
                  <motion.div
                    key={item.id}
                    custom={direction}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={onDragEnd}
                    initial={{
                      x: position > 0 ? "150%" : "-150%",
                      y: 20,
                      opacity: 0,
                      scale: 0.7,
                      filter: "blur(8px)",
                    }}
                    whileInView={{ y: 0, opacity: position === 0 ? 1 : 0.3 }}
                    viewport={{ once: true, margin: "-100px" }}
                    animate={{
                      x: isMobile
                        ? "0%"
                        : position === 0
                          ? "0%"
                          : position === 1
                            ? "110%"
                            : position === -1
                              ? "-110%"
                              : position === 2
                                ? "220%"
                                : "-220%",
                      opacity: position === 0 ? 1 : 0.3,
                      scale: position === 0 ? 1 : 0.8,
                      filter: position === 0 ? "blur(0px)" : "blur(4px)",
                      zIndex: position === 0 ? 20 : 10,
                    }}
                    exit={{
                      x: direction > 0 ? "-150%" : "150%",
                      opacity: 0,
                      scale: 0.7,
                      filter: "blur(8px)",
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 25,
                    }}
                    onClick={() => {
                      if (position !== 0) {
                        setCurrentIndex(idx);
                        setDirection(position > 0 ? 1 : -1);
                        resetAutoScroll();
                      }
                    }}
                    className="absolute w-[88%] md:w-[400px] cursor-grab active:cursor-grabbing"
                  >
                    <motion.div
                      whileHover={
                        position === 0
                          ? { scale: 1.02, transition: { duration: 0.2 } }
                          : {}
                      }
                      className={`
                        relative bg-[var(--havia-white)] p-7 md:p-10 flex flex-col gap-5 h-full
                        transition-all duration-500 rounded-2xl overflow-hidden
                        ${
                          position === 0
                            ? "shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-b-4 border-[var(--havia-gold)]/30"
                            : "shadow-md border border-[var(--havia-charcoal)]/5"
                        }
                      `}
                    >
                      <Quote
                        className="absolute top-6 right-6 text-[var(--havia-gold)]/5 pointer-events-none"
                        size={120}
                        strokeWidth={0.5}
                      />

                      <div className="flex items-center gap-4">
                        <div className="relative w-14 h-14 md:w-16 md:h-16 flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className={`object-contain transition-all duration-500 rounded-lg ${
                              position !== 0 ? "grayscale opacity-30" : ""
                            }`}
                          />
                        </div>
                        <div>
                          <p className="text-xs md:text-sm uppercase tracking-[0.15em] font-semibold text-[var(--havia-charcoal)]">
                            {item.name}
                          </p>
                          <p className="text-[10px] md:text-xs text-[var(--havia-gold)] mt-0.5 tracking-wider font-medium">
                            {item.role}
                          </p>
                        </div>
                      </div>

                      <div className="relative">
                        <Quote
                          className="text-[var(--havia-gold)]/20 mb-2"
                          size={18}
                          fill="currentColor"
                        />
                        <p className="text-sm md:text-base italic text-[var(--havia-charcoal)]/80 leading-relaxed font-light">
                          {item.quote}
                        </p>
                      </div>

                      {position === 0 && (
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "40px" }}
                          className="h-[1px] bg-[var(--havia-gold)]/40 mt-2"
                        />
                      )}
                    </motion.div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {filteredTestimonials.length > 0 && (
            <div className="flex justify-center gap-2 mt-4">
              {filteredTestimonials.map((_, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                    resetAutoScroll();
                  }}
                  className={`
                    rounded-full transition-all duration-300 p-0 border-0 min-w-0 min-h-0 overflow-hidden cursor-pointer
                    ${currentIndex === index ? "bg-[var(--havia-gold)]" : "bg-[var(--havia-charcoal)]/20 hover:bg-[var(--havia-charcoal)]/40"}
                  `}
                  style={{
                    width:
                      (currentIndex === index ? (isMobile ? 12 : 20) : 6) +
                      "px",
                    height: (isMobile ? 6 : 6) + "px",
                    flexShrink: 0,
                  }}
                />
              ))}
            </div>
          )}
        </motion.div>

        {/* CLIENT LOGO */}
        <div className="border-t border-[var(--havia-charcoal)]/10 pt-16 pb-10 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-4"
          >
            <h2 className="text-2xl font-light tracking-tight text-[var(--havia-charcoal)] mb-4">
              Our Clients
            </h2>
            <div className="header-line w-12 h-[2px] bg-[var(--havia-gold)]/50 mx-auto mb-8" />
          </motion.div>

          <div className="relative w-full overflow-hidden">
            <div className="flex animate-client-scroll gap-4 md:gap-6">
              {[...clients, ...clients].map((logo, i) => (
                <div
                  key={i}
                  className="min-w-[100px] md:min-w-[120px] h-[60px] md:h-[80px] flex items-center justify-center bg-[var(--havia-white)] border border-[var(--havia-charcoal)]/10 rounded-lg transition-all duration-300 group"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={logo}
                      alt="Client Logo"
                      fill
                      className="object-contain p-3 md:p-4 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
