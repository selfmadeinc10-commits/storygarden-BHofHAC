'use client'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'

type Story = {
  title: string
  slug: string
  ageRange: string
  minutes: number
  tags: string[]
  summary: string
  html: string
}

export default function StoryReader({ story }: { story: Story }) {
  const [fontSize, setFontSize] = useState(22)
  const [lineHeight, setLineHeight] = useState(1.7)
  const [speechOn, setSpeechOn] = useState(false)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    if (isDark) document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
  }, [isDark])

  const speak = () => {
    if (!('speechSynthesis' in window)) return alert("Read Aloud isn't supported in this browser.")
    window.speechSynthesis.cancel()
    const text = `${story.title}. ${stripHtml(story.html)}`
    const u = new SpeechSynthesisUtterance(text)
    u.rate = 0.95
    u.pitch = 1.05
    window.speechSynthesis.speak(u)
  }
  const stopSpeak = () => { if ('speechSynthesis' in window) window.speechSynthesis.cancel() }

  useEffect(() => () => stopSpeak(), [])

  const addFavorite = () => {
    try {
      const raw = localStorage.getItem('sg:favorites')
      const arr = raw ? JSON.parse(raw) : []
      const exists = arr.some((x: any) => x.slug === story.slug)
      const next = exists ? arr : [...arr, { slug: story.slug, title: story.title }]
      localStorage.setItem('sg:favorites', JSON.stringify(next))
      alert('Added to favorites!')
    } catch {}
  }

  return (
    <main className="max-w-3xl mx-auto p-4">
      <nav className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <Link href="/" className="px-3 py-2 rounded-xl border">Home</Link>
          <Link href={`/stories/${story.slug}/print`} className="px-3 py-2 rounded-xl border">🖨️ Print</Link>
          <button onClick={addFavorite} className="px-3 py-2 rounded-xl border">☆ Favorite</button>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setIsDark(v => !v)} className="px-3 py-2 rounded-xl border">{isDark ? 'Light' : 'Dark'} mode</button>
          <button onClick={() => setFontSize(f => Math.max(16, f - 2))} className="px-3 py-2 rounded-xl border" aria-label="Decrease text size">A−</button>
          <button onClick={() => setFontSize(f => Math.min(36, f + 2))} className="px-3 py-2 rounded-xl border" aria-label="Increase text size">A+</button>
          <button onClick={() => setLineHeight(l => Math.min(2.2, +(l + 0.1).toFixed(1)))} className="px-3 py-2 rounded-xl border" aria-label="Increase line spacing">↑↕</button>
          <button onClick={() => setLineHeight(l => Math.max(1.2, +(l - 0.1).toFixed(1)))} className="px-3 py-2 rounded-xl border" aria-label="Decrease line spacing">↓↕</button>
          {!speechOn ? (
            <button onClick={() => { setSpeechOn(true); speak(); }} className="px-3 py-2 rounded-xl border" aria-label="Read aloud">Read aloud</button>
          ) : (
            <button onClick={() => { setSpeechOn(false); stopSpeak(); }} className="px-3 py-2 rounded-xl border" aria-label="Stop reading">Stop</button>
          )}
        </div>
      </nav>

      <article>
        <h1 className="text-3xl font-extrabold mb-2">{story.title}</h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm mb-4">Age {story.ageRange} • {story.minutes} min • {story.tags.join(', ')}</p>
        <div className="prose dark:prose-invert max-w-none" style={{ fontSize: `${fontSize}px`, lineHeight }} dangerouslySetInnerHTML={{ __html: story.html }} />
      </article>
    </main>
  )
}

function stripHtml(html: string) {
  if (typeof window === 'undefined') return html
  const div = document.createElement('div')
  div.innerHTML = html
  return div.textContent || div.innerText || ''
}
