# AtapBumi

> Forum diskusi untuk para pendaki dan pecinta kegiatan alam.

AtapBumi adalah aplikasi forum diskusi yang dibangun sebagai bagian dari pembelajaran React dan Redux di Dicoding Academy.

Aplikasi ini memungkinkan pengguna untuk berdiskusi mengenai pendakian, berbagi pengalaman, bertanya, serta memberikan respons terhadap thread dan komentar pengguna lain.

Project ini juga menjadi sarana untuk menerapkan dan mendokumentasikan proses pembelajaran dalam membangun aplikasi React secara terstruktur, mulai dari pengelolaan state, komunikasi dengan REST API, authentication, hingga penerapan automated testing dan CI/CD.

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
- Neutralize vote
- Menampilkan jumlah vote
- Menampilkan leaderboard
- Filter thread berdasarkan kategori
- Akses menuju panduan mendaki

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

### UI & Development

- Lucide React
- ESLint
- Prettier
- Vitest
- Cypress

### CI/CD

- GitHub Actions
- Vercel

---

## Testing

AtapBumi menggunakan automated testing untuk menguji reducer, thunk, React component, dan end-to-end login flow.

### Unit & Component Tests

Menjalankan seluruh unit dan component tests:

```bash
npm test
```

Untuk menjalankan test sekali tanpa watch mode:

```bash
npm test -- --run
```

### End-to-End Test

Menjalankan Cypress E2E test:

```bash
npm run e2e
```

> E2E test mencakup alur login pengguna mulai dari pengisian credentials hingga sesi berhasil dipulihkan dan pengguna diarahkan ke halaman utama.

### Production Build

Untuk melakukan production build:

```bash
npm run build
```

---

## API

AtapBumi menggunakan Dicoding Forum API sebagai sumber data utama.

Base URL:

```text
https://forum-api.dicoding.dev/v1
```

---

## Deployment

AtapBumi dideploy menggunakan Vercel.

Production URL:

```text
https://atap-bumi.vercel.app
```

> CI menggunakan GitHub Actions untuk menjalankan automated tests dan build verification.

---

## Project Status

Project ini dibuat sebagai bagian dari submission pembelajaran React Web Developer Expert di Dicoding Academy, dengan fokus pada penerapan React, Redux, automated testing, CI, dan continuous deployment.
