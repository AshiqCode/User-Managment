import React, { useState } from 'react'
import supabase from '../config/SupaBaseClient';
export default function AuthEmail() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    // const [message, setMessage] = useState()
    const [isLogin, setIsLogin] = useState(false)


    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (isLogin) {
            const { data, error } = await supabase.auth.signInWithPassword({ email, password, })
            if (error) { console.log(error) }
            if (data) { console.log(data) }
        } else {
            const { data, error } = await supabase.auth.signUp({ email, password, })
            if (error) { console.log(error) }
            if (data) { console.log(data) }
        }


    };
    return (
        <div>
            <>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm mt-3 font-medium text-gray-700 mb-1 ml-1">Email Address</label>
                        <input
                            type="email"
                            placeholder="name@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:outline-none transition-all duration-200"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Password</label>
                        <input
                            type="Password"
                            placeholder="******"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:outline-none transition-all duration-200"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gray-900 hover:bg-black text-white font-semibold py-3 rounded-xl transition-all duration-200 transform active:scale-[0.98] disabled:opacity-70"
                    >
                        {loading ? "Sending..." : "SignUp"}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?{" "}
                        <button
                            onClick={() => { setIsLogin(true) }}
                            className="text-indigo-600 font-semibold hover:text-indigo-500 transition-colors duration-200"
                        >
                            Login
                        </button>
                    </p>
                </div>
                {/* {message.text && (
            <div className={`mb-6 p-3 rounded-lg text-sm font-medium ${message.type === "error" ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"
                }`}>
                {message.text}
            </div>
        )} */}
            </>
        </div>
    )
}
