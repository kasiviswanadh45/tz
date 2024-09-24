import { Component, OnInit } from '@angular/core';
import { PriceService } from '../services/price.service';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { PriceDTO } from '../Models/price-dto.model';

@Component({
  selector: 'app-latest-updates',
  standalone: true,
  imports: [ MatTableModule,CommonModule,],
  templateUrl: './latest-updates.component.html',
  styleUrl: './latest-updates.component.css'
})
export class LatestUpdatesComponent implements OnInit{
  latestPrices: PriceDTO[] = []; // Using PriceDTO for proper typing
  displayedColumns: string[] = ['productName', 'price', ]; // Define the columns for the table

  constructor(private priceService: PriceService) {}

  ngOnInit(): void {
    this.fetchLatestPrices();
  }

  fetchLatestPrices(): void {
    this.priceService.getLatestUpdates().subscribe(
      (data: PriceDTO[]) => {
        this.latestPrices = data;
      },
      (error) => {
        console.error('Error fetching latest prices:', error);
      }
    );
  }

  }


