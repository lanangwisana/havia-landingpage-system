// app/about/page.tsx - Halaman About Detail (Masonry Gallery)
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight, X, Undo2 } from "lucide-react";
import Header from "../components/Header";

// Data tim - FOTO DI ATAS, NAMA DI BAWAH
const teamMembers = [
  {
    id: 1,
    name: "Arief Budiman",
    role: "Principal Architect",
    image: "/havia-team-2.jpg",
    description: "Principle of Havia Studio team."
  },
  {
    id: 2,
    name: "Dina Rahmawati",
    role: "Senior Architect",
    image: "/havia-team-1.jpg",
    description: "Part of Havia Studio team."
  },
  {
    id: 3,
    name: "Rizki Ramadhan",
    role: "Project Manager",
    image: "/havia-team-2.jpg",
    description: "Part of Havia Studio team."
  },
  {
    id: 4,
    name: "Maya Sari",
    role: "Interior Designer",
    image: "/havia-team-1.jpg",
    description: "Part of Havia Studio team."
  },
  {
    id: 5,
    name: "Budi Santoso",
    role: "Structural Engineer",
    image: "/havia-team-2.jpg",
    description: "Part of Havia Studio team."
  },
  {
    id: 6,
    name: "Siska Wijaya",
    role: "Architectural Designer",
    image: "/havia-team-1.jpg",
    description: "Part of Havia Studio team."
  },
  {
    id: 7,
    name: "Hendra Kusuma",
    role: "3D Visualizer",
    image: "/havia-team-2.jpg",
    description: "Part of Havia Studio team."
  },
  {
    id: 8,
    name: "Rina Fitriani",
    role: "Landscape Architect",
    image: "/havia-team-1.jpg",
    description: "Part of Havia Studio team."
  },
];

// Data galeri dengan caption
const galleryImages = [
  {
    id: 1,
    src: "/havia-gallery-2.jpg",
    caption:
      "Studio Discussion - Brainstorming design konsep untuk proyek residensial",
    aspect: "video",
  },
  {
    id: 2,
    src: "/havia-gallery-1.jpg",
    caption: "Site Visit - Survey lokasi di Bandung",
    aspect: "square",
  },
  {
    id: 3,
    src: "/havia-gallery-3.jpg",
    caption: "Team Lunch - Celebrating project handover",
    aspect: "portrait",
  },
  {
    id: 4,
    src: "/havia-gallery-3.jpg",
    caption: "Workshop - Material exploration",
    aspect: "video",
  },
  {
    id: 5,
    src: "/havia-gallery-1.jpg",
    caption: "Client Meeting - Presenting design concept",
    aspect: "square",
  },
  {
    id: 6,
    src: "/havia-gallery-2.jpg",
    caption: "Design Review - Weekly studio critique",
    aspect: "portrait",
  },
  {
    id: 7,
    src: "/havia-gallery-2.jpg",
    caption: "Studio Night - Working on competition entry",
    aspect: "video",
  },
  {
    id: 8,
    src: "/havia-gallery-2.jpg",
    caption: "Material Library - New arrivals",
    aspect: "square",
  },
  {
    id: 9,
    src: "/havia-gallery-3.jpg",
    caption: "Coffee Break - Informal chat",
    aspect: "portrait",
  },
  {
    id: 10,
    src: "/havia-gallery-1.jpg",
    caption: "Presentation Day - Final review",
    aspect: "video",
  },
  {
    id: 11,
    src: "/havia-gallery-2.jpg",
    caption: "Studio Pet - Office dog visit",
    aspect: "square",
  },
  {
    id: 12,
    src: "/havia-gallery-3.jpg",
    caption: "Award Ceremony - Best emerging studio",
    aspect: "portrait",
  },
];

// Helper untuk Masonry Layout
const getMasonryClass = (index: number, aspect: string) => {
  // Base class untuk semua gambar
  let classes = "relative overflow-hidden group cursor-pointer";

  // Setiap gambar punya lebar yang sama di grid (col-span-1)
  // Tinggi menyesuaikan aspect ratio masing-masing
  switch (aspect) {
    case "video":
      classes += " aspect-video"; // 16:9 - paling pendek
      break;
    case "portrait":
      classes += " aspect-[3/4]"; // 3:4 - paling tinggi
      break;
    default: // square
      classes += " aspect-square"; // 1:1 - medium
  }

  // Sesekali bikin beberapa gambar lebih lebar untuk variasi (tapi tetap rapi)
  if (index === 3 || index === 8) classes += " md:col-span-2";
  if (index === 5) classes += " lg:col-span-2";

  return classes;
};

export default function AboutDetail() {
  const [selectedMember, setSelectedMember] = useState<
    (typeof teamMembers)[0] | null
  >(null);
  const [memberIndex, setMemberIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<
    (typeof galleryImages)[0] | null
  >(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (image: (typeof galleryImages)[0], index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

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

  // SOLUSI UNTUK FOTO KEPOTONG: Gunakan object-contain dengan background abu-abu
  // atau object-cover dengan posisi yang bisa diatur
  const getImageFitStyle = (index: number) => {
    // Untuk foto tertentu yang penting crop-nya, gunakan object-cover dengan posisi top
    if (index === 0 || index === 2) return "object-cover object-top";
    // Untuk foto lain, object-cover biasa
    return "object-cover";
  };

  const openMember = (member: (typeof teamMembers)[0], index: number) => {
    setSelectedMember(member);
    setMemberIndex(index);
  };

  const nextMember = () => {
    const newIndex = (memberIndex + 1) % teamMembers.length;
    setSelectedMember(teamMembers[newIndex]);
    setMemberIndex(newIndex);
  };

  const prevMember = () => {
    const newIndex =
      (memberIndex - 1 + teamMembers.length) % teamMembers.length;
    setSelectedMember(teamMembers[newIndex]);
    setMemberIndex(newIndex);
  };

  return (
    <main className="min-h-screen bg-[#f2f1f0] pt-20">
      <Header />

      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <Link
          href="/#about"
          className="inline-flex items-center gap-1 text-[12px] text-[#2c2a29]/20 hover:text-[#c69c3d] transition-colors mb-4"
        >
          <Undo2 size={18} />
          Back to home
        </Link>
      </div>

      <section className="max-w-7xl mx-auto px-6 md:px-8 pt-12 md:pt-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* TEXT */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-[#2c2a29]">
                About
              </h2>
              <div className="w-12 h-[2px] bg-[#c69c3d]/50 mt-3" />
            </motion.div>

            <p className="text-sm text-[#2c2a29]/60 leading-relaxed text-justify">
              Havia Studio adalah studio arsitektur yang berfokus pada
              kolaborasi, eksplorasi material, dan hubungan antara ruang dan
              lingkungan. Setiap proyek adalah dialog antara fungsi dan emosi.
            </p>
          </div>

          {/* IMAGE */}
          <div className="relative aspect-[5/2] overflow-hidden">
            <Image
              src="/havia-photo-1.png"
              alt="Havia Studio"
              fill
              className="object-cover grayscale hover:grayscale-0 transition duration-700"
            />
          </div>
        </div>
      </section>

      {/* OUR TEAM SECTION - FOTO DI ATAS, NAMA DI BAWAH */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-[#2c2a29]">
            Our Team
          </h2>
          <div className="w-12 h-[2px] bg-[#c69c3d]/50 mt-3" />
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group"
              onClick={() => openMember(member, index)}
            >
              {/* IMAGE - hidden by default */}
              <div className="overflow-hidden transition-all duration-500 max-h-0 group-hover:max-h-[300px] mb-0 group-hover:mb-3">
                <div className="relative aspect-square bg-[#2c2a29]/5">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover grayscale contrast-75 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-700"
                  />
                </div>
              </div>

              {/* TEXT AREA (trigger hover) */}
              <div className="cursor-default">
                <h3 className="text-sm text-[#2c2a29] font-light leading-tight">
                  {member.name}
                </h3>
                <p className="text-[10px] text-[#2c2a29]/40 uppercase tracking-wider mt-0.5">
                  {member.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {selectedMember && (
        <div
          className="fixed inset-0 z-50 bg-[#2c2a29]/95 flex items-center justify-center"
          onClick={() => setSelectedMember(null)}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-50 w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
          >
            <X size={18} />
          </button>

          {/* Previous button */}
          <button
            onClick={(e) => {
             e.stopPropagation();
              nextMember();
            }}
            className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-50 w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Next button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextMember();
            }}
            className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-50 w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
          >
            <ChevronRight size={18} />
          </button>

          {/* CONTENT */}
          <div
            className="max-w-3xl w-full grid md:grid-cols-2 gap-6 items-center px-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-square">
              <Image
                src={selectedMember.image}
                alt={selectedMember.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="text-white">
              <h3 className="text-2xl font-light mb-2">
                {selectedMember.name}
              </h3>
              <p className="text-xs uppercase tracking-wider text-white/50 mb-4">
                {selectedMember.role}
              </p>

              <p className="text-sm text-white/70">
                {selectedMember.description}
              </p>

              <p className="text-xs text-white/40 mt-6">
                {memberIndex + 1} / {teamMembers.length}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="h-[1px] bg-[#2c2a29]/10" />
      </div>

      {/* LIFE AT HAVIA / GALLERY SECTION - MASONRY LAYOUT */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-[#2c2a29]">
            Life at Havia
          </h2>
          <div className="w-12 h-[2px] bg-[#c69c3d]/50 mt-3" />
        </motion.div>

        {/* MASONRY GRID - columns layout yang rapi */}
        <div className="max-w-5xl mx-auto columns-2 md:columns-3 lg:columns-4 gap-8 space-y-8">
          {galleryImages.map((img, index) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.03 }}
              className="break-inside-avoid cursor-pointer group"
              onClick={() => openLightbox(img, index)}
            >
              <div className="relative overflow-hidden bg-[#2c2a29]/5">
                <Image
                  src={img.src}
                  alt={img.caption}
                  width={500}
                  height={500}
                  className="object-cover grayscale contrast-75 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-700"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* LIGHTBOX GALLERY - dengan next/previous dan caption */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-[#2c2a29]/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-50 w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
          >
            <X size={18} />
          </button>

          {/* Previous button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-50 w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Next button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-50 w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
          >
            <ChevronRight size={18} />
          </button>

          {/* Image container */}
          <div className="relative w-full h-full max-w-6xl max-h-[85vh] mx-auto p-4">
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={selectedImage.src}
                alt={selectedImage.caption}
                width={1200}
                height={800}
                className="object-contain max-h-full max-w-full"
                priority
              />
            </div>

            {/* Caption - di bawah gambar */}
            <div className="absolute bottom-0 left-0 right-0 text-center p-6 bg-gradient-to-t from-black/80 to-transparent">
              <p className="text-white text-sm max-w-2xl mx-auto">
                {selectedImage.caption}
              </p>
              <p className="text-white/40 text-xs mt-2">
                {currentIndex + 1} / {galleryImages.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
