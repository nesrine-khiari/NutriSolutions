import { inject, Injectable } from '@angular/core';
import { APP_API } from '../core/constants/constants.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  apiUrl = APP_API.base_url + '/upload';
  constructor() {}
  http = inject(HttpClient);

  uploadImage(theme: string, image: File): Observable<ImageUploadResponse> {
    var formData: FormData = new FormData();
    formData.append('file', image);
    console.log(formData.get('file'));

    return this.http.post<ImageUploadResponse>(`${this.apiUrl}`, formData);
  }
}
export interface ImageUploadResponse {
  message: string;
  filename: string;
  path: string;
}
