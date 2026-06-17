"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CursorGlow() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for a fluid, lag-free follow effect
  const smoothX = useSpring(mouseX, { stiffness: 150, damping: 25, mass: 0.5 });
  const smoothY = useSpring(mouseY, { stiffness: 150, damping: 25, mass: 0.5 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX - 200);
      mouseY.set(e.clientY - 200);
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="hidden md:block fixed top-0 left-0 pointer-events-none z-0 w-[400px] h-[400px] rounded-full bg-white/5 blur-[80px]"
      style={{
        x: smoothX,
        y: smoothY,
      }}
    />
  );
}
