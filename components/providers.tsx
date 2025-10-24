"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

export function Providers({ children }: { children: React.ReactNode }) {
  const opacity = useMotionValue(0.6);
  const shimmer = useTransform(opacity, (value) => value);

  useEffect(() => {
    const id = setInterval(() => {
      opacity.set(Math.random() * 0.4 + 0.45);
    }, 8000);
    return () => clearInterval(id);
  }, [opacity]);

  return (
    <motion.div style={{ opacity: shimmer }} className="flex-1">
      {children}
    </motion.div>
  );
}
