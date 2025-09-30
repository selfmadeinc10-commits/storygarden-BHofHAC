import { getAllStorySlugs, getStoryBySlug } from '@/lib/stories'
import StoryReader from '@/components/story-reader'

export function generateStaticParams() {
  return getAllStorySlugs().map(slug => ({ slug }))
}

export default function StoryPage({ params }: { params: { slug: string } }) {
  const story = getStoryBySlug(params.slug)
  return <StoryReader story={story} />
}
