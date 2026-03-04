"use client";

import { useState } from "react";
import Image from "next/image";

type Project = {
  id: number;
  title: string;
  category: string;
  image: string;
  location: string;
  story: string;
};

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const projects: Project[] = [
    {
      id: 1,
      title: "Modern House",
      category: "Residential",
      image: "/havia-project-1.jpg",
      location: "Dago, Bandung",
      story: "A contemporary residence blending indoor and outdoor living.",
    },
    {
      id: 2,
      title: "City Clinic",
      category: "Healthcare",
      image: "/havia-project-2.jpg",
      location: "Lenteng Agung, Jakarta",
      story:
        "Designed to create a calm healing environment through spatial clarity.",
    },
    {
      id: 3,
      title: "Tropical Villa",
      category: "Residential",
      image: "/havia-project-3.jpg",
      location: "Bali",
      story: "A serene retreat that harmonizes with its lush surroundings.",
    },
    {
      id: 4,
      title: "Private Residence",
      category: "Residential",
      image: "/havia-project-1.jpg",
      location: "Buah Batu, Bandung",
      story: "A modern home that prioritizes comfort and functionality.",
    },
    {
      id: 5,
      title: "Dental Center",
      category: "Healthcare",
      image: "/havia-project-2.jpg",
      location: "Jakarta",
      story: "A clean and welcoming space designed for patient care.",
    },
    {
      id: 6,
      title: "Urban Retreat",
      category: "Commercial",
      image: "/havia-project-3.jpg",
      location: "Lembang, Bandung",
      story: "A peaceful oasis in the heart of the city.",
    },
    {
      id: 7,
      title: "Co-working Space",
      category: "Commercial",
      image: "/havia-project-1.jpg",
      location: "Bandung",
      story:
        "A modern workspace designed to foster collaboration and creativity.",
    },
  ];

  const categories = ["All", "Residential", "Healthcare", "Commercial"];

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedProjects = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <section id="portfolio" className="py-20 bg-havia-white">
      <div className="max-w-7xl mx-auto px-8">
        {/* Heading */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[1px] w-10 bg-havia-gold" />
            <span className="text-xs tracking-[0.2em] uppercase text-havia-gold font-semibold">
              Portfolio
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-[Helvetica] text-havia-charcoal">
            Selected Works
          </h2>
        </div>

        {/* Filter */}
        <div className="flex gap-10 mb-14">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setCurrentPage(1);
              }}
              className={`text-xs uppercase tracking-[0.2em] transition ${
                activeCategory === cat
                  ? "text-havia-charcoal border-b border-havia-charcoal"
                  : "text-havia-charcoal/50 hover:text-[var(--havia-gold)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {paginatedProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer"
            >
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition duration-500 flex flex-col justify-end p-6">
                  <div className="opacity-0 group-hover:opacity-100 transition duration-500">
                    <p className="text-xs uppercase tracking-[0.1em] text-havia-gold mb-2 font-medium">
                      {project.location}
                    </p>

                    <p className="text-sm text-white/90 leading-relaxed mb-3">
                      {project.story}
                    </p>
                  </div>
                </div>
              </div>

              {/* Title */}
              <h3 className="mt-4 text-sm tracking-wide text-havia-charcoal font-medium">
                {project.title}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
          onClick={() => setSelectedProject(null)}
        >
          <div className="relative max-w-5xl w-full px-8">
            <Image
              src={selectedProject.image}
              alt={selectedProject.title}
              width={1400}
              height={900}
              className="w-full h-auto object-contain"
            />

            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-8 text-white text-xs uppercase tracking-[0.3em]"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-6 mt-16">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            className="text-xs uppercase tracking-[0.2em] text-havia-charcoal/50 hover:text-[var(--havia-gold)] transition"
          >
            Prev
          </button>

          <span className="text-xs tracking-[0.2em] text-havia-charcoal">
            {currentPage} / {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            className="text-xs uppercase tracking-[0.2em] text-havia-charcoal/50 hover:text-[var(--havia-gold)] transition"
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
}
