import React, { useEffect, useState } from 'react'
import supabase from '../config/SupaBaseClient';
export default function AuthEmail() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState()
    const [isLogin, setIsLogin] = useState(false)

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage(null);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [message]);
    const handleLogin = async (e) => {
        e.preventDefault();

        if (isLogin) {
            const { data, error } = await supabase.auth.signInWithPassword({ email, password, })
            if (error) {
                console.log(error)
                setMessage(error.message)
            }
            if (data) { console.log(data) }
        } else {
            const { data, error } = await supabase.auth.signUp({ email, password, })
            if (error) {
                console.log(error.message)
                setMessage(error.message)

            }
            if (data) { console.log(data) }
        }


    };
    return (
        <div>
            <>
                <form onSubmit={handleLogin} className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-800">
                        {isLogin ? "Login" : "SignUp"}
                    </h2>
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
                    {message && (
                        <div className={`mb-6 mt-4 p-3 rounded-lg text-sm font-medium ${message.type === "error" ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"
                            }`}>
                            {message}
                        </div>
                    )}
                    <button
                        type="submit"
                        className="w-full bg-gray-900 hover:bg-black text-white font-semibold py-3 rounded-xl transition-all duration-200 transform active:scale-[0.98] disabled:opacity-70"
                    >
                        {isLogin ? "Login" : "SignUp"}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        {isLogin ? "Create New Account " : "Already have an account? "}
                        <button
                            onClick={() => {
                                isLogin ?
                                    setIsLogin(false)
                                    :
                                    setIsLogin(true)
                            }}
                            className="text-indigo-600 font-semibold hover:text-indigo-500 transition-colors duration-200"
                        >
                            {isLogin ? "SignUp" : "Login"}
                        </button>
                        <br />
                        {isLogin && <button
                            className="text-sm mt-2 font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200 focus:outline-none focus:underline"
                        >
                            Forgot Password?
                        </button>}
                    </p>
                </div>

            </>
        </div>
    )
}
