import { FileText, Download } from 'lucide-react';
import { useEffect, useState } from "react";
import supabase from "../config/SupaBaseClient";
import UploadPopUp from "../Pages/UploadPopUp";
import Sidebar from "../Pages/Sidebar";
import Navbar from "../Pages/Navbar";
import Loading from './Loading';

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
            const { data } = await supabase
                .storage
                .from('VaultStorage')
                .list(user?.id);

            const urls = data.map((file) => {
                const { data: urlData } = supabase
                    .storage
                    .from("VaultStorage")
                    .getPublicUrl(`${user?.id}/${file.name}`);

                return urlData.publicUrl;
            });
            console.log(urls);
            setUrls(urls)
        }
        dataFethcher()
    }, [user, uploadPopUp])

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

                                    {/* Download Button */}
                                    <a
                                        href={`${item}?download=`}
                                        download={item}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 bg-white border border-gray-300 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                    >
                                        <Download size={18} />
                                    </a>
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