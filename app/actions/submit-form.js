"use server";

const WEB3FORMS_KEY = process.env.WEB3FORMS_ACCESS_KEY;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

/**
 * Contact / Book a Demo form — sends to your inbox via Web3Forms
 */
export async function submitContactForm(formData) {
  try {
    const name = formData.get("name");
    const email = formData.get("email");
    const company = formData.get("company");
    const message = formData.get("message");

    if (!name || !email || !company) {
      return { success: false, error: "Missing required fields." };
    }

    const payload = new FormData();
    payload.append("access_key", WEB3FORMS_KEY);
    payload.append("subject", `New Demo Booking: ${company}`);
    payload.append("name", name);
    payload.append("email", email);
    payload.append("company", company);
    payload.append("message", message || "No message provided");
    if (ADMIN_EMAIL) payload.append("to", ADMIN_EMAIL);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: payload,
    });

    const result = await response.json();

    if (result.success) {
      return { success: true };
    } else {
      console.error("Web3Forms error:", result);
      return { success: false, error: result.message || "Submission failed." };
    }
  } catch (error) {
    console.error("Contact form error:", error?.message || error);
    return { success: false, error: "Network error. Please try again." };
  }
}

/**
 * Creator Onboarding form — sends to your inbox via Web3Forms
 */
export async function submitOnboardingForm(data) {
  try {
    const { name, socials, followers, niche, equipment } = data;

    if (!name || !followers || !niche) {
      return { success: false, error: "Missing required fields." };
    }

    const socialsText = socials.map((s) => `${s.platform}: ${s.handle}`).join(", ");

    const payload = {
      access_key: WEB3FORMS_KEY,
      subject: `New Creator Application: ${name}`,
      name,
      message: `
Creator Application Details:
- Name: ${name}
- Followers: ${followers}
- Niche: ${niche}
- Equipment: ${equipment || "Not specified"}
- Socials: ${socialsText}
      `.trim(),
    };
    if (ADMIN_EMAIL) payload.to = ADMIN_EMAIL;

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (result.success) {
      return { success: true };
    } else {
      console.error("Web3Forms error:", result);
      return { success: false, error: result.message || "Submission failed." };
    }
  } catch (error) {
    console.error("Onboarding error:", error?.message || error);
    return { success: false, error: "Network error. Please try again." };
  }
}
