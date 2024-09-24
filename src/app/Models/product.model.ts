export interface ProductDTO {
    productId: number;
    productName: string;
    productType: string;
    description?: string;
    imageUrl?: string;
    wholesalePrice?: number;
    units?: string;
    areaId?: number;
  }