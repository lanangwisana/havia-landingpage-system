"use client";

import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronDown, ArrowUpRight } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
  Variants,
  PanInfo,
} from "framer-motion";

type Project = {
  id: number;
  image: string;
  category: string;
  heading_h1?: string;
  heading_h2?: string;
};

const staticProjects: Project[] = [
  { id: 1, image: "/havia-project-2.jpg", category: "Residential" },
  { id: 2, image: "/havia-project-4.jpg", category: "Commercial" },
  { id: 3, image: "/havia-project-1.jpg", category: "Educational" },
  { id: 4, image: "/havia-project-8.jpg", category: "Interior" },
  { id: 5, image: "/havia-project-6.jpg", category: "Masterplan" },
];

const swipeVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
  }),
};

export default function Hero({ cmsData }: { cmsData: any }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [[mobileIndex, direction], setMobileSlide] = useState([0, 0]);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(false);
  const [hoverExplore, setHoverExplore] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Use CMS hero slides if available
  const projects: Project[] = (cmsData?.hero_slides && cmsData.hero_slides.length > 0)
    ? cmsData.hero_slides.map((s: any, i: number) => ({
        id: s.id || i + 1,
        image: s.image || staticProjects[i % staticProjects.length]?.image || "/havia-project-1.jpg",
        category: staticProjects[i % staticProjects.length]?.category || "Architecture",
        heading_h1: s.heading_h1 || "",
        heading_h2: s.heading_h2 || "",
      }))
    : staticProjects;

  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const springScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });
  const opacity = useTransform(springScroll, [0, 0.5], [1, 0.3]);
  const scale = useTransform(springScroll, [0, 0.5], [1, 0.95]);
  const y = useTransform(springScroll, [0, 0.5], [0, 50]);

  const handleExploreClick = (category?: string) => {
    const portfolioSection = document.querySelector("#portfolio");
    if (portfolioSection) {
      if (category) sessionStorage.setItem("selectedCategory", category);
      portfolioSection.scrollIntoView({ behavior: "smooth" });
      window.dispatchEvent(
        new CustomEvent("filterProjects", {
          detail: { category: category || null },
        }),
      );
    }
  };

  const paginate = useCallback((newDirection: number) => {
    setMobileSlide(([prev]) => {
      let next = prev + newDirection;
      if (next < 0) next = projects.length - 1;
      if (next >= projects.length) next = 0;
      return [next, newDirection];
    });
  }, []);

  const goToSlide = useCallback((index: number) => {
    setMobileSlide(([prev]) => [index, index > prev ? 1 : -1]);
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    autoPlayRef.current = setInterval(() => paginate(1), 5000);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isMobile, paginate]);

  const resetAutoPlay = useCallback(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => paginate(1), 5000);
  }, [paginate]);

  const handleDragEnd = (_: any, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold || info.velocity.x < -500) {
      paginate(1);
      resetAutoPlay();
    } else if (info.offset.x > swipeThreshold || info.velocity.x > 500) {
      paginate(-1);
      resetAutoPlay();
    }
  };

  useEffect(() => {
    const move = (e: MouseEvent) =>
      setCursorPos({ x: e.clientX, y: e.clientY });
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    window.addEventListener("mousemove", move);

    setHasAnimated(true);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("mousemove", move);
    };
  }, []);

  const entranceVariants: Variants = {
    hidden: {
      y: "100%",
      opacity: 0,
      filter: "blur(8px)",
    },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 1.0,
        ease: [0.4, 0, 0.2, 1], 
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const exploreButtonVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { delay: 0.8, duration: 0.5, ease: "easeOut" },
    },
  };

  // Mobile Carousel Layout
  const renderMobileHero = () => {
    const currentProject = projects[mobileIndex];
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={hasAnimated ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full h-full flex flex-col"
      >
        <div className="relative flex-1 overflow-hidden rounded-sm">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={mobileIndex}
              custom={direction}
              variants={swipeVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.12}
              onDragEnd={handleDragEnd}
              className="absolute inset-0 cursor-grab active:cursor-grabbing"
            >
              <Image
                src={currentProject.image}
                alt={currentProject.category}
                fill
                className="object-cover"
                priority
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              <div className="absolute inset-0 flex flex-col items-start justify-end p-6 pb-8 z-10">
                <motion.div
                  key={`content-${mobileIndex}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <h2 className="text-2xl font-light text-white uppercase tracking-[3px] mb-2 font-sans">
                    {currentProject.heading_h1 || currentProject.category}
                  </h2>
                  <div className="w-10 h-px bg-[var(--havia-gold)] mb-4" />
                  <button
                    onClick={() => handleExploreClick(currentProject.category)}
                    className="flex items-center gap-2 group"
                  >
                    <span className="text-[11px] uppercase tracking-[0.15em] text-white/70 group-active:text-white transition-colors">
                      {currentProject.heading_h2 || "View Projects"}
                    </span>
                    <ArrowUpRight
                      size={14}
                      strokeWidth={1.5}
                      className="text-white/70 group-active:text-[var(--havia-gold)] transition-colors"
                    />
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-3 pt-5 pb-2">
          <span className="text-[10px] tracking-[0.15em] text-[var(--havia-charcoal)]/40 font-mono">
            {String(mobileIndex + 1).padStart(2, "0")}
          </span>
          <div className="flex items-center gap-2">
            {projects.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  goToSlide(idx);
                  resetAutoPlay();
                }}
                aria-label={`Go to project ${idx + 1}`}
                className="relative p-1"
              >
                <div
                  className={`transition-all duration-300 rounded-full ${
                    idx === mobileIndex
                      ? "w-5 h-1.5 bg-[var(--havia-gold)]"
                      : "w-1.5 h-1.5 bg-[var(--havia-charcoal)]/20"
                  }`}
                />
              </button>
            ))}
          </div>
          <span className="text-[10px] tracking-[0.15em] text-[var(--havia-charcoal)]/40 font-mono">
            {String(projects.length).padStart(2, "0")}
          </span>
        </div>
      </motion.div>
    );
  };

  // Desktop Layout
  const renderDesktopHero = () => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate={hasAnimated ? "visible" : "hidden"}
      className="w-full h-full flex gap-4"
    >
      {projects.map((project, index) => {
        const isActive = index === activeIndex;
        return (
          <motion.div
            key={project.id}
            variants={itemVariants}
            onMouseEnter={() => setActiveIndex(index)}
            // Seluruh card dapat diklik hanya jika aktif
            onClick={
              isActive ? () => handleExploreClick(project.category) : undefined
            }
            className={`
            relative h-full overflow-hidden
            transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
            ${isActive ? "flex-[4] cursor-none" : "flex-[1] cursor-none"}
          `}
          >
            <div className="absolute inset-0">
              <Image
                src={project.image}
                alt={project.category}
                fill
                className={`object-cover transition-all duration-700 ${
                  isActive ? "scale-105 grayscale-0" : "grayscale"
                }`}
              />
            </div>

            {!isActive && <div className="absolute inset-0 bg-white/70" />}
            {isActive && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20" />
            )}

            <motion.div
              initial={false}
              animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 30 }}
              transition={{ duration: 0.5, delay: isActive ? 0.2 : 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6"
            >
              {isActive && (
                <>
                  <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="text-5xl font-light text-white uppercase tracking-[2px] mb-4 text-center break-words font-sans"
                  >
                    {project.heading_h1 || project.category}
                  </motion.h2>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: 40 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="h-px bg-[var(--havia-gold)] mb-6"
                  />
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="group"
                  >
                    <div className="flex items-center gap-3 flex-wrap justify-center">
                      <span className="text-xs uppercase tracking-[0.2em] text-white/70 group-hover:text-white transition-colors">
                        View
                      </span>
                      <span className="text-sm uppercase tracking-[0.1em] text-white font-semibold group-hover:text-[var(--havia-gold)] transition-colors">
                        {project.heading_h1 || project.category}
                      </span>
                      <span className="text-xs uppercase tracking-[0.2em] text-white/70 group-hover:text-white transition-colors">
                        Projects
                      </span>
                      <ArrowUpRight
                        size={12}
                        className="text-white/70 group-hover:text-[var(--havia-gold)] transition-colors"
                      />
                    </div>
                    <motion.div
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                      className="h-[1px] bg-[var(--havia-gold)] mt-2"
                    />
                  </motion.div>
                </>
              )}
            </motion.div>
          </motion.div>
        );
      })}
    </motion.div>
  );

  return (
    <motion.section
      ref={sectionRef}
      className="relative w-full bg-[var(--havia-offwhite)] py-12 md:py-18 overflow-hidden mt-10"
      onMouseEnter={() => !isMobile && setShowCursor(true)}
      onMouseLeave={() => !isMobile && setShowCursor(false)}
      initial="hidden"
      animate={hasAnimated ? "visible" : "hidden"}
      variants={entranceVariants}
    >
      <motion.div
        ref={containerRef}
        style={{ opacity, scale, y }}
        className="max-w-7xl mx-auto px-4 md:px-6 h-[70vh] relative"
      >
        {isMobile ? renderMobileHero() : renderDesktopHero()}

        <motion.div
          variants={exploreButtonVariants}
          initial="hidden"
          animate={hasAnimated ? "visible" : "hidden"}
          className="absolute bottom-[-100px] left-1/2 -translate-x-1/2"
        >
          <button
            onClick={() => handleExploreClick()}
            onMouseEnter={() => !isMobile && setHoverExplore(true)}
            onMouseLeave={() => !isMobile && setHoverExplore(false)}
            className="group relative flex flex-col items-center"
          >
            <div className="relative flex flex-col items-center cursor-none">
              <div className="flex items-center gap-2 mb-3">
                <span
                  className={`text-[10px] md:text-xs tracking-[0.2em] font-medium transition-all duration-300 ${
                    hoverExplore && !isMobile
                      ? "text-[var(--havia-gold)]"
                      : "text-[var(--havia-charcoal)]/60"
                  }`}
                >
                  Explore More Projects
                </span>
                <motion.div
                  animate={{ y: hoverExplore && !isMobile ? 5 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown
                    size={12}
                    className={`transition-colors duration-300 ${
                      hoverExplore && !isMobile
                        ? "text-[var(--havia-gold)]"
                        : "text-[var(--havia-charcoal)]/40"
                    }`}
                  />
                </motion.div>
              </div>
              <div className="relative w-12 h-px overflow-hidden">
                <div
                  className={`absolute inset-0 bg-[var(--havia-charcoal)]/40 transition-transform duration-500 ${
                    hoverExplore && !isMobile
                      ? "translate-x-0"
                      : "-translate-x-full"
                  }`}
                />
                <div
                  className={`absolute inset-0 bg-[var(--havia-gold)] transition-transform duration-500 ${
                    hoverExplore && !isMobile
                      ? "translate-x-0"
                      : "translate-x-full"
                  }`}
                />
              </div>
              <div className="w-8 h-px bg-[var(--havia-charcoal)]/20 mt-2" />
            </div>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="mt-3"
            >
              <ChevronDown
                size={16}
                className="text-[var(--havia-charcoal)]/40"
              />
            </motion.div>
          </button>
        </motion.div>
      </motion.div>

      {/* Custom Cursor */}
      {!isMobile && showCursor && (
        <motion.div
          className="pointer-events-none fixed z-50"
          style={{
            left: cursorPos.x,
            top: cursorPos.y,
            transform: "translate(-50%, -50%)",
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className={`
              w-10 h-10 rounded-full border-2 flex items-center justify-center
              transition-all duration-300 backdrop-blur-sm
              ${hoverExplore ? "border-[var(--havia-gold)] bg-[var(--havia-gold)]/20 text-[var(--havia-gold)] scale-110" : "border-white/50 bg-white/10 text-white"}
            `}
          >
            <ArrowUpRight size={16} />
          </div>
        </motion.div>
      )}
    </motion.section>
  );
}
