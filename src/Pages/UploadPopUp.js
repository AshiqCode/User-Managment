import { CloudUpload } from "lucide-react";
import { useState } from "react";
import supabase from "../config/SupaBaseClient";
import { toast } from "react-toastify";
const UploadPopUp = ({ setUploadPopUp, userId }) => {
    console.log(userId);
    const [fileCount, setFileCount] = useState(0)
    const [files, setFiles] = useState(null)
    const UploadFiles = async () => {
        if (!files) {
            toast.error("Select files first")
            return
        }
        const { data, error } = await supabase.storage.from("VaultStorage").upload(`${userId}/${files.name}`, files)
        const { data: userData, error: userError } = await supabase.from("VaultStorage").insert({ userid: userId, imageName: files.name })

        if (data) {
            console.log("file uploaded");
            setFiles(null)
        }
        if (error) {
            console.log(error);
        }
        setUploadPopUp(false)
        toast.success("File Uploaded")
    }



    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="w-full max-w-md mx-4 bg-white rounded-2xl shadow-xl p-6 animate-in fade-in zoom-in">

                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Upload Files
                    </h2>

                    <button
                        onClick={() => setUploadPopUp(false)}
                        className="text-gray-400 hover:text-gray-600 transition"
                    >
                        ✕
                    </button>
                </div>

                {/* Upload area */}
                <div className="relative group border-2 border-dashed border-slate-200 rounded-[2rem] p-10 text-center bg-white hover:bg-blue-50/30 hover:border-blue-300 transition-all duration-300 cursor-pointer overflow-hidden">
                    {/* The Hidden Input - Spreads across the entire parent */}
                    <input
                        type="file"
                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                        onChange={(e) => {
                            setFileCount(e.target.files.length)
                            setFiles(e.target.files[0])
                        }}
                    />

                    <div className="flex flex-col items-center">
                        {/* Icon with a subtle bounce animation on hover */}
                        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-blue-100 transition-all duration-300">
                            <CloudUpload className="text-blue-600" size={32} />
                        </div>

                        <div className="space-y-1">
                            {!fileCount && (
                                <><p className="text-sm font-bold text-slate-700 tracking-tight">
                                    Click to upload or drag and drop
                                </p>

                                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                                        PDF, PNG, JPG or ZIP (max. 50MB)
                                    </p>
                                </>)}
                            {fileCount !== 0 && (<p className="text-sm font-bold text-slate-700 tracking-tight">
                                {fileCount} File  Ready To Upload
                            </p>)}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-6 flex justify-end gap-3">
                    <button
                        onClick={() => {
                            setUploadPopUp(false)
                            setFileCount(0)
                        }}
                        className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800"
                    >
                        Cancel
                    </button>

                    <button onClick={UploadFiles} className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition">
                        Upload
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UploadPopUp;