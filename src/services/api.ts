// src/services/api.ts — Centralized API client for Prime Funds backend

const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:4000' : '');
const ADMIN_API_KEY = import.meta.env.VITE_ADMIN_API_KEY || 'pfs_admin_9177886354_secret_key';

// ─── Base fetch helper ────────────────────────────────────────────────────────

async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
  requireAdmin = false
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {})
  };

  if (requireAdmin) {
    headers['x-admin-key'] = ADMIN_API_KEY;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: response.statusText }));
    throw new Error(errorData.error || `API error: ${response.status}`);
  }

  return response.json();
}

// Upload helper (multipart form — no JSON content-type)
async function apiUpload(
  endpoint: string,
  formData: FormData
): Promise<{ url?: string; urls?: string[] }> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    headers: { 'x-admin-key': ADMIN_API_KEY },
    body: formData
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: response.statusText }));
    throw new Error(errorData.error || `Upload error: ${response.status}`);
  }

  return response.json();
}

// ─── Image Upload ─────────────────────────────────────────────────────────────

export const uploadImage = async (file: File, folder = 'general'): Promise<string> => {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('folder', folder);
  const result = await apiUpload('/api/upload', formData);
  if (!result.url) throw new Error('No URL returned from upload');
  return result.url;
};

export const uploadMultipleImages = async (files: File[], folder = 'properties'): Promise<string[]> => {
  const formData = new FormData();
  files.forEach(file => formData.append('images', file));
  formData.append('folder', folder);
  const result = await apiUpload('/api/upload/multiple', formData);
  return result.urls || [];
};

// ─── Properties ───────────────────────────────────────────────────────────────

import type { PropertyItem } from '../types';

export const api = {
  properties: {
    getAll: () => apiFetch<PropertyItem[]>('/api/properties'),
    getById: (id: string) => apiFetch<PropertyItem>(`/api/properties/${id}`),
    create: (data: PropertyItem) =>
      apiFetch<PropertyItem>('/api/properties', { method: 'POST', body: JSON.stringify(data) }, true),
    update: (id: string, data: Partial<PropertyItem>) =>
      apiFetch<PropertyItem>(`/api/properties/${id}`, { method: 'PUT', body: JSON.stringify(data) }, true),
    delete: (id: string) =>
      apiFetch<{ success: boolean }>(`/api/properties/${id}`, { method: 'DELETE' }, true)
  },

  // ─── Loans ───────────────────────────────────────────────────────────────

  loans: {
    getAll: () => apiFetch<any[]>('/api/loans'),
    create: (data: any) =>
      apiFetch<any>('/api/loans', { method: 'POST', body: JSON.stringify(data) }, true),
    update: (id: string, data: any) =>
      apiFetch<any>(`/api/loans/${id}`, { method: 'PUT', body: JSON.stringify(data) }, true),
    delete: (id: string) =>
      apiFetch<{ success: boolean }>(`/api/loans/${id}`, { method: 'DELETE' }, true)
  },

  // ─── Insurances ──────────────────────────────────────────────────────────

  insurances: {
    getAll: () => apiFetch<any[]>('/api/insurances'),
    create: (data: any) =>
      apiFetch<any>('/api/insurances', { method: 'POST', body: JSON.stringify(data) }, true),
    update: (id: string, data: any) =>
      apiFetch<any>(`/api/insurances/${id}`, { method: 'PUT', body: JSON.stringify(data) }, true),
    delete: (id: string) =>
      apiFetch<{ success: boolean }>(`/api/insurances/${id}`, { method: 'DELETE' }, true)
  },

  // ─── Inquiries ───────────────────────────────────────────────────────────

  inquiries: {
    getAll: () => apiFetch<any[]>('/api/inquiries', {}, true),
    create: (data: any) =>
      apiFetch<any>('/api/inquiries', { method: 'POST', body: JSON.stringify(data) }),
    updateStatus: (id: string, status: string) =>
      apiFetch<any>(`/api/inquiries/${id}`, { method: 'PUT', body: JSON.stringify({ status }) }, true),
    updateNotes: (id: string, adminNotes: string) =>
      apiFetch<any>(`/api/inquiries/${id}`, { method: 'PUT', body: JSON.stringify({ adminNotes }) }, true),
    delete: (id: string) =>
      apiFetch<{ success: boolean }>(`/api/inquiries/${id}`, { method: 'DELETE' }, true),
    clearAll: () =>
      apiFetch<{ success: boolean }>('/api/inquiries', { method: 'DELETE' }, true)
  },

  // ─── Settings ────────────────────────────────────────────────────────────

  settings: {
    getBrand: () => apiFetch<any>('/api/settings/brand'),
    updateBrand: (data: any) =>
      apiFetch<any>('/api/settings/brand', { method: 'PUT', body: JSON.stringify(data) }, true),
    getStats: () => apiFetch<any[]>('/api/settings/stats'),
    updateStats: (data: any[]) =>
      apiFetch<any[]>('/api/settings/stats', { method: 'PUT', body: JSON.stringify(data) }, true),
    getWhyChooseUs: () => apiFetch<any[]>('/api/settings/why-choose-us'),
    updateWhyChooseUs: (data: any[]) =>
      apiFetch<any[]>('/api/settings/why-choose-us', { method: 'PUT', body: JSON.stringify(data) }, true),
    getTrustPoints: () => apiFetch<any[]>('/api/settings/trust-points'),
    updateTrustPoints: (data: any[]) =>
      apiFetch<any[]>('/api/settings/trust-points', { method: 'PUT', body: JSON.stringify(data) }, true),
    getFees: () => apiFetch<any>('/api/settings/fees'),
    updateFees: (data: any) =>
      apiFetch<any>('/api/settings/fees', { method: 'PUT', body: JSON.stringify(data) }, true)
  },

  // ─── Content ─────────────────────────────────────────────────────────────

  content: {
    getPrivacy: () => apiFetch<any[]>('/api/content/privacy'),
    updatePrivacy: (data: any[]) =>
      apiFetch<any[]>('/api/content/privacy', { method: 'PUT', body: JSON.stringify(data) }, true),
    getTerms: () => apiFetch<any[]>('/api/content/terms'),
    updateTerms: (data: any[]) =>
      apiFetch<any[]>('/api/content/terms', { method: 'PUT', body: JSON.stringify(data) }, true),
    getAbout: () => apiFetch<any>('/api/content/about'),
    updateAbout: (data: any) =>
      apiFetch<any>('/api/content/about', { method: 'PUT', body: JSON.stringify(data) }, true),
    getGovSchemes: () => apiFetch<any>('/api/content/gov-schemes'),
    updateGovSchemes: (data: any) =>
      apiFetch<any>('/api/content/gov-schemes', { method: 'PUT', body: JSON.stringify(data) }, true)
  },

  // ─── Dashboard ────────────────────────────────────────────────────────────

  dashboard: {
    getSummary: () => apiFetch<any>('/api/dashboard', {}, true)
  },

  // ─── Health ──────────────────────────────────────────────────────────────

  health: {
    check: () => apiFetch<any>('/api/health')
  }
};

export default api;
