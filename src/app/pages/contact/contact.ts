import { ChangeDetectorRef, Component } from '@angular/core';import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface ContactResponse {
  message: string;
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

  private apiUrl =
    'https://localhost:44331/api/Contact';


constructor(
  private http: HttpClient,
  private cdr: ChangeDetectorRef
) {}

submitForm(): void {

  // Clear previous messages
  this.successMessage = '';
  this.errorMessage = '';

  // Validate fields
  if (
    !this.name.trim() ||
    !this.email.trim() ||
    !this.subject.trim() ||
    !this.message.trim()
  ) {
    this.errorMessage =
      'Please fill in all the required fields.';

    this.cdr.detectChanges();

    return;
  }

  // Show Sending...
  this.isSubmitting = true;

  this.cdr.detectChanges();

  // Prepare request
  const contactData = {
    name: this.name.trim(),
    email: this.email.trim(),
    subject: this.subject.trim(),
    message: this.message.trim()
  };

  console.log('SENDING CONTACT DATA:', contactData);

  // Call API
  this.http.post<any>(
    this.apiUrl,
    contactData
  ).subscribe({

    next: (response) => {

      console.log(
        'CONTACT API SUCCESS:',
        response
      );

      // Stop Sending...
      this.isSubmitting = false;

      // Show success message
      this.successMessage =
        response?.message ||
        'Your message has been submitted successfully.';

      // Clear form
      this.name = '';
      this.email = '';
      this.subject = '';
      this.message = '';

      // Force Angular UI update
      this.cdr.detectChanges();

    },

    error: (error) => {

      console.error(
        'CONTACT API ERROR:',
        error
      );

      // Stop Sending...
      this.isSubmitting = false;

      // Show error
      this.errorMessage =
        error?.error?.message ||
        'Unable to submit your message. Please try again.';

      // Force Angular UI update
      this.cdr.detectChanges();

    }

  });
}

}