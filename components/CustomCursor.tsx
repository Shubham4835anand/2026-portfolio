"use client";

import React, { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // Only activate on devices with fine pointer (mouse/trackpad)
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    let mouseX = -200;
    let mouseY = -200;
    let ringX = -200;
    let ringY = -200;
    let glowX = -200;
    let glowY = -200;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    const handleHoverCheck = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest("a, button, [role='button'], .pill-badge, .interactive-hover");
      if (interactive) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const loop = () => {
      // Smooth easing interpolation for ring and background glow
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${glowX}px, ${glowY}px, 0) translate(-50%, -50%)`;
      }

      animId = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", handleHoverCheck);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", handleHoverCheck);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, [isVisible]);

  return (
    <>
      {/* Background Interactive Ambient Spotlight (Fixed position, pointer-events none) */}
      <div
        ref={glowRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, rgba(37, 99, 235, 0.06) 45%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(40px)",
          pointerEvents: "none",
          zIndex: 1,
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.4s ease",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Main Cursor Dot */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: isHovered ? "8px" : "6px",
          height: isHovered ? "8px" : "6px",
          backgroundColor: "#38bdf8",
          borderRadius: "50%",
          boxShadow: "0 0 10px #38bdf8, 0 0 20px rgba(56, 189, 248, 0.6)",
          pointerEvents: "none",
          zIndex: 9999,
          opacity: isVisible ? 1 : 0,
          transition: "width 0.15s ease, height 0.15s ease, opacity 0.2s ease",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Interactive Outer Cursor Ring */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: isHovered ? "44px" : "28px",
          height: isHovered ? "44px" : "28px",
          borderRadius: "50%",
          border: isHovered ? "1.5px solid rgba(56, 189, 248, 0.85)" : "1px solid rgba(203, 213, 225, 0.35)",
          backgroundColor: isHovered ? "rgba(37, 99, 235, 0.15)" : "transparent",
          backdropFilter: isHovered ? "blur(4px)" : "none",
          boxShadow: isHovered ? "0 0 20px rgba(56, 189, 248, 0.3)" : "none",
          pointerEvents: "none",
          zIndex: 9998,
          opacity: isVisible ? 1 : 0,
          transition: "width 0.2s ease, height 0.2s ease, border-color 0.2s ease, background-color 0.2s ease, opacity 0.2s ease",
          transform: "translate(-50%, -50%)",
        }}
      />
    </>
  );
}
