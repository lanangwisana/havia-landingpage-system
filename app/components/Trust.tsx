"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";

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
  const [filterType, setFilterType] = useState<"corporate" | "personal">("corporate");
  const [direction, setDirection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [hoverLeft, setHoverLeft] = useState(false);
  const [hoverRight, setHoverRight] = useState(false);

  // Cek screen size
  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const testimonials: Testimonial[] = [
    // Corporate
    {
      id: 1,
      image: "/logo-client-1.png",
      quote: "Havia Studio delivered beyond expectation. The design feels timeless and deeply thoughtful.",
      name: "Edelweiss Hospital",
      role: "Bandung",
      type: "corporate",
    },
    {
      id: 2,
      image: "/logo-client-4.png",
      quote: "Professional, detail-oriented, and visionary in every aspect of the project execution.",
      name: "Cendekia Muda Islamic School",
      role: "Bandung",
      type: "corporate",
    },
    // Personal
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

  // Filter testimonials based on type
  const filteredTestimonials = testimonials.filter(t => t.type === filterType);

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

  // Duplicate clients array for infinite scroll effect
  const duplicatedClients = [...clients, ...clients, ...clients];

  const nextSlide = () => {
    if (filteredTestimonials.length === 0) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % filteredTestimonials.length);
  };

  const prevSlide = () => {
    if (filteredTestimonials.length === 0) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + filteredTestimonials.length) % filteredTestimonials.length);
  };

  // Reset currentIndex when filter changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [filterType]);

  // Get positions for each card (desktop only)
  const getCardPosition = (index: number) => {
    const total = filteredTestimonials.length;
    if (total === 0) return 999;
    
    // Hitung jarak dari currentIndex (cyclic)
    let distance = (index - currentIndex + total) % total;
    if (distance > Math.floor(total / 2)) distance = distance - total;
    
    return distance;
  };

  // SWIPE HANDLER
  const dragX = useMotionValue(0);
  const onDragEnd = (e: any, { offset, velocity }: any) => {
    const swipeThreshold = 50;
    if (offset.x > swipeThreshold) {
      prevSlide();
    } else if (offset.x < -swipeThreshold) {
      nextSlide();
    }
  };

  return (
    <section id="trust" className="py-12 md:py-16 bg-[#f2f1f0]">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-[#2c2a29]">
            Testimonial
          </h2>
          <div className="w-12 h-[2px] bg-[#c69c3d]/50 mt-2" />
        </motion.div>

        {/* FILTER - Modern Toggle Style */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1 bg-white border border-[#2c2a29]/10 rounded-full shadow-sm">
            <button
              onClick={() => setFilterType("corporate")}
              className={`
                relative px-6 py-2 text-xs md:text-sm tracking-wider uppercase transition-all duration-300 rounded-full
                ${filterType === "corporate" 
                  ? "bg-[#2c2a29] text-white shadow-md" 
                  : "text-[#2c2a29]/50 hover:text-[#2c2a29]"
                }
              `}
            >
              Corporate ({testimonials.filter(t => t.type === "corporate").length})
            </button>
            <button
              onClick={() => setFilterType("personal")}
              className={`
                relative px-6 py-2 text-xs md:text-sm tracking-wider uppercase transition-all duration-300 rounded-full
                ${filterType === "personal" 
                  ? "bg-[#2c2a29] text-white shadow-md" 
                  : "text-[#2c2a29]/50 hover:text-[#2c2a29]"
                }
              `}
            >
              Personal ({testimonials.filter(t => t.type === "personal").length})
            </button>
          </div>
        </div>

        {/* TESTIMONIALS CAROUSEL */}
        <div className="relative mb-12">
          {/* Navigation Buttons - Hanya icon, muncul saat hover */}
          {filteredTestimonials.length > 0 && (
            <>
              {/* Left Button Container */}
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
                    x: hoverLeft ? 0 : -10
                  }}
                  transition={{ duration: 0.2 }}
                  className="text-[#2c2a29]"
                >
                  <ChevronLeft size={32} strokeWidth={1.5} />
                </motion.button>
              </div>
              
              {/* Right Button Container */}
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
                    x: hoverRight ? 0 : 10
                  }}
                  transition={{ duration: 0.2 }}
                  className="text-[#2c2a29]"
                >
                  <ChevronRight size={32} strokeWidth={1.5} />
                </motion.button>
              </div>
            </>
          )}

          {/* Carousel Container */}
          <div className="relative min-h-[380px] md:min-h-[400px] flex items-center justify-center overflow-visible">
            
            {/* Background Accent */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
               <div className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] border border-[#2c2a29] rounded-full animate-spin-slow" />
               <div className="absolute w-[250px] h-[250px] md:w-[450px] md:h-[450px] border border-[#2c2a29] rounded-full animate-spin-reverse opacity-50" />
            </div>

            <AnimatePresence initial={false} custom={direction}>
              {filteredTestimonials.map((item, idx) => {
                const position = getCardPosition(idx);
                
                // Tampilkan card yang visible
                if (!isMobile && Math.abs(position) > 2) return null;
                if (isMobile && position !== 0) return null; // Only active card on mobile for cleaner look
                
                return (
                  <motion.div
                    key={item.id}
                    custom={direction}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={onDragEnd}
                    initial={{ 
                      x: position > 0 ? '150%' : '-150%',
                      y: 20,
                      opacity: 0,
                      scale: 0.7,
                      filter: 'blur(8px)'
                    }}
                    whileInView={{ y: 0, opacity: position === 0 ? 1 : 0.3 }}
                    viewport={{ once: true, margin: "-100px" }}
                    animate={{ 
                      x: isMobile 
                        ? '0%' 
                        : position === 0 ? '0%' : position === 1 ? '110%' : position === -1 ? '-110%' : position === 2 ? '220%' : '-220%',
                      opacity: position === 0 ? 1 : 0.3,
                      scale: position === 0 ? 1 : 0.8,
                      filter: position === 0 ? 'blur(0px)' : 'blur(4px)',
                      zIndex: position === 0 ? 20 : 10,
                    }}
                    exit={{ 
                      x: direction > 0 ? '-150%' : '150%',
                      opacity: 0,
                      scale: 0.7,
                      filter: 'blur(8px)'
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
                      }
                    }}
                    className="absolute w-[88%] md:w-[400px] cursor-grab active:cursor-grabbing"
                  >
                    <div
                      className={`
                        relative bg-white p-7 md:p-10 flex flex-col gap-5 h-full
                        transition-all duration-500 rounded-2xl overflow-hidden
                        ${position === 0 
                          ? 'shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-b-4 border-[#c69c3d]/30' 
                          : 'shadow-md border border-black/5'
                        }
                      `}
                    >
                      {/* Background Quote Icon */}
                      <Quote 
                        className="absolute top-6 right-6 text-[#c69c3d]/5 pointer-events-none" 
                        size={120} 
                        strokeWidth={0.5} 
                      />

                      {/* Header Card */}
                      <div className="flex items-center gap-4">
                        <div className="relative w-14 h-14 md:w-16 md:h-16 flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className={`object-contain transition-all duration-500 rounded-lg ${
                              position !== 0 ? 'grayscale opacity-30' : ''
                            }`}
                          />
                        </div>
                        <div>
                          <p className="text-xs md:text-sm uppercase tracking-[0.15em] font-semibold text-[#2c2a29]">
                            {item.name}
                          </p>
                          <p className="text-[10px] md:text-xs text-[#c69c3d] mt-0.5 tracking-wider font-medium">
                            {item.role}
                          </p>
                        </div>
                      </div>

                      {/* Quote */}
                      <div className="relative">
                        <Quote className="text-[#c69c3d]/20 mb-2" size={18} fill="currentColor" />
                        <p className="text-sm md:text-base italic text-[#2c2a29]/80 leading-relaxed font-light">
                          {item.quote}
                        </p>
                      </div>

                      {/* Footer accent */}
                      {position === 0 && (
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: '40px' }}
                          className="h-[1px] bg-[#c69c3d]/40 mt-2"
                        />
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          {filteredTestimonials.length > 0 && (
            <div className="flex justify-center gap-2 mt-4">
              {filteredTestimonials.map((_, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`
                    rounded-full transition-all duration-300 p-0 border-0 min-w-0 min-h-0 overflow-hidden cursor-pointer
                    ${currentIndex === index ? 'bg-[#c69c3d]' : 'bg-[#2c2a29]/20 hover:bg-[#2c2a29]/40'}
                  `}
                  style={{
                    width: (currentIndex === index ? (isMobile ? 12 : 20) : 6) + 'px',
                    height: (isMobile ? 6 : 6) + 'px',
                    flexShrink: 0,
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* CLIENT LOGO CAROUSEL */}
        <div className="border-t border-[#2c2a29]/10 pt-16 pb-10 overflow-hidden">
          {/* HEADING */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-[#2c2a29]">
              Our Clients
            </h2>
            <div className="w-12 h-[2px] bg-[#c69c3d]/50 mt-3" />
          </motion.div>

          <div className="relative w-full overflow-hidden">
            <div className="flex animate-client-scroll gap-4 md:gap-6">
              {[...clients, ...clients].map((logo, i) => (
                <div
                  key={i}
                  className="min-w-[100px] md:min-w-[120px] h-[60px] md:h-[80px] flex items-center justify-center bg-white border border-[#2c2a29]/10 rounded-lg transition-all duration-300 group"
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

      {/* CSS untuk animasi scroll */}
      <style jsx>{`
        @keyframes client-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-client-scroll {
          animation: client-scroll 50s linear infinite;
          width: fit-content;
        }
        .animate-client-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}