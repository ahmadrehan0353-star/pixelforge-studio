"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/lib/data";
import Reveal from "@/components/Reveal";

export default function TestimonialsSlider() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = (dir: number) => {
    setDirection(dir);
    setIndex((i) => (i + dir + testimonials.length) % testimonials.length);
  };

  const t = testimonials[index];

  return (
    <section className="section">
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="eyebrow">Testimonials</span>
        <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
          What clients say.
        </h2>
        <p className="mt-3 text-xs text-mist-700">
          Sample testimonials shown until real client reviews are published.
        </p>
      </Reveal>

      <div className="relative mx-auto mt-14 max-w-2xl">
        <div className="glass-panel min-h-[220px] overflow-hidden px-8 py-10 sm:px-14">
          <Quote className="h-8 w-8 text-forge-cyan/60" />
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 40 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <p className="mt-4 text-lg leading-relaxed text-mist-100">
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="mt-6 font-medium text-white">{t.name}</p>
              <p className="text-sm text-mist-500">{t.role}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="glass flex h-10 w-10 items-center justify-center rounded-full text-mist-300 transition-colors hover:text-white"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => {
                  setDirection(i > index ? 1 : -1);
                  setIndex(i);
                }}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-6 bg-forge-cyan" : "w-1.5 bg-white/20"
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="glass flex h-10 w-10 items-center justify-center rounded-full text-mist-300 transition-colors hover:text-white"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
