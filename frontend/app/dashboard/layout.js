"use client";

import Sidebar from "../components/Sidebar";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({ children }) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#e8f4f8]">
                <p className="text-xl text-[#7ec4b6] font-semibold">Loading...</p>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen" style={{ background: "linear-gradient(180deg, #a8d5e2 0%, #e8f4f8 50%, #fef5e7 100%)" }}>
            <Sidebar />
            <main className="flex-1 h-screen overflow-y-auto p-4 pt-20 xl:p-6 xl:pt-18">
                {children}
            </main>
        </div>
    );
}
