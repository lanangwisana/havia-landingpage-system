"use client";

import { useEffect, useState, useRef } from "react";
import { MessageCircle, ArrowUpFromLine } from "lucide-react";

export default function WhatsappCTA({ cmsData }: { cmsData: any }) {
  let phone = cmsData?.landingpage_whatsapp_phone || "628112430121";
  const label = cmsData?.landingpage_whatsapp_label || "Chat WhatsApp";
  const message = cmsData?.landingpage_whatsapp_message || "";

  // Normalize phone (remove non-digits and replace leading 0 with 62)
  phone = phone.replace(/[^0-9]/g, "");
  if (phone.startsWith("0")) {
    phone = "62" + phone.substring(1);
  }

  const waUrl = message
    ? `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
    : `https://wa.me/${phone}`;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const body = document.body;
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          const isOpen = body.classList.contains("modal-open");
          setModalOpen(isOpen);
        }
      });
    });

    observer.observe(body, { attributes: true });

    setModalOpen(body.classList.contains("modal-open"));

    return () => observer.disconnect();
  }, []);

  const [isIdle, setIsIdle] = useState(false);
  const idleTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsIdle(false);

      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
      idleTimeoutRef.current = setTimeout(() => {
        setIsIdle(true);
      }, 2000); 
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
    };
  }, []);

  const visible = !modalOpen && !isIdle;

  if (!visible) return null;

  return (
    <>
      {/* Back to Top Button */}
      <div className="fixed bottom-20 right-6 z-50 group">
        <button
          onClick={scrollToTop}
          className="
            relative
            flex items-center justify-center
            w-12 h-12
            rounded-full
            bg-white/80 backdrop-blur-sm
            text-gray-700
            shadow-[0_4px_12px_rgba(0,0,0,0.15)]
            hover:scale-105 hover:bg-white
            transition-all duration-300
          "
        >
          <ArrowUpFromLine size={20} />
        </button>
        <span
          className="
            absolute right-full mr-3
            top-1/2 -translate-y-1/2
            whitespace-nowrap
            bg-gray-900 text-white text-sm
            px-3 py-1.5 rounded-full
            opacity-0 group-hover:opacity-100
            pointer-events-none
            transition-opacity duration-200
            shadow-md
          "
        >
          Back to top
        </span>
      </div>

      {/* WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50 group">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="
            relative
            flex items-center justify-center
            w-12 h-12
            rounded-full
            bg-havia-gold
            text-white
            shadow-[0_10px_30px_rgba(0,0,0,0.3)]
            hover:scale-105
            transition-all duration-300
          "
        >
          <MessageCircle size={20} />
        </a>
        <span
          className="
            absolute right-full mr-3
            top-1/2 -translate-y-1/2
            whitespace-nowrap
            bg-gray-900 text-white text-sm
            px-3 py-1.5 rounded-full
            opacity-0 group-hover:opacity-100
            pointer-events-none
            transition-opacity duration-200
            shadow-md
          "
        >
          {label}
        </span>
      </div>
    </>
  );
}