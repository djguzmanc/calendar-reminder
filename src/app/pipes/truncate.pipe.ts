import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe for truncating a string
 */
@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  /**
   * Truncates a string
   * @param value The string to be truncated
   * @param maxChars The max chars to be displayed
   */
  transform(value: string, maxChars: number): string {
    return value.slice(0, maxChars) + (value.length > maxChars ? '...' : '');
  }

}
