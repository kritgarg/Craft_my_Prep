"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Home() {
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [showResourcesMenu, setShowResourcesMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const parallaxY1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const parallaxY2 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 2000);
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden" style={{
      background: "linear-gradient(180deg, #a8d5e2 0%, #e8f4f8 50%, #fef5e7 100%)",
    }}>
        <>
        <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="sticky top-0 z-50 px-4 sm:px-8 py-4"
        onMouseLeave={() => {
          setShowMegaMenu(false);
          setShowResourcesMenu(false);
        }}
      >
        <div className="w-full max-w-4xl mx-auto relative px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-full w-full">
            <motion.div
              className="absolute inset-0 opacity-20 rounded-full"
              animate={{
                background: [
                  "linear-gradient(135deg, rgba(168, 213, 186, 0.2) 0%, rgba(123, 168, 212, 0.2) 100%)",
                  "linear-gradient(135deg, rgba(123, 168, 212, 0.2) 0%, rgba(212, 197, 169, 0.2) 100%)",
                  "linear-gradient(135deg, rgba(212, 197, 169, 0.2) 0%, rgba(168, 213, 186, 0.2) 100%)",
                  "linear-gradient(135deg, rgba(168, 213, 186, 0.2) 0%, rgba(123, 168, 212, 0.2) 100%)",
                ],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            
            <main className="relative z-10 pt-4 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto bg-white  h-15">
              <motion.div
                className="absolute inset-0 opacity-20 rounded-full"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent)",
                }}
                animate={{
                  x: ["-100%", "200%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                  repeatDelay: 2,
                }}
              />

              <div className="flex justify-between items-center relative z-10 ">
                <motion.div 
                  className="flex items-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <motion.div 
                    className="w-7 h-7 rounded-lg flex items-center justify-center shadow-sm relative overflow-hidden"
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#a8d5ba] to-[#7ba8d4]" />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent"
                      animate={{
                        rotate: [0, 360],
                      }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    />
                    <span className="text-sm relative z-10">✨</span>
                  </motion.div>
                  <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 bg-clip-text text-transparent tracking-tight">
                    Craft My Prep
                  </h1>
                </motion.div>

                <nav className="hidden md:flex items-center gap-0.5">
                  <motion.button
                    onMouseEnter={() => {
                      setShowMegaMenu(true);
                      setShowResourcesMenu(false);
                    }}
                    className="px-3 py-1.5 text-xs font-medium text-gray-700 hover:text-gray-900 rounded-full hover:bg-white/40 transition-colors"
                  >
                    Features
                  </motion.button>
                  <motion.button
                    onMouseEnter={() => {
                      setShowResourcesMenu(true);
                      setShowMegaMenu(false);
                    }}
                    className="px-3 py-1.5 text-xs font-medium text-gray-700 hover:text-gray-900 rounded-full hover:bg-white/40 transition-colors"
                  >
                    Resources
                  </motion.button>
                  <a href="/blog" className="px-3 py-1.5 text-xs font-medium text-gray-700 hover:text-gray-900 rounded-full hover:bg-white/40 transition-colors">
                    Blog
                  </a>
                  <a href="/about" className="px-3 py-1.5 text-xs font-medium text-gray-700 hover:text-gray-900 rounded-full hover:bg-white/40 transition-colors">
                    About
                  </a>
                </nav>

                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden p-2 rounded-lg hover:bg-white/40 transition-colors"
                >
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {mobileMenuOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>

                <div className="hidden md:flex items-center gap-2">
                  <Link href="/login">
                    <motion.button 
                      whileHover={{ scale: 1.05, y: -1 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 rounded-full text-xs font-medium text-gray-800 relative overflow-hidden group cursor-pointer"
                      style={{
                        background: "rgba(255, 255, 255, 0.5)",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(255, 255, 255, 0.8)",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.9)",
                      }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.6 }}
                      />
                      <span className="relative z-10">Login</span>
                    </motion.button>
                  </Link>
                  
                  <Link href="/generate">
                    <motion.button 
                      whileHover={{ scale: 1.05, y: -1 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-1.5 rounded-full text-xs font-semibold text-white relative overflow-hidden group cursor-pointer"
                      style={{
                        background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
                        backdropFilter: "blur(10px)",
                        boxShadow: "0 2px 12px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                      }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.6 }}
                      />
                      <span className="relative z-10">Try Free</span>
                    </motion.button>
                  </Link>
                </div>
              </div>
            </main>

            {showMegaMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 right-0 mt-2"
                onMouseEnter={() => setShowMegaMenu(true)}
                onMouseLeave={() => setShowMegaMenu(false)}
              >
                <div 
                  className="rounded-2xl border border-white/50 p-6"
                  style={{
                    background: "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(30px) saturate(180%)",
                    WebkitBackdropFilter: "blur(30px) saturate(180%)",
                    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
                  }}
                >
                  <div className="grid grid-cols-3 gap-4 max-w-5xl mx-auto">
                    <motion.a
                      href="/generate"
                      whileHover={{ scale: 1.02, y: -2 }}
                      className="p-4 rounded-xl bg-gradient-to-br from-[#a8d5ba]/20 to-[#a8d5ba]/5 hover:from-[#a8d5ba]/30 hover:to-[#a8d5ba]/10 transition-all group"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#a8d5ba] flex items-center justify-center text-xl shadow-md">
                          🎯
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 mb-1 group-hover:text-[#68a063] transition-colors">
                            AI Interview Prep
                          </h3>
                          <p className="text-sm text-gray-600">
                            Personalized practice sessions
                          </p>
                        </div>
                      </div>
                    </motion.a>

                    <motion.a
                      href="/leaderboard"
                      whileHover={{ scale: 1.02, y: -2 }}
                      className="p-4 rounded-xl bg-gradient-to-br from-[#7ba8d4]/20 to-[#7ba8d4]/5 hover:from-[#7ba8d4]/30 hover:to-[#7ba8d4]/10 transition-all group"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#7ba8d4] flex items-center justify-center text-xl shadow-md">
                          📊
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 mb-1 group-hover:text-[#5b88b4] transition-colors">
                            Skill Assessment
                          </h3>
                          <p className="text-sm text-gray-600">
                            Track your progress
                          </p>
                        </div>
                      </div>
                    </motion.a>

                    <motion.a
                      href="/generate"
                      whileHover={{ scale: 1.02, y: -2 }}
                      className="p-4 rounded-xl bg-gradient-to-br from-[#d4c5a9]/20 to-[#d4c5a9]/5 hover:from-[#d4c5a9]/30 hover:to-[#d4c5a9]/10 transition-all group"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#d4c5a9] flex items-center justify-center text-xl shadow-md">
                          🎤
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 mb-1 group-hover:text-[#b4a589] transition-colors">
                            Mock Interviews
                          </h3>
                          <p className="text-sm text-gray-600">
                            Real-time feedback
                          </p>
                        </div>
                      </div>
                    </motion.a>

                    <motion.a
                      href="/generate"
                      whileHover={{ scale: 1.02, y: -2 }}
                      className="p-4 rounded-xl bg-gradient-to-br from-[#ffd9a3]/20 to-[#ffd9a3]/5 hover:from-[#ffd9a3]/30 hover:to-[#ffd9a3]/10 transition-all group"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#ffd9a3] flex items-center justify-center text-xl shadow-md">
                          📄
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 mb-1 group-hover:text-[#dfb983] transition-colors">
                            Resume Builder
                          </h3>
                          <p className="text-sm text-gray-600">
                            ATS-optimized templates
                          </p>
                        </div>
                      </div>
                    </motion.a>

                    <motion.a
                      href="/generate"
                      whileHover={{ scale: 1.02, y: -2 }}
                      className="p-4 rounded-xl bg-gradient-to-br from-[#c7f0d8]/20 to-[#c7f0d8]/5 hover:from-[#c7f0d8]/30 hover:to-[#c7f0d8]/10 transition-all group"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#c7f0d8] flex items-center justify-center text-xl shadow-md">
                          🗺️
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 mb-1 group-hover:text-[#a7d0b8] transition-colors">
                            Career Roadmap
                          </h3>
                          <p className="text-sm text-gray-600">
                            Personalized learning path
                          </p>
                        </div>
                      </div>
                    </motion.a>

                    <motion.a
                      href="/leaderboard"
                      whileHover={{ scale: 1.02, y: -2 }}
                      className="p-4 rounded-xl bg-gradient-to-br from-[#e9d5ff]/20 to-[#e9d5ff]/5 hover:from-[#e9d5ff]/30 hover:to-[#e9d5ff]/10 transition-all group"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#e9d5ff] flex items-center justify-center text-xl shadow-md">
                          👥
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 mb-1 group-hover:text-[#c9b5df] transition-colors">
                            Community
                          </h3>
                          <p className="text-sm text-gray-600">
                            Connect with peers
                          </p>
                        </div>
                      </div>
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            )}

            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 right-0 mt-2 md:hidden"
              >
                <div 
                  className="rounded-2xl border border-white/50 p-4"
                  style={{
                    background: "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(30px) saturate(180%)",
                    WebkitBackdropFilter: "blur(30px) saturate(180%)",
                    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
                  }}
                >
                  <nav className="space-y-2">
                    <a href="/generate" className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-white/60 rounded-lg transition-colors">
                      Features
                    </a>
                    <a href="/about" className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-white/60 rounded-lg transition-colors">
                      Resources
                    </a>
                    <a href="/blog" className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-white/60 rounded-lg transition-colors">
                      Blog
                    </a>
                    <a href="/about" className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-white/60 rounded-lg transition-colors">
                      About
                    </a>
                    <div className="border-t border-gray-200 my-2"></div>
                    <Link href="/login" className="block">
                      <button className="w-full px-4 py-3 text-sm font-medium text-gray-800 bg-white/50 hover:bg-white/80 rounded-lg transition-colors text-left">
                        Login
                      </button>
                    </Link>
                    <Link href="/generate" className="block">
                      <button className="w-full px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-[#1a1a1a] to-[#2d2d2d] hover:from-[#2d2d2d] hover:to-[#1a1a1a] rounded-lg transition-colors text-left">
                        Try Free
                      </button>
                    </Link>
                  </nav>
                </div>
              </motion.div>
            )}

            {showResourcesMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 right-0 mt-2"
                onMouseEnter={() => setShowResourcesMenu(true)}
                onMouseLeave={() => setShowResourcesMenu(false)}
              >
                <div 
                  className="rounded-2xl border border-white/50 p-6"
                  style={{
                    background: "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(30px) saturate(180%)",
                    WebkitBackdropFilter: "blur(30px) saturate(180%)",
                    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
                  }}
                >
                  <div className="grid grid-cols-3 gap-4 max-w-5xl mx-auto">
                    <motion.a
                      href="/about"
                      whileHover={{ scale: 1.02, y: -2 }}
                      className="p-4 rounded-xl bg-gradient-to-br from-[#ffd9a3]/20 to-[#ffd9a3]/5 hover:from-[#ffd9a3]/30 hover:to-[#ffd9a3]/10 transition-all group"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#ffd9a3] flex items-center justify-center text-xl shadow-md">
                          📚
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 mb-1 group-hover:text-[#dfb983] transition-colors">
                            Documentation
                          </h3>
                          <p className="text-sm text-gray-600">
                            Complete guides and tutorials
                          </p>
                        </div>
                      </div>
                    </motion.a>

                    <motion.a
                      href="/generate"
                      whileHover={{ scale: 1.02, y: -2 }}
                      className="p-4 rounded-xl bg-gradient-to-br from-[#ff9999]/20 to-[#ff9999]/5 hover:from-[#ff9999]/30 hover:to-[#ff9999]/10 transition-all group"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#ff9999] flex items-center justify-center text-xl shadow-md">
                          🎥
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 mb-1 group-hover:text-[#df7979] transition-colors">
                            Video Tutorials
                          </h3>
                          <p className="text-sm text-gray-600">
                            Step-by-step video guides
                          </p>
                        </div>
                      </div>
                    </motion.a>

                    <motion.a
                      href="/about"
                      whileHover={{ scale: 1.02, y: -2 }}
                      className="p-4 rounded-xl bg-gradient-to-br from-[#b8e0d2]/20 to-[#b8e0d2]/5 hover:from-[#b8e0d2]/30 hover:to-[#b8e0d2]/10 transition-all group"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#b8e0d2] flex items-center justify-center text-xl shadow-md">
                          📝
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 mb-1 group-hover:text-[#98c0b2] transition-colors">
                            Blog & Articles
                          </h3>
                          <p className="text-sm text-gray-600">
                            Latest tips and insights
                          </p>
                        </div>
                      </div>
                    </motion.a>

                    <motion.a
                      href="/generate"
                      whileHover={{ scale: 1.02, y: -2 }}
                      className="p-4 rounded-xl bg-gradient-to-br from-[#c9b5ff]/20 to-[#c9b5ff]/5 hover:from-[#c9b5ff]/30 hover:to-[#c9b5ff]/10 transition-all group"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#c9b5ff] flex items-center justify-center text-xl shadow-md">
                          💡
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 mb-1 group-hover:text-[#a995df] transition-colors">
                            Interview Tips
                          </h3>
                          <p className="text-sm text-gray-600">
                            Expert advice and strategies
                          </p>
                        </div>
                      </div>
                    </motion.a>

                    <motion.a
                      href="/projects"
                      whileHover={{ scale: 1.02, y: -2 }}
                      className="p-4 rounded-xl bg-gradient-to-br from-[#ffb6c1]/20 to-[#ffb6c1]/5 hover:from-[#ffb6c1]/30 hover:to-[#ffb6c1]/10 transition-all group"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#ffb6c1] flex items-center justify-center text-xl shadow-md">
                          💻
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 mb-1 group-hover:text-[#df96a1] transition-colors">
                            Coding Challenges
                          </h3>
                          <p className="text-sm text-gray-600">
                            Practice problems and solutions
                          </p>
                        </div>
                      </div>
                    </motion.a>

                    <motion.a
                      href="/leaderboard"
                      whileHover={{ scale: 1.02, y: -2 }}
                      className="p-4 rounded-xl bg-gradient-to-br from-[#ffd700]/20 to-[#ffd700]/5 hover:from-[#ffd700]/30 hover:to-[#ffd700]/10 transition-all group"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#ffd700] flex items-center justify-center text-xl shadow-md">
                          💬
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 mb-1 group-hover:text-[#dfb700] transition-colors">
                            Community Forum
                          </h3>
                          <p className="text-sm text-gray-600">
                            Connect with other learners
                          </p>
                        </div>
                      </div>
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.header>

      <section ref={heroRef} className="px-4 sm:px-6 md:px-12 pt-8 pb-12 sm:pt-12 sm:pb-16 md:pb-24 relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 px-4"
        >
          <a href="#why" className="px-3 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/70 backdrop-blur-md border border-white/80 text-xs sm:text-sm font-medium text-gray-700 hover:bg-white/90 transition-all shadow-md flex items-center gap-1 sm:gap-2">
            <span>❓</span> Why It Matters
          </a>
          <a href="#demo" className="px-3 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/70 backdrop-blur-md border border-white/80 text-xs sm:text-sm font-medium text-gray-700 hover:bg-white/90 transition-all shadow-md flex items-center gap-1 sm:gap-2">
            <span>📋</span> Live Demo
          </a>
          <a href="/about" className="px-3 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/70 backdrop-blur-md border border-white/80 text-xs sm:text-sm font-medium text-gray-700 hover:bg-white/90 transition-all shadow-md flex items-center gap-1 sm:gap-2">
            <span>ℹ️</span> About
          </a>
          <a href="#projects" className="px-3 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/70 backdrop-blur-md border border-white/80 text-xs sm:text-sm font-medium text-gray-700 hover:bg-white/90 transition-all shadow-md flex items-center gap-1 sm:gap-2">
            <span>📁</span> Mini Projects
          </a>
        </motion.div>

        <div className="absolute top-20 left-10 w-40 h-20 bg-white/40 rounded-full blur-2xl"></div>
        <div className="absolute top-40 right-20 w-60 h-24 bg-white/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 left-1/4 w-80 h-32 bg-blue-200/20 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-4 sm:mb-6">
              Unlock Your<br />Dream Tech Role
            </h2>
            <p className="text-base sm:text-xl md:text-2xl text-gray-700 mb-6 sm:mb-10">
              AI-Powered Interview Prep, Made Just For You
            </p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/generate'}
              className="px-6 sm:px-10 py-3 sm:py-4 rounded-full bg-[#7ec4b6] hover:bg-[#6eb4a6] transition-all text-white font-semibold text-base sm:text-lg shadow-xl cursor-pointer w-full sm:w-auto text-center"
            >
              Generate My Plan
            </motion.button>
          </motion.div>

          <motion.div
            className="relative flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.div
              animate={{ 
                y: [0, -10, 0],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full max-w-lg"
            >
              <Image
                src="/hero.png"
                alt="Interview Prep Hero"
                width={600}
                height={600}
                priority
                className="w-full h-auto drop-shadow-2xl"
              />
            </motion.div>
          </motion.div>
        </div>
        
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#a8d5ba]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#d4c5a9]/10 rounded-full blur-3xl"></div>
      </section>

      <section id="why" className="px-4 sm:px-6 md:px-12 py-12 sm:py-16 md:py-20 relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white/60 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-xl border border-white/80"
          >
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">
              Why It Matters
            </h3>
            
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#7ec4b6] flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-xs sm:text-sm">✓</span>
                </div>
                <div>
                  <p className="text-base sm:text-lg text-gray-800 font-medium mb-2">
                    You see 100+ job postings but don't know where to start?
                  </p>
                  <p className="text-sm sm:text-base text-gray-600">
                    Without the right guidance, interview prep becomes overwhelming and ineffective.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#7ec4b6] flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-xs sm:text-sm">✓</span>
                </div>
                <div>
                  <p className="text-base sm:text-lg text-gray-800 font-medium mb-2">
                    Generic prep wastes your valuable time
                  </p>
                  <p className="text-sm sm:text-base text-gray-600">
                    Our AI creates a personalized roadmap based on your target role and current skills.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#7ec4b6] flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-xs sm:text-sm">✓</span>
                </div>
                <div>
                  <p className="text-base sm:text-lg text-gray-800 font-medium mb-2">
                    Stand out in competitive interviews
                  </p>
                  <p className="text-sm sm:text-base text-gray-600">
                    Practice with real scenarios and get instant feedback to improve continuously.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="absolute top-40 left-20 w-64 h-64 bg-blue-300/10 rounded-full blur-3xl"
          style={{ y: parallaxY1 }}
        ></motion.div>
        <motion.div 
          className="absolute bottom-20 right-20 w-80 h-80 bg-cyan-200/10 rounded-full blur-3xl"
          style={{ y: parallaxY2 }}
        ></motion.div>
      </section>

      <section id="demo" className="px-4 sm:px-6 md:px-12 py-12 sm:py-16 md:py-20 relative overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white/70 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 border border-white/90"
          >
            <div className="text-center mb-6 sm:mb-8">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                Live Demo
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-gray-700">
                Paste a job description and watch our AI analyze it in real-time
              </p>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Paste a Sample Job Description
                </label>
                <textarea
                  className="w-full h-32 sm:h-40 p-3 sm:p-4 rounded-xl border-2 border-blue-200 focus:border-[#7ec4b6] focus:outline-none resize-none bg-white/90 backdrop-blur-sm transition-all shadow-sm text-sm sm:text-base text-gray-900"
                  placeholder="Example: We're looking for a Senior Full Stack Developer with 3+ years experience in React, Node.js, and PostgreSQL..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <input
                  type="text"
                  className="flex-1 p-3 sm:p-4 rounded-xl border-2 border-blue-200 focus:border-[#7ec4b6] focus:outline-none bg-white/90 backdrop-blur-sm shadow-sm text-sm sm:text-base text-gray-900"
                  placeholder="Analyse"
                  readOnly
                  value={isAnalyzing ? "Analyzing skills, requirements, and creating your plan..." : ""}
                />
                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !jobDescription.trim()}
                  className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-[#7ec4b6] hover:bg-[#6eb4a6] transition-all hover:scale-105 text-white font-semibold text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg w-full sm:w-auto"
                >
                  {isAnalyzing ? (
                    <div className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Analyzing...
                    </div>
                  ) : "Analyse"}
                </button>
              </div>

              {isAnalyzing && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="bg-[#a8d5ba]/20 rounded-xl p-6 border-2 border-[#a8d5ba]/50"
                >
                  <h4 className="font-semibold text-gray-900 mb-3">Detected Skills:</h4>
                  <div className="flex flex-wrap gap-2">
                    {["React", "Node.js", "PostgreSQL", "REST APIs", "Git"].map((skill, i) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="px-4 sm:px-6 md:px-12 py-8 sm:py-12 border-t border-blue-200/30 bg-gradient-to-b from-transparent to-blue-100/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
            <div className="sm:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#a8d5ba] to-[#7ba8d4] flex items-center justify-center shadow-lg">
                  <span className="text-lg">🚀</span>
                </div>
                <span className="text-2xl font-bold text-gray-800">Craft My Prep</span>
              </div>
              <p className="text-gray-600 max-w-sm mb-4">
                Empowering tech professionals to land their dream roles through AI-powered interview preparation.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/60 hover:bg-white flex items-center justify-center text-gray-600 hover:text-[#1DA1F2] transition-all hover:scale-110 shadow-sm">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/60 hover:bg-white flex items-center justify-center text-gray-600 hover:text-[#0A66C2] transition-all hover:scale-110 shadow-sm">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/60 hover:bg-white flex items-center justify-center text-gray-600 hover:text-[#333] transition-all hover:scale-110 shadow-sm">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"></path>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/60 hover:bg-white flex items-center justify-center text-gray-600 hover:text-[#FF0000] transition-all hover:scale-110 shadow-sm">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">Home</Link></li>
                <li><Link href="/dashboard" className="text-gray-600 hover:text-gray-900 transition-colors">Dashboard</Link></li>
                <li><Link href="/generate" className="text-gray-600 hover:text-gray-900 transition-colors">Generate Plan</Link></li>
                <li><Link href="/projects" className="text-gray-600 hover:text-gray-900 transition-colors">Mini Projects</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">About Us</Link></li>
                <li><Link href="/blog" className="text-gray-600 hover:text-gray-900 transition-colors">Blog</Link></li>
                <li><Link href="/privacy" className="text-gray-600 hover:text-gray-900 transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-gray-600 hover:text-gray-900 transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom section */}
          <div className="pt-6 sm:pt-8 border-t border-gray-300/50 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <p className="text-gray-600 text-sm">
              © 2025 Craft My Prep. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">Contact</Link>
              <Link href="/support" className="text-gray-600 hover:text-gray-900 transition-colors">Support</Link>
              <Link href="/careers" className="text-gray-600 hover:text-gray-900 transition-colors">Careers</Link>
            </div>
          </div>
        </div>
      </footer>
      </>
    </div>
  );
}