import { useState } from 'react';
import { motion } from 'framer-motion';

// Simple EmailJS alternative that works immediately
// No backend setup required

interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  service: string;
  message: string;
}

export function EmailJSContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // For immediate deployment, use Formspree (free service)
    const formspreeEndpoint = 'https://formspree.io/f/YOUR_FORM_ID'; // Replace with your Formspree form ID
    
    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          phone: formData.phone,
          service: formData.service,
          message: formData.message,
          _replyto: formData.email,
          _subject: `New inquiry from ${formData.name}`,
        }),
      });

      if (response.ok) {
        alert('Thank you! Your message has been sent successfully.');
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          service: '',
          message: ''
        });
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      alert('Please email us directly at support@bahbeta.com or call +973 33283222');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <motion.div className="max-w-2xl mx-auto p-8 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20">
      <h3 className="text-3xl font-light text-white mb-8">Contact BahBeta</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name *"
            required
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address *"
            required
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Company"
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
          />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
          />
        </div>

        <select
          name="service"
          value={formData.service}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-400"
        >
          <option value="" className="bg-gray-900">Select a service</option>
          <option value="mobile-web" className="bg-gray-900">Mobile & Web Development</option>
          <option value="pos-payment" className="bg-gray-900">POS & Payment Solutions</option>
          <option value="nfc-cards" className="bg-gray-900">NFC Business Cards</option>
          <option value="cybersecurity" className="bg-gray-900">Cybersecurity Advisory</option>
          <option value="erp-crm" className="bg-gray-900">ERP, CRM & Cloud Services</option>
          <option value="ai-ml" className="bg-gray-900">AI, ML, AR & VR Development</option>
          <option value="consultation" className="bg-gray-900">General Consultation</option>
        </select>

        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          placeholder="Tell us about your project..."
          required
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 resize-none"
        />

        <motion.button
          type="submit"
          className="w-full px-8 py-4 bg-blue-600 text-white rounded-xl font-medium text-lg hover:bg-blue-700 transition-all duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Send Message
        </motion.button>
      </form>
    </motion.div>
  );
}