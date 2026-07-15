import { API_BASE_URL } from '../config/api';

const TOKEN_STORAGE_KEY = 'zezting_access_token';
const REFRESH_TOKEN_STORAGE_KEY = 'zezting_refresh_token';

export function setAuthTokens(accessToken: string, refreshToken: string): void {
  localStorage.setItem(TOKEN_STORAGE_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, refreshToken);
}

export function clearAuthTokens(): void {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
  localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
}

export class ApiError extends Error {
  status: number;
  code?: string;

  constructor(message: string, status: number, code?: string) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

interface ApiEnvelope<T> {
  success: boolean;
  message: string;
  data: T;
  error?: { code?: string };
}

export async function apiGet<T>(path: string, params?: Record<string, string | number | undefined>): Promise<T> {
  const url = new URL(`${API_BASE_URL}${path}`, window.location.origin);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) url.searchParams.set(key, String(value));
    }
  }

  const token = localStorage.getItem(TOKEN_STORAGE_KEY);

  const res = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      accept: '*/*',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  const body = (await res.json()) as ApiEnvelope<T>;

  if (!res.ok || !body.success) {
    throw new ApiError(body.message || 'Request failed', res.status, body.error?.code);
  }

  return body.data;
}

export async function apiPost<T>(path: string, payload?: unknown): Promise<T> {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY);

  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    headers: {
      accept: '*/*',
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(payload ?? {}),
  });

  const body = (await res.json()) as ApiEnvelope<T>;

  if (!res.ok || !body.success) {
    throw new ApiError(body.message || 'Request failed', res.status, body.error?.code);
  }

  return body.data;
}
