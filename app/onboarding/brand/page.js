"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

export default function BrandOnboarding() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState({});

  const [formData, setFormData] = useState({
    brandName: "",
    website: "",
    category: "",
    phone: "",
    whatsapp: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pin: "",
    productName: "",
    productDetails: "",
    goal: "",
    budget: "",
    industry: "e-commerce",
  });

  const categories = [
    "Health & Wellness",
    "Cosmetics & Beauty",
    "Apparel & Fashion",
    "Apps & Digital",
    "Food & Beverage",
    "Pets",
    "Other",
  ];

  const INDIAN_STATES = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry",
  ];

  // Indian standard validation helpers
  const isValidEmail = (email) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email?.trim() || "");

  // Indian mobile numbers: 10 digits starting with 6, 7, 8, or 9
  // Supports optional prefixes +91, 91, or 0
  const isValidIndianMobile = (phone) => {
    if (!phone) return false;
    const digits = phone.replace(/\D/g, "");
    if (digits.length === 10) {
      return /^[6-9]\d{9}$/.test(digits);
    }
    if (digits.length === 11 && digits.startsWith("0")) {
      return /^[6-9]\d{9}$/.test(digits.slice(1));
    }
    if (digits.length === 12 && digits.startsWith("91")) {
      return /^[6-9]\d{9}$/.test(digits.slice(2));
    }
    return false;
  };

  // Indian Postal Index Number (PIN Code): exactly 6 digits, first digit 1-9
  const isValidIndianPin = (pin) => {
    if (!pin) return false;
    const cleaned = pin.replace(/[\s-]/g, "");
    return /^[1-9][0-9]{5}$/.test(cleaned);
  };

  // Indian City/Town name validation (letters, spaces, dots, hyphens)
  const isValidCity = (city) => {
    if (!city || !city.trim()) return false;
    return /^[a-zA-Z\s.'-]{2,50}$/.test(city.trim());
  };

  // Website URL validation
  const isValidUrl = (url) => {
    if (!url || !url.trim()) return false;
    return /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/i.test(url.trim());
  };

  const errors = {
    brandName: !formData.brandName.trim() ? "Brand name is required" : "",
    website: !formData.website.trim()
      ? "Website URL is required"
      : !isValidUrl(formData.website)
      ? "Please enter a valid website URL (e.g. yourbrand.com)"
      : "",
    category: !formData.category ? "Please select a category" : "",
    email: !formData.email.trim()
      ? "Email address is required"
      : !isValidEmail(formData.email)
      ? "Please enter a valid email address"
      : "",
    phone: !formData.phone.trim()
      ? "Contact number is required"
      : !isValidIndianMobile(formData.phone)
      ? "Enter a valid 10-digit Indian mobile number (starts with 6-9)"
      : "",
    whatsapp: !formData.whatsapp.trim()
      ? "WhatsApp number is required"
      : !isValidIndianMobile(formData.whatsapp)
      ? "Enter a valid 10-digit Indian WhatsApp number (starts with 6-9)"
      : "",
    address: !formData.address.trim()
      ? "Office/Company address is required"
      : formData.address.trim().length < 5
      ? "Please enter a complete office address (min 5 characters)"
      : "",
    city: !formData.city.trim()
      ? "City is required"
      : !isValidCity(formData.city)
      ? "Please enter a valid city name"
      : "",
    state: !formData.state ? "Please select a state" : "",
    pin: !formData.pin.trim()
      ? "PIN code is required"
      : !isValidIndianPin(formData.pin)
      ? "Enter a valid 6-digit Indian PIN code (e.g. 400001)"
      : "",
    productName: !formData.productName.trim() ? "Product name is required" : "",
    productDetails: !formData.productDetails.trim()
      ? "Product details are required"
      : "",
    goal: !formData.goal ? "Please select a goal" : "",
    budget: !formData.budget ? "Please select a monthly budget range" : "",
  };

  const isStep1Valid = !errors.brandName && !errors.website && !errors.category;
  const isStep2Valid =
    !errors.email &&
    !errors.phone &&
    !errors.whatsapp &&
    !errors.address &&
    !errors.city &&
    !errors.state &&
    !errors.pin;
  const isStep3Valid = !errors.productName && !errors.productDetails;
  const isStep4Valid = !errors.goal;
  const isStep5Valid = !errors.budget;

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const markStepTouched = (stepNum) => {
    if (stepNum === 1) {
      setTouched((prev) => ({
        ...prev,
        brandName: true,
        website: true,
        category: true,
      }));
    } else if (stepNum === 2) {
      setTouched((prev) => ({
        ...prev,
        email: true,
        phone: true,
        whatsapp: true,
        address: true,
        city: true,
        state: true,
        pin: true,
      }));
    } else if (stepNum === 3) {
      setTouched((prev) => ({
        ...prev,
        productName: true,
        productDetails: true,
      }));
    } else if (stepNum === 4) {
      setTouched((prev) => ({
        ...prev,
        goal: true,
      }));
    }
  };

  const copyPhoneToWhatsApp = () => {
    setFormData((prev) => ({ ...prev, whatsapp: prev.phone }));
    setTouched((prev) => ({ ...prev, whatsapp: true }));
  };

  const handleNext = () => {
    markStepTouched(step);
    if (step === 1 && !isStep1Valid) return;
    if (step === 2 && !isStep2Valid) return;
    if (step === 3 && !isStep3Valid) return;
    if (step === 4 && !isStep4Valid) return;
    setStep(step + 1);
  };

  const handleBack = () => setStep(step - 1);

  const handleSubmit = async () => {
    setTouched((prev) => ({ ...prev, budget: true }));
    if (!isStep5Valid) return;

    setIsSubmitting(true);
    try {
      const payload = {
        access_key: WEB3FORMS_KEY,
        subject: `New Brand Application: ${formData.brandName}`,
        name: formData.brandName,
        from_name: formData.brandName,
        email: formData.email,
        replyto: formData.email,
        message: `
Brand Onboarding Details:
=========================
Brand Information:
- Brand Name: ${formData.brandName}
- Website: ${formData.website}
- Category: ${formData.category}

Contact Details:
- Contact Number: ${formData.phone}
- WhatsApp Number: ${formData.whatsapp}
- Email: ${formData.email}
- Address: ${formData.address}
- City: ${formData.city}
- State: ${formData.state}
- PIN Code: ${formData.pin}

Product Details:
- Product Name: ${formData.productName}
- Product Highlights: ${formData.productDetails}

Campaign Specifications:
- Primary Goal: ${formData.goal}
- Monthly Budget: ${formData.budget}
        `.trim(),
      };

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      console.log("Web3Forms response:", result);

      if (result.success) {
        setSubmitted(true);
      } else {
        alert(result.message || "Submission failed. Please try again.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Network error. Please try again.");
    }
    setIsSubmitting(false);
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
          <h2 className="text-3xl font-extrabold text-white mb-4">Application Sent!</h2>
          <p className="text-lg text-white/60 mb-8 max-w-xs mx-auto">
            We've received your brand and contact details. Our team will reach out within 24 hours.
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
    <div className="min-h-screen bg-primary-black text-white relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-blue/10 blur-[120px] pointer-events-none" />

      <Navbar />

      <main className="pt-32 pb-20 px-6 relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex justify-between mb-2">
              <span className="text-xs font-bold text-accent-blue uppercase tracking-widest">
                Step {step} of 5
              </span>
              <span className="text-xs font-bold text-white/50 uppercase tracking-widest">
                {step === 1
                  ? "Brand Info"
                  : step === 2
                  ? "Contact Details"
                  : step === 3
                  ? "Product Info"
                  : step === 4
                  ? "Goals"
                  : "Finalize"}
              </span>
            </div>
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-accent-blue transition-all duration-500 ease-out"
                style={{ width: `${(step / 5) * 100}%` }}
              />
            </div>
          </div>

          <div className="bg-white/[0.03] backdrop-blur-xl rounded-[40px] p-8 md:p-12 shadow-2xl border border-white/10">
            {/* STEP 1: BRAND INFO */}
            {step === 1 && (
              <div className="animate-fade-in">
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-3xl font-extrabold text-white tracking-tight">
                    Let's start with the basics
                  </h1>
                  <span className="text-xs font-semibold text-accent-blue uppercase tracking-wider bg-accent-blue/10 px-3 py-1 rounded-full border border-accent-blue/20">
                    Required fields *
                  </span>
                </div>
                <p className="text-white/60 mb-10 leading-relaxed font-medium">
                  Tell us about your brand so we can find the perfect creators for you.
                </p>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-white/80 mb-2 px-1">
                      Brand Name <span className="text-accent-blue">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Spacebar Beauty"
                      className={`w-full h-14 px-5 bg-white/5 rounded-2xl border transition-all text-white font-medium placeholder:text-white/20 focus:outline-none ${
                        touched.brandName && errors.brandName
                          ? "border-red-500/80 bg-red-500/5 focus:ring-2 focus:ring-red-500/40"
                          : "border-white/10 focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/40"
                      }`}
                      value={formData.brandName}
                      onBlur={() => handleBlur("brandName")}
                      onChange={(e) =>
                        setFormData({ ...formData, brandName: e.target.value })
                      }
                    />
                    {touched.brandName && errors.brandName && (
                      <p className="text-red-400 text-xs font-semibold mt-1.5 px-1 flex items-center gap-1">
                        <span>⚠</span> {errors.brandName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-white/80 mb-2 px-1">
                      Website URL <span className="text-accent-blue">*</span>
                    </label>
                    <input
                      type="url"
                      placeholder="https://yourbrand.com"
                      className={`w-full h-14 px-5 bg-white/5 rounded-2xl border transition-all text-white font-medium placeholder:text-white/20 focus:outline-none ${
                        touched.website && errors.website
                          ? "border-red-500/80 bg-red-500/5 focus:ring-2 focus:ring-red-500/40"
                          : "border-white/10 focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/40"
                      }`}
                      value={formData.website}
                      onBlur={() => handleBlur("website")}
                      onChange={(e) =>
                        setFormData({ ...formData, website: e.target.value })
                      }
                    />
                    {touched.website && errors.website && (
                      <p className="text-red-400 text-xs font-semibold mt-1.5 px-1 flex items-center gap-1">
                        <span>⚠</span> {errors.website}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-white/80 mb-3 px-1">
                      Category <span className="text-accent-blue">*</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => {
                            setFormData({ ...formData, category: cat });
                            setTouched((prev) => ({ ...prev, category: true }));
                          }}
                          className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all border ${
                            formData.category === cat
                              ? "bg-accent-blue text-white border-accent-blue shadow-lg shadow-accent-blue/20"
                              : "bg-white/5 text-white/60 border-white/10 hover:border-accent-blue/50"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                    {touched.category && errors.category && (
                      <p className="text-red-400 text-xs font-semibold mt-2 px-1 flex items-center gap-1">
                        <span>⚠</span> {errors.category}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: CONTACT DETAILS */}
            {step === 2 && (
              <div className="animate-fade-in">
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-3xl font-extrabold text-white tracking-tight">
                    Contact Details
                  </h1>
                  <span className="text-xs font-semibold text-accent-blue uppercase tracking-wider bg-accent-blue/10 px-3 py-1 rounded-full border border-accent-blue/20">
                    All fields required *
                  </span>
                </div>
                <p className="text-white/60 mb-8 leading-relaxed font-medium">
                  Provide your contact information so our team and creators can coordinate smoothly.
                </p>

                <div className="space-y-6">
                  {/* Email Address */}
                  <div>
                    <label className="block text-sm font-bold text-white/80 mb-2 px-1">
                      Email Address <span className="text-accent-blue">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. partnerships@brand.com"
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

                  {/* Contact Number & WhatsApp */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Contact Number */}
                    <div>
                      <label className="block text-sm font-bold text-white/80 mb-2 px-1">
                        Contact Number <span className="text-accent-blue">*</span>
                      </label>
                      <input
                        type="tel"
                        inputMode="tel"
                        placeholder="e.g. 98765 43210 or +91 98765 43210"
                        className={`w-full h-14 px-5 bg-white/5 rounded-2xl border transition-all text-white font-medium placeholder:text-white/20 focus:outline-none ${
                          touched.phone && errors.phone
                            ? "border-red-500/80 bg-red-500/5 focus:ring-2 focus:ring-red-500/40"
                            : "border-white/10 focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/40"
                        }`}
                        value={formData.phone}
                        onBlur={() => handleBlur("phone")}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                      />
                      {touched.phone && errors.phone && (
                        <p className="text-red-400 text-xs font-semibold mt-1.5 px-1 flex items-center gap-1">
                          <span>⚠</span> {errors.phone}
                        </p>
                      )}
                    </div>

                    {/* WhatsApp */}
                    <div>
                      <div className="flex items-center justify-between mb-2 px-1">
                        <label className="text-sm font-bold text-white/80">
                          WhatsApp Number <span className="text-accent-blue">*</span>
                        </label>
                        {formData.phone && (
                          <button
                            type="button"
                            onClick={copyPhoneToWhatsApp}
                            className="text-[11px] font-bold text-accent-blue hover:text-white transition-colors"
                          >
                            Same as contact
                          </button>
                        )}
                      </div>
                      <input
                        type="tel"
                        inputMode="tel"
                        placeholder="e.g. 98765 43210 or +91 98765 43210"
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

                  {/* Address */}
                  <div>
                    <label className="block text-sm font-bold text-white/80 mb-2 px-1">
                      Office / Registered Address <span className="text-accent-blue">*</span>
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Suite 402, Innov8 Building, MG Road"
                      className={`w-full p-4 bg-white/5 rounded-2xl border transition-all text-white font-medium placeholder:text-white/20 focus:outline-none resize-none ${
                        touched.address && errors.address
                          ? "border-red-500/80 bg-red-500/5 focus:ring-2 focus:ring-red-500/40"
                          : "border-white/10 focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/40"
                      }`}
                      value={formData.address}
                      onBlur={() => handleBlur("address")}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                    />
                    {touched.address && errors.address && (
                      <p className="text-red-400 text-xs font-semibold mt-1.5 px-1 flex items-center gap-1">
                        <span>⚠</span> {errors.address}
                      </p>
                    )}
                  </div>

                  {/* City, State, PIN */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* City */}
                    <div>
                      <label className="block text-sm font-bold text-white/80 mb-2 px-1">
                        City <span className="text-accent-blue">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Mumbai"
                        className={`w-full h-14 px-5 bg-white/5 rounded-2xl border transition-all text-white font-medium placeholder:text-white/20 focus:outline-none ${
                          touched.city && errors.city
                            ? "border-red-500/80 bg-red-500/5 focus:ring-2 focus:ring-red-500/40"
                            : "border-white/10 focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/40"
                        }`}
                        value={formData.city}
                        onBlur={() => handleBlur("city")}
                        onChange={(e) =>
                          setFormData({ ...formData, city: e.target.value })
                        }
                      />
                      {touched.city && errors.city && (
                        <p className="text-red-400 text-xs font-semibold mt-1.5 px-1 flex items-center gap-1">
                          <span>⚠</span> {errors.city}
                        </p>
                      )}
                    </div>

                    {/* State */}
                    <div>
                      <label className="block text-sm font-bold text-white/80 mb-2 px-1">
                        State <span className="text-accent-blue">*</span>
                      </label>
                      <div className="relative">
                        <select
                          className={`w-full h-14 pl-5 pr-10 bg-white/5 rounded-2xl border transition-all font-medium focus:outline-none appearance-none cursor-pointer ${
                            touched.state && errors.state
                              ? "border-red-500/80 bg-red-500/5 focus:ring-2 focus:ring-red-500/40"
                              : "border-white/10 focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/40"
                          } ${!formData.state ? "text-white/30" : "text-white"}`}
                          value={formData.state}
                          onBlur={() => handleBlur("state")}
                          onChange={(e) =>
                            setFormData({ ...formData, state: e.target.value })
                          }
                        >
                          <option value="" disabled className="bg-[#121217] text-white/40">
                            Select State / UT
                          </option>
                          {INDIAN_STATES.map((st) => (
                            <option
                              key={st}
                              value={st}
                              className="bg-[#121217] text-white py-1"
                            >
                              {st}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/40">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </div>
                      </div>
                      {touched.state && errors.state && (
                        <p className="text-red-400 text-xs font-semibold mt-1.5 px-1 flex items-center gap-1">
                          <span>⚠</span> {errors.state}
                        </p>
                      )}
                    </div>

                    {/* PIN Code */}
                    <div>
                      <label className="block text-sm font-bold text-white/80 mb-2 px-1">
                        PIN Code <span className="text-accent-blue">*</span>
                      </label>
                      <input
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        placeholder="e.g. 400001"
                        className={`w-full h-14 px-5 bg-white/5 rounded-2xl border transition-all text-white font-medium placeholder:text-white/20 focus:outline-none ${
                          touched.pin && errors.pin
                            ? "border-red-500/80 bg-red-500/5 focus:ring-2 focus:ring-red-500/40"
                            : "border-white/10 focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/40"
                        }`}
                        value={formData.pin}
                        onBlur={() => handleBlur("pin")}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, "").slice(0, 6);
                          setFormData({ ...formData, pin: val });
                        }}
                      />
                      {touched.pin && errors.pin && (
                        <p className="text-red-400 text-xs font-semibold mt-1.5 px-1 flex items-center gap-1">
                          <span>⚠</span> {errors.pin}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: PRODUCT DETAILS */}
            {step === 3 && (
              <div className="animate-fade-in">
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-3xl font-extrabold text-white tracking-tight">
                    Product Details
                  </h1>
                  <span className="text-xs font-semibold text-accent-blue uppercase tracking-wider bg-accent-blue/10 px-3 py-1 rounded-full border border-accent-blue/20">
                    Required fields *
                  </span>
                </div>
                <p className="text-white/60 mb-10 leading-relaxed font-medium">
                  What product should our creators showcase?
                </p>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-white/80 mb-2 px-1">
                      Product Name <span className="text-accent-blue">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Glow Serum X"
                      className={`w-full h-14 px-5 bg-white/5 rounded-2xl border transition-all text-white font-medium placeholder:text-white/20 focus:outline-none ${
                        touched.productName && errors.productName
                          ? "border-red-500/80 bg-red-500/5 focus:ring-2 focus:ring-red-500/40"
                          : "border-white/10 focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/40"
                      }`}
                      value={formData.productName}
                      onBlur={() => handleBlur("productName")}
                      onChange={(e) =>
                        setFormData({ ...formData, productName: e.target.value })
                      }
                    />
                    {touched.productName && errors.productName && (
                      <p className="text-red-400 text-xs font-semibold mt-1.5 px-1 flex items-center gap-1">
                        <span>⚠</span> {errors.productName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-white/80 mb-2 px-1">
                      Key Highlights & Details <span className="text-accent-blue">*</span>
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us what makes this product special, unique features, or benefits..."
                      className={`w-full p-5 bg-white/5 rounded-2xl border transition-all text-white font-medium placeholder:text-white/20 focus:outline-none resize-none ${
                        touched.productDetails && errors.productDetails
                          ? "border-red-500/80 bg-red-500/5 focus:ring-2 focus:ring-red-500/40"
                          : "border-white/10 focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/40"
                      }`}
                      value={formData.productDetails}
                      onBlur={() => handleBlur("productDetails")}
                      onChange={(e) =>
                        setFormData({ ...formData, productDetails: e.target.value })
                      }
                    />
                    {touched.productDetails && errors.productDetails && (
                      <p className="text-red-400 text-xs font-semibold mt-1.5 px-1 flex items-center gap-1">
                        <span>⚠</span> {errors.productDetails}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: GOALS */}
            {step === 4 && (
              <div className="animate-fade-in">
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-3xl font-extrabold text-white tracking-tight">
                    What's your content goal?
                  </h1>
                  <span className="text-xs font-semibold text-accent-blue uppercase tracking-wider bg-accent-blue/10 px-3 py-1 rounded-full border border-accent-blue/20">
                    Select one *
                  </span>
                </div>
                <p className="text-white/60 mb-10 leading-relaxed font-medium">
                  We'll tailor your creator selection based on these requirements.
                </p>

                <div className="space-y-4">
                  {[
                    {
                      id: "ads",
                      title: "Direct Response Ads",
                      desc: "High-energy videos designed to convert on Meta & TikTok.",
                    },
                    {
                      id: "social",
                      title: "Social Feed Growth",
                      desc: "Aesthetic lifestyle content for your organic presence.",
                    },
                    {
                      id: "reviews",
                      title: "Product Reviews",
                      desc: "Detailed testimonials and unboxing for trust building.",
                    },
                  ].map((goal) => (
                    <button
                      key={goal.id}
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, goal: goal.id });
                        setTouched((prev) => ({ ...prev, goal: true }));
                      }}
                      className={`w-full p-6 text-left rounded-2xl border transition-all ${
                        formData.goal === goal.id
                          ? "bg-accent-blue/10 border-accent-blue shadow-lg shadow-accent-blue/10"
                          : "bg-white/5 border-white/10 hover:border-accent-blue/30"
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span
                          className={`font-bold text-lg ${
                            formData.goal === goal.id
                              ? "text-accent-blue"
                              : "text-white"
                          }`}
                        >
                          {goal.title}
                        </span>
                        {formData.goal === goal.id && (
                          <div className="w-6 h-6 bg-accent-blue rounded-full flex items-center justify-center">
                            <svg
                              width="14"
                              height="14"
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
                      <p className="text-sm text-white/50 font-medium">{goal.desc}</p>
                    </button>
                  ))}
                  {touched.goal && errors.goal && (
                    <p className="text-red-400 text-xs font-semibold mt-2 px-1 flex items-center gap-1">
                      <span>⚠</span> {errors.goal}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* STEP 5: BUDGET */}
            {step === 5 && (
              <div className="animate-fade-in">
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-3xl font-extrabold text-white tracking-tight">
                    Final Step
                  </h1>
                  <span className="text-xs font-semibold text-accent-blue uppercase tracking-wider bg-accent-blue/10 px-3 py-1 rounded-full border border-accent-blue/20">
                    Select budget *
                  </span>
                </div>
                <p className="text-white/60 mb-10 leading-relaxed font-medium">
                  Estimate your approximate monthly budget for UGC.
                </p>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      "Rs 24,000 - 50,000",
                      "Rs 51,000 - 1,00,000",
                      "Rs 1,01,000 - 3,00,000",
                      "Rs 3,01,000 - 5,00,000",
                      "Rs 5,00,000+",
                    ].map((range) => (
                      <button
                        key={range}
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, budget: range });
                          setTouched((prev) => ({ ...prev, budget: true }));
                        }}
                        className={`h-16 rounded-2xl font-bold border transition-all ${
                          formData.budget === range
                            ? "bg-white text-primary-black border-white shadow-xl shadow-white/10"
                            : "bg-white/5 text-white border-white/10 hover:border-accent-blue/30"
                        }`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                  {touched.budget && errors.budget && (
                    <p className="text-red-400 text-xs font-semibold mt-2 px-1 flex items-center gap-1">
                      <span>⚠</span> {errors.budget}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div
              className={`mt-12 pt-8 border-t border-white/10 flex items-center gap-4 ${
                step === 1 ? "justify-end" : "justify-between"
              }`}
            >
              {step > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-8 h-14 rounded-2xl font-bold text-white/40 hover:text-white transition-colors"
                >
                  Back
                </button>
              )}

              <button
                type="button"
                onClick={step === 5 ? handleSubmit : handleNext}
                disabled={
                  (step === 1 && !isStep1Valid) ||
                  (step === 2 && !isStep2Valid) ||
                  (step === 3 && !isStep3Valid) ||
                  (step === 4 && !isStep4Valid) ||
                  (step === 5 && !isStep5Valid) ||
                  isSubmitting
                }
                className={`px-10 h-14 rounded-2xl font-bold text-white transition-all ${
                  (step === 1 && !isStep1Valid) ||
                  (step === 2 && !isStep2Valid) ||
                  (step === 3 && !isStep3Valid) ||
                  (step === 4 && !isStep4Valid) ||
                  (step === 5 && !isStep5Valid) ||
                  isSubmitting
                    ? "bg-white/10 text-white/20 cursor-not-allowed"
                    : "bg-accent-blue hover:bg-accent-blue-hover shadow-lg shadow-accent-blue/25 hover:shadow-accent-blue/40"
                }`}
              >
                {isSubmitting
                  ? "Submitting..."
                  : step === 5
                  ? "Submit Application"
                  : "Continue"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
