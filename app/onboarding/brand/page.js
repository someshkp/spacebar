"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";

export default function BrandOnboarding() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    brandName: "",
    website: "",
    category: "",
    productName: "",
    productDetails: "",
    goal: "",
    budget: "",
    industry: "e-commerce",
  });

  const categories = [
    "Health & Wellness", "Cosmetics & Beauty", "Apparel & Fashion", 
    "Apps & Digital", "Food & Beverage", "Pets", "Other"
  ];

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const isStep1Valid = formData.brandName && formData.website && formData.category;
  const isStep2Valid = formData.productName && formData.productDetails;

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
                Step {step} of 4
              </span>
              <span className="text-xs font-bold text-white/50 uppercase tracking-widest">
                {step === 1 ? "Brand Info" : step === 2 ? "Product Info" : step === 3 ? "Goals" : "Finalize"}
              </span>
            </div>
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-accent-blue transition-all duration-500 ease-out"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
          </div>

          <div className="bg-white/[0.03] backdrop-blur-xl rounded-[40px] p-8 md:p-12 shadow-2xl border border-white/10">
            {step === 1 && (
              <div className="animate-fade-in">
                <h1 className="text-3xl font-extrabold text-white mb-2 tracking-tight">
                  Let's start with the basics
                </h1>
                <p className="text-white/60 mb-10 leading-relaxed font-medium">
                  Tell us about your brand so we can find the perfect creators for you.
                </p>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-white/80 mb-2 px-1">
                      Brand Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Spacebar Beauty"
                      className="w-full h-14 px-5 bg-white/5 rounded-2xl border border-white/10 focus:ring-2 focus:ring-accent-blue/40 text-white font-medium transition-all placeholder:text-white/20"
                      value={formData.brandName}
                      onChange={(e) => setFormData({...formData, brandName: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-white/80 mb-2 px-1">
                      Website URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://yourbrand.com"
                      className="w-full h-14 px-5 bg-white/5 rounded-2xl border border-white/10 focus:ring-2 focus:ring-accent-blue/40 text-white font-medium transition-all placeholder:text-white/20"
                      value={formData.website}
                      onChange={(e) => setFormData({...formData, website: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-white/80 mb-3 px-1">
                      Category
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setFormData({...formData, category: cat})}
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
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="animate-fade-in">
                <h1 className="text-3xl font-extrabold text-white mb-2 tracking-tight">
                  Product Details
                </h1>
                <p className="text-white/60 mb-10 leading-relaxed font-medium">
                  What product should our creators showcase?
                </p>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-white/80 mb-2 px-1">
                      Product Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Glow Serum X"
                      className="w-full h-14 px-5 bg-white/5 rounded-2xl border border-white/10 focus:ring-2 focus:ring-accent-blue/40 text-white font-medium transition-all placeholder:text-white/20"
                      value={formData.productName}
                      onChange={(e) => setFormData({...formData, productName: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-white/80 mb-2 px-1">
                      Key Highlights & Details
                    </label>
                    <textarea
                      placeholder="Tell us what makes this product special..."
                      className="w-full h-32 p-5 bg-white/5 rounded-2xl border border-white/10 focus:ring-2 focus:ring-accent-blue/40 text-white font-medium transition-all placeholder:text-white/20 resize-none"
                      value={formData.productDetails}
                      onChange={(e) => setFormData({...formData, productDetails: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="animate-fade-in">
                <h1 className="text-3xl font-extrabold text-white mb-2 tracking-tight">
                   What's your content goal?
                </h1>
                <p className="text-white/60 mb-10 leading-relaxed font-medium">
                  We'll tailor your creator selection based on these requirements.
                </p>

                <div className="space-y-8">
                  <div>
                    <label className="block text-sm font-bold text-white/80 mb-4 px-1">
                      Primary Goal
                    </label>
                    {[
                      { id: "ads", title: "Direct Response Ads", desc: "High-energy videos designed to convert on Meta/TikTok." },
                      { id: "social", title: "Social Feed Growth", desc: "Aesthetic lifestyle content for your organic presence." },
                      { id: "reviews", title: "Product Reviews", desc: "Detailed testimonials and unboxing for trust building." }
                    ].map((goal) => (
                      <button
                        key={goal.id}
                        onClick={() => setFormData({...formData, goal: goal.id})}
                        className={`w-full p-6 text-left rounded-2xl border transition-all mb-4 ${
                          formData.goal === goal.id
                            ? "bg-accent-blue/10 border-accent-blue"
                            : "bg-white/5 border-white/10 hover:border-accent-blue/30"
                        }`}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className={`font-bold ${formData.goal === goal.id ? "text-accent-blue" : "text-white"}`}>
                            {goal.title}
                          </span>
                          {formData.goal === goal.id && (
                            <div className="w-5 h-5 bg-accent-blue rounded-full flex items-center justify-center">
                               <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4">
                                 <polyline points="20 6 9 17 4 12" />
                               </svg>
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-white/40 font-medium">{goal.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="animate-fade-in">
                <h1 className="text-3xl font-extrabold text-white mb-2 tracking-tight">
                   Final Step
                </h1>
                <p className="text-white/60 mb-10 leading-relaxed font-medium">
                  Estimate your approximate monthly budget for UGC.
                </p>

                <div className="space-y-6">
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[ 
                        "$1,000 - $3,000", "$3,000 - $10,000", 
                        "$10,000 - $25,000", "$25,000+" 
                      ].map((range) => (
                        <button
                          key={range}
                          onClick={() => setFormData({...formData, budget: range})}
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
                </div>
              </div>
            )}

            <div className={`mt-12 pt-8 border-t border-white/10 flex items-center gap-4 ${step === 1 ? "justify-end" : "justify-between"}`}>
              {step > 1 && (
                <button
                  onClick={handleBack}
                  className="px-8 h-14 rounded-2xl font-bold text-white/40 hover:text-white transition-colors"
                >
                  Back
                </button>
              )}
              
              <button
                onClick={step === 4 ? () => alert("Form Submitted!") : handleNext}
                disabled={(step === 1 && !isStep1Valid) || (step === 2 && !isStep2Valid)}
                className={`px-10 h-14 rounded-2xl font-bold text-white transition-all ${
                   ((step === 1 && !isStep1Valid) || (step === 2 && !isStep2Valid))
                    ? "bg-white/10 text-white/20 cursor-not-allowed" 
                    : "bg-accent-blue hover:bg-accent-blue-hover shadow-lg shadow-accent-blue/25 hover:shadow-accent-blue/40"
                }`}
              >
                {step === 4 ? "Submit Details" : "Continue"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
