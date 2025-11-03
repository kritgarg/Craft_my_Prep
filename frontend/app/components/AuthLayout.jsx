"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function AuthLayout({ children, title, subtitle }) {
    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ background: "linear-gradient(180deg, #a8d5e2 0%, #e8f4f8 50%, #fef5e7 100%)" }}>
            {/* Decorative elements */}
            <div className="absolute top-20 left-10 w-40 h-40 bg-white/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-60 h-60 bg-blue-200/20 rounded-full blur-3xl"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md mx-4 relative z-10"
            >
                {/* Logo */}
                <Link href="/">
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center justify-center gap-3 mb-8 cursor-pointer"
                    >
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7ec4b6] to-[#6eb4a6] flex items-center justify-center shadow-lg">
                            <span className="text-2xl">✨</span>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-800">Craft My Prep</h1>
                    </motion.div>
                </Link>

                {/* Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white/70 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/80"
                >
                    <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">{title}</h2>
                    <p className="text-gray-600 text-center mb-8">{subtitle}</p>

                    {children}
                </motion.div>

                {/* Back to Home */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center mt-6"
                >
                    <Link href="/" className="text-gray-600 hover:text-gray-900 font-medium">
                        ← Back to Home
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
}
