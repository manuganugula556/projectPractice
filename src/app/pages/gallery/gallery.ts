import { Component, OnInit, ChangeDetectorRef } from '@angular/core';import { CommonModule } from '@angular/common';

import {
  GalleryService,
  GalleryImage
} from '../../services/gallery';

interface GalleryPhoto {
  image: string;
  title: string;
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.html',
  styleUrl: './gallery.css'
})
export class GalleryComponent implements OnInit {

  private readonly apiBaseUrl = 'https://localhost:44331';

  photos: GalleryPhoto[] = [];

  selectedPhoto: string | null = null;

constructor(
  private galleryService: GalleryService,
  private cdr: ChangeDetectorRef
) {}
  ngOnInit(): void {
    this.loadGalleryImages();
  }

  loadGalleryImages(): void {

    const manualPhotos: GalleryPhoto[] = [
      {
        image: 'assets/images/Speech.jpg',
        title: 'Scientist'
      },
      {
        image: 'assets/images/Media.jpg',
        title: 'Scientist'
      },
      {
        image: 'assets/images/Bookofrecords.jpg',
        title: 'Scientist'
      }
    ];

    this.photos = manualPhotos;

    this.galleryService.getGalleryImages().subscribe({

      next: (images: GalleryImage[]) => {

        console.log('========== GALLERY API RESPONSE ==========');
        console.log(images);

        const uploadedPhotos: GalleryPhoto[] = images.map(
          (image: GalleryImage) => {

            const imageUrl =
              `${this.apiBaseUrl}${image.filePath}`;

            console.log('File name:', image.fileName);
            console.log('File path:', image.filePath);
            console.log('Final image URL:', imageUrl);

            return {
              image: imageUrl,
              title: image.fileName
            };
          }
        );

        this.photos = [
          ...manualPhotos,
          ...uploadedPhotos
        ];

        console.log('========== FINAL PHOTOS ==========');
        console.log(this.photos);
        console.log('PHOTO COUNT:', this.photos.length);

        // Force Angular to update the gallery UI
        this.cdr.detectChanges();
      },

      error: (error) => {

        console.error(
          'Error loading uploaded gallery images:',
          error
        );

        this.photos = manualPhotos;
      }

    });
  }

  openPhoto(image: string): void {
    this.selectedPhoto = image;
  }

  closePhoto(): void {
    this.selectedPhoto = null;
  }

  imageLoaded(url: string): void {
    console.log('IMAGE LOADED SUCCESSFULLY:', url);
  }

  imageFailed(url: string): void {
    console.error('IMAGE FAILED TO LOAD:', url);
  }
}