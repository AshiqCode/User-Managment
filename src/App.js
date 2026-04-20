import React, { useEffect, useState } from "react";
import supabase from "./config/SupaBaseClient";

const Auth = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user || null);
    };

    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // Google login
  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) console.error(error.message);
  };

  // Magic link login
  const signInWithEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });

    setLoading(false);

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("📩 Check your email for the magic link!");
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">

      <div className="w-full max-w-md p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">

        <h2 className="text-2xl font-bold text-center mb-2">
          Supabase Auth
        </h2>

        <p className="text-sm text-gray-400 text-center mb-6">
          Login with Google or Email Magic Link
        </p>

        {!user ? (
          <div className="space-y-5">

            {/* Google Login */}
            <button
              onClick={signInWithGoogle}
              className="w-full flex items-center justify-center gap-3 bg-white text-black font-medium py-3 rounded-xl hover:bg-gray-200 transition"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Continue with Google
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-xs text-gray-500">OR</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Email Magic Link */}
            <form onSubmit={signInWithEmail} className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:outline-none focus:border-white/30"
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 transition disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Magic Link"}
              </button>
            </form>

            {/* Message */}
            {message && (
              <p className="text-center text-sm text-gray-400">
                {message}
              </p>
            )}
          </div>
        ) : (
          <div className="text-center space-y-5">

            <img
              src={
                user.user_metadata?.avatar_url ||
                "https://ui-avatars.com/api/?name=User"
              }
              className="w-20 h-20 rounded-full mx-auto border border-white/20"
              alt="avatar"
            />

            <div>
              <h3 className="text-lg font-semibold">
                {user.user_metadata?.full_name || "Welcome"}
              </h3>
              <p className="text-sm text-gray-400">{user.email}</p>
            </div>

            <button
              onClick={signOut}
              className="w-full py-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;