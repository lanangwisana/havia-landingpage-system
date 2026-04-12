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

  // Fungsi untuk mengaktifkan blur
  const activateBlur = useCallback(() => {
    // Jangan trigger blur sebelum komponen siap (mencegah false positive saat load)
    if (!isReadyRef.current) return;

    setIsBlurred(true);

    // Clear timeout sebelumnya jika ada
    if (blurTimeoutRef.current) {
      clearTimeout(blurTimeoutRef.current);
    }

    // Auto-unblur setelah 3 detik
    blurTimeoutRef.current = setTimeout(() => {
      setIsBlurred(false);
    }, 3000);
  }, []);

  useEffect(() => {
    // Delay sebelum aktifkan proteksi (1.5 detik setelah mount)
    const readyTimeout = setTimeout(() => {
      isReadyRef.current = true;
    }, 1500);

    // ============ DESKTOP PROTECTION ============

    // 1. Deteksi PrintScreen dan shortcut screenshot
    const handleKeyDown = (e: KeyboardEvent) => {
      // PrintScreen key
      if (e.key === "PrintScreen" || e.code === "PrintScreen") {
        e.preventDefault();
        activateBlur();
        try {
          navigator.clipboard.writeText("");
        } catch {}
        return;
      }

      // Windows Snipping Tool: Win + Shift + S
      if (e.metaKey && e.shiftKey && (e.key === "s" || e.key === "S")) {
        e.preventDefault();
        activateBlur();
        return;
      }

      // Ctrl + Shift + S
      if (e.ctrlKey && e.shiftKey && (e.key === "s" || e.key === "S")) {
        e.preventDefault();
        activateBlur();
        return;
      }

      // Mac screenshots: Cmd + Shift + 3, 4, 5
      if (e.metaKey && e.shiftKey && ["3", "4", "5"].includes(e.key)) {
        e.preventDefault();
        activateBlur();
        return;
      }

      // Ctrl + PrtSc
      if (e.ctrlKey && (e.key === "PrintScreen" || e.code === "PrintScreen")) {
        e.preventDefault();
        activateBlur();
        return;
      }

      // Alt + PrintScreen
      if (e.altKey && (e.key === "PrintScreen" || e.code === "PrintScreen")) {
        e.preventDefault();
        activateBlur();
        return;
      }
    };

    // 2. Deteksi keyup untuk PrintScreen
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "PrintScreen" || e.code === "PrintScreen") {
        e.preventDefault();
        activateBlur();
        try {
          navigator.clipboard.writeText("");
        } catch {}
      }
    };

    // 3. Deteksi visibility change
    const handleVisibilityChange = () => {
      if (document.hidden) {
        activateBlur();
      }
    };

    // 4. Blokir right-click
    const handleContextMenu = (e: Event) => {
      e.preventDefault();
      return false;
    };

    // 5. Blokir drag
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };

    // 6. Blokir copy shortcuts
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

    // 7. Blokir long-press pada gambar (mencegah "Save Image" di mobile)
    const handleTouchStart = (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "IMG" || target.tagName === "CANVAS") {
        // Prevent long press context menu on images
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

    // 8. Blokir copy event
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
      // Tulis pesan ke clipboard alih-alih konten
      if (e.clipboardData) {
        e.clipboardData.setData(
          "text/plain",
          "Konten ini dilindungi. © Havia Studio"
        );
      }
    };

    // 9. Blokir select all pada mobile
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

    // 10. Deteksi resize cepat (beberapa screenshot tools resize window)
    let lastWidth = window.innerWidth;
    let lastHeight = window.innerHeight;
    const handleResize = () => {
      const widthDiff = Math.abs(window.innerWidth - lastWidth);
      const heightDiff = Math.abs(window.innerHeight - lastHeight);

      // Jika ukuran berubah drastis dalam waktu singkat, mungkin screenshot tool
      if (widthDiff > 100 || heightDiff > 100) {
        activateBlur();
      }

      lastWidth = window.innerWidth;
      lastHeight = window.innerHeight;
    };

    // 11. Deteksi focus/blur untuk mobile (beberapa Android screenshot trigger ini)
    const handleWindowBlurMobile = () => {
      // Hanya aktifkan di mobile (layar kecil)
      if (window.innerWidth <= 768) {
        activateBlur();
      }
    };

    // Register semua event listeners
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("dragstart", handleDragStart);
    document.addEventListener("keydown", handleCopyShortcuts);
    document.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    document.addEventListener("copy", handleCopy);
    document.addEventListener("selectstart", handleSelectStart);
    window.addEventListener("resize", handleResize);
    window.addEventListener("blur", handleWindowBlurMobile);

    // Cleanup
    return () => {
      clearTimeout(readyTimeout);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("dragstart", handleDragStart);
      document.removeEventListener("keydown", handleCopyShortcuts);
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("copy", handleCopy);
      document.removeEventListener("selectstart", handleSelectStart);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("blur", handleWindowBlurMobile);
      if (blurTimeoutRef.current) {
        clearTimeout(blurTimeoutRef.current);
      }
    };
  }, [activateBlur]);

  return (
    <>
      {/* Watermark overlay — selalu muncul di mobile, hanya terlihat di screenshot */}
      <div className="screenshot-watermark" aria-hidden="true">
        {Array.from({ length: 20 }).map((_, i) => (
          <span key={i}>HAVIA STUDIO • CONFIDENTIAL</span>
        ))}
      </div>

      {/* Overlay blur ketika screenshot terdeteksi (desktop) */}
      {isBlurred && (
        <div className="screenshot-blur-overlay" aria-hidden="true">
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
      )}

      {/* Konten utama */}
      <div
        className={`screenshot-protected-content ${isBlurred ? "blurred" : ""}`}
      >
        {children}
      </div>
    </>
  );
}
