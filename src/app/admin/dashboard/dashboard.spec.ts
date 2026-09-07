import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard';
import { provideRouter, Router } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let http: HttpTestingController;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting()
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    http = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
    http.match(`${environment.apiUrl}/api/Gallery`).forEach(request => request.flush([]));
    http.match(`${environment.apiUrl}/api/Contact`).forEach(request => request.flush([]));
    await fixture.whenStable();
  });

  afterEach(() => {
    http.verify();
    authService.clearSession();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loads gallery and contact messages', () => {
    component.loadGalleryImages();
    const galleryRequest = http.expectOne(`${environment.apiUrl}/api/Gallery`);
    galleryRequest.flush([{
      id: 1,
      fileName: 'photo.jpg',
      filePath: '/uploads/photo.jpg',
      uploadedAt: '2026-01-01'
    }]);

    component.loadContactMessages();
    const contactRequest = http.expectOne(`${environment.apiUrl}/api/Contact`);
    contactRequest.flush([{
      id: 1,
      name: 'Visitor',
      email: 'visitor@example.com',
      subject: 'Question',
      message: 'Hello',
      submittedAt: '2026-01-01',
      isRead: false
    }]);

    expect(component.galleryImages).toHaveLength(1);
    expect(component.contactMessages).toHaveLength(1);
  });

  it('shows load errors for gallery and contact data', () => {
    component.loadGalleryImages();
    http.expectOne(`${environment.apiUrl}/api/Gallery`)
      .flush({}, { status: 500, statusText: 'Server Error' });
    expect(component.uploadError).toBe('Unable to load gallery images.');

    component.loadContactMessages();
    http.expectOne(`${environment.apiUrl}/api/Contact`)
      .flush({}, { status: 500, statusText: 'Server Error' });
    expect(component.messageError).toBe('Unable to load contact messages.');
  });

  it('validates image type and size', () => {
    component.selectFile(new File(['x'], 'document.txt', { type: 'text/plain' }));
    expect(component.uploadError).toContain('JPG, PNG or WEBP');

    const largeFile = new File([new Uint8Array(10 * 1024 * 1024 + 1)], 'large.jpg', {
      type: 'image/jpeg'
    });
    component.selectFile(largeFile);
    expect(component.uploadError).toContain('less than 10 MB');
  });

  it('uploads a selected image and refreshes the gallery', () => {
    component.selectedFile = new File(['image'], 'photo.jpg', { type: 'image/jpeg' });
    component.uploadImage();

    const uploadRequest = http.expectOne(`${environment.apiUrl}/api/Gallery/upload`);
    expect(uploadRequest.request.method).toBe('POST');
    uploadRequest.flush({
      id: 2,
      fileName: 'photo.jpg',
      filePath: '/uploads/photo.jpg',
      uploadedAt: '2026-01-01'
    });
    http.expectOne(`${environment.apiUrl}/api/Gallery`).flush([]);

    expect(component.uploadMessage).toBe('Photo uploaded successfully.');
    expect(component.selectedFile).toBeNull();
    expect(component.isUploading).toBe(false);
  });

  it('handles upload without a file and upload errors', () => {
    component.uploadImage();
    expect(component.uploadError).toBe('Please select an image first.');

    component.selectedFile = new File(['image'], 'photo.jpg', { type: 'image/jpeg' });
    component.uploadImage();
    http.expectOne(`${environment.apiUrl}/api/Gallery/upload`)
      .flush({ title: 'Upload failed' }, { status: 400, statusText: 'Bad Request' });
    expect(component.uploadError).toBe('Upload failed');
    expect(component.isUploading).toBe(false);
  });

  it('deletes images and contact messages after confirmation', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    component.galleryImages = [{
      id: 1,
      fileName: 'photo.jpg',
      filePath: '/uploads/photo.jpg',
      uploadedAt: '2026-01-01'
    }];
    component.deleteImage(component.galleryImages[0]);
    http.expectOne(`${environment.apiUrl}/api/Gallery/1`).flush({});
    expect(component.galleryImages).toHaveLength(0);

    component.contactMessages = [{
      id: 1,
      name: 'Visitor',
      email: 'visitor@example.com',
      subject: 'Question',
      message: 'Hello',
      submittedAt: '2026-01-01',
      isRead: false
    }];
    component.deleteMessage(component.contactMessages[0]);
    http.expectOne(`${environment.apiUrl}/api/Contact/1`).flush({});
    expect(component.contactMessages).toHaveLength(0);
  });

  it('builds image URLs and logs out', () => {
    expect(component.getImageUrl('')).toBe('');
    expect(component.getImageUrl('https://cdn.example.com/photo.jpg')).toBe('https://cdn.example.com/photo.jpg');
    expect(component.getImageUrl('/uploads/photo.jpg')).toBe(`${environment.apiUrl}/uploads/photo.jpg`);

    const router = TestBed.inject(Router);
    const navigate = vi.spyOn(router, 'navigate');
    component.logout();
    expect(navigate).toHaveBeenCalledWith(['/admin/login']);
  });
});
