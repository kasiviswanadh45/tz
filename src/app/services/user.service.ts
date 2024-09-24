import { Injectable } from '@angular/core';
import { UserProfileDTO } from '../Models/UserProfileDTO';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/api/user/profile'; 
  private updateProfileUrl = 'http://localhost:8080/api/user/profile/update'; // Update this URL
  private createProfileUrl = 'http://localhost:8080/api/user/profile/create';
  constructor(private http: HttpClient) {}

  
  getUserProfileByToken(): Observable<UserProfileDTO> {
    const token = localStorage.getItem('token');  // Retrieve the JWT token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,  // Ensure the token is sent with the request
    });

    return this.http.get<UserProfileDTO>(this.apiUrl, { headers });
  }

  updateUserProfile(profileData: FormData): Observable<any> {
    const token = localStorage.getItem('token');  // Retrieve the JWT token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,  // Ensure the token is sent with the request
    });

    return this.http.put(this.updateProfileUrl, profileData, { headers });
  }

    // New method to create a user profile (POST)
    createUserProfile(profileData: FormData): Observable<any> {
      const token = localStorage.getItem('token');  // Retrieve the JWT token
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,  // Ensure the token is sent with the request
      });
  
      return this.http.post(this.createProfileUrl, profileData, { headers });
    }
 
}
