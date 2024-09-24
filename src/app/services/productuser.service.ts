import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ProductDTO } from '../Models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductuserService {
  private apiUrl = 'http://localhost:8080/api/products';  // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  // GET request to fetch all products
  getAllProducts(): Observable<ProductDTO[]> {
    return this.http.get<ProductDTO[]>(this.apiUrl);
  }

  // GET request to fetch products by type
  getProductsByType(type: string): Observable<ProductDTO[]> {
    return this.http.get<ProductDTO[]>(`${this.apiUrl}/type/${type}`);
  }

  // Method to fetch products by area
  getProductsByArea(areaId: number): Observable<ProductDTO[]> {
    return this.http.get<ProductDTO[]>(`${this.apiUrl}/area/${areaId}`);
  }
}
