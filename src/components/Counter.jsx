import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";

/**
 * Animated number counter that runs once when scrolled into view.
 * `value` is the target number; `suffix`/`prefix` wrap it (e.g. "+", "k").
 */
export const Counter = ({
  value,
  suffix = "",
  prefix = "",
  duration = 1.8,
  className = "",
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
};
