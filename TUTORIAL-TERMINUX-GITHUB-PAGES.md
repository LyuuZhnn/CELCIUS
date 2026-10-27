# Tutorial singkat: Termux → GitHub Pages

## 1. Siapkan repositori di GitHub

1. Buka GitHub dan buat repository baru, misalnya `celcius`.
2. Untuk langkah di bawah, buat repository kosong terlebih dahulu (jangan centang README/license jika belum perlu).
3. Unduh file `CELCIUS.zip` ke folder **Download** HP, lalu buka Termux.

## 2. Ekstrak ZIP di Termux

Jalankan perintah berikut satu per satu:

```bash
termux-setup-storage
pkg update -y
pkg install unzip git -y
cd ~/storage/downloads
unzip CELCIUS.zip
cd CELCIUS
```

Pastikan file `index.html` ada:

```bash
ls
```

Di daftar tersebut harus terlihat `index.html`, `css`, `js`, `data`, dan `pages`.

## 3. Unggah proyek ke GitHub

Ganti `USERNAME` dengan username GitHub kamu dan `NAMA-REPO` dengan nama repository yang dibuat pada langkah 1.

```bash
git init
git branch -M main
git add .
git commit -m "Deploy CELCIUS website"
git remote add origin https://github.com/USERNAME/NAMA-REPO.git
git push -u origin main
```

Jika diminta autentikasi, ikuti petunjuk GitHub. GitHub tidak menerima password akun biasa untuk operasi Git lewat HTTPS; gunakan metode autentikasi yang disediakan GitHub, seperti token atau login GitHub CLI. Jangan menuliskan token ke file proyek atau membagikannya.

> Jika kamu pernah menambahkan `origin`, periksa dengan `git remote -v` dan perbarui URL dengan `git remote set-url origin https://github.com/USERNAME/NAMA-REPO.git` bila perlu.

## 4. Aktifkan GitHub Pages

1. Buka repository di GitHub.
2. Masuk ke **Settings → Pages**.
3. Pada bagian **Build and deployment**, pilih **Deploy from a branch**.
4. Pilih branch **main** dan folder **/(root)**, lalu tekan **Save**.
5. Tunggu proses publikasi selesai. URL website akan ditampilkan di halaman Pages; format umumnya `https://USERNAME.github.io/NAMA-REPO/`.

Jangan memindahkan `index.html` ke dalam folder `pages`. File itu harus tetap berada di root proyek.

## 5. Memperbarui data circle

Contoh untuk mengubah anggota:

1. Edit `data/anggota.js`.
2. Simpan perubahan.
3. Unggah perubahan ke GitHub. Jika repository sudah terhubung, dari folder proyek jalankan:

```bash
git add .
git commit -m "Update data CELCIUS"
git push
```

Setelah publikasi GitHub Pages selesai, pengunjung akan melihat data baru. Aktivitas, pengumuman, peraturan, serta kontak resmi dapat diubah dengan cara yang sama pada file di folder `data`.

## Catatan penting

- Website ini statis dan tidak memiliki database atau panel admin bersama.
- Jangan memasukkan password, token, atau informasi rahasia ke file JavaScript publik.
- Pastikan URL kontak yang ditambahkan benar-benar resmi.
- Path proyek sudah menggunakan path relatif supaya berjalan pada URL repository GitHub Pages.
