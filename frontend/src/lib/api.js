import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000',
});

export async function registerUser({ name, email, password, role }) {
  const res = await api.post('/register', { name, email, password, role });
  return res.data;
}

export async function loginUser({ email, password }) {
  const res = await api.post('/login', { email, password });
  return res.data;
}

export async function getProfile() {
  const res = await api.get('/profile', { headers: authHeaders() });
  return res.data;
}


export async function updateProfileSettings(payload) {
  const res = await api.put('/settings/profile', payload, { headers: authHeaders() });
  return res.data;
}

export async function updateSecuritySettings(payload) {
  const res = await api.put('/settings/security', payload, { headers: authHeaders() });
  return res.data;
}

export async function updateNotificationSettings(payload) {
  const res = await api.put('/settings/notifications', payload, { headers: authHeaders() });
  return res.data;
}

export async function updateAppearanceSettings(payload) {
  const res = await api.put('/settings/appearance', payload, { headers: authHeaders() });
  return res.data;
}


export function setAccessToken(token) {
  if (!token) return;
  localStorage.setItem('access_token', token);
}

export function getAccessToken() {
  return localStorage.getItem('access_token');
}

export function authHeaders() {
  const token = getAccessToken();
  if (!token) return {};
  return {
    Authorization: `Bearer ${token}`,
  };
}

export async function createContent({ title, platform, views, likes }) {
  const res = await api.post(
    '/content',
    { title, platform, views, likes },
    { headers: authHeaders() }
  );
  return res.data;
}

export async function listContents() {
  const res = await api.get('/content', { headers: authHeaders() });
  return res.data;
}

export async function deleteContent(contentId) {
  const res = await api.delete(`/content/${contentId}`, { headers: authHeaders() });
  return res.data;
}

export function clearAccessToken() {
  localStorage.removeItem('access_token');
}



