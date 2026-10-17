# Сем. Божилови | Алекс и София Божилови ♡ Сватбена галерия
> Official Wedding Gallery & Memories Web Application for Alex & Sofia Bozhilovi (Family Bozhilovi) — October 16, 2026.

[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

---

## 🇬🇧 English Description

### Overview
This project is an elegant, modern, and mobile-friendly wedding gallery and memories web application created especially for **Family Bozhilovi (Alex & Sofia Bozhilovi)**. Designed with luxury wedding aesthetics (ivory, gold, champagne, and sage tones), it brings together photos, timelines, and heartfelt messages from the wedding day (October 16, 2026 at Vila Ekaterina & Saint Peter and Paul Monastery, Lozen).

### Key Features
1. **Live Marriage Timer (Таймер)**:
   - Tracks the exact elapsed time (days, hours, minutes, seconds) since the sacred church ceremony vows on **October 16, 2026 at 15:30 EEST**.
   - Live ticker with real-time second updates and calculated milestone statistics (heartbeats, shared moments).
2. **Guest Photos Gallery (Снимки от гостите)**:
   - 40 genuine guest photos captured during the celebration.
   - Table filtering chips (Table 1, Table 2, Table 3, Table 5, Table 6, Table 8, Table 9).
   - Pagination: loads 12 photos initially, with a "Load more" button (`+12` per click).
   - Fullscreen responsive Lightbox with download button, image counter, and keyboard shortcuts (`Esc`, `←`, `→`).
   - Resilient image loading (automatically hides any missing files).
3. **Official Wedding Photos (Снимки от сватбата)**:
   - Dedicated section for official photographer shots.
   - Luxury "Coming Soon" empty state with camera animation and photographer progress badge.
   - Automatic image loader from `public/wedding_img/`.
4. **Wedding Invitation Retrospective (Нека си припомним поканата)**:
   - Digital reproduction of the original wedding invitation card with custom Ariston calligraphy.
   - Integrated ambient wedding video player with play/pause and mute/unmute toggles.
   - Step-by-step wedding day program timeline (Groom preparation, Kumove, Bride pickup, Church wedding, Welcome cocktail, Outdoor ceremony, Photos, Gala dinner).
5. **Guest Wishes & Guestbook (Нашите пожелания)**:
   - Extracted from real wedding RSVP submissions.
   - Categorized by:
     - **All wishes (Пожелания)**
     - **Attending guests (Присъствали)**
     - **Celebrating in spirit (Бяха с нас духом)** — touching messages from loved ones who could not attend in person.
   - Search bar by guest name or keywords.
   - Pagination: loads 9 wishes initially with a "Load more" button (`+9` per click).
6. **Footer Attribution**:
   - Built by **[PVidev Dev.](https://pvidev.dev)** specially for **Family Bozhilovi | Alex & Sofia Bozhilovi ❤️**.

### Tech Stack
- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: Vanilla CSS with CSS custom properties (luxury wedding design system, glassmorphism, responsive grid)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Fonts**: Custom `Ariston` calligraphy font, `Cormorant Garamond`, `Montserrat`, `Great Vibes`

### Quick Start & Development

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Synchronize new photos (if you add/remove files from public/guest_img or public/wedding_img)
npm run update-photos

# 4. Build for production (optional, Vercel builds automatically)
npm run build
```

### Deploying to Vercel
1. Push this repository to GitHub.
2. Go to [Vercel](https://vercel.com/) -> **Add New Project** -> Import your GitHub repository.
3. Keep default settings:
   - Framework Preset: **Vite**
   - Root Directory: `./` (or `bojilovi`)
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Click **Deploy**. Your wedding gallery will be live at `https://your-project.vercel.app`!

---

## 🇧🇬 Описание на Български

### Общ преглед
Този проект е официална, луксозна и напълно адаптивна (mobile-friendly) сватбена галерия и уеб страница със спомени, създадена специално за **Сем. Божилови (Алекс и София Божилови)**. Дизайнът следва елегантна сватбена естетика (топли тонове на слонова кост, шампанско, злато и маслено зелено) и събира на едно място спомените от 16 октомври 2026 г. (Вила Екатерина, Вакарел и Лозенски манастир „Св. Апостоли Петър и Павел“).

### Основни раздели и функционалности
1. **Таймер на брака (От колко време сме женени)**:
   - Отброява в реално време изминалите дни, часове, минути и секунди от момента на църковния брак (**16 октомври 2026 г., 15:30 ч.**).
   - Романтична статистика за споделените мигове и удари на сърцето.
2. **Снимки от гостите (40 снимки)**:
   - Всички спонтанни кадри от камерите на гостите, разпределени по маси (Маса 1, 2, 3, 5, 6, 8, 9).
   - Пагинация: първоначално зарежда 12 снимки с бутон **„Покажи още снимки“** (`+12` при всяко кликване).
   - Интерактивен Lightbox на цял екран с бутон за сваляне на оригинала, навигация с мишка и клавиатура (`Esc`, `←`, `→`).
   - Защита от липсващи файлове (ако снимка бъде изтрита от папката, тя автоматично се скрива без празни полета).
3. **Снимки от сватбата (Официални кадри)**:
   - Луксозна карта **„Очаквайте скоро!“** с камера и анимация, информираща гостите, че фотографът обработва кадрите.
   - Готова автоматична интеграция – веднага щом в `public/wedding_img/` бъдат качени снимки, те се зареждат в галерията.
4. **Нека си припомним поканата**:
   - Дигитален спомен за оригиналната покана с красив калиграфски шрифт Ariston.
   - Вграден сватбен видео плейър с контрол на звука и пауза/плей.
   - Пълна хронология на празничния ден (Взимане на младоженеца, кумовете, булката, църковен брак, коктейл, церемония, снимки и вечеря).
5. **Нашите пожелания**:
   - Всички реални пожелания от RSVP системата на гостите.
   - Филтри по:
     - **Пожелания (41)**
     - **Присъствали (37)**
     - **Бяха с нас духом (4)** — трогателни послания от близки, които не успяха да присъстват лично.
   - Търсачка по име на гост или ключова дума.
   - Пагинация: зарежда по 9 пожелания с бутон **„Покажи още пожелания“**.
6. **Футър**:
   - Задължително авторско посвещение: **Създаден от [PVidev Dev.](https://pvidev.dev) Специално за сем. Божилови | Алекс и София Божилови ❤️**.

### Стартиране и разработка

```bash
# Инсталиране на пакетите
npm install

# Стартиране на локалния сървър за преглед
npm run dev

# Синхронизиране на снимки при добавяне/изтриване на файлове в public/guest_img или public/wedding_img
npm run update-photos
```

### Качване във Vercel
1. Инициализирайте git хранилище и го качете в GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Bozhilovi wedding gallery"
   git branch -M main
   git remote add origin <URL-към-вашето-GitHub-хранилище>
   git push -u origin main
   ```
2. Влезте във [Vercel](https://vercel.com/) и натиснете **Add New Project**.
3. Изберете хранилището от GitHub — Vercel автоматично разпознава Vite и настроения `vercel.json`.
4. Натиснете **Deploy**.
