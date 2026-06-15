import { motion } from "framer-motion";

const directions = {
  up: { y: 28, x: 0 },
  down: { y: -28, x: 0 },
  left: { x: 28, y: 0 },
  right: { x: -28, y: 0 },
  none: { x: 0, y: 0 },
};

/**
 * Scroll-triggered reveal. Animates once when it enters the viewport.
 * Falls back gracefully and respects reduced-motion via Framer Motion.
 */
export const Reveal = ({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  className = "",
  as = "div",
  once = true,
  amount = 0.2,
}) => {
  const offset = directions[direction] ?? directions.up;
  const MotionTag = motion[as] ?? motion.div;

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
};

/**
 * Staggered container — children using <Reveal> or motion items animate in sequence.
 */
export const StaggerGroup = ({
  children,
  className = "",
  stagger = 0.08,
  once = true,
}) => (
  <motion.div
    className={className}
    initial="hidden"
    whileInView="visible"
    viewport={{ once, amount: 0.15 }}
    variants={{
      hidden: {},
      visible: { transition: { staggerChildren: stagger } },
    }}
  >
    {children}
  </motion.div>
);

export const StaggerItem = ({ children, className = "", direction = "up" }) => {
  const offset = directions[direction] ?? directions.up;
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, ...offset },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
};
