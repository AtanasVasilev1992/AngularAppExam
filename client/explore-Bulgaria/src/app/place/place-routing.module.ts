import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlacesComponent } from './places/places.component';
import { AddPlaceComponent } from './add-place/add-place.component';
import { DetailsComponent } from './details/details.component';
import { EditPlaceComponent } from './edit-place/edit-place.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
    {
        path: 'places',
        children: [
            { path: '', pathMatch: 'full', component: PlacesComponent },
            {
                path: 'edit/:placeId',
                component: EditPlaceComponent,
                canActivate: [AuthGuard],
            },
            { path: ':placeId', component: DetailsComponent },
        ],
    },
    {
        path: 'add-place',
        component: AddPlaceComponent,
        canActivate: [AuthGuard],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PlaceRoutinModule {}
