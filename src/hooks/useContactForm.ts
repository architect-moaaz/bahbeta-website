import { useState } from 'react';
import type { ContactFormData } from '../types';
import { trackContactFormSubmit } from '../utils/analytics';

const initialFormData: ContactFormData = {
  name: '',
  email: '',
  company: '',
  phone: '',
  service: '',
  message: '',
};

export function useContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        trackContactFormSubmit({
          service: formData.service,
          company: formData.company,
        });
        setPopupMessage(
          result.message ||
            'Thank you for your inquiry! We will contact you within 24 hours.'
        );
        setShowSuccess(true);
        setFormData(initialFormData);
        return true;
      } else {
        setPopupMessage(
          result.message ||
            'Failed to send message. Please try again or contact us directly at support@bahbeta.com'
        );
        setShowError(true);
        return false;
      }
    } catch {
      setPopupMessage(
        'Failed to send message. Please try again or contact us directly at support@bahbeta.com'
      );
      setShowError(true);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    isSubmitting,
    showSuccess,
    showError,
    popupMessage,
    handleChange,
    handleSubmit,
    setShowSuccess,
    setShowError,
  };
}
