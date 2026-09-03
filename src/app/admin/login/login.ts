import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface LoginResponse {

  token: string;

  fullName: string;

  role: string;

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


  private apiUrl =
    'https://localhost:44331/api/Auth/login';


  constructor(

    private http: HttpClient,

    private router: Router

  ) {}


  // ==========================================
  // LOGIN
  // ==========================================

  login(): void {

    this.errorMessage = '';


    if (
      !this.email ||
      !this.password
    ) {

      this.errorMessage =
        'Please enter email and password.';

      return;

    }


    this.isLoading = true;


    this.http.post<LoginResponse>(

      this.apiUrl,

      {
        email: this.email,

        password: this.password
      }

    )

    .subscribe({

      next: (response) => {


        console.log(
          'LOGIN SUCCESS:',
          response
        );


        // ======================================
        // STORE ADMIN SESSION
        // ======================================

        sessionStorage.setItem(
          'token',
          response.token
        );


        sessionStorage.setItem(
          'role',
          response.role
        );


        sessionStorage.setItem(
          'fullName',
          response.fullName
        );

        sessionStorage.setItem(
          'justLoggedIn',
          'true'
        );


        this.isLoading = false;


        // ======================================
        // NAVIGATE TO DASHBOARD
        // ======================================

        this.router.navigate([
          '/admin/dashboard'
        ]);

      },


      error: (error) => {


        console.error(
          'LOGIN ERROR:',
          error
        );


        this.isLoading = false;


        this.errorMessage =
          error?.error?.message ??
          'Login failed. Please try again.';

      }

    });

  }

}
