import { getAllStories } from '@/lib/stories'
import Link from 'next/link'

export function generateStaticParams() {
  return [{ age: '3-5' }, { age: '4-6' }, { age: '6-8' }]
}

export default function AgePage({ params }: { params: { age: string } }) {
  const stories = getAllStories().filter(s => s.ageRange === params.age)
  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Age {params.age}</h1>
      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stories.map(s => (
          <article key={s.slug} className="group rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition overflow-hidden">
            <div className="p-4">
              <h3 className="font-extrabold text-lg text-slate-900 dark:text-white group-hover:underline">
                <Link href={`/stories/${s.slug}`}>{s.title}</Link>
              </h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Age {s.ageRange} • {s.minutes} min • {s.tags.join(', ')}</p>
              <p className="mt-2 text-slate-700 dark:text-slate-200 line-clamp-3">{s.summary}</p>
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}
