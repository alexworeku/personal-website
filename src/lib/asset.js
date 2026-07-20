// Resolve a local, root-relative asset path (e.g. "/media/x.svg" or
// "/resume.pdf") against the app's base URL, so it works whether the site is
// served from "/" (Vercel / custom domain) or "/repo/" (project GitHub Pages).
// Absolute URLs, mailto:, and data: URIs are returned untouched.
export function asset(path) {
  if (!path || /^(https?:|mailto:|tel:|data:|\/\/)/.test(path)) return path
  const base = import.meta.env.BASE_URL.replace(/\/$/, '') // "" or "/repo"
  return base + (path.startsWith('/') ? path : `/${path}`)
}
