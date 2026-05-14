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
  const [isComponentVisible, setIsComponentVisible] = useState(false);
  const blurTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isReadyRef = useRef(false);
  const keysPressed = useRef<Set<string>>(new Set());
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const activateBlurInstant = useCallback(
    (duration = 4000) => {
      if (!isReadyRef.current) return;

      const content = contentRef.current;
      const overlay = document.getElementById("ss-blur-overlay");
      if (content) content.classList.add("blurred");
      if (overlay) overlay.style.display = "flex";
      setIsBlurred(true);

      if (blurTimeoutRef.current) clearTimeout(blurTimeoutRef.current);
      blurTimeoutRef.current = setTimeout(() => {
        setIsBlurred(false);
        if (content) content.classList.remove("blurred");
        if (overlay) overlay.style.display = "none";
      }, duration);
    },
    [isComponentVisible],
  );

  const activateBlur = useCallback(
    (duration = 3000) => {
      if (!isReadyRef.current) return;
      setIsBlurred(true);
      if (blurTimeoutRef.current) clearTimeout(blurTimeoutRef.current);
      blurTimeoutRef.current = setTimeout(() => setIsBlurred(false), duration);
    },
    [isComponentVisible],
  );

  const handleContextMenu = (e: MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  // Intersection Observer removed to allow global protection
  useEffect(() => {
    setIsComponentVisible(true);
  }, []);

  useEffect(() => {
    const readyTimeout = setTimeout(() => {
      isReadyRef.current = true;
    }, 500);

    // === KEYBOARD EVENTS ===
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current.add(e.key.toLowerCase());

      // Mac Detection: Cmd + Shift
      if (e.metaKey && e.shiftKey) {
        activateBlurInstant();
        try {
          navigator.clipboard.writeText("");
        } catch {}
      }

      // Specific Mac shortcuts: Cmd+Shift+3, 4, 5
      if (e.metaKey && e.shiftKey && ["3", "4", "5", "6"].includes(e.key)) {
        e.preventDefault();
        activateBlurInstant(6000); // Longer blur for Mac
        return;
      }

      if (e.key === "PrintScreen" || e.code === "PrintScreen") {
        e.preventDefault();
        activateBlurInstant();
        try {
          navigator.clipboard.writeText("");
        } catch {}
        return;
      }
      
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && (e.key === "s" || e.key === "S")) {
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

    // === VISIBILITY ===
    const handleVisibilityChange = () => {
      if (document.hidden) activateBlurInstant();
    };

    // === DRAG ===
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };

    // === COPY SHORTCUTS ===
    const handleCopyShortcuts = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        const blockedKeys = ["c", "a", "u", "p", "s"];
        if (blockedKeys.includes(e.key.toLowerCase())) {
          const target = e.target as HTMLElement;
          if (
            target.tagName === "INPUT" ||
            target.tagName === "TEXTAREA" ||
            target.isContentEditable
          )
            return;
          e.preventDefault();
        }
      }
    };

    // === MULTI-TOUCH (3 jari) ===
    const handleTouchStartMulti = (e: TouchEvent) => {
      if (e.touches.length >= 3) activateBlurInstant();
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length >= 3) activateBlurInstant();
    };

    // === COPY & SELECT ===
    const handleCopy = (e: ClipboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      )
        return;
      e.preventDefault();
      if (e.clipboardData)
        e.clipboardData.setData(
          "text/plain",
          "Konten ini dilindungi. © Havia Studio",
        );
    };

    const handleSelectStart = (e: Event) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      )
        return;
      e.preventDefault();
    };

    const handleWindowBlur = () => {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (!isMobile) {
        activateBlurInstant(5000);
      }
    };

    const handleMouseLeave = () => {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (!isMobile && keysPressed.current.has("meta") && keysPressed.current.has("shift")) {
        activateBlurInstant(6000);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("contextmenu", handleContextMenu as any);
    document.addEventListener("dragstart", handleDragStart);
    document.addEventListener("keydown", handleCopyShortcuts);
    window.addEventListener("blur", handleWindowBlur);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("touchstart", handleTouchStartMulti, {
      passive: true,
    });
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
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("touchstart", handleTouchStartMulti);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("copy", handleCopy);
      document.removeEventListener("selectstart", handleSelectStart);
      if (blurTimeoutRef.current) clearTimeout(blurTimeoutRef.current);
    };
  }, [activateBlur, activateBlurInstant]);

  return (
    <>
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
