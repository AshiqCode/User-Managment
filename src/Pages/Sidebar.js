// components/Sidebar.jsx
import { LayoutGrid, Users, Star, ShieldCheck, LogOut, CloudUpload } from "lucide-react";

export default function Sidebar({ isOpen, setOpen, user, handleLogout }) {
    return (
        <>
            <aside className={`
                fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200/60 transform transition-all duration-300 ease-in-out md:relative md:translate-x-0
                ${isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"}
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

                    {/* Navigation */}
                    <nav className="flex-1 px-4 space-y-1.5">
                        <button className="flex items-center gap-3 w-full px-4 py-3 text-[14px] font-bold text-blue-600 bg-blue-50/50 rounded-xl transition-all border border-blue-100/50">
                            <LayoutGrid size={18} />
                            All Files
                        </button>
                        <button className="flex items-center gap-3 w-full px-4 py-3 text-[14px] font-semibold text-slate-500 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-all group">
                            <Users size={18} className="group-hover:text-blue-500" />
                            Shared with Other
                        </button>
                        <button className="flex items-center gap-3 w-full px-4 py-3 text-[14px] font-semibold text-slate-500 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-all group">
                            <Star size={18} className="group-hover:text-amber-500" />
                            Starred
                        </button>


                        <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100">
                            <ShieldCheck size={14} />
                            <span className="text-[10px] font-bold uppercase tracking-wider">End-to-End Encrypted</span>
                        </div>
                    </nav>

                    {/* User Profile */}
                    <div className="p-6 bg-slate-50/80 border-t border-slate-100">
                        <div className="flex items-center gap-3 mb-4 px-2">
                            <div className="relative flex-shrink-0 group">
                                <img
                                    src={user?.user_metadata?.avatar_url}
                                    alt="Profile"
                                    className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm ring-1 ring-slate-200 transition-transform group-hover:scale-105"
                                    onError={(e) => {
                                        e.target.src = `https://ui-avatars.com/api/?name=${user?.user_metadata?.full_name || 'User'}&background=0D8ABC&color=fff`;
                                    }}
                                />
                                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
                            </div>

                            <div className="flex-1 min-w-0">
                                <p className="text-[13px] font-bold text-slate-900 truncate leading-tight">
                                    {user?.user_metadata?.full_name || "User"}
                                </p>
                                <p className="text-[10px] font-medium text-slate-500 mt-0.5">
                                    {user?.user_metadata?.email || "User"}
                                </p>
                            </div>
                        </div>

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
            {/* Mobile Overlay */}
            {isOpen && (
                <div onClick={() => setOpen(false)} className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 md:hidden" />
            )}
        </>
    );
}