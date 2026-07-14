// Analytics providers will be wired in a future milestone.
export const analyticsProviders = {
  ga4: process.env.NEXT_PUBLIC_GA4_ID,
  clarity: process.env.NEXT_PUBLIC_CLARITY_ID,
  posthog: process.env.NEXT_PUBLIC_POSTHOG_KEY,
} as const
