import type { NavItem } from '../types';

export const navItems: NavItem[] = [
  { label: 'Solutions', sectionId: 'solutions' },
  { label: 'Products', sectionId: 'products' },
  { label: 'Why Us', sectionId: 'why-choose' },
  { label: 'Our Team', sectionId: 'our-team' },
  { label: 'Contact', sectionId: 'contact' },
];

export const sectionIds = {
  hero: 'hero',
  solutions: 'solutions',
  products: 'products',
  whyChoose: 'why-choose',
  ourTeam: 'our-team',
  testimonials: 'testimonials',
  contact: 'contact',
  privacy: 'privacy',
} as const;
