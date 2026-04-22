import { useState, useEffect } from "react";
import supabase from "../config/SupaBaseClient";
import Home from "./Home";
import AuthEmail from "./AuthEmail";

export default function Auth() {

    const [user, setUser] = useState(null);

    const [message, setMessage] = useState({ type: "", text: "" });
    console.log(message);



    const handleGoogleLogin = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
        });
        if (error) setMessage({ type: "error", text: error.message });
    };

    useEffect(() => {
        const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user || null);
        });
        return () => listener.subscription.unsubscribe();
    }, []);

    if (user) return <Home />;

    return (
        <div className="min-h-[100svh] flex items-center justify-center bg-[#f9fafb] px-4 selection:bg-indigo-100">
            <div className="w-full max-w-[400px]">
                {/* Branding / Logo Area */}

                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-200 mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">CloudShare</h1>
                    {/* <p className="text-gray-500 mt-2">Secure file sharing made simple</p> */}
                </div>

                <div className="bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl p-8">

                    <AuthEmail />


                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-100"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-gray-400 uppercase tracking-widest text-[10px] font-bold">OR</span>
                        </div>
                    </div>

                    <button
                        onClick={handleGoogleLogin}
                        className="w-full flex items-center justify-center gap-3 border border-gray-200 py-3 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-medium text-gray-700"
                    >
                        <img
                            src="https://www.svgrepo.com/show/475656/google-color.svg"
                            alt="Google"
                            className="w-5 h-5"
                        />
                        Continue with Google
                    </button>
                </div>

                <p className="text-sm text-gray-400 text-center mt-8">
                    By continuing, you agree to our <span className="underline cursor-pointer">Terms of Service</span>.
                </p>
            </div>
        </div>
    );
}