import { PipeTransform, Pipe } from '@angular/core';
import {DatePipe} from '@angular/common';

@Pipe({ name: 'customdatepipe' })
export class CustomDatePipe implements PipeTransform{
  transform(date: Date | string): string {
    date = new Date(date);
    let format = 'MMMM-d-y';
    return new DatePipe('en-US').transform(date, format);
  }
}