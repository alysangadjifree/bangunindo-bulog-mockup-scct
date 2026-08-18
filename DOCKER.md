# Deployment Docker / Dokploy

Proyek ini menggunakan multi-stage Docker build dan berjalan pada port `3000`.

## Dokploy

1. Buat application baru dari repository ini.
2. Pilih build type **Dockerfile** dan gunakan `Dockerfile` di root repository.
3. Atur container port ke `3000`.
4. Tambahkan environment berikut dari menu Environment Dokploy:

   - `DEMO_ADMIN_USERNAME`
   - `DEMO_ADMIN_PASSWORD`
   - `DEMO_SESSION_SECRET` — minimal 32 karakter acak.

5. Hubungkan domain, aktifkan HTTPS, lalu deploy.

Jangan menyimpan password atau session secret di repository maupun Docker image. Untuk membuat session secret, gunakan password generator yang aman atau perintah seperti `openssl rand -base64 48` pada mesin Anda.

## Docker Compose lokal

Salin environment yang diperlukan ke file `.env` lokal, kemudian jalankan:

```bash
docker compose up --build -d
```

Aplikasi tersedia di `http://localhost:3000` secara default. Ubah `APP_PORT` jika port host perlu berbeda.

## Pemeriksaan

```bash
docker compose ps
docker compose logs -f scct-bulog
```

Status container menjadi `healthy` setelah halaman utama berhasil merespons.
