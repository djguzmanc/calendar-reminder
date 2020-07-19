import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, maxChars: number): string {
    return value.slice(0, maxChars) + (value.length > maxChars ? '...' : '');
  }

}
