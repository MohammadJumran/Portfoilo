import { useEffect, useRef, useState } from "react";

/**
 * Custom "specialist" cursor: a precise primary dot that tracks the pointer
 * exactly, plus a larger ring that trails behind with inertia (the "heavy"
 * feel). The ring grows over interactive elements and contracts on click.
 *
 * Only activates on fine-pointer devices (desktop) and when the user hasn't
 * requested reduced motion — touch devices keep the native cursor.
 */
export const CustomCursor = () => {
  // Decide once, at first render, whether the custom cursor should run.
  const [active] = useState(() => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return (
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  });
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (!active) return;

    const root = document.documentElement;
    root.classList.add("cursor-custom");

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let rafId;
    let visible = false;

    const interactiveSelector =
      "a, button, input, textarea, select, label, [role='button'], [data-cursor]";

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      if (!visible) {
        visible = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }
    };

    const render = () => {
      // Lerp factor < 1 makes the ring lag behind = the "heavy" trailing feel.
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(render);
    };
    rafId = requestAnimationFrame(render);

    const onOver = (e) => {
      if (e.target.closest?.(interactiveSelector)) {
        ring.classList.add("cursor-ring--hover");
      }
    };
    const onOut = (e) => {
      if (e.target.closest?.(interactiveSelector)) {
        ring.classList.remove("cursor-ring--hover");
      }
    };
    const onDown = () => ring.classList.add("cursor-ring--down");
    const onUp = () => ring.classList.remove("cursor-ring--down");
    const onLeave = () => {
      // Hide when the pointer leaves the window, and reset the flag so the
      // next movement re-shows it (otherwise it stays hidden forever).
      visible = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };
    const onEnter = () => {
      visible = true;
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(rafId);
      root.classList.remove("cursor-custom");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [active]);

  if (!active) return null;

  return (
    <>
      <div ref={ringRef} className="cursor-ring" style={{ opacity: 0 }} aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" style={{ opacity: 0 }} aria-hidden="true" />
    </>
  );
};
