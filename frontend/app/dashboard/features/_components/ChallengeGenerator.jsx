"use client";

import { motion } from "framer-motion";
import { Brain } from "lucide-react";

export default function ChallengeGenerator({ formData, setFormData, handleGenerate, generating }) {
    return (
        <motion.div
            key="generate"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/60 text-center py-16"
        >
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl shadow-inner">
                🚀
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready for your Daily Challenge?</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Select your preferences and let our AI generate a unique coding problem just for you.
            </p>

            <div className="max-w-md mx-auto space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2 text-left">
                        <label className="text-sm font-medium text-gray-700">Language</label>
                        <input
                            type="text"
                            value={formData.language}
                            onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                            placeholder="e.g. JavaScript, Python, Go"
                            className="w-full p-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                        />
                    </div>
                    <div className="space-y-2 text-left">
                        <label className="text-sm font-medium text-gray-700">Difficulty</label>
                        <select
                            value={formData.difficulty}
                            onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                            className="w-full p-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                        >
                            <option>Easy</option>
                            <option>Medium</option>
                            <option>Hard</option>
                        </select>
                    </div>
                </div>

                <button
                    onClick={handleGenerate}
                    disabled={generating}
                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-lg shadow-emerald-600/20 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {generating ? (
                        <>
                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                            Generating...
                        </>
                    ) : (
                        <>
                            <Brain size={20} />
                            Generate Challenge
                        </>
                    )}
                </button>
            </div>
        </motion.div>
    );
}
