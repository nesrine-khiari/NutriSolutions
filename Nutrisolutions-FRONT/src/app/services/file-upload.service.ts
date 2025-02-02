import { inject, Injectable } from '@angular/core';
import { APP_API } from '../core/constants/constants.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  apiUrl = APP_API.base_url + '/upload';
  constructor() {}
  http = inject(HttpClient);
  logger = inject(LoggerService);
  uploadImage(image: File): Observable<FileUploadResponse> {
    var formData: FormData = new FormData();
    formData.append('file', image);
    this.logger.debug('File is: ', formData.get('file'));

    return this.http.post<FileUploadResponse>(`${this.apiUrl}/image`, formData);
  }
  uploadFile(file: File): Observable<FileUploadResponse> {
    var formData: FormData = new FormData();
    formData.append('file', file);
    this.logger.debug('File is: ' + formData.get('file'));

    return this.http.post<FileUploadResponse>(`${this.apiUrl}/file`, formData);
  }
  downloadCertificate(filename: string): Observable<Blob> {
    return this.http.get(this.apiUrl + '/' + filename, {
      responseType: 'blob',
    });
  }
}
export interface FileUploadResponse {
  message: string;
  filename: string;
  path: string;
}
