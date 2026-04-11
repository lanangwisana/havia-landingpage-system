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
    // Ini mencegah false positive saat halaman pertama kali load
    const readyTimeout = setTimeout(() => {
      isReadyRef.current = true;
    }, 1500);

    // 1. Deteksi PrintScreen dan shortcut screenshot
    const handleKeyDown = (e: KeyboardEvent) => {
      // PrintScreen key
      if (e.key === "PrintScreen" || e.code === "PrintScreen") {
        e.preventDefault();
        activateBlur();
        // Kosongkan clipboard
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

      // Ctrl + Shift + S (browser save / some screenshot tools)
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

      // Alt + PrintScreen (capture active window)
      if (e.altKey && (e.key === "PrintScreen" || e.code === "PrintScreen")) {
        e.preventDefault();
        activateBlur();
        return;
      }
    };

    // 2. Deteksi keyup untuk PrintScreen (beberapa browser hanya fire di keyup)
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "PrintScreen" || e.code === "PrintScreen") {
        e.preventDefault();
        activateBlur();
        try {
          navigator.clipboard.writeText("");
        } catch {}
      }
    };

    // 3. Deteksi visibility change (beberapa screenshot tools trigger ini)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        activateBlur();
      }
    };

    // 4. Blokir right-click (mencegah "Save Image As" dll)
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // 5. Blokir drag (mencegah drag gambar keluar)
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };

    // 6. Blokir Ctrl+C, Ctrl+A, Ctrl+U, Ctrl+P
    const handleCopyShortcuts = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        const blockedKeys = ["c", "a", "u", "p", "s"];
        if (blockedKeys.includes(e.key.toLowerCase())) {
          // Izinkan Ctrl+C hanya di input/textarea
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

    // Register semua event listeners
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("dragstart", handleDragStart);
    document.addEventListener("keydown", handleCopyShortcuts);

    // Cleanup
    return () => {
      clearTimeout(readyTimeout);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("dragstart", handleDragStart);
      document.removeEventListener("keydown", handleCopyShortcuts);
      if (blurTimeoutRef.current) {
        clearTimeout(blurTimeoutRef.current);
      }
    };
  }, [activateBlur]);

  return (
    <>
      {/* Overlay blur ketika screenshot terdeteksi */}
      {isBlurred && (
        <div
          className="screenshot-blur-overlay"
          aria-hidden="true"
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
      )}

      {/* Konten utama yang akan di-blur */}
      <div
        className={`screenshot-protected-content ${isBlurred ? "blurred" : ""}`}
      >
        {children}
      </div>
    </>
  );
}
