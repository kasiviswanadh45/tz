import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DistrictServiceService {

  private apiUrl = '/api/districts';

  constructor(private http: HttpClient) { }

  getDistrictsByState(stateId: number): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/state/${stateId}`);
  }
}
