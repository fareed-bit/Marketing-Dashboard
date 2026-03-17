export function calcEngagementRate(likes: number, comments: number, shares: number, saves: number, reach: number): number {
  if (reach === 0) return 0;
  return ((likes + comments + shares + saves) / reach) * 100;
}

export function calcConversionRate(orders: number, clicks: number): number {
  if (clicks === 0) return 0;
  return (orders / clicks) * 100;
}

export function calcROI(revenue: number, cost: number): number {
  if (cost === 0) return 0;
  return ((revenue - cost) / cost) * 100;
}

export function calcCPA(cost: number, conversions: number): number {
  if (conversions === 0) return 0;
  return cost / conversions;
}
