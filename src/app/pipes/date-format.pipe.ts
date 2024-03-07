import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat',
})
export class DateFormatPipe implements PipeTransform {
  transform(value: any): string {
    if (value) {
      console.log('inicio formatação');
      const date = new Date(value);
      console.log(date);
      const day = this.addLeadingZero(date.getDate());
      const month = this.addLeadingZero(date.getMonth() + 1);
      const year = date.getFullYear();

      return `${day}/${month}/${year}`;
    }
    return '';
  }

  private addLeadingZero(number: number): string {
    return number < 10 ? '0' + number : '' + number;
  }
}
