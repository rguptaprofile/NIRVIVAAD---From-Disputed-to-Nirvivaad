// NIRVIVAAD API Client
// Multi-Endpoint Auto-Discovery, Failover & Intelligent Fallback

function getCandidateBases() {
  const envBase = import.meta.env.VITE_API_BASE_URL;
  if (envBase) return [envBase.replace(/\/$/, '')];

  if (typeof window === 'undefined') {
    return ['https://nirvivaad-from-disputed-to-nirvivaad-5.onrender.com/api/v1'];
  }

  const hostname = window.location.hostname;
  const port = window.location.port;

  // 1. If served directly by FastAPI backend on port 8000
  if (port === '8000') {
    return [window.location.origin + '/api/v1', '/api/v1'];
  }

  const candidates = [];

  // 2. Relative /api/v1 (Works via Vite proxy or reverse proxy)
  candidates.push('/api/v1');

  // 3. Localhost and 127.0.0.1 on port 8000
  candidates.push('https://nirvivaad-from-disputed-to-nirvivaad-5.onrender.com/api/v1');
  candidates.push('https://nirvivaad-from-disputed-to-nirvivaad-5.onrender.com/api/v1');

  // 4. LAN / Wi-Fi IP on port 8000 (e.g. 192.168.x.x:8000)
  if (hostname && hostname !== 'localhost' && hostname !== '127.0.0.1') {
    candidates.push('http://' + hostname + ':8000/api/v1');
  }

  // 5. Cloud Production Render Endpoint
  candidates.push('https://nirvivaad-from-disputed-to-nirvivaad-5.onrender.com/api/v1');

  return [...new Set(candidates)];
}

let candidateBases = getCandidateBases();
let activeBaseIndex = 0;

export function getActiveApiBase() {
  return candidateBases[activeBaseIndex] || candidateBases[0] || 'https://nirvivaad-from-disputed-to-nirvivaad-5.onrender.com/api/v1';
}

export function setActiveApiBase(url) {
  if (!url) return;
  const clean = url.replace(/\/$/, '');
  const idx = candidateBases.indexOf(clean);
  if (idx !== -1) {
    activeBaseIndex = idx;
  } else {
    candidateBases.unshift(clean);
    activeBaseIndex = 0;
  }
}

export async function testBackendConnection() {
  for (let i = 0; i < candidateBases.length; i++) {
    const base = candidateBases[i];
    const pingUrl = (base.startsWith('http') ? base : (window.location.origin + base)) + '/auth/ping';
    try {
      const c = new AbortController();
      const t = setTimeout(() => c.abort(), 4000);
      const res = await fetch(pingUrl, { signal: c.signal });
      clearTimeout(t);
      if (res.ok) {
        activeBaseIndex = i;
        return { ok: true, base, status: 'connected' };
      }
    } catch {
      // Continue to next candidate
    }
  }
  return { ok: false, base: getActiveApiBase(), status: 'unreachable' };
}

async function request(path, options = {}) {
  const headers = new Headers(options.headers || {});
  const token = localStorage.getItem('nirvivaad_token');
  if (token) headers.set('Authorization', 'Bearer ' + token);
  const apiKey = localStorage.getItem('nirvivaad_api_key') || 'NIRV-KEY-GOV-2026';
  headers.set('X-API-Key', apiKey);
  if (options.body && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  let lastError = null;
  const startIndex = activeBaseIndex;
  const maxAttempts = Math.min(candidateBases.length, 3);

  // Try active candidate first, then cycle through alternate candidates upon network failure
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const candidateIdx = (startIndex + attempt) % candidateBases.length;
    const base = candidateBases[candidateIdx];
    const fullUrl = base.startsWith('http') ? (base + path) : (window.location.origin + base + path);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      const fetchOpts = { ...options, headers, signal: controller.signal };

      const r = await fetch(fullUrl, fetchOpts);
      clearTimeout(timeoutId);

      // Successfully reached a working backend! Set as active
      activeBaseIndex = candidateIdx;

      const b = await r.json().catch(() => ({}));
      if (r.status === 401) {
        if (!path.startsWith('/auth/login') && !path.startsWith('/auth/register')) {
          localStorage.removeItem('nirvivaad_token');
          localStorage.removeItem('nirvivaad_user');
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('nirvivaad_session_expired', { detail: b.detail || 'Session expired' }));
          }
        }
      }
      if (!r.ok) throw new Error(b.detail || 'Request failed');
      return b;
    } catch (err) {
      lastError = err;
      // If it is a real business/validation error from the server (e.g. 400 Bad Request, 422 Unprocessable), throw immediately!
      if (err.message && !err.message.includes('Failed to fetch') && !err.message.includes('NetworkError') && !err.name?.includes('AbortError')) {
        throw err;
      }
      // Connection failure: try next candidate
      console.warn('[NIRVIVAAD API] Connection attempt to ' + base + ' failed, trying alternate...');
    }
  }

  // If all candidate endpoints were unreachable:
  const helpfulMsg = 'API server is unreachable. Please verify backend is running on https://nirvivaad-from-disputed-to-nirvivaad-5.onrender.com or click Reconnect.';
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('nirvivaad_backend_unreachable', {
      detail: { message: helpfulMsg, attempted: candidateBases.slice(0, maxAttempts) }
    }));
  }
  throw new Error(helpfulMsg);
}

export const api = {
  ping: () => request('/auth/ping').catch(() => ({})),
  checkHealth: testBackendConnection,
  getActiveBase: getActiveApiBase,
  me: () => request('/auth/me'),
  login: p => request('/auth/login', { method: 'POST', body: JSON.stringify(p) }),
  register: p => request('/auth/register', { method: 'POST', body: JSON.stringify(p) }),
  dashboard: () => request('/dashboard/summary'),
  documents: () => request('/documents'),
  documentStatus: id => request('/documents/' + id),
  documentReport: id => request('/documents/' + id + '/report'),
  records: q => request('/records' + (q ? ('?search=' + encodeURIComponent(q)) : '')),
  verifyRecord: (recordId, p) => request('/records/' + recordId + '/verify', { method: 'POST', body: JSON.stringify(p) }),
  progress: () => request('/reports/progress'),
  errors: () => request('/reports/errors'),
  tasks: () => request('/verification/tasks'),
  users: () => request('/admin/users'),
  adminOverview: () => request('/admin/overview'),
  adminUpdateUser: (userId, p) => request('/admin/users/' + userId, { method: 'PATCH', body: JSON.stringify(p) }),
  decision: (id, p) => request('/verification/' + id + '/decision', { method: 'POST', body: JSON.stringify(p) }),
  upload: (files, languages, meta = {}) => {
    const f = new FormData();
    [...files].forEach(x => f.append('files', x));
    f.append('languages', languages.join(','));
    Object.entries(meta).forEach(([k, v]) => {
      if (v !== undefined && v !== null) f.append(k, v);
    });
    return request('/documents/upload', { method: 'POST', body: f });
  },
  analyzePreview: file => {
    const f = new FormData();
    f.append('file', file);
    return request('/documents/analyze-preview', { method: 'POST', body: f });
  },
  locations: () => request('/government/locations'),
  lookup: p => request('/government/lookup?' + new URLSearchParams(p).toString()),
  govRegistryLookup: p => request('/government/registry-lookup?' + new URLSearchParams(p).toString()),
  govPortals: () => request('/government/portals'),
  integrations: () => request('/integrations/status'),
  gisParcel: p => request('/gis/parcel?' + new URLSearchParams(p).toString()),
  gisStatus: () => request('/gis/status'),
  verifiedAmins: () => request('/admin/verified-amins'),
  verifyFlow: p => request('/verify-flow', { method: 'POST', body: JSON.stringify(p) })
};
