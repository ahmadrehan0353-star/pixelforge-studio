"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Delete",
  danger = true,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  danger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 px-4"
          onClick={onCancel}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-panel w-full max-w-sm p-6"
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                danger ? "bg-red-400/10 text-red-400" : "bg-forge-cyan/10 text-forge-cyan"
              }`}
            >
              <AlertTriangle className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-display text-lg font-semibold text-white">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-mist-500">{description}</p>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={onCancel} className="btn-secondary px-5 py-2 text-sm">
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-transform hover:scale-[1.03] active:scale-[0.98] ${
                  danger ? "bg-red-500 text-white" : "bg-forge-gradient text-white"
                }`}
              >
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
