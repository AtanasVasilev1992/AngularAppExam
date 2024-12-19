import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter',
})
export class FilterPipe implements PipeTransform {
    transform(items: any[], searchText: string, propertyName: string): any[] {
        if (!items || !searchText || !propertyName) {
            return items;
        }

        searchText = searchText.toLowerCase();

        return items.filter((item) => {
            const value = item[propertyName].toLowerCase();
            return value.includes(searchText);
        });
    }
}
