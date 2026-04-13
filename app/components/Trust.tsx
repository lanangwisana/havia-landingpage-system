"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Quote, Play, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Testimonial = {
  id: number;
  image: string;
  quote: string;
  name: string;
  role: string;
  type: "corporate" | "personal";
  youtube_link?: string;
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
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const autoScrollInterval = useRef<NodeJS.Timeout | null>(null);

  const getYoutubeId = (url?: string) => {
    if (!url) return null;
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url?.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // CMS data with static fallbacks
  const staticTestimonials: Testimonial[] = [
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
  ];

  // Use CMS testimonials if available, otherwise static
  const cmsTestimonials: Testimonial[] =
    cmsData?.testimonials && cmsData.testimonials.length > 0
      ? cmsData.testimonials.map((t: any) => ({
          id: t.id,
          image: t.image || "/logo-client-person.png",
          quote: t.quote || "",
          name: t.name || "",
          role: t.role || "",
          youtube_link: t.youtube_link || "",
          type: (t.type === "personal" ? "personal" : "corporate") as
            | "corporate"
            | "personal",
        }))
      : staticTestimonials;

  const testimonials = cmsTestimonials;

  const filteredTestimonials = testimonials.filter(
    (t) => t.type === filterType,
  );

  // Use CMS client logos if available
  const clients: string[] =
    cmsData?.client_logos && cmsData.client_logos.length > 0
      ? cmsData.client_logos.map((c: any) => c.image)
      : staticClients;

  // CMS headings
  const testimonialHeading =
    cmsData?.landingpage_trust_heading || "Testimonial";
  const btnCorporateLabel =
    cmsData?.landingpage_trust_btn_corporate || "Corporate";
  const btnPersonalLabel =
    cmsData?.landingpage_trust_btn_personal || "Personal";
  const clientHeading =
    cmsData?.landingpage_trust_client_heading || "Our Clients";

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
      className="relative py-12 md:py-16 bg-[var(--havia-offwhite)] overflow-hidden"
      style={{ fontFamily: 'Helvetica, "Open Sans", sans-serif' }}
    >
      {/* Watermark Logo */}
      <div className="absolute right-[-50px] md:right-0 top-[-40px] md:top-[-60px] pointer-events-none z-0 opacity-[0.05] md:opacity-[0.05]">
        <Image
          src="/havia-vector.svg"
          alt="Havia Studio Watermark"
          width={900}
          height={600}
          className="object-contain w-[500px] md:w-[800px]"
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
            {testimonialHeading}
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
              {btnCorporateLabel} (
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
              {btnPersonalLabel} (
              {testimonials.filter((t) => t.type === "personal").length})
            </button>
          </div>
        </div>

        {/* TESTIMONIALS CAROUSEL */}
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

          {/* Sesuaikan min-height agar card lebih ke atas */}
          <div className="relative min-h-[420px] md:min-h-[480px] flex items-center justify-center overflow-visible">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
              <div className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] border border-[var(--havia-charcoal)] rounded-full animate-spin-slow" />
              <div className="absolute w-[250px] h-[250px] md:w-[450px] md:h-[450px] border border-[var(--havia-charcoal)] rounded-full animate-spin-reverse opacity-50" />
            </div>

            <AnimatePresence initial={false} custom={direction}>
              {filteredTestimonials.map((item, idx) => {
                const position = getCardPosition(idx);
                const videoId = getYoutubeId(item.youtube_link);
                const hasVideo = !!videoId;

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

                      {hasVideo ? (
                        // Layout untuk testimonial video
                        <>
                          <div
                            className="relative w-full aspect-video rounded-lg overflow-hidden cursor-pointer group"
                            onClick={() => {
                              if (position === 0) setActiveVideoId(videoId);
                            }}
                          >
                            <img
                              src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                              alt="Video thumbnail"
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all flex items-center justify-center">
                              <div className="w-12 h-12 md:w-16 md:h-16 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-[#c69c3d]/80">
                                <Play className="text-white w-6 h-6 md:w-8 md:h-8 fill-current ml-0.5" />
                              </div>
                            </div>
                          </div>

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
                        </>
                      ) : (
                        // Layout untuk testimonial biasa (tanpa video)
                        <>
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
                          <div className="relative mt-2">
                            <Quote
                              className="text-[var(--havia-gold)]/20 mb-2"
                              size={18}
                              fill="currentColor"
                            />
                            <p className="text-sm md:text-base italic text-[var(--havia-charcoal)]/80 leading-relaxed font-light">
                              {item.quote}
                            </p>
                          </div>
                        </>
                      )}

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

        {/* Client Logo Section */}
        <div className="border-t border-[var(--havia-charcoal)]/10 pt-16 pb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl font-light tracking-tight text-[var(--havia-charcoal)] mb-4">
              {clientHeading}
            </h2>
            <div className="header-line w-12 h-[2px] bg-[var(--havia-gold)]/50 mx-auto" />
          </motion.div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 md:gap-6 justify-items-center items-center">
            {clients.map((logo, idx) => (
              <div
                key={idx}
                className="w-[60px] sm:w-[80px] md:w-[100px] h-[40px] sm:h-[50px] md:h-[60px] flex items-center justify-center"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={logo}
                    alt="Client Logo"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Video Popup Modal */}
      <AnimatePresence>
        {activeVideoId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
            onClick={() => setActiveVideoId(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveVideoId(null)}
                className="absolute -top-12 right-0 text-white hover:text-red-500 transition-colors bg-black/50 p-2 rounded-full z-10"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="relative aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1&rel=0&modestbranding=1&showinfo=0`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}