import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Pill, AlertCircle, Clock, CheckCircle, Package, MapPin, Navigation, Loader2 } from "lucide-react";
import { Progress } from "../components/ui/Progress"; // Make sure this path matches your project structure
import { motion } from "framer-motion";
import axios from "axios";

const fadeIn = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function Pharmacy() {
  const [medications, setMedications] = useState([]);
  const [hasData, setHasData] = useState(true);
  
  // Pharmacy API States
  const [nearbyPharmacies, setNearbyPharmacies] = useState([]);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState(null);

  useEffect(() => {
    // 1. Load medications from local storage
    const saved = localStorage.getItem('surgisense_active_meds');
    if (saved) {
      try {
        const parsedMeds = JSON.parse(saved);
        if (parsedMeds && parsedMeds.length > 0) {
          setMedications(parsedMeds);
        } else {
          setHasData(false);
        }
      } catch (e) {
        setHasData(false);
      }
    } else {
      setHasData(false);
    }
    
    // 2. Automatically try to find pharmacies on page load
    findNearby();
  }, []);

  const findNearby = () => {
    setLoadingLocation(true);
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      setLoadingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const res = await axios.get(
            `http://localhost:8000/api/pharmacies/nearest?lat=${latitude}&lng=${longitude}`
          );
          setNearbyPharmacies(res.data);
        } catch (err) {
          setLocationError("Could not connect to the pharmacy database.");
        } finally {
          setLoadingLocation(false);
        }
      },
      (error) => {
        if (error.code === 1) {
          setLocationError("Location access denied. Please allow location permissions in your browser URL bar.");
        } else {
          setLocationError("Unable to retrieve your location.");
        }
        setLoadingLocation(false);
      }
    );
  };

  const orderHistory = [
    { date: "Feb 10, 2026", medication: "Acetaminophen 500mg", status: "Delivered" },
    { date: "Feb 7, 2026", medication: "All Post-Surgery Medications", status: "Delivered" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#D3D0BC] to-[#D3D0BC]/90 pb-10">
      {/* Header */}
      <header className="bg-[#3E435D]/95 backdrop-blur-md px-5 py-3 sticky top-0 z-10 border-b border-white/5">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <Link to="/dashboard" className="text-[#D3D0BC] hover:bg-white/10 p-1.5 rounded-lg transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div className="w-9 h-9 bg-[#CBC3A5] rounded-xl flex items-center justify-center">
            <Pill className="w-5 h-5 text-[#3E435D]" />
          </div>
          <div>
            <h1 className="text-[#D3D0BC] text-base font-semibold leading-tight">Pharmacy & Medications</h1>
            <p className="text-[#9AA7B1] text-xs">Manage your prescriptions</p>
          </div>
        </div>
      </header>

      <motion.div initial="hidden" animate="visible" variants={fadeIn} className="max-w-4xl mx-auto px-5 py-6 space-y-5">
        
        {/* Active Medications Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[#3E435D] text-xl font-bold tracking-tight">Active Medications</h2>
            <span className="bg-[#CBC3A5]/30 text-[#3E435D] px-3 py-1 rounded-full text-xs font-semibold">
              {medications.length} active
            </span>
          </div>

          {!hasData ? (
            <div className="text-center py-12 border-2 border-dashed border-[#CBC3A5]/30 rounded-2xl bg-white/60 backdrop-blur-sm">
              <Pill className="w-10 h-10 text-[#9AA7B1] mx-auto mb-3" />
              <p className="text-[#3E435D] font-semibold text-sm mb-1">No Medications Found</p>
              <p className="text-[#9AA7B1] text-xs mb-4">Upload a discharge summary first to see your medications.</p>
              <Link to="/dashboard" className="inline-block bg-[#3E435D] text-[#D3D0BC] px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-[#4a5070] transition-colors shadow-md shadow-[#3E435D]/15">
                Go to Dashboard
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {medications.map((med, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-[#3E435D]/5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-[#3E435D] text-base font-bold mb-0.5">{med.name || med.medication_name || "Prescription"}</h3>
                      <p className="text-[#9AA7B1] text-sm">{med.dosage || med.instructions || "Take as directed"}</p>
                    </div>
                  </div>
                  <Progress value={med.progress || 100} className="h-1.5 mb-3" />
                  <div className="bg-[#D3D0BC]/15 rounded-xl p-3 flex items-center gap-3">
                    <Clock className="w-4 h-4 text-[#3E435D]" />
                    <p className="text-[#3E435D] font-semibold text-sm">{med.nextDose || "As directed"}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* NEAREST PHARMACIES (API Integrated) */}
        <section className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-[#3E435D]/5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-[#3E435D] rounded-xl flex items-center justify-center">
                <Package className="w-5 h-5 text-[#CBC3A5]" />
              </div>
              <h2 className="text-[#3E435D] text-base font-bold">Nearby Pharmacies</h2>
            </div>
            
            {/* The Highly Visible Button */}
            <button 
              onClick={findNearby}
              disabled={loadingLocation}
              className="bg-[#3E435D] text-[#D3D0BC] px-4 py-2 rounded-xl font-semibold text-sm hover:bg-[#4a5070] transition-colors flex items-center gap-2 shadow-sm disabled:opacity-70"
            >
              {loadingLocation ? <Loader2 className="w-4 h-4 animate-spin" /> : <MapPin className="w-4 h-4" />}
              {loadingLocation ? "Locating..." : "Find Nearest"}
            </button>
          </div>

          {locationError && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm mb-4 flex items-start gap-2">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <p>{locationError}</p>
            </div>
          )}

          <div className="space-y-3">
            {nearbyPharmacies.length > 0 ? (
              nearbyPharmacies.map((pharm, idx) => (
                <div key={idx} className="bg-[#D3D0BC]/10 rounded-xl p-4 flex justify-between items-center border border-[#3E435D]/5">
                  <div className="flex-1 pr-4">
                    <h3 className="text-[#3E435D] font-bold text-sm mb-1">{pharm.name}</h3>
                    <div className="flex items-start gap-1.5 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-[#9AA7B1] shrink-0 mt-0.5" />
                      <p className="text-[#596079] text-xs leading-snug">{pharm.address}</p>
                    </div>
                    <p className="text-[#3E435D] font-bold text-xs mt-2 bg-[#CBC3A5]/30 inline-block px-2 py-1 rounded-md">
                      {pharm.distance_km} km away
                    </p>
                  </div>
                  <button 
                    onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(pharm.name + ' ' + pharm.address)}`)}
                    className="p-3 bg-[#3E435D] text-[#D3D0BC] rounded-xl hover:bg-[#4a5070] transition-colors shadow-sm shrink-0"
                  >
                    <Navigation className="w-5 h-5" />
                  </button>
                </div>
              ))
            ) : (
              !loadingLocation && !locationError && (
                <p className="text-[#9AA7B1] text-sm italic text-center py-6 border-2 border-dashed border-[#CBC3A5]/30 rounded-xl">
                  Click the button to scan for pharmacies near your location.
                </p>
              )
            )}
          </div>
        </section>

        {/* Order History */}
        <section className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-[#3E435D]/5">
          <h2 className="text-[#3E435D] text-base font-bold mb-4">Recent Orders</h2>
          <div className="space-y-3">
            {orderHistory.map((order, index) => (
              <div key={index} className="flex items-center justify-between pb-3 border-b border-[#3E435D]/5 last:border-0 last:pb-0">
                <div>
                  <p className="text-[#3E435D] font-semibold text-sm">{order.medication}</p>
                  <p className="text-[#9AA7B1] text-xs">{order.date}</p>
                </div>
                <span className="flex items-center gap-1.5 bg-[#9AA7B1]/10 text-[#9AA7B1] px-2.5 py-1 rounded-lg text-xs font-medium">
                  <CheckCircle className="w-3.5 h-3.5" /> {order.status}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Safety Information */}
        <section className="bg-[#3E435D] rounded-2xl p-5 shadow-lg shadow-[#3E435D]/20">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#CBC3A5] shrink-0 mt-0.5" />
            <div>
              <h3 className="text-[#D3D0BC] font-semibold text-sm mb-2">Medication Safety</h3>
              <ul className="space-y-1.5 text-[#9AA7B1] text-xs">
                {[
                  "Never skip doses without consulting your doctor",
                  "Report any side effects immediately",
                  "Keep medications in original containers",
                  "Store in a cool, dry place away from children",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-[#CBC3A5] mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Emergency Contact */}
        <section className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border-2 border-[#3E435D]/10">
          <h3 className="text-[#3E435D] font-bold text-sm mb-2">Medication Emergency?</h3>
          <p className="text-[#9AA7B1] text-xs mb-3">
            If you experience severe side effects or have taken an incorrect dose:
          </p>
          <div className="space-y-2">
            <a href="tel:911" className="block bg-[#d4183d] text-white py-2.5 rounded-xl font-semibold text-sm text-center hover:bg-[#b01530] transition-colors shadow-sm">
              Emergency: 911
            </a>
            <a href="tel:18002221222" className="block bg-[#3E435D] text-[#D3D0BC] py-2.5 rounded-xl font-semibold text-sm text-center hover:bg-[#4a5070] transition-colors">
              Poison Control: 1-800-222-1222
            </a>
          </div>
        </section>

      </motion.div>
    </div>
  );
}