import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Mic, Square, Loader2, MessageSquare, AlertCircle } from 'lucide-react';

const Voice = () => {
    const [recording, setRecording] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [loading, setLoading] = useState(false);
    const mediaRecorder = useRef(null);
    const audioChunks = useRef([]);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder.current = new MediaRecorder(stream);
            audioChunks.current = [];
            mediaRecorder.current.ondataavailable = (event) => {
                audioChunks.current.push(event.data);
            };
            
            mediaRecorder.current.onstop = async () => {
                const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
                sendToBackend(audioBlob);
            };
            mediaRecorder.current.start();
            setRecording(true);
        } catch (err) {
            alert("Microphone access denied.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorder.current) {
            mediaRecorder.current.stop();
            setRecording(false);
        }
    };

    const sendToBackend = async (audioBlob) => {
        setLoading(true);
        const formData = new FormData();
        formData.append("file", audioBlob, "recording.wav");
        try {
            const response = await axios.post("http://localhost:8000/api/voice-to-text", formData);
            setTranscript(response.data.transcript);
        } catch (error) {
            setTranscript("Error: Backend unreachable.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full text-center">
            <h3 className="text-lg font-bold text-blue-900 mb-2 flex items-center justify-center">
                <Mic className="mr-2 text-blue-600" size={20} /> Voice
            </h3>
            <p className="text-xs text-slate-500 mb-4">Hindi, English & Hinglish</p>
            
            {/* Visualizer Area - Matches Vision's Preview Box Height */}
            <div className="border-2 border-dashed border-blue-100 rounded-xl p-4 mb-4 bg-slate-50 flex flex-col items-center justify-center min-h-[160px]">
                {recording ? (
                    <div className="flex flex-col items-center animate-pulse">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-2">
                            <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                        </div>
                        <span className="text-xs text-red-500 font-medium">Recording Audio...</span>
                    </div>
                ) : (
                    <div className="flex flex-col items-center text-slate-400">
                        <Mic size={24} className="mb-2" />
                        <span className="text-xs">Tap start to describe symptoms</span>
                    </div>
                )}
            </div>

            <button 
                onClick={recording ? stopRecording : startRecording}
                className={`w-full py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                    recording ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-600 hover:bg-blue-700'
                } text-white`}
            >
                {recording ? (
                    <> <Square size={18} fill="currentColor" /> Stop & Process </>
                ) : (
                    <> <Mic size={18} /> Start Recording </>
                )}
            </button>

            {/* Transcript Area - Matches Vision's Result Box */}
            {(transcript || loading) && (
                <div className="mt-4 text-left bg-slate-50 p-4 rounded-xl border border-slate-100 min-h-[80px] animate-in fade-in duration-300">
                    <div className="flex items-center gap-2 mb-2">
                        <MessageSquare className="text-blue-600" size={16} />
                        <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Transcript</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                        {loading ? (
                            <span className="flex items-center gap-2 text-blue-500">
                                <Loader2 className="animate-spin" size={14} /> Processing audio...
                            </span>
                        ) : (
                            transcript
                        )}
                    </p>
                </div>
            )}
        </div>
    );
};

export default Voice;