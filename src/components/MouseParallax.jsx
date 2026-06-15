import { useEffect } from "react";

/**
 * Publishes the eased mouse position as CSS variables on <html>:
 *   --mx, --my  → range roughly -1 .. 1 (center = 0)
 *
 * Background layers read these to drift with the pointer (see .parallax-*
 * classes in index.css). The position is smoothed with a low lerp factor so
 * the motion glides gracefully instead of snapping — a subtle, "pro" feel.
 *
 * Desktop only, and disabled for reduced-motion users.
 */
export const MouseParallax = () => {
  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!finePointer || reducedMotion) return;

    const root = document.documentElement;
    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;
    let rafId;

    const onMove = (e) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const render = () => {
      curX += (targetX - curX) * 0.06;
      curY += (targetY - curY) * 0.06;
      root.style.setProperty("--mx", curX.toFixed(4));
      root.style.setProperty("--my", curY.toFixed(4));
      rafId = requestAnimationFrame(render);
    };
    rafId = requestAnimationFrame(render);
    window.addEventListener("mousemove", onMove);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      root.style.removeProperty("--mx");
      root.style.removeProperty("--my");
    };
  }, []);

  return null;
};
