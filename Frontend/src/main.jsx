import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { api } from './api';
import '../style.css';
import './react.css';

// Navigation items - 'integrations' is permanently removed
const nav = [
  ['dashboard', 'Dashboard'],
  ['upload', 'Upload & digitize'],
  ['verify', 'Verification queue'],
  ['records', 'Records repository'],
  ['reports', 'Reports']
];

const fmt = n => new Intl.NumberFormat('en-IN').format(n || 0);
const Logo = () => <div className="landing-logo"><span>NV</span><b>NIRVIVAAD</b></div>;

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
          ['01', 'Classify & Digitize', 'Support for Khatihan, Lagan Rasid, Power of Attorney, and Kewala Registry.'],
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
              <p>{signup ? 'Each registration generates a permanent Unique ID tied to your phone & email.' : 'Sign in with your Unique ID or registered Email & Password.'}</p>
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

function Dashboard({ d, goView }) {
  const cards = [
    ['Documents processed', d?.documents_processed],
    ['Verified records', d?.verified_records],
    ['Pending verification', d?.pending_tasks],
    ['Open error cases', d?.error_cases]
  ];

  return (
    <>
      <Header title="Digitization overview" sub="Live database status for legacy land-record processing across connected districts." />
      <div className="cadastral-band">
        <div className="cadastral-band-inner">
          <div>
            <h3>AI-assisted extraction with 5-point fraud &amp; dispute verification</h3>
            <p>Documents are checked for tampering, double selling, Vivaadit land litigation, and conflicting Power of Attorney before registry updates.</p>
          </div>
          <div className="cb-stat">
            <div className="num">{d?.validation_pass_rate ?? 96.4}%</div>
            <div className="lbl">validation pass rate</div>
          </div>
        </div>
      </div>

      <div className="stat-strip">
        {cards.map(([l, v]) => (
          <div className="stat-card" key={l}>
            <div className="lbl">{l}</div>
            <div className="val">{typeof v === 'number' ? fmt(v) : '—'}</div>
            <div className="delta up">Live database aggregation</div>
          </div>
        ))}
      </div>

      <div className="quick-actions-bar">
        <h4>Operations Quick Actions</h4>
        <div className="qa-buttons">
          <button className="btn btn-primary btn-sm" onClick={() => goView('upload')}>+ Upload &amp; Digitize New Record</button>
          <button className="btn btn-ghost btn-sm" onClick={() => goView('records')}>Browse Records Repository</button>
          <button className="btn btn-ghost btn-sm" onClick={() => goView('verify')}>Open Verification Queue</button>
        </div>
      </div>

      <div className="panel" style={{ marginTop: 20 }}>
        <h4>Recent activity</h4>
        {d?.recent_activity?.length ? (
          d.recent_activity.map(a => (
            <div className="activity" key={a.id || a.created_at + a.action}>
              <b>{a.action.replaceAll('_', ' ')}</b>
              <span>{new Date(a.created_at).toLocaleString()}</span>
            </div>
          ))
        ) : (
          <p className="empty">No activity recorded yet.</p>
        )}
      </div>
    </>
  );
}

// Validation Report Modal Component
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
            {/* Check 1: Fake Document Check */}
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

            {/* Check 2: Disputed Land (Vivaadit Jamin) */}
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

            {/* Check 3: Double Selling / Multiple Buyer */}
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

            {/* Check 4: Power of Attorney Conflict Check */}
            <div className={`check-card ${poaStatus?.includes('Conflict') ? 'flagged' : 'clear'}`}>
              <div className="cc-top">
                <b>4. Power of Attorney (PoA) Verification</b>
                <span className={`status-tag ${poaStatus?.includes('Conflict') ? 'bad' : 'good'}`}>{poaStatus || 'VALID'}</span>
              </div>
              <p>{rep.poa_check?.alert || 'PoA registered and authorized by registered raiyat.'}</p>
            </div>
          </div>

          {/* Check 5: Side-by-side comparison table */}
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

          {/* Extracted OCR snippet */}
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

function Upload({ refresh }) {
  const [files, setFiles] = useState([]);
  const [m, setM] = useState('');
  const [docs, setDocs] = useState([]);
  const [languages, setLanguages] = useState(['Hindi', 'English']);
  const [activeReportDoc, setActiveReportDoc] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // Crucial manual land metadata
  const [docType, setDocType] = useState('jamin_khatihan');
  const [meta, setMeta] = useState({
    state: 'Bihar',
    district: 'Muzaffarpur',
    tehsil_circle: 'Muzaffarpur Sadar',
    village_mauza: 'Kanti',
    khata_no: '47',
    khasra_no: '214/2',
    claimed_owner: 'Rameshwar Sah',
    area: '0.62',
    deed_number: 'RG-88214',
    poa_holder_name: ''
  });

  const setMetaField = (k, v) => setMeta(prev => ({ ...prev, [k]: v }));

  const load = () => api.documents().then(setDocs).catch(e => setM(e.message));

  useEffect(() => {
    load();
    const id = setInterval(load, 2500); // Live polling for pipeline progression
    return () => clearInterval(id);
  }, []);

  async function send() {
    if (!files.length) return;
    setIsUploading(true);
    setM('');
    try {
      const fullMeta = { ...meta, document_type: docType };
      const r = await api.upload(files, languages, fullMeta);
      setM(`✓ Batch uploaded successfully. Processing pipeline started for ${r.documents.length} document(s).`);
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

  return (
    <>
      <Header
        title="Upload & digitize"
        sub="Classify land documents, specify crucial land attributes, and trigger the automated 5-step extraction and fraud verification pipeline."
      />

      {/* Manual Document Classification & Crucial Data Form */}
      <div className="panel meta-entry-panel">
        <div className="panel-head">
          <div>
            <h4>1. Document Classification &amp; Crucial Land Data</h4>
            <p className="sub">Classify the document type and provide key cadastral fields for cross-matching against official registries.</p>
          </div>
        </div>

        <div className="doc-type-selector">
          <label>Document Type:</label>
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

        <div className="meta-grid">
          <div className="field-box">
            <label>State</label>
            <input value={meta.state} onChange={e => setMetaField('state', e.target.value)} placeholder="e.g. Bihar" />
          </div>
          <div className="field-box">
            <label>District</label>
            <input value={meta.district} onChange={e => setMetaField('district', e.target.value)} placeholder="e.g. Muzaffarpur" />
          </div>
          <div className="field-box">
            <label>Circle / Anchal / Tehsil</label>
            <input value={meta.tehsil_circle} onChange={e => setMetaField('tehsil_circle', e.target.value)} placeholder="e.g. Muzaffarpur Sadar" />
          </div>
          <div className="field-box">
            <label>Mauza / Village</label>
            <input value={meta.village_mauza} onChange={e => setMetaField('village_mauza', e.target.value)} placeholder="e.g. Kanti" />
          </div>
          <div className="field-box">
            <label>Khata Number</label>
            <input value={meta.khata_no} onChange={e => setMetaField('khata_no', e.target.value)} placeholder="e.g. 47" />
          </div>
          <div className="field-box">
            <label>Khasra / Plot Number</label>
            <input value={meta.khasra_no} onChange={e => setMetaField('khasra_no', e.target.value)} placeholder="e.g. 214/2" />
          </div>
          <div className="field-box">
            <label>Claimed Owner / Applicant</label>
            <input value={meta.claimed_owner} onChange={e => setMetaField('claimed_owner', e.target.value)} placeholder="e.g. Rameshwar Sah" />
          </div>
          <div className="field-box">
            <label>Area (Acre / Decimal / Kattha)</label>
            <input value={meta.area} onChange={e => setMetaField('area', e.target.value)} placeholder="e.g. 0.62 Acre" />
          </div>
          <div className="field-box">
            <label>Deed / Registry No. (If applicable)</label>
            <input value={meta.deed_number} onChange={e => setMetaField('deed_number', e.target.value)} placeholder="e.g. RG-88214" />
          </div>
          {docType === 'power_of_attorney' && (
            <div className="field-box poa-field">
              <label>Power of Attorney Holder Name</label>
              <input value={meta.poa_holder_name} onChange={e => setMetaField('poa_holder_name', e.target.value)} placeholder="Name of PoA holder agent" />
            </div>
          )}
        </div>
      </div>

      {/* File Upload Dropzone */}
      <div className="panel" style={{ marginTop: 18 }}>
        <div className="panel-head">
          <h4>2. Upload Document Scans</h4>
        </div>
        <label className="dropzone">
          <input
            type="file"
            multiple
            accept=".pdf,.tif,.tiff,.jpg,.jpeg,.png"
            onChange={e => setFiles([...e.target.files])}
          />
          <svg viewBox="0 0 24 24" fill="none" width="36" height="36" style={{ margin: '0 auto 8px', display: 'block', color: 'var(--ledger)' }}>
            <path d="M12 15V4M12 4L7 9M12 4l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 16v3a1 1 0 001 1h14a1 1 0 001-1v-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <h4>{files.length ? `${files.length} file(s) selected for upload` : 'Drop land records here, or click to browse'}</h4>
          <p>PDF, TIFF, JPG and PNG supported. Maximum 20 files per batch.</p>
        </label>

        <div className="panel-head" style={{ marginTop: 16 }}>
          <h4>Document language(s) present</h4>
          <button
            className="btn btn-primary btn-sm"
            disabled={!files.length || isUploading}
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
          My uploaded documents <small className="live-dot">● Live Pipeline Updates</small>
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
        <div className="panel empty">No uploaded documents in current batch. Upload a record above to start processing.</div>
      )}

      {/* Validation Report Modal */}
      <ValidationReportModal reportData={activeReportDoc} onClose={() => setActiveReportDoc(null)} />
    </>
  );
}

function Verify({ refresh }) {
  const [tasks, setTasks] = useState([]);
  const [selected, setSelected] = useState();
  const [error, setError] = useState('');

  const load = () => api.tasks().then(x => {
    setTasks(x);
    setSelected(x[0]);
  }).catch(e => setError(e.message));

  useEffect(load, []);

  async function decide(decision) {
    if (!selected) return;
    try {
      await api.decision(selected.id, {
        decision,
        fields: selected.record?.fields || {},
        reason: 'Reviewed and confirmed by authorized Revenue Officer through NIRVIVAAD dashboard'
      });
      load();
      refresh();
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <>
      <Header title="Verification queue" sub="Records flagged by validation wait here for an authorized reviewer to confirm or correct." />
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
            {tasks.map(t => (
              <tr key={t.id}>
                <td className="mono">{t.record?.khasra_no || '—'}</td>
                <td>{t.record?.owner || '—'}</td>
                <td>{t.record?.village || '—'}</td>
                <td>
                  <span className="tag-warn">{(t.reason_codes || []).join(', ')}</span>
                </td>
                <td>{Math.round((t.confidence || 0.75) * 100)}%</td>
                <td>
                  <button className="btn btn-ghost btn-sm" onClick={() => setSelected(t)}>Review</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!tasks.length && <p className="empty">No records currently need review. All uploaded records passed validation.</p>}
      </div>

      {selected && (
        <>
          <div className="panel-head" style={{ marginTop: 26 }}>
            <h4>Reviewing — Khasra No. {selected.record?.khasra_no || '—'}</h4>
          </div>
          <div className="verify-shell">
            <div className="doc-preview">
              <div className="doc-sheet">
                <div className="doc-title">Digitized Record Summary</div>
                <div className="doc-line"><span>Owner</span><span className="highlight">{selected.record?.owner}</span></div>
                <div className="doc-line"><span>Khata No.</span><span className="highlight">{selected.record?.khata_no}</span></div>
                <div className="doc-line"><span>Khasra No.</span><span className="highlight">{selected.record?.khasra_no}</span></div>
                <div className="doc-line"><span>Village</span><span>{selected.record?.village}</span></div>
                <div className="doc-line"><span>District</span><span>{selected.record?.district}</span></div>
                <div className="doc-line"><span>Authenticity Score</span><span className="highlight">{selected.record?.authenticity_score ?? 70}%</span></div>
              </div>
            </div>
            <div>
              <div className="field-form">
                <div className="field-row">
                  <div className="fr-top"><label>Owner Name</label><span className="conf mid"><span className="conf-dot" />Review</span></div>
                  <input defaultValue={selected.record?.owner} />
                </div>
                <div className="field-row">
                  <div className="fr-top"><label>Khasra / Plot Number</label><span className="conf high"><span className="conf-dot" />High</span></div>
                  <input defaultValue={selected.record?.khasra_no} />
                </div>
                <div className="field-row">
                  <div className="fr-top"><label>Khata Number</label><span className="conf high"><span className="conf-dot" />High</span></div>
                  <input defaultValue={selected.record?.khata_no} />
                </div>
              </div>
              <div className="verify-actions">
                <button className="btn btn-danger btn-sm" onClick={() => decide('reject')}>Reject Record</button>
                <button className="btn btn-primary btn-sm" onClick={() => decide('approve')}>Confirm &amp; Publish</button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

function Records() {
  const [q, setQ] = useState('');
  const [r, setR] = useState([]);
  const [activeReportDoc, setActiveReportDoc] = useState(null);

  useEffect(() => {
    const id = setTimeout(() => api.records(q).then(setR).catch(() => setR([])), 250);
    return () => clearTimeout(id);
  }, [q]);

  async function openDocReport(docId) {
    if (!docId) return;
    try {
      const rep = await api.documentReport(docId);
      setActiveReportDoc(rep);
    } catch (e) {
      alert('Report details not available: ' + e.message);
    }
  }

  return (
    <>
      <Header title="Records repository" sub="Search traceable, digitized and validated land records stored in MongoDB." />
      <div className="filters">
        <input placeholder="Search owner, khasra, khata, village…" value={q} onChange={e => setQ(e.target.value)} />
      </div>
      <div className="panel" style={{ padding: 0 }}>
        <table className="repo-table">
          <thead>
            <tr>
              <th style={{ paddingLeft: 20 }}>Khata / Khasra</th>
              <th>Owner Name</th>
              <th>Village</th>
              <th>District</th>
              <th>Authenticity</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {r.map(x => (
              <tr key={x.record_id}>
                <td style={{ paddingLeft: 20 }} className="mono"><b>{x.khata_no} / {x.khasra_no}</b></td>
                <td>{x.owner}</td>
                <td>{x.village}</td>
                <td>{x.district}</td>
                <td>
                  <span className={`score-badge ${(x.authenticity_score ?? 90) >= 70 ? 'good' : 'warn'}`}>
                    {x.authenticity_score ?? 90}%
                  </span>
                </td>
                <td>
                  <span className={`status-pill ${x.status === 'verified' ? 'done' : 'review'}`}>
                    {x.status === 'verified' ? 'Nirvivaad' : 'Pending review'}
                  </span>
                </td>
                <td>
                  <button className="btn btn-ghost btn-sm" onClick={() => openDocReport(x.document_id)}>
                    View Report
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!r.length && <p className="empty" style={{ padding: 20 }}>No matching records found.</p>}
      </div>

      <ValidationReportModal reportData={activeReportDoc} onClose={() => setActiveReportDoc(null)} />
    </>
  );
}

function Reports() {
  const [p, setP] = useState([]);
  const [e, setE] = useState([]);

  useEffect(() => {
    api.progress().then(setP);
    api.errors().then(setE);
  }, []);

  return (
    <>
      <Header title="Reports" sub="District digitization progress and validation error trends." />
      <div className="two-col">
        <div className="panel">
          <h4>District Digitization Progress</h4>
          {p.map(x => (
            <div key={x.state + x.district} style={{ margin: '10px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                <span>{x.state} / {x.district}</span>
                <b>{x.progress}% ({x.records} records)</b>
              </div>
              <div className="barwrap" style={{ marginTop: 4 }}>
                <div className="bartrack">
                  <div className="barfill" style={{ width: `${x.progress}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="panel">
          <h4>Validation Flags &amp; Inbuilt Checks</h4>
          {e.length ? (
            e.map(x => (
              <div key={x.reason_code} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #e6e2d5' }}>
                <span className="mono">{x.reason_code}</span>
                <b>{x.count} case(s)</b>
              </div>
            ))
          ) : (
            <p className="empty">No validation errors registered.</p>
          )}
        </div>
      </div>
    </>
  );
}

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
      // Internal dashboard routes
      setPage('dashboard');
      if (['dashboard', 'upload', 'verify', 'records', 'reports', 'admin'].includes(hash)) {
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

  // Determine allowed navigation items (no 'integrations'!)
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
  ) : v === 'reports' ? (
    <Reports />
  ) : (
    <Admin />
  );

  return (
    <div className="app react-app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">NV</div>
          <div className="brand-text">
            <h1>NIRVIVAAD</h1>
            <span>LAND RECORD INTELLIGENCE</span>
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

        {/* Sidebar Footer with Prominent, Clearly Visible Logout Button */}
        <div className="sidebar-foot">
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
      </main>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
