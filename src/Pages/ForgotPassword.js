import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { KeyRound, ArrowLeft, Mail, CheckCircle2, AlertCircle } from 'lucide-react';
import supabase from '../config/SupaBaseClient';
export default function ForgotPassword() {

    const [message, setMessage] = useState()
    const [email, setEmail] = useState()
    const forgotPasswordHandle = async (e) => {
        e.preventDefault();
        const { data, error } = await supabase.auth.resetPasswordForEmail(email)
        if (error) {
            console.log(error);
        }
        if (data) {
            console.log(data);
            setMessage(`We've sent a password reset link to ${email}. The link will expire in 1 hour.`)
        }

    }


    return (
        <div className="max-w-md mx-auto mt-12 px-4">
            {/* Pro Card Container */}
            <div className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-100 border border-gray-100">

                {/* Header Icon Section */}
                <div className="mb-10 text-center">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl mb-4 rotate-3 hover:rotate-0 transition-transform duration-300">
                        <KeyRound size={28} strokeWidth={2.5} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                        Forgot Password?
                    </h2>
                    <p className="text-sm text-gray-500 mt-2">
                        Enter your email and we'll send you <br /> instructions to reset your password.
                    </p>
                </div>

                <form className="space-y-6" onSubmit={forgotPasswordHandle}>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 ml-1">
                            Email Address
                        </label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-500 transition-colors">
                                <Mail size={18} />
                            </div>
                            <input
                                type="email"
                                placeholder="name@company.com"
                                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white focus:outline-none transition-all duration-200 placeholder:text-gray-400 text-gray-800"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    {message && (
                        <div className={`flex items-start gap-3 p-4 rounded-xl border mb-6 animate-in fade-in duration-300 ${message.toLowerCase().includes("error")
                            ? "bg-red-50 border-red-100 text-red-700"
                            : "bg-emerald-50 border-emerald-100 text-emerald-700"
                            }`}>
                            {/* Dynamic Icon */}
                            <div className="mt-0.5">
                                {message.toLowerCase().includes("error") ? (
                                    <AlertCircle size={18} strokeWidth={2.5} />
                                ) : (
                                    <CheckCircle2 size={18} strokeWidth={2.5} />
                                )}
                            </div>

                            {/* Message Content */}
                            <div className="flex-1">
                                <p className="text-sm font-bold leading-none mb-1">
                                    {message.toLowerCase().includes("error") ? "Attention" : "Email Sent"}
                                </p>
                                <p className="text-xs font-medium opacity-90 leading-relaxed">
                                    {message}
                                </p>
                            </div>
                        </div>
                    )}
                    <button
                        type="submit"
                        className="w-full bg-gray-900 hover:bg-black text-white font-bold py-4 rounded-2xl transition-all duration-300 transform active:scale-[0.97] shadow-lg shadow-gray-200 flex items-center justify-center gap-2"
                    >
                        Send Reset Link
                    </button>
                </form>

                {/* Footer Section */}
                <div className="mt-10 pt-6 border-t border-gray-50 text-center">
                    <Link
                        to="/"
                        className="group inline-flex items-center text-sm font-bold text-gray-500 hover:text-indigo-600 transition-all duration-200"
                    >
                        <ArrowLeft
                            size={16}
                            className="mr-2 transform group-hover:-translate-x-1 transition-transform"
                        />
                        Back to Login
                    </Link>
                </div>
            </div>

            {/* Subtle Support Link */}
            <p className="text-center text-gray-400 text-xs mt-8">
                Remembered it? <Link to="/" className="text-indigo-500 hover:underline font-medium">Log in instead</Link>
            </p>
        </div>
    );
}