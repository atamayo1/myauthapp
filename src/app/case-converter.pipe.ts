import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'caseConverter',
  standalone: true
})
export class CaseConverterPipe implements PipeTransform {

  transform(value: string, toUpperCase: boolean): string {
    return toUpperCase ? value.toUpperCase() : value.toLowerCase();
  }

}
