import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterThumbnails,
  calculateCtrGain,
  formatMetricCount,
  estimateDeliveryHours,
} from './portfolioCalculators';
import { ThumbnailProject } from '../types/portfolio';

const mockThumbnails: ThumbnailProject[] = [
  {
    id: '1',
    title: 'GTA 6 Vice City Night',
    category: 'gta6',
    categoryLabel: 'GTA 6',
    imageUrl: '/test1.jpg',
    ctr: '18.2%',
    views: '2.4M',
    client: 'Vice City Creator',
    description: 'High contrast GTA 6 thumbnail',
    software: ['Photoshop', 'Lightroom'],
    colorPalette: ['#2563eb', '#000000'],
    keyTactics: ['Neon contrast', 'Strong focal silhouette'],
  },
  {
    id: '2',
    title: 'Retired in Thailand',
    category: 'travel-vlogs',
    categoryLabel: 'Travel Vlogs',
    imageUrl: '/test2.jpg',
    ctr: '15.4%',
    views: '2.1M',
    client: 'Travel Vlog Creator',
    description: 'Cinematic coastal travel vlog composition',
    software: ['Photoshop', 'Lightroom'],
    colorPalette: ['#0284c7', '#f59e0b'],
    keyTactics: ['Rule of thirds', 'Vibrant tropical color grading'],
  },
];

test('filterThumbnails returns all items when category is "todos"', () => {
  const result = filterThumbnails(mockThumbnails, 'todos');
  assert.equal(result.length, 2);
});

test('filterThumbnails filters correctly by GTA 6 and Travel Vlogs categories', () => {
  const gta6 = filterThumbnails(mockThumbnails, 'gta6');
  assert.equal(gta6.length, 1);
  assert.equal(gta6[0].id, '1');

  const travelVlogs = filterThumbnails(mockThumbnails, 'travel-vlogs');
  assert.equal(travelVlogs.length, 1);
  assert.equal(travelVlogs[0].id, '2');
});

test('calculateCtrGain calculates accurate percentage improvement', () => {
  // Before 4.0% to After 6.0% -> +50% gain
  const gain1 = calculateCtrGain(4.0, 6.0);
  assert.equal(gain1, 50.0);

  // Before 5.2% to After 7.8% -> 50%
  const gain2 = calculateCtrGain(5.0, 7.5);
  assert.equal(gain2, 50.0);

  // Zero before CTR safeguard
  assert.equal(calculateCtrGain(0, 10), 0);
});

test('formatMetricCount formats large numbers cleanly', () => {
  assert.equal(formatMetricCount(1500000), '1.5M+');
  assert.equal(formatMetricCount(50000000), '50.0M+');
  assert.equal(formatMetricCount(250000), '250k+');
  assert.equal(formatMetricCount(850), '850');
});

test('estimateDeliveryHours returns correct turnaround timeline', () => {
  assert.equal(estimateDeliveryHours(1), '24h - 48h');
  assert.equal(estimateDeliveryHours(4), '2 - 3 days');
  assert.equal(estimateDeliveryHours(10), 'Continuous weekly workflow');
});
