import { useEffect, useState } from "react";
import supabase from "../config/SupaBaseClient";
import {
    Folder,
    Users,
    Star,
    Trash2,
    CloudUpload,
    Search,
    MoreVertical,
    Menu,
    LogOut,
    ShieldCheck,
    LayoutGrid,
    Clock
} from "lucide-react"; // install lucide-react first

export default function Home() {
    const [user, setUser] = useState(null);
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const handleLogout = async () => {
        await supabase.auth.signOut();
    };

    useEffect(() => {
        const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user || null);
        });
        return () => listener.subscription.unsubscribe();
    }, []);

    console.log(user?.user_metadata);


    return (
        <div className="flex h-[100dvh] bg-[#F4F7FA] text-slate-900 overflow-hidden selection:bg-blue-100">

            {/* --- SIDEBAR --- */}
            <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200/60 transform transition-all duration-300 ease-in-out md:relative md:translate-x-0
        ${isSidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"}
      `}>
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="p-8">
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-200">
                                <CloudUpload size={20} className="text-white" />
                            </div>
                            <span className="text-xl font-extrabold tracking-tight text-slate-800">Vault</span>
                        </div>
                    </div>

                    {/* Navigation Items (Hardcoded as requested) */}
                    <nav className="flex-1 px-4 space-y-1.5">
                        <button className="flex items-center gap-3 w-full px-4 py-3 text-[14px] font-bold text-blue-600 bg-blue-50/50 rounded-xl transition-all border border-blue-100/50">
                            <LayoutGrid size={18} />
                            All Files
                        </button>
                        <button className="flex items-center gap-3 w-full px-4 py-3 text-[14px] font-semibold text-slate-500 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-all group">
                            <Users size={18} className="group-hover:text-blue-500" />
                            Shared with me
                        </button>
                        <button className="flex items-center gap-3 w-full px-4 py-3 text-[14px] font-semibold text-slate-500 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-all group">
                            <Star size={18} className="group-hover:text-amber-500" />
                            Starred
                        </button>
                        <button className="flex items-center gap-3 w-full px-4 py-3 text-[14px] font-semibold text-slate-500 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-all group">
                            <Clock size={18} className="group-hover:text-indigo-500" />
                            Recent
                        </button>
                        <button className="flex items-center gap-3 w-full px-4 py-3 text-[14px] font-semibold text-slate-500 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-all group">
                            <Trash2 size={18} className="group-hover:text-red-500" />
                            Trash
                        </button>

                        <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100">
                            <ShieldCheck size={14} />
                            <span className="text-[10px] font-bold uppercase tracking-wider">End-to-End Encrypted</span>
                        </div>
                    </nav>

                    {/* User Account / Sign Out */}
                    <div className="p-6 bg-slate-50/80 border-t border-slate-100">
                        <div className="flex items-center gap-3 mb-4 px-2">
                            {/* Avatar Container with Pro Styling */}
                            <div className="relative flex-shrink-0 group">
                                <img
                                    src={user?.user_metadata?.avatar_url}
                                    alt="Profile"
                                    className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm ring-1 ring-slate-200 transition-transform group-hover:scale-105"
                                    onError={(e) => {
                                        e.target.src = `https://ui-avatars.com/api/?name=${user?.user_metadata?.full_name || 'User'}&background=0D8ABC&color=fff`;
                                    }}
                                />
                                {/* Online Status Indicator (Optional Pro touch) */}
                                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
                            </div>

                            <div className="flex-1 min-w-0">
                                <p className="text-[13px] font-bold text-slate-900 truncate leading-tight">
                                    {user?.user_metadata?.full_name || "User"}
                                </p>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                    <span className="inline-block w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
                                    <p className="text-[10px] font-bold text-blue-600/80 uppercase tracking-widest">
                                        Premium Plan
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Sign Out Button - Refined Padding and Contrast */}
                        <button
                            onClick={handleLogout}
                            className="group flex items-center justify-center gap-2 w-full py-2.5 text-[11px] font-extrabold uppercase tracking-wider text-slate-500 bg-white border border-slate-200 rounded-xl hover:text-red-600 hover:border-red-100 hover:bg-red-50 hover:shadow-md hover:shadow-red-500/5 transition-all duration-200 active:scale-95"
                        >
                            <LogOut size={14} className="group-hover:-translate-x-0.5 transition-transform" />
                            Sign Out
                        </button>
                    </div>
                </div>
            </aside>

            {/* --- MAIN CONTENT --- */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">

                {/* Navbar */}
                <header className="h-20 flex items-center justify-between px-6 md:px-10 bg-white/40 backdrop-blur-xl border-b border-slate-200/40 sticky top-0 z-40">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="md:hidden p-2 text-slate-600 bg-white border border-slate-200 rounded-lg shadow-sm">
                            <Menu size={20} />
                        </button>
                        <div className="relative hidden sm:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input
                                type="text"
                                placeholder="Find a file..."
                                className="bg-white border border-slate-200/60 pl-10 pr-4 py-2 rounded-xl text-sm w-64 md:w-80 focus:ring-4 focus:ring-blue-500/5 focus:border-blue-400 outline-none transition-all placeholder:text-slate-400 font-medium"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">

                        <button className="bg-slate-900 hover:bg-black text-white text-[13px] font-bold px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-slate-900/10 active:scale-95 flex items-center gap-2">
                            <CloudUpload size={16} />
                            Upload
                        </button>
                    </div>
                </header>

                {/* Scrollable Viewport */}
                <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-10 custom-scrollbar">

                    {/* Hero Section */}
                    <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Recent Activity</h1>
                            <p className="text-slate-400 text-sm font-medium mt-1">Manage your most recently accessed assets.</p>
                        </div>

                    </section>

                    {/* File Grid */}
                    <section>

                    </section>

                </div>
            </main>

            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 md:hidden" />
            )}
        </div>
    );
}