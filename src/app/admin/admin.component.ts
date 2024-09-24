import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { UploadComponent } from '../../upload/upload.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProductService } from '../services/product.service';
import { GetProductsComponent } from '../get-products/get-products.component';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatDialogModule
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  
  constructor(private router: Router, private dialog: MatDialog, private productService: ProductService) {}

  navigateTo(section: string) {
    if (section === '/upload') {
      this.openUploadDialog(); // Open the upload dialog
    } else if (section === '/getproduct') {
      this.openGetProductsDialog(); // Open the Get Products dialog
    } else if (section === '/productform') {  // Add this to open Product Form dialog
      this.openProductFormDialog(); // Open Product Form dialog
    } else {
      this.router.navigate([section]);
    }
  }

  openUploadDialog() {
    const dialogRef = this.dialog.open(UploadComponent, {
      width: '400px',
      disableClose: false,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Upload dialog was closed');
    });
  }

  openGetProductsDialog() {
    const dialogRef = this.dialog.open(GetProductsComponent, {
      width: '600px',
      disableClose: false,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Get Products dialog was closed');
    });
  }

  // New function to open Product Form dialog
  openProductFormDialog() {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '600px', // Set the size of the dialog
      disableClose: false,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Product Form dialog was closed');
    });
  }
  
  


}
