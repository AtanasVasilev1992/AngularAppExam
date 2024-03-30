import { NgModule } from '@angular/core';
import {  RouterModule, Routes } from '@angular/router';
import { PlacesComponent } from './places/places.component';
import { AddPlaceComponent } from './add-place/add-place.component';
import { DetailsComponent } from './details/details.component';
import { AuthActivate } from '../guards/auth.activate';

const routes: Routes = [{path: 'places', children: [
    {path: '', pathMatch: 'full', component: PlacesComponent},
    {path: ':placeId', pathMatch: 'full', component: DetailsComponent},
]},
{path: 'add-place', component: AddPlaceComponent,}, //canActivate: [AuthActivate]},
] ;

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PlaceRoutinModule {}