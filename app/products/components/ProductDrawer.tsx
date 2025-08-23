"use client";
import { Product } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductDrawer({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  if (!product) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.aside
          initial={{ x: 400 }}
          animate={{ x: 0 }}
          exit={{ x: 400 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="absolute right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-950 shadow-xl border-l border-gray-200 dark:border-gray-800 p-6 rounded-l-2xl overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <header className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {product.name}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus-ring rounded-lg p-2 transition"
            >
              ✕
            </button>
          </header>

          <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
            <div className="flex justify-between">
              <span className="font-medium opacity-80">Price:</span>
              <span className="font-semibold">₹{product.price.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium opacity-80">Stock:</span>
              <span>{product.stock}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium opacity-80">Category:</span>
              <span>{product.category}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium opacity-80">Status:</span>
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  product.status === "active"
                    ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400"
                    : "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-400"
                }`}
              >
                {product.status.toUpperCase()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium opacity-80">Vendor:</span>
              <span>{product.vendor}</span>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
              <span className="font-medium opacity-80">Description:</span>
              <p className="mt-2 text-gray-800 dark:text-gray-200 leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="mt-6 w-full py-2 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white font-semibold shadow-md transition"
          >
            Close
          </button>
        </motion.aside>
      </motion.div>
    </AnimatePresence>
  );
}
