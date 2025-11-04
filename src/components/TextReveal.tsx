"use client";

import { useEffect, useRef, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useIntro } from '@/contexts/IntroContext'; // ajuster le path

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  children: ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  yOffset?: number;
}

const   TextReveal = ({
  children,
  className = '',
  duration = 0.9,
  delay = 0,
  yOffset = 100
}: TextRevealProps) => {
  const textRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const { introComplete } = useIntro(); // ← Récupère l'état

  useEffect(() => {
    if (!textRef.current || hasAnimated.current || !introComplete) return; // ← Attend que l'intro soit finie

    const element = textRef.current;

    gsap.set(element, {
      opacity: 0,
      y: yOffset
    });

    const animate = () => {
      gsap.to(element, {
        opacity: 1,
        y: 0,
        duration,
        delay: delay,
        ease: 'back.out(0.7)',
        onComplete: () => {
          hasAnimated.current = true;
        }
      });
    };

    const rect = element.getBoundingClientRect();
    const isInViewport = rect.top < window.innerHeight;

    if (isInViewport) {
      animate();
    } else {
      gsap.to(element, {
        opacity: 1,
        y: 0,
        duration,
        delay: delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true,
          onEnter: () => {
            hasAnimated.current = true;
          }
        }
      });
    }
  }, [duration, delay, yOffset, introComplete]); // ← Ajoute introComplete dans les dépendances

  return <div ref={textRef} className={className} style={{opacity: 0}}>{children}</div>;
};

export default TextReveal;