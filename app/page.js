import Image from "next/image";
import Navbar from "./components/Navbar";
import AnimateOnScroll from "./components/AnimateOnScroll";
import SignUpButton from "./components/SignUpButton";
import UGCShowcase from "./components/UGCShowcase";

/* ─── Trusted Logos (inline SVG-style blocks) ─── */
const TRUST_LOGOS = [
  "Stripe",
  "Vercel",
  "Linear",
  "Notion",
  "Figma",
  "Slack",
  "Shopify",
  "Webflow",
];

/* ─── Feature Cards Data ─── */
const FEATURES = [
  {
    icon: (
      <svg
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    title: "Discover Perfect Matches",
    desc: "Browse and connect with brands and creators that strongly align with your core values and target audience.",
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    title: "Seamless Collaboration",
    desc: "Chat, negotiate terms, securely share files, and finalize promotion details all from one easy-to-use central dashboard.",
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Secure Agreements",
    desc: "Agree on deliverables beforehand. Secure holding ensures both creators and brands are protected until the job is done.",
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    title: "Verified Profiles",
    desc: "We manually verify our core network to guarantee high-quality, professional collaborations for every single promotion.",
  },
];

/* ─── How It Works Steps ─── */
const STEPS = [
  {
    step: "01",
    title: "Create Your Profile",
    desc: "Sign up and tell us if you're a brand looking for promotion or a creator looking to collaborate.",
  },
  {
    step: "02",
    title: "Connect & Negotiate",
    desc: "Find the right match, send a pitch, and agree on the deliverables for the promotion.",
  },
  {
    step: "03",
    title: "Collaborate & Grow",
    desc: "Publish the content, reach new audiences, and build lasting, mutually beneficial partnerships.",
  },
];

/* ─── Stats ─── */
const STATS = [
  { value: "0%", label: "Hidden Fees" },
  { value: "100%", label: "Secure Payments" },
  { value: "24/7", label: "Dedicated Support" },
  { value: "Seamless", label: "Collaboration" },
];

/* ─── Testimonials ─── */
const TESTIMONIALS = [
  {
    quote:
      "Spacebar made it so easy to connect with brands that actually fit my niche. The collaboration process was smooth from start to finish.",
    name: "Sarah Chen",
    role: "Tech Creator",
    avatar: "SC",
  },
  {
    quote:
      "We struggled to find authentic creators for our new promotion. Spacebar helped us find the perfect matches in a matter of days.",
    name: "Marcus Rivera",
    role: "Apparel Brand Founder",
    avatar: "MR",
  },
  {
    quote:
      "Managing collaborations between our clients and multiple creators used to be a headache. Now we handle all negotiations in one place.",
    name: "Priya Patel",
    role: "Boutique Agency",
    avatar: "PP",
  },
];

/* ─── Pricing ─── */
const PLANS = [
  {
    name: "Creator",
    price: "Free",
    period: "",
    desc: "For creators looking to collaborate",
    features: [
      "Create a public portfolio",
      "Browse brand campaigns",
      "Send up to 5 pitches/mo",
      "Community support",
      "1 team member",
    ],
    cta: "Join as Creator",
    popular: false,
  },
  {
    name: "Brand",
    price: "$29",
    period: "/mo",
    desc: "For brands seeking promotion",
    features: [
      "Post unlimited campaigns",
      "Direct messaging with creators",
      "Secure payment escrow",
      "Priority email support",
      "Up to 3 team members",
      "Verified brand badge",
      "Campaign templates",
    ],
    cta: "Join as Brand",
    popular: true,
  },
  {
    name: "Agency",
    price: "Custom",
    period: "",
    desc: "For talent & marketing agencies",
    features: [
      "Manage multiple clients",
      "Dedicated account manager",
      "Custom commission splitting",
      "SSO / SAML",
      "Custom SLA",
      "Early platform access",
      "Advanced security",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export default function Home() {
  return (
    <>
      <Navbar />

      {/* ════════════════════════════════════════ HERO ════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-20">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay={true}
            loop={true}
            muted={true}
            playsInline={true}
            className="w-full h-full object-cover"
          >
            <source
              src="https://ik.imagekit.io/xmlyox01a/UGC_Creator_Website_Background_Video.mp4?tr=orig-true"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>

          {/* Overlay for Contrast - Maximum Cinematic Darkness */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/85 to-black z-10" />

          {/* Optional: Grid pattern on top of the video */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10 z-20" />
        </div>

        {/* Glows (Adjusted z-index to stay behind text but above video) */}
        <div className="hero-glow top-[-200px] left-1/2 -translate-x-1/2 z-10 opacity-50" />
        <div className="hero-glow bottom-[-100px] right-[-200px] w-[400px] h-[400px] z-10 opacity-30" />

        <div className="relative z-30 max-w-5xl mx-auto px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium mb-8 animate-fade-in backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-accent-blue animate-pulse" />
            The ultimate collaboration hub
          </div>

          {/* H1 - Enhanced styles for maximum visibility */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.08] tracking-tight text-white mb-4 animate-fade-in-up text-shadow-strong">
            Get High-Converting
          </h2>
          <h1 className="gradient-text text-5xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold leading-[0.9] tracking-tighter mb-4 animate-fade-in-up scale-110 md:scale-100 flex justify-center">
            UGC Videos
          </h1>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.08] tracking-tight text-white mb-10 animate-fade-in-up text-shadow-strong">
            for Your Brand in 7 Days
          </h2>

          {/* Sub copy - Changed to white/80 */}
          <p
            className="max-w-2xl mx-auto text-xl md:text-2xl text-white/80 leading-relaxed mb-10 animate-fade-in-up delay-200"
            style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
          >
            Spacebar connects you with India’s best creators to produce
            scroll-stopping content for ads & social media.
          </p>

          {/* CTA Buttons */}
          <div
            className="relative z-40 flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up"
            style={{
              animationDelay: "400ms",
              animationFillMode: "forwards",
              opacity: 0,
            }}
          >
            <SignUpButton
              id="hero-cta-primary"
              className="h-[56px] px-10 flex items-center gap-2 text-lg font-medium text-white bg-accent-blue rounded-xl hover:bg-accent-blue-hover shadow-xl shadow-accent-blue/25 hover:shadow-accent-blue/40 transition-all duration-300 hover:-translate-y-[2px]"
            >
              Sign up for free
            </SignUpButton>
            <a
              href="#features"
              id="hero-cta-secondary"
              className="h-[56px] px-10 flex items-center gap-2 text-lg font-medium text-white bg-white/10 border border-white/20 backdrop-blur-md rounded-xl hover:bg-white/20 transition-all duration-300"
            >
              See How It Works
              <svg
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" />
                <polygon points="10 8 16 12 10 16 10 8" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <UGCShowcase />

      {/* ════════════════════════ TRUST BAR ════════════════════════ */}
      {/* <section className="py-12 border-y border-border-gray bg-light-gray/50">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-sm font-medium text-text-gray mb-8 tracking-wider uppercase">
            Connecting innovative brands with creative minds
          </p>
          <div className="overflow-hidden">
            <div className="flex items-center gap-12 animate-ticker">
              {[...TRUST_LOGOS, ...TRUST_LOGOS].map((name, i) => (
                <div
                  key={`${name}-${i}`}
                  className="flex-shrink-0 text-2xl font-bold text-text-gray/30 hover:text-text-gray/60 transition-colors duration-300 select-none"
                >
                  {name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section> */}

      {/* ════════════════════════ FEATURES ════════════════════════ */}
      <section id="features" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <AnimateOnScroll className="text-center mb-16">
            <p className="text-sm font-semibold text-accent-blue tracking-wider uppercase mb-4">
              Creator Management
            </p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-primary-black tracking-tight mb-5">
              Everything you need to
              <br />
              <span className="gradient-text">source & scale</span>
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-text-gray leading-relaxed">
              One platform, zero compromises. Manage top-tier creators with
              tools built for modern growth teams.
            </p>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FEATURES.map((f, i) => (
              <AnimateOnScroll key={f.title} delay={`delay-${(i + 1) * 100}`}>
                <div className="group relative p-8 md:p-10 rounded-3xl bg-light-gray border border-transparent hover:border-accent-blue/20 hover:shadow-xl hover:shadow-accent-blue/5 transition-all duration-500 cursor-default">
                  {/* Hover glow */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-accent-blue/10 text-accent-blue flex items-center justify-center mb-6 group-hover:bg-accent-blue group-hover:text-white transition-all duration-300 group-hover:shadow-lg group-hover:shadow-accent-blue/25">
                      {f.icon}
                    </div>
                    <h3 className="text-xl font-bold text-primary-black mb-3">
                      {f.title}
                    </h3>
                    <p className="text-text-gray leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════ HOW IT WORKS ════════════════════════ */}
      <section
        id="how-it-works"
        className="py-24 md:py-32 bg-primary-black text-white relative overflow-hidden"
      >
        {/* Background grid */}
        <div className="absolute inset-0 opacity-10 bg-grid-pattern" />
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent-blue/10 blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <AnimateOnScroll className="text-center mb-20">
            <p className="text-sm font-semibold text-accent-blue tracking-wider uppercase mb-4">
              How It Works
            </p>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-5">
              Three steps to
              <br />
              <span className="gradient-text">creator success</span>
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-white/60 leading-relaxed">
              Get your first campaign running in under an hour. Our guided setup
              makes it effortless.
            </p>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STEPS.map((s, i) => (
              <AnimateOnScroll key={s.step} delay={`delay-${(i + 1) * 200}`}>
                <div className="relative group p-8 rounded-3xl glass-dark hover:border-accent-blue/30 transition-all duration-500">
                  <div className="text-6xl font-black text-accent-blue/15 absolute top-6 right-8 group-hover:text-accent-blue/25 transition-colors duration-500">
                    {s.step}
                  </div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-accent-blue flex items-center justify-center text-white font-bold text-lg mb-6 shadow-lg shadow-accent-blue/25">
                      {s.step}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{s.title}</h3>
                    <p className="text-white/60 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════ STATS ════════════════════════ */}
      <section className="py-20 md:py-28 bg-light-gray">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((s, i) => (
              <AnimateOnScroll key={s.label} delay={`delay-${(i + 1) * 100}`}>
                <div className="text-center p-6">
                  <div className="text-4xl md:text-5xl font-extrabold text-accent-blue mb-2 tracking-tight">
                    {s.value}
                  </div>
                  <div className="text-sm font-medium text-text-gray uppercase tracking-wider">
                    {s.label}
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════ TESTIMONIALS ════════════════════════ */}
      {/* <section id="testimonials" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <AnimateOnScroll className="text-center mb-16">
            <p className="text-sm font-semibold text-accent-blue tracking-wider uppercase mb-4">
              Testimonials
            </p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-primary-black tracking-tight mb-5">
              Loved by top
              <br />
              <span className="gradient-text">marketing teams</span>
            </h2>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <AnimateOnScroll key={t.name} delay={`delay-${(i + 1) * 200}`}>
                <div className="group relative p-8 rounded-3xl bg-light-gray border border-transparent hover:border-accent-blue/20 hover:shadow-xl transition-all duration-500">
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, j) => (
                      <svg
                        key={j}
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="#FBBF24"
                        stroke="none"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-primary-black leading-relaxed mb-8 text-[15px]">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-accent-blue flex items-center justify-center text-white text-sm font-bold shadow-md">
                      {t.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-primary-black text-sm">
                        {t.name}
                      </div>
                      <div className="text-xs text-text-gray">{t.role}</div>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section> */}

      {/* ════════════════════════ PRICING ════════════════════════ */}
      {/* <section id="pricing" className="py-24 md:py-32 bg-light-gray">
        <div className="max-w-6xl mx-auto px-6">
          <AnimateOnScroll className="text-center mb-16">
            <p className="text-sm font-semibold text-accent-blue tracking-wider uppercase mb-4">
              Pricing
            </p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-primary-black tracking-tight mb-5">
              Simple, transparent
              <br />
              <span className="gradient-text">pricing for all</span>
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-text-gray leading-relaxed">
              Start free. Upgrade when you&apos;re ready. No hidden fees, no
              surprises.
            </p>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {PLANS.map((plan, i) => (
              <AnimateOnScroll key={plan.name} delay={`delay-${(i + 1) * 200}`}>
                <div
                  className={`relative p-8 rounded-3xl transition-all duration-500 ${
                    plan.popular
                      ? "bg-primary-black text-white border-2 border-accent-blue shadow-2xl shadow-accent-blue/20 scale-[1.03] md:scale-105"
                      : "bg-white border border-border-gray hover:border-accent-blue/30 hover:shadow-xl"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-accent-blue text-white text-xs font-semibold shadow-lg">
                      Most Popular
                    </div>
                  )}
                  <div className="mb-6">
                    <h3
                      className={`text-lg font-bold mb-1 ${
                        plan.popular ? "text-white" : "text-primary-black"
                      }`}
                    >
                      {plan.name}
                    </h3>
                    <p
                      className={`text-sm ${
                        plan.popular ? "text-white/60" : "text-text-gray"
                      }`}
                    >
                      {plan.desc}
                    </p>
                  </div>
                  <div className="mb-8">
                    <span
                      className={`text-4xl font-extrabold ${
                        plan.popular ? "" : "text-primary-black"
                      }`}
                    >
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span
                        className={`text-base ${
                          plan.popular ? "text-white/60" : "text-text-gray"
                        }`}
                      >
                        {plan.period}
                      </span>
                    )}
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-3 text-sm">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke={plan.popular ? "#4F8CFF" : "#16a34a"}
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="flex-shrink-0 mt-0.5"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span
                          className={
                            plan.popular ? "text-white/80" : "text-text-gray"
                          }
                        >
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="/contact"
                    className={`h-[52px] flex items-center justify-center rounded-xl text-sm font-semibold transition-all duration-300 ${
                      plan.popular
                        ? "bg-accent-blue text-white hover:bg-accent-blue-hover shadow-lg shadow-accent-blue/30 hover:-translate-y-[1px]"
                        : "bg-white text-primary-black border border-border-gray hover:border-accent-blue hover:text-accent-blue"
                    }`}
                  >
                    {plan.cta}
                  </a>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section> */}

      {/* ════════════════════════ CTA SECTION ════════════════════════ */}
      <section className="py-24 md:py-32 relative z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-blue via-[#3A7AFF] to-[#2563eb] animate-gradient" />
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        {/* Decorative circles */}
        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-white/10 blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <AnimateOnScroll>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
              Ready to scale your
              <br />
              creator channel?
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-white/80 leading-relaxed mb-10">
              Join our growing network of brands and creators collaborating
              together. Free to start, no credit card required.
            </p>
            <div className="relative z-20 flex flex-col sm:flex-row items-center justify-center gap-4">
              <SignUpButton
                id="cta-primary"
                className="h-[56px] px-10 flex items-center gap-2 text-base font-semibold text-accent-blue bg-white rounded-xl hover:bg-light-gray shadow-xl transition-all duration-300 hover:-translate-y-[2px]"
              >
                Sign up for free
              </SignUpButton>
              <a
                href="/contact"
                id="cta-secondary"
                className="h-[56px] px-10 flex items-center gap-2 text-base font-semibold text-white border-2 border-white/30 rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                Book a Demo
              </a>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ════════════════════════ FOOTER ════════════════════════ */}
      <footer className="bg-primary-black text-white pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <a href="#" className="flex items-center gap-2 mb-5">
                <div className="w-9 h-9 rounded-xl bg-accent-blue flex items-center justify-center">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                </div>
                <span className="text-xl font-bold">
                  Space<span className="text-accent-blue">bar</span>
                </span>
              </a>
              <p className="text-sm text-white/50 leading-relaxed">
                The unified platform for scaling creator campaigns, tracking
                performance, and driving measurable ROI.
              </p>
            </div>

            {/* Links */}
            {[
              {
                title: "Product",
                links: [
                  "Features",
                  "Pricing",
                  "Integrations",
                  "Changelog",
                  "Docs",
                ],
              },
              {
                title: "Company",
                links: ["About", "Blog", "Careers", "Press", "Contact"],
              },
              {
                title: "Resources",
                links: [
                  "Help Center",
                  "Community",
                  "Templates",
                  "API Docs",
                  "Status",
                ],
              },
              {
                title: "Legal",
                links: ["Privacy", "Terms", "Security", "Cookies", "GDPR"],
              },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-4">
                  {col.title}
                </h4>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-white/40 hover:text-accent-blue transition-colors duration-200"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/40">
              © 2026 Spacebar. All rights reserved.
            </p>
            <div className="flex items-center gap-5">
              {/* Social icons */}
              {["X", "GitHub", "LinkedIn", "YouTube"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-xs text-white/40 hover:text-accent-blue transition-colors duration-200"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
