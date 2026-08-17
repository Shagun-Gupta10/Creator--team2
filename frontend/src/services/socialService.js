import {
  getSocialDashboard as fetchSocialDashboard,
  getSocialAnalytics as fetchSocialAnalytics,
  getSocialPosts as fetchSocialPosts,
  getSocialTrends as fetchSocialTrends,
} from '../lib/api';

import { getFacebookDashboard } from '../lib/api';

const normalizePlatform = (platform) => (platform || 'instagram').toLowerCase();

export async function loadFacebookDashboard() {
  return getFacebookDashboard();
}

export async function loadSocialDashboard(platform = 'instagram') {
  const normalized = normalizePlatform(platform);

  if (normalized === 'facebook') {
    return getFacebookDashboard();
  }

  return fetchSocialDashboard(normalized);
}

export async function loadSocialAnalytics(platform = 'instagram') {
  if (normalizePlatform(platform) === 'facebook') return { average_engagement: 0 };
  return fetchSocialAnalytics(normalizePlatform(platform));
}

export async function loadSocialPosts(platform = 'instagram') {
  if (normalizePlatform(platform) === 'facebook') return [];
  return fetchSocialPosts(normalizePlatform(platform));
}

export async function loadSocialTrends(platform = 'instagram') {
  if (normalizePlatform(platform) === 'facebook') return {};
  return fetchSocialTrends(normalizePlatform(platform));
}