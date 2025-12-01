"use client";

import { useState, useEffect } from "react";
import { api } from "../../../lib/axios";
import { Search, Filter, PlayCircle, FileText, BookOpen, ExternalLink, Heart, Bookmark } from "lucide-react";
import { motion } from "framer-motion";

export default function ResourcesPage() {
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [selectedType, setSelectedType] = useState("All");
    const [selectedLevel, setSelectedLevel] = useState("All");

    const fetchResources = async () => {
        setLoading(true);
        try {
            const params = {};
            if (search) params.search = search;
            if (selectedType !== "All") params.type = selectedType;
            if (selectedLevel !== "All") params.level = selectedLevel;

            const res = await api.get("/resources", { params });

            if (res.data.data.length === 0 && !search && selectedType === "All") {
                await api.post("/resources/seed");
                const seedRes = await api.get("/resources");
                setResources(seedRes.data.data);
            } else {
                setResources(res.data.data);
            }
        } catch (error) {
            console.error("Failed to fetch resources:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchResources();
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [search, selectedType, selectedLevel]);

    const types = ["All", "Video", "Article", "Course", "CheatSheet"];
    const levels = ["All", "Beginner", "Intermediate", "Advanced"];

    const getTypeIcon = (type) => {
        switch (type) {
            case "Video": return <PlayCircle size={20} className="text-red-500" />;
            case "Article": return <FileText size={20} className="text-blue-500" />;
            case "Course": return <BookOpen size={20} className="text-purple-500" />;
            default: return <ExternalLink size={20} className="text-gray-500" />;
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-4 space-y-8">
            {/* Header */}
            <div className="space-y-2">
                <h1 className="text-4xl font-bold text-gray-900">Resources Hub</h1>
                <p className="text-gray-600">One short practice every day — earn XP and keep streak.</p>
            </div>


            {/* Filters & Search */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search titles, descriptions, and tags..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-500"
                        />
                    </div>
                </div>

                <div className="flex flex-wrap gap-4 items-center">
                    <div className="flex flex-wrap gap-2">
                        {types.map(type => (
                            <button
                                key={type}
                                onClick={() => setSelectedType(type)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedType === type
                                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                    <div className="h-6 w-px bg-gray-200 hidden md:block"></div>
                    <div className="flex flex-wrap gap-2">
                        {levels.map(level => (
                            <button
                                key={level}
                                onClick={() => setSelectedLevel(level)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedLevel === level
                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    }`}
                            >
                                {level}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Resources Grid */}
            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {resources.map((resource, index) => (
                        <motion.a
                            key={resource.id}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all group block cursor-pointer"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-gray-50 rounded-2xl group-hover:bg-emerald-50 transition-colors">
                                    {getTypeIcon(resource.type)}
                                </div>
                                <div className="text-gray-400 group-hover:text-emerald-500 transition-colors">
                                    <ExternalLink size={20} />
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                                {resource.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                {resource.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {resource.tags.map(tag => (
                                    <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium">
                                        #{tag}
                                    </span>
                                ))}
                            </div>

                            <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${resource.level === 'Beginner' ? 'bg-green-100 text-green-700' :
                                    resource.level === 'Advanced' ? 'bg-red-100 text-red-700' :
                                        'bg-yellow-100 text-yellow-700'
                                    }`}>
                                    {resource.level.toUpperCase()}
                                </span>
                                <span className="text-sm font-medium text-gray-500">
                                    {resource.source}
                                </span>
                            </div>
                        </motion.a>
                    ))}
                </div>
            )}

            {!loading && resources.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-gray-500 mb-4">No resources found matching your filters.</p>
                    <button
                        onClick={async () => {
                            setLoading(true);
                            try {
                                await api.post("/resources/seed");
                                // Reset filters to see the new data
                                setSearch("");
                                setSelectedType("All");
                                setSelectedLevel("All");
                                // Fetch again
                                const res = await api.get("/resources");
                                setResources(res.data.data);
                            } catch (e) {
                                console.error(e);
                            } finally {
                                setLoading(false);
                            }
                        }}
                        className="px-6 py-2 bg-emerald-600 text-white rounded-full font-medium hover:bg-emerald-700 transition-colors"
                    >
                        Load Sample Resources
                    </button>
                </div>
            )}
        </div>
    );
}
