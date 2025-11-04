"use client";

import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

export default function Dashboard() {
    const { user, logout } = useAuth();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/70 backdrop-blur-lg rounded-3xl p-12 shadow-xl border border-white/80 text-center"
        >
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Hello, {user?.name || "User"}!</h1>
            <p className="text-lg text-gray-600">Welcome to your dashboard</p>
            <button onClick={logout} style={{
                backgroundColor: "black",
                padding: 10,
                width: 90,
                borderRadius: 10,
                margin: 10,
                cursor: "pointer"
            }}>logout</button>
            {user?.email && <p className="text-md text-gray-500 mt-2">{user.email}</p>}
        </motion.div>
    );
}
