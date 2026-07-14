import type {
  PersonalizationContext,
  ResolvedStory,
  StoryTemplate,
} from '@/types/story-engine'

const VARIABLE_PATTERN = /\{\{(\w+)\}\}/g

export function resolveTemplateString(
  template: string,
  context: PersonalizationContext
): string {
  return template.replace(VARIABLE_PATTERN, (_, key: string) => {
    return context[key as keyof PersonalizationContext] ?? `{{${key}}}`
  })
}

export function resolveStoryTemplate(
  story: StoryTemplate,
  context: PersonalizationContext
): ResolvedStory {
  return {
    title: resolveTemplateString(story.title, context),
    pages: story.pages.map((page) => ({
      text: resolveTemplateString(page.text, context),
      imagePrompt: resolveTemplateString(page.imagePrompt, context),
      lesson: page.lesson,
    })),
  }
}

export const sampleStoryTemplate: StoryTemplate = {
  title: 'The Brave Little Explorer',
  description: 'A magical forest adventure about courage and curiosity.',
  lesson: 'Bravery',
  ageRange: '3-7',
  category: 'Adventure',
  pages: [
    {
      text: '{{child_name}} packed a tiny backpack and stepped into the enchanted forest.',
      imagePrompt:
        'A smiling child with {{hair_color}} hair exploring a magical forest with glowing flowers.',
      lesson: 'Bravery',
    },
    {
      text: 'A gentle {{favorite_animal}} appeared beside {{child_name}}, ready for adventure.',
      imagePrompt:
        'A child with {{hair_color}} hair walking beside a friendly {{favorite_animal}} under golden trees.',
      lesson: 'Friendship',
    },
  ],
  variables: ['child_name', 'hair_color', 'favorite_animal'],
}
