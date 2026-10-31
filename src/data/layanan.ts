// src/data/layanan.ts — daftar layanan grup A (mekanikal) & grup B (cuci).
// Catatan client: layanan cuci MOTOR tidak tersedia, hanya mobil.

export interface Layanan {
  id: string;
  nama: string;
  deskripsi: string;
  ikon: string; // nama Material Symbols
  group: 'servis' | 'cuci';
  waMessage: string; // inti pesan; nama & lokasi bengkel otomatis dari waLink()
}

export const LAYANAN: Layanan[] = [
  // ── Grup A — Servis & Perbaikan ──────────────────────────────
  {
    id: 'servis-rutin',
    nama: 'Servis Rutin & Tune Up',
    deskripsi: 'Perawatan berkala agar mesin tetap sehat dan hemat bahan bakar.',
    ikon: 'tune',
    group: 'servis',
    waMessage: 'Mobil saya mau servis rutin / tune up. Bisa tanya estimasi waktunya?',
  },
  {
    id: 'ganti-oli',
    nama: 'Ganti Oli & Filter',
    deskripsi: 'Oli dan filter sesuai rekomendasi tipe mobil Anda.',
    ikon: 'oil_barrel',
    group: 'servis',
    waMessage: 'Mau ganti oli dan filter untuk mobil saya. Estimasi biayanya berapa ya?',
  },
  {
    id: 'service-ac',
    nama: 'Service AC Mobil',
    deskripsi: 'Dari cuci AC sampai perbaikan, agar kabin kembali sejuk.',
    ikon: 'ac_unit',
    group: 'servis',
    waMessage: 'AC mobil saya kurang dingin. Boleh tanya estimasi service AC?',
  },
  {
    id: 'kaki-kaki',
    nama: 'Kaki-kaki & Rem',
    deskripsi:
      'Suspensi, shockbreaker, dan rem diperiksa serta diperbaiki dengan teliti.',
    ikon: 'tire_repair',
    group: 'servis',
    waMessage: 'Rem atau kaki-kaki mobil saya terasa aneh. Bisa bantu cek estimasinya?',
  },
  {
    id: 'kelistrikan',
    nama: 'Kelistrikan & Aki',
    deskripsi: 'Cek kelistrikan, aki, sampai lampu, agar mobil siap jalan pagi.',
    ikon: 'bolt',
    group: 'servis',
    waMessage: 'Mobil saya susah distarter, curiga akinya. Boleh tanya estimasi cek kelistrikan?',
  },

  // ── Grup B — Cuci Hidrolik & Steam ───────────────────────────
  {
    id: 'cuci-mobil-hidrolik',
    nama: 'Cuci Mobil Hidrolik',
    deskripsi: 'Mobil diangkat hidrolik, bagian bawah ikut tercuci bersih.',
    ikon: 'local_car_wash',
    group: 'cuci',
    waMessage: 'Mau tanya antrean cuci mobil hidrolik untuk hari ini atau besok.',
  },
  {
    id: 'steam-wash',
    nama: 'Steam Wash Interior',
    deskripsi: 'Interior dikeringkan dengan steam, higienis dan tidak lembap.',
    ikon: 'clean_hands',
    group: 'cuci',
    waMessage: 'Tanya-tanya dulu soal steam wash interior untuk mobil saya.',
  },
  {
    id: 'vacuum-detailing',
    nama: 'Vacuum & Detailing',
    deskripsi: 'Vakum menyeluruh dan detailing untuk tampilan mobil seperti baru.',
    ikon: 'auto_fix_high',
    group: 'cuci',
    waMessage: 'Mobil mau sekalian di-vakum dan detailing. Paketnya bagaimana ya?',
  },
];

/** 4 poin identitas pada kartu strip yang menempel di bawah hero. */
export const TRUST_STRIP = [
  {
    ikon: 'build',
    judul: 'Teknisi Berpengalaman',
    deskripsi: 'Dikerjakan oleh mekanik yang paham mobil Anda.',
  },
  {
    ikon: 'schedule',
    judul: 'Pelayanan Cepat & Ramah',
    deskripsi: 'Datang sesuai jadwal, dikerjakan dengan teliti.',
  },
  {
    ikon: 'verified_user',
    judul: 'Sparepart Berkualitas',
    deskripsi: 'Kami rekomendasikan sparepart yang tepat untuk mobil Anda.',
  },
  {
    ikon: 'local_car_wash',
    judul: 'Cuci Hidrolik & Steam',
    deskripsi: 'Bersih sampai bagian bawah mobil.',
  },
] as const;

/** 3 langkah cara booking. */
export const CARA_BOOKING = [
  {
    nomor: '01',
    judul: 'Chat WhatsApp',
    deskripsi: 'Kirim keluhan dan foto mobil Anda ke WhatsApp kami.',
  },
  {
    nomor: '02',
    judul: 'Konsultasi',
    deskripsi: 'Kami cek kondisinya dan jelaskan estimasi pengerjaannya.',
  },
  {
    nomor: '03',
    judul: 'Datang & Servis',
    deskripsi: 'Kerjakan sesuai jadwal yang sudah disepakati.',
  },
] as const;
