import { HttpClient, HttpEvent, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private uploadUrl = 'http://localhost:8080/api/upload';  // Endpoint for uploading files
  private processUrl = 'http://localhost:8080/api/upload/process';  // Endpoint for processing data

  constructor(private http: HttpClient) {}

  // Upload the selected file to the backend
  uploadFile(file: File): Observable<HttpEvent<any>> {
    const formData = new FormData();
    formData.append('file', file);

    // Return an observable to track upload progress
    return this.http.post<HttpEvent<any>>(this.uploadUrl, formData, {
      reportProgress: true, // Enable progress tracking
      observe: 'events'     // Return HttpEvent to track upload progress
    });
  }

  // Trigger the processing of the data on the backend
  processData(): Observable<any> {
    return this.http.post(this.processUrl, {});
  }
}
