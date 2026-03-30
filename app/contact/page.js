"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "Book a Demo",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // You would typically handle API logic here
  };

  return (
    <div className="min-h-screen bg-primary-black text-white relative overflow-hidden pb-20">
      {/* Cinematic Glows */}
      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-accent-blue/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[600px] h-[600px] bg-accent-blue/5 blur-[120px] pointer-events-none" />

      <Navbar />

      <main className="pt-32 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
              Book a <span className="gradient-text">Live Demo</span>
            </h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
              Experience how Spacebar can scale your content game. 
              Our team will show you exactly how we find & manage the top 1% of creators.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Left: Info */}
            <div className="lg:col-span-2 space-y-10">
              <div className="animate-fade-in" style={{ animationDelay: "100ms" }}>
                <h3 className="text-xs font-bold text-accent-blue uppercase tracking-widest mb-4">What to expect</h3>
                <ul className="space-y-4">
                  {[
                    "Personalized platform walkthrough",
                    "Creator matching strategy for your niche",
                    "Custom pricing based on your volume",
                    "Early access to new platform features"
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3 text-white/80 font-medium">
                      <div className="w-5 h-5 rounded-full bg-accent-blue/20 flex items-center justify-center text-accent-blue flex-shrink-0 mt-0.5">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-10 border-t border-white/10 animate-fade-in" style={{ animationDelay: "300ms" }}>
                <p className="text-sm font-bold text-white uppercase tracking-wider mb-6">Trusted by</p>
                <div className="flex flex-wrap gap-8 opacity-40">
                   <span className="font-bold text-xl">Stripe</span>
                   <span className="font-bold text-xl">Linear</span>
                   <span className="font-bold text-xl">Notion</span>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-3">
              {!submitted ? (
                <div className="bg-white/[0.03] backdrop-blur-xl rounded-[40px] p-8 md:p-12 border border-white/10 shadow-2xl animate-scale-in">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-white/80 mb-2 px-1">Name</label>
                        <input
                          required
                          type="text"
                          placeholder="Your Name"
                          className="w-full h-14 px-5 bg-white/5 rounded-2xl border border-white/10 focus:ring-2 focus:ring-accent-blue/40 text-white font-medium transition-all placeholder:text-white/20"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-white/80 mb-2 px-1">Work Email</label>
                        <input
                          required
                          type="email"
                          placeholder="you@company.com"
                          className="w-full h-14 px-5 bg-white/5 rounded-2xl border border-white/10 focus:ring-2 focus:ring-accent-blue/40 text-white font-medium transition-all placeholder:text-white/20"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-white/80 mb-2 px-1">Company Name</label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Acme Corp"
                        className="w-full h-14 px-5 bg-white/5 rounded-2xl border border-white/10 focus:ring-2 focus:ring-accent-blue/40 text-white font-medium transition-all placeholder:text-white/20"
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-white/80 mb-2 px-1">How can we help?</label>
                      <textarea
                        placeholder="Tell us about your brand goals..."
                        className="w-full h-32 p-5 bg-white/5 rounded-2xl border border-white/10 focus:ring-2 focus:ring-accent-blue/40 text-white font-medium transition-all placeholder:text-white/20 resize-none"
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full h-16 rounded-2xl bg-accent-blue hover:bg-accent-blue-hover text-white font-bold text-lg shadow-xl shadow-accent-blue/25 hover:shadow-accent-blue/40 transition-all active:scale-95 flex items-center justify-center gap-3"
                    >
                       Confirm Booking
                       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                         <line x1="5" y1="12" x2="19" y2="12"></line>
                         <polyline points="12 5 19 12 12 19"></polyline>
                       </svg>
                    </button>
                  </form>
                </div>
              ) : (
                <div className="bg-white/[0.03] backdrop-blur-xl rounded-[40px] p-12 text-center border border-accent-blue/30 shadow-2xl animate-fade-in shadow-accent-blue/10">
                   <div className="w-20 h-20 bg-accent-blue rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-accent-blue/30">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                   </div>
                   <h2 className="text-3xl font-extrabold text-white mb-4">Request Received!</h2>
                   <p className="text-lg text-white/60 mb-8 max-w-xs mx-auto">
                      One of our content strategists will reach out within the next 2 hours to confirm your demo slot.
                   </p>
                   <button 
                     onClick={() => setSubmitted(false)}
                     className="text-accent-blue font-bold hover:text-white transition-colors"
                   >
                     New Request
                   </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
