export type StoryVariable =
  | 'child_name'
  | 'hair_color'
  | 'eye_color'
  | 'skin_tone'
  | 'favorite_color'
  | 'favorite_food'
  | 'favorite_animal'
  | 'favorite_toy'
  | 'age'

export type StoryPage = {
  text: string
  imagePrompt: string
  lesson?: string
}

export type StoryTemplate = {
  id?: string
  slug?: string
  title: string
  description?: string
  lesson?: string
  ageRange?: string
  category?: string
  pages: StoryPage[]
  variables: StoryVariable[]
}

export type PersonalizationContext = Partial<Record<StoryVariable, string>>

export type ResolvedStoryPage = {
  text: string
  imagePrompt: string
  lesson?: string
}

export type ResolvedStory = {
  title: string
  pages: ResolvedStoryPage[]
}
