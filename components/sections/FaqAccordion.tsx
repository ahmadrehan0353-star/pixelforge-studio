"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { faqs as staticFaqs } from "@/lib/data";
import Reveal from "@/components/Reveal";
import { usePublicCollection } from "@/lib/usePublicFirestore";
import type { FaqItem } from "@/lib/admin/types";

const fallback: FaqItem[] = staticFaqs.map((f, i) => ({ ...f, order: i }));

export default function FaqAccordion() {
  const { items } = usePublicCollection<FaqItem>("faq", fallback);
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section max-w-4xl">
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="eyebrow">FAQ</span>
        <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
          Common questions.
        </h2>
      </Reveal>

      <div className="mt-14 space-y-3">
        {items.map((faq, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={faq.question} delay={i * 0.05}>
              <div className="glass-panel overflow-hidden">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-medium text-white">{faq.question}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-forge-cyan"
                  >
                    <Plus className="h-4 w-4" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-sm leading-relaxed text-mist-500">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
