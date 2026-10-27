<div align="center">

<img src="assets/header.svg" alt="Abdullah Hijazy — Full-Stack Software Architect &amp; SaaS Founder" width="100%">

<br><br>

<a href="https://tychalog.com"><img src="https://img.shields.io/badge/Website-tychalog.com-7C5CFF?style=for-the-badge&labelColor=0B1233" alt="Website: tychalog.com"></a>
<img src="https://img.shields.io/badge/Based_in-Germany-00D4FF?style=for-the-badge&labelColor=0B1233" alt="Based in Germany">
<img src="https://img.shields.io/badge/Markets-DACH_%C2%B7_MENA-7C5CFF?style=for-the-badge&labelColor=0B1233" alt="Markets: DACH and MENA">
<img src="https://img.shields.io/badge/Ships_in-EN_%C2%B7_DE_%C2%B7_AR-00D4FF?style=for-the-badge&labelColor=0B1233" alt="Ships in English, German and Arabic">

</div>

## About me

I architect and ship **multi-tenant SaaS platforms, visual editors and immersive web experiences** — from the data model and API contracts to the last pixel and the production server.

- **Founder & lead architect of Atlas** — a next-generation website builder and CMS.
- **Running [Tychalog](https://tychalog.com)** — software, web and growth for the German Mittelstand and the MENA market.
- **AI-native engineering** — Claude Code agents plan, build, review and integrate behind strict quality gates.
- **Trilingual by default** — English, German and Arabic with full right-to-left support, and German compliance (DSGVO, Impressum, BFSG) built in.
- **Focus** — contract-first architecture · security by design · performance budgets · 3D and motion on the web.

<img src="assets/divider.svg" width="100%" alt="">

## Atlas — flagship project

> **A next-generation website builder and CMS — open to developers, visual for designers, secure by architecture.**<br>
> Private · pre-launch · in development since February 2026; the current codebase was re-founded on Master Plan v1 in September 2026.

<table>
  <tr>
    <td align="center" width="20%"><h3>52</h3><sub>workspace packages</sub></td>
    <td align="center" width="20%"><h3>764k</h3><sub>lines of TypeScript</sub></td>
    <td align="center" width="20%"><h3>1,263</h3><sub>test files</sub></td>
    <td align="center" width="20%"><h3>375</h3><sub>decision records</sub></td>
    <td align="center" width="20%"><h3>975</h3><sub>commits since Sep 2026</sub></td>
  </tr>
</table>

<sub>Measured from the repository on 27 October 2026 — 5 apps + 47 packages · 1,075 unit, 176 end-to-end and 12 release-gate test files · 44 RFCs.</sub>

### What's inside

| Track | What it delivers |
|---|---|
| **Kernel** | Contract-first document model · fast op engine that applies and inverts ops with incremental validation · undo history · frozen, versioned contracts with a generated OpenAPI client |
| **Content** | Collections, entries and field editors · WordPress importer (content, media, redirects) · forms with spam defence and double opt-in · CRM contacts and pipelines |
| **Editor** | Visual canvas that hosts the real renderer · selection model, command bus and keymap · inspector controls for every style kind · rich text · RTL-safe design system |
| **Renderer** | React SSR with islands · deterministic atomic CSS compiled from style declarations · responsive image delivery · SEO: meta, sitemaps, hreflang, structured data |
| **Motion & 3D** | One timeline engine for DOM, 3D and variables · React Three Fiber scenes with quality tiers and fallbacks · glTF pipeline (meshopt, LODs, KTX2) · outliner, gizmos and material editor |
| **Platform** | Multi-tenant API · realtime multiplayer editing (presence, ordered op fan-out) · QuickJS plugin sandbox with capabilities, SDK and marketplace · publish, rollback and custom domains · billing · mail and campaigns · cookieless analytics · export as static zip or Vite + React project · `atlas` CLI for sites as code |

**Compliance built in:** Impressum, Datenschutz and BFSG generators with an imprint checker · DSGVO consent log · cookieless first-party analytics · passkey sign-in (WebAuthn).

<img src="assets/motion-3d.svg" alt="Motion and 3D in Atlas: a rotating wireframe cube, a spinning globe and an isometric stack of the Studio, API, Renderer and Data layers" width="100%">

### Architecture

```mermaid
flowchart LR
  subgraph Authoring
    ST["Studio · Vite + React SPA<br/>visual, CMS, motion and 3D editors"]
    CLI["atlas CLI<br/>sites as code"]
  end
  subgraph Core["Contract-first core"]
    CT["Contracts<br/>Zod schemas · frozen API"]
    OPS["Doc-ops engine<br/>apply · invert · undo"]
    AI["AI core<br/>model proposes op batches"]
  end
  subgraph Platform
    API["API · Hono + OpenAPI"]
    RT["Realtime<br/>presence · ordered op fan-out"]
    PH["Plugin host<br/>QuickJS sandbox · capabilities"]
    PUB["Publish<br/>snapshots · rollback · domains"]
  end
  subgraph Delivery
    RND["Renderer<br/>React SSR + islands"]
    MEDIA["Media · images · 3D pipeline"]
  end
  DB[("PostgreSQL<br/>Drizzle · pg-boss")]
  ST --> API
  ST <--> RT
  CLI --> API
  AI -.->|validated by| CT
  API --> OPS --> CT
  API --> PH
  API --> PUB --> RND
  MEDIA --> RND
  API --> DB
```

### How the codebase stays honest

- **Contracts first** — schemas are frozen and checked on every run; the typed API client and the developer docs are generated from them.
- **Architecture guards** — package boundaries, code ownership, licence policy, browser-safe imports, secret scanning, dangerous-API detection, single source of truth.
- **Security audits** — authentication, privilege escalation, XSS, cross-tenant leaks, load, backup and restore.
- **Release gates** — Playwright milestone gates, a 3D performance gate, Lighthouse budgets, visual regression and property-based tests.
- **Decisions on record** — 375 ADRs and 44 RFCs live next to the code.

<p>
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript">
<img src="https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB" alt="React">
<img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite">
<img src="https://img.shields.io/badge/TanStack-FF4154?style=flat-square&logo=reactquery&logoColor=white" alt="TanStack">
<img src="https://img.shields.io/badge/Hono-E36002?style=flat-square&logo=hono&logoColor=white" alt="Hono">
<img src="https://img.shields.io/badge/Zod-3E67B1?style=flat-square&logo=zod&logoColor=white" alt="Zod">
<img src="https://img.shields.io/badge/Drizzle-C5F74F?style=flat-square&logo=drizzle&logoColor=black" alt="Drizzle">
<img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white" alt="PostgreSQL">
<img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
<img src="https://img.shields.io/badge/Three.js-000000?style=flat-square&logo=threedotjs&logoColor=white" alt="Three.js">
<img src="https://img.shields.io/badge/Tiptap-1A1A1A?style=flat-square" alt="Tiptap">
<img src="https://img.shields.io/badge/Vitest-6E9F18?style=flat-square&logo=vitest&logoColor=white" alt="Vitest">
<img src="https://img.shields.io/badge/Playwright-2EAD33?style=flat-square" alt="Playwright">
<img src="https://img.shields.io/badge/Biome-60A5FA?style=flat-square&logo=biome&logoColor=white" alt="Biome">
<img src="https://img.shields.io/badge/pnpm-F69220?style=flat-square&logo=pnpm&logoColor=white" alt="pnpm">
</p>

<img src="assets/divider.svg" width="100%" alt="">

## Products & platforms

<table>
<tr>
<td width="50%" valign="top">

### [Tychalog](https://tychalog.com)
**The agency — and its production line.**

- **“A Cosmic Journey”** — a WebGL site with no conventional UI: information assembles from stardust across six worlds linked by folding portals.
- **Template production line** — 50+ sites for the German Mittelstand (Standard and Premium) on one shared config, UI kit and legal pack, with SEO and JSON-LD built in.
- **Internal platform** — team accounting and cross-site traffic analytics.

<img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white" alt="Next.js"> <img src="https://img.shields.io/badge/Three.js-000000?style=flat-square&logo=threedotjs&logoColor=white" alt="Three.js"> <img src="https://img.shields.io/badge/GSAP-88CE02?style=flat-square&logo=greensock&logoColor=black" alt="GSAP"> <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white" alt="Framer Motion"> <img src="https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white" alt="Prisma"> <img src="https://img.shields.io/badge/Stripe-635BFF?style=flat-square&logo=stripe&logoColor=white" alt="Stripe"> <img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white" alt="Docker">

</td>
<td width="50%" valign="top">

### [Zetix](https://zetix.de)
**The operating system for device-repair shops.**

- **Live repair board**, a public customer tracking portal and digital warranties (PDF + QR).
- **In-browser barcode and QR scanning**, maps, Stripe payments, S3 storage and bot protection.
- **DE / EN / AR** with full RTL · Android build · hardened production server with a dedicated backup server.

<img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white" alt="Next.js"> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript"> <img src="https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white" alt="Prisma"> <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white" alt="PostgreSQL"> <img src="https://img.shields.io/badge/Stripe-635BFF?style=flat-square&logo=stripe&logoColor=white" alt="Stripe"> <img src="https://img.shields.io/badge/Amazon_S3-569A31?style=flat-square&logo=amazons3&logoColor=white" alt="Amazon S3"> <img src="https://img.shields.io/badge/Kotlin-7F52FF?style=flat-square&logo=kotlin&logoColor=white" alt="Kotlin">

</td>
</tr>
<tr>
<td width="50%" valign="top">

### [PhoneX](https://phonexstore.de)
**Headless e-commerce on Medusa 2.**

- **Storefront and owner panel** compiled into single HTML files from several design sources.
- **Python wiring** swaps hard-coded data for live API calls without touching the design.
- **Reproducible rebuild and redeploy tooling** for the shop and its API.

<img src="https://img.shields.io/badge/Medusa-000000?style=flat-square&logo=medusa&logoColor=white" alt="Medusa"> <img src="https://img.shields.io/badge/Node.js-5FA04E?style=flat-square&logo=nodedotjs&logoColor=white" alt="Node.js"> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript"> <img src="https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white" alt="Python"> <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white" alt="PostgreSQL"> <img src="https://img.shields.io/badge/Shell-4EAA25?style=flat-square&logo=gnubash&logoColor=white" alt="Shell">

</td>
<td width="50%" valign="top">

### [Handyteile Premium](https://handytp.de)
**B2B wholesale for phone parts, accessories and tools.**

- **Business-only access** — prices, stock and cart unlock only after the owner approves the account.
- **Owner control panel** in DE / EN / AR with team logins and supplier catalogue import.
- **Medusa 2 backend** · static storefront and panel with no build step · Docker locally, pm2 + nginx in production.

<img src="https://img.shields.io/badge/Medusa-000000?style=flat-square&logo=medusa&logoColor=white" alt="Medusa"> <img src="https://img.shields.io/badge/Node.js-5FA04E?style=flat-square&logo=nodedotjs&logoColor=white" alt="Node.js"> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript"> <img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white" alt="Docker"> <img src="https://img.shields.io/badge/nginx-009639?style=flat-square&logo=nginx&logoColor=white" alt="nginx"> <img src="https://img.shields.io/badge/PM2-2B037A?style=flat-square&logo=pm2&logoColor=white" alt="PM2">

</td>
</tr>
</table>

<img src="assets/divider.svg" width="100%" alt="">

## Tech stack

<table>
<tr>
<td width="150"><b>Languages</b></td>
<td><img src="https://skillicons.dev/icons?i=ts,js,html,css,py,dart,kotlin,postgres,bash&theme=dark" height="40" alt="TypeScript, JavaScript, HTML, CSS, Python, Dart, Kotlin, SQL, Bash"></td>
</tr>
<tr>
<td><b>Frontend</b></td>
<td><img src="https://skillicons.dev/icons?i=react,nextjs,vite,tailwind&theme=dark" height="40" alt="React, Next.js, Vite, Tailwind CSS"><br>
<img src="https://img.shields.io/badge/TanStack-FF4154?style=flat-square&logo=reactquery&logoColor=white" alt="TanStack"> <img src="https://img.shields.io/badge/shadcn/ui-000000?style=flat-square&logo=shadcnui&logoColor=white" alt="shadcn/ui"> <img src="https://img.shields.io/badge/Tiptap-1A1A1A?style=flat-square" alt="Tiptap"> <img src="https://img.shields.io/badge/Zustand-443E38?style=flat-square" alt="Zustand"></td>
</tr>
<tr>
<td><b>3D & motion</b></td>
<td><img src="https://skillicons.dev/icons?i=threejs,blender&theme=dark" height="40" alt="Three.js, Blender"><br>
<img src="https://img.shields.io/badge/React_Three_Fiber-000000?style=flat-square&logo=threedotjs&logoColor=white" alt="React Three Fiber"> <img src="https://img.shields.io/badge/glTF-87C540?style=flat-square" alt="glTF"> <img src="https://img.shields.io/badge/GSAP-88CE02?style=flat-square&logo=greensock&logoColor=black" alt="GSAP"> <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white" alt="Framer Motion"> <img src="https://img.shields.io/badge/Lenis-111111?style=flat-square" alt="Lenis"></td>
</tr>
<tr>
<td><b>Backend & data</b></td>
<td><img src="https://skillicons.dev/icons?i=nodejs,postgres,prisma,sqlite&theme=dark" height="40" alt="Node.js, PostgreSQL, Prisma, SQLite"><br>
<img src="https://img.shields.io/badge/Hono-E36002?style=flat-square&logo=hono&logoColor=white" alt="Hono"> <img src="https://img.shields.io/badge/Drizzle-C5F74F?style=flat-square&logo=drizzle&logoColor=black" alt="Drizzle"> <img src="https://img.shields.io/badge/Zod-3E67B1?style=flat-square&logo=zod&logoColor=white" alt="Zod"> <img src="https://img.shields.io/badge/Medusa-000000?style=flat-square&logo=medusa&logoColor=white" alt="Medusa"> <img src="https://img.shields.io/badge/Stripe-635BFF?style=flat-square&logo=stripe&logoColor=white" alt="Stripe"> <img src="https://img.shields.io/badge/WebSockets-010101?style=flat-square" alt="WebSockets"></td>
</tr>
<tr>
<td><b>Mobile & desktop</b></td>
<td><img src="https://skillicons.dev/icons?i=flutter,androidstudio,electron&theme=dark" height="40" alt="Flutter, Android Studio, Electron"></td>
</tr>
<tr>
<td><b>DevOps & cloud</b></td>
<td><img src="https://skillicons.dev/icons?i=docker,linux,nginx,cloudflare,aws,vercel,git,github&theme=dark" height="40" alt="Docker, Linux, nginx, Cloudflare, AWS, Vercel, Git, GitHub"><br>
<img src="https://img.shields.io/badge/PM2-2B037A?style=flat-square&logo=pm2&logoColor=white" alt="PM2"></td>
</tr>
<tr>
<td><b>Testing & quality</b></td>
<td><img src="https://skillicons.dev/icons?i=vitest&theme=dark" height="40" alt="Vitest"><br>
<img src="https://img.shields.io/badge/Playwright-2EAD33?style=flat-square" alt="Playwright"> <img src="https://img.shields.io/badge/Testing_Library-E33332?style=flat-square&logo=testinglibrary&logoColor=white" alt="Testing Library"> <img src="https://img.shields.io/badge/fast--check-2B2B2B?style=flat-square" alt="fast-check"> <img src="https://img.shields.io/badge/Lighthouse-F44B21?style=flat-square&logo=lighthouse&logoColor=white" alt="Lighthouse"> <img src="https://img.shields.io/badge/Biome-60A5FA?style=flat-square&logo=biome&logoColor=white" alt="Biome"></td>
</tr>
<tr>
<td><b>AI</b></td>
<td><img src="https://img.shields.io/badge/Claude_Code-D97757?style=flat-square&logo=claude&logoColor=white" alt="Claude Code"> <img src="https://img.shields.io/badge/MCP-111111?style=flat-square" alt="Model Context Protocol"> <img src="https://img.shields.io/badge/Vercel_AI_Gateway-000000?style=flat-square&logo=vercel&logoColor=white" alt="Vercel AI Gateway"> <img src="https://img.shields.io/badge/ElevenLabs-000000?style=flat-square&logo=elevenlabs&logoColor=white" alt="ElevenLabs"></td>
</tr>
</table>

<img src="assets/languages.svg" alt="Language footprint: TypeScript 68.2%, HTML 23.2%, JavaScript 4.5%, CSS 1.4%, Dart 1.2%, Python 0.8%, PL/pgSQL 0.5%" width="100%">

<img src="assets/divider.svg" width="100%" alt="">

## How I build — AI-native engineering

Claude Code is part of my toolchain from the first plan to the last deploy:

- **Plan** — a master plan, RFCs and task briefs with explicit contracts before any code is written.
- **Build** — parallel agents work in isolated git worktrees, each inside a clear ownership boundary.
- **Review** — independent reviewers check every change against the brief and the contracts.
- **Gate & integrate** — types, lint, tests and architecture guards must pass before anything reaches `main`.
- **Operate** — the same workflow covers audits, server hardening, backups, migrations and documentation.

<img src="assets/pipeline.svg" alt="Delivery pipeline: plan, build, review, quality gates, integrate; a change that fails the gates loops back to build" width="100%">

<img src="assets/divider.svg" width="100%" alt="">

## Activity

<p align="center">
  <img src="https://streak-stats.demolab.com?user=ovopro3223&background=0B1233&stroke=1F2A5A&ring=7C5CFF&fire=00D4FF&currStreakNum=FFFFFF&sideNums=FFFFFF&currStreakLabel=B9C6FF&sideLabels=A9B4D8&dates=6B7699&hide_border=true&border_radius=16" alt="GitHub contribution streak">
</p>

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/ovopro3223/ovopro3223/output/github-snake-dark.svg">
    <img alt="Contribution graph animation" src="https://raw.githubusercontent.com/ovopro3223/ovopro3223/output/github-snake.svg" width="100%">
  </picture>
</p>

<p align="center"><sub>Most of my work lives in private repositories — the graph counts those contributions too.</sub></p>

<img src="assets/divider.svg" width="100%" alt="">

<details>
<summary><b>نبذة بالعربية</b></summary>
<br>
<div dir="rtl">

مهندس برمجيات Full-Stack ومؤسس منصات SaaS، مقيم في ألمانيا.

- أبني **Atlas**: منصة من الجيل الجديد لبناء المواقع وإدارة المحتوى — مفتوحة للمبرمجين، مرئية للمصممين، وآمنة بالبنية.
- أدير **Tychalog** لخدمة الشركات الألمانية المتوسطة (Mittelstand) والسوق العربي: برمجيات ومواقع ونمو.
- منتجاتي ثلاثية اللغة (العربية والألمانية والإنجليزية) مع دعم كامل للكتابة من اليمين إلى اليسار، ومتوافقة مع المتطلبات القانونية الألمانية.
- أعمل بأسلوب هندسي مدعوم بالذكاء الاصطناعي (Claude Code): تخطيط، تنفيذ متوازٍ، مراجعة مستقلة، وبوابات جودة على كل تغيير.

</div>
</details>

<details>
<summary><b>Kurzprofil auf Deutsch</b></summary>
<br>

Full-Stack Software Architect und SaaS-Gründer mit Sitz in Deutschland.

- Ich entwickle **Atlas** – eine Website-Builder- und CMS-Plattform der nächsten Generation: offen für Entwickler, visuell für Designer, sicher durch Architektur.
- Mit **Tychalog** realisiere ich Software, Websites und Wachstum für den deutschen Mittelstand und den MENA-Markt.
- Meine Produkte sind dreisprachig (Deutsch, Englisch, Arabisch inkl. RTL) – mit DSGVO, Impressum, Datenschutz und BFSG von Anfang an.
- KI-gestützter Entwicklungsprozess mit Claude Code: Planung, parallele Umsetzung, unabhängige Reviews und Quality Gates bei jeder Änderung.

</details>

<div align="center">
<br>
<b>Building something ambitious? Let's talk — <a href="https://tychalog.com">tychalog.com</a></b>
</div>
