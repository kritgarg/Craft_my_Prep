"use client";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="px-4 sm:px-12 py-12 border-t border-blue-200/30 bg-gradient-to-b from-transparent to-blue-100/20">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#a8d5ba] to-[#7ba8d4] flex items-center justify-center shadow-lg">
                                <span className="text-lg">🚀</span>
                            </div>
                            <span className="text-2xl font-bold text-gray-800">Craft My Prep</span>
                        </div>
                        <p className="text-gray-600 max-w-sm">
                            Empowering tech professionals to land their dream roles through AI-powered interview preparation.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-gray-600">
                            <li><Link href="/" className="hover:text-gray-900">Home</Link></li>
                            <li><Link href="/dashboard" className="hover:text-gray-900">Dashboard</Link></li>
                            <li><Link href="/dashboard/generate" className="hover:text-gray-900">Generate Plan</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 mb-4">Resources</h4>
                        <ul className="space-y-2 text-gray-600">
                            <li><Link href="/about" className="hover:text-gray-900">About Us</Link></li>
                            <li><Link href="/blog" className="hover:text-gray-900">Blog</Link></li>
                            <li><Link href="/privacy" className="hover:text-gray-900">Privacy Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-300/50 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-600">
                    <p>© 2025 Craft My Prep. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/contact" className="hover:text-gray-900">Contact</Link>
                        <Link href="/support" className="hover:text-gray-900">Support</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
