import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  private apiUrl = 'http://localhost:8080/api/reset-password'; // Backend endpoint

  constructor(private http: HttpClient) {}

  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(this.apiUrl, { token, newPassword });
  }
}
