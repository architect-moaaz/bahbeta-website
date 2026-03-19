import { useEffect, useState } from 'react';

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[2px] z-[60]">
      <div
        className="h-full bg-bb-accent transition-none"
        style={{
          width: `${progress * 100}%`,
          boxShadow: '0 0 8px #0084FF, 0 0 16px rgba(0, 132, 255, 0.4)',
        }}
      />
    </div>
  );
}
