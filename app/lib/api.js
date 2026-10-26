export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
export async function api(path, options = {}) {
  const token = typeof window !== "undefined" ? localStorage.getItem("spacebar_token") : null;
  const response = await fetch(`${API_URL}${path}`, { ...options, headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}), ...options.headers } });
  const data = response.status === 204 ? null : await response.json();
  if (!response.ok) throw new Error(data?.message || "Request failed.");
  return data;
}

