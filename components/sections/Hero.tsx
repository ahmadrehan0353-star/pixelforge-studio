"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import PixelAssembly from "@/components/PixelAssembly";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pb-24 pt-16 sm:pt-24 lg:pt-28">
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-forge-indigo/20 blur-[140px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 sm:px-8 lg:grid-cols-2 lg:px-10">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-mist-300"
          >
            <Sparkles className="h-3.5 w-3.5 text-forge-cyan" />
            Free homepage mockup — no obligation
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Websites That{" "}
            <span className="text-gradient">Grow Your Business.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-mist-500 sm:text-lg"
          >
            We design fast, modern, mobile-friendly websites for restaurants,
            salons, gyms, real estate agencies, medical clinics, clothing
            stores, and local businesses.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-9 flex flex-col gap-4 sm:flex-row"
          >
            <Link href="/contact" className="btn-primary">
              Get a Free Website Preview
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/portfolio" className="btn-secondary">
              View Our Work
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 flex items-center gap-6 text-xs text-mist-700"
          >
            <span className="font-mono uppercase tracking-widest">Built with</span>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-mist-500">
              <span>Next.js</span>
              <span>TypeScript</span>
              <span>Tailwind CSS</span>
            </div>
          </motion.div>
        </div>

        <div className="relative hidden justify-self-center lg:flex">
          <motion.div
            animate={{ y: [0, -16, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            <PixelAssembly size={380} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="glass-panel absolute -left-10 top-8 w-44 animate-float px-4 py-3"
          >
            <p className="text-[11px] text-mist-500">Page Speed</p>
            <p className="mt-1 font-mono text-lg font-semibold text-forge-cyan">98/100</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="glass-panel absolute -right-6 bottom-6 w-48 px-4 py-3"
            style={{ animation: "float 6s ease-in-out infinite 1s" }}
          >
            <p className="text-[11px] text-mist-500">Mobile Ready</p>
            <p className="mt-1 font-mono text-lg font-semibold text-white">100%</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
