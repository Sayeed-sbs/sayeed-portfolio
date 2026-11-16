
# Sayeed Bin Salim — Portfolio

My personal portfolio, built with Next.js, showcasing my web development projects, technical skills, education, and interests in full-stack development and AI automation.

**Live website:** [(https://sayeed-portfolio-iota.vercel.app/)]

## Tech Stack

- Next.js 16 (App Router)
- React 19
- JavaScript
- Tailwind CSS 4
- React Icons

## Features

- Responsive layout with a navy-blue and icy-blue theme
- Animated hero section with parallax effects and a moving text ticker
- Interactive skills grid with category filters and a technology spotlight
- Expandable education timeline
- Project cards with dedicated detail pages and screenshot galleries
- Scroll-triggered animations and interactive navigation
- Contact section with social profile links
- Downloadable resume

## Featured Projects

| Project | Description | Live Demo | Source Code |
| --- | --- | --- | --- |
| **FitLog** | Workout library and daily workout planner | [View site](https://fitlog-saitrox.vercel.app/) | [GitHub](https://github.com/Sayeed-sbs/fitlog) |
| **OmniHub** | Futuristic technology marketplace | [View site](https://omnihub-e-commerce-ruby.vercel.app/) | [GitHub](https://github.com/Sayeed-sbs/Omnihub_E-commerce-) |
| **DevStack** | Interactive tool for exploring and selecting a development stack | [View site](https://dev-stack-six-green.vercel.app/) | [GitHub](https://github.com/Sayeed-sbs/DevStack) |

## Getting Started

Requires Node.js 20.9 or later.

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

To create and test a production build:

```bash
npm run build
npm run start
```

## Project Structure

```text
public/
  images/           Portraits and other assets
  projects/         Project screenshots
src/
  app/              Homepage, project routes, and metadata
  components/       Reusable UI components
  data/             Profile and project information
  sections/         Portfolio sections
  styles/           Global and section-specific styles
```

## Customization

- Update your contact details and social links in `src/data/profile.js`.
- Edit project information and links in `src/data/projects.js`.
- Update academic details in `src/sections/Education.jsx`.
- Replace images in `public/images/` and `public/projects/`.
- Add your resume PDF to `public/` and ensure the download button points to the correct filename.

## Deployment

This project can be deployed on [Vercel](https://vercel.com/). Import the GitHub repository, select the **Next.js** framework preset, and deploy with the default settings.

## Author

**Sayeed Bin Salim**  
GitHub: [@Sayeed-sbs](https://github.com/Sayeed-sbs)
