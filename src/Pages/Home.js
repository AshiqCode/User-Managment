import { FileText, Download, Trash2 } from 'lucide-react';
import { useEffect, useState } from "react";
import supabase from "../config/SupaBaseClient";
import UploadPopUp from "../Pages/UploadPopUp";
import Sidebar from "../Pages/Sidebar";
import Navbar from "../Pages/Navbar";
import Loading from '../Pages/Loading';
import { toast } from 'react-toastify';

export default function Home() {
    const [user, setUser] = useState(null);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [uploadPopUp, setUploadPopUp] = useState(false);
    const [urls, setUrls] = useState([])

    const handleLogout = async () => {
        await supabase.auth.signOut();
    };

    useEffect(() => {
        const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user || null);
        });
        return () => listener.subscription.unsubscribe();
    }, []);

    useEffect(() => {
        const dataFethcher = async () => {
            if (!user?.id) return;
            const { data } = await supabase
                .storage
                .from('VaultStorage')
                .list(user?.id);

            const urls = data.map((file) => {
                const { data: urlData } = supabase
                    .storage
                    .from("VaultStorage")
                    .getPublicUrl(`${user?.id}/${file.name}`);

                return {
                    name: file.name,
                    path: `${user?.id}/${file.name}`,
                    url: urlData.publicUrl
                };
            });
            console.log(urls);
            setUrls(urls)
        }
        dataFethcher()
    }, [user, uploadPopUp])

    const handleDelete = async (item) => {
        const { data, error } = await supabase.storage.from("VaultStorage").remove([item])
        if (error) {
            toast.error("file not delete")
        }
        if (data) {
            toast.success("file Delete")
            setUrls(prev => prev.filter(file => file.path !== item))
        }

    }


    return (
        <div className="flex h-[100dvh] bg-[#F4F7FA] text-slate-900 overflow-hidden selection:bg-blue-100">

            <Sidebar
                isOpen={isSidebarOpen}
                setOpen={setSidebarOpen}
                user={user}
                handleLogout={handleLogout}
            />

            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <Navbar
                    onMenuClick={() => setSidebarOpen(!isSidebarOpen)}
                    onUploadClick={() => setUploadPopUp(true)}
                />

                <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-10 custom-scrollbar">
                    {/* Hero Section */}
                    <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Your Activities</h1>
                            <p className="text-slate-400 text-sm font-medium mt-1">Manage your Files.</p>
                        </div>
                    </section>

                    {/* File Grid can be another component later */}
                    <section>
                        <div className="flex flex-col gap-3">
                            {urls.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow"
                                >
                                    <div className="flex items-center gap-3">
                                        {/* File Icon */}
                                        <FileText className="text-blue-500" size={24} />

                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-gray-700">
                                                {`File ${index + 1}`}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Action Buttons Container */}
                                    <div className="flex items-center gap-2">
                                        {/* Download Button */}
                                        <a
                                            href={`${item.url}?download=`}
                                            download={item.name}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 bg-white border border-gray-300 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                            title="Download"
                                        >
                                            <Download size={18} />
                                        </a>

                                        {/* Delete Button */}
                                        <button
                                            onClick={() => handleDelete(item.path)}
                                            className="p-2 bg-white border border-gray-300 rounded-md hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
            {!user &&
                <Loading />

            }

            {uploadPopUp && (
                <UploadPopUp setUploadPopUp={setUploadPopUp} userId={user?.id} />
            )}
        </div>
    );
}