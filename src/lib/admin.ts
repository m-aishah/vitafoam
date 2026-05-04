const AUTH_KEY = "mbg_admin_auth_v1";
// Demo credentials; in a real app, validate server-side.
const DEFAULT_USER = "multibiz_admin";
const DEFAULT_PASS = "Vitafoam@2026";

export function adminLogin(u: string, p: string): boolean {
  if (u === DEFAULT_USER && p === DEFAULT_PASS) {
    localStorage.setItem(AUTH_KEY, JSON.stringify({ u, t: Date.now() }));
    return true;
  }
  return false;
}
export function adminLogout() { localStorage.removeItem(AUTH_KEY); }
export function isAdminAuthed(): boolean {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem(AUTH_KEY);
}
