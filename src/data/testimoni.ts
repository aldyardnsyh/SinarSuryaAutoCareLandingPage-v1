// src/data/testimoni.ts — ulasan ASLI pelanggan dari listing Google Maps
// (https://maps.app.goo.gl/q5tPToCPzbebyi2z8, diambil 31 Okt 2026).
// Rating agregat: 4,7 dari 96 ulasan.
// Catatan: hanya ulasan ber-rating bagus yang ditampilkan. Google membatasi
// daftar ulasan untuk pengunjung tanpa login; tambahkan ulasan baru di sini
// saat client meneruskannya.

export interface Testimoni {
  nama: string;
  rating: number; // 1-5, sesuai rating asli pengulas
  quote: string;
}

export const TESTIMONI: Testimoni[] = [
  {
    nama: 'Triwi Triwibowo',
    rating: 5,
    quote:
      'Tempat cuci mobil terbersih selama yang saya rasakan, pokoknya hasilnya memuaskan dibandingkan yang lain.',
  },
  {
    nama: 'Luthfi Lathifuddin',
    rating: 5,
    quote:
      'Cuci mobil rush lama cuma 50 rb, tempat nyaman, ada mushola & toilet, bayar bisa pakai QRIS.',
  },
  {
    nama: 'B.C. Andriyono',
    rating: 5,
    quote:
      'Lokasi strategis. Petugasnya ramah dan welcome. Meski sudah gelap masih bisa nawar utk dilayani. Ada kedai mie ayam, kopi klo mesti nunggu.',
  },
  {
    nama: 'Evan Aradhana',
    rating: 4,
    quote: 'Sangat bagus, bersih, dan cukup detail.',
  },
];
