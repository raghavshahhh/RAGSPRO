"use client"; // CRITICAL: Must be client component

import { useEffect } from "react";

export default function SmoothScroll({ children }) {
  useEffect(() => {
    // ❌ MOBILE: NO LENIS, NO TRANSFORM
    if (window.innerWidth < 768) {
      document.documentElement.style.scrollBehavior = "auto";
      document.body.style.transform = "none";
      document.body.style.overflow = "auto";
      return; // Exit early, don't load Lenis
    }

    // ✅ DESKTOP: KEEP LENIS SMOOTH SCROLL
    import("lenis").then(({ default: Lenis }) => {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    });
  }, []);

  return <>{children}</>; // Return fragment
}