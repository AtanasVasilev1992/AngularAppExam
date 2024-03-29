import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlacesComponent } from './places/places.component';
import { AddPlaceComponent } from './add-place/add-place.component';
import { SharedModule } from '../shared/shared.module';
import { DetailsModule } from './details/details.module';



@NgModule({
  declarations: [
    PlacesComponent,
    AddPlaceComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    PlacesComponent,
    AddPlaceComponent,
    DetailsModule,
  ]
})
export class PlaceModule { }
