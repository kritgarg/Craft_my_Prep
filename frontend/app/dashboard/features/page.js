"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { api } from "../../../lib/axios";
import { useAuth } from "../../../context/AuthContext";
import XPModal from "../../components/XPModal";
import ChallengeHeader from "./_components/ChallengeHeader";
import ChallengeCard from "./_components/ChallengeCard";
import ChallengeGenerator from "./_components/ChallengeGenerator";
import ChallengeHistory from "./_components/ChallengeHistory";

export default function DailyChallengePage() {
    const { user, updateUser } = useAuth();
    const [challenge, setChallenge] = useState(null);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [generating, setGenerating] = useState(false);
    const [showXPModal, setShowXPModal] = useState(false);
    const [formData, setFormData] = useState({
        language: "JavaScript",
        difficulty: "Medium"
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [challengeRes, historyRes] = await Promise.all([
                    api.get("/daily-challenge/today"),
                    api.get("/daily-challenge/history")
                ]);
                setChallenge(challengeRes.data);
                setHistory(historyRes.data.history || []);
            } catch (error) {
                console.error("Failed to fetch daily challenge data:", error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchData();
        }
    }, [user]);

    const handleGenerate = async () => {
        setGenerating(true);
        try {
            const res = await api.post("/daily-challenge/generate", formData);
            setChallenge(res.data);
        } catch (error) {
            console.error("Failed to generate challenge:", error);
            alert("Failed to generate challenge. Please try again.");
        } finally {
            setGenerating(false);
        }
    };

    const handleMarkSolved = async () => {
        if (!challenge) return;
        try {
            const res = await api.post(`/daily-challenge/${challenge.id}/mark-solved`);
            setChallenge(res.data.challenge);

            // Update local user state
            if (user) {
                updateUser({
                    xp: (user.xp || 0) + 25,
                    streak: res.data.user.streak
                });
            }

            setShowXPModal(true);

            // Refresh history
            const historyRes = await api.get("/daily-challenge/history");
            setHistory(historyRes.data.history || []);

        } catch (error) {
            console.error("Failed to mark solved:", error);
            alert("Failed to mark as solved.");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto space-y-8 p-2">
            <ChallengeHeader user={user} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <AnimatePresence mode="wait">
                        {challenge ? (
                            <ChallengeCard
                                challenge={challenge}
                                handleMarkSolved={handleMarkSolved}
                            />
                        ) : (
                            <ChallengeGenerator
                                formData={formData}
                                setFormData={setFormData}
                                handleGenerate={handleGenerate}
                                generating={generating}
                            />
                        )}
                    </AnimatePresence>
                </div>

                <div className="space-y-6">
                    <ChallengeHistory history={history} />
                </div>
            </div>

            <XPModal
                isOpen={showXPModal}
                onClose={() => setShowXPModal(false)}
                xpAmount={25}
            />
        </div>
    );
}
