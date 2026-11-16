# Sayeed Bin Salim — Portfolio

Next.js 16 App Router · React · JavaScript · Tailwind CSS 4

## Run locally

Requires Node.js 20.9 or later.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production

```bash
npm run build
npm run start
```

Deploy the repository to Vercel using its default Next.js preset. No rewrites or custom build configuration are required.

## Update your portfolio

- Social accounts, email and phone: `src/data/profile.js`
- Projects, live URLs and repositories: `src/data/projects.js`
- Education details: `src/sections/Education.jsx`
- Images: `public/images/` and `public/projects/`
- Styles and effects: `src/styles/`

The resume was intentionally omitted. The hero has a Contact button instead.

The original ZIP had incomplete social links and contact details. Add your real public contact information in `src/data/profile.js` when ready.

Project pages are generated from `src/data/projects.js` at `/projects/[slug]`.
