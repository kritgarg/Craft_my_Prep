"use client";

import { motion } from "framer-motion";
import { use } from "react";

export default function DynamicDashboardPage({ params }) {
    // Unwrap params using React.use()
    const resolvedParams = use(params);
    const slug = resolvedParams.slug;

    // Capitalize the slug for display
    const title = slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " ");

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/70 backdrop-blur-lg rounded-3xl p-12 shadow-xl border border-white/80 text-center w-full max-w-4xl"
        >
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{title}</h1>
            <p className="text-lg text-gray-600">
                This is the {title} page. Content coming soon!
            </p>
        </motion.div>
    );
}
