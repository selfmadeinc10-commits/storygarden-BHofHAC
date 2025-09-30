'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

type Fav = { slug: string, title: string }

export default function Favorites() {
  const [favs, setFavs] = useState<Fav[]>([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem('sg:favorites')
      if (raw) setFavs(JSON.parse(raw))
    } catch {}
  }, [])

  if (!favs.length) return null

  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold mb-2">Favorites</h2>
      <div className="flex flex-wrap gap-2">
        {favs.map(f => (
          <Link key={f.slug} href={`/stories/${f.slug}`} className="px-3 py-2 rounded-xl text-sm border border-slate-300 dark:border-slate-700">
            {f.title}
          </Link>
        ))}
      </div>
    </section>
  )
}
