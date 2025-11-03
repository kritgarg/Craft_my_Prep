"use client";

import { motion } from "framer-motion";

export default function AuthInput({ label, type, value, onChange, placeholder, delay = 0 }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay }}
        >
            <label className="block text-sm font-semibold text-gray-700 mb-2">
                {label}
            </label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-[#7ec4b6] focus:outline-none bg-white/90 backdrop-blur-sm transition-all"
            />
        </motion.div>
    );
}
