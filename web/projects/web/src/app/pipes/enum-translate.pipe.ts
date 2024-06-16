import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumTranslate',
  standalone: true,
})
export class EnumTranslationPipe implements PipeTransform {
  transform(productionLocation: Object): string[] {
    const keys = Object.keys(productionLocation);
    return keys.slice(keys.length / 2);
  }
}
