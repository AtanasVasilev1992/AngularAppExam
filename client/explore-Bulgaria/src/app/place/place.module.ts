import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlacesComponent } from './places/places.component';
import { AddPlaceComponent } from './add-place/add-place.component';
import { SharedModule } from '../shared/shared.module';
import { PlaceRoutinModule } from './place-routing.module';
import { DetailsComponent } from './details/details.component';





@NgModule({
  declarations: [
    PlacesComponent,
    AddPlaceComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PlaceRoutinModule,
  ],
  exports: [
    PlacesComponent,
    AddPlaceComponent,
    DetailsComponent,
  ]
})
export class PlaceModule { }
