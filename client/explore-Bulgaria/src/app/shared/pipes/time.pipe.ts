import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'time',
})
export class TimePipe implements PipeTransform {
    transform(date: string, ...args: unknown[]): unknown {
        return moment(date).format('h:mm:ss a');
    }
}
