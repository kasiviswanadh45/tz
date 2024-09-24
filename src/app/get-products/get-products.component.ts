import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ProductDTO } from '../Models/product.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-get-products',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,        // Import MatTableModule here
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './get-products.component.html',
  styleUrl: './get-products.component.css'
})
export class GetProductsComponent implements OnInit {
  displayedColumns: string[] = ['image', 'name', 'description', 'wholesalePrice', 'units', 'actions'];
  products: ProductDTO[] = [];
  

  constructor(private productService: ProductService,private dialogRef: MatDialogRef<GetProductsComponent>) {}
  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getAllProducts().subscribe(
      (data: ProductDTO[]) => {
        this.products = data;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  openPriceHistoryDialog() {
    // Logic to open price history dialog
    console.log('Open Price History Dialog');
  }

  closeDialog() {
    this.dialogRef.close();
  }

 

}
