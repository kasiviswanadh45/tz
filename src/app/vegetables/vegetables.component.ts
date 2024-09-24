import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProductuserService } from '../services/productuser.service';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { PriceHistoryComponent } from '../components/price-history/price-history.component';
import { MatDialog } from '@angular/material/dialog';
import { ProductDTO } from '../Models/product.model';
import { LatestUpdatesComponent } from '../latest-updates/latest-updates.component';
import { SelectionService } from '../selection.service';

@Component({
  selector: 'app-vegetables',
  standalone: true,
  imports: [
    CommonModule, 
    MatPaginatorModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatRadioModule, 
    FormsModule,
    LatestUpdatesComponent
  ],
  templateUrl: './vegetables.component.html',
  styleUrls: ['./vegetables.component.css']  // Corrected to use 'styleUrls'
})
export class VegetablesComponent implements OnInit {
  displayedColumns: string[] = ['image', 'name', 'description', 'wholesalePrice', 'units', 'actions'];
  dataSource = new MatTableDataSource<ProductDTO>([]);
  totalLength = 0;
  pageSize = 10;
  selectedType: string = 'all';
  areaId: number | null = null; 
  productId: number | null = null;

  constructor(private productuserservice: ProductuserService,
              private selectionService: SelectionService,
              public dialog: MatDialog) {}

  ngOnInit() {
    // Load all products by default
    this.loadAllProducts();

    // Subscribe to area selection changes
    this.selectionService.areaId$.subscribe((areaId) => {
      if (areaId !== null) {
        this.areaId = areaId;
        this.loadProductsForArea(areaId);
      } else {
        // If no area is selected, reload all products
        this.loadAllProducts();
      }
    });
  }

  // Method to load all products (as per the original behavior)
  loadAllProducts() {
    this.productuserservice.getAllProducts().subscribe({
      next: (data) => {
        console.log('Fetched all products:', data); // Debugging line
        this.dataSource.data = this.sanitizeImageUrls(data);  // Sanitize image URLs before assigning
        this.totalLength = data.length;
      },
      error: (error) => {
        console.error('Error fetching all products:', error);
      }
    });
  }

  // Method to load products for a specific area
  loadProductsForArea(areaId: number) {
    this.productuserservice.getProductsByArea(areaId).subscribe({
      next: (data) => {
        console.log('Fetched products for area:', data);
        this.dataSource.data = this.sanitizeImageUrls(data);  // Sanitize image URLs before assigning
        this.totalLength = data.length;
      },
      error: (error) => {
        console.error('Error fetching products for area:', error);
      }
    });
  }

  // Method to load products based on selected type (all, vegetable, grocery)
  loadProducts() {
    if (this.selectedType === 'all') {
      this.loadAllProducts(); // Load all products by default
    } else {
      this.productuserservice.getProductsByType(this.selectedType).subscribe({
        next: (data) => {
          console.log('Fetched products by type:', data); // Debugging line
          this.dataSource.data = this.sanitizeImageUrls(data);  // Sanitize image URLs before assigning
          this.totalLength = data.length;
        },
        error: (error) => {
          console.error('Error fetching products by type:', error);
        }
      });
    }
  }

  // Method to sanitize the imageUrl field
  sanitizeImageUrls(products: ProductDTO[]): ProductDTO[] {
    return products.map(product => {
      if (product.imageUrl) {
        // Regex to extract the URL part before any space or attribute
        const sanitizedUrl = product.imageUrl.match(/^[^\s]+/g)?.[0] || '';
        product.imageUrl = sanitizedUrl.replace(/"|'/g, ''); // Remove any extra quotes
      }
      return product;
    });
  }

  // Method to handle changes in product type selection (all, vegetable, grocery)
  onTypeChange(type: string) {
    this.selectedType = type;
    this.loadProducts(); // Reload products based on the selected type
  }

  // Method to handle pagination (if needed)
  onPageChange(event: any) {
    console.log('Page changed to:', event.pageIndex + 1);
    // Load a new set of data based on the page index if your backend supports pagination
  }

  // Open price history dialog
  openPriceHistoryDialog() {
    const areaId = this.areaId !== null ? this.areaId : 0; // Default to 0 or any valid number
    const productId = this.productId !== null ? this.productId : 0; // Default to 0 or any valid number

    const dialogRef = this.dialog.open(PriceHistoryComponent, {
      width: '1200px',
      height: '1000px',
      data: { areaId, productId }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
