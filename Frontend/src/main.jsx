import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { api } from './api';
import '../style.css';
import './react.css';

// Authentic hierarchical locations fallback
const LOCATION_DATA = {
  'Bihar': {
    'Muzaffarpur': {
      'Muzaffarpur Sadar': ['Kanti', 'Damodarpur', 'Mustafapur', 'Bhikhanpur', 'Japaha'],
      'Kanti': ['Kanti Kasba', 'Bela', 'Kolhua', 'Jaitpur', 'Sarairanjan'],
      'Motipur': ['Motipur Bazar', 'Baruraj', 'Mahmadpur', 'Patepur']
    },
    'Patna': {
      'Patna Sadar': ['Digha', 'Bankipur', 'Kankarbagh', 'Rajvanshi Nagar'],
      'Danapur': ['Danapur Cantt', 'Saguna', 'Khagaul', 'Mustafapur'],
      'Phulwari Sharif': ['Phulwari', 'Nohsa', 'Sampatchak']
    },
    'Gaya': {
      'Gaya Sadar': ['Bodhgaya', 'Tekari', 'Manpur', 'Civil Lines']
    }
  },
  'Uttar Pradesh': {
    'Lucknow': {
      'Lucknow Sadar': ['Hazratganj', 'Alambagh', 'Gomti Nagar', 'Chowk'],
      'Bakshi Ka Talab': ['BKT Kasba', 'Itaunja', 'Mahona']
    },
    'Varanasi': {
      'Varanasi Sadar': ['Dashashwamedh', 'Bhelupur', 'Shivpur', 'Sarnath']
    }
  },
  'Maharashtra': {
    'Nashik': {
      'Nashik Taluka': ['Ojhar', 'Deolali', 'Satpur', 'Panchavati']
    }
  },
  'Karnataka': {
    'Belagavi': {
      'Belagavi Taluka': ['Yadgir', 'Vadgaon', 'Shahapur', 'Tilakwadi']
    }
  },
  'Rajasthan': {
    'Jaipur': {
      'Jaipur Tehsil': ['Sanganer', 'Amer', 'Jhotwara', 'Malviya Nagar']
    }
  },
  'West Bengal': {
    'Howrah': {
      'Howrah Sadar': ['Bally', 'Shibpur', 'Uluberia', 'Liluah']
    }
  }
};

// Navigation items matching UI by Frontend team/index.html
const nav = [
  ['dashboard', 'Dashboard'],
  ['upload', 'Upload & digitize'],
  ['verify', 'Verification queue'],
  ['records', 'Records repository'],
  ['integrations', 'Integrations & APIs'],
  ['reports', 'Reports']
];

const fmt = n => new Intl.NumberFormat('en-IN').format(n || 0);
const Logo = () => (
  <div className="landing-logo">
    <span>NV</span>
    <b>NIRVIVAAD</b>
  </div>
);

function PublicHeader({ go, active }) {
  return (
    <header>
      <Logo />
      <nav>
        <button className={active === 'home' ? 'selected' : ''} onClick={() => go('home')}>Home</button>
        <button className={active === 'about' ? 'selected' : ''} onClick={() => go('about')}>About us</button>
        <button className="landing-login" onClick={() => go('auth')}>Sign in</button>
        <button className="landing-cta" onClick={() => go('auth')}>Get started <span>→</span></button>
      </nav>
    </header>
  );
}

function Landing({ go }) {
  return (
    <div className="landing">
      <PublicHeader go={go} active="home" />
      <main className="landing-main">
        <section className="hero">
          <div className="eyebrow"><i /> National Intelligence for Record Verification, Integrity, Validation And Anomaly Detection</div>
          <h1>Every land record,<br /><em>clear and verified.</em></h1>
          <p>End land fraud and duplicate sales with AI verification, cadastral ground truth matching, and instant dispute detection.</p>
          <div className="hero-actions">
            <button className="landing-cta big" onClick={() => go('auth')}>Access your workspace <span>→</span></button>
            <button className="text-button" onClick={() => go('about')}>How NIRVIVAAD works <span>↓</span></button>
          </div>
          <div className="trust-line"><span>●</span> Instant Fake Detection &nbsp;·&nbsp; Double Selling Prevention &nbsp;·&nbsp; PoA Conflict Verification</div>
        </section>
        <section className="hero-visual">
          <div className="map-grid" />
          <div className="visual-top"><small>RECORD STATUS</small><b>Nirvivaad (Verified)</b><span>●</span></div>
          <div className="record-preview">
            <div className="paper-head">CADASTRAL LAND RECORD <span>AUTHENTICATED</span></div>
            <div className="record-lines">
              <p><span>KHATA / KHASRA</span><b>47 / 214/2</b></p>
              <p><span>VILLAGE / ANCHAL</span><b>Kanti, Muzaffarpur</b></p>
              <p><span>AUTHENTICITY</span><b className="green">95% (Nirvivaad)</b></p>
              <p><span>DOUBLE SELLING</span><b>None Detected</b></p>
            </div>
            <div className="seal">NV<br /><small>VERIFIED</small></div>
          </div>
          <div className="floating-stat"><b>84,217</b><span>records secured</span></div>
        </section>
      </main>
      <section className="feature-row">
        {[
          ['01', 'Classify & Digitize', 'Support for Khatihan, Lagan Rasid, Power of Attorney, Kewala Registry, and Mutation.'],
          ['02', 'Multi-Check Validation', 'Automated detection for fake deeds, double selling, Vivaadit land, and rival PoA.'],
          ['03', 'Ground Truth Match', 'Side-by-side comparison of claimed documents against official revenue records.']
        ].map(x => (
          <div key={x[0]}>
            <b>{x[0]}</b>
            <h3>{x[1]}</h3>
            <p>{x[2]}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

function About({ go }) {
  return (
    <div className="landing about">
      <PublicHeader go={go} active="about" />
      <main className="about-main">
        <div className="eyebrow"><i /> Built for public trust &amp; dispute-free land ownership</div>
        <h1>From Disputed<br /><em>to NIRVIVAAD.</em></h1>
        <p>NIRVIVAAD bridges the gap between physical land papers and verified state records—preventing fraudulent registrations, duplicate transactions, and unauthorized Power of Attorney conveyances.</p>
        <div className="about-grid">
          {[
            ['01', 'Fake Document Detection', 'Detects altered stamp papers, signature distortions, and counterfeit seals with AI confidence scoring.'],
            ['02', 'Vivaadit Jamin Screening', 'Cross-references ongoing Title Suits, Partition Suits, and Section 144 stay orders before registry updates.'],
            ['03', 'Double Selling Alert', 'Catches multi-buyer fraud where the same khasra/plot is sold to different individuals.'],
            ['04', 'PoA Conflict Verification', 'Validates whether a Power of Attorney is genuine, currently active, or disputed by another claimant.'],
            ['05', 'Side-by-Side Comparison', 'Empowers revenue officers and citizens to see exact differences between uploaded claims and official records.'],
            ['06', 'Unique Citizen Identity', 'Secures every account with a verified mobile number and unique alphanumeric ID (NIRV-USR-XXXXX).']
          ].map(x => (
            <article key={x[0]}>
              <b>{x[0]}</b>
              <h3>{x[1]}</h3>
              <p>{x[2]}</p>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}

function Auth({ done, go }) {
  const [mode, setMode] = useState('signin');
  const [role, setRole] = useState('user');
  const [f, setF] = useState({ name: '', email: '', mobile: '', password: '', admin_code: '', login_id: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [regSuccess, setRegSuccess] = useState(null);

  const signup = mode === 'signup';
  const set = (k, v) => setF(prev => ({ ...prev, [k]: v }));

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      if (signup) {
        const payload = {
          name: f.name,
          email: f.email,
          mobile: f.mobile,
          password: f.password,
          role,
          admin_code: f.admin_code
        };
        const r = await api.register(payload);
        setRegSuccess({
          unique_id: r.unique_id,
          email: f.email,
          mobile: f.mobile,
          name: f.name,
          user: r.user,
          access_token: r.access_token
        });
      } else {
        const payload = {
          login_id: f.login_id || f.email,
          password: f.password,
          role
        };
        const r = await api.login(payload);
        localStorage.setItem('nirvivaad_token', r.access_token);
        done(r.user);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  function proceedWithNewAccount() {
    if (regSuccess?.access_token) {
      localStorage.setItem('nirvivaad_token', regSuccess.access_token);
      done(regSuccess.user);
    } else {
      setMode('signin');
      setRegSuccess(null);
    }
  }

  return (
    <div className="auth-shell">
      <button className="back-home" onClick={() => go('home')}>← Back to home</button>
      <section className="auth-intro">
        <Logo />
        <div>
          <div className="eyebrow"><i /> Secure land intelligence portal</div>
          <h1>A trusted record<br />starts <em>here.</em></h1>
          <p>Sign in using your Unique User ID, registered Email, or Mobile number to inspect verified land records.</p>
        </div>
        <footer>© 2026 NIRVIVAAD <span>Land Record Intelligence</span></footer>
      </section>

      <section className="auth-pane">
        {regSuccess ? (
          <div className="auth-card-new reg-success-card">
            <div className="success-badge">✓</div>
            <h2>Registration Successful!</h2>
            <p>Your unique NIRVIVAAD login credentials have been created.</p>

            <div className="uid-highlight-box">
              <span className="uid-lbl">YOUR UNIQUE LOGIN USER ID</span>
              <span className="uid-val">{regSuccess.unique_id}</span>
              <small>Please write this down or copy it for future sign-ins.</small>
            </div>

            <div className="reg-meta-details">
              <p><span>Registered Name:</span> <b>{regSuccess.name}</b></p>
              <p><span>Registered Email:</span> <b>{regSuccess.email}</b></p>
              <p><span>Registered Mobile:</span> <b>+91 {regSuccess.mobile}</b></p>
            </div>

            <div className="notice-success">
              ✓ Mobile &amp; Email uniqueness verified. No duplicate registrations can be created with these credentials.
            </div>

            <button className="auth-action" onClick={proceedWithNewAccount}>
              Continue to Dashboard <span>→</span>
            </button>
          </div>
        ) : (
          <div className="auth-card-new">
            <div className="auth-heading">
              <span>{signup ? 'CREATE UNIQUE ACCOUNT' : 'WELCOME BACK'}</span>
              <h2>{signup ? 'Register in NIRVIVAAD' : 'Sign in to NIRVIVAAD'}</h2>
              <p>{signup ? 'Each registration generates a permanent Unique ID tied to your phone & email.' : 'Sign in with your Unique ID or registered Email / Mobile & Password.'}</p>
            </div>

            <div className="role-toggle">
              <button type="button" className={role === 'user' ? 'active' : ''} onClick={() => setRole('user')}>
                <b>◉</b>
                <span>Citizen / Owner<small>Access land records</small></span>
              </button>
              <button type="button" className={role === 'admin' ? 'active' : ''} onClick={() => setRole('admin')}>
                <b>✦</b>
                <span>Revenue Admin<small>Platform &amp; verification</small></span>
              </button>
            </div>

            <div className="mode-tabs">
              <button type="button" className={!signup ? 'active' : ''} onClick={() => setMode('signin')}>Sign in</button>
              <button type="button" className={signup ? 'active' : ''} onClick={() => setMode('signup')}>Sign up</button>
            </div>

            <form onSubmit={submit}>
              {signup ? (
                <>
                  <label>Full name
                    <input required minLength="2" placeholder="e.g. Rahul Gupta" value={f.name} onChange={e => set('name', e.target.value)} />
                  </label>
                  <label>Email address (Must be unique)
                    <input required type="email" placeholder="name@example.com" value={f.email} onChange={e => set('email', e.target.value)} />
                  </label>
                  <label>Mobile number (10-digit, Unique)
                    <input required type="tel" pattern="[0-9]{10}" maxLength="10" placeholder="e.g. 9876543210" value={f.mobile} onChange={e => set('mobile', e.target.value.replace(/\D/g, ''))} />
                  </label>
                  <label>Create password (At least 8 characters)
                    <input required type="password" minLength="8" placeholder="••••••••" value={f.password} onChange={e => set('password', e.target.value)} />
                  </label>
                  {role === 'admin' && (
                    <label>Admin invite code
                      <input required placeholder="Enter platform invite code" value={f.admin_code} onChange={e => set('admin_code', e.target.value)} />
                    </label>
                  )}
                </>
              ) : (
                <>
                  <label>Unique Login ID or Email / Mobile
                    <input required placeholder="e.g. NIRV-USR-12345 or user@example.com" value={f.login_id} onChange={e => set('login_id', e.target.value)} />
                  </label>
                  <label>Password
                    <input required type="password" placeholder="••••••••" value={f.password} onChange={e => set('password', e.target.value)} />
                  </label>
                </>
              )}

              {error && <p className="notice">{error}</p>}

              <button className="auth-action" disabled={busy}>
                {busy ? 'Verifying with system…' : signup ? `Generate Unique ID & Register` : `Sign in to workspace`} <span>→</span>
              </button>
            </form>

            <p className="auth-switch">
              {signup ? 'Already have an account?' : 'New to NIRVIVAAD?'}{' '}
              <button onClick={() => setMode(signup ? 'signin' : 'signup')}>
                {signup ? 'Sign in' : 'Create unique account'}
              </button>
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

const Header = ({ title, sub }) => (
  <div className="topbar">
    <div>
      <h2>{title}</h2>
      <p className="sub">{sub}</p>
    </div>
  </div>
);

// DASHBOARD VIEW (Faithful to UI by Frontend team/index.html)
function Dashboard({ d, goView }) {
  const stateProgress = [
    { state: 'Bihar', districts: '21 / 38', pct: 71 },
    { state: 'Uttar Pradesh', districts: '34 / 75', pct: 58 },
    { state: 'Maharashtra', districts: '28 / 36', pct: 84 },
    { state: 'Rajasthan', districts: '19 / 33', pct: 62 },
    { state: 'West Bengal', districts: '12 / 23', pct: 47 },
    { state: 'Karnataka', districts: '22 / 31', pct: 76 }
  ];

  const defaultActivity = [
    { c: '#3F6B4A', text: 'Batch "Muzaffarpur Tehsil Register Vol. 14" completed validation — 214 records', t: '4 minutes ago' },
    { c: '#A23B2E', text: 'Double selling attempt blocked for Khasra No. 88/1, Bela village (Muzaffarpur)', t: '19 minutes ago' },
    { c: '#B4842A', text: '12 records routed to manual review — low OCR confidence on plot area', t: '52 minutes ago' },
    { c: '#3F6B4A', text: 'DILRMP sync completed — 1,840 records pushed to central database', t: '1 hour ago' }
  ];

  const recentList = d?.recent_activity?.length ? d.recent_activity.map(a => ({
    c: a.action.includes('reject') ? '#A23B2E' : a.action.includes('approve') ? '#3F6B4A' : '#B4842A',
    text: `${a.action.replaceAll('_', ' ').toUpperCase()}: Resource ${a.resource_id}`,
    t: new Date(a.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  })) : defaultActivity;

  return (
    <>
      <div className="topbar">
        <div>
          <h2>Digitization overview</h2>
          <p className="sub">Live status of legacy land record processing across connected districts, from scan intake through mutation-ready validation.</p>
        </div>
        <div className="search-wrap">
          <svg viewBox="0 0 20 20" fill="none" width="16" height="16">
            <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.4" />
            <path d="M17 17l-4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <input type="text" placeholder="Search khasra no., owner, village…" onKeyDown={e => { if (e.key === 'Enter') goView('records'); }} />
        </div>
      </div>

      <div className="cadastral-band">
        <svg className="grid-bg" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="plots" width="46" height="46" patternUnits="userSpaceOnUse">
              <path d="M46 0H0V46" fill="none" stroke="#3E6650" strokeWidth="1" />
              <path d="M0 0L46 46" fill="none" stroke="#2A4636" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#plots)" />
        </svg>
        <div className="cadastral-band-inner">
          <div>
            <h3>412,860 legacy documents queued across 6 states for AI-assisted extraction</h3>
            <p>OCR and classification models are tuned per script — Devanagari, Bengali, Tamil, Telugu — with human review routed automatically for anything below confidence threshold.</p>
          </div>
          <div className="cb-stat">
            <div className="num">{d?.validation_pass_rate ?? 96.4}%</div>
            <div className="lbl">extraction &amp; verification pass rate</div>
          </div>
        </div>
      </div>

      <div className="stat-strip">
        <div className="stat-card">
          <div className="lbl">Documents processed</div>
          <div className="val">{fmt(d?.documents_processed ?? 84217)}</div>
          <div className="delta up">▲ 2,340 this week</div>
        </div>
        <div className="stat-card">
          <div className="lbl">Extraction accuracy</div>
          <div className="val">93.8%</div>
          <div className="delta up">▲ 0.6pt since last model refresh</div>
        </div>
        <div className="stat-card">
          <div className="lbl">Pending verification</div>
          <div className="val">{fmt(d?.pending_tasks ?? 1206)}</div>
          <div className="delta warn">▲ 118 added today</div>
        </div>
        <div className="stat-card">
          <div className="lbl">Open error cases</div>
          <div className="val">{fmt(d?.error_cases ?? 327)}</div>
          <div className="delta up">▼ 41 resolved today</div>
        </div>
      </div>

      <div className="two-col">
        <div className="panel">
          <div className="panel-head">
            <h4>State-wise digitization progress</h4>
            <button className="link-btn" onClick={() => goView('reports')}>View full report</button>
          </div>
          <table>
            <thead>
              <tr>
                <th>State</th>
                <th>Districts live</th>
                <th style={{ width: '38%' }}>Progress</th>
              </tr>
            </thead>
            <tbody>
              {stateProgress.map(r => (
                <tr className="district-row" key={r.state}>
                  <td>{r.state}</td>
                  <td className="mono">{r.districts}</td>
                  <td>
                    <div className="barwrap">
                      <div className="bartrack">
                        <div className="barfill" style={{ width: `${r.pct}%` }} />
                      </div>
                      <span className="pct">{r.pct}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="panel">
          <div className="panel-head"><h4>Validation status</h4></div>
          <div className="donut-wrap">
            <svg width="120" height="120" viewBox="0 0 42 42">
              <circle cx="21" cy="21" r="15.9" fill="transparent" stroke="#DAD4BF" strokeWidth="6" />
              <circle
                cx="21" cy="21" r="15.9" fill="transparent" stroke="#3F6B4A" strokeWidth="6"
                strokeDasharray="68 32" strokeDashoffset="25" transform="rotate(-90 21 21)"
              />
              <circle
                cx="21" cy="21" r="15.9" fill="transparent" stroke="#B4842A" strokeWidth="6"
                strokeDasharray="19 81" strokeDashoffset="-43" transform="rotate(-90 21 21)"
              />
              <circle
                cx="21" cy="21" r="15.9" fill="transparent" stroke="#A23B2E" strokeWidth="6"
                strokeDasharray="13 87" strokeDashoffset="-62" transform="rotate(-90 21 21)"
              />
            </svg>
            <div className="legend">
              <div className="row"><span className="sw" style={{ background: '#3F6B4A' }} />Auto-validated <span className="val">68%</span></div>
              <div className="row"><span className="sw" style={{ background: '#B4842A' }} />Needs review <span className="val">19%</span></div>
              <div className="row"><span className="sw" style={{ background: '#A23B2E' }} />Flagged / mismatch <span className="val">13%</span></div>
            </div>
          </div>

          <div className="panel-head" style={{ marginTop: 20 }}><h4>Recent activity</h4></div>
          <div>
            {recentList.slice(0, 4).map((a, i) => (
              <div className="activity-item" key={i}>
                <div className="activity-dot" style={{ background: a.c }} />
                <div>
                  <p>{a.text}</p>
                  <div className="t">{a.t}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// 5-POINT VALIDATION REPORT MODAL
function ValidationReportModal({ reportData, onClose }) {
  if (!reportData) return null;
  const rep = reportData.validation_report || {};
  const doc = reportData.document || {};
  const meta = doc.metadata || {};

  const score = rep.authenticity_score ?? 85;
  const isFake = rep.fake_check?.is_fake;
  const isDisputed = rep.dispute_check?.is_disputed;
  const hasDoubleSelling = rep.multiple_buyers_check?.has_multiple_buyers;
  const poaStatus = rep.poa_check?.poa_status;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-sheet" onClick={e => e.stopPropagation()}>
        <div className="modal-head">
          <div>
            <span className="badge-tag">{doc.document_id}</span>
            <h3>Validation &amp; Land Intelligence Report</h3>
            <p className="sub">{doc.original_name} · {meta.village_mauza || 'Kanti'}, {meta.district || 'Muzaffarpur'}</p>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          {/* Score & Verdict Banner */}
          <div className={`verdict-banner ${score >= 70 ? 'good' : score >= 40 ? 'warn' : 'danger'}`}>
            <div className="vb-left">
              <span className="vb-score">{score}%</span>
              <div>
                <h4>{rep.verdict || (score >= 70 ? 'Nirvivaad (Clear & Authenticated)' : 'Discrepancy / Review Flagged')}</h4>
                <p>Evaluated using {rep.ai_model_evaluated || 'NIRVIVAAD Intelligence Engine'}</p>
              </div>
            </div>
            <div className="vb-badges">
              <span className={`pill ${isFake ? 'red' : 'green'}`}>{isFake ? '⚠ Forgery Risk Flagged' : '✓ Stamp Verified'}</span>
              <span className={`pill ${isDisputed ? 'red' : 'green'}`}>{isDisputed ? '⚠ Vivaadit Jamin' : '✓ Nirvivaad (No Dispute)'}</span>
              <span className={`pill ${hasDoubleSelling ? 'red' : 'green'}`}>{hasDoubleSelling ? '⚠ Double Selling Alert' : '✓ Single Title Chain'}</span>
            </div>
          </div>

          {/* 5-Point Validation Breakdown */}
          <h4 style={{ marginTop: 22 }}>Inbuilt Multi-Check Validation Results</h4>
          <div className="checks-grid">
            <div className={`check-card ${isFake ? 'flagged' : 'clear'}`}>
              <div className="cc-top">
                <b>1. Document Forgery &amp; Fake Check</b>
                <span className={`status-tag ${isFake ? 'bad' : 'good'}`}>{isFake ? 'SUSPICIOUS' : 'GENUINE'}</span>
              </div>
              <p>Seal: {rep.fake_check?.sub_registrar_seal || 'Authentic Digital Seal'}</p>
              {rep.fake_check?.tampering_flags?.length ? (
                <ul className="flag-list">
                  {rep.fake_check.tampering_flags.map((f, i) => <li key={i}>{f}</li>)}
                </ul>
              ) : (
                <small className="green-text">✓ Stamp paper, watermark &amp; registrar signatures authenticated.</small>
              )}
            </div>

            <div className={`check-card ${isDisputed ? 'flagged' : 'clear'}`}>
              <div className="cc-top">
                <b>2. Land Dispute Check (Vivaadit Jamin)</b>
                <span className={`status-tag ${isDisputed ? 'bad' : 'good'}`}>{rep.dispute_check?.dispute_severity || 'CLEAR'}</span>
              </div>
              <p>{rep.dispute_check?.summary || 'No pending civil suits or prohibitory orders.'}</p>
              {rep.dispute_check?.cases?.length ? (
                <ul className="flag-list">
                  {rep.dispute_check.cases.map((c, i) => <li key={i}>{c}</li>)}
                </ul>
              ) : null}
            </div>

            <div className={`check-card ${hasDoubleSelling ? 'flagged' : 'clear'}`}>
              <div className="cc-top">
                <b>3. Double Selling / Multiple Buyer Check</b>
                <span className={`status-tag ${hasDoubleSelling ? 'bad' : 'good'}`}>{hasDoubleSelling ? 'MULTIPLE BUYERS' : 'SINGLE OWNER'}</span>
              </div>
              <p>{rep.multiple_buyers_check?.alert || 'Single ownership chain verified without overlapping conveyances.'}</p>
              {rep.multiple_buyers_check?.conflicting_claimants?.length ? (
                <small className="red-text">Conflicting Claimants: {rep.multiple_buyers_check.conflicting_claimants.join(' vs ')}</small>
              ) : null}
            </div>

            <div className={`check-card ${poaStatus?.includes('Conflict') ? 'flagged' : 'clear'}`}>
              <div className="cc-top">
                <b>4. Power of Attorney (PoA) Verification</b>
                <span className={`status-tag ${poaStatus?.includes('Conflict') ? 'bad' : 'good'}`}>{poaStatus || 'VALID'}</span>
              </div>
              <p>{rep.poa_check?.alert || 'PoA registered and authorized by registered raiyat.'}</p>
            </div>
          </div>

          {/* Side-by-side comparison table */}
          <h4 style={{ marginTop: 24 }}>Side-by-Side: Uploaded Document vs. Official Registry Ground Truth</h4>
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Field / Attribute</th>
                <th>Uploaded Document Claim</th>
                <th>Official Land Registry Ground Truth</th>
                <th>Match Verification</th>
              </tr>
            </thead>
            <tbody>
              {(rep.comparison_table || []).map((row, i) => (
                <tr key={i}>
                  <td><b>{row.field}</b></td>
                  <td className="mono">{row.uploaded}</td>
                  <td className="mono">{row.registry}</td>
                  <td>
                    <span className={`match-badge ${row.match === 'Matched' || row.match === 'Clear (Nirvivaad)' || row.match === 'Nirvivaad (Single Title)' || row.match === 'Valid Format' ? 'match' : row.match?.includes('MISMATCH') || row.match?.includes('Disputed') || row.match?.includes('Flagged') ? 'mismatch' : 'notice'}`}>
                      {row.match}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {reportData.ocr?.text && (
            <div className="ocr-preview-box" style={{ marginTop: 20 }}>
              <b>Extracted OCR Text Preview (Devanagari &amp; English)</b>
              <pre>{reportData.ocr.text}</pre>
            </div>
          )}
        </div>

        <div className="modal-foot">
          <button className="btn btn-ghost btn-sm" onClick={onClose}>Close Report</button>
        </div>
      </div>
    </div>
  );
}

// UPLOAD & DIGITIZE VIEW WITH MANDATORY ENFORCEMENT & 5-STAGE PIPELINE
function Upload({ refresh }) {
  const [files, setFiles] = useState([]);
  const [m, setM] = useState('');
  const [docs, setDocs] = useState([]);
  const [languages, setLanguages] = useState(['Hindi', 'English']);
  const [activeReportDoc, setActiveReportDoc] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [groundTruthPreview, setGroundTruthPreview] = useState(null);

  // Document Type Classification
  const [docType, setDocType] = useState('jamin_khatihan');

  // Locations state
  const [locations, setLocations] = useState(LOCATION_DATA);
  const [selectedState, setSelectedState] = useState('Bihar');
  const [selectedDistrict, setSelectedDistrict] = useState('Muzaffarpur');
  const [selectedCircle, setSelectedCircle] = useState('Muzaffarpur Sadar');
  const [selectedVillage, setSelectedVillage] = useState('Kanti');
  const [landClassification, setLandClassification] = useState('Agricultural — irrigated');

  // Typed Crucial Land Data
  const [typedMeta, setTypedMeta] = useState({
    khata_no: '47',
    khasra_no: '214/2',
    claimed_owner: 'Rameshwar Sah',
    area: '0.62',
    deed_number: 'RG-88214',
    poa_holder_name: ''
  });

  const setTyped = (k, v) => {
    setTypedMeta(prev => ({ ...prev, [k]: v }));
    if (formErrors[k]) {
      setFormErrors(prev => ({ ...prev, [k]: false }));
    }
  };

  // Fetch backend locations on mount
  useEffect(() => {
    api.locations().then(locs => {
      if (locs && Object.keys(locs).length) setLocations(locs);
    }).catch(() => {});
  }, []);

  // Update cascade when State changes
  const handleStateChange = e => {
    const s = e.target.value;
    setSelectedState(s);
    const dists = Object.keys(locations[s] || {});
    const d = dists[0] || '';
    setSelectedDistrict(d);
    const circles = Object.keys(locations[s]?.[d] || {});
    const c = circles[0] || '';
    setSelectedCircle(c);
    const villages = locations[s]?.[d]?.[c] || [];
    setSelectedVillage(villages[0] || '');
    setFormErrors(prev => ({ ...prev, state: false }));
  };

  // Update cascade when District changes
  const handleDistrictChange = e => {
    const d = e.target.value;
    setSelectedDistrict(d);
    const circles = Object.keys(locations[selectedState]?.[d] || {});
    const c = circles[0] || '';
    setSelectedCircle(c);
    const villages = locations[selectedState]?.[d]?.[c] || [];
    setSelectedVillage(villages[0] || '');
    setFormErrors(prev => ({ ...prev, district: false }));
  };

  // Update cascade when Circle changes
  const handleCircleChange = e => {
    const c = e.target.value;
    setSelectedCircle(c);
    const villages = locations[selectedState]?.[selectedDistrict]?.[c] || [];
    setSelectedVillage(villages[0] || '');
    setFormErrors(prev => ({ ...prev, circle: false }));
  };

  const load = () => api.documents().then(setDocs).catch(e => setM(e.message));

  useEffect(() => {
    load();
    const id = setInterval(load, 2500); // Live pipeline progression polling
    return () => clearInterval(id);
  }, []);

  // Fetch official government ground truth for preview
  async function checkOfficialRegistry() {
    try {
      const res = await api.lookup({
        state: selectedState,
        district: selectedDistrict,
        circle: selectedCircle,
        village: selectedVillage,
        khata_no: typedMeta.khata_no,
        khasra_no: typedMeta.khasra_no
      });
      if (res?.ground_truth) {
        setGroundTruthPreview(res.ground_truth);
      } else {
        setGroundTruthPreview({ not_found: true });
      }
    } catch {
      setGroundTruthPreview(null);
    }
  }

  // Strict Mandatory Field Validation
  function validateMandatoryFields() {
    const errs = {};
    if (!selectedState) errs.state = true;
    if (!selectedDistrict) errs.district = true;
    if (!selectedCircle) errs.circle = true;
    if (!selectedVillage) errs.village = true;
    if (!landClassification) errs.land_classification = true;

    if (!typedMeta.khata_no?.trim()) errs.khata_no = true;
    if (!typedMeta.khasra_no?.trim()) errs.khasra_no = true;
    if (!typedMeta.claimed_owner?.trim()) errs.claimed_owner = true;
    if (!typedMeta.area?.trim()) errs.area = true;
    if (!typedMeta.deed_number?.trim()) errs.deed_number = true;

    if (docType === 'power_of_attorney' && !typedMeta.poa_holder_name?.trim()) {
      errs.poa_holder_name = true;
    }

    if (!files.length) {
      errs.files = true;
    }

    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function send() {
    const isValid = validateMandatoryFields();
    if (!isValid) {
      setM('All land record fields are strictly mandatory. Please fill in all required fields and choose at least one scanned document.');
      window.scrollTo({ top: 180, behavior: 'smooth' });
      return;
    }

    setIsUploading(true);
    setM('');
    try {
      const fullMeta = {
        state: selectedState,
        district: selectedDistrict,
        tehsil_circle: selectedCircle,
        village_mauza: selectedVillage,
        khata_no: typedMeta.khata_no.trim(),
        khasra_no: typedMeta.khasra_no.trim(),
        claimed_owner: typedMeta.claimed_owner.trim(),
        area: typedMeta.area.trim(),
        deed_number: typedMeta.deed_number.trim(),
        poa_holder_name: typedMeta.poa_holder_name.trim(),
        document_type: docType,
        classification: landClassification
      };

      const r = await api.upload(files, languages, fullMeta);
      setM(`✓ Batch uploaded successfully! Automated 5-stage pipeline [Upload → OCR → Classification → Validation → Complete] started for ${r.documents.length} document(s).`);
      setFiles([]);
      load();
      refresh();
    } catch (e) {
      setM(e.message);
    } finally {
      setIsUploading(false);
    }
  }

  async function viewReport(docId) {
    try {
      const rep = await api.documentReport(docId);
      setActiveReportDoc(rep);
    } catch (err) {
      alert('Failed to load report: ' + err.message);
    }
  }

  const districtsList = Object.keys(locations[selectedState] || {});
  const circlesList = Object.keys(locations[selectedState]?.[selectedDistrict] || {});
  const villagesList = locations[selectedState]?.[selectedDistrict]?.[selectedCircle] || [];

  return (
    <>
      <Header
        title="Upload & digitize"
        sub="Classify land documents, specify mandatory land attributes, and trigger the automated 5-step extraction, OCR, and fraud verification pipeline."
      />

      {Object.keys(formErrors).length > 0 && (
        <div className="mandatory-error-banner">
          <svg viewBox="0 0 20 20" fill="none" width="20" height="20" style={{ flexShrink: 0 }}>
            <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.6" />
            <path d="M10 6v5M10 14h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <div>
            <b>Mandatory Fields Required:</b> All land fields marked with an asterisk (<span className="req-star">*</span>) must be completed before processing can begin. Missing fields are highlighted in red below.
          </div>
        </div>
      )}

      {/* Manual Document Classification & Crucial Data Form */}
      <div className="panel meta-entry-panel">
        <div className="panel-head">
          <div>
            <h4>1. Document Classification &amp; Crucial Land Data</h4>
            <p className="sub">Classify the document type and provide key cadastral fields. Process will strictly halt if any mandatory field is missing.</p>
          </div>
          <span className="mandatory-indicator-pill">ALL FIELDS MANDATORY</span>
        </div>

        {/* Classification Selector */}
        <div className="doc-type-selector">
          <label>Document Classification: <span className="field-tag-type">Select One</span></label>
          <div className="type-radios">
            {[
              ['jamin_khatihan', 'Jamin ka Khatihan (RoR)'],
              ['jamin_rasid', 'Jamin ka Rasid (Revenue Receipt)'],
              ['power_of_attorney', 'Power of Attorney (PoA)'],
              ['kewala_registry', 'Kewala / Sale Deed (Registry)'],
              ['dakhil_kharij', 'Dakhil Kharij (Mutation)']
            ].map(([val, lbl]) => (
              <button
                type="button"
                key={val}
                className={`type-chip ${docType === val ? 'selected' : ''}`}
                onClick={() => setDocType(val)}
              >
                <b>{docType === val ? '✓ ' : ''}</b>{lbl}
              </button>
            ))}
          </div>
        </div>

        {/* Cascading Selects & Typed Inputs Grid */}
        <div className="meta-grid">
          {/* State (Select) */}
          <div className={`field-box ${formErrors.state ? 'error' : ''}`}>
            <label>State <span className="req-star">*</span> <span className="field-tag-type">Choose</span></label>
            <select value={selectedState} onChange={handleStateChange}>
              {Object.keys(locations).map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            {formErrors.state && <span className="field-error-msg">State is required</span>}
          </div>

          {/* District (Select) */}
          <div className={`field-box ${formErrors.district ? 'error' : ''}`}>
            <label>District <span className="req-star">*</span> <span className="field-tag-type">Choose</span></label>
            <select value={selectedDistrict} onChange={handleDistrictChange}>
              {districtsList.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            {formErrors.district && <span className="field-error-msg">District is required</span>}
          </div>

          {/* Circle / Anchal / Tehsil (Select) */}
          <div className={`field-box ${formErrors.circle ? 'error' : ''}`}>
            <label>Circle / Anchal / Tehsil <span className="req-star">*</span> <span className="field-tag-type">Choose</span></label>
            <select value={selectedCircle} onChange={handleCircleChange}>
              {circlesList.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            {formErrors.circle && <span className="field-error-msg">Circle is required</span>}
          </div>

          {/* Mauza / Village (Select) */}
          <div className={`field-box ${formErrors.village ? 'error' : ''}`}>
            <label>Mauza / Village <span className="req-star">*</span> <span className="field-tag-type">Choose</span></label>
            <select value={selectedVillage} onChange={e => { setSelectedVillage(e.target.value); setFormErrors(p => ({ ...p, village: false })); }}>
              {villagesList.map(v => <option key={v} value={v}>{v}</option>)}
            </select>
            {formErrors.village && <span className="field-error-msg">Mauza is required</span>}
          </div>

          {/* Land Classification (Select) */}
          <div className={`field-box ${formErrors.land_classification ? 'error' : ''}`}>
            <label>Land Classification <span className="req-star">*</span> <span className="field-tag-type">Choose</span></label>
            <select value={landClassification} onChange={e => { setLandClassification(e.target.value); setFormErrors(p => ({ ...p, land_classification: false })); }}>
              <option value="Agricultural — irrigated">Agricultural — irrigated</option>
              <option value="Agricultural — un-irrigated">Agricultural — un-irrigated</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
              <option value="Industrial">Industrial</option>
              <option value="Waterbody / Gair Mazarua">Waterbody / Gair Mazarua</option>
            </select>
            {formErrors.land_classification && <span className="field-error-msg">Classification is required</span>}
          </div>

          {/* Khata Number (Manual Typed) */}
          <div className={`field-box ${formErrors.khata_no ? 'error' : ''}`}>
            <label>Khata Number <span className="req-star">*</span> <span className="field-tag-type">Type</span></label>
            <input
              value={typedMeta.khata_no}
              onChange={e => setTyped('khata_no', e.target.value)}
              placeholder="e.g. 47"
            />
            {formErrors.khata_no && <span className="field-error-msg">Khata Number is mandatory</span>}
          </div>

          {/* Khasra / Plot Number (Manual Typed) */}
          <div className={`field-box ${formErrors.khasra_no ? 'error' : ''}`}>
            <label>Khasra / Plot Number <span className="req-star">*</span> <span className="field-tag-type">Type</span></label>
            <input
              value={typedMeta.khasra_no}
              onChange={e => setTyped('khasra_no', e.target.value)}
              placeholder="e.g. 214/2"
            />
            {formErrors.khasra_no && <span className="field-error-msg">Khasra / Plot is mandatory</span>}
          </div>

          {/* Claimed Owner / Applicant (Manual Typed) */}
          <div className={`field-box ${formErrors.claimed_owner ? 'error' : ''}`}>
            <label>Claimed Owner / Raiyat Name <span className="req-star">*</span> <span className="field-tag-type">Type</span></label>
            <input
              value={typedMeta.claimed_owner}
              onChange={e => setTyped('claimed_owner', e.target.value)}
              placeholder="e.g. Rameshwar Sah"
            />
            {formErrors.claimed_owner && <span className="field-error-msg">Owner Name is mandatory</span>}
          </div>

          {/* Area in Acres (Manual Typed) */}
          <div className={`field-box ${formErrors.area ? 'error' : ''}`}>
            <label>Area (Acres / Decimal) <span className="req-star">*</span> <span className="field-tag-type">Type</span></label>
            <input
              value={typedMeta.area}
              onChange={e => setTyped('area', e.target.value)}
              placeholder="e.g. 0.62"
            />
            {formErrors.area && <span className="field-error-msg">Area is mandatory</span>}
          </div>

          {/* Deed / Registry / Mutation No. (Manual Typed) */}
          <div className={`field-box ${formErrors.deed_number ? 'error' : ''}`}>
            <label>Deed / Registry / Mutation Ref <span className="req-star">*</span> <span className="field-tag-type">Type</span></label>
            <input
              value={typedMeta.deed_number}
              onChange={e => setTyped('deed_number', e.target.value)}
              placeholder="e.g. RG-88214"
            />
            {formErrors.deed_number && <span className="field-error-msg">Deed / Ref No is mandatory</span>}
          </div>

          {/* Power of Attorney Holder Name (Mandatory if PoA) */}
          {docType === 'power_of_attorney' && (
            <div className={`field-box poa-field ${formErrors.poa_holder_name ? 'error' : ''}`}>
              <label>Power of Attorney Holder Name <span className="req-star">*</span> <span className="field-tag-type">Type</span></label>
              <input
                value={typedMeta.poa_holder_name}
                onChange={e => setTyped('poa_holder_name', e.target.value)}
                placeholder="Name of PoA holder agent"
              />
              {formErrors.poa_holder_name && <span className="field-error-msg">PoA Holder is mandatory for Power of Attorney</span>}
            </div>
          )}
        </div>

        {/* Live Ground Truth Lookup Action */}
        <div style={{ marginTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button type="button" className="btn btn-ghost btn-sm" onClick={checkOfficialRegistry}>
            🔍 Fetch Official Government Land Record Preview
          </button>
          <small style={{ color: 'var(--ink-soft)' }}>Cross-referenced against official revenue department registers.</small>
        </div>

        {groundTruthPreview && (
          <div className="ground-truth-preview-card">
            <div className="gt-header">
              <span>🏛️ Official Government Cadastral Ground Truth (Bihar Bhumi / DILRMP)</span>
              <span className={`status-pill ${groundTruthPreview.not_found ? 'review' : 'done'}`}>
                {groundTruthPreview.not_found ? 'No matching record' : 'Record Authenticated'}
              </span>
            </div>
            {groundTruthPreview.not_found ? (
              <p style={{ margin: 0, fontSize: 12.5, color: '#8F3327' }}>
                No registered cadastral entry found for {selectedVillage}, Khata {typedMeta.khata_no}, Khasra {typedMeta.khasra_no}. Document will undergo dispute inspection.
              </p>
            ) : (
              <div className="gt-details">
                <div className="gt-field"><span>Official Raiyat:</span> <b>{groundTruthPreview.official_owner}</b></div>
                <div className="gt-field"><span>Jamabandi No:</span> <b className="mono">{groundTruthPreview.jamabandi_no || 'JB-47-214'}</b></div>
                <div className="gt-field"><span>Official Area:</span> <b>{groundTruthPreview.official_area_acres} Acres</b></div>
                <div className="gt-field"><span>Classification:</span> <b>{groundTruthPreview.official_classification}</b></div>
                <div className="gt-field"><span>Mutation Status:</span> <b>{groundTruthPreview.mutation_status || 'Mutated & Clear'}</b></div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* File Upload Dropzone */}
      <div className={`panel ${formErrors.files ? 'panel-error' : ''}`} style={{ marginTop: 18 }}>
        <div className="panel-head">
          <h4>2. Upload Document Scans <span className="req-star">*</span></h4>
          {files.length > 0 && <span className="status-pill done">{files.length} file(s) selected</span>}
        </div>
        <label className={`dropzone ${formErrors.files ? 'drag' : ''}`}>
          <input
            type="file"
            multiple
            accept=".pdf,.tif,.tiff,.jpg,.jpeg,.png"
            onChange={e => {
              setFiles([...e.target.files]);
              if (e.target.files.length) setFormErrors(p => ({ ...p, files: false }));
            }}
          />
          <svg viewBox="0 0 24 24" fill="none" width="36" height="36" style={{ margin: '0 auto 8px', display: 'block', color: formErrors.files ? '#D32F2F' : 'var(--ledger)' }}>
            <path d="M12 15V4M12 4L7 9M12 4l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 16v3a1 1 0 001 1h14a1 1 0 001-1v-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <h4>{files.length ? `${files.length} file(s) ready for upload` : 'Drop land records here, or click to browse'}</h4>
          <p>PDF, TIFF, JPG and PNG supported. Maximum 20 files per batch.</p>
        </label>
        {formErrors.files && <p className="field-error-msg" style={{ margin: '8px 0 0' }}>Please select at least one document file to upload.</p>}

        <div className="panel-head" style={{ marginTop: 18 }}>
          <h4>Document language(s) present</h4>
          <button
            className="btn btn-primary btn-sm"
            disabled={isUploading}
            onClick={send}
          >
            {isUploading ? 'Uploading & starting pipeline…' : 'Upload & process batch'}
          </button>
        </div>
        <div className="lang-chips">
          {['Hindi', 'English', 'Bengali', 'Marathi', 'Tamil', 'Telugu', 'Gujarati', 'Kannada', 'Odia'].map(l => (
            <button
              className={'chip ' + (languages.includes(l) ? 'selected' : '')}
              key={l}
              onClick={() => setLanguages(languages.includes(l) ? languages.filter(x => x !== l) : [...languages, l])}
            >
              {l}
            </button>
          ))}
        </div>
        {m && <p className={`notice ${m.startsWith('✓') ? 'notice-good' : ''}`}>{m}</p>}
      </div>

      {/* Live Pipeline Stepper View */}
      <div className="panel-head" style={{ marginTop: 26 }}>
        <h4>
          Batch processing pipeline <small className="live-dot">● Live Pipeline Updates</small>
        </h4>
      </div>

      {docs.length ? (
        docs.map(doc => {
          const step = doc.current_step || (doc.status === 'complete' || doc.status === 'verified' ? 5 : doc.status === 'needs_review' ? 5 : 1);
          const steps = ['Uploaded', 'OCR', 'Classification', 'Validation', 'Complete'];

          return (
            <div className="record-card" key={doc.document_id}>
              <div className="record-card-head">
                <div>
                  <div className="fname">
                    {doc.original_name}{' '}
                    <span className="badge-type">{doc.classified_type || doc.metadata?.document_type || 'Land Document'}</span>
                  </div>
                  <div className="fmeta">
                    ID: {doc.document_id} · {(doc.size_bytes / 1024 / 1024).toFixed(2)} MB · {new Date(doc.created_at).toLocaleString()}
                    {doc.metadata?.khasra_no ? ` · Khata ${doc.metadata?.khata_no} / Plot ${doc.metadata?.khasra_no}` : ''}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <span className={`status-pill ${doc.status === 'complete' || doc.status === 'verified' ? 'done' : doc.status === 'needs_review' ? 'review' : 'processing'}`}>
                    {doc.status.replace('_', ' ')}
                  </span>
                  <button className="btn btn-ghost btn-sm" onClick={() => viewReport(doc.document_id)}>
                    View Validation &amp; Fraud Report
                  </button>
                </div>
              </div>

              {/* 5-Step Pipeline Progress Indicator */}
              <div className="stepper">
                {steps.map((label, i) => {
                  const isDone = step > i + 1 || (step === 5 && i === 4);
                  const isActive = step === i + 1 && step < 5;
                  return (
                    <React.Fragment key={label}>
                      <div className={`step ${isDone ? 'done' : isActive ? 'active' : ''}`}>
                        <div className="step-circle">{isDone ? '✓' : i + 1}</div>
                        <div className="step-label">{label}</div>
                      </div>
                      {i < 4 && <div className={`step-line ${step > i + 1 ? 'done' : ''}`} />}
                    </React.Fragment>
                  );
                })}
              </div>

              {doc.step_name && step < 5 && (
                <div className="pipeline-live-info">
                  <span className="spinner-dot" /> Current processing: <b>{doc.step_name}</b>…
                </div>
              )}
            </div>
          );
        })
      ) : (
        <div className="panel empty">No uploaded documents in current batch. Complete the mandatory fields above and upload a record to initiate extraction.</div>
      )}

      {/* Validation Report Modal */}
      <ValidationReportModal reportData={activeReportDoc} onClose={() => setActiveReportDoc(null)} />
    </>
  );
}

// VERIFICATION QUEUE VIEW (Faithful to UI by Frontend team/index.html)
function Verify({ refresh }) {
  const [tasks, setTasks] = useState([]);
  const [selected, setSelected] = useState();
  const [error, setError] = useState('');

  const defaultQueue = [
    { id: 'mock-1', record: { khata_no: '47', khasra_no: '214/2', owner: 'Rameshwar Sah', village: 'Kanti', district: 'Muzaffarpur', tehsil: 'Muzaffarpur Sadar', area: '0.62', classification: 'Agricultural — irrigated', ref: 'MUT/2019/1187', reg: 'RG-88214' }, reason_codes: ['Owner name unclear'], confidence: 0.52 },
    { id: 'mock-2', record: { khata_no: '12', khasra_no: '88/1', owner: 'Fatima Khatun', village: 'Bela', district: 'Muzaffarpur', area: '1.10', classification: 'Agricultural', ref: 'MUT/2021/044' }, reason_codes: ['Duplicate khata suspected'], confidence: 0.38 },
    { id: 'mock-3', record: { khata_no: '204', khasra_no: '305', owner: 'Suresh Patil', village: 'Ojhar', district: 'Nashik', area: '0.85', classification: 'Agricultural' }, reason_codes: ['Plot area illegible'], confidence: 0.44 },
    { id: 'mock-4', record: { khata_no: '61', khasra_no: '19/3', owner: 'Govind Yadav', village: 'Sarairanjan', district: 'Muzaffarpur', area: '0.40', classification: 'Residential' }, reason_codes: ['Mismatch vs mutation record'], confidence: 0.61 },
    { id: 'mock-5', record: { khata_no: '98', khasra_no: '142', owner: 'Lakshmi Reddy', village: 'Yadgir', district: 'Belagavi', area: '2.30', classification: 'Agricultural' }, reason_codes: ['Handwritten annotation overlaps'], confidence: 0.49 }
  ];

  const load = () => api.tasks().then(x => {
    const list = x && x.length ? x : defaultQueue;
    setTasks(list);
    setSelected(list[0]);
  }).catch(() => {
    setTasks(defaultQueue);
    setSelected(defaultQueue[0]);
  });

  useEffect(load, []);

  async function decide(decision) {
    if (!selected) return;
    try {
      if (selected.id && !selected.id.startsWith('mock-')) {
        await api.decision(selected.id, {
          decision,
          fields: selected.record?.fields || {},
          reason: 'Reviewed and confirmed by authorized Revenue Officer through NIRVIVAAD dashboard'
        });
      }
      setTasks(prev => prev.filter(t => t.id !== selected.id));
      setSelected(null);
      refresh();
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <>
      <div className="topbar">
        <div>
          <h2>Verification queue</h2>
          <p className="sub">Records below the confidence threshold, or flagged by cross-database checks, wait here for a reviewer to confirm or correct before they enter the live register.</p>
        </div>
      </div>

      {error && <p className="notice">{error}</p>}
      <div className="panel">
        <div className="panel-head">
          <h4>Queue — {tasks.length} flagged records</h4>
        </div>
        <table>
          <thead>
            <tr>
              <th>Khasra no.</th>
              <th>Owner</th>
              <th>Village</th>
              <th>Reason flagged</th>
              <th>Confidence</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {tasks.map(t => {
              const confPct = Math.round((t.confidence || 0.52) * 100);
              const confCls = confPct < 50 ? 'low' : confPct < 75 ? 'mid' : 'high';
              return (
                <tr key={t.id}>
                  <td className="mono">{t.record?.khasra_no || '—'}</td>
                  <td>{t.record?.owner || '—'}</td>
                  <td>{t.record?.village || '—'}</td>
                  <td>
                    <span className="tag-warn">{(t.reason_codes || []).join(', ')}</span>
                  </td>
                  <td>
                    <span className={`conf ${confCls}`}>
                      <span className="conf-dot" />{confPct}%
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-ghost btn-sm" onClick={() => setSelected(t)}>Review</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {!tasks.length && <p className="empty">No records currently need review. All uploaded records passed validation.</p>}
      </div>

      {selected && (
        <>
          <div className="panel-head" style={{ marginTop: 26 }}>
            <h4>Reviewing — Khasra No. {selected.record?.khasra_no || '214/2'}, {selected.record?.village || 'Kanti'} Village</h4>
          </div>
          <div className="verify-shell">
            <div className="doc-preview">
              <div className="doc-sheet">
                <div className="doc-title">खतौनी अभिलेख — Record of Rights</div>
                <div className="doc-sub">Tehsil: {selected.record?.tehsil || 'Muzaffarpur Sadar'} · Vol. 14 · Pg. 004</div>
                <div className="doc-line"><span>Khata No.</span><span className="highlight">{selected.record?.khata_no || '47'}</span></div>
                <div className="doc-line"><span>Khasra No.</span><span className="highlight">{selected.record?.khasra_no || '214/2'}</span></div>
                <div className="doc-line"><span>Owner name</span><span className="highlight low">{selected.record?.owner || 'Ramesh???r Sah'}</span></div>
                <div className="doc-line"><span>Father's name</span><span>Late Sitaram Sah</span></div>
                <div className="doc-line"><span>Village</span><span>{selected.record?.village || 'Kanti'}</span></div>
                <div className="doc-line"><span>Tehsil</span><span>{selected.record?.tehsil || 'Muzaffarpur Sadar'}</span></div>
                <div className="doc-line"><span>District</span><span>{selected.record?.district || 'Muzaffarpur'}</span></div>
                <div className="doc-line"><span>Plot area</span><span className="highlight low">{selected.record?.area || '0.??'} acre</span></div>
                <div className="doc-line"><span>Land classification</span><span>{selected.record?.classification || 'Agricultural — irrigated'}</span></div>
                <div className="doc-line"><span>Mutation ref.</span><span>{selected.record?.ref || 'MUT/2019/1187'}</span></div>
                <div className="doc-line" style={{ border: 'none' }}><span>Registration no.</span><span>{selected.record?.reg || 'RG-88214'}</span></div>
              </div>
            </div>

            <div>
              <div className="field-form">
                <div className="field-row">
                  <div className="fr-top"><label>Owner name</label><span className="conf low"><span className="conf-dot" />52% confidence</span></div>
                  <input defaultValue={selected.record?.owner || 'Rameshwar Sah'} />
                </div>
                <div className="field-row">
                  <div className="fr-top"><label>Khata number</label><span className="conf high"><span className="conf-dot" />99% confidence</span></div>
                  <input defaultValue={selected.record?.khata_no || '47'} />
                </div>
                <div className="field-row">
                  <div className="fr-top"><label>Khasra number</label><span className="conf high"><span className="conf-dot" />97% confidence</span></div>
                  <input defaultValue={selected.record?.khasra_no || '214/2'} />
                </div>
                <div className="field-row">
                  <div className="fr-top"><label>Plot area (acre)</label><span className="conf low"><span className="conf-dot" />44% confidence</span></div>
                  <input defaultValue={selected.record?.area || '0.62'} />
                </div>
                <div className="field-row">
                  <div className="fr-top"><label>Village / Tehsil / District</label><span className="conf mid"><span className="conf-dot" />81% confidence</span></div>
                  <input defaultValue={`${selected.record?.village || 'Kanti'} / ${selected.record?.tehsil || 'Muzaffarpur Sadar'} / ${selected.record?.district || 'Muzaffarpur'}`} />
                </div>
                <div className="field-row">
                  <div className="fr-top"><label>Land classification</label><span className="conf high"><span className="conf-dot" />95% confidence</span></div>
                  <input defaultValue={selected.record?.classification || 'Agricultural — irrigated'} />
                </div>
              </div>
              <div className="verify-actions">
                <button className="btn btn-danger btn-sm" onClick={() => decide('reject')}>Reject page</button>
                <button className="btn btn-ghost btn-sm" onClick={() => alert('Draft saved successfully')}>Save draft</button>
                <button className="btn btn-primary btn-sm" onClick={() => decide('approve')}>Confirm &amp; publish record</button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

// RECORDS REPOSITORY VIEW (With functional CSV export & expandable audit trails)
function Records() {
  const [q, setQ] = useState('');
  const [districtFilter, setDistrictFilter] = useState('All');
  const [classFilter, setClassFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [r, setR] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const [activeReportDoc, setActiveReportDoc] = useState(null);

  const defaultRecords = [
    {
      record_id: 'rec-1',
      khata_no: '47',
      khasra_no: '214/2',
      owner: 'Rameshwar Sah',
      village: 'Kanti',
      district: 'Muzaffarpur',
      area: '0.62 ac',
      classification: 'Agricultural',
      status: 'verified',
      authenticity_score: 95,
      trail: [
        'Digitized from Vol. 14, Pg. 004 — 3 days ago',
        'Reviewed by R. Kumar (Revenue Officer) — 2 days ago',
        'Synced to LRMS & DILRMP — 2 days ago'
      ]
    },
    {
      record_id: 'rec-2',
      khata_no: '12',
      khasra_no: '88/1',
      owner: 'Fatima Khatun',
      village: 'Bela',
      district: 'Muzaffarpur',
      area: '1.10 ac',
      classification: 'Agricultural',
      status: 'pending',
      authenticity_score: 42,
      trail: [
        'Digitized from Vol. 14, Pg. 011 — 1 day ago',
        'Flagged: duplicate khata suspected — awaiting review'
      ]
    },
    {
      record_id: 'rec-3',
      khata_no: '204',
      khasra_no: '305',
      owner: 'Suresh Patil',
      village: 'Ojhar',
      district: 'Nashik',
      area: '0.85 ac',
      classification: 'Agricultural',
      status: 'verified',
      authenticity_score: 94,
      trail: [
        'Digitized from cadastral map sheet 7B — 6 days ago',
        'Reviewed by A. Deshmukh — 5 days ago',
        'Synced to GIS layer — 5 days ago'
      ]
    },
    {
      record_id: 'rec-4',
      khata_no: '61',
      khasra_no: '19/3',
      owner: 'Govind Yadav',
      village: 'Sarairanjan',
      district: 'Muzaffarpur',
      area: '0.40 ac',
      classification: 'Residential',
      status: 'pending',
      authenticity_score: 55,
      trail: [
        'Digitized from Vol. 15, Pg. 002 — 8 hours ago',
        'Mismatch against mutation record MUT/2021/044 — awaiting review'
      ]
    },
    {
      record_id: 'rec-5',
      khata_no: '98',
      khasra_no: '142',
      owner: 'Lakshmi Reddy',
      village: 'Yadgir',
      district: 'Belagavi',
      area: '2.30 ac',
      classification: 'Agricultural',
      status: 'verified',
      authenticity_score: 91,
      trail: [
        'Digitized from Vol. 3, Pg. 077 — 2 weeks ago',
        'Reviewed by K. Hegde — 2 weeks ago',
        'Synced to LRMS — 13 days ago'
      ]
    }
  ];

  useEffect(() => {
    const id = setTimeout(() => {
      api.records(q).then(data => {
        setR(data && data.length ? data : defaultRecords);
      }).catch(() => setR(defaultRecords));
    }, 250);
    return () => clearTimeout(id);
  }, [q]);

  const filtered = r.filter(item => {
    if (districtFilter !== 'All' && item.district !== districtFilter) return false;
    if (classFilter !== 'All' && !(item.classification || '').includes(classFilter)) return false;
    if (statusFilter !== 'All' && item.status !== statusFilter) return false;
    return true;
  });

  function exportCsv() {
    const headers = ['Khata No', 'Khasra No', 'Owner', 'Village', 'District', 'Area', 'Classification', 'Status', 'Authenticity Score'];
    const rows = filtered.map(x => [
      x.khata_no,
      x.khasra_no,
      `"${(x.owner || '').replace(/"/g, '""')}"`,
      x.village,
      x.district,
      x.area || '0.62 ac',
      x.classification || 'Agricultural',
      x.status,
      `${x.authenticity_score ?? 90}%`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', `nirvivaad_records_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  async function openDocReport(docId) {
    if (!docId) return;
    try {
      const rep = await api.documentReport(docId);
      setActiveReportDoc(rep);
    } catch {
      alert('Validation report preview not available for this record');
    }
  }

  return (
    <>
      <div className="topbar">
        <div>
          <h2>Records repository</h2>
          <p className="sub">Search the digitized, validated register. Every entry keeps a full audit trail back to its source scan.</p>
        </div>
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="Search owner name, khasra no, khata, village…"
          style={{ minWidth: 240 }}
          value={q}
          onChange={e => setQ(e.target.value)}
        />
        <select value={districtFilter} onChange={e => setDistrictFilter(e.target.value)}>
          <option value="All">All districts</option>
          <option value="Muzaffarpur">Muzaffarpur</option>
          <option value="Patna">Patna</option>
          <option value="Nashik">Nashik</option>
          <option value="Belagavi">Belagavi</option>
        </select>
        <select value={classFilter} onChange={e => setClassFilter(e.target.value)}>
          <option value="All">All classifications</option>
          <option value="Agricultural">Agricultural</option>
          <option value="Residential">Residential</option>
          <option value="Commercial">Commercial</option>
        </select>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="All">All statuses</option>
          <option value="verified">Verified (Nirvivaad)</option>
          <option value="pending">Pending review</option>
        </select>
        <button className="btn btn-ghost btn-sm" onClick={exportCsv}>Export CSV</button>
      </div>

      <div className="panel" style={{ padding: 0 }}>
        <table className="repo-table">
          <thead>
            <tr>
              <th style={{ paddingLeft: 20 }}>Khata / Khasra</th>
              <th>Owner</th>
              <th>Village</th>
              <th>District</th>
              <th>Area</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item, i) => (
              <React.Fragment key={item.record_id || i}>
                <tr>
                  <td className="idnum" style={{ paddingLeft: 20 }}>{item.khata_no} / {item.khasra_no}</td>
                  <td className="owner">{item.owner}</td>
                  <td>{item.village}</td>
                  <td>{item.district}</td>
                  <td className="mono">{item.area || '0.62 ac'}</td>
                  <td>
                    <span className={`status-pill ${item.status === 'verified' ? 'done' : 'review'}`}>
                      {item.status === 'verified' ? 'verified' : 'pending mutation'}
                    </span>
                  </td>
                  <td style={{ whiteSpace: 'nowrap' }}>
                    <button
                      className="btn btn-ghost btn-sm"
                      style={{ marginRight: 6 }}
                      onClick={() => setExpandedRow(expandedRow === i ? null : i)}
                    >
                      Audit trail
                    </button>
                    {item.document_id && (
                      <button className="btn btn-ghost btn-sm" onClick={() => openDocReport(item.document_id)}>
                        Report
                      </button>
                    )}
                  </td>
                </tr>
                {expandedRow === i && (
                  <tr className="row-expand">
                    <td colSpan="7" style={{ padding: '12px 20px' }}>
                      <b>Audit Trail &amp; Verification Chain:</b>
                      <ul className="audit-trail" style={{ margin: '6px 0 0' }}>
                        {(item.trail || [
                          `Record ingested into MongoDB repository — Khata ${item.khata_no} / Plot ${item.khasra_no}`,
                          `Automated cross-check with official cadastral registry: Authenticity score ${item.authenticity_score ?? 90}%`,
                          `Validated and logged under NIRVIVAAD audit log`
                        ]).map((t, idx) => (
                          <li key={idx}>{t}</li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
        {!filtered.length && <p className="empty" style={{ padding: 20 }}>No records matching current filters.</p>}
      </div>

      <ValidationReportModal reportData={activeReportDoc} onClose={() => setActiveReportDoc(null)} />
    </>
  );
}

// INTEGRATIONS & APIS VIEW (Faithful to UI by Frontend team/index.html)
function Integrations() {
  const [integStatus, setIntegStatus] = useState(null);

  useEffect(() => {
    api.integrations().then(setIntegStatus).catch(() => {});
  }, []);

  return (
    <>
      <div className="topbar">
        <div>
          <h2>Integrations &amp; APIs</h2>
          <p className="sub">Connections to existing land record and geospatial systems, so validated records sync without duplicate data entry.</p>
        </div>
      </div>

      <div className="integ-grid">
        <div className="integ-card">
          <div className="integ-top">
            <div className="integ-icon">LR</div>
            <span className="conn-dot on"><span className="d" />Connected</span>
          </div>
          <h4>LRMS — State Land Records</h4>
          <p>Two-way sync of ownership and mutation entries with the state Land Records Management System.</p>
          <div className="integ-meta">Last sync: {integStatus?.lrms?.last_sync || '4 minutes ago'} · {integStatus?.lrms?.synced_records || '1,840'} pushed</div>
        </div>

        <div className="integ-card">
          <div className="integ-top">
            <div className="integ-icon">DL</div>
            <span className="conn-dot on"><span className="d" />Connected</span>
          </div>
          <h4>DILRMP Database</h4>
          <p>Feeds validated records into the Digital India Land Records Modernisation Programme registry.</p>
          <div className="integ-meta">Last sync: {integStatus?.dilrmp?.last_sync || '18 minutes ago'} · {integStatus?.dilrmp?.synced_records || '84,217'} records</div>
        </div>

        <div className="integ-card">
          <div className="integ-top">
            <div className="integ-icon">GIS</div>
            <span className="conn-dot on"><span className="d" />Connected</span>
          </div>
          <h4>GIS / Cadastral Maps</h4>
          <p>Links extracted plot boundaries to survey-numbered cadastral map tiles for spatial verification.</p>
          <div className="integ-meta">Last sync: {integStatus?.gis?.last_sync || '1 hour ago'} · {integStatus?.gis?.parcels || '4,120'} parcels</div>
        </div>

        <div className="integ-card">
          <div className="integ-top">
            <div className="integ-icon">RG</div>
            <span className="conn-dot on"><span className="d" />Active</span>
          </div>
          <h4>Registration Department</h4>
          <p>Cross-checks registration numbers against sale-deed records to catch duplicate or conflicting entries.</p>
          <div className="integ-meta">Last sync: {integStatus?.registration?.last_sync || '6 minutes ago'} · {integStatus?.registration?.checked_deeds || '920'} deeds</div>
        </div>

        <div className="integ-card">
          <div className="integ-top">
            <div className="integ-icon">API</div>
            <span className="conn-dot on"><span className="d" />Active</span>
          </div>
          <h4>Public API access</h4>
          <p>Role-based API keys for downstream government applications to query validated record data.</p>
          <div className="integ-meta">{integStatus?.api_access?.active_keys || 3} active keys · rate limit {integStatus?.api_access?.rate_limit || '600/min'}</div>
        </div>

        <div className="integ-card">
          <div className="integ-top">
            <div className="integ-icon">AU</div>
            <span className="conn-dot on"><span className="d" />Logging</span>
          </div>
          <h4>Audit &amp; access control</h4>
          <p>Every field edit, approval, and export is logged against the reviewer's role and timestamp.</p>
          <div className="integ-meta">14,209 events this month</div>
        </div>
      </div>
    </>
  );
}

// REPORTS VIEW (Faithful to UI by Frontend team/index.html)
function Reports() {
  const districtData = [
    { l: 'Muzaffarpur', v: 1840 },
    { l: 'Patna', v: 2110 },
    { l: 'Nashik', v: 1370 },
    { l: 'Belagavi', v: 960 },
    { l: 'Jaipur', v: 1520 },
    { l: 'Howrah', v: 740 }
  ];
  const maxD = Math.max(...districtData.map(d => d.v));

  const errorData = [
    { l: 'Faded text', v: 118 },
    { l: 'Handwriting', v: 96 },
    { l: 'Format mismatch', v: 54 },
    { l: 'Damaged page', v: 37 },
    { l: 'Duplicate entry', v: 22 }
  ];
  const maxE = Math.max(...errorData.map(d => d.v));

  const detail = [
    { state: 'Bihar', district: 'Muzaffarpur', docs: '18,240', pct: 74 },
    { state: 'Bihar', district: 'Patna', docs: '22,110', pct: 81 },
    { state: 'Maharashtra', district: 'Nashik', docs: '13,700', pct: 69 },
    { state: 'Karnataka', district: 'Belagavi', docs: '9,600', pct: 58 },
    { state: 'Rajasthan', district: 'Jaipur', docs: '15,200', pct: 63 },
    { state: 'West Bengal', district: 'Howrah', docs: '7,400', pct: 41 }
  ];

  return (
    <>
      <div className="topbar">
        <div>
          <h2>Reports</h2>
          <p className="sub">District-wise digitization throughput and where extraction errors are concentrated.</p>
        </div>
      </div>

      <div className="two-col">
        <div className="panel">
          <div className="panel-head"><h4>Documents processed, by district — last 7 days</h4></div>
          <div className="barchart">
            {districtData.map(d => (
              <div className="col" key={d.l}>
                <div className="bval">{d.v}</div>
                <div className="bar" style={{ height: `${(d.v / maxD) * 140}px` }} />
                <div className="blabel">{d.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="panel-head"><h4>Error statistics</h4></div>
          <div className="barchart">
            {errorData.map(d => (
              <div className="col" key={d.l}>
                <div className="bval">{d.v}</div>
                <div className="bar err" style={{ height: `${(d.v / maxE) * 140}px` }} />
                <div className="blabel">{d.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="panel" style={{ marginTop: 16 }}>
        <div className="panel-head"><h4>State-wise &amp; district-wise progress detail</h4></div>
        <table>
          <thead>
            <tr>
              <th>State</th>
              <th>District</th>
              <th>Documents processed</th>
              <th style={{ width: '30%' }}>Digitization progress</th>
            </tr>
          </thead>
          <tbody>
            {detail.map(r => (
              <tr key={r.state + r.district}>
                <td>{r.state}</td>
                <td>{r.district}</td>
                <td className="mono">{r.docs}</td>
                <td>
                  <div className="barwrap">
                    <div className="bartrack">
                      <div className="barfill" style={{ width: `${r.pct}%` }} />
                    </div>
                    <span className="pct">{r.pct}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

// ADMIN DASHBOARD
function Admin() {
  const [users, setUsers] = useState([]);
  useEffect(() => { api.users().then(setUsers); }, []);

  return (
    <>
      <Header title="Administrator dashboard" sub="Registered accounts, unique IDs, and platform access roles." />
      <div className="panel" style={{ padding: 0 }}>
        <table>
          <thead>
            <tr>
              <th style={{ paddingLeft: 20 }}>Unique Login ID</th>
              <th>Full Name</th>
              <th>Email Address</th>
              <th>Mobile Number</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map(x => (
              <tr key={x.id || x._id}>
                <td style={{ paddingLeft: 20 }} className="mono"><b>{x.unique_id || 'NIRV-LEGACY'}</b></td>
                <td>{x.name}</td>
                <td>{x.email}</td>
                <td className="mono">{x.mobile ? `+91 ${x.mobile}` : '—'}</td>
                <td><span className="badge-tag">{x.role}</span></td>
                <td><span className="status-pill done">Active</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

// MAIN APP COMPONENT WITH HASH ROUTING & PROMINENT LOGOUT
function App() {
  const [user, setUser] = useState();
  const [page, setPage] = useState('home');
  const [v, setV] = useState('dashboard');
  const [d, setD] = useState();
  const [err, setErr] = useState('');

  // Synchronize route with window.location.hash for direct URL visibility
  function syncFromHash() {
    const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase();
    if (!hash || hash === 'home') {
      setPage('home');
    } else if (hash === 'about') {
      setPage('about');
    } else if (hash === 'auth') {
      setPage('auth');
    } else {
      setPage('dashboard');
      if (['dashboard', 'upload', 'verify', 'records', 'integrations', 'reports', 'admin'].includes(hash)) {
        setV(hash);
      }
    }
  }

  useEffect(() => {
    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, []);

  function setViewWithHash(newView) {
    setV(newView);
    window.location.hash = `#/${newView}`;
  }

  function setPageWithHash(newPage) {
    setPage(newPage);
    window.location.hash = `#/${newPage}`;
  }

  const refresh = () => api.dashboard().then(setD).catch(e => setErr(e.message));

  useEffect(() => {
    if (localStorage.getItem('nirvivaad_token')) {
      api.me()
        .then(x => {
          setUser(x.user);
          const h = window.location.hash.replace(/^#\/?/, '').toLowerCase();
          if (['home', 'about', 'auth', ''].includes(h)) {
            setViewWithHash('dashboard');
          }
        })
        .catch(() => localStorage.removeItem('nirvivaad_token'));
    }
  }, []);

  useEffect(() => {
    if (user) {
      refresh();
      const id = setInterval(refresh, 20000);
      return () => clearInterval(id);
    }
  }, [user]);

  function handleLogout() {
    localStorage.removeItem('nirvivaad_token');
    setUser(null);
    setPageWithHash('home');
  }

  if (!user) {
    return page === 'about' ? (
      <About go={setPageWithHash} />
    ) : page === 'auth' ? (
      <Auth done={u => { setUser(u); setViewWithHash('dashboard'); }} go={setPageWithHash} />
    ) : (
      <Landing go={setPageWithHash} />
    );
  }

  const items = user.role === 'admin'
    ? [...nav, ['admin', 'Admin dashboard']]
    : nav.filter(([id]) => id !== 'verify');

  const body = v === 'dashboard' ? (
    <Dashboard d={d} goView={setViewWithHash} />
  ) : v === 'upload' ? (
    <Upload refresh={refresh} />
  ) : v === 'verify' ? (
    <Verify refresh={refresh} />
  ) : v === 'records' ? (
    <Records />
  ) : v === 'integrations' ? (
    <Integrations />
  ) : v === 'reports' ? (
    <Reports />
  ) : (
    <Admin />
  );

  return (
    <div className="app react-app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">
            <svg viewBox="0 0 34 34" fill="none">
              <path d="M4 30 L17 4 L30 30 M4 30 L30 30 M10 30 L10 18 L17 18 M24 30 L24 22 L17 22" stroke="#9FB09F" strokeWidth="1.3" />
            </svg>
          </div>
          <div className="brand-text">
            <h1>NIRVIVAAD</h1>
            <span className="brand-full-title">National Intelligence for Record Verification, Integrity, Validation And Anomaly Detection</span>
            <span>NATIONAL RECORD VERIFICATION</span>
          </div>
        </div>

        <nav className="modules">
          <div className="nav-group-label">Operations</div>
          {items.map(([id, l]) => (
            <button
              className={'nav-item ' + (v === id ? 'active' : '')}
              key={id}
              onClick={() => setViewWithHash(id)}
            >
              {l}
            </button>
          ))}
        </nav>

        {/* Sidebar Footer with Prominent, Clearly Visible Red Logout Button */}
        <div className="sidebar-foot">
          <div className="role-badge">NV</div>
          <div className="who">
            <b>{user.name}</b>
            <span className="user-uid-pill">{user.unique_id || user.role}</span>
          </div>
          <button
            className="btn-logout-prominent"
            title="Sign out of current session"
            onClick={handleLogout}
          >
            <span className="lo-icon">⎋</span> Log out
          </button>
        </div>
      </aside>

      <main>
        {err && <p className="notice">{err}</p>}
        <section className="view active">{body}</section>
        <footer className="appfoot">
          <span>NIRVIVAAD · National Intelligence for Record Verification, Integrity, Validation And Anomaly Detection</span>
          <span>Official Land Record Intelligence &amp; Multi-Check Validation Engine</span>
        </footer>
      </main>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
