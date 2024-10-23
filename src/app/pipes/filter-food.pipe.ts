import { Pipe, PipeTransform } from '@angular/core';
import FoodModel from '../models/FoodModel';
import { Observable } from 'rxjs';

@Pipe({
  name: 'filterFood',
  standalone: true
})
export class FilterFoodPipe implements PipeTransform {

  transform(value: FoodModel[] | null, ...args: unknown[]): FoodModel[] {
    console.log(args);
    
    if (value) {
      console.log(value);
    
      return value;
    }
    return [];
  }

}
