import React, { useState, useEffect, useRef } from 'react';

export default function AnimatedCounter({
  end = 0,
  duration = 1600,
  prefix = '',
  suffix = '',
  separator = true,
  immediate = false
}) {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    let animId = null;

    const startAnimation = () => {
      if (hasAnimated.current) return;
      hasAnimated.current = true;
      let startTime = null;

      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease out cubic
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentVal = Math.round(easeOut * end);
        setCount(currentVal);

        if (progress < 1) {
          animId = requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };

      animId = requestAnimationFrame(animate);
    };

    if (immediate) {
      startAnimation();
      return () => {
        if (animId) cancelAnimationFrame(animId);
      };
    }

    if (typeof IntersectionObserver === 'undefined') {
      startAnimation();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          startAnimation();
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
      if (animId) cancelAnimationFrame(animId);
    };
  }, [end, duration, immediate]);

  const displayCount = separator ? count.toLocaleString() : count;

  return (
    <span ref={elementRef} className="animated-counter-value">
      {prefix}{displayCount}{suffix}
    </span>
  );
}
