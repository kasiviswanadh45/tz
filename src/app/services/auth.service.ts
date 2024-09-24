
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { UserProfileDTO } from '../Models/UserProfileDTO';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject = new BehaviorSubject<string | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();
  private apiUrl = 'http://localhost:8080/api/auth';  // User login base URL
  private adminUrl = 'http://localhost:8080/api/admin'; // Admin login base URL
  private BaseUrl = 'http://localhost:8080/api/user/profile';
  private tokenKey = 'token'; // Key to store JWT in localStorage

  constructor(private http: HttpClient) {
    this.loadCurrentUserFromToken(); // Load user from token on service initialization
  }

  // Register a new user
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData).pipe(
      catchError(this.handleError) // Handle errors
    );
  }

  // Login a user or admin
  login(credentials: any, isAdmin: boolean = false): Observable<any> {
    const loginUrl = isAdmin ? `${this.adminUrl}/login` : `${this.apiUrl}/login`; // Select the endpoint based on role
  
    return this.http.post(loginUrl, credentials).pipe(
      tap((response: any) => {
        if (response.token) {
          this.storeToken(response.token); // Store JWT token
          this.setCurrentUserFromToken(response.token); // Decode token and update current user
        }
      }),
      catchError(this.handleError) // Handle errors
    );
  }

  // Check if user is authenticated by verifying the token in localStorage
  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      const isTokenExpired = this.isTokenExpired(token);
      return !isTokenExpired; // Return true if token is not expired
    }
    return false; // Return false if no token is found
  }

  // Check if the JWT token is expired
  private isTokenExpired(token: string): boolean {
    const decodedToken = this.decodeToken(token);
    if (!decodedToken.exp) {
      return false; // If no expiration is present, consider the token valid
    }
    const expirationDate = new Date(0);
    expirationDate.setUTCSeconds(decodedToken.exp); // Convert exp to a date
    return expirationDate < new Date(); // Return true if the token is expired
  }

  // Store JWT token in localStorage
  private storeToken(token: string): void {
    localStorage.setItem(this.tokenKey, token); // Save token in local storage
  }

  // Manually decode JWT token and update currentUserSubject
  private setCurrentUserFromToken(token: string): void {
    try {
      const decodedToken: any = this.decodeToken(token); // Manually decode JWT token
      const userName = decodedToken?.firstName || decodedToken?.email || decodedToken?.sub; // Get username, email, or sub (fallback)
      this.currentUserSubject.next(userName); // Set current user name or email
    } catch (error) {
      console.error('Error decoding token:', error);
      this.logout(); // If decoding fails, log out the user
    }
  }

  // Manually decode a JWT token
  private decodeToken(token: string): any {
    const payload = token.split('.')[1]; // Get the payload part of the token
    const decodedPayload = atob(payload); // Decode the Base64-encoded payload
    return JSON.parse(decodedPayload); // Parse it as JSON
  }

  // Load current user from token (for page reloads)
  private loadCurrentUserFromToken(): void {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      this.setCurrentUserFromToken(token); // Decode token and set current user
    }
  }

  // Get current user observable
  getCurrentUser(): Observable<string | null> {
    return this.currentUser$;
  }

  // Get User Profile
  getUserProfile(): Observable<UserProfileDTO> {
    const token = localStorage.getItem(this.tokenKey);  // Get JWT token from localStorage
    if (!token) {
      throw new Error('User is not logged in');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`  // Attach the JWT token in the Authorization header
    });

    return this.http.get<UserProfileDTO>(this.BaseUrl, { headers }).pipe(
      catchError(this.handleError) // Handle errors
    );
  }

  // Update user profile
  updateUserProfile(userProfile: UserProfileDTO): Observable<UserProfileDTO> {
    const token = localStorage.getItem(this.tokenKey);
    if (!token) {
      throw new Error('User is not logged in');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`  // Add the token to the Authorization header
    });

    return this.http.put<UserProfileDTO>(this.BaseUrl, userProfile, { headers }).pipe(
      catchError(this.handleError) // Handle errors
    );
  }

  // Logout the user
  logout(): void {
    localStorage.removeItem(this.tokenKey); // Remove the JWT token from localStorage
    this.currentUserSubject.next(null); // Clear the user data on the frontend
  }

  // Error handling
  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError(() => new Error('An error occurred: ' + error.message));
  }
 

}




