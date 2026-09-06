"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

export default function CreatorOnboarding() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    whatsapp: "",
    socials: [{ platform: "Instagram", handle: "" }],
    followers: "",
    niche: "",
    equipment: "",
    location: "India",
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

  // Validation helpers
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email?.trim() || "");
  const isValidPhone = (phone) => {
    if (!phone) return false;
    const digitsOnly = phone.replace(/\D/g, "");
    return digitsOnly.length >= 10 && digitsOnly.length <= 15;
  };

  const errors = {
    name: !formData.name.trim() ? "Full name is required" : "",
    email: !formData.email.trim()
      ? "Email address is required"
      : !isValidEmail(formData.email)
      ? "Please enter a valid email address"
      : "",
    mobile: !formData.mobile.trim()
      ? "Mobile number is required"
      : !isValidPhone(formData.mobile)
      ? "Please enter a valid 10-15 digit mobile number"
      : "",
    whatsapp: !formData.whatsapp.trim()
      ? "WhatsApp number is required"
      : !isValidPhone(formData.whatsapp)
      ? "Please enter a valid 10-15 digit WhatsApp number"
      : "",
    socials: formData.socials.some((s) => !s.handle.trim())
      ? "Please provide handle for all listed platforms"
      : "",
    followers: !formData.followers.trim() ? "Followers count is required" : "",
    niche: !formData.niche ? "Please select your primary niche" : "",
    equipment: !formData.equipment ? "Please select your setup gear" : "",
  };

  const isStep1Valid =
    !errors.name &&
    !errors.email &&
    !errors.mobile &&
    !errors.whatsapp &&
    !errors.socials &&
    !errors.followers;

  const isStep2Valid = !errors.niche;
  const isStep3Valid = !errors.equipment;

  const markAllTouchedStep1 = () => {
    setTouched((prev) => ({
      ...prev,
      name: true,
      email: true,
      mobile: true,
      whatsapp: true,
      socials: true,
      followers: true,
    }));
  };

  const handleNext = () => {
    if (step === 1) {
      markAllTouchedStep1();
      if (!isStep1Valid) return;
    } else if (step === 2) {
      setTouched((prev) => ({ ...prev, niche: true }));
      if (!isStep2Valid) return;
    }
    setStep((prev) => prev + 1);
  };

  const handleBack = () => setStep((prev) => prev - 1);

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const copyMobileToWhatsApp = () => {
    setFormData((prev) => ({ ...prev, whatsapp: prev.mobile }));
    setTouched((prev) => ({ ...prev, whatsapp: true }));
  };

  const handleSubmit = async () => {
    setTouched((prev) => ({ ...prev, equipment: true }));
    if (!isStep3Valid) return;

    setIsSubmitting(true);
    try {
      const socialsText = formData.socials
        .map((s) => `${s.platform}: ${s.handle}`)
        .join(", ");

      const payload = {
        access_key: WEB3FORMS_KEY,
        subject: `New Creator Application: ${formData.name}`,
        from_name: formData.name,
        email: formData.email,
        message: `
Creator Application Details:
-----------------------------
- Full Name: ${formData.name}
- Email: ${formData.email}
- Mobile Number: ${formData.mobile}
- WhatsApp: ${formData.whatsapp}
- Total Followers: ${formData.followers}
- Niche: ${formData.niche}
- Equipment Setup: ${formData.equipment}
- Social Media Handles: ${socialsText}
- Location: ${formData.location}
        `.trim(),
      };

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
      } else {
        alert(result.message || "Submission failed. Please try again.");
      }
    } catch (err) {
      console.error("Error submitting creator form:", err);
      alert("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const addSocial = () => {
    setFormData((prev) => ({
      ...prev,
      socials: [...prev.socials, { platform: "TikTok", handle: "" }],
    }));
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

  if (submitted) {
    return (
      <div className="min-h-screen bg-primary-black text-white relative overflow-hidden flex items-center justify-center p-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-blue/10 blur-[120px] pointer-events-none" />
        <div className="max-w-md w-full bg-white/[0.03] backdrop-blur-xl rounded-[40px] p-12 text-center border border-accent-blue/30 shadow-2xl animate-fade-in">
          <div className="w-20 h-20 bg-accent-blue rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-accent-blue/30">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-white mb-4">You're in!</h2>
          <p className="text-lg text-white/60 mb-8 max-w-xs mx-auto">
            Your profile is being reviewed by our curators. We'll be in touch via email & WhatsApp soon.
          </p>
          <button
            onClick={() => (window.location.href = "/")}
            className="w-full h-14 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold transition-all"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-black text-white relative overflow-hidden pb-20">
      {/* Background radial glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-blue/10 blur-[120px] pointer-events-none" />

      <Navbar />

      <main className="pt-32 px-6 relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Progress Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-black text-white mb-3 tracking-tighter">
              Join the Elite <span className="gradient-text">Creator Pool</span>
            </h1>
            <p className="text-base sm:text-lg text-white/60 font-medium">
              Step {step} of 3:{" "}
              {step === 1
                ? "Contact & Identity"
                : step === 2
                ? "Your Niche & Content"
                : "Equipment & Final Setup"}
            </p>

            {/* Progress Bar */}
            <div className="mt-4 max-w-xs mx-auto h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-accent-blue transition-all duration-500 ease-out"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>

          <div className="bg-white/[0.03] backdrop-blur-xl rounded-[40px] p-6 sm:p-10 md:p-12 shadow-2xl border border-white/10 relative overflow-hidden">
            {/* Decorative Background Blob */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent-blue/5 rounded-full blur-3xl opacity-50" />

            {/* STEP 1: CONTACT & IDENTITY */}
            {step === 1 && (
              <div className="animate-fade-in relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-extrabold text-white tracking-tight">
                    Tell us about yourself
                  </h2>
                  <span className="text-xs font-semibold text-accent-blue uppercase tracking-wider bg-accent-blue/10 px-3 py-1 rounded-full border border-accent-blue/20">
                    Required fields *
                  </span>
                </div>

                <div className="space-y-5">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-bold text-white/80 mb-2 px-1">
                      Full Name <span className="text-accent-blue">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Alex Morgan"
                      className={`w-full h-14 px-5 bg-white/5 rounded-2xl border transition-all text-white font-medium placeholder:text-white/20 focus:outline-none ${
                        touched.name && errors.name
                          ? "border-red-500/80 bg-red-500/5 focus:ring-2 focus:ring-red-500/40"
                          : "border-white/10 focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/40"
                      }`}
                      value={formData.name}
                      onBlur={() => handleBlur("name")}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                    {touched.name && errors.name && (
                      <p className="text-red-400 text-xs font-semibold mt-1.5 px-1 flex items-center gap-1">
                        <span>⚠</span> {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email ID */}
                  <div>
                    <label className="block text-sm font-bold text-white/80 mb-2 px-1">
                      Email Address <span className="text-accent-blue">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. creator@example.com"
                      className={`w-full h-14 px-5 bg-white/5 rounded-2xl border transition-all text-white font-medium placeholder:text-white/20 focus:outline-none ${
                        touched.email && errors.email
                          ? "border-red-500/80 bg-red-500/5 focus:ring-2 focus:ring-red-500/40"
                          : "border-white/10 focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/40"
                      }`}
                      value={formData.email}
                      onBlur={() => handleBlur("email")}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                    {touched.email && errors.email && (
                      <p className="text-red-400 text-xs font-semibold mt-1.5 px-1 flex items-center gap-1">
                        <span>⚠</span> {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Mobile Number & WhatsApp Section */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Mobile Number */}
                    <div>
                      <label className="block text-sm font-bold text-white/80 mb-2 px-1">
                        Mobile Number <span className="text-accent-blue">*</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. +91 98765 43210"
                        className={`w-full h-14 px-5 bg-white/5 rounded-2xl border transition-all text-white font-medium placeholder:text-white/20 focus:outline-none ${
                          touched.mobile && errors.mobile
                            ? "border-red-500/80 bg-red-500/5 focus:ring-2 focus:ring-red-500/40"
                            : "border-white/10 focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/40"
                        }`}
                        value={formData.mobile}
                        onBlur={() => handleBlur("mobile")}
                        onChange={(e) =>
                          setFormData({ ...formData, mobile: e.target.value })
                        }
                      />
                      {touched.mobile && errors.mobile && (
                        <p className="text-red-400 text-xs font-semibold mt-1.5 px-1 flex items-center gap-1">
                          <span>⚠</span> {errors.mobile}
                        </p>
                      )}
                    </div>

                    {/* WhatsApp */}
                    <div>
                      <div className="flex items-center justify-between mb-2 px-1">
                        <label className="text-sm font-bold text-white/80">
                          WhatsApp <span className="text-accent-blue">*</span>
                        </label>
                        {formData.mobile && (
                          <button
                            type="button"
                            onClick={copyMobileToWhatsApp}
                            className="text-[11px] font-bold text-accent-blue hover:text-white transition-colors"
                          >
                            Same as mobile
                          </button>
                        )}
                      </div>
                      <input
                        type="tel"
                        placeholder="e.g. +91 98765 43210"
                        className={`w-full h-14 px-5 bg-white/5 rounded-2xl border transition-all text-white font-medium placeholder:text-white/20 focus:outline-none ${
                          touched.whatsapp && errors.whatsapp
                            ? "border-red-500/80 bg-red-500/5 focus:ring-2 focus:ring-red-500/40"
                            : "border-white/10 focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/40"
                        }`}
                        value={formData.whatsapp}
                        onBlur={() => handleBlur("whatsapp")}
                        onChange={(e) =>
                          setFormData({ ...formData, whatsapp: e.target.value })
                        }
                      />
                      {touched.whatsapp && errors.whatsapp && (
                        <p className="text-red-400 text-xs font-semibold mt-1.5 px-1 flex items-center gap-1">
                          <span>⚠</span> {errors.whatsapp}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Social Handles */}
                  <div>
                    <label className="block text-sm font-bold text-white/80 mb-3 px-1">
                      Social Handles <span className="text-accent-blue">*</span>
                    </label>
                    {formData.socials.map((social, index) => (
                      <div key={index} className="flex gap-3 mb-3 animate-scale-in">
                        <select
                          className="w-32 h-14 px-4 bg-white/5 rounded-2xl border border-white/10 text-white font-medium focus:ring-2 focus:ring-accent-blue/40 scrollbar-hide focus:outline-none"
                          value={social.platform}
                          onChange={(e) => updatePlatform(index, e.target.value)}
                        >
                          <option className="bg-primary-black" value="Instagram">Instagram</option>
                          <option className="bg-primary-black" value="TikTok">TikTok</option>
                          <option className="bg-primary-black" value="YouTube">YouTube</option>
                          <option className="bg-primary-black" value="Twitter">X / Twitter</option>
                        </select>
                        <input
                          type="text"
                          placeholder="@username"
                          className={`flex-1 h-14 px-5 bg-white/5 rounded-2xl border transition-all text-white font-medium placeholder:text-white/20 focus:outline-none ${
                            touched.socials && !social.handle.trim()
                              ? "border-red-500/80 bg-red-500/5 focus:ring-2 focus:ring-red-500/40"
                              : "border-white/10 focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/40"
                          }`}
                          value={social.handle}
                          onBlur={() => handleBlur("socials")}
                          onChange={(e) => updateSocial(index, e.target.value)}
                        />
                        {formData.socials.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeSocial(index)}
                            className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-white/40 hover:text-red-400 hover:bg-red-400/10 transition-all"
                            title="Remove Handle"
                          >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M3 6h18m-2 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                            </svg>
                          </button>
                        )}
                      </div>
                    ))}
                    {touched.socials && errors.socials && (
                      <p className="text-red-400 text-xs font-semibold mb-2 px-1 flex items-center gap-1">
                        <span>⚠</span> {errors.socials}
                      </p>
                    )}
                    <button
                      type="button"
                      onClick={addSocial}
                      className="mt-1 text-sm font-bold text-accent-blue hover:text-white transition-colors flex items-center gap-1.5 px-1"
                    >
                      <span className="text-lg font-normal">+</span> Add another handle
                    </button>
                  </div>

                  {/* Followers Count */}
                  <div>
                    <label className="block text-sm font-bold text-white/80 mb-2 px-1">
                      Total Followers Count <span className="text-accent-blue">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 25k, 50k - 100k, 500k+"
                      className={`w-full h-14 px-5 bg-white/5 rounded-2xl border transition-all text-white font-medium placeholder:text-white/20 focus:outline-none ${
                        touched.followers && errors.followers
                          ? "border-red-500/80 bg-red-500/5 focus:ring-2 focus:ring-red-500/40"
                          : "border-white/10 focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/40"
                      }`}
                      value={formData.followers}
                      onBlur={() => handleBlur("followers")}
                      onChange={(e) =>
                        setFormData({ ...formData, followers: e.target.value })
                      }
                    />
                    {touched.followers && errors.followers && (
                      <p className="text-red-400 text-xs font-semibold mt-1.5 px-1 flex items-center gap-1">
                        <span>⚠</span> {errors.followers}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: NICHE SELECTION */}
            {step === 2 && (
              <div className="animate-fade-in relative z-10">
                <h2 className="text-2xl font-extrabold text-white mb-2 tracking-tight">
                  What's your primary niche? <span className="text-accent-blue">*</span>
                </h2>
                <p className="text-white/60 mb-8 leading-relaxed font-medium">
                  Select the category you specialize in for brand campaigns and UGC deals.
                </p>

                <div className="flex flex-wrap gap-2.5 mb-4">
                  {niches.map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, niche: n });
                        setTouched((prev) => ({ ...prev, niche: true }));
                      }}
                      className={`px-6 py-3.5 rounded-full text-sm font-bold transition-all border ${
                        formData.niche === n
                          ? "bg-accent-blue text-white border-accent-blue shadow-lg shadow-accent-blue/25 scale-[1.02]"
                          : "bg-white/5 text-white/70 border-white/10 hover:border-accent-blue/50 hover:text-white"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
                {touched.niche && errors.niche && (
                  <p className="text-red-400 text-xs font-semibold mt-3 px-1 flex items-center gap-1">
                    <span>⚠</span> {errors.niche}
                  </p>
                )}
              </div>
            )}

            {/* STEP 3: EQUIPMENT & FINAL SETUP */}
            {step === 3 && (
              <div className="animate-fade-in relative z-10">
                <h2 className="text-2xl font-extrabold text-white mb-2 tracking-tight">
                  Equipment Setup <span className="text-accent-blue">*</span>
                </h2>
                <p className="text-white/60 mb-8 leading-relaxed font-medium">
                  Let us know what kind of gear you use for video creation and lighting.
                </p>

                <div className="space-y-4">
                  {[
                    {
                      id: "Pro Setup (DSLR / Mirrorless + Studio Lighting)",
                      title: "Pro Setup",
                      desc: "DSLR/Mirrorless camera + professional studio lighting and mic.",
                    },
                    {
                      id: "Creator Core (High-end Smartphone + Ring Light)",
                      title: "Creator Core (Mobile)",
                      desc: "Latest iPhone / flagship smartphone + ring light / natural lighting.",
                    },
                    {
                      id: "Minimalist (Smartphone Only)",
                      title: "Minimalist",
                      desc: "Smartphone with natural light and creative storytelling eye.",
                    },
                  ].map((gear) => (
                    <button
                      key={gear.id}
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, equipment: gear.id });
                        setTouched((prev) => ({ ...prev, equipment: true }));
                      }}
                      className={`w-full p-6 text-left rounded-2xl border transition-all ${
                        formData.equipment === gear.id
                          ? "bg-accent-blue/15 border-accent-blue ring-2 ring-accent-blue/20"
                          : "bg-white/5 border-white/10 hover:border-accent-blue/40"
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span
                          className={`font-bold ${
                            formData.equipment === gear.id
                              ? "text-accent-blue"
                              : "text-white"
                          }`}
                        >
                          {gear.title}
                        </span>
                        {formData.equipment === gear.id && (
                          <div className="w-5 h-5 bg-accent-blue rounded-full flex items-center justify-center">
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="white"
                              strokeWidth="4"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-white/50 font-medium">
                        {gear.desc}
                      </p>
                    </button>
                  ))}
                </div>
                {touched.equipment && errors.equipment && (
                  <p className="text-red-400 text-xs font-semibold mt-3 px-1 flex items-center gap-1">
                    <span>⚠</span> {errors.equipment}
                  </p>
                )}
              </div>
            )}

            {/* Navigation Buttons */}
            <div
              className={`mt-10 pt-6 border-t border-white/10 flex items-center gap-4 ${
                step === 1 ? "justify-end" : "justify-between"
              }`}
            >
              {step > 1 && (
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleBack}
                  className="px-6 sm:px-8 h-14 rounded-2xl font-bold text-white/50 hover:text-white transition-colors disabled:opacity-0"
                >
                  ← Back
                </button>
              )}

              <button
                type="button"
                onClick={step === 3 ? handleSubmit : handleNext}
                disabled={isSubmitting}
                className="px-8 sm:px-10 h-14 rounded-2xl font-bold text-white transition-all bg-accent-blue hover:bg-accent-blue-hover shadow-lg shadow-accent-blue/25 hover:shadow-accent-blue/40 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting
                  ? "Submitting..."
                  : step === 3
                  ? "Complete Registration"
                  : "Next Step →"}
              </button>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-white/40">
            Are you a brand looking to hire creators?{" "}
            <a
              href="/onboarding/brand"
              className="font-bold text-white hover:text-accent-blue underline transition-colors"
            >
              Apply as a Brand
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}

