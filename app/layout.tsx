import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'StoryGarden — Children\'s Stories',
  description: 'Safe, cozy stories for kids to read or hear.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-gradient-to-b from-white to-sky-50 text-slate-900 antialiased dark:from-slate-900 dark:to-slate-950">
        <header className="sticky top-0 z-20 backdrop-blur bg-white/80 dark:bg-slate-900/70 border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-3">
            <Link href="/" className="flex items-center gap-3">
              <img src="/logo.svg" width={48} height={48} alt="StoryGarden logo" className="rounded-2xl shadow" />
              <div>
                <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">StoryGarden</h1>
                <p className="text-sm text-slate-600 dark:text-slate-300">Safe, cozy stories for kids</p>
              </div>
            </Link>
            <nav className="flex items-center gap-4 text-sm">
              <Link href="/ages/3-5" className="hover:underline">Ages 3–5</Link>
              <Link href="/ages/4-6" className="hover:underline">Ages 4–6</Link>
              <Link href="/ages/6-8" className="hover:underline">Ages 6–8</Link>
              <Link href="/about" className="hover:underline">About</Link>
              <Link href="/privacy" className="hover:underline">Privacy</Link>
              <Link href="/contact" className="hover:underline">Contact</Link>
            </nav>
          </div>
        </header>
        {children}
        <footer className="max-w-6xl mx-auto px-4 pb-10 pt-6 text-sm text-slate-600 dark:text-slate-300">
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 dark:border-slate-800 pt-4">
            <p>© {new Date().getFullYear()} StoryGarden. Built with ❤️ for kids and caregivers.</p>
            <div className="flex gap-4">
              <a href="/privacy" className="hover:underline">Privacy</a>
              <a href="/about" className="hover:underline">About</a>
              <a href="/contact" className="hover:underline">Contact</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
