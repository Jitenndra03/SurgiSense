import { Link } from "react-router";
import { Heart, Shield, MessageCircle, ArrowRight, CheckCircle } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#D3D0BC]">
      {/* Navigation */}
      <nav className="bg-[#3E435D] px-4 py-4 md:px-8 md:py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-8 h-8 text-[#CBC3A5]" />
            <span className="text-[#D3D0BC] text-xl md:text-2xl font-semibold">SurgiSense</span>
          </div>
          <Link
            to="/dashboard"
            className="bg-transparent border-2 border-[#D3D0BC] text-[#D3D0BC] px-6 py-3 rounded-2xl hover:bg-[#D3D0BC] hover:text-[#3E435D] transition-colors"
          >
            Sign In
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-[#3E435D] text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-6">
              Your AI Recovery Companion After Surgery
            </h1>
            <p className="text-[#9AA7B1] text-xl md:text-2xl mb-8 leading-relaxed">
              Personalized guidance, 24/7 support, and peace of mind during your surgical recovery journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/dashboard"
                className="bg-[#3E435D] text-[#D3D0BC] px-8 py-4 rounded-2xl hover:bg-[#4a5070] transition-colors text-center flex items-center justify-center gap-2 text-lg"
              >
                Get Started <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="border-2 border-[#3E435D] text-[#3E435D] px-8 py-4 rounded-2xl hover:bg-[#3E435D] hover:text-[#D3D0BC] transition-colors text-lg">
                Watch Demo
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-lg">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1685657814797-83706c4e5279?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGRlcmx5JTIwcGF0aWVudCUyMGhlYWx0aGNhcmUlMjByZWNvdmVyeXxlbnwxfHx8fDE3NzExNzA1Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Healthcare professional helping elderly patient"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-[#3E435D] text-3xl md:text-4xl font-semibold text-center mb-4">
            Recovery Made Simple
          </h2>
          <p className="text-[#9AA7B1] text-xl text-center mb-12 max-w-3xl mx-auto">
            Everything you need to recover safely and confidently at home
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-[#D3D0BC] rounded-3xl p-8 shadow-sm">
              <div className="bg-[#3E435D] w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <MessageCircle className="w-8 h-8 text-[#D3D0BC]" />
              </div>
              <h3 className="text-[#3E435D] text-2xl font-semibold mb-3">AI Health Assistant</h3>
              <p className="text-[#3E435D] text-lg leading-relaxed">
                24/7 voice-enabled AI support answers your recovery questions instantly with personalized guidance.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-[#D3D0BC] rounded-3xl p-8 shadow-sm">
              <div className="bg-[#3E435D] w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-[#D3D0BC]" />
              </div>
              <h3 className="text-[#3E435D] text-2xl font-semibold mb-3">Smart Wound Analysis</h3>
              <p className="text-[#3E435D] text-lg leading-relaxed">
                Take a photo of your incision and get instant AI-powered feedback on healing progress.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-[#D3D0BC] rounded-3xl p-8 shadow-sm">
              <div className="bg-[#3E435D] w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 text-[#D3D0BC]" />
              </div>
              <h3 className="text-[#3E435D] text-2xl font-semibold mb-3">Recovery Tracker</h3>
              <p className="text-[#3E435D] text-lg leading-relaxed">
                Visual timeline of your milestones with automated reminders for medications and check-ups.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-[#3E435D] text-3xl md:text-4xl font-semibold text-center mb-12">
            Simple Steps to Better Recovery
          </h2>

          <div className="space-y-8">
            {[
              { step: "1", title: "Connect Your Discharge Summary", desc: "Upload or scan your post-surgery instructions" },
              { step: "2", title: "Set Your Recovery Goals", desc: "AI personalizes your timeline based on your surgery type" },
              { step: "3", title: "Track Daily Progress", desc: "Check tasks, monitor healing, and chat with AI support" },
              { step: "4", title: "Stay Safe at Home", desc: "Get alerts for any concerns and seamless pharmacy refills" },
            ].map((item) => (
              <div key={item.step} className="flex gap-6 items-start bg-white rounded-3xl p-6 shadow-sm">
                <div className="bg-[#CBC3A5] text-[#3E435D] w-12 h-12 rounded-full flex items-center justify-center text-xl font-semibold shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-[#3E435D] text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-[#9AA7B1] text-lg">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-[#3E435D] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-[#D3D0BC] text-3xl md:text-4xl font-semibold mb-6">
                Hospital-Grade Safety You Can Trust
              </h2>
              <ul className="space-y-4">
                {[
                  "HIPAA-compliant secure platform",
                  "AI suggestions backed by medical protocols",
                  "Direct escalation to healthcare providers",
                  "Designed with elderly patients in mind",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[#D3D0BC] text-lg">
                    <CheckCircle className="w-6 h-6 text-[#CBC3A5] shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-lg">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1686052401814-d0430982f8f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwcHJvZmVzc2lvbmFsJTIwY2FyaW5nJTIwZWxkZXJseXxlbnwxfHx8fDE3NzExNzA1MzB8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Medical professional caring for patient"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-[#3E435D] text-3xl md:text-4xl font-semibold mb-6">
            Ready to Start Your Recovery Journey?
          </h2>
          <p className="text-[#9AA7B1] text-xl mb-8">
            Join thousands of patients recovering safely at home with SurgiSense
          </p>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 bg-[#3E435D] text-[#D3D0BC] px-10 py-5 rounded-2xl hover:bg-[#4a5070] transition-colors text-xl"
          >
            Start Free Trial <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#3E435D] py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-6 h-6 text-[#CBC3A5]" />
            <span className="text-[#D3D0BC] text-lg">SurgiSense</span>
          </div>
          <p className="text-[#9AA7B1]">© 2026 SurgiSense. Your trusted recovery companion.</p>
        </div>
      </footer>
    </div>
  );
}
