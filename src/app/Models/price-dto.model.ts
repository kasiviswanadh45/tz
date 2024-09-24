// export interface PriceDTO {
//     sanitizedimageUrl: any;
//     type: string;
//     priceId: number;
//     areaId: number;
//     productId: number;
//     productName: string;
//     productType: string;
//     imageUrl?: string;
//     price: number;
//     date: string;
//   }

import { SafeUrl } from "@angular/platform-browser";



export interface PriceDTO {
  sanitizedImageUrl?: SafeUrl;  // Updated to string as it's likely a URL after sanitization
  type: string;                // Ensure this aligns with a consistent type (e.g., 'vegetable', 'grocery')
  priceId: number;             // Unique identifier for the price entry
  areaId: number;              // ID of the area associated with this price
  productId: number;           // ID of the product associated with this price
  productName: string;         // Name of the product
  productType: string;         // Type of the product (e.g., 'Vegetable', 'Grocery')
  imageUrl?: string;           // Optional URL of the product image
  price: number;               // Price value
  date: string;
  areaName: string;                 // Date of the price entry, likely in 'YYYY-MM-DD' format
}