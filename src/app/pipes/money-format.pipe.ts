import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'moneyFormat'
})
export class MoneyFormatPipe implements PipeTransform {
  transform(value: number): string {
    if (value || value === 0) {
      // Formate o valor para o formato monetário (R$ 000,00)
      const formattedValue = value.toFixed(2).replace('.', ',');
      return `R$ ${formattedValue}`;
    }
    return '';
  }
}
