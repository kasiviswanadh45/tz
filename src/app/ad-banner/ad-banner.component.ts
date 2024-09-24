import { AfterViewInit, Component, Input } from '@angular/core';

@Component({
  selector: 'app-ad-banner',
  standalone: true,
  imports: [],
  templateUrl: './ad-banner.component.html',
  styleUrl: './ad-banner.component.css'
})
export class AdBannerComponent implements AfterViewInit {
  @Input() adClient = 'ca-pub-XXXXXXXXXXXXX'; // Replace with your AdSense publisher ID
  @Input() adSlot = '1234567890'; // Replace with your AdSense ad slot ID
  @Input() adFormat = 'auto';
  @Input() adFullWidthResponsive = 'true';

  constructor() {}

  ngAfterViewInit() {
    this.loadAds();
  }

  loadAds() {
    try {
       // Assert that window has 'adsbygoogle'
       (window as any)['adsbygoogle'] = (window as any)['adsbygoogle'] || [];
       (window as any)['adsbygoogle'].push({});
     } catch (e) {
       console.error('Error loading ads:', e);
     }
    }
  }
