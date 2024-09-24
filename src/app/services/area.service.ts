import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Area } from '../Models/area.model';

@Injectable({
  providedIn: 'root'
})
export class AreaService {
 

  private apiUrl = 'http://localhost:8080/api/areas';

  constructor(private http: HttpClient) { }

  getAreasByDistrict(districtId: number): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/district/${districtId}`);
  }

  getAreas(): Observable<Area[]> {
    return this.http.get<Area[]>(this.apiUrl); // Ensure this endpoint returns all areas
  }
}
