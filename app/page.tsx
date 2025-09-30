import { getAllStories } from '@/lib/stories'
import Link from 'next/link'
import Favorites from '@/components/favorites'

export const dynamic = 'force-static'

export default async function Page() {
  const stories = getAllStories()
  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <section className="mb-8 grid md:grid-cols-2 gap-6 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white leading-tight">
            Handpicked short stories kids can read or hear.
          </h2>
          <p className="mt-3 text-slate-700 dark:text-slate-300">
            Browse by age, theme, or reading time. Built-in Read Aloud and a comfy reader mode.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              { label: 'All ages', href: '/' },
              { label: '3–5', href: '/ages/3-5' },
              { label: '4–6', href: '/ages/4-6' },
              { label: '6–8', href: '/ages/6-8' }
            ].map(o => (
              <Link key={o.href} href={o.href} className="px-3 py-2 rounded-2xl text-sm border transition shadow-sm hover:shadow bg-white/70 dark:bg-slate-800/70 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700">
                {o.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="bg-white/80 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 shadow">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Quick tip</label>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Click a story, then use “Read Aloud,” text size, and line spacing controls. Use the printer icon to make a PDF.</p>
        </div>
      </section>

      <Favorites />

      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stories.map(s => (
          <article key={s.slug} className="group rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition overflow-hidden">
            <div className="p-4">
              <h3 className="font-extrabold text-lg text-slate-900 dark:text-white group-hover:underline">
                <Link href={`/stories/${s.slug}`}>{s.title}</Link>
              </h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Age {s.ageRange} • {s.minutes} min • {s.tags.join(', ')}</p>
              <p className="mt-2 text-slate-700 dark:text-slate-200 line-clamp-3">{s.summary}</p>
              <div className="mt-4 flex items-center gap-2">
                <Link href={`/stories/${s.slug}`} className="px-3 py-2 rounded-xl text-sm font-semibold bg-brand-600 text-white shadow hover:shadow-md">Read</Link>
                <Link href={`/stories/${s.slug}/print`} className="px-3 py-2 rounded-xl text-sm border border-slate-300 dark:border-slate-700">Print</Link>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}
