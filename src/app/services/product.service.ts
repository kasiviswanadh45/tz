import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { ProductDTO } from '../Models/product.model';
import { Area } from '../Models/area.model';



@Injectable({
  providedIn: 'root'
})
export class ProductService {
  getProductsByArea(areaId: number) {
    throw new Error('Method not implemented.');
  }

 
  private baseUrl = 'http://localhost:8080/api/admin/products';
  private apiUrl = 'http://localhost:8080/api/areas';
  constructor(private http: HttpClient) {}

  

  getAllProducts(): Observable<ProductDTO[]> {
    return this.http.get<ProductDTO[]>(this.baseUrl);
  }
  

  getProductsByType(type: string): Observable<ProductDTO[]> {
    return this.http.get<ProductDTO[]>(`${this.baseUrl}/type/${type}`);
  }

  getProductById(productId: number): Observable<ProductDTO> {
    return this.http.get<ProductDTO>(`${this.baseUrl}/${productId}`);
  }

  createProduct(productData: any): Observable<ProductDTO> {
    return this.http.post<ProductDTO>(`${this.baseUrl}`, productData);
  }

  getAreas(): Observable<Area[]> {
    return this.http.get<Area[]>(this.apiUrl); // Ensure this endpoint returns all areas
  }
}
