// NIRVIVAAD API Client
// Automatically uses localhost backend during local development or production Render endpoint
const defaultBase = (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'))
  ? 'http://127.0.0.1:8000/api/v1'
  : 'https://nirvivaad-from-disputed-to-nirvivaad-5.onrender.com/api/v1';

const BASE = (import.meta.env.VITE_API_BASE_URL || defaultBase).replace(/\/$/, '');

async function request(path, options = {}) {
  const headers = new Headers(options.headers || {});
  const token = localStorage.getItem('nirvivaad_token');
  if (token) headers.set('Authorization', `Bearer ${token}`);
  const apiKey = localStorage.getItem('nirvivaad_api_key') || 'NIRV-KEY-GOV-2026';
  headers.set('X-API-Key', apiKey);
  if (options.body && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  let r;
  try {
    r = await fetch(BASE + path, { ...options, headers });
  } catch (err) {
    throw new Error('API server is unreachable. Please check backend connection.');
  }

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
}

export const api = {
  ping: () => request('/auth/ping').catch(() => ({})),
  me: () => request('/auth/me'),
  login: p => request('/auth/login', { method: 'POST', body: JSON.stringify(p) }),
  register: p => request('/auth/register', { method: 'POST', body: JSON.stringify(p) }),
  dashboard: () => request('/dashboard/summary'),
  documents: () => request('/documents'),
  documentStatus: id => request(`/documents/${id}`),
  documentReport: id => request(`/documents/${id}/report`),
  records: q => request('/records' + (q ? `?search=${encodeURIComponent(q)}` : '')),
  verifyRecord: (recordId, p) => request(`/records/${recordId}/verify`, { method: 'POST', body: JSON.stringify(p) }),
  progress: () => request('/reports/progress'),
  errors: () => request('/reports/errors'),
  tasks: () => request('/verification/tasks'),
  users: () => request('/admin/users'),
  adminOverview: () => request('/admin/overview'),
  adminUpdateUser: (userId, p) => request(`/admin/users/${userId}`, { method: 'PATCH', body: JSON.stringify(p) }),
  decision: (id, p) => request(`/verification/${id}/decision`, { method: 'POST', body: JSON.stringify(p) }),
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

