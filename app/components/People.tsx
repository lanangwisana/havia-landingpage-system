"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type TeamMember = {
  id: number;
  name: string;
  role: string;
  description?: string;
  image: string;
};

const staticManagement: TeamMember[] = [
  {
    id: 1,
    name: "Jeremy Santoso",
    role: "Principal",
    description:
      "Founder & Principal Architect with over 10 years of experience in residential and commercial design.",
    image: "/havia-team-1.jpg",
  },
];

export default function People({
  cmsData,
  variant = "management",
}: {
  cmsData: any;
  variant?: "management" | "full";
}) {
  const teamMembers: TeamMember[] =
    cmsData?.team_members && cmsData.team_members.length > 0
      ? cmsData.team_members.map((m: any) => ({
          id: m.id,
          name: m.name || "",
          role: m.role || "",
          description: m.description || "",
          image: m.image || "/havia-team-1.jpg",
        }))
      : staticManagement;

  const managementTeam = teamMembers.slice(0, 4);
  const fullTeam = teamMembers;
  const displayedMembers = variant === "management" ? managementTeam : fullTeam;

  const [openBioId, setOpenBioId] = useState<number | null>(null);

  const toggleBio = (id: number) => {
    setOpenBioId(openBioId === id ? null : id);
  };

  return (
    <section id="people" className="py-16 md:py-20 bg-[var(--havia-offwhite)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl font-light tracking-tight text-[var(--havia-charcoal)] mb-4">
            {variant === "management" ? "Our Management" : "Our Team"}
          </h2>
          <div className="w-12 h-[2px] bg-[var(--havia-gold)]/50 mx-auto mt-4" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {displayedMembers.map((member, idx) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group"
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

              <div className="text-left">
                <h3 className="text-sm text-[var(--havia-charcoal)] font-light leading-tight">
                  {member.name}
                </h3>
                <p className="text-[10px] text-[var(--havia-charcoal)]/40 uppercase tracking-wider mt-2">
                  {member.role}
                </p>

                {variant === "management" && member.description && (
                  <button
                    onClick={() => toggleBio(member.id)}
                    className="inline-block mt-6 text-xs text-gray-400 hover:text-[var(--havia-gold)] transition-colors"
                  >
                    {openBioId === member.id
                      ? "Close Biography −"
                      : "View Biography +"}
                  </button>
                )}

                {variant === "management" && member.description && (
                  <AnimatePresence mode="wait">
                    {openBioId === member.id && (
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
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {variant === "management" && (
          <div className="text-center mt-16">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Link
                href="/about"
                className="inline-flex items-center gap-2 border border-[var(--havia-gold)] text-[var(--havia-gold)] px-6 py-3 rounded-full hover:bg-[var(--havia-gold)] hover:text-white transition-all duration-300"
              >
                <span className="text-xs uppercase tracking-wider">
                  View More
                </span>
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                >
                  <ArrowRight size={14} />
                </motion.span>
              </Link>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
