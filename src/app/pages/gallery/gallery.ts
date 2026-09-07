import {
Component,
OnInit,
ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
GalleryService,
GalleryImage
} from '../../services/gallery.service';

import { environment } from '../../../environments/environment';

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

private readonly apiBaseUrl = environment.apiUrl;

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

    const uploadedPhotos: GalleryPhoto[] =
      images.map((image: GalleryImage) => {

        const imageUrl =
          `${this.apiBaseUrl}${image.filePath}`;

        return {
          image: imageUrl,
          title: image.fileName
        };
      });

    this.photos = [
      ...manualPhotos,
      ...uploadedPhotos
    ];

    this.cdr.detectChanges();
  },

  error: (error) => {

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
void url;
}

imageFailed(url: string): void {
void url;
}
}
