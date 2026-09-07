import { Injectable } from '@angular/core';

const TOKEN_KEY = 'token';
const FULL_NAME_KEY = 'fullName';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();

    if (!token) {
      return false;
    }

    const expiration = this.getTokenExpiration(token);
    if (expiration !== null && expiration <= Math.floor(Date.now() / 1000)) {
      this.clearSession();
      return false;
    }

    return true;
  }

  setSession(token: string, fullName: string): void {
    sessionStorage.setItem(TOKEN_KEY, token);
    sessionStorage.setItem(FULL_NAME_KEY, fullName);
  }

  getFullName(): string | null {
    return sessionStorage.getItem(FULL_NAME_KEY);
  }

  clearSession(): void {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(FULL_NAME_KEY);
  }

  private getTokenExpiration(token: string): number | null {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }

    try {
      const payload = JSON.parse(
        this.decodeBase64Url(parts[1])
      ) as { exp?: unknown };

      return typeof payload.exp === 'number' ? payload.exp : null;
    } catch {
      return null;
    }
  }

  private decodeBase64Url(value: string): string {
    const base64 = value
      .replace(/-/g, '+')
      .replace(/_/g, '/')
      .padEnd(Math.ceil(value.length / 4) * 4, '=');

    return atob(base64);
  }
}
