"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

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

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const portfolioRef = useRef<HTMLElement | null>(null);

  const nextImage = () => {
    if (!selectedProject) return;

    setActiveImage((prev) =>
      prev === selectedProject.images.length - 1 ? 0 : prev + 1,
    );
  };

  const prevImage = () => {
    if (!selectedProject) return;

    setActiveImage((prev) =>
      prev === 0 ? selectedProject.images.length - 1 : prev - 1,
    );
  };

  const itemsPerPage = 6;

  const projects: Project[] = [
    {
      id: 1,
      title: "Modern House",
      category: "Private",
      image: "/havia-project-5.jpg",
      location: "Dago, Bandung",
      year: "2023",
      client: "John Doe",
      scope: ["Architecture", "Interior", "Landscape"],
      story: "A contemporary residence blending indoor and outdoor living.",
      images: [
        "/havia-project-5.jpg",
        "/havia-project-2.jpg",
        "/havia-project-3.jpg",
        "/havia-project-4.jpg",
        "/havia-project-1.jpg",
        "/havia-project-3.jpg",
        "/havia-project-6.jpg",
      ],
    },
    {
      id: 2,
      title: "City Clinic",
      category: "Public",
      image: "/havia-project-4.jpg",
      location: "Jakarta",
      year: "2022",
      client: "PT Medika Sehat",
      scope: ["Architecture", "Interior"],
      story: "Designed to create a calm healing environment.",
      images: [
        "/havia-project-4.jpg",
        "/havia-project-1.jpg",
        "/havia-project-3.jpg",
      ],
    },
    {
      id: 3,
      title: "Tropical Villa",
      category: "Private",
      image: "/havia-project-3.jpg",
      location: "Bali",
      year: "2024",
      client: "Jane Smith",
      scope: ["Architecture", "Landscape"],
      story: "A serene retreat in tropical landscape.",
      images: [
        "/havia-project-3.jpg",
        "/havia-project-1.jpg",
        "/havia-project-2.jpg",
      ],
    },
    {
      id: 4,
      title: "Private Residence",
      category: "Private",
      image: "/havia-project-2.jpg",
      location: "Bandung",
      year: "2023",
      client: "Michael Lee",
      scope: ["Architecture", "Interior"],
      story: "A modern home prioritizing comfort.",
      images: ["/havia-project-2.jpg", "/havia-project-2.jpg"],
    },
    {
      id: 5,
      title: "Dental Center",
      category: "Public",
      image: "/havia-project-1.jpg",
      location: "Jakarta",
      year: "2022",
      client: "Smile Dental Clinic",
      scope: ["Architecture", "Interior"],
      story: "Clean and welcoming healthcare space.",
      images: ["/havia-project-1.jpg", "/havia-project-3.jpg"],
    },
    {
      id: 6,
      title: "Urban Retreat",
      category: "Public",
      image: "/havia-project-4.jpg",
      location: "Lembang, Bandung",
      year: "2024",
      client: "CityLife Co.",
      scope: ["Architecture", "Interior", "Landscape"],
      story: "A peaceful oasis within urban environment.",
      images: ["/havia-project-4.jpg", "/havia-project-1.jpg"],
    },
    {
      id: 7,
      title: "Co-working Space",
      category: "Public",
      image: "/havia-project-1.jpg",
      location: "Bandung",
      year: "2024",
      client: "Collab Workspaces",
      scope: ["Architecture", "Interior"],
      story: "Workspace designed for collaboration and productivity.",
      images: ["/havia-project-1.jpg", "/havia-project-2.jpg"],
    },
    {
      id: 8,
      title: "Green Ecotourism",
      category: "Masterplan",
      image: "/havia-project-6.jpg",
      location: "Padang Pariaman",
      year: "2024",
      client: "Collab Workspaces",
      scope: ["Architecture"],
      images: ["/havia-project-6.jpg", "/havia-project-2.jpg"],
    },
  ];

  const categories = ["All", "Private", "Public", "Masterplan"];

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const paginatedProjects = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );
  const getPagination = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    if (currentPage > 3) {
      pages.push("...");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };

  return (
    <section id="portfolio" ref={portfolioRef} className="py-24 bg-havia-white">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Heading */}
        <div className="mb-10 flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-4 mb-2 md:mb-6">
              <div className="h-[1px] w-10 bg-havia-gold" />
              <span className="text-xs uppercase tracking-[0.2em] text-havia-gold font-semibold">
                Portfolio
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-[Helvetica] text-havia-charcoal">
              Selected Works
            </h2>
          </div>

          {/* Tombol Download PDF */}
          <a
            href="/havia-portofolio.pdf"
            download
            className="text-[10px] md:text-xs uppercase tracking-[0.15em] text-white bg-havia-gold px-3 py-1.5 md:px-5 md:py-2 rounded-full hover:opacity-90 transition whitespace-nowrap"
          >
            Download Portfolio
          </a>
        </div>

        {/* Filter */}
        <div className="flex gap-6 md:gap-10 mb-10 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setCurrentPage(1);
              }}
              className={`text-xs uppercase tracking-[0.2em] whitespace-nowrap ${
                activeCategory === cat
                  ? "text-havia-gold border-b border-havia-gold"
                  : "text-havia-charcoal/50 hover:text-[var(--havia-gold)] transition"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-3 gap-8">
          {paginatedProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => {
                setSelectedProject(project);
                setActiveImage(0);
              }}
              className="group cursor-pointer"
            >
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition duration-500 flex items-end p-6">
                  <div className="opacity-0 group-hover:opacity-100 transition duration-500">
                    <p className="text-xs uppercase tracking-[0.1em] text-havia-gold mb-2 font-medium">
                      {project.location}
                    </p>

                    <p className="text-sm text-white/90 line-clamp-1">
                      {project.story}
                    </p>
                  </div>
                </div>
              </div>

              <h3 className="mt-4 text-sm text-havia-charcoal font-medium">
                {project.title}
              </h3>
            </div>
          ))}
        </div>

        {/* Mobile Slider */}
        <div className="md:hidden flex gap-6 overflow-x-auto snap-x">
          {filtered.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="min-w-[80%] snap-center cursor-pointer"
            >
              <div className="relative h-64">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>

              <h3 className="mt-4 text-sm text-havia-charcoal font-medium">
                {project.title}
              </h3>

              <p className="text-xs text-havia-charcoal/60 mt-1">
                {project.location}
              </p>
            </div>
          ))}
        </div>

        {/* Pagination Desktop */}
        {totalPages > 1 && (
          <div className="hidden md:flex justify-center items-center gap-6 mt-16">
            {/* LEFT BUTTON */}
            <button
              onClick={() => {
                if (currentPage > 1) {
                  setCurrentPage(currentPage - 1);
                  portfolioRef.current?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="p-2 border border-havia-charcoal/20 rounded-full hover:border-havia-gold hover:text-[var(--havia-gold)] transition"
            >
              <ChevronLeft size={16} />
            </button>

            {/* PAGE NUMBERS */}
            <div className="flex items-center gap-4">
              {getPagination().map((page, i) =>
                page === "..." ? (
                  <span key={i} className="text-havia-charcoal/40">
                    ...
                  </span>
                ) : (
                  <button
                    key={i}
                    onClick={() => {
                      setCurrentPage(page as number);
                      portfolioRef.current?.scrollIntoView({
                        behavior: "smooth",
                      });
                    }}
                    className={`text-sm ${
                      currentPage === page
                        ? "text-havia-gold"
                        : "text-havia-charcoal/40 hover:text-[var(--havia-gold)]"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}
            </div>

            {/* RIGHT BUTTON */}
            <button
              onClick={() => {
                if (currentPage < totalPages) {
                  setCurrentPage(currentPage + 1);
                  portfolioRef.current?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="p-2 border border-havia-charcoal/20 rounded-full hover:border-havia-gold hover:text-[var(--havia-gold)] transition"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/80 z-50 overflow-y-auto">
          <div className="min-h-screen flex items-start md:items-center justify-center p-4 md:p-10 md:mt-0">
            <div className="bg-white max-w-7xl w-full rounded-sm shadow-xl relative">
              {/* CLOSE BUTTON */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 z-20 p-2 bg-white/90 rounded-full shadow hover:scale-105 transition"
              >
                <X size={20} />
              </button>

              {/* CONTENT */}
              <div className="grid md:grid-cols-2">
                {/* LEFT IMAGE */}
                <div className="bg-havia-offwhite p-4 md:p-6 overflow-hidden">
                  <div className="relative h-[260px] md:h-[520px] w-full mb-4 group">
                    <Image
                      src={selectedProject.images[activeImage]}
                      alt=""
                      fill
                      className="object-cover"
                    />

                    {/* PREVIOUS */}
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
                    >
                      <ChevronLeft size={20} />
                    </button>

                    {/* NEXT */}
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>

                  <div className="flex gap-2 md:gap-3 overflow-x-auto pb-2 pt-1 max-w-full">
                    {selectedProject.images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImage(i)}
                        className={`relative w-20 h-16 flex-shrink-0 border ${
                          activeImage === i
                            ? "border-havia-gold"
                            : "border-transparent"
                        }`}
                      >
                        <Image src={img} alt="" fill className="object-cover" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* RIGHT CONTENT */}
                <div className="p-5 md:p-12 font-[Helvetica]">
                  <div className="flex items-center gap-4 mb-4 md:mb-6">
                    <div className="h-[1px] w-8 bg-havia-gold" />
                    <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-havia-gold font-semibold">
                      Project
                    </span>
                  </div>

                  <h3 className="text-xl md:text-3xl text-havia-charcoal mb-4">
                    {selectedProject.title}
                  </h3>

                  {/* DESCRIPTION */}
                  {selectedProject.story && (
                    <p className="text-sm text-havia-charcoal/80 leading-relaxed mb-6">
                      {selectedProject.story}
                    </p>
                  )}

                  {/* INFO */}
                  <div className="border-t pt-6 grid grid-cols-2 gap-4 md:gap-6 text-sm">
                    {/* LEFT COLUMN */}
                    <div className="space-y-4">
                      <div>
                        <span className="text-havia-charcoal/60 font-semibold">
                          Location
                        </span>
                        <p>{selectedProject.location}</p>
                      </div>

                      <div>
                        <span className="text-havia-charcoal/60 font-semibold">
                          Year
                        </span>
                        <p>{selectedProject.year}</p>
                      </div>

                      {selectedProject.client && (
                        <div>
                          <span className="text-havia-charcoal/60 font-semibold">
                            Client
                          </span>
                          <p>{selectedProject.client}</p>
                        </div>
                      )}
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="space-y-4">
                      {selectedProject.scope && (
                        <div>
                          <span className="text-havia-charcoal/60 font-semibold">
                            Scope of Work
                          </span>
                          <p>{selectedProject.scope.join(", ")}</p>
                        </div>
                      )}

                      <div>
                        <span className="text-havia-charcoal/60 font-semibold">
                          Category
                        </span>
                        <p>{selectedProject.category}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
