"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

const websiteTypes = [
  "Business Website",
  "E-commerce Store",
  "Restaurant Website",
  "Booking System",
  "Landing Page",
  "Portfolio Website",
  "Website Redesign",
  "Other",
];

const budgets = ["Under $500", "$500 – $1,200", "$1,200 – $2,500", "$2,500+", "Not sure yet"];

const timelines = ["Less than 1 week", "2 weeks", "1 month", "Flexible"];

type FormState = {
  name: string;
  business: string;
  email: string;
  phone: string;
  websiteType: string;
  budget: string;
  timeline: string;
  description: string;
};

const initialState: FormState = {
  name: "",
  business: "",
  email: "",
  phone: "",
  websiteType: websiteTypes[0],
  budget: budgets[0],
  timeline: timelines[0],
  description: "",
};

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = (field: keyof FormState, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await addDoc(collection(db, "leads"), {
        ...form,
        createdAt: serverTimestamp(),
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Failed to submit contact form:", err);
      setError(
        "Something went wrong sending your request. Please try again, or email us directly."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel flex flex-col items-center px-8 py-16 text-center"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-forge-gradient">
          <CheckCircle2 className="h-7 w-7 text-white" />
        </div>
        <h3 className="mt-6 font-display text-2xl font-semibold text-white">
          Request received.
        </h3>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-mist-500">
          Thanks, {form.name.split(" ")[0] || "there"}. We&apos;ll review your
          project and get back to you shortly to start on your free homepage
          mockup.
        </p>
        <button
          onClick={() => {
            setForm(initialState);
            setSubmitted(false);
          }}
          className="btn-secondary mt-8"
        >
          Submit another request
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass-panel space-y-6 p-8 sm:p-10">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Name" required>
          <input
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Jane Doe"
            className="input"
          />
        </Field>
        <Field label="Business Name">
          <input
            value={form.business}
            onChange={(e) => update("business", e.target.value)}
            placeholder="Jane's Bakery"
            className="input"
          />
        </Field>
        <Field label="Email" required>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="jane@example.com"
            className="input"
          />
        </Field>
        <Field label="Phone Number">
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="+1 (555) 000-0000"
            className="input"
          />
        </Field>
        <Field label="Website Type">
          <select
            value={form.websiteType}
            onChange={(e) => update("websiteType", e.target.value)}
            className="input"
          >
            {websiteTypes.map((t) => (
              <option key={t} value={t} className="bg-ink-800">
                {t}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Budget">
          <select
            value={form.budget}
            onChange={(e) => update("budget", e.target.value)}
            className="input"
          >
            {budgets.map((b) => (
              <option key={b} value={b} className="bg-ink-800">
                {b}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Timeline">
        <div className="flex flex-wrap gap-2">
          {timelines.map((t) => (
            <button
              type="button"
              key={t}
              onClick={() => update("timeline", t)}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                form.timeline === t
                  ? "border-forge-cyan/50 bg-forge-cyan/10 text-white"
                  : "border-white/[0.08] bg-white/[0.02] text-mist-500 hover:text-white"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </Field>

      <Field label="Project Description">
        <textarea
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          placeholder="Tell us about your business and what you're looking for..."
          rows={5}
          className="input resize-none"
        />
      </Field>

      {error && (
        <div className="flex items-start gap-2 rounded-xl border border-forge-ember/30 bg-forge-ember/10 px-4 py-3 text-sm text-forge-emberLight">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
          {error}
        </div>
      )}

      <AnimatePresence>
        <motion.button
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={submitting}
          className="btn-primary w-full disabled:opacity-60"
        >
          {submitting ? "Sending..." : "Request Your Free Mockup"}
          {!submitting && <Send className="h-4 w-4" />}
        </motion.button>
      </AnimatePresence>

      <style jsx global>{`
        .input {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.03);
          padding: 0.75rem 1rem;
          font-size: 0.875rem;
          color: white;
          transition: border-color 0.2s ease;
        }
        .input::placeholder {
          color: #5c5c6b;
        }
        .input:focus {
          border-color: rgba(76, 217, 232, 0.5);
          outline: none;
        }
      `}</style>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-medium uppercase tracking-wide text-mist-500">
        {label}
        {required && <span className="text-forge-ember"> *</span>}
      </span>
      {children}
    </label>
  );
}
