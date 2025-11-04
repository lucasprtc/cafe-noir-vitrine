"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export type Comment = {
    description: string;
    name: string;
    color: string;
}

interface Comments {
  comments: Comment[];
}

export default function InfiniteSLider({ comments }: Comments) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const scrollVelocityRef = useRef(0);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!trackRef.current) return;

    const totalWidth = trackRef.current.scrollWidth / 2;
    const baseSpeed = 50;

    // Set initial state for cards - hidden and below
    gsap.set(cardsRef.current, {
      y: 50,
      opacity: 0
    });

    // Fade in animation on scroll
    gsap.to(cardsRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: "back.out(1.6)",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });

    // Infinite scroll animation
    tweenRef.current = gsap.to(trackRef.current, {
      x: `-=${totalWidth}`,
      duration: totalWidth / baseSpeed,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
      },
    });

    const onWheel = (e: WheelEvent) => {
      scrollVelocityRef.current += Math.abs(e.deltaY);
    };

    window.addEventListener("wheel", onWheel);

    return () => {
      window.removeEventListener("wheel", onWheel);
      tweenRef.current?.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const doubledImages = [...comments, ...comments];

  return (
    <div
      ref={containerRef}
      className={`w-full overflow-x-hidden py-3 relative flex items-center`}
    >
      <div ref={trackRef} className="flex gap-2 w-fit items-stretch">
        {doubledImages.map((comment, index) => (
          <div
            ref={(el) => { cardsRef.current[index] = el; }}
            className={`w-[230px] lg:w-[440px] rounded-[10px] flex flex-col justify-between gap-2 md:gap-3 py-3 px-4 md:py-6 md:px-8`}
            style={{backgroundColor: comment.color}}
            key={index}
          >
            <div className="flex flex-col gap-1 md:gap-2">
              <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.00429 0V3.64286C5.08154 3.9127 4.12017 4.99206 4.12017 7.62302V7.8254H6.66094V17H0V10.254C0 2.76587 2.67811 0.404765 7.00429 0ZM16 0V3.64286C14.0773 3.9127 13.1159 4.99206 13.1159 7.62302V7.8254H15.6567V17H8.99571V10.254C8.99571 2.76587 11.6738 0.404765 16 0Z" fill="#F49E3E"/>
              </svg>
              <p className="font-primary lg:text-lg text-almond ">{comment.description}</p>
              <svg className="rotate-180 self-end -translate-y-4" width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.00429 0V3.64286C5.08154 3.9127 4.12017 4.99206 4.12017 7.62302V7.8254H6.66094V17H0V10.254C0 2.76587 2.67811 0.404765 7.00429 0ZM16 0V3.64286C14.0773 3.9127 13.1159 4.99206 13.1159 7.62302V7.8254H15.6567V17H8.99571V10.254C8.99571 2.76587 11.6738 0.404765 16 0Z" fill="#F49E3E"/>
              </svg>
            </div>
            <div className="flex flex-row justify-end items-center h-fit">
              <p className="font-secondary text-lg text-almond">{comment.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};