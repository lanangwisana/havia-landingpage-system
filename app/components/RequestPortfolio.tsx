// components/RequestPortfolio.tsx
"use client";

import { useState } from "react";
import { X, Send, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

interface RequestPortfolioProps {
  cmsData?: any;
}

export default function RequestPortfolio({ cmsData }: RequestPortfolioProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    interest: "Just exploring your portfolio",
  });

  const downloadText = cmsData?.landingpage_portfolio_download_text || "Request Portfolio";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    setIsModalOpen(false);
    // Reset form
    setFormData({
      name: "",
      contact: "",
      interest: "Just exploring your portfolio",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      {/* Banner Request Portfolio */}
          <div className="flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-6xl mt-16 bg-[#2c2a29] rounded-lg overflow-hidden group cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="relative h-32 md:h-36 w-full">
          {/* Background Image dengan overlay */}
          <Image
            src="/havia-project-5.jpg"
            alt="Request Portfolio"
            fill
            className="object-cover opacity-30 group-hover:scale-105 transition-transform duration-700"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#2c2a29] via-[#2c2a29]/80 to-transparent" />

          {/* Content */}
          <div className="absolute inset-0 flex items-center justify-between px-6 md:px-12">
            <div className="max-w-2xl">
              <h3 className="text-lg md:text-2xl text-white font-light tracking-tight mb-1 md:mb-2">
                Interested in our work?
              </h3>
              <p className="text-xs md:text-sm text-white/60">
                Get our portfolio and let's discuss your vision.
              </p>
            </div>

            {/* Desktop button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(true);
              }}
              className="hidden md:inline-flex group/btn relative items-center gap-3 px-6 py-3 bg-white hover:bg-[#c69c3d] transition-all duration-300 rounded-lg"
            >
              <span className="text-sm text-[#2c2a29] group-hover/btn:text-white transition-colors">
                {downloadText}
              </span>
              <ArrowRight
                size={16}
                className="text-[#2c2a29] group-hover/btn:text-white group-hover/btn:translate-x-1 transition-all"
              />
            </button>

            {/* Mobile text link - tanpa background button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(true);
              }}
              className="md:hidden group/btn relative flex items-center gap-2"
            >
              <span className="text-sm text-[#c69c3d] hover:text-white transition-colors border-b border-[#c69c3d] pb-0.5">
                {downloadText}
              </span>
              <ArrowRight
                size={14}
                className="text-[#c69c3d] group-hover/btn:translate-x-1 transition-transform"
              />
            </button>
          </div>
        </div>
      </motion.div>
      </div>

      {/* Modal Request Portfolio */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-md relative rounded-lg"
            style={{ backgroundColor: "#ffffff" }}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center transition-colors"
              style={{ color: "#9ca3af" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#2c2a29")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#9ca3af")}
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <div className="p-8">
              <div className="mb-6">
                <h3
                  className="text-2xl font-light tracking-tight mb-2"
                  style={{ color: "#2c2a29" }}
                >
                  {downloadText}
                </h3>
                <p className="text-sm" style={{ color: "#9ca3af" }}>
                  Interested in our work? Let's start a conversation.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    className="block text-xs uppercase tracking-wider mb-2"
                    style={{ color: "#c69c3d" }}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full px-0 py-2 border-0 border-b focus:ring-0 transition-colors text-sm bg-transparent"
                    style={{
                      borderColor: "#e5e7eb",
                      color: "#2c2a29",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#c69c3d")}
                    onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                    required
                  />
                </div>

                <div>
                  <label
                    className="block text-xs uppercase tracking-wider mb-2"
                    style={{ color: "#c69c3d" }}
                  >
                    Email or WhatsApp
                  </label>
                  <input
                    type="text"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    placeholder="How can we reach you?"
                    className="w-full px-0 py-2 border-0 border-b focus:ring-0 transition-colors text-sm bg-transparent"
                    style={{
                      borderColor: "#e5e7eb",
                      color: "#2c2a29",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#c69c3d")}
                    onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                    required
                  />
                </div>

                <div>
                  <label
                    className="block text-xs uppercase tracking-wider mb-2"
                    style={{ color: "#c69c3d" }}
                  >
                    I am...
                  </label>
                  <select
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    className="w-full px-0 py-2 border-0 border-b focus:ring-0 transition-colors text-sm bg-transparent"
                    style={{
                      borderColor: "#e5e7eb",
                      color: "#2c2a29",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#c69c3d")}
                    onBlur={(e) => (e.target.style.borderColor = "#e5e7eb")}
                  >
                    <option>Just exploring your portfolio</option>
                    <option>Planning a project</option>
                    <option>Looking for collaboration</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="pt-4">
                  <p className="text-xs mb-6" style={{ color: "#9ca3af" }}>
                    We'll review your request and get back to you within 1-2
                    business days.
                  </p>

                  <button
                    type="submit"
                    className="w-full py-3 text-sm tracking-wide transition-colors flex items-center justify-center gap-2 group"
                    style={{
                      backgroundColor: "#2c2a29",
                      color: "#ffffff",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#c69c3d";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#2c2a29";
                    }}
                  >
                    <span>Send Request</span>
                    <Send
                      size={14}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}