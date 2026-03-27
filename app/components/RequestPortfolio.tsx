"use client";

import { useState, useEffect } from "react";
import { X, Send, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { createPortal } from "react-dom";

export default function RequestPortfolio({ cmsData }: { cmsData?: any }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    interest: "Just exploring your portfolio",
  });

  const downloadText =
    cmsData?.landingpage_portfolio_download_text || "Request Portfolio";

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setIsModalOpen(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="relative w-full">
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full mt-20 mb-20 overflow-hidden bg-[#2c2a29]"
        >
          <div className="relative h-48 md:h-64 w-full overflow-hidden">
            <motion.div
              initial={{ scale: 1.2 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 1.2 }}
              className="absolute inset-0"
            >
              <Image
                src="/havia-project-5.jpg"
                alt="Request Portfolio"
                fill
                className="object-cover opacity-30"
              />
            </motion.div>

            <div className="absolute inset-0 bg-gradient-to-r from-[#2c2a29] via-[#2c2a29]/90 to-transparent" />

            <div className="absolute inset-0 flex flex-col md:flex-row items-start md:items-center justify-between px-6 md:px-20 py-6">
              <div className="max-w-2xl">
                <h3 className="text-lg md:text-3xl text-white font-light mb-2">
                  Interested in our work?
                </h3>
                <p className="text-xs md:text-sm text-white/60">
                  Get our portfolio and let's discuss your vision.
                </p>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="group mt-4 md:mt-0 flex items-center gap-3 px-6 py-3 bg-white hover:bg-[#c69c3d] transition rounded-lg"
              >
                <span className="text-sm text-[#2c2a29] group-hover:text-white">
                  {downloadText}
                </span>
                <ArrowRight className="group-hover:translate-x-1 transition group-hover:text-white" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
      {/* MODAL VIA PORTAL */}
      {mounted &&
        createPortal(
          <>
            <AnimatePresence mode="wait">
              {isModalOpen && (
                <motion.div
                  key="modal"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
                  onClick={(e) => {
                    if (e.target === e.currentTarget) setIsModalOpen(false);
                  }}
                >
                  <motion.div
                    key="modal-content"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="w-full max-w-md relative rounded-lg bg-white"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-[#2c2a29] transition-colors"
                    >
                      <X size={18} />
                    </button>

                    <div className="p-6 md:p-8">
                      <div className="mb-6">
                        <h3 className="text-xl md:text-2xl font-light tracking-tight mb-2 text-[#2c2a29]">
                          {downloadText}
                        </h3>
                        <p className="text-xs md:text-sm text-gray-400">
                          Interested in our work? Let's start a conversation.
                        </p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                          <label className="block text-xs uppercase tracking-wider mb-2 text-[#c69c3d]">
                            Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your name"
                            className="w-full px-0 py-2 border-0 border-b border-gray-200 focus:border-[#c69c3d] focus:ring-0 transition-colors text-sm bg-transparent text-[#2c2a29]"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-xs uppercase tracking-wider mb-2 text-[#c69c3d]">
                            Email or WhatsApp
                          </label>
                          <input
                            type="text"
                            name="contact"
                            value={formData.contact}
                            onChange={handleChange}
                            placeholder="How can we reach you?"
                            className="w-full px-0 py-2 border-0 border-b border-gray-200 focus:border-[#c69c3d] focus:ring-0 transition-colors text-sm bg-transparent text-[#2c2a29]"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-xs uppercase tracking-wider mb-2 text-[#c69c3d]">
                            I am...
                          </label>
                          <select
                            name="interest"
                            value={formData.interest}
                            onChange={handleChange}
                            className="w-full px-0 py-2 border-0 border-b border-gray-200 focus:border-[#c69c3d] focus:ring-0 transition-colors text-sm bg-transparent text-[#2c2a29]"
                          >
                            <option>Just exploring your portfolio</option>
                            <option>Planning a project</option>
                            <option>Looking for collaboration</option>
                            <option>Other</option>
                          </select>
                        </div>

                        <div className="pt-4">
                          <p className="text-xs mb-6 text-gray-400">
                            We'll review your request and get back to you within
                            1-2 business days.
                          </p>
                          <button
                            type="submit"
                            className="w-full py-3 text-sm tracking-wide transition-colors flex items-center justify-center gap-2 group bg-[#2c2a29] hover:bg-[#c69c3d] text-white"
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
                </motion.div>
              )}
            </AnimatePresence>
          </>,
          document.body,
        )}
    </div>
  );
}
