import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DistrictService {

  private apiUrlDistricts = 'http://localhost:8080/api/districts';

  constructor(private http: HttpClient) { }

  // Fetch districts by state ID
  getDistrictsByState(stateId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrlDistricts}/state/${stateId}`);
  }
}
