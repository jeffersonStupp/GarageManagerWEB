import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'porcentagem'
})
export class Porcentagem implements PipeTransform {

  transform(value: number): string {
    
    if (isNaN(value)) {
      return 'Valor inválido';
    }


    return value + '%';
  }

}
