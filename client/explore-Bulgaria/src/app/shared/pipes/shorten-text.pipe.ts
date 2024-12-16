import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenText'
})
export class ShortenTextPipe implements PipeTransform {
  transform(value: string, maxLength: number = 100): string {
    if (!value) return '';
    
    if (value.length <= maxLength) {
      return value;
    }
    
    return value.slice(0, maxLength) + '...';
  }
}