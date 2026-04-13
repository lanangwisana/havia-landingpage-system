"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Undo2 } from "lucide-react";
import Header from "../components/Header";

type TeamMember = {
  id: number;
  name: string;
  role: string;
  image: string;
  description?: string;
};

type GalleryImage = {
  id: number;
  src: string;
  description?: string;
};

// Static fallback data
const staticTeamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Arief Budiman",
    role: "Principal Architect",
    image: "/havia-team-2.jpg",
    description:
      "Principle of Havia Studio team with over 15 years experience.",
  },
  {
    id: 2,
    name: "Dina Rahmawati",
    role: "Senior Architect",
    image: "/havia-team-1.jpg",
    description: "Passionate about sustainable design and community spaces.",
  },
  {
    id: 3,
    name: "Rizki Ramadhan",
    role: "Project Manager",
    image: "/havia-team-2.jpg",
    description: "Ensures every project runs smoothly on time and budget.",
  },
  {
    id: 4,
    name: "Maya Sari",
    role: "Interior Designer",
    image: "/havia-team-1.jpg",
    description: "Creates warm and functional interior experiences.",
  },
  {
    id: 5,
    name: "Budi Santoso",
    role: "Structural Engineer",
    image: "/havia-team-2.jpg",
    description: "Expert in earthquake-resistant structures.",
  },
  {
    id: 6,
    name: "Siska Wijaya",
    role: "Architectural Designer",
    image: "/havia-team-1.jpg",
    description: "Brings innovative concepts into reality.",
  },
  {
    id: 7,
    name: "Hendra Kusuma",
    role: "3D Visualizer",
    image: "/havia-team-2.jpg",
    description: "Creates stunning visualizations and walkthroughs.",
  },
  {
    id: 8,
    name: "Rina Fitriani",
    role: "Landscape Architect",
    image: "/havia-team-1.jpg",
    description: "Designs harmonious outdoor spaces.",
  },
];

const staticGalleryImages: GalleryImage[] = [
  {
    id: 1,
    src: "/havia-gallery-2.jpg",
    description:
      "Studio Discussion - Brainstorming design konsep untuk proyek residensial",
  },
  {
    id: 2,
    src: "/havia-gallery-1.jpg",
    description: "Site Visit - Survey lokasi di Bandung",
  },
  {
    id: 3,
    src: "/havia-gallery-3.jpg",
    description: "Team Lunch - Celebrating project handover",
  },
  {
    id: 4,
    src: "/havia-gallery-3.jpg",
    description: "Workshop - Material exploration",
  },
  {
    id: 5,
    src: "/havia-gallery-1.jpg",
    description: "Client Meeting - Presenting design concept",
  },
  {
    id: 6,
    src: "/havia-gallery-2.jpg",
    description: "Design Review - Weekly studio critique",
  },
  {
    id: 7,
    src: "/havia-gallery-2.jpg",
    description: "Studio Night - Working on competition entry",
  },
  {
    id: 8,
    src: "/havia-gallery-2.jpg",
    description: "Material Library - New arrivals",
  },
  {
    id: 9,
    src: "/havia-gallery-3.jpg",
    description: "Coffee Break - Informal chat",
  },
  {
    id: 10,
    src: "/havia-gallery-1.jpg",
    description: "Presentation Day - Final review",
  },
  {
    id: 11,
    src: "/havia-gallery-2.jpg",
    description: "Studio Pet - Office dog visit",
  },
  {
    id: 12,
    src: "/havia-gallery-3.jpg",
    description: "Award Ceremony - Best emerging studio",
  },
];

export default function AboutDetail({ cmsData }: { cmsData?: any }) {
  const teamMembers: TeamMember[] =
    cmsData?.team_members && cmsData.team_members.length > 0
      ? cmsData.team_members.map((m: any) => ({
          id: m.id,
          name: m.name || "",
          role: m.role || "",
          description: m.description || "",
          image: m.image || "/havia-team-1.jpg",
        }))
      : staticTeamMembers;

  const galleryImages: GalleryImage[] =
    cmsData?.gallery_images && cmsData.gallery_images.length > 0
      ? cmsData.gallery_images.map((g: any) => ({
          id: g.id,
          src: g.src || "/havia-gallery-1.jpg",
          description: g.description,
        }))
      : staticGalleryImages;

  // State untuk toggle deskripsi per member (gunakan id sebagai key)
  const [openBioId, setOpenBioId] = useState<number | null>(null);

  const toggleBio = (id: number) => {
    setOpenBioId(openBioId === id ? null : id);
  };

  // State untuk gallery lightbox
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const openLightbox = (image: GalleryImage, index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeLightbox = () => setSelectedImage(null);

  const nextImage = () => {
    const newIndex = (currentIndex + 1) % galleryImages.length;
    setSelectedImage(galleryImages[newIndex]);
    setCurrentIndex(newIndex);
  };

  const prevImage = () => {
    const newIndex =
      (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    setSelectedImage(galleryImages[newIndex]);
    setCurrentIndex(newIndex);
  };

  return (
    <main className="min-h-screen bg-[var(--havia-offwhite)] pt-20 font-sans">
      <Header />
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <Link
          href="/#about"
          className="inline-flex items-center gap-2 text-sm text-[var(--havia-charcoal)]/60 hover:text-[var(--havia-gold)] transition-colors mb-4 group"
        >
          <Undo2
            size={16}
            className="group-hover:-translate-x-0.5 transition-transform"
          />
          <span className="border-b border-transparent group-hover:border-[var(--havia-gold)] transition-colors pb-0.5">
            Back to home
          </span>
        </Link>
      </div>

      <section className="bg-[#eae7e2] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-[var(--havia-charcoal)]">
              Our Team
            </h2>
            <div className="w-12 h-[2px] bg-[var(--havia-gold)]/50 mt-3" />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group"
              >
                <div className="relative aspect-square overflow-hidden bg-[var(--havia-charcoal)]/5 mb-3 cursor-pointer">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                </div>

                <div>
                  <h3 className="text-sm text-[var(--havia-charcoal)] font-light leading-tight">
                    {member.name}
                  </h3>
                  <p className="text-[10px] text-[var(--havia-charcoal)]/40 uppercase tracking-wider mt-0.5">
                    {member.role}
                  </p>
                </div>

                {member.description && (
                  <button
                    onClick={() => toggleBio(member.id)}
                    className="inline-block mt-2 text-xs text-gray-400 hover:text-[var(--havia-gold)] transition-colors"
                  >
                    {openBioId === member.id
                      ? "Close Biography −"
                      : "View Biography +"}
                  </button>
                )}

                <AnimatePresence mode="wait">
                  {openBioId === member.id && member.description && (
                    <motion.p
                      initial={{ opacity: 0, height: 0, y: -5 }}
                      animate={{ opacity: 1, height: "auto", y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -5 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="text-xs text-gray-500 mt-2 leading-relaxed overflow-hidden"
                    >
                      {member.description}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Life at Havia Gallery */}
      <section className="bg-[var(--havia-offwhite)] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-[var(--havia-charcoal)]">
              Life at Havia
            </h2>
            <div className="w-12 h-[2px] bg-[var(--havia-gold)]/50 mt-3" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {galleryImages.map((img, index) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.03 }}
                className="cursor-pointer group"
                onClick={() => openLightbox(img, index)}
              >
                <div className="relative overflow-hidden bg-[var(--havia-charcoal)]/5 aspect-[4/3]">
                  <Image
                    src={img.src}
                    alt={`Gallery image ${index + 1}`}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-105"
                  />
                  {/* Overlay to prevent direct image right-click actions */}
                  <div className="absolute inset-0 z-10" />
                </div>
                {img.description ? (
                  <p className="text-sm font-light text-[var(--havia-charcoal)]/80 mt-3 md:mt-4 leading-relaxed line-clamp-2">
                    {img.description}
                  </p>
                ) : (
                  <p className="text-xs text-[var(--havia-charcoal)]/60 mt-2 md:hidden">
                    Image {index + 1}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Lightbox (tidak berubah) */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-50 w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
          >
            <X size={18} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-50 w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-50 w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
          >
            <ChevronRight size={18} />
          </button>

          <div
            className="relative max-w-6xl w-full mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative flex justify-center items-center">
              <Image
                src={selectedImage.src}
                alt={`Gallery image ${currentIndex + 1}`}
                width={1200}
                height={800}
                className="object-contain max-h-[80vh] w-auto h-auto"
                priority
              />
              {/* Overlay for lightbox image */}
              <div className="absolute inset-0 z-10" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6 rounded-b-lg">
              <p className="text-white text-sm md:text-base text-center max-w-3xl mx-auto leading-relaxed">
                {selectedImage.description || `Image ${currentIndex + 1}`}
              </p>
              <p className="text-white/50 text-xs text-center mt-2">
                {currentIndex + 1} / {galleryImages.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}