"use client";

import { History, CheckCircle } from "lucide-react";

export default function ChallengeHistory({ history }) {
    return (
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/60 h-full max-h-[600px] flex flex-col">
            <div className="flex items-center gap-2 mb-6">
                <History className="text-gray-500" />
                <h3 className="font-bold text-gray-900">Challenge History</h3>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                {history.length === 0 ? (
                    <p className="text-gray-500 text-center py-8 text-sm">No history yet. Start your streak today!</p>
                ) : (
                    history.map((item) => (
                        <div
                            key={item.id}
                            className={`p-4 rounded-2xl border transition-all ${item.isSolved
                                    ? 'bg-emerald-50/50 border-emerald-100 hover:bg-emerald-50'
                                    : 'bg-gray-50 border-gray-100 hover:bg-gray-100'
                                }`}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-xs font-medium text-gray-500">
                                    {new Date(item.date).toLocaleDateString()}
                                </span>
                                {item.isSolved && (
                                    <span className="text-emerald-600 text-xs font-bold flex items-center gap-1">
                                        <CheckCircle size={12} /> Solved
                                    </span>
                                )}
                            </div>
                            <p className="text-sm font-medium text-gray-800 line-clamp-2 mb-2">
                                {item.question}
                            </p>
                            <div className="flex gap-2">
                                {item.language && (
                                    <span className="text-[10px] px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">
                                        {item.language}
                                    </span>
                                )}
                                {item.difficulty && (
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${item.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                                            item.difficulty === 'Hard' ? 'bg-red-100 text-red-700' :
                                                'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {item.difficulty}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
