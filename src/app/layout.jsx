
import "../styles/globals.css";
import "../styles/about.css";
import "../styles/skills.css";
import "../styles/education.css";
import "../styles/projects.css";
import "../styles/contact.css";
import "../styles/responsive.css";

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: "Sayeed Bin Salim | Full-Stack Web Developer",
  description:
    "Portfolio of Sayeed Bin Salim, a full-stack web developer and AI automation enthusiast. Explore projects, skills, and education.",
  keywords: [
    "Sayeed Bin Salim",
    "Full-Stack Developer",
    "React",
    "Next.js",
    "Portfolio",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
