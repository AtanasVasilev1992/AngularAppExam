import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlacesComponent } from './places/places.component';
import { AddPlaceComponent } from './add-place/add-place.component';
import { SharedModule } from '../shared/shared.module';
import { PlaceRoutinModule } from './place-routing.module';
import { DetailsComponent } from './details/details.component';
import { FormsModule } from '@angular/forms';
import { EditPlaceComponent } from './edit-place/edit-place.component';

@NgModule({
  declarations: [
    PlacesComponent,
    AddPlaceComponent,
    DetailsComponent,
    EditPlaceComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PlaceRoutinModule,
    FormsModule
  ],
  exports: [
    PlacesComponent,
    AddPlaceComponent,
    DetailsComponent,
  ]
})
export class PlaceModule { }
