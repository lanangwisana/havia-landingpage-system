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

  // Fungsi untuk mengaktifkan blur INSTANT (tanpa delay, untuk mobile)
  const activateBlurInstant = useCallback(() => {
    if (!isReadyRef.current) return;

    const content = document.querySelector(".screenshot-protected-content");
    const overlay = document.getElementById("ss-blur-overlay");
    if (content) {
      content.classList.add("blurred");
    }
    if (overlay) {
      overlay.style.display = "flex";
    }

    setIsBlurred(true);

    if (blurTimeoutRef.current) {
      clearTimeout(blurTimeoutRef.current);
    }

    blurTimeoutRef.current = setTimeout(() => {
      setIsBlurred(false);
      if (content) {
        content.classList.remove("blurred");
      }
      if (overlay) {
        overlay.style.display = "none";
      }
    }, 4000);
  }, []);

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

  // KUNCI SCROLL SAAT BLUR AKTIF
  useEffect(() => {
    if (isBlurred) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isBlurred]);

  useEffect(() => {
    const readyTimeout = setTimeout(() => {
      isReadyRef.current = true;
    }, 2000);

    // ============ DESKTOP PROTECTION ============
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current.add(e.key.toLowerCase());

      const isCmdPressed = e.metaKey;
      const isShiftPressed = e.shiftKey;

      if (isCmdPressed && isShiftPressed) {
        activateBlur();
        try { navigator.clipboard.writeText(""); } catch {}
      }

      if (e.key === "PrintScreen" || e.code === "PrintScreen") {
        e.preventDefault();
        activateBlur();
        try { navigator.clipboard.writeText(""); } catch {}
        return;
      }
      if (e.metaKey && e.shiftKey && (e.key === "s" || e.key === "S")) {
        e.preventDefault();
        activateBlur();
        return;
      }
      if (e.ctrlKey && e.shiftKey && (e.key === "s" || e.key === "S")) {
        e.preventDefault();
        activateBlur();
        return;
      }
      if (e.metaKey && e.shiftKey && ["3", "4", "5", "6"].includes(e.key)) {
        e.preventDefault();
        activateBlur();
        return;
      }
      if (e.ctrlKey && (e.key === "PrintScreen" || e.code === "PrintScreen")) {
        e.preventDefault();
        activateBlur();
        return;
      }
      if (e.altKey && (e.key === "PrintScreen" || e.code === "PrintScreen")) {
        e.preventDefault();
        activateBlur();
        return;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current.delete(e.key.toLowerCase());
      if (e.key === "PrintScreen" || e.code === "PrintScreen") {
        e.preventDefault();
        activateBlur();
        try { navigator.clipboard.writeText(""); } catch {}
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

    const handleCopyShortcuts = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        const blockedKeys = ["c", "a", "u", "p", "s"];
        if (blockedKeys.includes(e.key.toLowerCase())) {
          const target = e.target as HTMLElement;
          if (
            target.tagName === "INPUT" ||
            target.tagName === "TEXTAREA" ||
            target.isContentEditable
          ) {
            return;
          }
          e.preventDefault();
        }
      }
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

    const handleCopy = (e: ClipboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }
      e.preventDefault();
      if (e.clipboardData) {
        e.clipboardData.setData("text/plain", "Konten ini dilindungi. © Havia Studio");
      }
    };

    const handleSelectStart = (e: Event) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }
      e.preventDefault();
    };

    const handleWindowBlur = () => {
      const isMobile = window.innerWidth <= 1024;
      if (isMobile) {
        activateBlurInstant();
      } else {
        activateBlur();
      }
    };

    // Register listeners global (tetap dipasang)
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("contextmenu", handleContextMenu as any);
    document.addEventListener("dragstart", handleDragStart);
    document.addEventListener("keydown", handleCopyShortcuts);
    window.addEventListener("blur", handleWindowBlur);
    window.addEventListener("resize", handleWindowBlur);
    document.addEventListener("touchstart", handleTouchStartMulti, { passive: true });
    document.addEventListener("touchmove", handleTouchMove, { passive: true });
    document.addEventListener("copy", handleCopy);
    document.addEventListener("selectstart", handleSelectStart);

    return () => {
      clearTimeout(readyTimeout);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("contextmenu", handleContextMenu as any);
      document.removeEventListener("dragstart", handleDragStart);
      document.removeEventListener("keydown", handleCopyShortcuts);
      window.removeEventListener("blur", handleWindowBlur);
      window.removeEventListener("resize", handleWindowBlur);
      document.removeEventListener("touchstart", handleTouchStartMulti);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("copy", handleCopy);
      document.removeEventListener("selectstart", handleSelectStart);
      if (blurTimeoutRef.current) {
        clearTimeout(blurTimeoutRef.current);
      }
    };
  }, [activateBlur, activateBlurInstant]);

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Overlay blur — hanya menutupi area komponen ini */}
      <div
        id="ss-blur-overlay"
        aria-hidden="true"
        style={{
          position: 'absolute',
          display: isBlurred ? 'flex' : 'none',
          inset: 0,
          zIndex: 9999,
          background: 'rgba(0, 0, 0, 0.95)',
          backdropFilter: 'blur(50px)',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'all',
        }}
      >
        <div
          className="screenshot-blur-message"
          style={{
            textAlign: 'center',
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
          }}
        >
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
          <h3 style={{ margin: 0 }}>Konten Dilindungi</h3>
          <p style={{ margin: 0, opacity: 0.8 }}>Screenshot tidak diizinkan pada halaman ini</p>
        </div>
      </div>

      {/* Custom Context Menu (tetap global) */}
      <AnimatePresence>
        {contextMenu && (
          <CustomContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            onClose={() => setContextMenu(null)}
          />
        )}
      </AnimatePresence>

      {/* Konten utama yang akan diproteksi blurnya */}
      <div className={`screenshot-protected-content ${isBlurred ? "blurred" : ""}`}>
        {children}
      </div>
    </div>
  )};