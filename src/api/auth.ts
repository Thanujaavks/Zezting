import { apiPost } from '../lib/apiClient';

export interface AdminUser {
  id: string;
  email: string;
  username: string;
  role: string;
  hostTierId: string | null;
  isProfileComplete: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LoginResult {
  accessToken: string;
  refreshToken: string;
  user: AdminUser;
}

export function loginAdmin(email: string, password: string): Promise<LoginResult> {
  return apiPost<LoginResult>('/api/auth/admin/login', { email, password });
}
