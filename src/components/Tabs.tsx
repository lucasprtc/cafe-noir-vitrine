"use client";
// components/Tabs.tsx
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export type TabItem = {
  name: string;
  price: number | string;
};

export type Tab = {
  title: string;
  items: TabItem[];
};

type TabsProps = {
  tabs: Tab[];
};

export default function Tabs({ tabs }: TabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLUListElement>(null);
  const bordersRef = useRef<HTMLDivElement[]>([]);
  const namesRef = useRef<HTMLSpanElement[]>([]);
  const pricesRef = useRef<HTMLSpanElement[]>([]);
  const bgRef = useRef<HTMLDivElement>(null);

  // Initial scroll animation
  useEffect(() => {
    if (!containerRef.current || hasAnimated) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          setHasAnimated(true);
          animateContent();
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [hasAnimated]);

  // Tab change animation
  useEffect(() => {
    if (hasAnimated) {
      animateColorTransition();
      animateContent();
    }
  }, [activeIndex, hasAnimated]);

  const animateColorTransition = () => {
    if (!bgRef.current) return;

    const ctx = gsap.context(() => {
      // Smooth background color transition
      gsap.to(bgRef.current, {
        backgroundColor: activeIndex === 0 ? "#044799" : "#AAD0F0", // Replace with your actual color values
        color: activeIndex === 0 ? "#FFF5EA" : "#044799", // Replace with your actual color values
        duration: 0.4,
        ease: "power2.inOut",
      });

      // Animate borders color change
      const borders = bordersRef.current.filter(Boolean);
      gsap.to(borders, {
        backgroundColor: activeIndex === 0 ? "#FFF5EA" : "#044799", // Replace with your actual color values
        duration: 0.4,
        ease: "power2.inOut",
      });
    }, contentRef);

    return () => ctx.revert();
  };

  const animateContent = () => {
    const borders = bordersRef.current.filter(Boolean);
    const names = namesRef.current.filter(Boolean);
    const prices = pricesRef.current.filter(Boolean);
    
    if (borders.length === 0) return;

    const ctx = gsap.context(() => {
      // Animate border divs from left to right (width expansion)
      gsap.fromTo(
        borders,
        {
          scaleX: 0,
          transformOrigin: "left center",
        },
        {
          scaleX: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
        }
      );

      // Animate names from bottom with fade in
      gsap.fromTo(
        names,
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          delay: 0.1,
        }
      );

      // Animate prices from bottom with fade in
      gsap.fromTo(
        prices,
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          delay: 0.15,
        }
      );
    }, contentRef);

    return () => ctx.revert();
  };

  const getTabButtonClass = (index: number, isActive: boolean) => {
    if (index === 0) {
      return isActive
        ? "bg-dark-blue text-almond"
        : "bg-transparent border-t-3 border-l-3 border-r-3 border-dark-blue text-dark-blue";
    } else if (index === 1) {
      return isActive
        ? "bg-light-blue text-almond"
        : "bg-transparent border-t-3 border-l-3 border-r-3 border-light-blue text-dark-blue";
    }
    return isActive
      ? "bg-dark-blue text-almond"
      : "bg-transparent border-t-3 border-l-3 border-r-3 border-dark-blue text-dark-blue";
  };

  return (
    <div className="w-full" ref={containerRef}>
      <div className="grid-layout grid-gap container-grid ">
        {tabs.map((tab, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={tab.title}
              onClick={() => setActiveIndex(index)}
              className={`col-span-3 cursor-pointer md:col-span-5 lg:col-span-3 text-lg md:text-2xl font-primary rounded-t-[10px] py-4 leading-5 md:leading-10 transition-colors ${getTabButtonClass(
                index,
                isActive
              )}`}
            >
              {tab.title}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <div
        ref={bgRef}
        className={`grid-layout px-4 md:px-[36px ] lg:px-20 md:text-xl grid-gap pb-9 ${
          activeIndex === 0 ? "bg-dark-blue text-almond" : "bg-light-blue text-dark-blue"
        }`}
      >
        {tabs[activeIndex].items.length === 0 ? (
          <p className="text-gray-500 col-span-6 md:col-span-12">No items available</p>
        ) : (
          <ul ref={contentRef} className={`flex flex-col gap-4 py-10 col-span-6 md:col-span-12`}>
            {tabs[activeIndex].items.map((item, idx) => (
              <li
                key={`${item.name}-${activeIndex}`}
                className="py-2"
              >
                <div className="flex justify-between mb-2">
                  <span 
                    ref={(el) => {
                      if (el) namesRef.current[idx] = el;
                    }}
                    className="font-primary"
                  >
                    {item.name}
                  </span>
                  <span 
                    ref={(el) => {
                      if (el) pricesRef.current[idx] = el;
                    }}
                    className="font-primary"
                  >
                    {typeof item.price === "number" ? `${item.price.toFixed(2)}€` : item.price}
                  </span>
                </div>
                <div
                  ref={(el) => {
                    if (el) bordersRef.current[idx] = el;
                  }}
                  className={`h-px md:h-0.5 w-full ${
                    activeIndex === 0 ? "bg-almond" : "bg-dark-blue"
                  }`}
                />
              </li>
            ))}
          </ul>
        )}
        <img
          src="/About/mascot.png"
          className="col-span-2 md:col-span-3 lg:col-span-2 md:col-start-4 lg:col-start-7"
          alt=""
        />
        <img src="/About/mascot.png" className="col-span-2 md:col-span-3 lg:col-span-2" alt="" />
        <img src="/About/mascot.png" className="col-span-2 md:col-span-3 lg:col-span-2" alt="" />
      </div>
    </div>
  );
}