import { Pipe, PipeTransform } from '@angular/core';

export type ByteUnit = 'B' | 'KB' | 'MB' | 'GB' | 'TB';

@Pipe({
  name: 'bytes'
})
export class BytesPipe implements PipeTransform {

  static formats: { [key: string]: { max: number, prev?: ByteUnit } } = {
    'B': { max: 1024 },
    'KB': { max: Math.pow(1024, 2), prev: 'B' },
    'MB': { max: Math.pow(1024, 3), prev: 'KB' },
    'GB': { max: Math.pow(1024, 4), prev: 'MB' },
    'TB': { max: Number.MAX_SAFE_INTEGER, prev: 'GB' }
  };


  transform(input: any, decimal: number = 0, from: ByteUnit = 'B'): any {
    if (isNaN(parseFloat(String(input))) || !isFinite(input)) return '?';

    let bytes = input;
    let unit = from;
    while (unit !== 'B') {
      bytes *= 1024;
      unit = BytesPipe.formats[unit].prev!;
    }

    for (const key in BytesPipe.formats) {
      const format = BytesPipe.formats[key];
      if (bytes < format.max) {

        const prev = format.prev ? BytesPipe.formats[format.prev] : undefined;

        const result = prev ?
          this.toDecimal(bytes / prev.max, decimal) :
          this.toDecimal(bytes, decimal);

        return `${result} ${key}`;
      }
    }
  }

  private toDecimal(value: number, decimal: number): number {
    return Math.round(value * Math.pow(10, decimal)) / Math.pow(10, decimal);
  }
}
