import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const WORD = "Password";
const R_MAX = 155; // outer reach % — keep in sync with R in buildShards()

/**
 * Builds a radial "glass shatter" pattern as clip-path polygons that all share
 * edges (so there are no gaps). Two rings of shards fan out from the centre
 * impact point: inner triangles + outer trapezoids.
 */
function buildShards(segments) {
  const cx = 50;
  const cy = 50;
  const R = 155; // outer reach in % (overshoots the viewport to cover corners)
  const innerBase = R * 0.4;

  const aArr = [];
  const riArr = [];
  const roArr = [];
  const step = (Math.PI * 2) / segments;
  for (let s = 0; s < segments; s++) {
    aArr.push(s * step + (Math.random() - 0.5) * step * 0.45);
    riArr.push(innerBase * (0.78 + Math.random() * 0.44));
    roArr.push(R * (0.9 + Math.random() * 0.2));
  }

  const P = (a, r) => [
    (cx + Math.cos(a) * r).toFixed(1),
    (cy + Math.sin(a) * r).toFixed(1),
  ];

  const shards = [];
  for (let s = 0; s < segments; s++) {
    const n = (s + 1) % segments;
    const a0 = aArr[s];
    const a1 = aArr[n] + (n === 0 ? Math.PI * 2 : 0);
    const iR0 = riArr[s];
    const iR1 = riArr[n];
    const oR0 = roArr[s];
    const oR1 = roArr[n];
    const mid = (a0 + a1) / 2;

    // inner triangle (centre impact)
    const t0 = P(a0, iR0);
    const t1 = P(a1, iR1);
    shards.push({
      clip: `polygon(${cx}% ${cy}%, ${t0[0]}% ${t0[1]}%, ${t1[0]}% ${t1[1]}%)`,
      angle: mid,
      dist: ((iR0 + iR1) / 2) * 0.5,
    });

    // outer trapezoid
    const o1 = P(a1, oR1);
    const o0 = P(a0, oR0);
    shards.push({
      clip: `polygon(${t0[0]}% ${t0[1]}%, ${t1[0]}% ${t1[1]}%, ${o1[0]}% ${o1[1]}%, ${o0[0]}% ${o0[1]}%)`,
      angle: mid,
      dist: (oR0 + oR1) / 2,
    });
  }
  return shards;
}

export const IntroAnimation = () => {
  const rootRef = useRef(null);
  const blurRef = useRef(null);
  const targetRef = useRef(null);
  const scopeRef = useRef(null);
  const reticleRef = useRef(null);
  const flashRef = useRef(null);
  const cracksRef = useRef(null);
  const shardsRef = useRef(null);

  const [shards] = useState(() => {
    if (typeof window === "undefined") return [];
    return buildShards(window.innerWidth < 640 ? 11 : 16);
  });

  const [show, setShow] = useState(() => {
    if (typeof window === "undefined") return false;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    if (sessionStorage.getItem("mj_intro_played")) return false;
    return true;
  });

  useEffect(() => {
    if (!show) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const vmax = Math.max(window.innerWidth, window.innerHeight);
      const letters = targetRef.current.querySelectorAll(".intro-letter");
      const corners = targetRef.current.querySelectorAll(".intro-corner");
      const shardEls = shardsRef.current.querySelectorAll(".intro-shard");

      gsap.set(blurRef.current, { opacity: 0, scale: 1.08 });
      gsap.set(targetRef.current, { opacity: 0, scale: 0.9 });
      gsap.set(letters, { filter: "blur(0px)" });
      gsap.set(scopeRef.current, {
        opacity: 0,
        scale: 1.25,
        x: -vmax * 0.18,
        y: -vmax * 0.1,
      });
      gsap.set(shardsRef.current, { opacity: 0 });
      gsap.set(flashRef.current, { opacity: 0, scale: 1 });
      gsap.set(cracksRef.current, { opacity: 0 });

      const finish = () => {
        sessionStorage.setItem("mj_intro_played", "1");
        document.body.style.overflow = prevOverflow;
        setShow(false);
      };

      const debug =
        import.meta.env.DEV &&
        new URLSearchParams(window.location.search).has("introdebug");

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: finish,
        paused: debug,
      });
      if (debug) window.__introTL = tl;

      // 1) Blurred background in + 2) "Password" target in
      tl.to(blurRef.current, { opacity: 1, duration: 0.5 }, 0)
        .to(targetRef.current, { opacity: 1, scale: 1, duration: 0.6 }, 0.15)
        // 3) Scope appears, zooming in
        .to(
          scopeRef.current,
          { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" },
          0.35
        );

      // Subtle camera "settle" zoom on the blurred layer
      tl.to(blurRef.current, { scale: 1, duration: 1.9, ease: "sine.inOut" }, 0.35);

      // 4) Scope searches across the scene (explicit positions), then locks centre
      tl.to(
        scopeRef.current,
        { x: vmax * 0.16, y: -vmax * 0.05, duration: 0.5, ease: "sine.inOut" },
        0.7
      )
        .to(
          scopeRef.current,
          { x: -vmax * 0.09, y: vmax * 0.11, duration: 0.5, ease: "sine.inOut" },
          1.2
        )
        .to(
          scopeRef.current,
          { x: vmax * 0.05, y: vmax * 0.03, duration: 0.4, ease: "sine.inOut" },
          1.7
        )
        .to(
          scopeRef.current,
          { x: 0, y: 0, scale: 0.96, duration: 0.45, ease: "power2.inOut" },
          2.05
        );

      // 5) FIRE — single source of truth for the impact moment
      const FIRE = 2.55;

      // Lock-on confirmation: reticle pulse + colour shift to amber
      tl.to(
        reticleRef.current,
        { scale: 0.9, duration: 0.11, yoyo: true, repeat: 1, ease: "power2.inOut" },
        FIRE - 0.22
      ).to(
        reticleRef.current,
        { "--reticle": "#f5a623", duration: 0.18 },
        FIRE - 0.22
      );

      // Impact flash
      tl.to(
        flashRef.current,
        { opacity: 1, scale: 90, duration: 0.16, ease: "power2.out" },
        FIRE
      ).to(
        flashRef.current,
        { opacity: 0, duration: 0.4, ease: "power2.in" },
        FIRE + 0.16
      );

      // Camera shake
      tl.to(
        rootRef.current,
        {
          keyframes: { x: [0, -9, 8, -6, 4, 0], y: [0, 6, -5, 3, -2, 0] },
          duration: 0.32,
          ease: "power1.inOut",
        },
        FIRE
      );

      // Scope recoil, then fade out
      tl.to(
        scopeRef.current,
        { scale: 1.05, duration: 0.1, yoyo: true, repeat: 1 },
        FIRE
      ).to(
        scopeRef.current,
        { opacity: 0, duration: 0.4, ease: "power2.in" },
        FIRE + 0.12
      );

      // 6) "Password" shatters into pieces
      tl.to(
        letters,
        {
          x: () => gsap.utils.random(-180, 180),
          y: () => gsap.utils.random(-140, 150),
          rotation: () => gsap.utils.random(-120, 120),
          scale: 0.5,
          opacity: 0,
          filter: "blur(5px)",
          duration: 0.6,
          ease: "power2.in",
          stagger: { each: 0.015, from: "center" },
        },
        FIRE + 0.02
      );
      tl.to(corners, { opacity: 0, scale: 1.4, duration: 0.3 }, FIRE);

      // Crack flash
      tl.to(cracksRef.current, { opacity: 1, duration: 0.06 }, FIRE).to(
        cracksRef.current,
        { opacity: 0, duration: 0.5, ease: "power2.in" },
        FIRE + 0.18
      );

      // 7) Blurred layer breaks — reveal site — 8) shards fly out & fade
      tl.set(shardsRef.current, { opacity: 1 }, FIRE + 0.02);
      tl.to(blurRef.current, { opacity: 0, duration: 0.2 }, FIRE + 0.05);

      shardEls.forEach((el, i) => {
        const s = shards[i];
        if (!s) return;
        const flight = (0.16 + (s.dist / R_MAX) * 0.42) * vmax;
        tl.to(
          el,
          {
            x: Math.cos(s.angle) * flight,
            y: Math.sin(s.angle) * flight,
            rotation: gsap.utils.random(-70, 70),
            scale: 0.8,
            opacity: 0,
            duration: 0.8,
            ease: "power2.in",
          },
          FIRE + 0.04 + (s.dist / R_MAX) * 0.12
        );
      });
    }, rootRef);

    return () => {
      ctx.revert();
      document.body.style.overflow = prevOverflow;
    };
  }, [show, shards]);

  if (!show) return null;

  return (
    <div ref={rootRef} className="intro-overlay" aria-hidden="true">
      <div ref={blurRef} className="intro-blur" />

      <div ref={targetRef} className="intro-target">
        <div className="intro-target-box">
          <span className="intro-corner tl" />
          <span className="intro-corner tr" />
          <span className="intro-corner bl" />
          <span className="intro-corner br" />
          <span className="intro-word">
            {WORD.split("").map((ch, i) => (
              <span key={i} className="intro-letter">
                {ch}
              </span>
            ))}
          </span>
        </div>
      </div>

      <svg
        ref={cracksRef}
        className="intro-cracks"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {Array.from({ length: 11 }).map((_, i) => {
          const a = (i / 11) * Math.PI * 2 + (i % 2 ? 0.2 : -0.15);
          const r = 60 + (i % 3) * 18;
          return (
            <line
              key={i}
              x1="50"
              y1="50"
              x2={50 + Math.cos(a) * r}
              y2={50 + Math.sin(a) * r}
              vectorEffect="non-scaling-stroke"
            />
          );
        })}
      </svg>

      <div ref={scopeRef} className="intro-scope">
        <div className="intro-scope-vignette" />
        <div ref={reticleRef} className="intro-reticle">
          <span className="intro-line top" />
          <span className="intro-line bottom" />
          <span className="intro-line left" />
          <span className="intro-line right" />
          <span className="intro-ring-inner" />
          <span className="intro-dot" />
        </div>
      </div>

      <div ref={flashRef} className="intro-flash" />

      <div ref={shardsRef} className="intro-shards">
        {shards.map((s, i) => (
          <div key={i} className="intro-shard" style={{ clipPath: s.clip }} />
        ))}
      </div>
    </div>
  );
};
