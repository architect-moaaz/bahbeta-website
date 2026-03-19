import type {
  HeroContent,
  Service,
  Testimonial,
  NFCProduct,
  Industry,
  ProcessStep,
  Differentiator,
  TeamMember,
} from '../types';

export const heroContent: HeroContent = {
  title: 'Technology That Moves Your Business Forward',
  subtitle: 'Custom Solutions. Global Standards. Local Expertise.',
  description:
    'From mobile apps to AI-powered solutions, from secure payment gateways to smart NFC cards — BahBeta transforms your digital vision into reality.',
  stats: [
    { number: '50+', label: 'Projects Delivered' },
    { number: '15+', label: 'Years Experience' },
    { number: '500+', label: 'Happy Clients' },
    { number: '24/7', label: 'Support Available' },
  ],
};

export const coreSolutions: Service[] = [
  {
    title: 'IT & AI Solutions',
    subtitle: 'Intelligent Technology at Scale',
    description:
      'From cutting-edge AI development to complex enterprise platforms and intelligent operational automation, Bahbeta delivers transformative technology solutions that drive efficiency, scalability, and measurable business impact.',
    features: [
      'Custom Software Development',
      'AI & Machine Learning',
      'Cloud Infrastructure',
      'Cybersecurity Advisory',
    ],
    icon: 'laptop',
  },
  {
    title: 'Mobile & App Development',
    subtitle: 'Cross-Platform Excellence',
    description:
      'Custom mobile and web applications tailored to your business goals. From iOS and Android to responsive web apps, we create seamless experiences across all devices.',
    features: [
      'Cross-Platform Development',
      'User-Centric Design',
      'Agile Delivery',
      'Scalable Architecture',
    ],
    icon: 'phone',
  },
  {
    title: 'Banking & FinTech Solutions',
    subtitle: 'Payment Systems',
    description:
      'Deep domain expertise across core banking and digital banking platforms, card issuing and merchant acquiring, digital wallets, open banking frameworks, BNPL ecosystems, and end-to-end trade finance solutions\u2014delivering globally benchmarked, secure, and scalable financial infrastructure.',
    features: [
      'Core & Digital Banking',
      'Card Issuing & Acquiring',
      'Digital Wallets & Open Banking',
      'BNPL & Trade Finance',
    ],
    icon: 'bank',
  },
  {
    title: 'POS & Gateway Solutions',
    subtitle: 'Redefining Digital Payments',
    description:
      'Smart POS systems and secure payment gateways supporting all major card schemes. Redefining digital payments with secure, scalable financial ecosystems for retail, restaurants, and online businesses.',
    features: [
      'All Card Schemes',
      'Real-time Tracking',
      '24/7 Support',
      'PCI-DSS Compliant',
    ],
    icon: 'storefront',
  },
  {
    title: 'NFC Business Cards',
    subtitle: 'Modern Networking Redefined',
    description:
      'Premium Metal and PVC NFC cards that share your digital profile with just a tap. Eco-friendly, customizable, and perfect for making lasting impressions.',
    features: [
      'One Tap Connection',
      'Fully Customizable',
      'Eco-Friendly',
      'Real-time Updates',
    ],
    icon: 'credit-card',
  },
  {
    title: 'GenAI Training',
    subtitle: 'Enterprise AI Enablement',
    description:
      'Comprehensive generative AI training programs designed for enterprises. Empower your teams with hands-on LLM, prompt engineering, and AI integration skills to drive innovation.',
    features: [
      'LLM & Prompt Engineering',
      'Custom AI Workshops',
      'Enterprise Integration',
      'Hands-on Training',
    ],
    icon: 'robot',
  },
];

export const itServices: Service[] = [
  {
    title: 'AI, ML, AR & VR Development',
    subtitle: 'Next-Gen Technologies',
    description:
      'Harness AI, Machine Learning, Augmented Reality, and Virtual Reality to solve real-world challenges and unlock new growth opportunities.',
    features: [
      'Custom AI Solutions',
      'Immersive Experiences',
      'Industry-Specific',
      'Future-Ready',
    ],
    icon: 'robot',
  },
  {
    title: 'Cybersecurity Advisory',
    subtitle: 'Guiding Your Digital Security',
    description:
      'Expert cybersecurity consulting and management through licensed partners. We simplify security decisions while ensuring compliance and protection.',
    features: [
      'Licensed Partners',
      'Compliance Guidance',
      'Risk Assessment',
      'Incident Response',
    ],
    icon: 'shield',
  },
  {
    title: 'ERP, CRM & Cloud Services',
    subtitle: 'Digital Transformation Simplified',
    description:
      'Strategic partnerships with AWS, Oracle, and Microsoft to deliver the right ERP, CRM, and cloud solutions with ongoing managed services.',
    features: [
      'Vendor-neutral Advice',
      'Implementation Oversight',
      '24/7 Monitoring',
      'Global Standards',
    ],
    icon: 'cloud',
  },
  {
    title: 'Data Analytics & BI',
    subtitle: 'Insights That Drive Growth',
    description:
      'Transform raw data into actionable insights with custom dashboards, predictive analytics, and business intelligence solutions.',
    features: [
      'Custom Dashboards',
      'Predictive Analytics',
      'Real-time Reporting',
      'Data Integration',
    ],
    icon: 'chart',
  },
  {
    title: 'IT Consulting & Strategy',
    subtitle: 'Your Technology Partner',
    description:
      'Strategic IT consulting to align your technology investments with business goals. From roadmap planning to vendor selection, we guide your digital journey.',
    features: [
      'Technology Roadmaps',
      'Vendor Selection',
      'Digital Strategy',
      'Change Management',
    ],
    icon: 'target',
  },
];

export const nfcProducts: NFCProduct[] = [
  {
    type: 'metal',
    title: 'Metal NFC Card',
    subtitle: 'Premium Executive',
    description:
      'Sleek stainless-steel NFC card with laser-engraved branding. The ultimate statement of sophistication for executives and premium brands.',
    features: [
      'Stainless Steel Construction',
      'Laser-Engraved Branding',
      'NFC + QR Code Dual Access',
      'Custom Color Finishes',
      'Lifetime Durability',
      'Digital Profile Dashboard',
    ],
    price: 'From BHD 25',
  },
  {
    type: 'pvc',
    title: 'PVC NFC Card',
    subtitle: 'Smart Professional',
    description:
      'Durable, lightweight PVC NFC cards with full-color printing. Cost-effective solution for teams and brands who want to go digital.',
    features: [
      'Full-Color Printing',
      'Lightweight & Durable',
      'NFC + QR Code Dual Access',
      'Bulk Order Discounts',
      'Fast Turnaround',
      'Digital Profile Dashboard',
    ],
    price: 'From BHD 11',
  },
];

export const posFeatures = {
  terminal: {
    title: 'Smart POS Terminals',
    subtitle: 'Modern Payment Hardware',
    description:
      'State-of-the-art POS terminals supporting contactless, chip, and swipe payments. Built for speed, reliability, and ease of use.',
    features: [
      'Contactless & Chip Payments',
      'Built-in Receipt Printer',
      'Wi-Fi & 4G Connectivity',
      'Inventory Management',
      'Staff Access Controls',
      'Daily Sales Reports',
    ],
  },
  gateway: {
    title: 'Payment Gateway',
    subtitle: 'Seamless Online Payments',
    description:
      'Secure payment gateway supporting all major card schemes, digital wallets, and local payment methods in Bahrain and the GCC.',
    features: [
      'All Major Card Schemes',
      'BenefitPay Integration',
      '3D Secure Authentication',
      'PCI-DSS Level 1',
      'Real-time Settlement',
      'Developer-Friendly API',
    ],
  },
};

export const differentiators: Differentiator[] = [
  {
    icon: 'trophy',
    title: '15+ Years Experience',
    description:
      'Deep expertise in IT, payments, and digital solutions built over more than a decade in the Bahrain market.',
  },
  {
    icon: 'handshake',
    title: 'Local Expertise',
    description:
      'We understand Bahrain\'s business landscape, regulations, and cultural nuances — delivering solutions that work here.',
  },
  {
    icon: 'bolt',
    title: '24/7 Support',
    description:
      'Round-the-clock support including late nights and weekends. Our team responded to a client at 2:45 AM.',
  },
  {
    icon: 'lock',
    title: 'Enterprise Security',
    description:
      'PCI-DSS compliant infrastructure, licensed cybersecurity partners, and industry-leading data protection standards.',
  },
  {
    icon: 'globe',
    title: 'Global Standards',
    description:
      'Partnerships with AWS, Oracle, Microsoft, and international payment networks to deliver world-class solutions.',
  },
  {
    icon: 'rocket',
    title: 'End-to-End Delivery',
    description:
      'From strategy and design to development, deployment, and ongoing support — we own the entire journey.',
  },
];

export const industries: Industry[] = [
  {
    icon: 'bank',
    title: 'Banking & Finance',
    description: 'Core banking advisory, card issuance, acquiring, and digital banking solutions.',
  },
  {
    icon: 'cart',
    title: 'Retail & E-Commerce',
    description: 'POS systems, online stores, inventory management, and omnichannel experiences.',
  },
  {
    icon: 'utensils',
    title: 'Restaurants & F&B',
    description: 'Smart POS, online ordering, kitchen display systems, and loyalty programs.',
  },
  {
    icon: 'hospital',
    title: 'Healthcare',
    description: 'Patient management, telemedicine, secure data handling, and compliance solutions.',
  },
  {
    icon: 'building',
    title: 'Real Estate',
    description: 'Property management platforms, CRM systems, and virtual tour technologies.',
  },
  {
    icon: 'graduation',
    title: 'Education',
    description: 'E-learning platforms, student management, and digital campus solutions.',
  },
  {
    icon: 'government',
    title: 'Government',
    description: 'Digital transformation, citizen services, and secure infrastructure modernization.',
  },
];

export const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: 'Discovery',
    description: 'We listen, analyze your business needs, and define clear objectives and success metrics.',
    icon: 'search',
  },
  {
    step: 2,
    title: 'Strategy',
    description: 'Our team designs a tailored roadmap with timelines, milestones, and technology recommendations.',
    icon: 'clipboard',
  },
  {
    step: 3,
    title: 'Development',
    description: 'Agile development with regular demos, feedback loops, and iterative improvements.',
    icon: 'cog',
  },
  {
    step: 4,
    title: 'Deployment',
    description: 'Rigorous testing, smooth deployment, and comprehensive training for your team.',
    icon: 'rocket',
  },
  {
    step: 5,
    title: 'Support',
    description: 'Ongoing 24/7 monitoring, maintenance, and continuous optimization post-launch.',
    icon: 'shield',
  },
];

export const testimonials: Testimonial[] = [
  {
    icon: 'bank',
    service: 'Premium Metal NFC Cards',
    company: 'Leading Retail Bank',
    testimonial:
      'Our executives wanted something that reflected the sophistication of our brand — and Bahbeta delivered exactly that. The metal NFC business cards are not just sleek and premium, they\'re also functional and future-forward. A perfect representation of who we are. Exceptional service from design to delivery!',
    author: 'Head of Corporate Communications',
    organization: 'Bahrain-based Retail Bank',
  },
  {
    icon: 'wrench',
    service: 'PVC NFC Cards',
    company: 'Tyres & Oil Market Leader',
    testimonial:
      'For our nationwide team across garages and service points, we needed smart, durable, and affordable business cards. Bahbeta\'s PVC NFC cards were the ideal solution. They\'re easy to update, help our staff connect with customers instantly, and look great. Highly recommended for industrial brands like ours!',
    author: 'Chief Executive Officer',
    organization: 'Leading Tyres & Oil Company in Bahrain',
  },
  {
    icon: 'credit-card',
    service: 'Point-of-Sale Solutions',
    company: 'Restaurant Chain Owner',
    testimonial:
      'Bahbeta\'s POS system completely transformed how we handle in-store payments. What impressed us most? Their late-night support — even when we had an issue at 2:45 AM, they were there. This is the kind of partner every business needs — reliable, responsive, and always one step ahead.',
    author: 'Founder & CEO',
    organization: 'Local Restaurant Group, Bahrain',
  },
  {
    icon: 'government',
    service: 'Core Banking Advisory',
    company: 'Digital Transformation for a Bank',
    testimonial:
      'Bahbeta played a vital role in advising our team during the early stages of our core banking transformation. From mapping requirements to facilitating communication with international vendors, their support was strategic, efficient, and rooted in local market insight. A trusted extension of our technology team.',
    author: 'Chief Technology Officer',
    organization: 'Tier-2 Bank in Bahrain',
  },
  {
    icon: 'briefcase',
    service: 'Card & Acquiring Negotiation',
    company: 'Strategic Setup Support',
    testimonial:
      'We engaged Bahbeta during a crucial phase of negotiating our card issuance and acquiring processing partnerships. Their understanding of both local and regional players made all the difference. They helped us secure the right deal, at the right time, with the right partners — seamlessly.',
    author: 'Group Head of Cards',
    organization: 'Regional Banking Institution',
  },
];

export const teamMembers: TeamMember[] = [
  {
    name: 'Sonu Ibrahim',
    role: 'Founder, CEO',
    expertise: 'Banking & Payments',
    description:
      'An accomplished leader with 16+ years of experience in Banking & Payments, bringing extensive expertise in launching products across payment processing, acquiring, issuing, wallets, mobile banking, super apps, contact center solutions, eCommerce, and AI-enabled platforms. Managed portfolios exceeding $10B+ in transactions and $20+ million in revenue across the GCC, East Africa, and beyond.',
    image: '/team/sonu-ibrahim.png',
  },
  {
    name: 'Dilshad Rasheed',
    role: 'Co-Founder, CBO',
    expertise: 'Business Development & Revenue',
    description:
      'Leverages over 12+ years of experience in Business Development and Revenue Generation, including roles as Head of Business and Country Branch Manager. Successfully managed portfolios surpassing $480M annually in global remittances and over $2B+ in merchant acquiring. A technology-driven business leader passionate about leveraging cutting-edge digital and AI-powered solutions.',
    image: '/team/dilshad-rasheed.png',
  },
  {
    name: 'Zeeshan Abdullah',
    role: 'Co-Founder, COO',
    expertise: 'Operations & Strategy',
    description:
      'A dynamic operations leader driving strategic growth and operational excellence at BahBeta. With a strong background in business operations, project management, and cross-functional team leadership, Zeeshan ensures seamless execution of technology solutions and client delivery across all verticals.',
    image: '/team/zeeshan-abdullah.png',
  },
];

export const companyInfo = {
  name: 'Bahbeta W.L.L.',
  tagline: 'Technology Solutions',
  email: 'support@bahbeta.com',
  phone: '+973 3316 5647',
  phoneSecondary: '+973 3677 2570',
  address: 'Office #2211, Bldg #747, Road #1124, Block #311',
  city: 'Manama, Kingdom of Bahrain',
  founded: '2009',
  social: {
    linkedin: 'https://linkedin.com/company/bahbeta',
    twitter: 'https://twitter.com/bahbeta',
  },
};

export const serviceOptions = [
  'IT & AI Solutions',
  'Mobile & App Development',
  'POS & Gateway Solutions',
  'NFC Business Cards',
  'GenAI Training',
  'Banking & FinTech Solutions',
  'Cybersecurity Advisory',
  'ERP, CRM & Cloud Services',
  'AI, ML, AR & VR Development',
  'Data Analytics & BI',
  'IT Consulting & Strategy',
  'Other',
];
