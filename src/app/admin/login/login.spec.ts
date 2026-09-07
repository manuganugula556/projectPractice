import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login';
import { provideRouter } from '@angular/router';
import { Router } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let http: HttpTestingController;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting()
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    http = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService);
    await fixture.whenStable();
  });

  afterEach(() => {
    http.verify();
    authService.clearSession();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('validates required credentials', () => {
    component.login();

    expect(component.errorMessage).toBe('Please enter email and password.');
  });

  it('stores a successful session and navigates to the dashboard', () => {
    component.email = ' admin@example.com ';
    component.password = 'password';
    const setSession = vi.spyOn(authService, 'setSession');
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate');

    component.login();
    const request = http.expectOne(`${environment.apiUrl}/api/Auth/login`);
    expect(request.request.body).toEqual({
      email: 'admin@example.com',
      password: 'password'
    });
    request.flush({ token: 'token', fullName: 'Admin' });

    expect(setSession).toHaveBeenCalledWith('token', 'Admin');
    expect(navigate).toHaveBeenCalledWith(['/admin/dashboard']);
    expect(component.isLoading).toBe(false);
  });

  it('shows API errors and always stops loading', () => {
    component.email = 'admin@example.com';
    component.password = 'password';

    component.login();
    const request = http.expectOne(`${environment.apiUrl}/api/Auth/login`);
    request.flush({ message: 'Invalid credentials' }, { status: 401, statusText: 'Unauthorized' });

    expect(component.errorMessage).toBe('Invalid credentials');
    expect(component.isLoading).toBe(false);
  });

  it('toggles password visibility', () => {
    expect(component.showPassword).toBe(false);
    component.togglePassword();
    expect(component.showPassword).toBe(true);
  });
});
