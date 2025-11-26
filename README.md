# Barebone Gulp Project

Proyek ini menggunakan **Gulp 4** untuk otomatisasi **compile Pug → HTML, Sass → CSS, copy JS, optimize images, dan live server**.  
Struktur sudah modular, responsive-ready, dan siap multi-page.

---

## ⚡ Fitur Utama

- Compile **Pug → HTML** (multi-page, modular)
- Compile **Sass → CSS** (modular & responsive)
- Copy **JS & Fonts**
- Optimize **Images**
- **Live server + auto reload** via BrowserSync
- Clean folder `dist/` sebelum build

---

## 🗂 Struktur Folder Singkat

src/
├─ pug/ # layout, partials, pages
├─ sass/ # abstracts, base, layout, components, utilities, vendors
├─ js/ # custom JS
└─ assets/ # images, fonts

dist/ # hasil compile otomatis
gulpfile.js # konfigurasi Gulp
package.json


---

## 🚀 Cara Pakai

1. Install dependencies:

```bash
npm install

2. Development + live reload:
npm run dev

3. Build production:
npm run build

4. Clean dist/:
npm run clean

