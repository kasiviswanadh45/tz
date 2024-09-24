import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private apiUrl = 'http://localhost:8080/api/states';

  constructor(private http: HttpClient) { }

  getAllStates(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl);
  }
  
}
