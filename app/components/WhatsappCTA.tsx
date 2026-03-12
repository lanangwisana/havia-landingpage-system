"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsappCTA({ cmsData }: { cmsData: any }) {
  const phone = cmsData?.landingpage_whatsapp_phone || "628112430121";
  const label = cmsData?.landingpage_whatsapp_label || "Chat WhatsApp";
  const message = cmsData?.landingpage_whatsapp_message || "";

  const waUrl = message
    ? `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
    : `https://wa.me/${phone}`;

  return (
    <a
      href={waUrl}
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
        {label}
      </span>

      {/* Pulse effect */}
      <span className="absolute inset-0 rounded-full animate-ping bg-havia-gold opacity-20"></span>
    </a>
  );
}