"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { ChevronUp } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

type Project = {
  id: number;
  image: string;
  category: string;
};

const projects: Project[] = [
  { id: 1, image: "/havia-project-2.jpg", category: "Residence" },
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
  
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  const springScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  // Transform values untuk animasi scroll
  const opacity = useTransform(springScroll, [0, 0.5], [1, 0.3]);
  const scale = useTransform(springScroll, [0, 0.5], [1, 0.95]);
  const y = useTransform(springScroll, [0, 0.5], [0, 50]);
  const blur = useTransform(springScroll, [0, 0.5], [0, 5]);
  
  const handleExploreClick = () => {
    const el = document.querySelector("#portfolio");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

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

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#f2f1f0] py-12 md:py-18 overflow-hidden mt-10"
      onMouseEnter={() => !isMobile && setShowCursor(true)}
      onMouseLeave={() => !isMobile && setShowCursor(false)}
    >
      {/* CONTAINER dengan efek scroll */}
      <motion.div 
        ref={containerRef}
        style={{
          opacity,
          scale,
          y,
          filter: `blur(${blur}px)`
        }}
        className="max-w-7xl mx-auto px-4 md:px-6 h-[70vh] relative"
      >
        <div className="w-full h-full flex gap-3 md:gap-4">
          {projects.map((project, index) => {
            const isActive = index === activeIndex;

            return (
              <div
                key={project.id}
                onMouseEnter={() => !isMobile && setActiveIndex(index)}
                onClick={() => isMobile && setActiveIndex(index)}
                className={`
                  relative h-full overflow-hidden rounded-lg
                  transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
                  ${isActive ? "flex-[4]" : "flex-[1]"}
                  ${!isMobile ? "cursor-none" : "cursor-pointer"}
                `}
              >
                {/* IMAGE */}
                <div className="absolute inset-0">
                  <Image
                    src={project.image}
                    alt={project.category}
                    fill
                    className={`
                      object-cover transition-all duration-700
                      ${
                        isActive
                          ? "scale-105 md:grayscale-0 blur-[2px] md:blur-[2px]"
                          : "grayscale"
                      }
                    `}
                  />
                </div>

                {/* OVERLAY PUTIH */}
                {!isActive && (
                  <div className="absolute inset-0 bg-white/70" />
                )}

                {/* DARK OVERLAY ACTIVE */}
                {isActive && (
                  <div className="absolute inset-0 bg-black/40" />
                )}

                {/* CONTENT */}
                <motion.div
                  initial={false}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    y: isActive ? 0 : 20
                  }}
                  transition={{ duration: 0.5, delay: isActive ? 0.2 : 0 }}
                  className={`
                    absolute inset-0 flex flex-col items-center justify-center gap-3
                    transition-all duration-500 z-10
                  `}
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: isActive ? 1 : 0 }}
                    transition={{ duration: 0.4, delay: isActive ? 0.3 : 0 }}
                    className="w-8 h-8 border border-white bg-white/10 rounded-sm"
                  />
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
                    transition={{ duration: 0.4, delay: isActive ? 0.4 : 0 }}
                    className="text-xs md:text-sm tracking-[0.3em] uppercase text-white font-light"
                    style={{ fontFamily: "'Open Sans', sans-serif" }}
                  >
                    {project.category}
                  </motion.p>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* EXPLORE BUTTON - dengan animasi scroll */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="absolute bottom-[-80px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <button
            onClick={handleExploreClick}
            onMouseEnter={() => !isMobile && setHoverExplore(true)}
            onMouseLeave={() => !isMobile && setHoverExplore(false)}
            className="group flex flex-col items-center text-[#2c2a29] transition-all duration-300"
          >
            {/* Teks dengan efek hover */}
            <span className={`
              text-[10px] md:text-[11px] tracking-[0.35em] uppercase transition-all duration-300 font-medium
              ${hoverExplore && !isMobile ? 'text-[#c69c3d] opacity-100' : 'opacity-60'}
            `}
            style={{ fontFamily: "'Helvetica', sans-serif" }}>
              Explore
            </span>

            {/* CUSTOM ICON dengan efek hover */}
            <div className="flex flex-col items-center gap-[3px] mt-1">
              <div className={`
                w-6 h-3 border-t rounded-t-full transition-all duration-300
                ${hoverExplore && !isMobile
                  ? 'border-[#c69c3d] opacity-100 scale-110'
                  : 'border-[#2c2a29] opacity-60'
                }
              `} />
              <div className={`
                w-4 h-2 border-t rounded-t-full transition-all duration-300
                ${hoverExplore && !isMobile
                  ? 'border-[#c69c3d] opacity-100 scale-110'
                  : 'border-[#2c2a29] opacity-40'
                }
              `} />
            </div>
            
            {/* Tambahan garis bawah untuk memperjelas clickable */}
            <div className={`
              w-0 h-[1px] bg-[#c69c3d] transition-all duration-300 mt-1
              ${hoverExplore && !isMobile ? 'w-12' : 'w-0'}
            `} />
          </button>
        </motion.div>
      </motion.div>

      {/* CUSTOM CURSOR - hanya tampil di desktop */}
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
          <div className={`
            w-10 h-10 rounded-full border flex items-center justify-center text-xs
            transition-all duration-300
            ${hoverExplore
              ? 'border-[#c69c3d] text-[#c69c3d] scale-110'
              : 'border-white text-white'
            }
          `}>
            <ChevronUp size={16} />
          </div>
        </motion.div>
      )}

      {/* Global Styles untuk font dan animations */}
      <style jsx global>{`
        /* Font settings */
        * {
          font-family: 'Helvetica', 'Open Sans', sans-serif;
        }
        
        /* Heading styles */
        h1, h2, h3, h4, h5, h6 {
          font-family: 'Helvetica', sans-serif;
          font-weight: 500;
          letter-spacing: -0.02em;
        }
        
        /* Body text */
        p, span, button {
          font-family: 'Open Sans', sans-serif;
        }
        
        /* Scroll animations */
        html {
          scroll-behavior: smooth;
        }
        
        /* Parallax effect for scroll */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        /* Animation classes */
        .fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .scale-in {
          animation: scaleIn 0.6s ease-out forwards;
        }
        
        .slide-in-left {
          animation: slideInLeft 0.7s ease-out forwards;
        }
        
        .slide-in-right {
          animation: slideInRight 0.7s ease-out forwards;
        }
        
        /* Stagger children animations */
        .stagger-children > * {
          opacity: 0;
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .stagger-children > *:nth-child(1) { animation-delay: 0.1s; }
        .stagger-children > *:nth-child(2) { animation-delay: 0.2s; }
        .stagger-children > *:nth-child(3) { animation-delay: 0.3s; }
        .stagger-children > *:nth-child(4) { animation-delay: 0.4s; }
        .stagger-children > *:nth-child(5) { animation-delay: 0.5s; }
        
        /* Smooth scroll indicator */
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(5px);
          }
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s infinite;
        }
        
        /* Hover effects only for desktop */
        @media (min-width: 768px) {
          .hover-lift {
            transition: transform 0.3s ease;
          }
          
          .hover-lift:hover {
            transform: translateY(-5px);
          }
        }
        
        /* Mobile touch optimizations */
        @media (max-width: 768px) {
          button, [onClick] {
            cursor: pointer;
            -webkit-tap-highlight-color: transparent;
          }
          
          /* Improve touch targets */
          button {
            min-height: 44px;
            min-width: 44px;
          }
        }
      `}</style>
    </section>
  );
}