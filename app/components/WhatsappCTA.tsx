"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsappCTA() {
  return (
    <a
      href="https://wa.me/628112430121" // ganti nomor kamu
      target="_blank"
      rel="noopener noreferrer"
      className="
        fixed bottom-6 right-6 z-50
        flex items-center gap-3
        px-5 py-3
        rounded-full
        bg-havia-gold
        text-white
        shadow-[0_10px_30px_rgba(0,0,0,0.3)]
        hover:scale-105
        transition-all duration-300
      "
    >
      <MessageCircle size={20} />
      <span className="text-sm font-medium hidden sm:inline">
        Chat WhatsApp
      </span>

      {/* Pulse effect */}
      <span className="absolute inset-0 rounded-full animate-ping bg-havia-gold opacity-20"></span>
    </a>
  );
}