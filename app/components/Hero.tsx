"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { ChevronDown, ArrowUpRight } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  Variants,
} from "framer-motion";

type Project = {
  id: number;
  image: string;
  category: string;
};

const projects: Project[] = [
  { id: 1, image: "/havia-project-2.jpg", category: "Residential" },
  { id: 2, image: "/havia-project-4.jpg", category: "Commercial" },
  { id: 3, image: "/havia-project-1.jpg", category: "Educational" },
  { id: 4, image: "/havia-project-8.jpg", category: "Interior" },
  { id: 5, image: "/havia-project-6.jpg", category: "Masterplan" },
];

export default function Hero({ cmsData }: { cmsData: any }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(false);
  const [hoverExplore, setHoverExplore] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const move = (e: MouseEvent) =>
      setCursorPos({ x: e.clientX, y: e.clientY });
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    window.addEventListener("mousemove", move);
    setTimeout(() => setHasAnimated(true), 100);
    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("mousemove", move);
    };
  }, []);

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

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[var(--havia-offwhite)] py-12 md:py-18 overflow-hidden mt-10"
      onMouseEnter={() => !isMobile && setShowCursor(true)}
      onMouseLeave={() => !isMobile && setShowCursor(false)}
    >
      <motion.div
        ref={containerRef}
        style={{ opacity, scale, y }}
        className="max-w-7xl mx-auto px-4 md:px-6 h-[70vh] relative"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={hasAnimated ? "visible" : "hidden"}
          className="w-full h-full flex gap-2 md:gap-4"
        >
          {projects.map((project, index) => {
            const isActive = index === activeIndex;
            return (
              <motion.div
                key={project.id}
                variants={itemVariants}
                onMouseEnter={() => !isMobile && setActiveIndex(index)}
                onClick={() => isMobile && setActiveIndex(index)}
                className={`
                  relative h-full overflow-hidden cursor-none
                  transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
                  ${isActive ? "flex-[4]" : "flex-[1]"}
                `}
              >
                <div className="absolute inset-0">
                  <Image
                    src={project.image}
                    alt={project.category}
                    fill
                    className={`object-cover transition-all duration-700 ${
                      isActive ? "scale-105 md:grayscale-0" : "grayscale"
                    }`}
                  />
                </div>

                {!isActive && <div className="absolute inset-0 bg-white/70" />}
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20" />
                )}

                {isMobile && isActive && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleExploreClick(project.category);
                    }}
                    className="absolute bottom-4 right-4 z-20 text-white/80 hover:text-white transition-colors"
                    aria-label={`Explore ${project.category} projects`}
                  >
                    <ArrowUpRight size={20} strokeWidth={1.5} />
                  </button>
                )}

                <motion.div
                  initial={false}
                  animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 30 }}
                  transition={{ duration: 0.5, delay: isActive ? 0.2 : 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4 md:px-6"
                >
                  {isActive && (
                    <>
                      <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="text-xl md:text-5xl font-light text-white uppercase tracking-[2px] mb-2 md:mb-4 text-center break-words font-sans"
                      >
                        {project.category}
                      </motion.h2>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: 40 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="h-px bg-[var(--havia-gold)] mb-3 md:mb-6"
                      />
                      {!isMobile && (
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6, duration: 0.5 }}
                          className="group cursor-none"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleExploreClick(project.category);
                          }}
                        >
                          <div className="flex items-center gap-1.5 md:gap-3 flex-wrap justify-center">
                            <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/70 group-hover:text-white transition-colors">
                              Go to
                            </span>
                            <span className="text-[11px] md:text-sm uppercase tracking-[0.1em] text-white font-semibold group-hover:text-[var(--havia-gold)] transition-colors">
                              {project.category}
                            </span>
                            <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/70 group-hover:text-white transition-colors">
                              Project
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
                            className="h-[1px] bg-[var(--havia-gold)] mt-1.5 md:mt-2"
                          />
                        </motion.div>
                      )}
                    </>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

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
    </section>
  );
}
