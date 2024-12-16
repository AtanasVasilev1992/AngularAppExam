import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MuseumsComponent } from './museums/museums.component';
import { AddMuseumComponent } from './add-museum/add-museum.component';
import { DetailsMuseumComponent } from './details-museum/details-museum.component';
import { MuseumRoutinModule } from './museum-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditMuseumComponent } from './edit-museum/edit-museum.component';

@NgModule({
  declarations: [
    MuseumsComponent,
    AddMuseumComponent,
    DetailsMuseumComponent,
    EditMuseumComponent
  ],
  imports: [
    CommonModule,
    MuseumRoutinModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    MuseumsComponent,
    DetailsMuseumComponent,
    AddMuseumComponent
  ]
})
export class MuseumModule { }
