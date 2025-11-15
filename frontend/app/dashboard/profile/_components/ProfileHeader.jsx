"use client";

import { motion } from "framer-motion";

export default function ProfileHeader() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-12"
    >
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-600 mb-2">Profile Settings</h1>
      <p className="text-gray-500">Manage your account details and security preferences</p>
    </motion.div>
  );
} 