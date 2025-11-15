"use client";

import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import ProfileHeader from "./_components/ProfileHeader";
import AccountDetails from "./_components/AccountDetails";
import SecuritySettings from "./_components/SecuritySettings";

export default function ProfilePage() {
  const { user, logout, updateUser } = useAuth();
  const router = useRouter();
  const [message, setMessage] = useState({ type: "", text: "" });

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <ProfileHeader />

      <AnimatePresence>
        {message.text && (
          <motion.div 
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`overflow-hidden mb-8 rounded-xl shadow-sm border ${
              message.type === "success" 
                ? "bg-emerald-50 text-emerald-700 border-emerald-100" 
                : "bg-rose-50 text-rose-700 border-rose-100"
            }`}
          >
            <div className="p-4 flex items-center gap-3">
              {message.type === "success" ? (
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              ) : (
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              )}
              <p className="font-medium">{message.text}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AccountDetails 
          user={user} 
          updateUser={updateUser} 
          logout={logout} 
          router={router} 
          setMessage={setMessage} 
        />
        <SecuritySettings setMessage={setMessage} />
      </div>
    </div>
  );
}
