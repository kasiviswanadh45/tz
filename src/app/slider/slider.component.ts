import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule, // Import MatButtonModule if using mat-button
  ],
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'], // Ensure this is 'styleUrls' and not 'styleUrl'
})
export class SliderComponent implements OnInit, OnDestroy {
  carousels = [
    {
      title: 'Carousel 1',
      items: [
         { imageUrl: '/assets/images/Banner10.jpg', caption: 'Image 1' },
        { imageUrl: 'assets/images/Banner_06.jpg', caption: 'Image 2' },
        { imageUrl: 'assets/images/Banner8.jpg', caption: 'Image 3' },
      ],
      currentIndex: 0,
    },
    // Add more carousels if needed
  ];

  private intervalId: any;

  ngOnInit(): void {
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.carousels.forEach((carousel, index) => {
        this.next(index);
      });
    }, 3000); // Slide every 2 seconds
  }

  prev(carouselIndex: number) {
    const carousel = this.carousels[carouselIndex];
    carousel.currentIndex =
      carousel.currentIndex === 0
        ? carousel.items.length - 1
        : carousel.currentIndex - 1;
  }

  next(carouselIndex: number) {
    const carousel = this.carousels[carouselIndex];
    carousel.currentIndex =
      carousel.currentIndex === carousel.items.length - 1
        ? 0
        : carousel.currentIndex + 1;
  }
}
