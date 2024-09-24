import { Component, OnInit } from '@angular/core';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
  ],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css'
})
export class LoadingComponent implements OnInit{

  isLoading = true;
  blinkCount = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.startBlinking();
  }

  startBlinking(): void {
    const interval = setInterval(() => {
      this.isLoading = !this.isLoading;
      this.blinkCount++;
      if (this.blinkCount >= 3) {
        clearInterval(interval);
        setTimeout(() => {
          this.redirectToHome();
        }, 1000);
      }
    }, 500);
  }

  redirectToHome(): void {
  this.router.navigate(['/login']); // Navigate to login
  }
 

}
