// ---------- View switching ----------
  const navItems = document.querySelectorAll('.nav-item[data-view]');
  function switchView(name){
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById('view-' + name).classList.add('active');
    navItems.forEach(n => n.classList.toggle('active', n.dataset.view === name));
    window.scrollTo({top:0, behavior:'instant'});
  }
  navItems.forEach(btn => btn.addEventListener('click', () => switchView(btn.dataset.view)));

  // ---------- Dropzone ----------
  const dropzone = document.getElementById('dropzone');
  const fileInput = document.getElementById('fileInput');
  dropzone.addEventListener('click', () => fileInput.click());
  ['dragenter','dragover'].forEach(evt => dropzone.addEventListener(evt, e => { e.preventDefault(); dropzone.classList.add('drag'); }));
  ['dragleave','drop'].forEach(evt => dropzone.addEventListener(evt, e => { e.preventDefault(); dropzone.classList.remove('drag'); }));
  dropzone.addEventListener('drop', e => {
    const n = e.dataTransfer.files.length;
    if(n) dropzone.querySelector('h4').textContent = n + ' file' + (n>1?'s':'') + ' added to batch';
  });
  fileInput.addEventListener('change', () => {
    const n = fileInput.files.length;
    if(n) dropzone.querySelector('h4').textContent = n + ' file' + (n>1?'s':'') + ' added to batch';
  });

  // ---------- Language chips ----------
  document.querySelectorAll('#langChips .chip').forEach(c => {
    c.addEventListener('click', () => c.classList.toggle('selected'));
  });

  // ---------- Sample data ----------
  const stateProgress = [
    {state:'Bihar', districts:'21 / 38', pct:71},
    {state:'Uttar Pradesh', districts:'34 / 75', pct:58},
    {state:'Maharashtra', districts:'28 / 36', pct:84},
    {state:'Rajasthan', districts:'19 / 33', pct:62},
    {state:'West Bengal', districts:'12 / 23', pct:47},
    {state:'Karnataka', districts:'22 / 31', pct:76},
  ];
  const stateProgressBody = document.getElementById('stateProgressBody');
  stateProgress.forEach(r => {
    stateProgressBody.insertAdjacentHTML('beforeend', `
      <tr class="district-row">
        <td>${r.state}</td>
        <td class="mono">${r.districts}</td>
        <td><div class="barwrap"><div class="bartrack"><div class="barfill" style="width:${r.pct}%"></div></div><span class="pct">${r.pct}%</span></div></td>
      </tr>`);
  });

  const activity = [
    {c:'#3F6B4A', text:'Batch "Nashik Taluka Register Vol.9" completed validation — 214 records', t:'4 minutes ago'},
    {c:'#A23B2E', text:'Owner-name mismatch flagged for Khasra No. 88/1, Kanti village', t:'19 minutes ago'},
    {c:'#B4842A', text:'12 records routed to manual review — low OCR confidence on plot area', t:'52 minutes ago'},
    {c:'#3F6B4A', text:'DILRMP sync completed — 1,840 records pushed', t:'1 hour ago'},
  ];
  const activityFeed = document.getElementById('activityFeed');
  activity.forEach(a => {
    activityFeed.insertAdjacentHTML('beforeend', `
      <div class="activity-item">
        <div class="activity-dot" style="background:${a.c}"></div>
        <div><p>${a.text}</p><div class="t">${a.t}</div></div>
      </div>`);
  });

  const queue = [
    {k:'214/2', owner:'Rameshwar Sah', village:'Kanti', reason:'Owner name unclear', conf:52},
    {k:'88/1', owner:'Fatima Khatun', village:'Bela', reason:'Duplicate khata suspected', conf:38},
    {k:'305', owner:'Suresh Patil', village:'Ojhar', reason:'Plot area illegible', conf:44},
    {k:'19/3', owner:'Govind Yadav', village:'Sarairanjan', reason:'Mismatch vs. mutation record', conf:61},
    {k:'142', owner:'Lakshmi Reddy', village:'Yadgir', reason:'Handwritten annotation overlaps field', conf:49},
  ];
  const queueBody = document.getElementById('queueBody');
  queue.forEach(q => {
    const cls = q.conf < 50 ? 'low' : (q.conf < 75 ? 'mid' : 'high');
    queueBody.insertAdjacentHTML('beforeend', `
      <tr>
        <td class="mono">${q.k}</td>
        <td>${q.owner}</td>
        <td>${q.village}</td>
        <td>${q.reason}</td>
        <td><span class="conf ${cls}"><span class="conf-dot"></span>${q.conf}%</span></td>
        <td><button class="btn btn-ghost btn-sm">Review</button></td>
      </tr>`);
  });

  const repo = [
    {khata:'47', khasra:'214/2', owner:'Rameshwar Sah', village:'Kanti', district:'Muzaffarpur', area:'0.62 ac', status:'verified',
     trail:['Digitized from Vol. 14, Pg. 004 — 3 days ago','Reviewed by R. Kumar (Revenue Officer) — 2 days ago','Synced to LRMS — 2 days ago']},
    {khata:'12', khasra:'88/1', owner:'Fatima Khatun', village:'Bela', district:'Muzaffarpur', area:'1.10 ac', status:'pending',
     trail:['Digitized from Vol. 14, Pg. 011 — 1 day ago','Flagged: duplicate khata suspected — awaiting review']},
    {khata:'204', khasra:'305', owner:'Suresh Patil', village:'Ojhar', district:'Nashik', area:'0.85 ac', status:'verified',
     trail:['Digitized from cadastral map sheet 7B — 6 days ago','Reviewed by A. Deshmukh — 5 days ago','Synced to GIS layer — 5 days ago']},
    {khata:'61', khasra:'19/3', owner:'Govind Yadav', village:'Sarairanjan', district:'Muzaffarpur', area:'0.40 ac', status:'pending',
     trail:['Digitized from Vol. 15, Pg. 002 — 8 hours ago','Mismatch against mutation record MUT/2021/044 — awaiting review']},
    {khata:'98', khasra:'142', owner:'Lakshmi Reddy', village:'Yadgir', district:'Belagavi', area:'2.30 ac', status:'verified',
     trail:['Digitized from Vol. 3, Pg. 077 — 2 weeks ago','Reviewed by K. Hegde — 2 weeks ago','Synced to LRMS — 13 days ago']},
  ];
  const repoBody = document.getElementById('repoBody');
  repo.forEach((r, i) => {
    const pill = r.status === 'verified' ? '<span class="status-pill done">verified</span>' : '<span class="status-pill review">pending mutation</span>';
    repoBody.insertAdjacentHTML('beforeend', `
      <tr>
        <td class="idnum" style="padding-left:20px;">${r.khata} / ${r.khasra}</td>
        <td class="owner">${r.owner}</td>
        <td>${r.village}</td>
        <td>${r.district}</td>
        <td class="mono">${r.area}</td>
        <td>${pill}</td>
        <td><button class="btn btn-ghost btn-sm" data-toggle="${i}">Audit trail</button></td>
      </tr>
      <tr class="row-expand" id="trail-${i}" style="display:none;"><td colspan="7">
        <ul class="audit-trail">${r.trail.map(t=>`<li>${t}</li>`).join('')}</ul>
      </td></tr>`);
  });
  repoBody.addEventListener('click', e => {
    const btn = e.target.closest('[data-toggle]');
    if(!btn) return;
    const row = document.getElementById('trail-' + btn.dataset.toggle);
    row.style.display = row.style.display === 'none' ? 'table-row' : 'none';
  });

  // ---------- Reports bar charts ----------
  const districtData = [
    {l:'Muzaffarpur', v:1840}, {l:'Patna', v:2110}, {l:'Nashik', v:1370},
    {l:'Belagavi', v:960}, {l:'Jaipur', v:1520}, {l:'Howrah', v:740},
  ];
  const maxD = Math.max(...districtData.map(d=>d.v));
  const districtBars = document.getElementById('districtBars');
  districtData.forEach(d => {
    districtBars.insertAdjacentHTML('beforeend', `
      <div class="col">
        <div class="bval">${d.v}</div>
        <div class="bar" style="height:${(d.v/maxD*140)}px"></div>
        <div class="blabel">${d.l}</div>
      </div>`);
  });

  const errorData = [
    {l:'Faded text', v:118}, {l:'Handwriting', v:96}, {l:'Format mismatch', v:54},
    {l:'Damaged page', v:37}, {l:'Duplicate entry', v:22},
  ];
  const maxE = Math.max(...errorData.map(d=>d.v));
  const errorBars = document.getElementById('errorBars');
  errorData.forEach(d => {
    errorBars.insertAdjacentHTML('beforeend', `
      <div class="col">
        <div class="bval">${d.v}</div>
        <div class="bar err" style="height:${(d.v/maxE*140)}px"></div>
        <div class="blabel">${d.l}</div>
      </div>`);
  });

  const detail = [
    {state:'Bihar', district:'Muzaffarpur', docs:'18,240', pct:74},
    {state:'Bihar', district:'Patna', docs:'22,110', pct:81},
    {state:'Maharashtra', district:'Nashik', docs:'13,700', pct:69},
    {state:'Karnataka', district:'Belagavi', docs:'9,600', pct:58},
    {state:'Rajasthan', district:'Jaipur', docs:'15,200', pct:63},
    {state:'West Bengal', district:'Howrah', docs:'7,400', pct:41},
  ];
  const detailProgressBody = document.getElementById('detailProgressBody');
  detail.forEach(r => {
    detailProgressBody.insertAdjacentHTML('beforeend', `
      <tr>
        <td>${r.state}</td>
        <td>${r.district}</td>
        <td class="mono">${r.docs}</td>
        <td><div class="barwrap"><div class="bartrack"><div class="barfill" style="width:${r.pct}%"></div></div><span class="pct">${r.pct}%</span></div></td>
      </tr>`);
  });
