"use client";

import { useState } from "react";
import { useScroll, useTransform } from "framer-motion";
import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import Hero from "./components/landing/Hero";
import WhyItMatters from "./components/landing/WhyItMatters";
import LiveDemo from "./components/landing/LiveDemo";
import Footer from "./components/landing/Footer";

export default function Home() {
  const [showContent, setShowContent] = useState(false);
  const { scrollYProgress } = useScroll();

  // Parallax effects for background elements
  const parallaxY1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const parallaxY2 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  const handlePreloaderComplete = () => {
    setShowContent(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#a8d5e2] via-[#e8f4f8] to-[#fef5e7]">
      <Preloader text="LOADING" onComplete={handlePreloaderComplete} />

      {showContent && (
        <>
          <Navbar />
          <main>
            <Hero />
            <WhyItMatters parallaxY1={parallaxY1} parallaxY2={parallaxY2} />
            <LiveDemo />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}
