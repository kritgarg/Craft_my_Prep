"use client";

import { Flame, Trophy } from "lucide-react";

export default function ChallengeHeader({ user }) {
    return (
        <div className="relative flex flex-col items-start justify-start text-left py-6">
            <div className="space-y-2">
                <h1 className="text-4xl font-bold text-gray-900">Daily Challenge</h1>
                <p className="text-gray-600 max-w-lg">Sharpen your skills with a new coding problem every day.</p>
            </div>

            <div className="mt-6 lg:mt-0 lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 flex items-center gap-4 bg-white p-2 pr-4 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 text-orange-500 font-bold px-3 py-1.5 bg-orange-50 rounded-xl">
                    <Flame size={20} />
                    <span>{user?.streak || 0} Day Streak</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-600 font-bold px-3 py-1.5 bg-emerald-50 rounded-xl">
                    <Trophy size={20} />
                    <span>{user?.xp || 0} XP</span>
                </div>
            </div>
        </div>
    );
} 
