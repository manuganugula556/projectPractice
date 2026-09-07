import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactComponent } from './contact';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let http: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    http = TestBed.inject(HttpTestingController);
    await fixture.whenStable();
  });

  afterEach(() => http.verify());

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('rejects incomplete and invalid forms', () => {
    component.submitForm();
    expect(component.errorMessage).toBe('Please fill in all the required fields.');

    component.name = 'Visitor';
    component.email = 'invalid';
    component.subject = 'Question';
    component.message = 'Hello';
    component.submitForm();
    expect(component.errorMessage).toBe('Please enter a valid email address.');
  });

  it('submits valid data and clears the form', () => {
    component.name = ' Visitor ';
    component.email = ' visitor@example.com ';
    component.subject = 'Question';
    component.message = ' Hello ';

    component.submitForm();
    const request = http.expectOne(`${environment.apiUrl}/api/Contact`);
    expect(request.request.body).toEqual({
      name: 'Visitor',
      email: 'visitor@example.com',
      subject: 'Question',
      message: 'Hello'
    });
    request.flush({ message: 'Received' });

    expect(component.successMessage).toBe('Received');
    expect(component.name).toBe('');
    expect(component.isSubmitting).toBe(false);
  });

  it('shows the API error response', () => {
    component.name = 'Visitor';
    component.email = 'visitor@example.com';
    component.subject = 'Question';
    component.message = 'Hello';

    component.submitForm();
    const request = http.expectOne(`${environment.apiUrl}/api/Contact`);
    request.flush({ message: 'Service unavailable' }, { status: 500, statusText: 'Server Error' });

    expect(component.errorMessage).toBe('Service unavailable');
    expect(component.isSubmitting).toBe(false);
  });
});
