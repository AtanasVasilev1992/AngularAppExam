import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MuseumsComponent } from './museums/museums.component';
import { AddMuseumComponent } from './add-museum/add-museum.component';
import { DetailsMuseumComponent } from './details-museum/details-museum.component';
import { MuseumRoutinModule } from './museum-routing.module';



@NgModule({
  declarations: [
    MuseumsComponent,
    AddMuseumComponent,
    DetailsMuseumComponent
  ],
  imports: [
    CommonModule,
    MuseumRoutinModule
  ],
  exports: [
    MuseumsComponent,
    DetailsMuseumComponent,
    AddMuseumComponent
  ]
})
export class MuseumModule { }
