import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface GalleryImage {
  id: number;
  fileName: string;
  filePath: string;
  uploadedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  private apiUrl = 'https://localhost:44331/api/Gallery';

  constructor(private http: HttpClient) {}

  getGalleryImages(): Observable<GalleryImage[]> {
    return this.http.get<GalleryImage[]>(this.apiUrl);
  }

  uploadImage(file: File): Observable<GalleryImage> {

    const formData = new FormData();

    formData.append('file', file);

    return this.http.post<GalleryImage>(
      `${this.apiUrl}/upload`,
      formData
    );
  }
}