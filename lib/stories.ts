import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { marked } from 'marked'

export type StoryMeta = {
  title: string
  slug: string
  ageRange: string
  minutes: number
  tags: string[]
  summary: string
}
export type Story = StoryMeta & { html: string }

const CONTENT_DIR = path.join(process.cwd(), 'content', 'stories')

export function getAllStorySlugs(): string[] {
  const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.md'))
  return files.map(f => f.replace(/\.md$/, ''))
}

export function getStoryBySlug(slug: string): Story {
  const file = path.join(CONTENT_DIR, `${slug}.md`)
  const raw = fs.readFileSync(file, 'utf-8')
  const { data, content } = matter(raw)
  const html = marked.parse(content)
  const meta = {
    title: data.title as string,
    slug: data.slug as string,
    ageRange: data.ageRange as string,
    minutes: Number(data.minutes),
    tags: (data.tags || []) as string[],
    summary: data.summary as string,
  }
  return { ...meta, html }
}

export function getAllStories(): StoryMeta[] {
  const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.md'))
  return files.map(f => {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, f), 'utf-8')
    const { data } = matter(raw)
    return {
      title: data.title as string,
      slug: data.slug as string,
      ageRange: data.ageRange as string,
      minutes: Number(data.minutes),
      tags: (data.tags || []) as string[],
      summary: data.summary as string,
    }
  }).sort((a, b) => a.title.localeCompare(b.title))
}
