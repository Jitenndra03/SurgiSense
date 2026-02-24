import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Heart,
  CheckCircle,
  Clock,
  AlertCircle,
  Calendar,
  Activity,
  FileText,
  Camera,
  MessageCircle,
  Pill,
  ChevronRight,
  Menu,
  Home,
} from "lucide-react";
import { Progress } from "../components/ui/Progress";
import Vision from "../Vision";
import axios from "axios";
import { useState } from "react";

const API_BASE = "http://localhost:8000";

export default function Dashboard() {
  const [digitizedData, setDigitizedData] = useState(null);
  const [loadingRecord, setLoadingRecord] = useState(false);
  
  // Initialize tasks with a placeholder
  const [tasks, setTasks] = useState([
    { id: 'placeholder', title: "Upload Discharge Summary to generate today's schedule.", time: "--", status: "pending", type: "info" }
  ]);

  // Dynamic Patient Data
  const recoveryData = {
    patientName: digitizedData?.patient_name || "Margaret Johnson",
    surgeryType: digitizedData?.surgery_type || digitizedData?.procedure || "Hip Replacement",
    recoveryDay: 8,
    totalDays: 90,
    progress: 9,
  };

  const toggleTaskStatus = (taskId) => {
    if (taskId === 'placeholder') return;
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, status: task.status === 'pending' ? 'completed' : 'pending' };
      }
      return task;
    }));
  };

  const handleDischargeUpload = async (file) => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoadingRecord(true);
      const res = await axios.post(`${API_BASE}/api/digitize-record`, formData);
      const extractedData = res.data.data;
      setDigitizedData(extractedData);

      const medsArray = extractedData?.medication_list || extractedData?.medications || [];
      localStorage.setItem('surgisense_active_meds', JSON.stringify(medsArray));

      try {
        const tasksRes = await axios.post(`${API_BASE}/api/generate-tasks`, {
          document_text: JSON.stringify(extractedData)
        });
        if (tasksRes.data.status === 'success' && tasksRes.data.tasks.length > 0) {
          setTasks(tasksRes.data.tasks);
        }
      } catch (taskErr) {
        console.error("Task generation failed", taskErr);
      }
    } catch (err) {
      console.error("Digitization failed", err);
    } finally {
      setLoadingRecord(false);
    }
  };

  const dischargeInfo = digitizedData
    ? [
        { label: "Procedure", value: digitizedData.surgery_type || digitizedData.procedure || "—" },
        { label: "Follow-up Date", value: digitizedData.follow_up_date || "—" },
        { label: "Doctor", value: digitizedData.doctor || "—" },
        {
          label: "Medications",
          value: `${digitizedData.medication_list?.length || digitizedData.medications?.length || 0} prescriptions`,
        },
      ]
    : [];

  // Dynamic Medications Logic
  const activeMedications = digitizedData?.medication_list || digitizedData?.medications || [];

  return (
    <div className="min-h-screen bg-[#D3D0BC]">
      <header className="bg-[#3E435D] px-4 py-6 sticky top-0 z-10 shadow-md">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Link to="/">
                <Heart className="w-8 h-8 text-[#CBC3A5]" />
              </Link>
              <div>
                <h1 className="text-[#D3D0BC] text-xl font-semibold">{recoveryData.patientName}</h1>
                <p className="text-[#9AA7B1] text-sm">{recoveryData.surgeryType}</p>
              </div>
            </div>
            <button className="text-[#D3D0BC]">
              <Menu className="w-7 h-7" />
            </button>
          </div>

          <div className="bg-[#CBC3A5] rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[#3E435D] font-semibold">Recovery Progress</span>
              <span className="text-[#3E435D] font-semibold">
                Day {recoveryData.recoveryDay} of {recoveryData.totalDays}
              </span>
            </div>
            <Progress value={recoveryData.progress} className="h-3 bg-[#D3D0BC]" />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Quick Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a href="#timeline" className="bg-white rounded-2xl p-4 flex flex-col items-center gap-2 shadow-sm hover:shadow-md transition-shadow">
            <Calendar className="w-8 h-8 text-[#3E435D]" />
            <span className="text-[#3E435D] font-medium text-center">Timeline</span>
          </a>
          <a href="#wound" className="bg-white rounded-2xl p-4 flex flex-col items-center gap-2 shadow-sm hover:shadow-md transition-shadow">
            <Camera className="w-8 h-8 text-[#3E435D]" />
            <span className="text-[#3E435D] font-medium text-center">Wound Check</span>
          </a>
          <Link to="/chat" className="bg-white rounded-2xl p-4 flex flex-col items-center gap-2 shadow-sm hover:shadow-md transition-shadow">
            <MessageCircle className="w-8 h-8 text-[#3E435D]" />
            <span className="text-[#3E435D] font-medium text-center">AI Chat</span>
          </Link>
          <Link to="/pharmacy" className="bg-white rounded-2xl p-4 flex flex-col items-center gap-2 shadow-sm hover:shadow-md transition-shadow">
            <Pill className="w-8 h-8 text-[#3E435D]" />
            <span className="text-[#3E435D] font-medium text-center">Pharmacy</span>
          </Link>
        </div>

        {/* Recovery Timeline */}
        <section id="timeline" className="scroll-mt-20">
          <h2 className="text-[#3E435D] text-2xl font-semibold mb-4">Today's Recovery Tasks</h2>
          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => toggleTaskStatus(task.id)}
                className={`bg-white rounded-2xl p-4 shadow-sm border-l-4 cursor-pointer transition-all hover:bg-slate-50 ${
                  task.status === "completed" ? "border-[#9AA7B1] opacity-75" : 
                  task.status === "alert" ? "border-[#d4183d]" : "border-[#CBC3A5]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    {task.status === "completed" ? <CheckCircle className="w-6 h-6 text-[#9AA7B1]" /> :
                     task.status === "alert" ? <AlertCircle className="w-6 h-6 text-[#d4183d]" /> :
                     <Clock className="w-6 h-6 text-[#CBC3A5]" />}
                    <div>
                      <h3 className={`font-semibold ${task.status === 'completed' ? 'text-[#9AA7B1] line-through' : 'text-[#3E435D]'}`}>{task.title}</h3>
                      <p className="text-[#9AA7B1]">{task.time}</p>
                    </div>
                  </div>
                  <div className={`px-4 py-2 rounded-xl text-sm font-medium ${
                    task.status === "completed" ? "bg-[#9AA7B1] text-white" :
                    task.status === "alert" ? "bg-[#d4183d] text-white" : "bg-[#CBC3A5] text-[#3E435D]"
                  }`}>
                    {task.status === "completed" ? "Done" : task.status === "alert" ? "Review" : "Pending"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Discharge Summary Card */}
        <section className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-6 h-6 text-[#3E435D]" />
            <h2 className="text-[#3E435D] text-2xl font-semibold">Discharge Summary</h2>
          </div>
          {!digitizedData ? (
            <div className="border-2 border-dashed border-[#CBC3A5] rounded-xl p-6 text-center">
              <p className="text-[#3E435D] font-medium mb-2">Upload Discharge Summary (PDF)</p>
              <input type="file" accept="application/pdf" className="hidden" id="discharge-upload" onChange={(e) => handleDischargeUpload(e.target.files[0])} />
              <label htmlFor="discharge-upload" className="inline-block mt-2 bg-[#3E435D] text-[#D3D0BC] px-6 py-2 rounded-xl cursor-pointer hover:opacity-90">
                {loadingRecord ? "Processing..." : "Upload & Digitize"}
              </label>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {dischargeInfo.map((item, index) => (
                <div key={index} className="border-b border-[#CBC3A5] pb-3">
                  <p className="text-[#9AA7B1] text-sm mb-1">{item.label}</p>
                  <p className="text-[#3E435D] font-semibold">{item.value}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        <section id="wound" className="scroll-mt-20">
          <Vision />
        </section>

        {/* --- DYNAMIC MEDICATIONS SECTION --- */}
        <section className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Pill className="w-6 h-6 text-[#3E435D]" />
              <h2 className="text-[#3E435D] text-2xl font-semibold">Medications</h2>
            </div>
            <Link to="/pharmacy" className="text-[#3E435D] font-medium flex items-center gap-1 hover:gap-2 transition-all">
              View All <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="space-y-3">
            {activeMedications.length > 0 ? (
              activeMedications.slice(0, 3).map((med, index) => (
                <div key={index} className="border-l-4 border-[#CBC3A5] pl-4 py-2">
                  <h3 className="text-[#3E435D] font-semibold">{med.name || med.medication_name || "Prescription"}</h3>
                  <p className="text-[#9AA7B1] text-sm">{med.dosage || med.instructions || "Take as directed"}</p>
                </div>
              ))
            ) : (
              <div className="text-center py-6 border-2 border-dashed border-[#D3D0BC] rounded-xl">
                <p className="text-[#9AA7B1] italic">Upload a discharge summary to see your medications.</p>
              </div>
            )}
          </div>
        </section>

        <Link to="/chat" className="block bg-[#3E435D] rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-[#CBC3A5] w-12 h-12 rounded-2xl flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-[#3E435D]" />
              </div>
              <div>
                <h3 className="text-[#D3D0BC] font-semibold text-lg">Need Help?</h3>
                <p className="text-[#9AA7B1]">Chat with AI Recovery Assistant</p>
              </div>
            </div>
            <ChevronRight className="w-6 h-6 text-[#D3D0BC]" />
          </div>
        </Link>
      </div>

      <nav className="sticky bottom-0 bg-white border-t border-[#3E435D]/20 px-4 py-3 mt-6">
        <div className="max-w-7xl mx-auto flex items-center justify-around">
          <Link to="/dashboard" className="flex flex-col items-center gap-1 text-[#3E435D]"><Home className="w-6 h-6" /><span className="text-xs font-medium">Home</span></Link>
          <Link to="/chat" className="flex flex-col items-center gap-1 text-[#9AA7B1]"><MessageCircle className="w-6 h-6" /><span className="text-xs font-medium">Chat</span></Link>
          <a href="#wound" className="flex flex-col items-center gap-1 text-[#9AA7B1]"><Activity className="w-6 h-6" /><span className="text-xs font-medium">Health</span></a>
          <Link to="/pharmacy" className="flex flex-col items-center gap-1 text-[#9AA7B1]"><Pill className="w-6 h-6" /><span className="text-xs font-medium">Meds</span></Link>
        </div>
      </nav>
    </div>
  );
}