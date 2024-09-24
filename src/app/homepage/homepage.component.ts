import { Component, OnInit } from '@angular/core';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
;
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { ProductDTO } from '../Models/product.model'; 

import { VegetablesComponent } from '../vegetables/vegetables.component';
// Angular Material Modules
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { PaginatePipe } from "../paginate.pipe";
import { NgxPaginationModule } from 'ngx-pagination';
import { SliderComponent } from '../slider/slider.component';

import { FooterComponent } from '../footer/footer.component';
@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
   
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    
    NavbarComponent,
    MatTableModule,
    MatCardModule, // Material Card Module
    MatRadioModule, // Material Radio Module
    MatPaginatorModule,
    PaginatePipe,
    NgxPaginationModule,
    SliderComponent,
    VegetablesComponent,
   
    FooterComponent

],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  
  
 
  }
  



