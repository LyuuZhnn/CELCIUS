# CELCIUS — Free Fire Circle Website

Website profil dan pusat informasi circle CELCIUS. Dibangun dengan HTML, CSS, dan JavaScript murni serta kompatibel dengan GitHub Pages.

## Fitur

- Dashboard beranda dengan statistik yang dihitung dari data anggota.
- Halaman Tentang Circle, Struktur Organisasi, Anggota, Aktivitas, Pengumuman, Peraturan, dan Gabung Circle.
- Sidebar desktop dan drawer hamburger di HP.
- Pencarian anggota serta filter Semua/MOBI/HP.
- Empty state untuk aktivitas dan pengumuman yang belum memiliki data.
- Seluruh ikon antarmuka berupa SVG inline, tanpa kebutuhan gambar profil.
- Layout responsif dan mendukung preferensi `prefers-reduced-motion`.

## Struktur folder

```text
CELCIUS/
├── index.html
├── assets/favicon.svg
├── css/                 # style.css, components.css, responsive.css
├── js/app.js
├── data/                # anggota.js, aktivitas.js, pengumuman.js, peraturan.js, config.js
├── pages/               # halaman website lainnya
└── README.md
```

## Mengubah data

- **Anggota:** edit `data/anggota.js`. Pertahankan nilai kategori `MOBI` atau `HP` agar statistik/filter tetap bekerja.
- **Aktivitas:** edit array `window.CELCIUS_DATA.aktivitas` pada `data/aktivitas.js`.
- **Pengumuman:** edit array `window.CELCIUS_DATA.pengumuman` pada `data/pengumuman.js`.
- **Peraturan:** edit `data/peraturan.js`. Teks awal adalah placeholder, bukan aturan resmi.
- **Kontak:** isi `whatsapp`, `groupUrl`, dan/atau `instagramUrl` pada `data/config.js` menggunakan tautan resmi yang sudah dikonfirmasi.

Setelah mengubah data, commit dan push file ke repositori GitHub. Setelah GitHub Pages menyelesaikan publikasi, perubahan akan tersedia bagi semua pengunjung.

## Catatan hosting

GitHub Pages merupakan hosting statis. Website ini tidak memiliki backend, database bersama, atau panel admin. Pengunjung tidak bisa mengubah data bersama dari browser; pembaruan dilakukan dengan mengedit file proyek dan memublikasikan ulang.

## Publikasi

Lihat `TUTORIAL-TERMINUX-GITHUB-PAGES.md` untuk langkah-langkah membuat repositori, mengunggah file menggunakan Termux, dan mengaktifkan GitHub Pages.
