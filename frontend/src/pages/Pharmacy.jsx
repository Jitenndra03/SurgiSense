import { Link } from "react-router";
import { Heart, ChevronLeft, Pill, AlertCircle, Clock, CheckCircle, Package } from "lucide-react";
import { Progress } from "../components/ui/Progress";

export default function Pharmacy() {
  const medications = [
    {
      id: 1,
      name: "Acetaminophen 500mg",
      dosage: "2 tablets every 6 hours",
      quantity: "60 tablets",
      refillsLeft: 2,
      daysRemaining: 3,
      nextDose: "2:00 PM",
      instructions: "Take with food. Do not exceed 8 tablets in 24 hours.",
      status: "low",
      progress: 15,
    },
    {
      id: 2,
      name: "Cephalexin 500mg",
      dosage: "1 capsule twice daily",
      quantity: "28 capsules",
      refillsLeft: 0,
      daysRemaining: 7,
      nextDose: "6:00 PM",
      instructions: "Complete full course even if feeling better. Take with water.",
      status: "normal",
      progress: 50,
    },
    {
      id: 3,
      name: "Apixaban 5mg",
      dosage: "1 tablet daily",
      quantity: "90 tablets",
      refillsLeft: 3,
      daysRemaining: 15,
      nextDose: "8:00 PM",
      instructions: "Blood thinner. Do not skip doses. Avoid alcohol.",
      status: "normal",
      progress: 85,
    },
  ];

  const orderHistory = [
    { date: "Feb 10, 2026", medication: "Acetaminophen 500mg", status: "Delivered" },
    { date: "Feb 7, 2026", medication: "All Post-Surgery Medications", status: "Delivered" },
  ];

  return (
    <div className="min-h-screen bg-[#D3D0BC]">
      {/* Header */}
      <header className="bg-[#3E435D] px-4 py-4 sticky top-0 z-10 shadow-md">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/dashboard" className="text-[#D3D0BC]">
              <ChevronLeft className="w-7 h-7" />
            </Link>
            <Heart className="w-7 h-7 text-[#CBC3A5]" />
            <div>
              <h1 className="text-[#D3D0BC] text-lg font-semibold">Pharmacy & Medications</h1>
              <p className="text-[#9AA7B1] text-sm">Manage your prescriptions</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Active Medications */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[#3E435D] text-2xl font-semibold">Active Medications</h2>
            <span className="bg-[#CBC3A5] text-[#3E435D] px-3 py-1 rounded-full text-sm font-medium">
              {medications.length} active
            </span>
          </div>

          <div className="space-y-4">
            {medications.map((med) => (
              <div key={med.id} className="bg-white rounded-2xl p-5 shadow-sm">
                {/* Medication Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-[#3E435D] text-xl font-semibold mb-1">{med.name}</h3>
                    <p className="text-[#9AA7B1]">{med.dosage}</p>
                  </div>
                  {med.status === "low" && (
                    <div className="bg-[#CBC3A5] text-[#3E435D] px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      Low
                    </div>
                  )}
                </div>

                {/* Supply Progress */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-[#9AA7B1]">Supply Remaining</span>
                    <span className="text-[#3E435D] font-semibold">{med.daysRemaining} days left</span>
                  </div>
                  <Progress 
                    value={med.progress} 
                    className={`h-2 ${med.status === 'low' ? 'bg-[#CBC3A5]/30' : ''}`}
                  />
                </div>

                {/* Next Dose */}
                <div className="bg-[#D3D0BC] rounded-xl p-3 mb-4 flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#3E435D]" />
                  <div>
                    <p className="text-[#9AA7B1] text-sm">Next Dose</p>
                    <p className="text-[#3E435D] font-semibold">{med.nextDose}</p>
                  </div>
                </div>

                {/* Instructions */}
                <div className="border-t border-[#D3D0BC] pt-3 mb-4">
                  <p className="text-[#3E435D] text-sm">
                    <span className="font-semibold">Instructions:</span> {med.instructions}
                  </p>
                </div>

                {/* Refill Info */}
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <span className="text-[#9AA7B1]">Refills remaining:</span>
                    <span className="text-[#3E435D] font-semibold ml-2">{med.refillsLeft}</span>
                  </div>
                  {med.status === "low" && (
                    <button className="bg-[#3E435D] text-[#D3D0BC] px-5 py-2 rounded-xl font-medium hover:bg-[#4a5070] transition-colors">
                      Order Refill
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pharmacy Info */}
        <section className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Package className="w-6 h-6 text-[#3E435D]" />
            <h2 className="text-[#3E435D] text-xl font-semibold">Your Pharmacy</h2>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="bg-[#3E435D] w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
                <Pill className="w-6 h-6 text-[#D3D0BC]" />
              </div>
              <div>
                <h3 className="text-[#3E435D] font-semibold">CVS Pharmacy #4521</h3>
                <p className="text-[#9AA7B1] text-sm">2847 Oak Street, Suite 100</p>
                <p className="text-[#9AA7B1] text-sm">Springfield, IL 62701</p>
                <p className="text-[#3E435D] font-medium text-sm mt-1">(555) 123-4567</p>
              </div>
            </div>
            <button className="w-full border-2 border-[#3E435D] text-[#3E435D] py-3 rounded-xl font-medium hover:bg-[#3E435D] hover:text-[#D3D0BC] transition-colors">
              Change Pharmacy
            </button>
          </div>
        </section>

        {/* Order History */}
        <section className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="text-[#3E435D] text-xl font-semibold mb-4">Recent Orders</h2>
          <div className="space-y-3">
            {orderHistory.map((order, index) => (
              <div
                key={index}
                className="flex items-center justify-between pb-3 border-b border-[#D3D0BC] last:border-0 last:pb-0"
              >
                <div>
                  <p className="text-[#3E435D] font-semibold">{order.medication}</p>
                  <p className="text-[#9AA7B1] text-sm">{order.date}</p>
                </div>
                <div className="flex items-center gap-2 bg-[#9AA7B1] text-white px-3 py-1 rounded-lg text-sm font-medium">
                  <CheckCircle className="w-4 h-4" />
                  {order.status}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Safety Information */}
        <section className="bg-[#3E435D] rounded-2xl p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-[#CBC3A5] shrink-0 mt-1" />
            <div>
              <h3 className="text-[#D3D0BC] font-semibold mb-2">Important Medication Safety</h3>
              <ul className="space-y-2 text-[#9AA7B1] text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-[#CBC3A5]">•</span>
                  <span>Never skip doses without consulting your doctor</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#CBC3A5]">•</span>
                  <span>Report any side effects or concerns immediately</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#CBC3A5]">•</span>
                  <span>Keep medications in original containers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#CBC3A5]">•</span>
                  <span>Store in a cool, dry place away from children</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Emergency Contact */}
        <section className="bg-white rounded-2xl p-5 shadow-sm border-2 border-[#3E435D]">
          <h3 className="text-[#3E435D] font-semibold mb-3">Medication Emergency?</h3>
          <p className="text-[#9AA7B1] text-sm mb-4">
            If you experience severe side effects or have taken an incorrect dose, contact:
          </p>
          <div className="space-y-2">
            <a
              href="tel:911"
              className="block bg-[#d4183d] text-white py-3 rounded-xl font-semibold text-center hover:bg-[#b01530] transition-colors"
            >
              Emergency: 911
            </a>
            <a
              href="tel:18002221222"
              className="block bg-[#3E435D] text-[#D3D0BC] py-3 rounded-xl font-semibold text-center hover:bg-[#4a5070] transition-colors"
            >
              Poison Control: 1-800-222-1222
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
