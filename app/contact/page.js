"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";

const WEB3FORMS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_KEY ||
  "352acfce-7d4d-41ba-b6c9-12a1cf0f4c63";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    marketingHeadName: "",
    company: "",
    email: "",
    mobile: "",
    whatsapp: "",
    contact: "",
    instagramLink: "",
    message: "",
  });

  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const isValidEmail = (val) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val?.trim() || "");

  const isValidPhone = (val) => {
    if (!val) return false;
    const digits = val.replace(/\D/g, "");
    return digits.length >= 10 && digits.length <= 15;
  };

  const errors = {
    marketingHeadName: !formData.marketingHeadName.trim()
      ? "Marketing Head Name is required"
      : "",
    company: !formData.company.trim() ? "Company name is required" : "",
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
    instagramLink: !formData.instagramLink.trim()
      ? "Instagram profile link or handle is required"
      : "",
  };

  const isFormValid =
    !errors.marketingHeadName &&
    !errors.company &&
    !errors.email &&
    !errors.mobile &&
    !errors.whatsapp &&
    !errors.instagramLink;

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const copyMobileToWhatsApp = () => {
    setFormData((prev) => ({ ...prev, whatsapp: prev.mobile }));
    setTouched((prev) => ({ ...prev, whatsapp: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({
      marketingHeadName: true,
      company: true,
      email: true,
      mobile: true,
      whatsapp: true,
      contact: true,
      instagramLink: true,
    });

    if (!isFormValid) {
      setError("Please fill in all required fields correctly.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const payload = {
        access_key: WEB3FORMS_KEY,
        subject: `New Demo Booking: ${formData.company} (${formData.marketingHeadName})`,
        from_name: formData.marketingHeadName,
        email: formData.email,
        message: `
New Demo Booking Request Details:
----------------------------------
- Marketing Head Name: ${formData.marketingHeadName}
- Company / Brand: ${formData.company}
- Work Email: ${formData.email}
- Primary Mobile: ${formData.mobile}
- WhatsApp Number: ${formData.whatsapp}
- Secondary / Office Contact: ${formData.contact || "Not provided"}
- Instagram Link / Handle: ${formData.instagramLink}
- Additional Message / Requirements:
${formData.message || "No specific message provided."}
        `.trim(),
      };

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
      } else {
        setError(result.message || "Submission failed. Please try again.");
      }
    } catch (err) {
      console.error("Submission Error:", err);
      setError("Network error. Could not reach Web3Forms.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary-black text-white relative overflow-hidden pb-20">
      {/* Cinematic Glows */}
      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-accent-blue/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[600px] h-[600px] bg-accent-blue/5 blur-[120px] pointer-events-none" />

      <Navbar />

      <main className="pt-32 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-5">
              Book a <span className="gradient-text">Live Demo</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed font-medium">
              Experience how Spacebar scales your creator marketing and UGC
              campaigns. Our team will show you how we connect you with the
              creators.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: Info */}
            <div className="lg:col-span-4 space-y-8">
              <div
                className="bg-white/[0.03] backdrop-blur-xl rounded-[32px] p-8 border border-white/10 shadow-xl animate-fade-in"
                style={{ animationDelay: "100ms" }}
              >
                <h3 className="text-xs font-bold text-accent-blue uppercase tracking-widest mb-4">
                  What to expect
                </h3>
                <ul className="space-y-4">
                  {[
                    "1-on-1 strategy & platform walkthrough",
                    "Curated creator matching for your niche",
                    "Custom volume-based pricing plans",
                    "Instant onboarding & campaign kick-off",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex gap-3 text-white/80 text-sm font-medium leading-snug"
                    >
                      <div className="w-5 h-5 rounded-full bg-accent-blue/20 flex items-center justify-center text-accent-blue flex-shrink-0 mt-0.5">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-8">
              {!submitted ? (
                <div className="bg-white/[0.03] backdrop-blur-xl rounded-[40px] p-6 sm:p-10 md:p-12 border border-white/10 shadow-2xl animate-scale-in">
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                    <div>
                      <h2 className="text-2xl font-bold text-white tracking-tight">
                        Schedule Your Session
                      </h2>
                      <p className="text-xs sm:text-sm text-white/50 mt-1">
                        Fill in your details and we'll reach out within 2 hours.
                      </p>
                    </div>
                    <span className="text-[11px] font-semibold text-accent-blue uppercase tracking-wider bg-accent-blue/10 px-3 py-1 rounded-full border border-accent-blue/20">
                      * Required
                    </span>
                  </div>

                  <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    noValidate
                  >
                    {/* Row 1: Marketing Head Name & Company */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-bold text-white/80 mb-2 px-1">
                          Marketing Head Name{" "}
                          <span className="text-accent-blue">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Sarah Jenkins"
                          className={`w-full h-14 px-5 bg-white/5 rounded-2xl border transition-all text-white font-medium placeholder:text-white/20 focus:outline-none ${
                            touched.marketingHeadName &&
                            errors.marketingHeadName
                              ? "border-red-500/80 bg-red-500/5 focus:ring-2 focus:ring-red-500/40"
                              : "border-white/10 focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/40"
                          }`}
                          value={formData.marketingHeadName}
                          onBlur={() => handleBlur("marketingHeadName")}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              marketingHeadName: e.target.value,
                            })
                          }
                        />
                        {touched.marketingHeadName &&
                          errors.marketingHeadName && (
                            <p className="text-red-400 text-xs font-semibold mt-1.5 px-1 flex items-center gap-1">
                              <span>⚠</span> {errors.marketingHeadName}
                            </p>
                          )}
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-white/80 mb-2 px-1">
                          Company / Brand Name{" "}
                          <span className="text-accent-blue">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Spacebar Beauty"
                          className={`w-full h-14 px-5 bg-white/5 rounded-2xl border transition-all text-white font-medium placeholder:text-white/20 focus:outline-none ${
                            touched.company && errors.company
                              ? "border-red-500/80 bg-red-500/5 focus:ring-2 focus:ring-red-500/40"
                              : "border-white/10 focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/40"
                          }`}
                          value={formData.company}
                          onBlur={() => handleBlur("company")}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              company: e.target.value,
                            })
                          }
                        />
                        {touched.company && errors.company && (
                          <p className="text-red-400 text-xs font-semibold mt-1.5 px-1 flex items-center gap-1">
                            <span>⚠</span> {errors.company}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Row 2: Work Email & Instagram Link */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-bold text-white/80 mb-2 px-1">
                          Work Email <span className="text-accent-blue">*</span>
                        </label>
                        <input
                          type="email"
                          placeholder="sarah@company.com"
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

                      <div>
                        <label className="block text-sm font-bold text-white/80 mb-2 px-1">
                          Instagram Profile Link / Handle{" "}
                          <span className="text-accent-blue">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="https://instagram.com/brand or @brand"
                          className={`w-full h-14 px-5 bg-white/5 rounded-2xl border transition-all text-white font-medium placeholder:text-white/20 focus:outline-none ${
                            touched.instagramLink && errors.instagramLink
                              ? "border-red-500/80 bg-red-500/5 focus:ring-2 focus:ring-red-500/40"
                              : "border-white/10 focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/40"
                          }`}
                          value={formData.instagramLink}
                          onBlur={() => handleBlur("instagramLink")}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              instagramLink: e.target.value,
                            })
                          }
                        />
                        {touched.instagramLink && errors.instagramLink && (
                          <p className="text-red-400 text-xs font-semibold mt-1.5 px-1 flex items-center gap-1">
                            <span>⚠</span> {errors.instagramLink}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Row 3: Mobile Number & WhatsApp */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-bold text-white/80 mb-2 px-1">
                          Mobile Number{" "}
                          <span className="text-accent-blue">*</span>
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

                      <div>
                        <div className="flex items-center justify-between mb-2 px-1">
                          <label className="text-sm font-bold text-white/80">
                            WhatsApp Number{" "}
                            <span className="text-accent-blue">*</span>
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
                            setFormData({
                              ...formData,
                              whatsapp: e.target.value,
                            })
                          }
                        />
                        {touched.whatsapp && errors.whatsapp && (
                          <p className="text-red-400 text-xs font-semibold mt-1.5 px-1 flex items-center gap-1">
                            <span>⚠</span> {errors.whatsapp}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Row 4: Secondary Contact */}
                    <div>
                      <label className="block text-sm font-bold text-white/80 mb-2 px-1">
                        Alternative Contact / Desk Phone{" "}
                        <span className="text-white/40 text-xs font-normal">
                          (Optional)
                        </span>
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. +91 98765 43210 or 022 2847 0000"
                        className="w-full h-14 px-5 bg-white/5 rounded-2xl border border-white/10 focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/40 text-white font-medium transition-all placeholder:text-white/20 focus:outline-none"
                        value={formData.contact}
                        onChange={(e) =>
                          setFormData({ ...formData, contact: e.target.value })
                        }
                      />
                    </div>

                    {/* Row 5: Message / Requirements */}
                    <div>
                      <label className="block text-sm font-bold text-white/80 mb-2 px-1">
                        How can we help? / Campaign Goals
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Tell us about your creator requirements, monthly video goals, or specific niches..."
                        className="w-full h-28 p-5 bg-white/5 rounded-2xl border border-white/10 focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/40 text-white font-medium transition-all placeholder:text-white/20 resize-none focus:outline-none"
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                      />
                    </div>

                    {error && (
                      <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm font-semibold flex items-center gap-2">
                        <span>⚠</span> {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-16 rounded-2xl bg-accent-blue hover:bg-accent-blue-hover text-white font-bold text-lg shadow-xl shadow-accent-blue/25 hover:shadow-accent-blue/40 transition-all active:scale-[0.99] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting
                        ? "Processing..."
                        : "Confirm Live Demo Booking"}
                      {!isSubmitting && (
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      )}
                    </button>
                  </form>
                </div>
              ) : (
                <div className="bg-white/[0.03] backdrop-blur-xl rounded-[40px] p-12 text-center border border-accent-blue/30 shadow-2xl animate-fade-in shadow-accent-blue/10">
                  <div className="w-20 h-20 bg-accent-blue rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-accent-blue/30">
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="3"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-extrabold text-white mb-4">
                    Demo Request Received!
                  </h2>
                  <p className="text-lg text-white/60 mb-8 max-w-md mx-auto leading-relaxed">
                    Thank you,{" "}
                    <span className="text-white font-semibold">
                      {formData.marketingHeadName}
                    </span>
                    . One of our content strategists will reach out via
                    email/WhatsApp to confirm your custom demo slot.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setError("");
                      setFormData({
                        marketingHeadName: "",
                        company: "",
                        email: "",
                        mobile: "",
                        whatsapp: "",
                        contact: "",
                        instagramLink: "",
                        message: "",
                      });
                      setTouched({});
                    }}
                    className="px-8 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-accent-blue hover:text-white hover:bg-white/10 font-bold transition-all"
                  >
                    Submit Another Request
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
