import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#071329] px-6 text-center text-white">
      <p className="mb-5 text-xs uppercase tracking-[0.2em] text-[#91adff]">404 / Not found</p>
      <h1 className="text-5xl font-medium tracking-tight">Page not found.</h1>
      <Link href="/#projects" className="mt-10 rounded-full bg-[#455ce9] px-7 py-4 transition-colors hover:bg-[#3146d8]">Back to Projects ↗</Link>
    </main>
  );
}
