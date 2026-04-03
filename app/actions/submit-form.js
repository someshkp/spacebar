"use server";

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

/**
 * Contact / Book a Demo form — sends to your inbox via Web3Forms
 */
export async function submitContactForm(formData) {
  try {
    // Collect all entries into a plain object to handle potential Next.js prefixing (e.g., '1_name')
    const rawData = {};
    formData.forEach((value, key) => {
      rawData[key] = value;
    });

    // Helper to get field value regardless of common Next.js prefixes
    const getField = (name) => {
      return formData.get(name) || rawData[name] || rawData[`1_${name}`] || rawData[`0_${name}`];
    };

    const name = getField("name");
    const email = getField("email");
    const company = getField("company");
    const message = getField("message");

    // Ensure we have the required Web3Forms key
    const key = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || process.env.WEB3FORMS_KEY;

    if (!key) {
      console.error("[SubmitForm] WEB3FORMS_KEY is missing.");
      return { success: false, error: "Server configuration error (API Key missing)." };
    }

    if (!name || !email || !company) {
      console.error("[SubmitForm] Validation failed. Data received:", rawData);
      return { success: false, error: "Please fill in all required fields." };
    }

    // Build the final payload for Web3Forms
    const payload = new FormData();
    payload.append("access_key", key);
    payload.append("subject", `New Demo Booking: ${company}`);
    payload.append("from_name", name);
    payload.append("name", name);
    payload.append("email", email);
    payload.append("replyto", email); // Important for replying directly to the user
    payload.append("company", company);
    payload.append("message", message || "No extra details provided.");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: payload,
    });

    const result = await response.json();

    if (result.success) {
      console.log("[SubmitForm] Web3Forms submission successful for:", email);
      return { success: true };
    } else {
      console.error("[SubmitForm] Web3Forms API Error:", result);
      return { success: false, error: result.message || "External API submission failed." };
    }
  } catch (error) {
    console.error("[SubmitForm] Implementation error:", error);
    return { success: false, error: "Internal server error. Please try again." };
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
