"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "../../../lib/axios";

export default function LiveDemo() {
    const [jobDescription, setJobDescription] = useState("");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisComplete, setAnalysisComplete] = useState(false);
    const [detectedSkills, setDetectedSkills] = useState([]);

    const handleAnalyze = async () => {
        if (!jobDescription.trim()) return;

        setIsAnalyzing(true);
        setAnalysisComplete(false);
        setDetectedSkills([]);

        try {
            const res = await api.post("/plans/analyze-demo", { jobDescription });
            if (res.data.skills) {
                setDetectedSkills(res.data.skills);
                setAnalysisComplete(true);
            }
        } catch (error) {
            console.error("Analysis failed:", error);
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <section id="demo" className="px-4 sm:px-12 py-16 relative">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 border border-white/90"
                >
                    <div className="text-center mb-8">
                        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Live Demo</h3>
                        <p className="text-lg text-gray-700">Paste a job description to see our AI in action</p>
                    </div>

                    <div className="space-y-6">
                        <textarea
                            className="w-full h-40 p-4 rounded-xl border-2 border-blue-200 focus:border-[#7ec4b6] focus:outline-none resize-none bg-white/90 transition-all shadow-sm text-gray-900"
                            placeholder="Example: We're looking for a Senior Full Stack Developer with 3+ years experience..."
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                        />

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
                                    <span className="flex items-center gap-2">
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Analyzing...
                                    </span>
                                ) : "Analyse"}
                            </button>
                        </div>

                        <AnimatePresence>
                            {analysisComplete && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="bg-[#a8d5ba]/20 rounded-xl p-6 border border-[#a8d5ba]/50 overflow-hidden"
                                >
                                    <h4 className="font-semibold text-gray-900 mb-3">Detected Skills:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {detectedSkills.map((skill, i) => (
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
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
