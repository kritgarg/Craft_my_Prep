"use client";

import { motion } from "framer-motion";

export default function SocialButton({ onClick, children, icon }) {
    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            type="button"
            className="w-full px-6 py-3 rounded-xl bg-white hover:bg-gray-50 border-2 border-gray-300 text-gray-700 font-medium transition-all flex items-center justify-center gap-3 cursor-pointer"
        >
            {icon}
            {children}
        </motion.button>
    );
}
