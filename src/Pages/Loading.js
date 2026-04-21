import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * A sleek, centered Loading component
 * @param {string} message - Custom text to display (default: "Fetching files...")
 * @param {boolean} fullPage - If true, covers the entire screen (default: false)
 */
const Loading = ({ message = "Fetching your files...", fullPage = false }) => {
    const containerClasses = fullPage
        ? "fixed inset-0 z-50 bg-white/80 backdrop-blur-sm"
        : "w-full py-12";

    return (
        <div className={`flex flex-col items-center justify-center gap-4 ${containerClasses}`}>
            <div className="relative flex items-center justify-center">
                {/* Outer Glow/Pulse */}
                <div className="absolute inset-0 rounded-full bg-blue-400 blur-xl opacity-20 animate-pulse" />

                {/* Main Spinner */}
                <Loader2
                    className="w-10 h-10 text-blue-600 animate-spin"
                    strokeWidth={2.5}
                />
            </div>

            {/* Loading Text */}
            <div className="flex flex-col items-center">
                <p className="text-sm font-semibold text-gray-700 tracking-wide">
                    {message}
                </p>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">
                    Please wait
                </span>
            </div>

            {/* Screen Reader Support */}
            <span className="sr-only">Loading content...</span>
        </div>
    );
};

export default Loading;