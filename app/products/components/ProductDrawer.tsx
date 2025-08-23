'use client';
import { Product } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductDrawer({ product, onClose }: { product: Product | null; onClose: () => void; }) {
  return (
    <AnimatePresence>
      {product && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/40" onClick={onClose}>
          <motion.aside
            initial={{ x: 420 }}
            animate={{ x: 0 }}
            exit={{ x: 420 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-950 border-l border-gray-200 dark:border-gray-800 p-6"
            onClick={e => e.stopPropagation()}
          >
            <header className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <button onClick={onClose} className="focus-ring rounded-lg border px-2 py-1">Close</button>
            </header>
            <div className="space-y-2 text-sm">
              <div><span className="opacity-70">Price:</span> ₹{product.price.toFixed(2)}</div>
              <div><span className="opacity-70">Stock:</span> {product.stock}</div>
              <div><span className="opacity-70">Category:</span> {product.category}</div>
              <div><span className="opacity-70">Status:</span> {product.status}</div>
              <div><span className="opacity-70">Vendor:</span> {product.vendor}</div>
              <div className="pt-2 border-t border-gray-200 dark:border-gray-800">
                <span className="opacity-70">Description:</span>
                <p className="mt-1 leading-relaxed">{product.description}</p>
              </div>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}