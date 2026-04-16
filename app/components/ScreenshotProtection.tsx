"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import CustomContextMenu from "./CustomContextMenu";
import { AnimatePresence } from "framer-motion";

export default function ScreenshotProtection({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isBlurred, setIsBlurred] = useState(false);
  const blurTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isReadyRef = useRef(false);
  const keysPressed = useRef<Set<string>>(new Set());
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);

  // Refs untuk akses DOM langsung (kecepatan maksimal bypass React render cycle)
  const contentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Fungsi untuk mengaktifkan blur INSTANT (tanpa delay, untuk mobile)
  const activateBlurInstant = useCallback(() => {
    if (!isReadyRef.current) return;

    // Langsung manipulasi DOM untuk kecepatan milidetik
    // Ini krusial untuk mengejar os-level screenshot capture
    if (contentRef.current) {
      contentRef.current.classList.add("blurred");
      contentRef.current.style.opacity = "0"; // Sembunyikan instan
      contentRef.current.style.visibility = "hidden";
    }
    if (overlayRef.current) {
      overlayRef.current.style.display = "flex";
      overlayRef.current.style.opacity = "1";
    }

    setIsBlurred(true);

    if (blurTimeoutRef.current) {
      clearTimeout(blurTimeoutRef.current);
    }

    blurTimeoutRef.current = setTimeout(() => {
      setIsBlurred(false);
      if (contentRef.current) {
        contentRef.current.classList.remove("blurred");
        contentRef.current.style.opacity = "1";
        contentRef.current.style.visibility = "visible";
      }
      if (overlayRef.current) {
        overlayRef.current.style.display = "none";
        overlayRef.current.style.opacity = "0";
      }
    }, 4000);
  }, []);

  // Fungsi blur normal (via state)
  const activateBlur = useCallback(() => {
    if (!isReadyRef.current) return;

    setIsBlurred(true);

    if (blurTimeoutRef.current) {
      clearTimeout(blurTimeoutRef.current);
    }

    blurTimeoutRef.current = setTimeout(() => {
      setIsBlurred(false);
    }, 3000);
  }, []);

  const handleContextMenu = (e: MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    // Delay lebih cepat agar proteksi aktif segera setelah load (500ms)
    const readyTimeout = setTimeout(() => {
      isReadyRef.current = true;
    }, 500);

    // ============ DESKTOP PROTECTION ============

    const handleKeyDown = (e: KeyboardEvent) => {
      // Track pressed keys for modifier detection
      keysPressed.current.add(e.key.toLowerCase());
      
      // MACBOOK PROTECTION: Detect Command + Shift
      const isCmdPressed = e.metaKey;
      const isShiftPressed = e.shiftKey;

      if (isCmdPressed && isShiftPressed) {
        activateBlur();
        try { navigator.clipboard.writeText(""); } catch {}
      }

      if (e.key === "PrintScreen" || e.code === "PrintScreen") {
        e.preventDefault();
        activateBlurInstant();
        try { navigator.clipboard.writeText(""); } catch {}
        return;
      }
      if (e.metaKey && e.shiftKey && (e.key === "s" || e.key === "S")) {
        e.preventDefault();
        activateBlurInstant();
        return;
      }
      if (e.ctrlKey && e.shiftKey && (e.key === "s" || e.key === "S")) {
        e.preventDefault();
        activateBlurInstant();
        return;
      }
      if (e.metaKey && e.shiftKey && ["3", "4", "5", "6"].includes(e.key)) {
        e.preventDefault();
        activateBlurInstant();
        return;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current.delete(e.key.toLowerCase());
      if (e.key === "PrintScreen" || e.code === "PrintScreen") {
        e.preventDefault();
        activateBlurInstant();
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        activateBlurInstant();
      }
    };


    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };

    // ============ MOBILE PROTECTION ============

    const handleTouchStartMulti = (e: TouchEvent) => {
      if (e.touches.length >= 3) {
        activateBlurInstant();
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length >= 3) {
        activateBlurInstant();
      }
    };

    // Deteksi window blur (iOS & Android hardware events)
    const handleWindowBlur = () => {
      // Hardware screenshot biasanya memicu blur pada window
      activateBlurInstant();
    };

    // Listeners tambahan untuk menangkap perpindahan layar lebih cepat
    const handleFocusOut = () => activateBlurInstant();
    const handlePageHide = () => activateBlurInstant();

    // Register listeners
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("contextmenu", handleContextMenu as any);
    document.addEventListener("dragstart", handleDragStart);
    window.addEventListener("blur", handleWindowBlur);
    window.addEventListener("focusout", handleFocusOut);
    window.addEventListener("pagehide", handlePageHide);
    window.addEventListener("resize", handleWindowBlur);
    
    document.addEventListener("touchstart", handleTouchStartMulti, { passive: true });
    document.addEventListener("touchmove", handleTouchMove, { passive: true });

    // Cleanup
    return () => {
      clearTimeout(readyTimeout);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("contextmenu", handleContextMenu as any);
      document.removeEventListener("dragstart", handleDragStart);
      window.removeEventListener("blur", handleWindowBlur);
      window.removeEventListener("focusout", handleFocusOut);
      window.removeEventListener("pagehide", handlePageHide);
      window.removeEventListener("resize", handleWindowBlur);
      document.removeEventListener("touchstart", handleTouchStartMulti);
      document.removeEventListener("touchmove", handleTouchMove);
      if (blurTimeoutRef.current) {
        clearTimeout(blurTimeoutRef.current);
      }
    };
  }, [activateBlur, activateBlurInstant]);

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        id="ss-blur-overlay"
        className="screenshot-blur-overlay"
        aria-hidden="true"
        style={{ display: isBlurred ? "flex" : "none" }}
      >
        <div className="screenshot-blur-message">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M17 11V7a5 5 0 0 0-10 0v4" />
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <circle cx="12" cy="16" r="1" />
          </svg>
          <h3>Konten Dilindungi</h3>
          <p>Screenshot tidak diizinkan pada halaman ini</p>
        </div>
      </div>

      <AnimatePresence>
        {contextMenu && (
          <CustomContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            onClose={() => setContextMenu(null)}
          />
        )}
      </AnimatePresence>

      <div
        ref={contentRef}
        className={`screenshot-protected-content ${isBlurred ? "blurred" : ""}`}
      >
        {children}
      </div>
    </>
  );
}