import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    sessionStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  afterEach(() => sessionStorage.clear());

  it('stores and reads the session', () => {
    service.setSession('token', 'Admin');

    expect(service.getToken()).toBe('token');
    expect(service.getFullName()).toBe('Admin');
    expect(service.isAuthenticated()).toBe(true);
  });

  it('rejects an expired JWT and clears the session', () => {
    const payload = btoa(JSON.stringify({ exp: Math.floor(Date.now() / 1000) - 1 }))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
    service.setSession(`header.${payload}.signature`, 'Admin');

    expect(service.isAuthenticated()).toBe(false);
    expect(service.getToken()).toBeNull();
    expect(service.getFullName()).toBeNull();
  });

  it('accepts non-JWT tokens and clears sessions explicitly', () => {
    service.setSession('opaque-token', 'Admin');
    expect(service.isAuthenticated()).toBe(true);

    service.clearSession();
    expect(service.getToken()).toBeNull();
  });
});
