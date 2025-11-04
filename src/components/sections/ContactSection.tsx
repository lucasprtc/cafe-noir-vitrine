"use client";
// components/FindUs.tsx

import Button from "../Buttons";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const image1Ref = useRef<HTMLImageElement>(null);
  const image2Ref = useRef<HTMLImageElement>(null);
  const image3Ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial state - images hidden from left
      gsap.set([image1Ref.current, image2Ref.current, image3Ref.current], {
        x: -100,
        y: 40,
        opacity: 0
      });

      // Create the scroll-triggered animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: imageContainerRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });

      // Animate images one after another from left to right
      tl.to(image1Ref.current, {
        x: 0,
        y: 0, 
        opacity: 1,
        duration: 0.6,
        ease: "power2.out"
      })
      .to(image2Ref.current, {
        x: 0,
        y: 0, 
        opacity: 1,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.4")
      .to(image3Ref.current, {
        x: 0,
        y: 0, 
        opacity: 1,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.4");
    });

    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <section id="contact" className="flex flex-col md:gap-9 md:flex-row md:py-[50px] md:px-8">
      <div 
        ref={imageContainerRef}
        className="h-full md:w-[50%] flex flex-col justify-center space-y-3 container-grid pb-9 bg-dark-blue md:py-6 lg:py-10 md:px-[46px] md:rounded relative"
      >
        <img
          ref={image1Ref}
          src="/About/ContactUs.svg" 
          alt="" 
          className="object-cover w-full" 
        />
        <img 
          ref={image2Ref}
          src="/About/ContactUs.svg" 
          alt="" 
          className="object-cover w-full" 
        />
        <img 
          ref={image3Ref}
          src="/About/ContactUs.svg" 
          alt="" 
          className="object-cover w-full" 
        />
      </div>
      <form onSubmit={handleSubmit} className="space-y-2 md:w-[50%] px-4 md:px-0 grid-col-6 py-9 md:py-0 bg-almond">
        <div className="col-span-6 space-y-2 flex flex-col h-full">
          <div className="">
            <label htmlFor="name" className="block font-secondary text-lg text-dark-blue">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full px-4 py-4 md:py-3 border-3 border-light-blue rounded font-primary text-lg text-dark-blue leading-3 focus:border-light-orange focus:outline-none placeholder-dark-blue/60"
              required
            />
          </div>
          <div className="">
            <label htmlFor="email" className="block font-secondary text-lg text-dark-blue">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-4 md:py-3 border-3 border-light-blue rounded font-primary text-lg text-dark-blue leading-3 focus:border-light-orange focus:outline-none placeholder-dark-blue/60"
              required
            />
          </div>
          <div className="">
            <label htmlFor="message" className="block font-secondary text-lg text-dark-blue">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={3}
              placeholder="Enter your message"
              className="w-full px-4 py-4 border-3 border-light-blue rounded font-primary text-lg text-dark-blue focus:border-light-orange focus:outline-none placeholder-dark-blue/60 resize-none"
              required
            />
          </div>
          <div className="flex justify-end">
            <Button submit={true} text="Send Message" href="#" color="lightorange" />
          </div>
        </div>
      </form>
    </section>
  );
}