import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';
import { PriceDTO } from '../Models/price-dto.model';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  private baseUrl = 'http://localhost:8080/api/price/history';  // Adjust the base URL as needed

  constructor(private http: HttpClient) { }

  getPriceHistory(areaId: number, productId: number, startDate: string, endDate: string): Observable<PriceDTO[]> {
    const url = `${this.baseUrl}/area/${areaId}?productId=${productId}&startDate=${startDate}&endDate=${endDate}`;
    return this.http.get<PriceDTO[]>(url);
  }
  }



