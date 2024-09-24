import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatDialogRef } from '@angular/material/dialog';
import { Area } from '../Models/area.model';
import { AreaService } from '../services/area.service';


@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,        // Import MatTableModule here
    MatIconModule,
    MatFormFieldModule,     // Import MatFormFieldModule
    MatInputModule,
    MatSelectModule,
    MatCardModule, 
    ReactiveFormsModule,
  ],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit{
productForm!: FormGroup;
areaId: number | null = null;
availableAreas: Area[] = [];

constructor(private fb: FormBuilder, private productService: ProductService,
   private dialogRef: MatDialogRef<ProductFormComponent>) {
   
   }

ngOnInit(): void {
  this.buildProductForm();
  
  
}

buildProductForm() {
  this.productForm = this.fb.group({
    productName: ['', Validators.required],
    type: ['', Validators.required],
    
    description: [''],
    wholesalePrice: ['', [Validators.required, Validators.min(0)]],
    units: ['', Validators.required],
    imageurl: ['', Validators.required]
  });
}

onSubmit() {
  if (this.productForm.valid) {
    const productData = this.productForm.value;
    this.productService.createProduct(productData).subscribe(
      (response) => {
        console.log('Product updated successfully:', response);
      },
      (error) => {
        console.error('Error updating product:', error);
      }
    );
  }
}

closeDialog() {
  this.dialogRef.close();
}

}




















