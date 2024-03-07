import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'telefoneFixo'
})
export class TelefoneFixoPipe implements PipeTransform {
  transform(value: any): string {
    // Remove caracteres não numéricos do valor
    const cleanedValue = value.replace(/\D/g, '');

    // Verifica se o valor está vazio ou possui um tamanho inválido
    if (!cleanedValue || cleanedValue.length !== 10) {
      return value;
    }

    // Formata o telefone no formato "(00) 0000-0000"
    return `(${cleanedValue.substring(0, 2)}) ${cleanedValue.substring(2, 6)}-${cleanedValue.substring(6)}`;
  }
}
