"use client";

export default function FeatureRow({ title, desc }) {
    return (
        <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-[#7ec4b6] flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white font-bold text-sm">✓</span>
            </div>
            <div>
                <p className="text-lg text-gray-800 font-medium mb-1">{title}</p>
                <p className="text-gray-600">{desc}</p>
            </div>
        </div>
    );
}
