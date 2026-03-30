"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";

export default function CreatorOnboarding() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    socials: [{ platform: "Instagram", handle: "" }],
    followers: "",
    niche: "",
    equipment: "",
    location: "Global",
  });

  const niches = [
    "Lifestyle",
    "Tech & Gadgets",
    "Beauty & Fashion",
    "Health & Wellness",
    "Kids & Family",
    "Travel",
    "Gaming",
  ];

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const addSocial = () => {
    setFormData({
      ...formData,
      socials: [...formData.socials, { platform: "TikTok", handle: "" }],
    });
  };

  const updateSocial = (index, value) => {
    const newSocials = [...formData.socials];
    newSocials[index].handle = value;
    setFormData({ ...formData, socials: newSocials });
  };

  const updatePlatform = (index, value) => {
    const newSocials = [...formData.socials];
    newSocials[index].platform = value;
    setFormData({ ...formData, socials: newSocials });
  };

  const removeSocial = (index) => {
    if (formData.socials.length > 1) {
      const newSocials = formData.socials.filter((_, i) => i !== index);
      setFormData({ ...formData, socials: newSocials });
    }
  };

  const isStep1Valid = formData.name && formData.socials.every(s => s.handle) && formData.followers;

  return (
    <div className="min-h-screen bg-primary-black text-white relative overflow-hidden pb-20">
      {/* Background radial glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-blue/10 blur-[120px] pointer-events-none" />

      <Navbar />

      <main className="pt-32 px-6 relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Progress Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-black text-white mb-4 tracking-tighter">
              Join the Elite <span className="gradient-text">Creator Pool</span>
            </h1>
            <p className="text-lg text-white/60 font-medium">
              Step {step} of 3:{" "}
              {step === 1
                ? "Your Identity"
                : step === 2
                  ? "Your Content"
                  : "Final Submission"}
            </p>
          </div>

          <div className="bg-white/[0.03] backdrop-blur-xl rounded-[40px] p-8 md:p-12 shadow-2xl border border-white/10 relative overflow-hidden">
            {/* Decorative Background Blob */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent-blue/5 rounded-full blur-3xl opacity-50" />

            {step === 1 && (
              <div className="animate-fade-in relative z-10">
                <h2 className="text-2xl font-extrabold text-white mb-8 tracking-tight">
                  Who are you?
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-white/80 mb-2 px-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Max Creator"
                      className="w-full h-14 px-5 bg-white/5 rounded-2xl border border-white/10 focus:ring-2 focus:ring-accent-blue/40 text-white font-medium transition-all placeholder:text-white/20"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-white/80 mb-3 px-1">
                      Social Handles
                    </label>
                    {formData.socials.map((social, index) => (
                      <div key={index} className="flex gap-3 mb-3 animate-scale-in">
                        <select
                          className="w-32 h-14 px-4 bg-white/5 rounded-2xl border border-white/10 text-white font-medium focus:ring-2 focus:ring-accent-blue/40 scrollbar-hide"
                          value={social.platform}
                          onChange={(e) => updatePlatform(index, e.target.value)}
                        >
                          <option className="bg-primary-black" value="Instagram">IG</option>
                          <option className="bg-primary-black" value="TikTok">TikTok</option>
                          <option className="bg-primary-black" value="YouTube">YT</option>
                          <option className="bg-primary-black" value="Twitter">X</option>
                        </select>
                        <input
                          type="text"
                          placeholder="@handle"
                          className="flex-1 h-14 px-5 bg-white/5 rounded-2xl border border-white/10 focus:ring-2 focus:ring-accent-blue/40 text-white font-medium transition-all placeholder:text-white/20"
                          value={social.handle}
                          onChange={(e) => updateSocial(index, e.target.value)}
                        />
                        {formData.socials.length > 1 && (
                          <button 
                            onClick={() => removeSocial(index)}
                            className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-white/40 hover:text-red-400 hover:bg-red-400/10 transition-all"
                          >
                             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                               <path d="M3 6h18m-2 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                             </svg>
                          </button>
                        )}
                      </div>
                    ))}
                    <button 
                      onClick={addSocial}
                      className="mt-2 text-sm font-bold text-accent-blue hover:text-white transition-colors flex items-center gap-2 px-1"
                    >
                      <span className="text-xl">+</span> Add another handle
                    </button>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-white/80 mb-2 px-1">
                      Total Followers Count
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 50k - 100k"
                      className="w-full h-14 px-5 bg-white/5 rounded-2xl border border-white/10 focus:ring-2 focus:ring-accent-blue/40 text-white font-medium transition-all placeholder:text-white/20"
                      value={formData.followers}
                      onChange={(e) =>
                        setFormData({ ...formData, followers: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="animate-fade-in relative z-10">
                <h2 className="text-2xl font-extrabold text-white mb-8 tracking-tight">
                  What's your niche?
                </h2>
                <p className="text-white/60 mb-8 leading-relaxed font-medium">
                  Select the category you specialize in for Brand deals.
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {niches.map((n) => (
                    <button
                      key={n}
                      onClick={() => setFormData({ ...formData, niche: n })}
                      className={`px-6 py-3 rounded-full text-sm font-bold transition-all border ${
                        formData.niche === n
                          ? "bg-accent-blue text-white border-accent-blue shadow-lg shadow-accent-blue/20"
                          : "bg-white/5 text-white/60 border-white/10 hover:border-accent-blue/30"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="animate-fade-in relative z-10">
                <h2 className="text-2xl font-extrabold text-white mb-8 tracking-tight">
                  Final Setup
                </h2>
                <p className="text-white/60 mb-10 leading-relaxed font-medium">
                  Let us know what kind of gear you're using for content
                  curation.
                </p>

                <div className="space-y-4">
                  {[
                    {
                      id: "pro",
                      title: "Pro Setup",
                      desc: "DSLR/Mirrorless camera + specialized lighting.",
                    },
                    {
                      id: "mobile",
                      title: "Creator Core (Mobile)",
                      desc: "High-end smartphone + ring light/natural light.",
                    },
                    {
                      id: "minimal",
                      title: "Minimalist",
                      desc: "Just my smartphone and a creative eye.",
                    },
                  ].map((gear) => (
                    <button
                      key={gear.id}
                      onClick={() =>
                        setFormData({ ...formData, equipment: gear.id })
                      }
                      className={`w-full p-6 text-left rounded-2xl border transition-all ${
                        formData.equipment === gear.id
                          ? "bg-accent-blue/10 border-accent-blue ring-2 ring-accent-blue/10"
                          : "bg-white/5 border-white/10 hover:border-accent-blue/30"
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span
                          className={`font-bold ${formData.equipment === gear.id ? "text-accent-blue" : "text-white"}`}
                        >
                          {gear.title}
                        </span>
                      </div>
                      <p className="text-sm text-white/40 font-medium">
                        {gear.desc}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div
              className={`mt-12 flex items-center gap-4 ${step === 1 ? "justify-end" : "justify-between"}`}
            >
              {step > 1 && (
                <button
                  onClick={handleBack}
                  className="px-8 h-14 rounded-2xl font-bold text-white/40 hover:text-white transition-colors"
                >
                  Back
                </button>
              )}

              <button
                onClick={
                  step === 3 ? () => alert("Welcome to Spacebar!") : handleNext
                }
                disabled={step === 1 && !isStep1Valid}
                className={`px-10 h-14 rounded-2xl font-bold text-white transition-all ${
                  step === 1 && !isStep1Valid
                    ? "bg-white/10 text-white/20 cursor-not-allowed opacity-50"
                    : "bg-accent-blue hover:bg-accent-blue-hover shadow-lg shadow-accent-blue/25 hover:shadow-accent-blue/40"
                }`}
              >
                {step === 3 ? "Complete Registration" : "Next Step"}
              </button>
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-white/40">
            Already have an account?{" "}
            <a
              href="#"
              className="font-bold text-white hover:text-accent-blue underline transition-colors"
            >
              Log in here
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
