"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import QuickLink from "./QuickLink";

export default function Hero() {
    return (
        <section className="px-4 sm:px-6 md:px-12 pt-8 pb-12 sm:pt-12 sm:pb-16 md:pb-24 relative overflow-hidden">
            <div className="flex flex-wrap justify-center gap-3 mb-12">
                <QuickLink href="#why" icon="❓">Why It Matters</QuickLink>
                <QuickLink href="#demo" icon="📋">Live Demo</QuickLink>
                <QuickLink href="/about" icon="ℹ️">About</QuickLink>
                <QuickLink href="#projects" icon="📁">Mini Projects</QuickLink>
            </div>


            <div className="absolute top-20 left-10 w-40 h-20 bg-white/40 rounded-full blur-2xl" />
            <div className="absolute top-40 right-20 w-60 h-24 bg-white/30 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
                        Unlock Your<br />Dream Tech Role
                    </h2>
                    <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-lg">
                        AI-Powered Interview Prep, Made Just For You. Practice smarter, not harder.
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.location.href = '/dashboard/generate'}
                        className="px-8 py-4 rounded-full bg-[#7ec4b6] hover:bg-[#6eb4a6] text-white font-semibold text-lg shadow-xl transition-colors w-full sm:w-auto"
                    >
                        Generate My Plan
                    </motion.button>
                </motion.div>

                <motion.div
                    className="relative flex justify-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
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
        </section>
    );
}
