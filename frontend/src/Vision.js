import React, { useState } from 'react';
import axios from 'axios';
import { Eye, Upload, Camera, Loader2, AlertTriangle, CheckCircle } from 'lucide-react';

const Vision = () => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [analysis, setAnalysis] = useState("");
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
            setAnalysis(""); // Reset previous analysis
        }
    };

    const analyzeWound = async () => {
        if (!file) return;
        
        setLoading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post("http://localhost:8000/api/analyze-wound", formData);
            setAnalysis(response.data.analysis);
        } catch (error) {
            console.error("Vision API Error:", error);
            setAnalysis("Error: Unable to analyze image. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full text-center">
            <h3 className="text-lg font-bold text-blue-900 mb-2 flex items-center justify-center">
                <Eye className="mr-2 text-blue-600" size={20} /> Vision
            </h3>
            <p className="text-xs text-slate-500 mb-4">Surgical Site Assessment</p>

            {/* Image Preview / Upload Area */}
            <div className="border-2 border-dashed border-blue-100 rounded-xl p-4 mb-4 bg-slate-50 flex flex-col items-center justify-center min-h-[160px]">
                {preview ? (
                    <div className="relative w-full">
                        <img src={preview} alt="Preview" className="max-h-32 mx-auto rounded-lg shadow-sm mb-2" />
                        <button 
                            onClick={() => {setFile(null); setPreview(null);}}
                            className="text-[10px] text-red-500 underline"
                        >
                            Remove photo
                        </button>
                    </div>
                ) : (
                    <label className="cursor-pointer flex flex-col items-center">
                        <Camera size={24} className="text-slate-400 mb-2" />
                        <span className="text-xs text-slate-400">Click to upload photo</span>
                        <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                    </label>
                )}
            </div>

            <button 
                onClick={analyzeWound}
                disabled={loading || !file}
                className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 disabled:bg-slate-300 transition-all flex items-center justify-center gap-2"
            >
                {loading ? (
                    <> <Loader2 className="animate-spin" size={18} /> Analyzing... </>
                ) : (
                    <> <Upload size={18} /> Analyze Wound </>
                )}
            </button>

            {/* Analysis Result Display */}
            {analysis && (
                <div className="mt-4 text-left bg-slate-50 p-4 rounded-xl border border-slate-100 animate-in fade-in duration-300">
                    <div className="flex items-center gap-2 mb-2">
                        {analysis.toLowerCase().includes("infection") || analysis.toLowerCase().includes("redness") ? (
                            <AlertTriangle className="text-orange-500" size={16} />
                        ) : (
                            <CheckCircle className="text-green-500" size={16} />
                        )}
                        <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">AI Assessment</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                        {analysis}
                    </p>
                </div>
            )}
        </div>
    );
};

export default Vision;