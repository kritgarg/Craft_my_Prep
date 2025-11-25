"use client";

import { motion } from "framer-motion";
import { Code, Brain, CheckCircle } from "lucide-react";

export default function ChallengeCard({ challenge, handleMarkSolved }) {
    return (
        <motion.div
            key="challenge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-50 rounded-full -mr-20 -mt-20 blur-3xl opacity-50" />

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                    <div className="flex gap-3">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium flex items-center gap-1">
                            <Code size={14} />
                            {challenge.language || "General"}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${challenge.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                                challenge.difficulty === 'Hard' ? 'bg-red-100 text-red-700' :
                                    'bg-yellow-100 text-yellow-700'
                            }`}>
                            <Brain size={14} />
                            {challenge.difficulty || "Medium"}
                        </span>
                    </div>
                    {challenge.isSolved && (
                        <span className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full font-bold flex items-center gap-2">
                            <CheckCircle size={18} />
                            Solved
                        </span>
                    )}
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-6 leading-relaxed">
                    {challenge.question}
                </h2>

                {challenge.isSolved && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="bg-gray-50 rounded-2xl p-6 border border-gray-200 mt-8"
                    >
                        <h3 className="font-bold text-gray-900 mb-3">Solution / Explanation:</h3>
                        <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                            {challenge.solution}
                        </p>
                    </motion.div>
                )}

                {!challenge.isSolved && (
                    <div className="mt-8 flex justify-end">
                        <button
                            onClick={handleMarkSolved}
                            className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-lg shadow-emerald-600/20 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2"
                        >
                            <CheckCircle size={20} />
                            Mark as Solved (+25 XP)
                        </button>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
