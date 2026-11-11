import { ThumbnailProject, ThumbnailCategory } from '../types/portfolio';

/**
 * Filter thumbnails by category tag
 */
export function filterThumbnails(
  thumbnails: ThumbnailProject[],
  activeCategory: ThumbnailCategory
): ThumbnailProject[] {
  if (activeCategory === 'todos') {
    return thumbnails;
  }
  return thumbnails.filter((item) => item.category === activeCategory);
}

/**
 * Calculates percentage CTR increase between before and after
 */
export function calculateCtrGain(beforeCtr: number, afterCtr: number): number {
  if (beforeCtr <= 0) return 0;
  const gain = ((afterCtr - beforeCtr) / beforeCtr) * 100;
  return Math.round(gain * 10) / 10;
}

/**
 * Format view numbers into readable strings (e.g. 1500000 -> 1.5M)
 */
export function formatMetricCount(count: number): string {
  if (count >= 1_000_000) {
    return `${(count / 1_000_000).toFixed(1)}M+`;
  }
  if (count >= 1_000) {
    return `${Math.round(count / 1_000)}k+`;
  }
  return `${count}`;
}

/**
 * Calculate estimated turnaround time based on quantity
 */
export function estimateDeliveryHours(thumbsCount: number): string {
  if (thumbsCount <= 1) return '24h - 48h';
  if (thumbsCount <= 4) return '2 - 3 days';
  if (thumbsCount <= 12) return 'Continuous weekly workflow';
  return 'Custom schedule';
}
