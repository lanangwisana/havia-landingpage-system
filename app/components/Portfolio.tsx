"use client";

import { useState, useRef, useEffect, useLayoutEffect } from "react";
import Image from "next/image";
import {
  X,
  Undo2,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "../components/Header";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Project = {
  id: number;
  title: string;
  category: string;
  image: string;
  location: string;
  year: string;
  story?: string;
  client?: string;
  scope?: string[];
  images: string[];
};

export default function Portfolio({ cmsData }: { cmsData: any }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsState, setProjectsState] = useState<Project[]>([]);
  const [pagination, setPagination] = useState({ total_pages: 1, total_items: 0 });
  const [isLoading, setIsLoading] = useState(false);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const portfolioRef = useRef<HTMLElement | null>(null);
  const gridContainerRef = useRef<HTMLDivElement | null>(null);
  const gridItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const modalContentRef = useRef<HTMLDivElement | null>(null);
  const filterButtonRef = useRef<HTMLButtonElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const rowTriggersRef = useRef<ScrollTrigger[]>([]);

  const h2 = cmsData?.landingpage_portfolio_h2 || "Projects";

  // Categories helper
  const categoriesList: { id: string | number; name: string }[] = (() => {
    if (cmsData?.project_categories && cmsData.project_categories.length > 0) {
      return [{ id: "all", name: "All" }, ...cmsData.project_categories.map((c: any) => ({ id: c.id, name: c.name }))];
    }
    return [
      { id: "all", name: "All" },
      { id: 1, name: "Residential" },
      { id: 2, name: "Commercial" },
      { id: 3, name: "Educational" },
      { id: 4, name: "Interior" },
      { id: 5, name: "Masterplan" },
    ];
  })();

  // Fetch logic
  const fetchPage = async (page: number, catId: string | number) => {
    setIsLoading(true);
    try {
      const resp = await fetch(`/api/haviacms/landingpage/settings?page=${page}&category_id=${catId}`);
      const result = await resp.json();
      if (result.success && result.data.projects) {
        setProjectsState(result.data.projects.map((p: any) => ({
          id: p.id,
          title: p.title || "",
          category: p.category || "",
          image: p.image || "",
          location: p.location || "",
          year: p.year || "",
          client: p.client || "",
          scope: Array.isArray(p.scope) ? p.scope : [],
          story: p.story || "",
          images: Array.isArray(p.images) && p.images.length > 0 ? p.images : [p.image],
        })));
        setPagination(result.data.pagination);
      }
    } catch (err) {
      console.error("Fetch failed", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial load or category/page change
  useEffect(() => {
    const catObj = categoriesList.find(c => c.name === activeCategory);
    const catId = catObj ? catObj.id : "all";
    fetchPage(currentPage, catId);
    
    // Scroll to portfolio section on page/cat change except initial load
    if (currentPage > 1 || activeCategory !== "All") {
        portfolioRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [activeCategory, currentPage]);

  useEffect(() => {
    const handleFilter = (e: any) => {
      const { category } = e.detail;
      if (category) {
        setActiveCategory(category);
        setCurrentPage(1);
      } else {
        setActiveCategory("All");
        setCurrentPage(1);
      }
    };
    window.addEventListener("filterProjects", handleFilter);
    return () => window.removeEventListener("filterProjects", handleFilter);
  }, []);

  const handleCategoryChange = (catName: string) => {
    setActiveCategory(catName);
    setCurrentPage(1);
    setShowFilterDropdown(false);
  };

  useLayoutEffect(() => {
    rowTriggersRef.current.forEach((st) => st.kill());
    rowTriggersRef.current = [];

    if (!gridContainerRef.current || projectsState.length === 0) return;

    const items = gridItemsRef.current.filter((item) => item !== null);
    const rows: HTMLDivElement[][] = [];
    for (let i = 0; i < items.length; i += 3) {
      rows.push(items.slice(i, i + 3));
    }

    const rowStartPositions = ["top 85%", "top 65%", "top 50%"];

    rows.forEach((row, rowIndex) => {
      const yOffset = 60 + rowIndex * 20;
      gsap.set(row, { autoAlpha: 0, y: yOffset });

      const trigger = ScrollTrigger.create({
        trigger: row[0],
        start: rowStartPositions[rowIndex] || "top 50%",
        onEnter: () => {
          gsap.to(row, {
            autoAlpha: 1,
            y: 0,
            duration: 0.9 + rowIndex * 0.1,
            stagger: 0.2,
            ease: "power3.out",
          });
        },
      });
      rowTriggersRef.current.push(trigger);
    });

    const headerLine = portfolioRef.current?.querySelector(".header-line");
    if (headerLine && !ScrollTrigger.getById("header-line")) {
      const headerTrigger = ScrollTrigger.create({
        trigger: portfolioRef.current,
        id: "header-line",
        start: "top 80%",
        onEnter: () => {
          gsap.fromTo(
            headerLine,
            { width: 0 },
            { width: "3rem", duration: 0.8, ease: "power2.out" },
          );
        },
      });
      rowTriggersRef.current.push(headerTrigger);
    }
  }, [projectsState]);

  // Image scroll and Modal logic (kept unchanged)
  useEffect(() => {
    if (!selectedProject) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrolling) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setActiveImage(index);
          }
        });
      },
      { threshold: 0.7 },
    );
    imageRefs.current.forEach((el) => { if (el) observer.observe(el); });
    return () => {
      imageRefs.current.forEach((el) => { if (el) observer.unobserve(el); });
      observer.disconnect();
    };
  }, [selectedProject, isScrolling]);

  const scrollToImage = (index: number) => {
    if (!imageRefs.current[index] || !modalContentRef.current) return;
    setActiveImage(index);
    const container = modalContentRef.current;
    const element = imageRefs.current[index];
    if (element) {
      const elementPosition = element.offsetTop;
      const scrollTo = elementPosition - container.clientHeight / 2 + element.clientHeight / 2;
      const startPosition = container.scrollTop;
      const distance = scrollTo - startPosition;
      const duration = 600;
      let startTime: number | null = null;
      const animation = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = (t: number) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        container.scrollTop = startPosition + distance * ease(progress);
        if (timeElapsed < duration) requestAnimationFrame(animation);
        else setIsScrolling(false);
      };
      setIsScrolling(true);
      requestAnimationFrame(animation);
    }
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section ref={portfolioRef} id="portfolio" className="md:pt-16 pb-16 md:pb-20 font-sans" style={{ backgroundColor: "var(--havia-offwhite)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="hidden md:flex gap-12 lg:gap-16">
          {/* Categories Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="sticky top-24">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <h2 className="text-2xl font-light tracking-tight text-[var(--havia-charcoal)] mb-4">{h2}</h2>
                <div className="header-line w-12 h-[2px] bg-[var(--havia-gold)]/50 mb-8" />
              </motion.div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-medium uppercase tracking-wider text-gray-400 mb-3">CATEGORY</h3>
                  <div className="flex flex-col space-y-2">
                    {categoriesList.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => handleCategoryChange(cat.name)}
                        className={`relative text-sm transition-all duration-300 text-left ${
                            activeCategory === cat.name ? "text-[var(--havia-charcoal)] font-semibold border-l-2 border-[var(--havia-gold)] pl-3" : "text-gray-400 hover:text-gray-600 pl-4"
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Project Grid */}
          <div className="flex-1 min-h-[700px]">
            <div ref={gridContainerRef} className={`grid grid-cols-3 gap-8 transition-opacity duration-300 ${isLoading ? "opacity-40" : "opacity-100"}`}>
              {projectsState.map((project, idx) => (
                <div key={project.id} ref={(el) => { gridItemsRef.current[idx] = el; }} onClick={() => { setSelectedProject(project); setActiveImage(0); }} className="group cursor-pointer">
                  <div className="relative aspect-[4/3] overflow-hidden mb-3 bg-gray-100">
                    <Image src={project.image} alt={project.title} fill className="object-cover group-hover:scale-105 transition-all duration-700 ease-out" sizes="33vw" />
                  </div>
                  <h3 className="text-sm font-medium text-[var(--havia-charcoal)] tracking-wide mb-1 truncate">{project.title}</h3>
                  <div className="flex justify-between items-baseline text-xs text-gray-400">
                    <span>{project.location}</span>
                    <span>{project.year}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {pagination.total_pages > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-12">
                {Array.from({ length: pagination.total_pages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-10 h-10 flex items-center justify-center text-sm transition-all duration-300 border ${
                      currentPage === pageNum
                        ? "bg-[var(--havia-gold)] border-[var(--havia-gold)] text-white font-bold"
                        : "border-gray-200 text-gray-400 hover:border-[var(--havia-gold)] hover:text-[var(--havia-gold)] bg-white"
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Layout (Simplified) */}
        <div className="md:hidden">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-light tracking-tight text-[var(--havia-charcoal)]">{h2}</h2>
            <button onClick={() => setShowFilterDropdown(!showFilterDropdown)} className="p-2"><SlidersHorizontal size={20} /></button>
          </div>
          
          {showFilterDropdown && (
            <div className="w-full mb-6 grid grid-cols-2 gap-2">
              {categoriesList.map((cat) => (
                <button key={cat.id} onClick={() => handleCategoryChange(cat.name)} className={`text-left text-sm py-1 ${activeCategory === cat.name ? "text-[var(--havia-charcoal)] font-bold" : "text-gray-400"}`}>{cat.name}</button>
              ))}
            </div>
          )}

          <div className={`grid grid-cols-1 gap-6 ${isLoading ? "opacity-40" : "opacity-100"}`}>
            {projectsState.map((project) => (
              <div key={project.id} onClick={() => { setSelectedProject(project); setActiveImage(0); }} className="group">
                <div className="relative aspect-[4/3] overflow-hidden mb-2 bg-gray-100">
                  <Image src={project.image} alt={project.title} fill className="object-cover" />
                </div>
                <h3 className="text-sm font-medium">{project.title}</h3>
                <div className="flex justify-between text-xs text-gray-400"><span>{project.location}</span><span>{project.year}</span></div>
              </div>
            ))}
          </div>

          {/* Mobile Pagination */}
          {pagination.total_pages > 1 && (
            <div className="flex justify-center space-x-2 mt-8">
              {Array.from({ length: pagination.total_pages }, (_, i) => i + 1).map((pageNum) => (
                <button key={pageNum} onClick={() => setCurrentPage(pageNum)} className={`w-8 h-8 text-xs border ${currentPage === pageNum ? "bg-[var(--havia-gold)] text-white" : "bg-white"}`}>{pageNum}</button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Project Modal (kept for project details) */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div className="fixed inset-0 z-50 overflow-hidden bg-white" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute top-0 left-0 right-0 z-[70] hidden lg:block"><Header /></div>
            <div className="lg:grid lg:grid-cols-[100px_1fr_320px] h-screen pt-20">
              {/* Thumbnails */}
              <div className="hidden lg:flex flex-col p-4 overflow-y-auto space-y-4">
                {selectedProject.images.map((img, i) => (
                  <button key={i} onClick={() => scrollToImage(i)} className={`relative aspect-[4/3] w-full border-2 ${activeImage === i ? "border-[var(--havia-gold)]" : "border-transparent opacity-60"}`}>
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
              {/* Main Image Center */}
              <div ref={modalContentRef} className="overflow-y-auto px-10 py-10 space-y-10 scroll-smooth">
                {selectedProject.images.map((img, i) => (
                  <div key={i} ref={(el) => { imageRefs.current[i] = el; }} data-index={i} className="relative w-full h-[60vh]">
                    <Image src={img} alt="" fill className="object-cover rounded-lg" />
                  </div>
                ))}
              </div>
              {/* Info Sidebar */}
              <div className="p-8 overflow-y-auto">
                <div className="flex justify-between items-start mb-8">
                  <h2 className="text-2xl font-medium">{selectedProject.title}</h2>
                  <button onClick={() => setSelectedProject(null)} className="p-2"><X size={24} /></button>
                </div>
                <div className="space-y-4 text-sm">
                  <p><span className="text-gray-400 inline-block w-20">Location</span> <b>{selectedProject.location}</b></p>
                  <p><span className="text-gray-400 inline-block w-20">Year</span> <b>{selectedProject.year}</b></p>
                  <p><span className="text-gray-400 inline-block w-20">Category</span> <b>{selectedProject.category}</b></p>
                  <div className="pt-4"><p className="text-gray-500 leading-relaxed text-justify">{selectedProject.story}</p></div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
