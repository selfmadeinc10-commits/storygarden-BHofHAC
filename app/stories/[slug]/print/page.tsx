import { getStoryBySlug, getAllStorySlugs } from '@/lib/stories'

export function generateStaticParams() {
  return getAllStorySlugs().map(slug => ({ slug }))
}

export default function PrintStory({ params }: { params: { slug: string } }) {
  const s = getStoryBySlug(params.slug)
  return (
    <html lang="en">
      <head>
        <title>{s.title} — Print</title>
        <style dangerouslySetInnerHTML={{__html: `
          @page { margin: 18mm; }
          body { font-family: ui-serif, Georgia, serif; }
          h1 { font-size: 24pt; margin-bottom: 6mm; }
          .meta { color: #334155; margin-bottom: 6mm; }
          .content { font-size: 14pt; line-height: 1.7; white-space: pre-wrap; }
          @media screen { body { max-width: 720px; margin: 2rem auto; } }
        `}} />
      </head>
      <body>
        <h1>{s.title}</h1>
        <p className="meta">Age {s.ageRange} • {s.minutes} min • {s.tags.join(', ')}</p>
        <div className="content" dangerouslySetInnerHTML={{ __html: s.html }} />
      </body>
    </html>
  )
}
