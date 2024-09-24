import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PriceDTO } from '../Models/price-dto.model';




@Injectable({
  providedIn: 'root'
})
export class PriceService {

 

  private baseUrl = 'http://localhost:8080/api/price/history'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  // Method to fetch price history for an area with optional productId, startDate, and endDate
  getPriceHistory(areaId: number, productId?: number, startDate?: string, endDate?: string): Observable<PriceDTO[]> {
    let params = new HttpParams();
    if (productId) {
      params = params.append('productId', productId.toString());
    }
    if (startDate) {
      params = params.append('startDate', startDate);
    }
    if (endDate) {
      params = params.append('endDate', endDate);
    }
    const url = `${this.baseUrl}/area/${areaId}`;
    return this.http.get<PriceDTO[]>(url, { params });
  }

  // Method to get prices for a specific area and product
  getPricesByAreaAndProduct(areaId: number, productId: number): Observable<PriceDTO[]> {
    const url = `${this.baseUrl}/area/${areaId}/product/${productId}`;
    return this.http.get<PriceDTO[]>(url);
  }

  // Method to fetch the latest updates (latest prices)
  getLatestUpdates(): Observable<PriceDTO[]> {
    const url = `${this.baseUrl}/latest-updates`;
    return this.http.get<PriceDTO[]>(url);
  }

  // Method to get price details by price ID
  getPriceById(priceId: number): Observable<PriceDTO> {
    const url = `${this.baseUrl}/${priceId}`;
    return this.http.get<PriceDTO>(url);
  }

  // Method to get the list of areas (not sure of the exact endpoint, adjust accordingly)
  getAreas(): Observable<{ id: number, name: string }[]> {
    return this.http.get<{ id: number, name: string }[]>(`${this.baseUrl}/areas`);
  }
  
}
