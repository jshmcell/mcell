"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right";

const offset: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 40 },
  down: { y: -40 },
  left: { x: 40 },
  right: { x: -40 },
};

interface RevealProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  once?: boolean;
}

export default function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.7,
  once = true,
  ...rest
}: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, ...offset[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: "-60px" }}
      transition={{ duration, delay, ease: "easeOut" }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}