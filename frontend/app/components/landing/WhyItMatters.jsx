"use client";
import { motion } from "framer-motion";
import FeatureRow from "./FeatureRow";

export default function WhyItMatters({ parallaxY1, parallaxY2 }) {
    return (
        <section id="why" className="px-4 sm:px-12 py-16 relative overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white/60 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-xl border border-white/80"
                >
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Why It Matters</h3>
                    <div className="space-y-6">
                        <FeatureRow
                            title="Overwhelmed by job postings?"
                            desc="Without guidance, prep is chaotic. We give you a structured path."
                        />
                        <FeatureRow
                            title="Stop wasting time on generic prep"
                            desc="Our AI creates a roadmap tailored to your target role and skills."
                        />
                        <FeatureRow
                            title="Stand out in interviews"
                            desc="Practice with real scenarios and get instant feedback to improve."
                        />
                    </div>
                </motion.div>
            </div>

            <motion.div style={{ y: parallaxY1 }} className="absolute top-40 left-20 w-64 h-64 bg-blue-300/10 rounded-full blur-3xl" />
            <motion.div style={{ y: parallaxY2 }} className="absolute bottom-20 right-20 w-80 h-80 bg-cyan-200/10 rounded-full blur-3xl" />
        </section>
    );
}
