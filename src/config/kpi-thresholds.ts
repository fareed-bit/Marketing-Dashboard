export const kpiThresholds = {
  engagementRate: { warning: 2.0, critical: 1.0 },
  followerGrowthRate: { warning: 0.5, critical: 0 },
  creatorDormantDays: { warning: 14, critical: 21 },
  outreachFollowUpDays: { warning: 3, critical: 5 },
  briefOverdueDays: { warning: 1, critical: 3 },
  affiliateCodeExpiryDays: { warning: 7, critical: 3 },
  activationPrepareDays: { warning: 3, critical: 1 },
  conversionRate: { warning: 1.0, critical: 0.5 },
  responseTimeMinutes: { warning: 120, critical: 240 },
} as const;
