const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
const KEY = 'spacebar.session';
const SESSION_CHANGED = 'spacebar:session-changed';
export function saveSession(data) {
  sessionStorage.setItem(KEY, JSON.stringify({ ...data, expiresAt: Date.now() + (data.expiresIn || 3600) * 1000 }));
  if (typeof window !== 'undefined') window.dispatchEvent(new Event(SESSION_CHANGED));
}
export function subscribeToSession(listener) {
  window.addEventListener(SESSION_CHANGED, listener);
  return () => window.removeEventListener(SESSION_CHANGED, listener);
}
export function sessionDashboardPath() {
  const current = session();
  return current?.token ? dashboardPath(current.user?.role) || '/account' : '';
}
export function dashboardPath(role) {
  if (role === 'creator') return '/dashboard/creator';
  if (role === 'business') return '/dashboard/brand';
  if (role === 'admin') return '/account';
  return null;
}
export async function currentUser() {
  const token = await accessToken();
  if (!token) return null;
  if (session()?.user) return session().user;
  // One-time recovery for sessions saved before login included the profile.
  const { user } = await api('/me');
  updateSessionUser(user);
  return user;
}
function updateSessionUser(user) {
  const current = session();
  if (!current) return;
  sessionStorage.setItem(KEY, JSON.stringify({ ...current, user }));
  if (current.user?.role !== user?.role && typeof window !== 'undefined') {
    window.dispatchEvent(new Event(SESSION_CHANGED));
  }
}
export function clearSession() {
  sessionStorage.removeItem(KEY);
  if (typeof window !== 'undefined') window.dispatchEvent(new Event(SESSION_CHANGED));
}
function session() {
  try { return JSON.parse(sessionStorage.getItem(KEY) || 'null'); } catch { return null; }
}
let refreshing;
async function accessToken() {
  let current = session();
  if (current?.token && current.expiresAt < Date.now() + 30000) {
    if (!refreshing) refreshing = api('/auth/refresh', { method: 'POST', body: { refreshToken: current.refreshToken }, anonymous: true })
      .then(data => { saveSession(data); return data; }).catch(error => { clearSession(); throw error; }).finally(() => { refreshing = null; });
    current = await refreshing;
  }
  return current?.token;
}
export async function api(path, { method = 'GET', body, anonymous = false } = {}) {
  const token = anonymous ? null : await accessToken();
  const isFile = typeof Blob !== 'undefined' && body instanceof Blob;
  const response = await fetch(`${API_URL}/api${path}`, {
    method,
    headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(body ? { 'Content-Type': isFile ? body.type : 'application/json' } : {}) },
    body: body ? (isFile ? body : JSON.stringify(body)) : undefined,
    cache: 'no-store',
  });
  if (response.status === 204) return {};
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || 'Request failed. Please try again.');
  if (path === '/me' && data.user) updateSessionUser(data.user);
  return data;
}
