import { motion, AnimatePresence } from 'framer-motion';
import { useContactForm } from '../../hooks/useContactForm';
import { serviceOptions } from '../../data/content';
import { SuccessPopup } from './SuccessPopup';
import { ErrorPopup } from './ErrorPopup';

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const inputClass =
  'w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-transparent focus:outline-none focus:border-bb-accent/50 glow-input transition-colors peer';
const labelClass =
  'absolute left-4 top-3 text-bb-gray-500 text-sm transition-all duration-200 pointer-events-none peer-focus:top-[-0.6rem] peer-focus:left-3 peer-focus:text-[0.65rem] peer-focus:text-bb-accent peer-focus:bg-[#0a0a0a] peer-focus:px-1 peer-[:not(:placeholder-shown)]:top-[-0.6rem] peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:text-[0.65rem] peer-[:not(:placeholder-shown)]:text-bb-accent peer-[:not(:placeholder-shown)]:bg-[#0a0a0a] peer-[:not(:placeholder-shown)]:px-1';

export function ContactFormModal({ isOpen, onClose }: ContactFormModalProps) {
  const {
    formData,
    isSubmitting,
    showSuccess,
    showError,
    popupMessage,
    handleChange,
    handleSubmit,
    setShowSuccess,
    setShowError,
  } = useContactForm();

  const onSubmit = async (e: React.FormEvent) => {
    const success = await handleSubmit(e);
    if (success) onClose();
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={onClose}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative glass-strong rounded-3xl p-6 sm:p-8 md:p-10 w-full max-w-lg max-h-[90vh] overflow-y-auto glow-border"
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <h3 className="text-2xl md:text-3xl font-light text-white mb-2">
                Start Your Project
              </h3>
              <p className="text-bb-gray-400 mb-8 text-sm">
                Tell us about your needs and we'll get back to you within 24 hours.
              </p>

              <form onSubmit={onSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      placeholder=" "
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={inputClass}
                    />
                    <label className={labelClass}>Full Name *</label>
                  </div>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      placeholder=" "
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={inputClass}
                    />
                    <label className={labelClass}>Email Address *</label>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="relative">
                    <input
                      type="text"
                      name="company"
                      placeholder=" "
                      value={formData.company}
                      onChange={handleChange}
                      className={inputClass}
                    />
                    <label className={labelClass}>Company</label>
                  </div>
                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      placeholder=" "
                      value={formData.phone}
                      onChange={handleChange}
                      className={inputClass}
                    />
                    <label className={labelClass}>Phone Number</label>
                  </div>
                </div>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-bb-accent/50 glow-input transition-colors appearance-none"
                >
                  <option value="" className="bg-bb-dark">Select Service</option>
                  {serviceOptions.map((opt) => (
                    <option key={opt} value={opt} className="bg-bb-dark">
                      {opt}
                    </option>
                  ))}
                </select>
                <div className="relative">
                  <textarea
                    name="message"
                    placeholder=" "
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className={`${inputClass} resize-none`}
                  />
                  <label className={labelClass}>Tell us about your project *</label>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-bb-accent/20 border border-bb-accent/60 text-bb-accent hover:bg-bb-accent/30 rounded-xl font-mono font-medium glow-btn transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Inquiry'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <SuccessPopup
        isOpen={showSuccess}
        message={popupMessage}
        onClose={() => setShowSuccess(false)}
      />
      <ErrorPopup
        isOpen={showError}
        message={popupMessage}
        onClose={() => setShowError(false)}
      />
    </>
  );
}
