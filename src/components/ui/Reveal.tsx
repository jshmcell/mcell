"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "fade";

const DEFAULT_DISTANCE = 40;

function startOffset(direction: Direction, distance?: number | string) {
  if (direction === "fade") return {};
  const d = distance ?? DEFAULT_DISTANCE;
  const negative = typeof d === "number" ? -d : `-${d}`;
  switch (direction) {
    case "up":
      return { y: d };
    case "down":
      return { y: negative };
    case "left":
      return { x: d };
    case "right":
      return { x: negative };
  }
}

interface RevealProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  direction?: Direction;
  /** Start offset; accepts CSS lengths/percents (e.g. "60%"). Defaults to 40px. */
  distance?: number | string;
  delay?: number;
  duration?: number;
  once?: boolean;
}

export default function Reveal({
  children,
  direction = "up",
  distance,
  delay = 0,
  duration = 0.7,
  once = true,
  ...rest
}: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, ...startOffset(direction, distance) }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: "-60px" }}
      transition={{ duration, delay, ease: "easeOut" }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
