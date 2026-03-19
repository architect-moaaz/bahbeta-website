export interface Service {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  icon: string;
}

export interface Testimonial {
  icon: string;
  service: string;
  company: string;
  testimonial: string;
  author: string;
  organization: string;
}

export interface HeroContent {
  title: string;
  subtitle: string;
  description: string;
  stats: { number: string; label: string }[];
}

export interface NavItem {
  label: string;
  sectionId: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  service: string;
  message: string;
}

export interface NFCProduct {
  type: 'metal' | 'pvc';
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  price: string;
}

export interface Industry {
  icon: string;
  title: string;
  description: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  icon: string;
}

export interface Differentiator {
  icon: string;
  title: string;
  description: string;
}

export interface TeamMember {
  name: string;
  role: string;
  expertise: string;
  description: string;
  image?: string;
}
