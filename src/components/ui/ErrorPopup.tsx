import { motion, AnimatePresence } from 'framer-motion';

interface ErrorPopupProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
}

export function ErrorPopup({ isOpen, message, onClose }: ErrorPopupProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-black/60" onClick={onClose} />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative glass-strong rounded-3xl p-8 sm:p-10 max-w-md text-center"
          >
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-white mb-3">Something Went Wrong</h3>
            <p className="text-bb-gray-400 mb-8 text-sm">{message}</p>
            <button
              onClick={onClose}
              className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-medium transition-colors"
            >
              Try Again
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
