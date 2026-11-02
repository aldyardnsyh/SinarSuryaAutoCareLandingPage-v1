// src/data/site.ts — SATU-SATUNYA tempat data bisnis.
// Sumber data: listing resmi Google Maps Sinar Surya Auto Care
// (https://maps.app.goo.gl/q5tPToCPzbebyi2z8) per 31 Okt 2026.

export const SITE = {
  name: 'Sinar Surya Auto Care',
  shortName: 'SSAC',
  tagline: 'Bengkel Mobil & Cuci Hidrolik',
  // Nomor AKTIF dari client (31 Okt 2026) — dipakai untuk telepon & semua chat WhatsApp.
  // Nomor lama 022-7502999 sudah tidak aktif.
  phoneDisplay: '0812-2022-203',
  phoneIntl: '+628122022203',
  whatsapp: '628122022203',
  whatsappDisplay: '0812-2022-203',
  address: {
    street: 'Jl. Cijagra No. 8',
    detail: 'Bojongsoang, Kec. Bojongsoang, Kab. Bandung, Jawa Barat',
    postalCode: '40288',
  },
  // Koordinat pin asli dari listing Google Maps (bukan perkiraan).
  geo: { lat: -6.9848264, lng: 107.6329325 },
  // Link share listing resmi + embed iframe resmi dari Google Maps.
  gmapsShare: 'https://maps.app.goo.gl/q5tPToCPzbebyi2z8',
  mapsEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11757.020765797182!2d107.62229337177436!3d-6.978662238352537!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e9a34ef881e7%3A0xa83f3dd35d1d0b27!2sSinar%20Surya%20Auto%20Care!5e1!3m2!1sid!2sid!4v1793396259398!5m2!1sid!2sid',
  hours: {
    days: 'Setiap hari',
    display: '07.00 – 17.00 WIB', // jam dari listing GMaps; konfirmasi ulang ke client
    note: 'Buka setiap hari 07.00 – 17.00',
  },
  // Data nyata dari listing Google Maps (4,7 dari 96 ulasan per 31 Okt 2026).
  rating: { score: '4,7', count: 96 },
  social: {
    // Halaman/lokasi resmi bengkel (dari client).
    instagram:
      'https://www.instagram.com/explore/locations/270770150/sinar-surya-auto-care/',
    facebook:
      'https://www.facebook.com/pages/Sinar-Surya-Auto-Care/154461098013280',
  },
  // Non-www di-redirect Vercel ke www, jadi semua URL resmi memakai www.
  domain: 'https://www.sinarsuryaautocare.biz.id', // samakan dengan astro.config.mjs & robots.txt
  // Tautan terkait yang direkomendasikan di footer (info pendamping untuk pengunjung).
  relatedSites: [
    {
      url: 'https://www.bengkelmobilbojongsoang.web.id',
      anchor: 'Info lengkap bengkel di Bojongsoang',
    },
    {
      url: 'https://www.bengkelmobilbandung.biz.id',
      anchor: 'Layanan cuci hidrolik & steam wash area Bandung',
    },
  ],
} as const;

/** Alamat lengkap dalam satu baris (untuk topbar, footer, pesan WA). */
export const ALAMAT_SINGKAT = `${SITE.address.street}, Bojongsoang, Kab. Bandung`;

/**
 * Jadwal jam buka per jenis layanan (aturan client):
 * - Servis & perbaikan: hanya Senin sampai Sabtu, Minggu tutup.
 * - Cuci hidrolik: buka setiap hari, jam hari Minggu berbeda.
 * Jam Minggu untuk cuci masih [DATA-CLIENT:jam-minggu-cuci], konfirmasi ke client.
 */
export const JAM = {
  servis: { hari: 'Senin – Sabtu', buka: '07.00', tutup: '17.00', mingguTutup: true },
  cuci: {
    hari: 'Setiap hari',
    buka: '07.00',
    tutup: '17.00',
    minggu: { buka: '08.00', tutup: '14.00' }, // [DATA-CLIENT:jam-minggu-cuci]
  },
} as const;

function keMenit(jam: string): number {
  const [h, m] = jam.split('.').map(Number);
  return h * 60 + m;
}

export interface StatusJam {
  servisBuka: boolean;
  cuciBuka: boolean;
  /** Teks singkat untuk chip di topbar, mis. "Servis Buka". */
  servisChip: string;
  cuciChip: string;
  /** Kalimat panjang untuk kartu kontak. */
  servisStatus: string;
  cuciStatus: string;
}

/**
 * Hitung status buka/tutup dari waktu di device pengunjung.
 * Dipanggil ulang dari browser tiap 30 detik agar selalu segar.
 */
export function hitungStatus(now: Date = new Date()): StatusJam {
  const hari = now.getDay(); // 0 = Minggu
  const menit = now.getHours() * 60 + now.getMinutes();

  const servisBuka =
    hari !== 0 && menit >= keMenit(JAM.servis.buka) && menit < keMenit(JAM.servis.tutup);

  const jamCuciHariIni = hari === 0 ? JAM.cuci.minggu : JAM.cuci;
  const cuciBuka =
    menit >= keMenit(jamCuciHariIni.buka) && menit < keMenit(jamCuciHariIni.tutup);

  return {
    servisBuka,
    cuciBuka,
    servisChip: servisBuka ? 'Servis Buka' : 'Servis Tutup',
    cuciChip: cuciBuka ? 'Cuci Buka' : 'Cuci Tutup',
    servisStatus: servisBuka
      ? 'Buka sekarang, tutup ' + JAM.servis.tutup
      : 'Tutup sekarang, buka ' + (hari === 6 ? JAM.servis.buka : 'Senin ' + JAM.servis.buka),
    cuciStatus: cuciBuka
      ? 'Buka sekarang, tutup ' + jamCuciHariIni.tutup
      : 'Tutup sekarang, buka ' + jamCuciHariIni.buka,
  };
}

const NAMA_HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

/**
 * Info realtime untuk pill di hero: hari + jam saat ini, status buka,
 * dan hitungan mundur menuju jam tutup/buka. Contoh hasil:
 * - "Buka sekarang · tutup 17.00 · tersisa 2 jam 30 mnt lagi"
 * - "Buka dalam 25 menit"
 * - "Minggu 09.15 · cuci buka sampai 14.00 · servis buka Senin"
 */
export function infoRealtimeHero(now: Date = new Date()): { buka: boolean; teks: string } {
  const hari = now.getDay();
  const menit = now.getHours() * 60 + now.getMinutes();
  const waktu = `${String(Math.floor(menit / 60)).padStart(2, '0')}.${String(menit % 60).padStart(2, '0')}`;

  if (hari === 0) {
    const cuciBuka =
      menit >= keMenit(JAM.cuci.minggu.buka) && menit < keMenit(JAM.cuci.minggu.tutup);
    return {
      buka: cuciBuka,
      teks: cuciBuka
        ? `Minggu ${waktu} · cuci buka sampai ${JAM.cuci.minggu.tutup} · servis buka Senin`
        : `Minggu ${waktu} · cuci buka ${JAM.cuci.minggu.buka}–${JAM.cuci.minggu.tutup} · servis buka Senin`,
    };
  }

  if (menit < keMenit(JAM.servis.buka)) {
    const selisih = keMenit(JAM.servis.buka) - menit;
    return {
      buka: false,
      teks:
        selisih <= 60
          ? `Buka dalam ${selisih} menit · ${NAMA_HARI[hari]} ${waktu}`
          : `${NAMA_HARI[hari]} ${waktu} · buka ${JAM.servis.buka}–${JAM.servis.tutup}`,
    };
  }

  if (menit < keMenit(JAM.servis.tutup)) {
    const sisa = keMenit(JAM.servis.tutup) - menit;
    const sisaTeks =
      sisa >= 60
        ? `${Math.floor(sisa / 60)} jam${sisa % 60 ? ' ' + (sisa % 60) + ' mnt' : ''} lagi`
        : `${sisa} menit lagi`;
    return {
      buka: true,
      teks: `Buka sekarang · tutup ${JAM.servis.tutup} · tersisa ${sisaTeks}`,
    };
  }

  return {
    buka: false,
    teks:
      hari === 6
        ? `Sabtu ${waktu} · tutup · buka Senin ${JAM.servis.buka}`
        : `${NAMA_HARI[hari]} ${waktu} · tutup · buka besok ${JAM.servis.buka}`,
  };
}

/**
 * Link WhatsApp dengan template pesan resmi:
 * selalu dibuka dengan nama bengkel + lokasinya, baru inti pesannya.
 * Contoh hasil: "Halo Sinar Surya Auto Care yang lokasinya di Jl. Cijagra No. 8,
 * Bojongsoang, Kab. Bandung. Saya ingin booking jadwal servis."
 */
export function waLink(intiPesan?: string): string {
  const pembuka = `Halo ${SITE.name} yang lokasinya di ${ALAMAT_SINGKAT}. `;
  const inti = intiPesan ?? 'Saya mau tanya-tanya dulu soal layanan bengkelnya.';
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(pembuka + inti)}`;
}
