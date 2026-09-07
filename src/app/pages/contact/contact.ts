import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs';

import { environment } from '../../../environments/environment';

interface ContactResponse {
message?: string;
}

interface ContactErrorResponse {
message?: string;
}

@Component({
selector: 'app-contact',
standalone: true,
imports: [FormsModule],
templateUrl: './contact.html',
styleUrl: './contact.css'
})
export class ContactComponent {

name = '';
email = '';
subject = '';
message = '';

isSubmitting = false;

successMessage = '';
errorMessage = '';

private readonly apiUrl =
`${environment.apiUrl}/api/Contact`;

constructor(
private readonly http: HttpClient
) {}

// ==========================================
// SUBMIT CONTACT FORM
// ==========================================

submitForm(): void {

// ------------------------------------------
// CLEAR PREVIOUS MESSAGES
// ------------------------------------------

this.successMessage = '';
this.errorMessage = '';

// ------------------------------------------
// PREVENT DUPLICATE SUBMISSIONS
// ------------------------------------------

if (this.isSubmitting) {
  return;
}

// ------------------------------------------
// CLEAN INPUT VALUES
// ------------------------------------------

const name = this.name.trim();
const email = this.email.trim();
const subject = this.subject.trim();
const message = this.message.trim();

// ------------------------------------------
// VALIDATION
// ------------------------------------------

if (
  !name ||
  !email ||
  !subject ||
  !message
) {
  this.errorMessage =
    'Please fill in all the required fields.';
  return;
}

// ------------------------------------------
// BASIC EMAIL VALIDATION
// ------------------------------------------

const emailPattern =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailPattern.test(email)) {
  this.errorMessage =
    'Please enter a valid email address.';
  return;
}

// ------------------------------------------
// START SUBMISSION
// ------------------------------------------

this.isSubmitting = true;

// ------------------------------------------
// REQUEST DATA
// ------------------------------------------

const contactData = {
  name,
  email,
  subject,
  message
};

// ------------------------------------------
// CONTACT API
// ------------------------------------------

this.http.post<ContactResponse>(
  this.apiUrl,
  contactData
)
.pipe(
  finalize(() => {
    this.isSubmitting = false;
  })
)
.subscribe({

  next: (response: ContactResponse) => {

    // ----------------------------------------
    // SUCCESS MESSAGE
    // ----------------------------------------

    this.successMessage =
      response?.message ??
      'Your message has been submitted successfully.';

    // ----------------------------------------
    // CLEAR FORM
    // ----------------------------------------

    this.name = '';
    this.email = '';
    this.subject = '';
    this.message = '';
  },

  error: (error: {
    error?: ContactErrorResponse;
  }) => {

    this.errorMessage =
      error?.error?.message ??
      'Unable to submit your message. Please try again.';
  }

});

}
}
