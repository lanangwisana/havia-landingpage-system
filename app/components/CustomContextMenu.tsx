"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Lock, 
  ExternalLink, 
  MessageCircle, 
  User, 
  Grid 
} from "lucide-react";

type ContextMenuProps = {
  x: number;
  y: number;
  onClose: () => void;
};

export default function CustomContextMenu({ x, y, onClose }: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [adjustedPos, setAdjustedPos] = useState({ x, y });

  // Adjust position if too close to screen edges
  useEffect(() => {
    if (menuRef.current) {
      const { innerWidth, innerHeight } = window;
      const { offsetWidth, offsetHeight } = menuRef.current;
      
      let newX = x;
      let newY = y;

      if (x + offsetWidth > innerWidth) newX = x - offsetWidth;
      if (y + offsetHeight > innerHeight) newY = y - offsetHeight;

      setAdjustedPos({ x: newX, y: newY });
    }
  }, [x, y]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    
    const handleScroll = () => onClose();
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  const menuItems = [
    {
      label: "Secure Connection",
      icon: Lock,
      description: "Protected content by Havia",
      type: "header"
    },
    {
      label: "Portfolio",
      icon: Grid,
      onClick: () => {
        window.location.href = "/#portfolio";
        onClose();
      }
    },
    {
      label: "About Havia",
      icon: User,
      onClick: () => {
        window.location.href = "/about";
        onClose();
      }
    },
    {
      label: "Contact WhatsApp",
      icon: MessageCircle,
      onClick: () => {
        window.open("https://wa.me/62811222333", "_blank"); // Replace with actual number
        onClose();
      }
    },
    {
      label: "Refresh Site",
      icon: ExternalLink,
      onClick: () => {
        window.location.reload();
        onClose();
      }
    }
  ];

  return (
    <motion.div
      ref={menuRef}
      initial={{ opacity: 0, scale: 0.95, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -10 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      style={{
        left: adjustedPos.x,
        top: adjustedPos.y,
      }}
      className="fixed z-[9999] w-64 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-2 overflow-hidden"
    >
      <div className="flex flex-col gap-1">
        {menuItems.map((item, i) => (
          item.type === "header" ? (
            <div key={i} className="px-3 py-3 mb-1 border-b border-white/5 bg-white/5 rounded-t-xl">
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-[var(--havia-gold)]/20 rounded-lg">
                  <item.icon size={14} className="text-[var(--havia-gold)]" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/40 font-semibold">{item.label}</p>
                  <p className="text-[9px] text-white/30">{item.description}</p>
                </div>
              </div>
            </div>
          ) : (
            <button
              key={i}
              onClick={item.onClick}
              className="group flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-all text-left"
            >
              <div className="p-1.5 bg-white/5 rounded-lg group-hover:bg-[var(--havia-gold)]/20 group-hover:scale-110 transition-all">
                <item.icon size={14} className="text-white/40 group-hover:text-[var(--havia-gold)] transition-colors" />
              </div>
              <span className="text-xs text-white/70 group-hover:text-white transition-colors">{item.label}</span>
            </button>
          )
        ))}
      </div>
      
      <div className="mt-2 text-center py-2 px-3 border-t border-white/5">
        <p className="text-[8px] uppercase tracking-[0.2em] text-white/20 font-mono">
          © Havia Studio / 2026
        </p>
      </div>
    </motion.div>
  );
}
