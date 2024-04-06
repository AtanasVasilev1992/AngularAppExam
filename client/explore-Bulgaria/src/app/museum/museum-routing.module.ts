import { NgModule } from '@angular/core';
import {  RouterModule, Routes } from '@angular/router';
import { MuseumsComponent } from './museums/museums.component';
import { AddMuseumComponent } from './add-museum/add-museum.component';
import { DetailsMuseumComponent } from './details-museum/details-museum.component';
import { AuthActivate } from '../guards/auth.activate';

const routes: Routes = [{path: '', children: [
    {path: '', pathMatch: 'full', component: MuseumsComponent},
    {path: ':museumId', pathMatch: 'full', component: DetailsMuseumComponent},
]},
{path: 'add-museum', component: AddMuseumComponent,}, //canActivate: [AuthActivate]},
] ;

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MuseumRoutinModule {}