export const PIPELINE_STAGE_ORDER = [
  "sourced", "contacted", "responded", "approved", "onboarded",
  "gifted", "posted", "first_sale", "active", "inactive",
] as const;

export const TIER_RANGES = {
  nano: { min: 0, max: 10_000, label: "Nano (<10K)" },
  micro: { min: 10_000, max: 50_000, label: "Micro (10-50K)" },
  mid: { min: 50_000, max: 250_000, label: "Mid (50-250K)" },
  macro: { min: 250_000, max: 1_000_000, label: "Macro (250K-1M)" },
  mega: { min: 1_000_000, max: Infinity, label: "Mega (1M+)" },
} as const;

export const PLATFORM_LABELS = {
  instagram: "Instagram",
  tiktok: "TikTok",
  youtube: "YouTube",
  amazon: "Amazon",
} as const;

export const CONTENT_FORMAT_LABELS = {
  reel: "Reel",
  carousel: "Carousel",
  static: "Static Post",
  story: "Story",
  tiktok_video: "TikTok Video",
  live: "Live",
} as const;
