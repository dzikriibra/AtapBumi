# AtapBumi

> Forum diskusi untuk para pendaki dan pecinta kegiatan alam.

AtapBumi adalah aplikasi forum diskusi yang dibangun sebagai bagian dari pembelajaran React dan Redux di Dicoding Academy.

Aplikasi ini memungkinkan pengguna untuk berdiskusi mengenai pendakian, berbagi pengalaman, bertanya, serta memberikan respons terhadap thread dan komentar pengguna lain.

Project ini juga menjadi sarana untuk menerapkan dan mendokumentasikan proses pembelajaran dalam membangun aplikasi React secara terstruktur, mulai dari pengelolaan state, komunikasi dengan REST API, authentication, hingga penerapan code quality.

---

## Features

### Core Features

- Register akun
- Login dan authentication
- Menampilkan daftar thread
- Menampilkan detail thread
- Menampilkan komentar pada thread
- Membuat thread
- Membuat komentar
- Loading indicator ketika mengambil data dari API

### Additional Features

- Up-vote dan down-vote pada thread
- Up-vote dan down-vote pada komentar
- Neutralize vote
- Menampilkan jumlah vote
- Menampilkan leaderboard
- Filter thread berdasarkan kategori
- Search thread
- Akses menuju panduan mendaki

> Fitur tambahan akan dikembangkan setelah seluruh fitur utama selesai dan disesuaikan dengan waktu pengerjaan submission.

---

## Tech Stack

### Frontend

- React
- Vite
- JavaScript
- Tailwind CSS
- React Router

### State Management

- Redux Toolkit
- React Redux

### API & Data

- Axios
- Dicoding Forum API

### Development Tools

- ESLint
- Prettier
- Vitest
- Lucide React

---

## API

AtapBumi menggunakan **Dicoding Forum API** sebagai sumber data utama.

Base URL:

```text
https://forum-api.dicoding.dev/v1
```
