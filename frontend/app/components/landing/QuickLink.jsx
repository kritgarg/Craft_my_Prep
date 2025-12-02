"use client";
import Link from "next/link";

export default function QuickLink({ href, icon, children }) {
    return (
        <Link href={href} className="px-5 py-2.5 rounded-full bg-white/70 backdrop-blur-md border border-white/80 text-sm font-medium text-gray-700 hover:bg-white/90 transition-all shadow-md flex items-center gap-2">
            <span>{icon}</span> {children}
        </Link>
    );
}
