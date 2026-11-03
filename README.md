# Website Landing Page — Sinar Surya Auto Care

Situs brand hub bengkel mobil & cuci hidrolik, dibangun dengan **Astro 4**. Zero framework JS — HTML statis murni + beberapa baris vanilla script.
Domain final: **https://www.sinarsuryaautocare.biz.id** (deploy di Vercel, non-www di-redirect ke www).

## Perintah

```bash
npm install       # sekali saja
npm run dev       # development → http://localhost:4321
npm run build     # build produksi → dist/
npm run preview   # preview hasil build → http://localhost:4321
```

## Deploy ke Vercel

1. Push folder `site/` ini ke repository Git (GitHub/GitLab).
2. Di Vercel: **Add New Project → Import** repository tersebut.
3. Vercel otomatis mendeteksi Astro (Build: `npm run build`, Output: `dist/`) — langsung Deploy.
4. Setelah live, masuk **Settings → Domains** → tambahkan `sinarsuryaautocare.biz.id`,
   lalu arahkan record domain sesuai instruksi Vercel (CNAME).
5. `vercel.json` di root sudah mengatur cache agresif: aset `/​_astro/*` (gambar WebP, CSS, JS)
   di-cache 1 tahun `immutable` karena nama filenya ber-hash; sitemap & favicon di-cache 1 jam.

## Performa

- Semua foto otomatis dikonversi ke **WebP** oleh `astro:assets` dengan beberapa ukuran
  responsif (browser memilih yang paling pas), hero memakai `fetchpriority="high"`,
  sisanya lazy-load. Total aset per kunjungan jauh di bawah 1 MB.
- Tanpa framework JS; hanya beberapa script vanilla kecil (jam realtime, slider, hamburger).
- Cache headers untuk Vercel ada di `vercel.json`.

## SEO & Indexing

- Sitemap otomatis (`@astrojs/sitemap`) berisi domain final; `robots.txt` sudah menunjuk ke sana.
- JSON-LD: `AutoRepair` (nama, alamat, koordinat, jam buka 2 spesifikasi, katalog 8 layanan,
  logo PNG 512px, hasMap, areaServed, sameAs FB/IG/situs saudari, aggregateRating) +
  `FAQPage` (4 pertanyaan umum) + per halaman: `Service` & `BreadcrumbList` (/layanan),
  `Review` (/ulasan), `BlogPosting` + `BreadcrumbList` (artikel blog).
- OG/Twitter card lengkap untuk kartu share di WhatsApp/FB/Twitter: judul, deskripsi, gambar
  1200x630 (`public/og-image.jpg`, kartu share branded: logo, nama, rating
  Google, nomor aktif, domain), `og:site_name`, `theme-color`.
- Keyword lokal yang ditarget (dari riset pencarian umum): bengkel mobil bojongsoang,
  cuci mobil bojongsoang, bengkel mobil terdekat, cuci mobil hidrolik bandung, bengkel
  mobil bandung selatan, ganti oli bojongsoang, service ac mobil, perawatan mobil rutin,
  bengkel yang buka hari minggu. Tersebar natural di title, meta, H1/H2, paragraf Tentang,
  FAQ, alt gambar, dan artikel blog.

## Set ikon / favicon (tampilan hasil pencarian Google)

Google menampilkan ikon situs di hasil pencarian dari beberapa sumber. Semua sudah tersedia
di `public/`:

| File | Fungsi |
|---|---|
| `favicon.ico` (16/32/48) | Fallback yang dicari crawler (Google/Bing) |
| `favicon.svg` | Ikon modern untuk browser yang mendukung |
| `favicon-32x32.png` | PNG kecil untuk tab browser |
| `apple-touch-icon.png` (180) | iOS home screen |
| `icon-192.png` / `icon-512.png` | Web manifest + JSON-LD `logo` (Google minta raster ≥112px) |
| `site.webmanifest` | Manifest PWA ringan |

Ikon diregenerasi dari `favicon.svg` dengan:

```bash
node scripts/generate-favicons.mjs
```

Jalankan ulang hanya bila `favicon.svg` berubah, lalu commit hasilnya.

## Blog

Artikel ada di `src/content/blog/*.md` (satu file = satu artikel, markdown), koleksi
`blog` didefinisikan di `src/content/config.ts`, dirender oleh `src/pages/blog/[slug].astro`
dengan daftar di `src/pages/blog/index.astro`. Setiap artikel otomatis mendapat
schema `BlogPosting` + `BreadcrumbList` dan masuk sitemap.

Menambah artikel: salin salah satu file, ganti frontmatter (`title`, `description`,
`pubDate`, `image`, `imageAlt`) dan isi markdown. Foto diambil dari `src/assets/`
(foto asli bengkel). CTA WhatsApp di bagian bawah artikel memakai template `waLink()`
dari `src/data/site.ts`; link WA di dalam teks artikel di-encode manual, jaga formatnya
tetap `https://wa.me/628122022203?text=...`.

Aturan konten: hanya fakta terverifikasi (alamat, jam, layanan, rating dari
`src/data/site.ts`), tanpa harga, tanpa klaim belum dikonfirmasi client, tanpa em-dash.

### Setelah deploy (wajib untuk ranking lokal)

1. **Google Search Console**: tambah properti domain → verifikasi via DNS → submit
   `https://sinarsuryaautocare.biz.id/sitemap-index.xml` → URL Inspection → Request Indexing.
2. **Profil Bisnis Google**: pastikan alamat/jam/telepon konsisten dengan website
   (NAP), lalu tautkan website baru di profil. Ulasan adalah sinyal ranking lokal terkuat;
   tombol "Tulis ulasan di Google Maps" di bagian testimoni bisa dipakai untuk mengarahkan
   pelanggan.
3. Uji share: kirim URL ke chat WhatsApp sendiri, pastikan kartu preview tampil dengan
   gambar dan deskripsi.

## Struktur

```
src/
├── layouts/BaseLayout.astro     # <head>, SEO meta, OG, JSON-LD AutoRepair, fonts
├── components/                  # komponen per section halaman
│   ├── TopInfoBar.astro
│   ├── Navbar.astro             # sticky + hamburger mobile
│   ├── Hero.astro               # LCP image (fetchpriority=high) + trust strip overlap
│   ├── TentangKami.astro
│   ├── Layanan.astro            # Grup A (servis) & Grup B (cuci hidrolik)
│   ├── TanyaHargaCTA.astro      # pengganti pricelist — TANPA angka harga
│   ├── CaraBooking.astro
│   ├── Testimoni.astro          # slider ulasan asli Google Maps
│   ├── Galeri.astro
│   ├── KontakLokasi.astro       # kartu kontak + embed Google Maps lazy
│   ├── CtaBand.astro
│   ├── Footer.astro
│   └── WhatsAppFloat.astro
├── content/
│   ├── config.ts                # skema koleksi blog
│   └── blog/*.md                # artikel blog (satu file = satu artikel)
├── data/
│   ├── site.ts                  # SATU-SATUNYA tempat data bisnis (WA, alamat, jam, sosmed)
│   ├── layanan.ts               # 8 layanan + trust strip + cara booking
│   └── testimoni.ts             # 4 ulasan asli Google Maps
├── assets/                      # foto asli bengkel (dipakai astro:assets)
├── styles/tokens.css            # design tokens (warna, spacing, tipografi, tombol)
└── pages/
    ├── index.astro              # komposisi semua section (beranda)
    ├── layanan.astro            # halaman layanan + schema Service
    ├── tentang.astro            # halaman tentang
    ├── ulasan.astro             # halaman ulasan + schema Review
    ├── 404.astro                # halaman tidak ditemukan (dilayani Vercel otomatis)
    └── blog/
        ├── index.astro          # daftar artikel
        └── [slug].astro         # render artikel + schema BlogPosting
public/                          # robots.txt, favicon set, site.webmanifest, og-image.jpg
scripts/
└── generate-favicons.mjs       # rasterisasi favicon.svg → ico/png set
```

## Sumber data (per 31 Okt 2026)

Data diambil langsung dari listing resmi Google Maps:
<https://maps.app.goo.gl/q5tPToCPzbebyi2z8>

| Data | Nilai |
|---|---|
| Alamat | Jl. Cijagra No. 8, Bojongsoang, Kec. Bojongsoang, Kab. Bandung, Jawa Barat 40288 |
| Telepon / WhatsApp (aktif) | 0812-2022-203 |
| Jam buka | Setiap hari 07.00 – 17.00 WIB |
| Rating Google | 4,7 (96 ulasan) |
| Koordinat pin | -6.9848264, 107.6329325 |

Foto di `src/assets/` diambil dari galeri foto listing Google Maps tersebut.

## Ulasan pelanggan (src/data/testimoni.ts)

Slider testimoni menampilkan ulasan ASLI dari Google Maps (nama, rating, teks) plus
kartu ringkasan rating 4,7 (96 ulasan) dan tombol "Lihat semua ulasan" menuju listing.
Google membatasi daftar ulasan untuk pengunjung tanpa login, sehingga hanya 4 ulasan
teks yang bisa diambil otomatis. Tambahkan ulasan lain secara manual di
`src/data/testimoni.ts` saat client meneruskannya.

## ⚠️ Sebelum rilis — data yang WAJIB dikonfirmasi ke client

1. **Nomor telepon/WA aktif** — sudah memakai nomor dari client: `0812-2022-203`.
   Nomor lama `022-7502999` (masih tampil di listing Google Maps) sudah tidak aktif;
   segera perbarui Profil Bisnis Google agar NAP konsisten dengan website.
2. **Jam operasional** — 07.00–17.00 dari listing GMaps, konfirmasi ulang.
3. **Domain final** — samakan `site` di `astro.config.mjs` dan `domain` di `site.ts`.
4. **Ulasan** — slider menampilkan 4 ulasan asli yang terekspos publik; minta client
   konfirmasi bila ingin menambah/mengurangi.
5. **Izin foto** — foto diambil dari listing Google Maps & halaman Facebook bengkel
   (sebagian unggahan pengulas). Konfirmasi izin pemakaiannya, atau ganti dengan foto
   resmi dari pemilik bengkel.

## Template pesan WhatsApp

Semua tombol WA memakai satu template di `waLink()` (`src/data/site.ts`), selalu dibuka
dengan nama + lokasi bengkel:

> Halo Sinar Surya Auto Care yang lokasinya di Jl. Cijagra No. 8, Bojongsoang, Kab. Bandung.
> [inti pesan sesuai tombolnya]

## Catatan deploy

- Ganti domain placeholder `https://sinarsuryaautocare.com` di **dua tempat**:
  `astro.config.mjs` (`SITE_URL`) dan `src/data/site.ts` (`domain`), plus `public/robots.txt`.
- Deploy statis ke Netlify/Vercel/Cloudflare Pages (build: `npm run build`, output: `dist/`).
- Setelah live: submit sitemap ke Google Search Console + klaim Profil Bisnis Google

