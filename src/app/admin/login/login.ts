import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service';

interface LoginResponse {
token: string;
fullName: string;
}

interface LoginErrorResponse {
message?: string;
}

@Component({
selector: 'app-login',
standalone: true,
imports: [FormsModule],
templateUrl: './login.html',
styleUrl: './login.css'
})
export class LoginComponent {

email = '';
password = '';

errorMessage = '';

isLoading = false;
showPassword = false;

private readonly apiUrl =
`${environment.apiUrl}/api/Auth/login`;

constructor(
private readonly http: HttpClient,
private readonly router: Router,
private readonly authService: AuthService
) {}

// ==========================================
// LOGIN
// ==========================================

login(): void {

this.errorMessage = '';

const email = this.email.trim();
const password = this.password;

// ------------------------------------------
// VALIDATION
// ------------------------------------------

if (!email || !password) {
  this.errorMessage =
    'Please enter email and password.';
  return;
}

// ------------------------------------------
// PREVENT DUPLICATE LOGIN REQUESTS
// ------------------------------------------

if (this.isLoading) {
  return;
}

// ------------------------------------------
// START LOADING
// ------------------------------------------

this.isLoading = true;

// ------------------------------------------
// LOGIN API
// ------------------------------------------

this.http.post<LoginResponse>(
  this.apiUrl,
  {
    email,
    password
  }
)
.pipe(
  finalize(() => {
    this.isLoading = false;
  })
)
.subscribe({

  next: (response: LoginResponse) => {

    // ----------------------------------------
    // VALIDATE API RESPONSE
    // ----------------------------------------

    if (
      !response?.token
    ) {
      this.errorMessage =
        'Invalid login response. Please try again.';
      return;
    }

    // ----------------------------------------
    // STORE ADMIN SESSION
    // ----------------------------------------

    this.authService.setSession(
      response.token,
      response.fullName ?? ''
    );

    // ----------------------------------------
    // NAVIGATE TO DASHBOARD
    // ----------------------------------------

    this.router.navigate([
      '/admin/dashboard'
    ]);

  },

  error: (error: {
    error?: LoginErrorResponse;
  }) => {

    this.errorMessage =
      error?.error?.message ??
      'Login failed. Please check your credentials and try again.';

  }

});

}

// ==========================================
// TOGGLE PASSWORD VISIBILITY
// ==========================================

togglePassword(): void {
this.showPassword = !this.showPassword;
}
}
