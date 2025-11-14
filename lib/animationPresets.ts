// Animation Presets for Framer Motion
// Reusable animation variants to reduce code duplication

export const fadeInLeft = {
  initial: { x: -50, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { duration: 0.6, type: "spring", stiffness: 100 },
};

export const fadeInRight = {
  initial: { x: 50, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { duration: 0.6, type: "spring", stiffness: 100 },
};

export const fadeInUp = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.5 },
};

export const fadeInScale = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: 0.5, type: "spring", stiffness: 100 },
};

export const slideInViewport = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true, margin: "-100px" },
};

export const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  transition: { staggerChildren: 0.1, delayChildren: 0.2 },
};

export const animationConfig = {
  spring: {
    type: "spring",
    stiffness: 100,
    damping: 15,
  },
  fast: {
    duration: 0.2,
  },
  normal: {
    duration: 0.5,
  },
  slow: {
    duration: 0.8,
  },
};

// Hover effects
export const hoverGlow = {
  whileHover: {
    boxShadow: "0 0 20px rgba(0, 173, 181, 0.5)",
  },
};

export const hoverScale = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
};

export const hoverLift = {
  whileHover: { y: -5 },
  transition: { type: "spring", stiffness: 300 },
};
