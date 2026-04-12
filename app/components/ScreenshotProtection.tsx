"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export default function ScreenshotProtection({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isBlurred, setIsBlurred] = useState(false);
  const blurTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isReadyRef = useRef(false);

  // Fungsi untuk mengaktifkan blur INSTANT (tanpa delay, untuk mobile)
  const activateBlurInstant = useCallback(() => {
    if (!isReadyRef.current) return;

    // Langsung set blur via DOM untuk kecepatan maksimal
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

  useEffect(() => {
    // Delay sebelum aktifkan proteksi
    const readyTimeout = setTimeout(() => {
      isReadyRef.current = true;
    }, 2000);

    // ============ DESKTOP PROTECTION ============

    const handleKeyDown = (e: KeyboardEvent) => {
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
      if (e.metaKey && e.shiftKey && ["3", "4", "5"].includes(e.key)) {
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

    const handleContextMenu = (e: Event) => {
      e.preventDefault();
      return false;
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

    // DETEKSI 3 JARI — Ini kunci utama untuk Android!
    // Saat user geser 3 jari, browser menerima touchstart dengan 3+ touches.
    // Kita blur INSTANT sebelum screenshot tercapture.
    const handleTouchStartMulti = (e: TouchEvent) => {
      if (e.touches.length >= 3) {
        // 3+ jari terdeteksi! Kemungkinan besar gesture screenshot
        activateBlurInstant();
      }
    };

    // Deteksi perubahan jumlah touch points (jari ditambah ke layar)
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length >= 3) {
        activateBlurInstant();
      }
    };

    // Blokir long-press pada gambar
    const handleTouchStartImg = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "IMG" || target.tagName === "CANVAS") {
        target.addEventListener(
          "contextmenu",
          (ev) => {
            ev.preventDefault();
            return false;
          },
          { once: true }
        );
      }
    };

    // Blokir copy event
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
        e.clipboardData.setData(
          "text/plain",
          "Konten ini dilindungi. © Havia Studio"
        );
      }
    };

    // Blokir select
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

    // Deteksi window blur (mobile)
    const handleWindowBlur = () => {
      if (window.innerWidth <= 768) {
        activateBlurInstant();
      }
    };

    // Register listeners
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("dragstart", handleDragStart);
    document.addEventListener("keydown", handleCopyShortcuts);
    // PENTING: touchstart TIDAK passive agar bisa diproses cepat
    document.addEventListener("touchstart", handleTouchStartMulti, { passive: true });
    document.addEventListener("touchmove", handleTouchMove, { passive: true });
    document.addEventListener("touchstart", handleTouchStartImg, { passive: true });
    document.addEventListener("copy", handleCopy);
    document.addEventListener("selectstart", handleSelectStart);
    window.addEventListener("blur", handleWindowBlur);

    // Cleanup
    return () => {
      clearTimeout(readyTimeout);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("dragstart", handleDragStart);
      document.removeEventListener("keydown", handleCopyShortcuts);
      document.removeEventListener("touchstart", handleTouchStartMulti);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchstart", handleTouchStartImg);
      document.removeEventListener("copy", handleCopy);
      document.removeEventListener("selectstart", handleSelectStart);
      window.removeEventListener("blur", handleWindowBlur);
      if (blurTimeoutRef.current) {
        clearTimeout(blurTimeoutRef.current);
      }
    };
  }, [activateBlur, activateBlurInstant]);

  return (
    <>
      {/* Watermark overlay — teks diagonal yang ikut tercapture saat screenshot */}
      <div className="screenshot-watermark" aria-hidden="true">
        {Array.from({ length: 40 }).map((_, i) => (
          <span key={i}>HAVIA STUDIO © PROTECTED</span>
        ))}
      </div>

      {/* Overlay blur — ada di DOM selalu tapi hidden, agar bisa instant show */}
      <div
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

      {/* Konten utama */}
      <div
        className={`screenshot-protected-content ${isBlurred ? "blurred" : ""}`}
      >
        {children}
      </div>
    </>
  );
}
