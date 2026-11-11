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
    title: 'GTA 5 Epic Escape',
    category: 'gta5',
    categoryLabel: 'GTA 5',
    imageUrl: '/test1.jpg',
    ctr: '16.2%',
    views: '1.2M',
    client: 'GamerX',
    description: 'High contrast gaming thumbnail',
    software: ['Photoshop', 'Blender'],
    colorPalette: ['#ff0000', '#000000'],
    keyTactics: ['Extreme facial expression', 'Lava glow'],
  },
  {
    id: '2',
    title: 'CS:GO Clutch',
    category: 'csgo',
    categoryLabel: 'CS:GO',
    imageUrl: '/test2.jpg',
    ctr: '14.8%',
    views: '650k',
    client: 'DeepGamer',
    description: 'Clean esports clutch composition',
    software: ['Photoshop', 'Lightroom'],
    colorPalette: ['#00d4ff', '#111827'],
    keyTactics: ['Rule of thirds', 'Dual silhouette lighting'],
  },
];

test('filterThumbnails returns all items when category is "todos"', () => {
  const result = filterThumbnails(mockThumbnails, 'todos');
  assert.equal(result.length, 2);
});

test('filterThumbnails filters correctly by specific game category', () => {
  const gta5 = filterThumbnails(mockThumbnails, 'gta5');
  assert.equal(gta5.length, 1);
  assert.equal(gta5[0].id, '1');

  const roblox = filterThumbnails(mockThumbnails, 'roblox');
  assert.equal(roblox.length, 0);
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
