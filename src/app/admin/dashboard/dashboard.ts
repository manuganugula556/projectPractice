import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import { DatePipe } from '@angular/common';

import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';

import { finalize } from 'rxjs';


// ==========================================
// GALLERY INTERFACE
// ==========================================

interface GalleryImage {

  id: number;

  fileName: string;

  filePath: string;

  uploadedAt: string;

}


// ==========================================
// CONTACT MESSAGE INTERFACE
// ==========================================

interface ContactMessage {

  id: number;

  name: string;

  email: string;

  subject: string;

  message: string;

  submittedAt: string;

  isRead: boolean;

}


@Component({

  selector: 'app-dashboard',

  standalone: true,

  imports: [DatePipe],

  templateUrl: './dashboard.html',

  styleUrl: './dashboard.css'

})


export class DashboardComponent
  implements OnInit {


  // ==========================================
  // API URLs
  // ==========================================

  private galleryApiUrl =
    'https://localhost:44331/api/Gallery';

  private contactApiUrl =
    'https://localhost:44331/api/Contact';


  // ==========================================
  // ADMIN
  // ==========================================

  adminName = '';


  // ==========================================
  // GALLERY VARIABLES
  // ==========================================

  selectedFile:
    File | null = null;


  previewUrl:
    string | null = null;


  galleryImages:
    GalleryImage[] = [];


  isUploading = false;


  uploadMessage = '';


  uploadError = '';


  isLoadingImages = false;


  // ==========================================
  // CONTACT MESSAGE VARIABLES
  // ==========================================

  contactMessages:
    ContactMessage[] = [];


  isLoadingMessages = false;


  messageError = '';


  // ==========================================
  // CONSTRUCTOR
  // ==========================================

  constructor(

    private http: HttpClient,

    private router: Router,

    private cdr: ChangeDetectorRef

  ) {}


  // ==========================================
  // INITIALIZE
  // ==========================================

  ngOnInit(): void {

    this.adminName =
      sessionStorage.getItem(
        'fullName'
      ) ||
      'Administrator';


    // Load gallery
    this.loadGalleryImages();


    // Load contact messages
    this.loadContactMessages();

  }


  // ==========================================
  // LOAD GALLERY IMAGES
  // ==========================================

  loadGalleryImages(): void {

    this.isLoadingImages = true;

    this.cdr.detectChanges();


    this.http.get<GalleryImage[]>(

      this.galleryApiUrl

    )

    .subscribe({

      next: (images) => {

        console.log(
          'GALLERY API RESPONSE:',
          images
        );


        this.galleryImages =
          images || [];


        this.isLoadingImages = false;


        this.cdr.detectChanges();

      },


      error: (error) => {

        console.error(
          'GALLERY LOAD ERROR:',
          error
        );


        this.galleryImages = [];


        this.isLoadingImages = false;


        this.uploadError =
          'Unable to load gallery images.';


        this.cdr.detectChanges();

      }

    });

  }


  // ==========================================
  // LOAD CONTACT MESSAGES
  // ==========================================

  loadContactMessages(): void {

    this.isLoadingMessages = true;

    this.messageError = '';

    this.cdr.detectChanges();


    this.http.get<ContactMessage[]>(

      this.contactApiUrl

    )

    .subscribe({

      next: (messages) => {

        console.log(
          'CONTACT MESSAGES API RESPONSE:',
          messages
        );


        this.contactMessages =
          messages || [];


        this.isLoadingMessages = false;


        this.cdr.detectChanges();

      },


      error: (error) => {

        console.error(
          'CONTACT MESSAGES LOAD ERROR:',
          error
        );


        this.contactMessages = [];


        this.isLoadingMessages = false;


        this.messageError =
          'Unable to load contact messages.';


        this.cdr.detectChanges();

      }

    });

  }


  // ==========================================
  // FILE SELECTION
  // ==========================================

  onFileSelected(
    event: Event
  ): void {

    const input =
      event.target as HTMLInputElement;


    if (
      !input.files ||
      input.files.length === 0
    ) {

      return;

    }


    this.selectFile(
      input.files[0]
    );

  }


  // ==========================================
  // SELECT FILE
  // ==========================================

  selectFile(
    file: File
  ): void {

    this.uploadMessage = '';

    this.uploadError = '';


    const allowedTypes = [

      'image/jpeg',

      'image/png',

      'image/webp'

    ];


    if (
      !allowedTypes.includes(
        file.type
      )
    ) {

      this.uploadError =
        'Please select a JPG, PNG or WEBP image.';

      this.selectedFile = null;

      this.previewUrl = null;

      return;

    }


    const maxSize =
      10 * 1024 * 1024;


    if (
      file.size > maxSize
    ) {

      this.uploadError =
        'Image size must be less than 10 MB.';

      this.selectedFile = null;

      this.previewUrl = null;

      return;

    }


    this.selectedFile = file;


    const reader =
      new FileReader();


    reader.onload = () => {

      this.previewUrl =
        reader.result as string;


      this.cdr.detectChanges();

    };


    reader.readAsDataURL(file);

  }


  // ==========================================
  // REMOVE SELECTED FILE
  // ==========================================

  removeSelectedFile(): void {

    this.selectedFile = null;

    this.previewUrl = null;

    this.uploadMessage = '';

    this.uploadError = '';


    this.cdr.detectChanges();

  }


  // ==========================================
  // UPLOAD IMAGE
  // ==========================================

uploadImage(): void {

  if (!this.selectedFile) {

    this.uploadError =
      'Please select an image first.';

    this.cdr.detectChanges();

    return;
  }

  this.isUploading = true;
  this.uploadMessage = '';
  this.uploadError = '';

  this.cdr.detectChanges();


  const formData = new FormData();

  formData.append(
    'file',
    this.selectedFile,
    this.selectedFile.name
  );


  console.log(
    'Starting upload:',
    this.selectedFile.name
  );


  this.http.post<GalleryImage>(
    `${this.galleryApiUrl}/upload`,
    formData
  )
  .pipe(

    finalize(() => {

      console.log(
        'UPLOAD REQUEST FINISHED'
      );

      this.isUploading = false;

      this.cdr.detectChanges();

    })

  )
  .subscribe({

    next: (response) => {

      console.log(
        'UPLOAD SUCCESS:',
        response
      );


      this.uploadMessage =
        'Photo uploaded successfully.';


      this.selectedFile = null;
      this.previewUrl = null;


      this.cdr.detectChanges();


      // Reload gallery after successful upload
      this.loadGalleryImages();

    },


    error: (error) => {

      console.error(
        'UPLOAD ERROR:',
        error
      );


      this.uploadError =

        error?.error?.message ||

        error?.error?.title ||

        'Photo upload failed.';


      this.cdr.detectChanges();

    }

  });

}


  // ==========================================
  // DELETE IMAGE
  // ==========================================

  deleteImage(
    image: GalleryImage
  ): void {

    const confirmed =
      window.confirm(

        `Are you sure you want to delete "${image.fileName}"?`

      );


    if (!confirmed) {

      return;

    }


    this.http.delete(

      `${this.galleryApiUrl}/${image.id}`

    )

    .subscribe({

      next: () => {

        this.galleryImages =

          this.galleryImages.filter(

            x =>
              x.id !== image.id

          );


        this.uploadMessage =
          'Photo deleted successfully.';


        this.cdr.detectChanges();

      },


      error: (error) => {

        console.error(
          'DELETE ERROR:',
          error
        );


        this.uploadError =

          error?.error?.message ||

          'Unable to delete photo.';


        this.cdr.detectChanges();

      }

    });

  }


  // ==========================================
  // DELETE CONTACT MESSAGE
  // ==========================================

  deleteMessage(
    message: ContactMessage
  ): void {

    const confirmed =
      window.confirm(

        `Are you sure you want to delete the message from "${message.name}"?`

      );


    if (!confirmed) {

      return;

    }


    this.http.delete(

      `${this.contactApiUrl}/${message.id}`

    )

    .subscribe({

      next: () => {

        console.log(
          'CONTACT MESSAGE DELETED:',
          message.id
        );


        this.contactMessages =

          this.contactMessages.filter(

            x =>
              x.id !== message.id

          );


        this.cdr.detectChanges();

      },


      error: (error) => {

        console.error(
          'CONTACT MESSAGE DELETE ERROR:',
          error
        );


        this.messageError =

          error?.error?.message ||

          'Unable to delete contact message.';


        this.cdr.detectChanges();

      }

    });

  }


  // ==========================================
  // LOGOUT
  // ==========================================

  logout(): void {

    sessionStorage.removeItem(
      'token'
    );


    sessionStorage.removeItem(
      'role'
    );


    sessionStorage.removeItem(
      'fullName'
    );


    this.router.navigate([
      '/admin/login'
    ]);

  }


  // ==========================================
  // IMAGE URL
  // ==========================================

  getImageUrl(
    path: string
  ): string {

    if (!path) {

      return '';

    }


    if (
      path.startsWith('http://') ||
      path.startsWith('https://')
    ) {

      return path;

    }


    return `https://localhost:44331${path}`;

  }

}