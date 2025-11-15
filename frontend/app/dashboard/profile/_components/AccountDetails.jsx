"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { api } from "../../../../lib/axios";

export default function AccountDetails({ user, updateUser, logout, router, setMessage }) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [loading, setLoading] = useState(false);
  
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteName, setDeleteName] = useState("");
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);

  const handleNameUpdate = async () => {
    if (!name.trim() || name === user.name) {
      setIsEditingName(false);
      return;
    }
    
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      await api.put("/profile", { name });
      updateUser({ name }); 
      setMessage({ type: "success", text: "Name updated successfully" });
      setIsEditingName(false);
    } catch (err) {
      setMessage({ type: "error", text: err.response?.data?.error || "Failed to update name" });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteName !== user.name || !deleteConfirmed) return;

    setLoading(true);
    try {
      await api.delete("/profile");
      logout();
      router.push("/login");
    } catch (err) {
      setMessage({ type: "error", text: err.response?.data?.error || "Failed to delete account" });
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl shadow-gray-100/50 border border-white/50 p-8 overflow-hidden relative group h-full flex flex-col"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#7ec4b6] to-[#a8d5e2]" />
      
      <div className="flex flex-col items-center gap-6 mb-10">
        <div className="relative group-hover:scale-105 transition-transform duration-300">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-50 to-purple-50 p-1 shadow-lg">
            <div className="w-full h-full rounded-full bg-white overflow-hidden">
              <img 
                src={`https://robohash.org/${user?.name || 'user'}.png`} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-full shadow-md border border-gray-100 text-[#7ec4b6]">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          </div>
        </div>

        <div className="flex-1 w-full text-center space-y-4">
          {/* Name Field */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Full Name</label>
            <div className="flex items-center justify-center gap-2">
              {isEditingName ? (
                <div className="flex items-center gap-2 w-full max-w-xs">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="flex-1 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#7ec4b6] focus:border-transparent outline-none transition-all text-gray-800 font-medium"
                    autoFocus
                  />
                  <button 
                    onClick={handleNameUpdate}
                    disabled={loading}
                    className="p-2 bg-emerald-100 text-emerald-600 hover:bg-emerald-200 rounded-lg transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </button>
                  <button 
                    onClick={() => {
                      setIsEditingName(false);
                      setName(user?.name || "");
                    }}
                    className="p-2 bg-rose-100 text-rose-600 hover:bg-rose-200 rounded-lg transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3 group/name cursor-pointer" onClick={() => setIsEditingName(true)}>
                  <h3 className="text-2xl font-bold text-gray-800">{user?.name}</h3>
                  <button 
                    className="p-1.5 text-gray-400 hover:text-[#7ec4b6] hover:bg-[#7ec4b6]/10 rounded-lg transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Email Field */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email Address</label>
            <div className="flex items-center justify-center gap-2">
              <div className="px-3 py-1.5 bg-gray-50 rounded-lg text-gray-600 font-medium text-sm border border-gray-100 text-black">
                {user?.email}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Account Section */}
      <div className="pt-8 border-t border-gray-100 mt-auto">
         {!showDeleteConfirm ? (
            <button 
              onClick={() => setShowDeleteConfirm(true)}
              className="group flex items-center gap-2 text-rose-500 hover:text-rose-600 font-medium transition-colors px-4 py-2 hover:bg-rose-50 rounded-xl w-full sm:w-auto justify-center sm:justify-start"
            >
              <span className="p-1.5 bg-rose-100 rounded-lg group-hover:bg-rose-200 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </span>
              Delete Account
            </button>
         ) : (
           <motion.div 
             initial={{ opacity: 0, height: 0 }}
             animate={{ opacity: 1, height: "auto" }}
             className="bg-rose-50/50 p-6 rounded-2xl border border-rose-100 backdrop-blur-sm"
           >
             <h4 className="text-rose-800 font-bold mb-2 flex items-center gap-2">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
               Danger Zone
             </h4>
             <p className="text-rose-600 text-sm mb-4">This action is irreversible. Please type <strong>{user?.name}</strong> to confirm.</p>
             
             <div className="space-y-4">
               <input 
                  type="text" 
                  value={deleteName}
                  onChange={(e) => setDeleteName(e.target.value)}
                  placeholder="Type your full name"
                  className="w-full px-4 py-2.5 border border-rose-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none bg-white text-sm text-black"
               />
               
               <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-rose-100/50 rounded-lg transition-colors">
                 <input 
                    type="checkbox" 
                    checked={deleteConfirmed}
                    onChange={(e) => setDeleteConfirmed(e.target.checked)}
                    className="w-4 h-4 text-rose-600 rounded border-rose-300 focus:ring-rose-500"
                 />
                 <span className="text-sm text-rose-700 font-medium">I understand the consequences</span>
               </label>

               <div className="flex gap-3 pt-2">
                 <button 
                    onClick={handleDeleteAccount}
                    disabled={deleteName !== user?.name || !deleteConfirmed || loading}
                    className="flex-1 px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-rose-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                 >
                   {loading ? "Deleting..." : "Permanently Delete"}
                 </button>
                 <button 
                    onClick={() => {
                      setShowDeleteConfirm(false);
                      setDeleteName("");
                      setDeleteConfirmed(false);
                    }}
                    className="px-4 py-2.5 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-bold rounded-xl transition-colors"
                 >
                   Cancel
                 </button>
               </div>
             </div>
           </motion.div>
         )}
      </div>
    </motion.div>
  );
}
