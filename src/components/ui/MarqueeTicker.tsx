const KEYWORDS = [
  'Artificial Intelligence',
  'Cloud Computing',
  'NFC Technology',
  'Payment Gateways',
  'Cybersecurity',
  'Machine Learning',
  'Data Analytics',
  'Mobile Development',
  'AR / VR',
  'POS Systems',
  'Digital Transformation',
  'Blockchain',
];

export function MarqueeTicker() {
  // Double the list for seamless loop
  const items = [...KEYWORDS, ...KEYWORDS];

  return (
    <div className="py-8 overflow-hidden border-y border-bb-accent/10">
      <div className="marquee-track">
        {items.map((word, i) => (
          <span
            key={i}
            className="inline-block px-6 text-sm font-mono text-bb-gray-500 uppercase tracking-widest whitespace-nowrap"
          >
            {word}
            <span className="ml-6 text-bb-accent/30">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
