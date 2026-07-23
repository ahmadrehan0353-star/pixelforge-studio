"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

/**
 * Signature brand motif: a grid of pixels that assemble into a forged
 * hexagonal mark, echoing the "Pixel" + "Forge" name. Used prominently in
 * the hero, then echoed subtly as section dividers elsewhere.
 */
export default function PixelAssembly({ size = 340 }: { size?: number }) {
  const cols = 9;
  const rows = 9;
  const cell = size / cols;

  // Hexagon-ish mask pattern (1 = visible pixel)
  const pattern = useMemo(
    () => [
      "000111000",
      "001111100",
      "011111110",
      "111111111",
      "111111111",
      "111111111",
      "011111110",
      "001111100",
      "000111000",
    ],
    []
  );

  const pixels = useMemo(() => {
    const arr: { x: number; y: number; delay: number }[] = [];
    pattern.forEach((row, y) => {
      row.split("").forEach((v, x) => {
        if (v === "1") {
          const cx = x - (cols - 1) / 2;
          const cy = y - (rows - 1) / 2;
          const dist = Math.sqrt(cx * cx + cy * cy);
          arr.push({ x, y, delay: dist * 0.05 });
        }
      });
    });
    return arr;
  }, [pattern]);

  return (
    <div
      className="relative"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {pixels.map((p, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.2, x: (Math.random() - 0.5) * 260, y: (Math.random() - 0.5) * 260 }}
          animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          transition={{
            duration: 0.9,
            delay: 0.2 + p.delay,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="absolute rounded-[3px]"
          style={{
            width: cell - 4,
            height: cell - 4,
            left: p.x * cell,
            top: p.y * cell,
            background:
              (p.x + p.y) % 3 === 0
                ? "linear-gradient(135deg, #6D5EF5, #4CD9E8)"
                : (p.x + p.y) % 3 === 1
                ? "#4CD9E8"
                : "#FF7A45",
            opacity: 0.9,
          }}
        />
      ))}
    </div>
  );
}
