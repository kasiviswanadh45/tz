import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paginate',
  standalone: true
})
export class PaginatePipe implements PipeTransform {

  
  transform(items: any[], pageSize: number, currentPage: number): any[] {
    if (!items || items.length === 0) return [];
    const startIndex = (currentPage - 1) * pageSize;
    return items.slice(startIndex, startIndex + pageSize);
  }

}
