// app/about/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Undo2 } from "lucide-react";
import Header from "../components/Header";

// Data tim
const teamMembers = [
  {
    id: 1,
    name: "Arief Budiman",
    role: "Principal Architect",
    image: "/havia-team-2.jpg",
    description: "Principle of Havia Studio team.",
  },
  {
    id: 2,
    name: "Dina Rahmawati",
    role: "Senior Architect",
    image: "/havia-team-1.jpg",
    description: "Part of Havia Studio team.",
  },
  {
    id: 3,
    name: "Rizki Ramadhan",
    role: "Project Manager",
    image: "/havia-team-2.jpg",
    description: "Part of Havia Studio team.",
  },
  {
    id: 4,
    name: "Maya Sari",
    role: "Interior Designer",
    image: "/havia-team-1.jpg",
    description: "Part of Havia Studio team.",
  },
  {
    id: 5,
    name: "Budi Santoso",
    role: "Structural Engineer",
    image: "/havia-team-2.jpg",
    description: "Part of Havia Studio team.",
  },
  {
    id: 6,
    name: "Siska Wijaya",
    role: "Architectural Designer",
    image: "/havia-team-1.jpg",
    description: "Part of Havia Studio team.",
  },
  {
    id: 7,
    name: "Hendra Kusuma",
    role: "3D Visualizer",
    image: "/havia-team-2.jpg",
    description: "Part of Havia Studio team.",
  },
  {
    id: 8,
    name: "Rina Fitriani",
    role: "Landscape Architect",
    image: "/havia-team-1.jpg",
    description: "Part of Havia Studio team.",
  },
];

// Data galeri
const galleryImages = [
  {
    id: 1,
    src: "/havia-gallery-2.jpg",
    caption: "Studio Discussion - Brainstorming design konsep untuk proyek residensial",
  },
  {
    id: 2,
    src: "/havia-gallery-1.jpg",
    caption: "Site Visit - Survey lokasi di Bandung",
  },
  {
    id: 3,
    src: "/havia-gallery-3.jpg",
    caption: "Team Lunch - Celebrating project handover",
  },
  {
    id: 4,
    src: "/havia-gallery-3.jpg",
    caption: "Workshop - Material exploration",
  },
  {
    id: 5,
    src: "/havia-gallery-1.jpg",
    caption: "Client Meeting - Presenting design concept",
  },
  {
    id: 6,
    src: "/havia-gallery-2.jpg",
    caption: "Design Review - Weekly studio critique",
  },
  {
    id: 7,
    src: "/havia-gallery-2.jpg",
    caption: "Studio Night - Working on competition entry",
  },
  {
    id: 8,
    src: "/havia-gallery-2.jpg",
    caption: "Material Library - New arrivals",
  },
  {
    id: 9,
    src: "/havia-gallery-3.jpg",
    caption: "Coffee Break - Informal chat",
  },
  {
    id: 10,
    src: "/havia-gallery-1.jpg",
    caption: "Presentation Day - Final review",
  },
  {
    id: 11,
    src: "/havia-gallery-2.jpg",
    caption: "Studio Pet - Office dog visit",
  },
  {
    id: 12,
    src: "/havia-gallery-3.jpg",
    caption: "Award Ceremony - Best emerging studio",
  },
];

export default function AboutDetail() {
  const [selectedMember, setSelectedMember] = useState<(typeof teamMembers)[0] | null>(null);
  const [memberIndex, setMemberIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<(typeof galleryImages)[0] | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (image: (typeof galleryImages)[0], index: number) => {
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
    const newIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    setSelectedImage(galleryImages[newIndex]);
    setCurrentIndex(newIndex);
  };

  const openMember = (member: (typeof teamMembers)[0], index: number) => {
    setSelectedMember(member);
    setMemberIndex(index);
  };

  const closeMember = () => setSelectedMember(null);

  const nextMember = () => {
    const newIndex = (memberIndex + 1) % teamMembers.length;
    setSelectedMember(teamMembers[newIndex]);
    setMemberIndex(newIndex);
  };

  const prevMember = () => {
    const newIndex = (memberIndex - 1 + teamMembers.length) % teamMembers.length;
    setSelectedMember(teamMembers[newIndex]);
    setMemberIndex(newIndex);
  };

  return (
    <main className="min-h-screen bg-[var(--havia-offwhite)] pt-20 font-sans">
      <Header />

      {/* Back link */}
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <Link
          href="/#about"
          className="inline-flex items-center gap-2 text-sm text-[var(--havia-charcoal)]/60 hover:text-[var(--havia-gold)] transition-colors mb-4 group"
        >
          <Undo2 size={16} className="group-hover:-translate-x-0.5 transition-transform" />
          <span className="border-b border-transparent group-hover:border-[var(--havia-gold)] transition-colors pb-0.5">Back to home</span>
        </Link>
      </div>

      {/* About Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 pt-12 md:pt-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-[var(--havia-charcoal)]">
                About
              </h2>
              <div className="w-12 h-[2px] bg-[var(--havia-gold)]/50 mt-3" />
            </motion.div>
            <p className="text-sm text-[var(--havia-charcoal)]/60 leading-relaxed text-justify">
              Havia Studio adalah studio arsitektur yang berfokus pada kolaborasi, eksplorasi
              material, dan hubungan antara ruang dan lingkungan. Setiap proyek adalah dialog
              antara fungsi dan emosi.
            </p>
          </div>
          <div className="relative aspect-[5/2] overflow-hidden">
            <Image
              src="/havia-photo-1.png"
              alt="Havia Studio"
              fill
              className="object-cover transition duration-700"
            />
          </div>
        </div>
      </section>

      {/* Team Section */}
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group cursor-pointer"
              onClick={() => openMember(member, index)}
            >
              <div className="relative aspect-square overflow-hidden bg-[var(--havia-charcoal)]/5 mb-3">
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
            </motion.div>
          ))}
        </div>
        </div>
      </section>

      {/* Member Lightbox */}
      {selectedMember && (
        <div
          className="fixed inset-0 z-50 bg-[var(--havia-charcoal)]/95 flex items-center justify-center"
          onClick={closeMember}
        >
          <button
            onClick={closeMember}
            className="absolute top-6 right-6 z-50 w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
          >
            <X size={18} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevMember();
            }}
            className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-50 w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextMember();
            }}
            className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-50 w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
          >
            <ChevronRight size={18} />
          </button>
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
              <h3 className="text-2xl font-light mb-2">{selectedMember.name}</h3>
              <p className="text-xs uppercase tracking-wider text-white/50 mb-4">
                {selectedMember.role}
              </p>
              <p className="text-sm text-white/70">{selectedMember.description}</p>
              <p className="text-xs text-white/40 mt-6">
                {memberIndex + 1} / {teamMembers.length}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Life at Havia Gallery */}
      <section className="bg-[var(--havia-cream)]/40 py-16 md:py-24">
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

        {/* Grid layout – stabil dan responsif */}
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
                  alt={img.caption}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-105"
                />
              </div>
              {/* Caption hanya tampil di mobile (opsional) */}
              <p className="text-xs text-[var(--havia-charcoal)]/60 mt-2 md:hidden">
                {img.caption}
              </p>
            </motion.div>
          ))}
        </div>
        </div>
      </section>

      {/* Gallery Lightbox – Caption langsung di bawah gambar */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-[var(--havia-charcoal)]/95 flex items-center justify-center p-4"
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
            className="relative max-w-5xl w-full mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative flex justify-center items-center">
              <Image
                src={selectedImage.src}
                alt={selectedImage.caption}
                width={1200}
                height={800}
                className="object-contain max-h-[85vh] w-auto h-auto"
                priority
              />
            </div>
            <div className="mt-4 text-center px-4 py-3 bg-black/60 backdrop-blur-sm rounded-lg">
              <p className="text-white text-sm">{selectedImage.caption}</p>
              <p className="text-white/40 text-xs mt-1">
                {currentIndex + 1} / {galleryImages.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}