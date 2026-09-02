# AtapBumi — Design & Decision Document

> Living document / single source of truth for the AtapBumi project.
>
> Dokumen ini digunakan untuk mencatat arah produk, keputusan desain,
> architecture decision, constraint, dan perubahan penting selama
> pengerjaan submission Dicoding.
> Jika implementasi mulai menyimpang dari keputusan yang telah dikunci,
> gunakan dokumen ini sebagai acuan utama.

---

# 1. Project Overview

## Project Name

**AtapBumi**

## Project Type

Forum diskusi untuk pendaki.

## Project Context

AtapBumi merupakan aplikasi forum diskusi bertemakan pendakian yang
dibangun sebagai proyek submission Dicoding pada pembelajaran React
dengan Redux.

Aplikasi memanfaatkan Dicoding Forum API sebagai sumber data utama.

## Core Concept

AtapBumi menjadi ruang diskusi bagi pendaki untuk berbagi:

- informasi jalur pendakian
- pengalaman pendakian
- gear dan perlengkapan
- tips pendakian
- keselamatan
- basecamp dan simaksi
- cerita pendakian
- topik lain yang berkaitan dengan aktivitas pendakian

## Primary Goal

Membangun aplikasi React + Redux yang:

1. memenuhi seluruh requirement wajib submission Dicoding;
2. memiliki architecture yang jelas;
3. menerapkan state management menggunakan Redux;
4. memiliki UI yang konsisten dan mudah digunakan;
5. memiliki identitas visual AtapBumi tanpa over-engineering.

---

# 2. Project Principles

Prinsip utama selama development:

## 2.1 Requirement First

Requirement wajib submission menjadi prioritas tertinggi.

Fitur tambahan tidak boleh mengganggu penyelesaian requirement utama.

Prioritas:

P0 → Requirement wajib  
P1 → Saran Dicoding  
P2 → Visual enhancement / nice-to-have

---

## 2.2 Consistency First

AtapBumi harus memiliki visual, naming, component behavior,
dan architecture yang konsisten.

Komponen yang memiliki fungsi sama harus menggunakan pola yang sama.

Contoh:

- seluruh ThreadCard menggunakan struktur visual yang sama;
- seluruh button menggunakan design language yang sama;
- state loading memiliki pola yang konsisten;
- spacing dan typography tidak berubah-ubah tanpa alasan.

---

## 2.3 No Silent Changes

Keputusan yang sudah berstatus LOCKED tidak boleh diubah secara
diam-diam.

Jika ditemukan alasan teknis untuk mengubah keputusan yang sudah
dikunci:

1. identifikasi konflik;
2. jelaskan alasan;
3. ajukan alternatif;
4. minta approval;
5. baru ubah status decision.

---

## 2.4 Suggest → Review → Lock

Workflow pengambilan keputusan:

Assistant/Developer Suggestion
↓
Discussion
↓
User Approval / Rejection
↓
LOCKED Decision
↓
Implementation

Jika ditolak:

Rejected
↓
Alternative Options
↓
Discussion
↓
Approval
↓
LOCKED

---

# 3. Visual Direction

## Status

🔒 LOCKED

## Design Direction

**Modern Outdoor Community**

AtapBumi tidak dibuat sebagai website bertema gunung secara literal,
melainkan sebagai modern community/forum platform dengan identitas
visual outdoor.

Karakter visual:

- modern
- clean
- structured
- informative
- outdoor-inspired
- community-oriented
- slightly premium
- restrained

Tidak menggunakan dekorasi gunung secara berlebihan.

---

# 4. Visual Language

## Status

🔒 LOCKED

### Theme

Dark UI.

### Color Hierarchy

Primary layers:

- Dark Navy / Charcoal → application background
- Dark Blue-Gray → surface / card
- Warm Orange / Amber → primary accent
- White → primary text
- Gray / Muted Gray → secondary text

### Accent Usage

Orange / amber digunakan untuk:

- primary CTA
- active navigation
- selected category
- important numbers
- vote state
- important highlights

Orange tidak digunakan pada seluruh elemen secara berlebihan.

---

# 5. Main Layout

## Status

🔒 LOCKED

Desktop menggunakan layout tiga area utama:

```text
┌─────────────────────────────────────────────────────────────┐
│                         NAVBAR                              │
├───────────────┬─────────────────────────┬───────────────────┤
│               │                         │                   │
│   LEFT        │       MAIN CONTENT      │       RIGHT       │
│   SIDEBAR     │                         │      SIDEBAR      │
│               │                         │                   │
│ Categories    │ Create Thread           │ Leaderboard       │
│               │                         │                   │
│ Featured Peak │ Thread Filter           │ Camp Information  │
│               │                         │                   │
│               │ Thread List             │ Daily Tip         │
│               │                         │                   │
└───────────────┴─────────────────────────┴───────────────────┘
```
