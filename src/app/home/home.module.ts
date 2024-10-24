import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { FilterFoodPipe } from '../pipes/filter-food.pipe';
import { RecordItemComponent } from '../components/record-item/record-item.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ReactiveFormsModule,
    FilterFoodPipe
  ],
  declarations: [HomePage, RecordItemComponent],
  providers: [FilterFoodPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePageModule {}
