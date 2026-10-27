(function () {
  'use strict';
  const DATA = window.CELCIUS_DATA || {};
  const base = document.body.dataset.base || './';
  const page = document.body.dataset.page || 'beranda';
  const members = Array.isArray(DATA.anggota) ? DATA.anggota : [];
  const activities = Array.isArray(DATA.aktivitas) ? DATA.aktivitas : [];
  const announcements = Array.isArray(DATA.pengumuman) ? DATA.pengumuman : [];
  const rules = Array.isArray(DATA.peraturan) ? DATA.peraturan : [];
  const config = DATA.config || {};
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  const iconPaths = {
    home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 7h.01"/>',
    org: '<rect x="8" y="3" width="8" height="5" rx="1"/><rect x="2" y="16" width="8" height="5" rx="1"/><rect x="14" y="16" width="8" height="5" rx="1"/><path d="M12 8v4M6 16v-4h12v4"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="10" cy="7" r="4"/><path d="M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    activity: '<path d="M3 12h4l3-8 4 16 3-8h4"/>',
    bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
    shield: '<path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11z"/><path d="m9 12 2 2 4-4"/>',
    join: '<circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    chevron: '<path d="m9 18 6-6-6-6"/>',
    smartphone: '<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M11 18h2"/>',
    monitor: '<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4"/>',
    gamepad: '<path d="M6 12h4m-2-2v4M16 11h.01M18 13h.01"/><path d="M6 7h12a3 3 0 0 1 2.8 4l-1.4 5a2 2 0 0 1-3.3.9l-2-1.9h-4.2l-2 1.9a2 2 0 0 1-3.3-.9l-1.4-5A3 3 0 0 1 6 7z"/>',
    crown: '<path d="m2 8 5 4 5-8 5 8 5-4-2 12H4L2 8z"/><path d="M4 22h16"/>',
    briefcase: '<rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V4h8v3M3 12h18M10 12v2h4v-2"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    spark: '<path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.9 2.1L22 19l-2.1.9L19 22l-.9-2.1L16 19l2.1-.9z"/>',
    compass: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2.2 4.8-4.8 2.2 2.2-4.8z"/>',
    message: '<path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8z"/>',
    network: '<rect x="9" y="2" width="6" height="5" rx="1"/><rect x="2" y="17" width="6" height="5" rx="1"/><rect x="16" y="17" width="6" height="5" rx="1"/><path d="M12 7v5M5 17v-5h14v5"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h8"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    x: '<path d="m18 6-12 12M6 6l12 12"/>',
    external: '<path d="M14 3h7v7M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
    lock: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V6a4 4 0 1 1 8 0v4"/>',
    heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8z"/>',
    alert: '<path d="M10.3 3.9 2.5 18a2 2 0 0 0 1.7 3h15.6a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
    circle: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/>',
    users2: '<path d="M17 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="11" cy="7" r="4"/><path d="M19 8v6M22 11h-6"/>',
    pin: '<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0z"/><circle cx="12" cy="10" r="2"/>',
    filter: '<path d="M4 7h16M7 12h10m-7 5h4"/>',
  };
  function icon(name, cls = '') { return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[name] || iconPaths.spark}</svg>`; }
  function esc(value) { return String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
  function href(route) { return base + (route === 'beranda' ? 'index.html' : `pages/${route}.html`); }
  function countCategory(cat) { return members.filter(m => m.kategori === cat).length; }
  function initials(name) { const parts = String(name || '').trim().split(/\s+/).filter(Boolean); return (parts.length > 1 ? parts[0][0] + parts[1][0] : (parts[0] || '?').slice(0, 1)).toUpperCase(); }
  function pageIntro(eyebrow, title, description, right = '') { return `<div class="page-intro"><div><div class="eyebrow">${esc(eyebrow)}</div><h2>${title}</h2><p>${description}</p></div>${right}</div>`; }
  function sectionHeading(title, desc = '', link = '') { return `<div class="section-heading"><div><h3>${title}</h3>${desc ? `<p>${desc}</p>` : ''}</div>${link}</div>`; }
  function emptyState(title, description, iconName = 'spark') { return `<div class="empty-state"><div class="empty-icon">${icon(iconName)}</div><h4>${title}</h4><p>${description}</p></div>`; }
  function memberCard(member, index = 0) {
    const isMobi = member.kategori === 'MOBI';
    const accent = isMobi ? 'accent-cyan' : 'accent-violet';
    const color = isMobi ? '#129ab4' : '#8063dd';
    const wash = isMobi ? '#e3faff' : '#f1eaff';
    return `<article class="member-card ${accent}" style="--accent:${color};--wash:${wash}" data-member-name="${esc(member.nama.toLowerCase())}" data-member-category="${esc(member.kategori)}"><span class="member-mark">${String(index + 1).padStart(2, '0')}</span><div class="member-initial" aria-hidden="true">${esc(initials(member.nama))}</div><div class="member-card-info"><h4>${esc(member.nama)}</h4><span class="badge ${isMobi ? 'badge-cyan' : 'badge-violet'}">${icon(isMobi ? 'smartphone' : 'monitor')} ${esc(member.kategori)}</span></div></article>`;
  }
  function statCard(label, value, meta, iconName, accent) { return `<article class="stat-card ${accent}"><div class="stat-top"><span class="stat-label">${label}</span><span class="stat-icon">${icon(iconName)}</span></div><div class="stat-value">${value}</div><div class="stat-meta">${meta}</div></article>`; }
  function featureCard(iconName, title, text, bg = '#edf1ff', color = '#4b68e8') { return `<article class="feature-card" style="--feature-bg:${bg};--feature:${color}"><div class="feature-icon">${icon(iconName)}</div><div><h4>${title}</h4><p>${text}</p></div></article>`; }
  function activityCard(a) {
    const status = a.status || 'Belum ditentukan';
    const cls = status === 'Akan Datang' ? 'badge-blue' : status === 'Berlangsung' ? 'badge-green' : 'badge-gray';
    return `<article class="timeline-card"><div class="timeline-top"><div><span class="badge badge-cyan">${esc(a.kategori || 'Aktivitas')}</span><h3 style="margin-top:10px">${esc(a.nama || 'Aktivitas')}</h3></div><span class="badge ${cls}">${esc(status)}</span></div><p>${esc(a.deskripsi || 'Belum ada deskripsi kegiatan.')}</p><div class="timeline-meta"><span>${icon('calendar')}${esc(a.tanggal || 'Tanggal belum diisi')}</span><span>${icon('clock')}${esc(a.waktu || 'Waktu belum diisi')}</span></div></article>`;
  }
  function announcementCard(a) { return `<article class="notice-card ${a.penting ? 'important' : ''}">${a.penting ? '<span class="badge badge-amber">Pengumuman penting</span>' : `<span class="badge badge-blue">${esc(a.kategori || 'Informasi')}</span>`}<h3>${esc(a.judul || 'Pengumuman')}</h3><p>${esc(a.isi || '')}</p><div class="notice-date">${esc(a.tanggal || 'Tanggal belum tersedia')}</div></article>`; }
  function previewItems(items, render, kind, iconName) { return items.length ? `<div class="grid grid-2">${items.slice(0,2).map(render).join('')}</div>` : emptyState(kind === 'aktivitas' ? 'Belum ada aktivitas terbaru' : 'Belum ada pengumuman', kind === 'aktivitas' ? 'Informasi mabar, OP Test, sparing, atau kegiatan lain akan muncul di sini setelah datanya ditambahkan.' : 'Pengumuman resmi CELCIUS akan ditampilkan di sini setelah tersedia.', iconName); }

  const navItems = [
    { key:'beranda', label:'Beranda', icon:'home' }, { key:'tentang', label:'Tentang Circle', icon:'info' },
    { key:'struktur', label:'Struktur Organisasi', icon:'org' }, { key:'anggota', label:'Anggota', icon:'users' },
    { key:'aktivitas', label:'Aktivitas', icon:'activity' }, { key:'pengumuman', label:'Pengumuman', icon:'bell' },
    { key:'peraturan', label:'Peraturan', icon:'shield' }, { key:'gabung', label:'Gabung Circle', icon:'join' }
  ];
  const nav = $('#nav-menu');
  if (nav) nav.innerHTML = navItems.map(item => `<a class="nav-link ${item.key === page ? 'active' : ''}" href="${href(item.key)}" ${item.key === page ? 'aria-current="page"' : ''}>${icon(item.icon)}<span>${item.label}</span><span class="nav-arrow" aria-hidden="true">›</span></a>`).join('');

  const content = $('#page-content');
  const pages = {
    beranda: renderHome,
    tentang: renderAbout,
    struktur: renderStructure,
    anggota: renderMembers,
    aktivitas: renderActivities,
    pengumuman: renderAnnouncements,
    peraturan: renderRules,
    gabung: renderJoin
  };
  if (content) content.innerHTML = (pages[page] || renderHome)();
  const pageTitle = navItems.find(item => item.key === page)?.label || 'Beranda';
  const titleNode = $('#topbar-title'); if (titleNode) titleNode.textContent = pageTitle;
  const crumb = $('#breadcrumb-current'); if (crumb) crumb.textContent = pageTitle;
  const footerYear = $('#footer-year'); if (footerYear) footerYear.textContent = new Date().getFullYear();
  initNavigation();
  initPageInteractions();

  function renderHome() {
    const head = pageIntro('WELCOME TO THE CIRCLE', 'Pusat informasi <span style="color:#526be3">CELCIUS.</span>', 'Satu tempat untuk mengenal circle, melihat anggota, dan mengikuti informasi yang sudah dikonfirmasi.', `<span class="intro-pill">${icon('spark')} Circle dashboard</span>`);
    return `${head}
      <section class="hero-panel" aria-labelledby="hero-title"><div class="hero-copy"><span class="hero-kicker">${icon('spark')} FREE FIRE CIRCLE</span><h2 class="hero-title" id="hero-title">CELCIUS<span>.</span></h2><div class="hero-tagline">One Circle. One Identity.</div><p>CELCIUS adalah circle Free Fire yang dibangun dengan identitas, kebersamaan, dan koordinasi antaranggota.</p><div class="hero-actions"><a class="btn btn-primary" href="${href('anggota')}">${icon('users')} Lihat Anggota</a><a class="btn btn-glass" href="${href('struktur')}">${icon('network')} Struktur Circle ${icon('arrow')}</a></div></div><div class="hero-art" aria-hidden="true"><div class="orbit"><span class="orbit-node n1"></span><span class="orbit-node n2"></span><span class="orbit-node n3"></span><div class="orbit-core">C</div></div><div class="hero-mini-label"><strong>${members.length}</strong><span>LISTED MEMBERS</span></div></div></section>
      <section class="stats-grid" aria-label="Statistik circle">${statCard('Total Anggota', members.length, 'Data dari daftar anggota', 'users', 'accent-blue')}${statCard('Anggota MOBI', countCategory('MOBI'), 'Kategori perangkat MOBI', 'smartphone', 'accent-cyan')}${statCard('Anggota HP', countCategory('HP'), 'Kategori perangkat HP', 'monitor', 'accent-violet')}${statCard('Entri Jabatan', 3, 'Sesuai struktur yang diberikan', 'crown', 'accent-amber')}</section>
      <section class="feature-row">${featureCard('network','Terstruktur','Peran pengurus dan daftar anggota ditampilkan dengan jelas.')}${featureCard('message','Informasi terpusat','Aktivitas dan pengumuman ditampilkan setelah datanya tersedia.','#e5fbff','#119db5')}${featureCard('shield','Data transparan','Data awal berada di file proyek dan dapat diperbarui melalui GitHub.','#f3eaff','#805bd8')}</section>
      <div class="grid grid-2" style="margin-bottom:23px"><section class="panel panel-pad">${sectionHeading('Profil singkat','Identitas utama circle',`<a class="section-link" href="${href('tentang')}">Selengkapnya ${icon('chevron')}</a>`)}<div class="info-line"><span class="info-icon">${icon('spark')}</span><div class="info-copy"><strong>CELCIUS</strong><span>Nama circle</span></div><span class="badge badge-blue">Free Fire</span></div><div class="info-line"><span class="info-icon">${icon('compass')}</span><div class="info-copy"><strong>One Circle. One Identity.</strong><span>Tagline circle</span></div></div><div class="info-line"><span class="info-icon">${icon('users')}</span><div class="info-copy"><strong>${members.length} entri anggota</strong><span>Disusun menurut kategori perangkat</span></div></div></section><section class="panel panel-pad">${sectionHeading('Struktur utama','Ringkasan pengurus',`<a class="section-link" href="${href('struktur')}">Lihat struktur ${icon('chevron')}</a>`)}<div class="info-line"><span class="info-icon" style="background:#e4fbff;color:#159eb9">${icon('crown')}</span><div class="info-copy"><strong>Kazaya</strong><span>Founder</span></div><span class="badge badge-cyan">01</span></div><div class="info-line"><span class="info-icon" style="background:#f1eaff;color:#875cdb">${icon('briefcase')}</span><div class="info-copy"><strong>Kin Ramzy</strong><span>Pengurus</span></div><span class="badge badge-violet">02</span></div><div class="info-line"><span class="info-icon" style="background:#fff4dc;color:#b18124">${icon('target')}</span><div class="info-copy"><strong>Kin Ramzy</strong><span>Kang OP Test</span></div><span class="badge badge-amber">03</span></div></section></div>
      <section style="margin-bottom:23px">${sectionHeading('Anggota circle','Cuplikan daftar berdasarkan kategori',`<a class="section-link" href="${href('anggota')}">Semua anggota ${icon('chevron')}</a>`)}<div class="grid grid-2">${members.slice(0,4).map(memberCard).join('')}</div></section>
      <div class="grid grid-2"><section>${sectionHeading('Aktivitas terbaru','Agenda yang tersedia',`<a class="section-link" href="${href('aktivitas')}">Buka aktivitas ${icon('chevron')}</a>`)}${previewItems(activities,activityCard,'aktivitas','calendar')}</section><section>${sectionHeading('Pengumuman terbaru','Informasi resmi circle',`<a class="section-link" href="${href('pengumuman')}">Buka pengumuman ${icon('chevron')}</a>`)}${previewItems(announcements,announcementCard,'pengumuman','bell')}</section></div>
    `;
  }

  function renderAbout() {
    return `${pageIntro('ABOUT THE CIRCLE','Tentang CELCIUS','Kenali identitas, arah, dan nilai kebersamaan CELCIUS dalam satu halaman.',`<span class="intro-pill">${icon('spark')} Circle identity</span>`)}
      <section class="hero-panel" style="margin-bottom:20px"><div class="hero-copy"><span class="hero-kicker">${icon('compass')} OUR IDENTITY</span><h2 class="hero-title">Satu circle.<br><span>Satu identitas.</span></h2><div class="hero-tagline">One Circle. One Identity.</div><p>CELCIUS adalah circle Free Fire yang dibangun dengan identitas, kebersamaan, dan koordinasi antaranggota. Halaman ini menjadi tempat untuk mengenal informasi dasar circle.</p><div class="hero-actions"><a class="btn btn-primary" href="${href('anggota')}">${icon('users')} Kenali Anggota</a></div></div><div class="hero-art" aria-hidden="true"><div class="orbit"><span class="orbit-node n1"></span><span class="orbit-node n2"></span><span class="orbit-node n3"></span><div class="orbit-core">C</div></div></div></section>
      <div class="detail-grid"><section class="panel panel-pad"><div class="eyebrow">CORE VALUES</div><h3 style="font:700 17px var(--display);margin:0 0 15px">Nilai yang ingin dijaga</h3><div class="grid" style="gap:11px">${featureCard('heart','Kebersamaan','Membangun suasana circle yang saling menghargai.','#fff0f2','#d95c82')}${featureCard('network','Kerja sama','Menjaga koordinasi saat berkomunikasi dan beraktivitas.','#e5fbff','#119db5')}${featureCard('message','Komunikasi','Menyampaikan informasi secara jelas dan bertanggung jawab.','#f1eaff','#805bd8')}</div></section><section class="panel panel-pad"><div class="eyebrow">CIRCLE AT A GLANCE</div><h3 style="font:700 17px var(--display);margin:0 0 15px">Informasi umum</h3><div class="about-stat" style="margin-bottom:10px"><strong>CELCIUS</strong><span>Nama circle</span></div><div class="about-stat" style="margin-bottom:10px"><strong>${members.length}</strong><span>Entri anggota dalam data saat ini</span></div><div class="about-stat"><strong>3</strong><span>Entri jabatan pada struktur organisasi</span></div><div class="subtle-divider"></div><div class="callout">${icon('info')}<span><strong>Catatan:</strong> Sejarah, tanggal pendirian, prestasi, dan pencapaian belum ditampilkan karena belum ada informasi yang dikonfirmasi. Informasi tambahan dapat ditulis di file halaman atau dikembangkan melalui data proyek.</span></div></section></div>`;
  }

  function renderStructure() {
    const jobs = [
      { role:'Founder',name:'Kazaya',desc:'Pendiri CELCIUS.',icon:'crown',color:'#168ca7',wash:'#e3faff',featured:true },
      { role:'Pengurus',name:'Kin Ramzy',desc:'Pengurus CELCIUS.',icon:'briefcase',color:'#7e60d4',wash:'#f1eaff' },
      { role:'Kang OP Test',name:'Kin Ramzy',desc:'Bertanggung jawab atas kegiatan OP Test.',icon:'target',color:'#b08020',wash:'#fff5dd' }
    ];
    return `${pageIntro('CIRCLE LEADERSHIP','Struktur Organisasi','Susunan jabatan CELCIUS berdasarkan informasi yang diberikan.',`<span class="intro-pill">${icon('org')} 03 entri jabatan</span>`)}<section class="panel panel-pad" style="padding:clamp(18px,4vw,34px)"><div class="org-flow">${jobs.map((j,i)=>`${i ? '<div class="org-connector" aria-hidden="true"></div>' : ''}<article class="org-card ${j.featured?'featured':''}" style="--org-color:${j.color};--org-wash:${j.wash}"><div class="org-symbol">${icon(j.icon)}</div><div class="org-detail"><span class="org-role">${esc(j.role)}</span><h3>${esc(j.name)}</h3><p>${esc(j.desc)}</p></div><span class="org-order">${String(i+1).padStart(2,'0')}</span></article>`).join('')}<p class="org-note">Urutan visual mengikuti susunan jabatan yang diberikan. Satu nama dapat tercantum pada lebih dari satu jabatan.</p></div></section><div class="callout" style="margin-top:17px">${icon('info')}<span>Nama <strong>Kin Ramzy</strong> tetap tercantum pada jabatan Pengurus dan Kang OP Test sesuai data awal CELCIUS.</span></div>`;
  }

  function renderMembers() {
    const mobi = countCategory('MOBI'), hp = countCategory('HP');
    return `${pageIntro('MEMBER DIRECTORY','Anggota CELCIUS','Kenali anggota yang tergabung dalam CELCIUS.',`<span class="intro-pill">${icon('users')} ${members.length} total anggota</span>`)}
      <section class="stats-grid" aria-label="Ringkasan anggota">${statCard('Total Anggota',members.length,'Semua kategori','users','accent-blue')}${statCard('Anggota MOBI',mobi,'Kategori MOBI','smartphone','accent-cyan')}${statCard('Anggota HP',hp,'Kategori HP','monitor','accent-violet')}${statCard('Kategori','02','MOBI dan HP','filter','accent-amber')}</section>
      <div class="toolbar"><label class="search-wrap">${icon('search')}<span class="sr-only">Cari nama anggota</span><input class="search-input" id="member-search" type="search" autocomplete="off" placeholder="Cari nama anggota..." aria-label="Cari nama anggota"></label><div class="filter-group" role="group" aria-label="Filter kategori anggota"><button type="button" class="filter-btn active" data-filter="SEMUA" aria-pressed="true">Semua</button><button type="button" class="filter-btn" data-filter="MOBI" aria-pressed="false">MOBI</button><button type="button" class="filter-btn" data-filter="HP" aria-pressed="false">HP</button></div></div>
      <p class="results-label" id="member-results" aria-live="polite">Menampilkan ${members.length} anggota</p>
      <div class="category-section" id="category-mobi"><div class="category-title"><span class="category-icon">${icon('smartphone')}</span><div><h3>MOBI</h3><p>Anggota kategori MOBI</p></div><span class="category-count">${mobi} anggota</span></div><div class="member-grid">${members.filter(m=>m.kategori==='MOBI').map(memberCard).join('')}</div></div>
      <div class="category-section" id="category-hp"><div class="category-title"><span class="category-icon" style="background:#f1eaff;color:#8462dc">${icon('monitor')}</span><div><h3>HP</h3><p>Anggota kategori HP</p></div><span class="category-count">${hp} anggota</span></div><div class="member-grid">${members.filter(m=>m.kategori==='HP').map(memberCard).join('')}</div></div>
      <div id="member-empty" hidden>${emptyState('Anggota tidak ditemukan','Coba gunakan nama lain atau ubah filter kategori.','search')}</div>
      <div class="callout" style="margin-top:8px">${icon('info')}<span><strong>Catatan data:</strong> Ramzy tercantum dua kali karena berada pada dua kategori berbeda, yaitu MOBI dan HP. Kedua entri dipertahankan sesuai data yang diberikan.</span></div>`;
  }

  function renderActivities() {
    const cats = [...new Set(activities.map(a=>a.kategori).filter(Boolean))];
    return `${pageIntro('CIRCLE ACTIVITIES','Aktivitas CELCIUS','Informasi mabar, OP Test, sparing, scrim, dan kegiatan circle yang sudah memiliki data.',`<span class="intro-pill">${icon('calendar')} ${activities.length} aktivitas</span>`)}
      <div class="toolbar"><label style="min-width:210px;flex:1"><span class="sr-only">Filter kategori aktivitas</span><select class="select-input" id="activity-filter" aria-label="Filter kategori aktivitas"><option value="SEMUA">Semua kategori</option>${cats.map(c=>`<option value="${esc(c)}">${esc(c)}</option>`).join('')}</select></label><span class="intro-pill">${icon('activity')} Data aktivitas</span></div><p class="results-label" id="activity-results">${activities.length} aktivitas tersedia</p><div id="activity-list" class="grid grid-2">${activities.length ? activities.map(activityCard).join('') : emptyState('Belum ada aktivitas','Belum ada jadwal aktivitas yang dimasukkan. Daftar akan tampil otomatis setelah data ditambahkan ke file data/aktivitas.js.','calendar')}</div>
      <div class="callout" style="margin-top:17px">${icon('info')}<span>Contoh kategori yang dapat digunakan: Mabar, OP Test, Sparing, Scrim, Event internal, atau kegiatan lainnya. Jangan menambahkan jadwal yang belum dikonfirmasi.</span></div>`;
  }

  function renderAnnouncements() {
    return `${pageIntro('CIRCLE UPDATES','Pengumuman','Informasi yang dipublikasikan untuk anggota CELCIUS.',`<span class="intro-pill">${icon('bell')} ${announcements.length} pengumuman</span>`)}
      <div class="callout" style="margin-bottom:17px">${icon('info')}<span>Hanya pengumuman yang sudah disiapkan pada file data yang akan ditampilkan. Website ini tidak mengarang informasi atau tanggal publikasi.</span></div><div class="grid grid-2" id="announcement-list">${announcements.length ? announcements.map(announcementCard).join('') : emptyState('Belum ada pengumuman','Belum ada pengumuman yang ditambahkan. Pengumuman resmi dapat dimasukkan melalui file data/pengumuman.js.','bell')}</div>`;
  }

  function renderRules() {
    return `${pageIntro('COMMUNITY GUIDELINES','Peraturan Circle','Kerangka informasi untuk membantu menyusun aturan bersama. Konten awal di bawah ini belum menjadi aturan resmi.',`<span class="intro-pill">${icon('shield')} Draft untuk dilengkapi</span>`)}
      <div class="callout" style="margin-bottom:17px">${icon('alert')}<span><strong>Belum ditetapkan sebagai aturan resmi.</strong> Silakan lengkapi dan sepakati isi bersama pengurus CELCIUS sebelum digunakan sebagai pedoman anggota.</span></div><div class="grid grid-2">${rules.map((r,i)=>`<article class="rule-card"><div class="rule-number">${String(i+1).padStart(2,'0')}</div><div class="rule-body"><h3>${esc(r.judul)}</h3><p>${esc(r.deskripsi)}</p><span class="badge badge-amber">${esc(r.status || 'Perlu ditinjau')}</span></div></article>`).join('')}</div>`;
  }

  function renderJoin() {
    const contactItems = [
      { name:'WhatsApp Pengurus',desc:config.whatsapp ? 'Kontak telah diatur pada data proyek.' : 'Nomor belum ditambahkan.',icon:'message',url:config.whatsapp ? `https://wa.me/${String(config.whatsapp).replace(/\D/g,'')}` : '',state:config.whatsapp ? 'Tersedia' : 'Perlu diisi' },
      { name:'Tautan Grup',desc:config.groupUrl ? 'Tautan grup telah diatur.' : 'URL grup resmi belum ditambahkan.',icon:'users',url:config.groupUrl || '',state:config.groupUrl ? 'Tersedia' : 'Perlu diisi' },
      { name:'Instagram Circle',desc:config.instagramUrl ? 'Tautan profil telah diatur.' : 'Akun resmi belum ditambahkan.',icon:'external',url:config.instagramUrl || '',state:config.instagramUrl ? 'Tersedia' : 'Perlu diisi' }
    ];
    return `${pageIntro('JOIN THE CIRCLE','Gabung Circle','Informasi awal bagi calon anggota yang ingin mengenal dan menghubungi CELCIUS.',`<span class="intro-pill">${icon('join')} Informasi bergabung</span>`)}
      <section class="hero-panel" style="margin-bottom:19px"><div class="hero-copy"><span class="hero-kicker">${icon('users')} FIND YOUR CIRCLE</span><h2 class="hero-title" style="font-size:clamp(31px,4vw,45px)">Tertarik bergabung<br><span>dengan CELCIUS?</span></h2><div class="hero-tagline">One Circle. One Identity.</div><p>Gunakan jalur kontak resmi yang nantinya akan disediakan pengurus. Informasi di halaman ini tidak membuat nomor atau tautan grup secara otomatis.</p></div><div class="hero-art" aria-hidden="true"><div class="orbit"><span class="orbit-node n1"></span><span class="orbit-node n2"></span><span class="orbit-node n3"></span><div class="orbit-core">C</div></div></div></section>
      <div class="detail-grid"><section class="panel panel-pad"><div class="eyebrow">GET IN TOUCH</div><h3 style="font:700 17px var(--display);margin:0 0 14px">Kontak resmi</h3><div class="grid" style="gap:10px">${contactItems.map(c=>`<div class="contact-option"><span class="contact-icon">${icon(c.icon)}</span><span class="contact-copy"><strong>${esc(c.name)}</strong><span>${esc(c.desc)}</span></span>${c.url ? `<a class="btn btn-soft" href="${esc(c.url)}" target="_blank" rel="noopener noreferrer">Buka ${icon('external')}</a>` : `<span class="contact-state">${esc(c.state)}</span>`}</div>`).join('')}</div><div class="subtle-divider"></div><p class="small muted" style="margin:0">Kontak dapat diatur melalui file <code>data/config.js</code> dan dipublikasikan ulang lewat GitHub.</p></section><section class="panel panel-pad"><div class="eyebrow">HOW TO START</div><h3 style="font:700 17px var(--display);margin:0 0 17px">Langkah awal</h3><div class="steps"><div class="step"><span class="step-no">01</span><div><h4>Kenali informasi circle</h4><p>Baca halaman Tentang Circle, Struktur Organisasi, dan Peraturan setelah isinya dilengkapi.</p></div></div><div class="step"><span class="step-no">02</span><div><h4>Hubungi pengurus</h4><p>Gunakan kontak resmi jika nomor atau tautan sudah tersedia.</p></div></div><div class="step"><span class="step-no">03</span><div><h4>Ikuti arahan pengurus</h4><p>Persyaratan keanggotaan perlu diisi dan dikonfirmasi oleh pengurus CELCIUS.</p></div></div></div><div class="callout" style="margin-top:18px">${icon('info')}<span>Persyaratan belum ditentukan pada data awal. Jangan menganggap halaman ini sebagai konfirmasi penerimaan anggota.</span></div></section></div>`;
  }

  function initNavigation() {
    const sidebar = $('#sidebar'), toggle = $('#menu-toggle'), scrim = $('#scrim');
    const setOpen = open => {
      sidebar?.classList.toggle('is-open', open);
      scrim?.classList.toggle('is-visible', open);
      toggle?.setAttribute('aria-expanded', String(open));
      toggle?.setAttribute('aria-label', open ? 'Tutup menu navigasi' : 'Buka menu navigasi');
      document.body.classList.toggle('menu-open', open);
    };
    toggle?.addEventListener('click', () => setOpen(!sidebar.classList.contains('is-open')));
    scrim?.addEventListener('click', () => setOpen(false));
    document.addEventListener('keydown', event => { if (event.key === 'Escape') setOpen(false); });
    $$('.nav-link').forEach(link => link.addEventListener('click', () => setOpen(false)));
  }

  function initPageInteractions() {
    if (page === 'anggota') initMemberFilters();
    if (page === 'aktivitas') initActivityFilter();
  }
  function initMemberFilters() {
    const search = $('#member-search'), buttons = $$('[data-filter]'), cards = $$('.member-card');
    const empty = $('#member-empty'), result = $('#member-results'), sections = {MOBI:$('#category-mobi'),HP:$('#category-hp')};
    let category = 'SEMUA';
    const update = () => {
      const query = (search?.value || '').trim().toLocaleLowerCase('id');
      let visible = 0, per = {MOBI:0,HP:0};
      cards.forEach(card => {
        const matches = card.dataset.memberName.includes(query) && (category === 'SEMUA' || card.dataset.memberCategory === category);
        card.hidden = !matches;
        if (matches) { visible++; per[card.dataset.memberCategory]++; }
      });
      Object.keys(sections).forEach(cat => { if (sections[cat]) sections[cat].hidden = category !== 'SEMUA' && category !== cat || per[cat] === 0; });
      if (empty) empty.hidden = visible !== 0;
      if (result) result.textContent = `Menampilkan ${visible} dari ${members.length} anggota`;
    };
    search?.addEventListener('input', update);
    buttons.forEach(btn => btn.addEventListener('click', () => {
      category = btn.dataset.filter;
      buttons.forEach(other => { const active = other === btn; other.classList.toggle('active', active); other.setAttribute('aria-pressed', String(active)); });
      update();
    }));
    update();
  }
  function initActivityFilter() {
    const select = $('#activity-filter'), list = $('#activity-list'), result = $('#activity-results');
    select?.addEventListener('change', () => {
      const filtered = select.value === 'SEMUA' ? activities : activities.filter(a => a.kategori === select.value);
      if (list) list.innerHTML = filtered.length ? filtered.map(activityCard).join('') : emptyState('Belum ada aktivitas pada kategori ini','Coba pilih kategori lain atau tambahkan data aktivitas yang sudah dikonfirmasi.','calendar');
      if (result) result.textContent = `${filtered.length} aktivitas tersedia`;
    });
  }

  // Keep navigation focused and mobile menu state in a predictable condition.
  window.addEventListener('pageshow', () => { const content = $('#page-content'); if (content && content.classList.contains('skip-focus')) content.focus(); });
})();
