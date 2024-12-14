import { NgModule } from '@angular/core';
import {  RouterModule, Routes } from '@angular/router';
import { MuseumsComponent } from './museums/museums.component';
import { AddMuseumComponent } from './add-museum/add-museum.component';
import { DetailsMuseumComponent } from './details-museum/details-museum.component';
import { AuthActivate } from '../guards/auth.activate';
import { EditMuseumComponent } from './edit-museum/edit-museum.component';

const routes: Routes = [
  {
    path: '', 
    children: [
      { path: '', component: MuseumsComponent },
      { path: 'add', component: AddMuseumComponent, canActivate: [AuthActivate] },
      { path: 'edit/:museumId', component: EditMuseumComponent },
      { path: ':museumId', component: DetailsMuseumComponent },
    ]
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MuseumRoutinModule {}