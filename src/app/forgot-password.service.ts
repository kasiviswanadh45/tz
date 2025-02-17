import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  private apiUrl = 'http://localhost:8080/api/forgot-password'; // Backend endpoint

  constructor(private http: HttpClient) {}

  sendResetLink(email: string): Observable<any> {
    return this.http.post(this.apiUrl, { email });
  }
}
