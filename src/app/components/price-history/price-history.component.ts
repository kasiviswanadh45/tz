import { Component, Inject, OnInit, AfterViewInit } from '@angular/core';
import { PriceService } from '../../services/price.service';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { PriceDTO } from '../../Models/price-dto.model';
import { AreaService } from '../../services/area.service';
import { Area } from '../../Models/area.model';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Chart, registerables } from 'chart.js';
import * as XLSX from 'xlsx';
import { ProductService } from '../../services/product.service';
import { ProductDTO } from '../../Models/product.model';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-price-history',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatTableModule,
    FormsModule,
    MatIconModule,
    MatCardModule,
  ],
  templateUrl: './price-history.component.html',
  styleUrls: ['./price-history.component.css']
})
export class PriceHistoryComponent implements OnInit, AfterViewInit {
  priceHistory: PriceDTO[] = []; // Shared state for both table and chart
  startDate!: Date;
  endDate!: Date;
  areaId: number | null = null;
  productId: number | null = null;
  chart: Chart | undefined;
  availableAreas: Area[] = [];
  availableProducts: ProductDTO[] = [];

  constructor(
    private priceService: PriceService,
    private areaService: AreaService,
    private sanitizer: DomSanitizer,
    private productService: ProductService,
    public dialogRef: MatDialogRef<PriceHistoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { areaId: number, productId: number }
  ) {
    this.areaId = data.areaId || null;
    this.productId = data.productId || null;
    Chart.register(...registerables);
    this.registerImagePlugin();
  }

  ngOnInit(): void {
    this.loadAvailableAreas();
    this.loadAvailableProducts();
  }

  ngAfterViewInit(): void {
    this.initializeChart();
    this.fetchPriceHistory(); // Fetch and display data when the component loads
  }

  setDefaultDateRange() {
    const today = new Date();
    this.endDate = today;
    this.startDate = new Date(today.setDate(today.getDate() - 7)); // Set default to 1 week ago
  }
  setDateRange(days: number) {
    const today = new Date();
    this.endDate = today;  // Set endDate to today, without modifying it.
  
    // Clone the `today` date for startDate, and then subtract the days
    this.startDate = new Date();
    this.startDate.setDate(today.getDate() - days);  // Set the startDate based on the selected range
  
    // Now fetch the price history based on the selected date range
    this.fetchPriceHistory();
  }
  
  

  loadAvailableAreas() {
    this.areaService.getAreas().subscribe(
      (areas: Area[]) => {
        this.availableAreas = areas;
        console.log('Areas loaded:', this.availableAreas);
      },
      (error) => {
        console.error('Error loading areas', error);
      }
    );
  }

  loadAvailableProducts() {
    this.productService.getAllProducts().subscribe(
      (products: ProductDTO[]) => {
        this.availableProducts = products;
        console.log('Products loaded:', this.availableProducts);
      },
      (error) => {
        console.error('Error loading products', error);
      }
    );
  }

  fetchPriceHistory() {
    if (this.areaId && this.startDate && this.endDate && this.productId !== null) {
      const formattedStartDate = this.formatDate(this.startDate);
      const formattedEndDate = this.formatDate(this.endDate);
  
      this.priceService.getPriceHistory(this.areaId, this.productId, formattedStartDate, formattedEndDate)
        .subscribe(
          (data: PriceDTO[]) => {
            // Filter out entries where the price is null or not a finite number
            const filteredData = data.filter(item => item.price != null && isFinite(item.price));
  
            this.priceHistory = filteredData.map(item => {
              let cleanUrl = item.imageUrl;
  
              // If imageUrl is null or undefined, use a placeholder image
              if (!cleanUrl) {
                cleanUrl = 'assets/images/placeholder.png';  // Ensure this path is correct
              } else {
                // Clean up the imageUrl if necessary
                cleanUrl = cleanUrl.split('"')[0]; // Split by " and take the first part
                cleanUrl = cleanUrl.replace(/\".*$/, ''); // Remove everything after the first quote if present
              }
  
              // Sanitize the cleaned URL
              const sanitizedUrl = this.sanitizeUrl(cleanUrl);
  
              return {
                ...item,
                sanitizedImageUrl: sanitizedUrl // Ensure property name matches the interface
              };
            });
  
            console.log('Filtered price history loaded:', this.priceHistory);
            this.updateChart();  // Update the chart with the filtered data
          },
          error => {
            console.error('Error fetching price history:', error); // Handle any errors from the API call
          }
        );
    } else {
      console.warn('Area ID, Product ID, or date range is invalid. Cannot fetch price history.');
    }
  }
  

  private registerImagePlugin() {
    const imagePlugin = {
      id: 'imagePlugin',
      afterDatasetsDraw: (chart: any) => {
        const ctx = chart.ctx;
        const xAxis = chart.scales['x'];
        const yAxis = chart.scales['y'];

        this.priceHistory.forEach((item, index) => {
          const x = xAxis.getPixelForValue(item.date);
          const y = yAxis.getPixelForValue(item.price);
          const img = new Image();
          img.src = item.sanitizedImageUrl as string;

          img.onload = () => {
            console.log('Image loaded:', img.src);

            ctx.save(); // Save the current canvas state
            ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'; // Shadow color
            ctx.shadowBlur = 10; // Shadow blur effect
            ctx.shadowOffsetX = 0; // Horizontal shadow offset
            ctx.shadowOffsetY = 0; // Vertical shadow offset

            // Draw the image
            ctx.drawImage(img, x - 12, y - 12, 24, 24);

            ctx.restore(); // Restore the previous canvas state
          };

          img.onerror = (err) => {
            console.error('Error loading image:', img.src, err); // Handle image load errors
          };
        });
      }
    };

    // Register the plugin globally
    Chart.register(imagePlugin);
  }

  private initializeChart() {
    const ctx = document.getElementById('priceChart') as HTMLCanvasElement;
    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: [], // Initially empty, filled by updateChart()
          datasets: [
            {
              label: 'Rupees',
              data: [], // Initially empty, filled by updateChart()
              borderColor: 'blue',
              backgroundColor: 'rgba(75,192,192,0.2)',
              fill: true,
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: 'Date'
              }
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Price'
              }
            }
          }
        }
      });
    } else {
      console.error("Chart context not found. Ensure the canvas element with id 'priceChart' exists in the DOM.");
    }
  }

  private updateChart() {
    if (this.chart) {
      // Use the shared priceHistory data
      const labels = this.priceHistory.map(item => item.date);
      const prices = this.priceHistory.map(item => item.price);

      if (labels.length === 0 || prices.length === 0) {
        console.warn("No valid data available to display on the chart.");
        return;
      }

      this.chart.data.labels = labels;
      this.chart.data.datasets[0].data = prices;
      this.chart.update();
    } else {
      console.error("Chart has not been initialized.");
    }
  }

  private formatDate(date: Date): string {
    const d = new Date(date);
    const month = '' + (d.getMonth() + 1);
    const day = '' + d.getDate();
    const year = d.getFullYear();

    return [year, month.padStart(2, '0'), day.padStart(2, '0')].join('-');
  }

  sanitizeUrl(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  downloadData(format: string) {
    if (format === 'excel') {
      this.downloadExcel();
    }
  }

  downloadExcel() {
    // Creating a new worksheet with a custom header
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.priceHistory.map(item => ({
      Date: item.date,
      Product: item.productName,
      Type: item.productType,
      Price: item.price,
      ImageURL: item.imageUrl
    })));

    // Creating a new workbook and adding the worksheet to it
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Price History');

    // Adjust column width for better readability
    const wscols = [
      { wch: 15 }, // Date
      { wch: 20 }, // Product
      { wch: 15 }, // Type
      { wch: 10 }, // Price
      { wch: 30 }  // ImageURL
    ];
    ws['!cols'] = wscols;

    // Save the workbook as an Excel file
    XLSX.writeFile(wb, 'price-history.xlsx');
  }

    // Filter for the "To Date" field to disallow future dates
    toDateFilter = (date: Date | null): boolean => {
      const today = new Date();
      return (date || today) <= today;
    };
}
