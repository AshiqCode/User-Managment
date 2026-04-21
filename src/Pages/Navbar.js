// components/Navbar.jsx
import { Menu, Search, CloudUpload } from "lucide-react";

export default function Navbar({ onMenuClick, onUploadClick }) {
    return (
        <header className="h-20 flex items-center justify-between px-6 md:px-10 bg-white/40 backdrop-blur-xl border-b border-slate-200/40 sticky top-0 z-40">
            <div className="flex items-center gap-4">
                <button onClick={onMenuClick} className="md:hidden p-2 text-slate-600 bg-white border border-slate-200 rounded-lg shadow-sm">
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
                <button
                    onClick={onUploadClick}
                    className="bg-slate-900 hover:bg-black text-white text-[13px] font-bold px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-slate-900/10 active:scale-95 flex items-center gap-2"
                >
                    <CloudUpload size={16} />
                    Upload
                </button>
            </div>
        </header>
    );
}