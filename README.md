<div align="center">

# 🧾 OnlyResume

**Build a professional, ATS-friendly resume in minutes.**
*100% free · No login · Privacy-first · Instant PDF download*

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#contributing)

[Live Demo](#) · [Report Bug](https://github.com/ashrafulalamasad/onlyresume/issues) · [Request Feature](https://github.com/ashrafulalamasad/onlyresume/issues)

</div>

---

## ✨ Why OnlyResume?

Most resume builders lock your data behind an account, charge you to download a PDF, or quietly harvest your information. **OnlyResume does none of that.**

| | |
|---|---|
| 🆓 **Free Forever** | No paywalls, no premium tiers, no credit card. |
| 🔓 **No Login** | Open the builder and start writing immediately. |
| 🔒 **Private by Design** | All data lives in your browser's `localStorage`. Nothing is sent to a server, ever. |
| 👁️ **Live Preview** | See your resume update in real time as you type. |
| 📥 **Instant PDF Export** | Download a polished, ATS-friendly PDF when you're done. |
| 🎨 **Modern Templates** | A growing library of clean, recruiter-friendly designs. |
| ⚡ **Fast & Lightweight** | Built on Next.js — instant load, zero bloat. |

---

## 🚀 Features

- **Real-time editor & preview** — bidirectional updates with zero lag.
- **Autosaved drafts** — stored locally; close the tab and pick up right where you left off.
- **ATS-optimized templates** — designed to pass automated resume screeners.
- **Multiple templates** — Modern, Minimal, Corporate, Academic, Creative, and more.
- **One-click PDF export** — powered by [`@react-pdf/renderer`](https://react-pdf.org/).
- **Keyboard-friendly** — fully usable without a mouse.
- **Responsive** — works beautifully on desktop, tablet, and mobile.
- **SEO-optimized** — built with the Next.js App Router and best practices.

---

## 🛠️ Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| UI Library | [React 19](https://react.dev/) |
| Language | [TypeScript 5](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com/) |
| PDF Engine | [`@react-pdf/renderer`](https://react-pdf.org/) |
| Analytics | [Vercel Analytics](https://vercel.com/analytics) & [Speed Insights](https://vercel.com/docs/speed-insights) |
| Linting | [ESLint 9](https://eslint.org/) + `eslint-config-next` |

---

## 📦 Installation

### Prerequisites

- **Node.js** 18+ (LTS recommended)
- **npm**, **yarn**, **pnpm**, or **bun**

### Clone & Install

```bash
git clone https://github.com/ashrafulalamasad/onlyresume.git
cd onlyresume
npm install
```

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to start building.

### Build for production

```bash
npm run build
npm start
```

---

## 📜 Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server on port 3000 |
| `npm run dev:local` | Start the dev server bound to `localhost` only |
| `npm run build` | Create a production build |
| `npm start` | Serve the production build |
| `npm run lint` | Lint the codebase with ESLint |

---

## 📂 Project Structure

```
onlyresume/
├── app/                                  # Next.js App Router
│   ├── about/                            # About page
│   ├── builder/                          # Resume builder (editor + live preview)
│   │   ├── pdf/                          # PDF generation pipeline
│   │   └── templates/                    # React preview templates (19 designs)
│   ├── components/                       # Shared UI components
│   ├── faq/                              # FAQ page
│   ├── guide/                            # Resume writing guide
│   ├── privacy/                          # Privacy policy
│   ├── templates/                        # Templates showcase page
│   └── terms/                            # Terms of service
├── public/                               # Static assets
├── eslint.config.mjs                     # ESLint configuration
├── next.config.ts                        # Next.js configuration
├── package.json
├── postcss.config.mjs                    # PostCSS configuration
└── tsconfig.json                         # TypeScript configuration
```

---

## 🧠 How It Works

1. **Navigate to the builder** — open `/builder` from the landing page.
2. **Fill in your details** — personal info, summary, experience, education, skills, projects, and more.
3. **Watch the live preview** — the canvas updates instantly on every keystroke.
4. **Pick a template** — switch between designs without losing data.
5. **Export as PDF** — click download and receive a clean, print-ready file.

Your progress is automatically persisted to `localStorage`, so you can close the tab, walk away, and resume later. If you want to wipe your data, clear your browser storage — it's gone, with no trace on any server.

---

## 🔒 Privacy & Data

OnlyResume is built on a simple principle: **your resume is your business.**

- ✅ All form data is stored in your browser's `localStorage`.
- ✅ No analytics tied to the content of your resume.
- ✅ No accounts, no cookies for tracking, no fingerprinting.
- ✅ No server-side processing of personal data whatsoever.

See [Privacy Policy](app/privacy/) for the full details.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome.

1. **Fork** the repository.
2. **Create** your feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m "feat: add amazing feature"`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request.

Please make sure to lint before submitting:

```bash
npm run lint
```

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for the full text.

---

## 🙏 Acknowledgments

- Built with the incredible [Next.js](https://nextjs.org/) framework.
- PDF generation powered by [`@react-pdf/renderer`](https://react-pdf.org/).
- Inspired by the belief that professional tools should be **free, open, and private**.

---

<div align="center">

**Made with care by [ashrafulalamasad](https://github.com/ashrafulalamasad)**

⭐ Star this repo if you find it useful!

</div>
