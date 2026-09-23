// NIRVIVAAD API Client
// Multi-Endpoint Auto-Discovery, Failover & Intelligent Fallback

const RENDER_CLOUD_URL = 'https://nirvivaad-from-disputed-to-nirvivaad-5.onrender.com/api/v1';
const LOCAL_DEV_URL = 'http://localhost:8000/api/v1';
const LOCAL_DEV_IP_URL = 'http://127.0.0.1:8000/api/v1';

function getCandidateBases() {
  const envBase = import.meta.env.VITE_API_BASE_URL;
  if (envBase) return [envBase.replace(/\/$/, '')];

  // User manually selected preference stored in localStorage
  const userPref = typeof window !== 'undefined' ? localStorage.getItem('nirvivaad_selected_api_base') : null;

  if (typeof window === 'undefined') {
    return [RENDER_CLOUD_URL, LOCAL_DEV_URL];
  }

  const hostname = window.location.hostname;
  const port = window.location.port;

  // If served directly by FastAPI backend on port 8000
  if (port === '8000') {
    return [window.location.origin + '/api/v1', '/api/v1', RENDER_CLOUD_URL];
  }

  const isLocalHost = hostname === 'localhost' || hostname === '127.0.0.1';
  const candidates = [];

  // If user explicitly picked an endpoint, put it first
  if (userPref) {
    candidates.push(userPref.replace(/\/$/, ''));
  }

  if (isLocalHost) {
    // 1. Local development priority: check localhost:8000 first, then 127.0.0.1, then relative, then Render
    candidates.push(LOCAL_DEV_URL);
    candidates.push(LOCAL_DEV_IP_URL);
    candidates.push('/api/v1');
    candidates.push(RENDER_CLOUD_URL);
  } else {
    // 2. Production / Cloud priority: check relative /api/v1, then Render, then LAN/local fallbacks
    candidates.push('/api/v1');
    candidates.push(RENDER_CLOUD_URL);
    if (hostname && hostname !== 'localhost' && hostname !== '127.0.0.1') {
      candidates.push('http://' + hostname + ':8000/api/v1');
    }
    candidates.push(LOCAL_DEV_URL);
    candidates.push(LOCAL_DEV_IP_URL);
  }

  return [...new Set(candidates)];
}

let candidateBases = getCandidateBases();
let activeBaseIndex = 0;

export function getActiveApiBase() {
  return candidateBases[activeBaseIndex] || candidateBases[0] || RENDER_CLOUD_URL;
}

export function getAllCandidateBases() {
  return candidateBases;
}

export function setActiveApiBase(url) {
  if (!url) return;
  const clean = url.replace(/\/$/, '');
  if (typeof window !== 'undefined') {
    localStorage.setItem('nirvivaad_selected_api_base', clean);
  }
  const idx = candidateBases.indexOf(clean);
  if (idx !== -1) {
    activeBaseIndex = idx;
  } else {
    candidateBases.unshift(clean);
    activeBaseIndex = 0;
  }
}

export function switchApiTarget(type) {
  // 'local' | 'cloud'
  if (type === 'local') {
    setActiveApiBase(LOCAL_DEV_URL);
    return LOCAL_DEV_URL;
  } else if (type === 'cloud') {
    setActiveApiBase(RENDER_CLOUD_URL);
    return RENDER_CLOUD_URL;
  }
  return getActiveApiBase();
}

export async function testBackendConnection(timeoutMs = 6000) {
  for (let i = 0; i < candidateBases.length; i++) {
    const base = candidateBases[i];
    const pingUrl = (base.startsWith('http') ? base : (window.location.origin + base)) + '/auth/ping';
    try {
      const c = new AbortController();
      const t = setTimeout(() => c.abort(), base.includes('onrender.com') ? Math.max(timeoutMs, 10000) : timeoutMs);
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

/**
 * Intelligent Wake-Up Routine for Render Free Tier (Takes 30-50s when sleeping)
 * Periodically pings the cloud server with status updates until it wakes up.
 */
export async function wakeCloudBackend(onStatus) {
  const target = RENDER_CLOUD_URL + '/auth/ping';
  const startTime = Date.now();
  const maxWaitMs = 70000; // 70 seconds

  if (onStatus) onStatus({ stage: 'starting', message: 'Sending wake-up signal to Render cloud server...', elapsed: 0 });

  while (Date.now() - startTime < maxWaitMs) {
    const elapsed = Math.round((Date.now() - startTime) / 1000);
    try {
      const c = new AbortController();
      const t = setTimeout(() => c.abort(), 8000);
      const res = await fetch(target, { signal: c.signal });
      clearTimeout(t);
      if (res.ok) {
        setActiveApiBase(RENDER_CLOUD_URL);
        if (onStatus) onStatus({ stage: 'ready', message: `Cloud backend active & responding! (Woke up in ${elapsed}s)`, elapsed });
        return { ok: true, elapsed };
      }
    } catch {
      if (onStatus) onStatus({
        stage: 'waking',
        message: `Waking up Render instance (${elapsed}s elapsed, usually takes ~30-45s)...`,
        elapsed
      });
    }
    // Pause 3 seconds between ping attempts
    await new Promise(r => setTimeout(r, 3000));
  }

  if (onStatus) onStatus({ stage: 'timeout', message: 'Cloud wake-up timed out. Please verify Render status or switch to Local.', elapsed: 70 });
  return { ok: false, elapsed: 70 };
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
  const maxAttempts = Math.min(candidateBases.length, 4);

  // Try active candidate first, then cycle through alternate candidates upon network failure
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const candidateIdx = (startIndex + attempt) % candidateBases.length;
    const base = candidateBases[candidateIdx];
    const fullUrl = base.startsWith('http') ? (base + path) : (window.location.origin + base + path);

    try {
      const controller = new AbortController();
      // Generous timeout (25s) to allow sleeping Render instances or complex GIS calculations
      const timeoutId = setTimeout(() => controller.abort(), 25000);
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
      console.warn('[NIRVIVAAD API] Connection attempt to ' + base + ' failed, trying alternate endpoint...');
    }
  }

  // If all candidate endpoints were unreachable:
  const helpfulMsg = `API server is unreachable at ${getActiveApiBase()}. Please ensure the backend is running locally (run start_all.bat) or wake the Render cloud server.`;
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('nirvivaad_backend_unreachable', {
      detail: { message: helpfulMsg, attempted: candidateBases.slice(0, maxAttempts), current: getActiveApiBase() }
    }));
  }
  throw new Error(helpfulMsg);
}

export const api = {
  ping: () => request('/auth/ping').catch(() => ({})),
  checkHealth: testBackendConnection,
  getActiveBase: getActiveApiBase,
  getAllBases: getAllCandidateBases,
  setActiveBase: setActiveApiBase,
  switchTarget: switchApiTarget,
  wakeCloud: wakeCloudBackend,
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
  gisParcel: p => {
    const clean = {};
    Object.entries(p || {}).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') clean[k] = v;
    });
    return request('/gis/parcel?' + new URLSearchParams(clean).toString());
  },
  gisStatus: () => request('/gis/status'),
  verifiedAmins: () => request('/admin/verified-amins'),
  verifyFlow: p => request('/verify-flow', { method: 'POST', body: JSON.stringify(p) })
};
