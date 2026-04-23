import React from 'react';
import { Lock, ShieldCheck, ArrowRight } from 'lucide-react';

export default function ResetPassword() {
    return (
        <div className="max-w-md mx-auto mt-12 px-4">
            <div className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-100 border border-gray-100">

                {/* Header Section */}
                <div className="mb-10 text-center">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl mb-4 shadow-sm">
                        <ShieldCheck size={28} strokeWidth={2.5} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                        Set New Password
                    </h2>
                    <p className="text-sm text-gray-500 mt-2">
                        Must be at least 8 characters long.
                    </p>
                </div>

                <form className="space-y-5">
                    {/* New Password Field */}
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 ml-1">
                            New Password
                        </label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-500 transition-colors">
                                <Lock size={18} />
                            </div>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white focus:outline-none transition-all duration-200"
                                required
                            />
                        </div>
                    </div>

                    {/* Confirm Password Field */}
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 ml-1">
                            Confirm New Password
                        </label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-500 transition-colors">
                                <Lock size={18} />
                            </div>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white focus:outline-none transition-all duration-200"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gray-900 hover:bg-black text-white font-bold py-4 rounded-2xl transition-all duration-300 transform active:scale-[0.97] shadow-lg shadow-gray-200 flex items-center justify-center gap-2 mt-2"
                    >
                        Update Password
                        <ArrowRight size={18} />
                    </button>
                </form>

                {/* Password Requirements Guide */}
                <div className="mt-8 pt-6 border-t border-gray-50">
                    <ul className="space-y-2">
                        <li className="flex items-center text-xs text-gray-500 gap-2">
                            <div className="w-1 h-1 rounded-full bg-gray-300" />
                            At least one uppercase letter
                        </li>
                        <li className="flex items-center text-xs text-gray-500 gap-2">
                            <div className="w-1 h-1 rounded-full bg-gray-300" />
                            At least one number or symbol
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}