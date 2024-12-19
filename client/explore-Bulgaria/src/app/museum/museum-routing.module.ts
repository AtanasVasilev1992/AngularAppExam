import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MuseumsComponent } from './museums/museums.component';
import { AddMuseumComponent } from './add-museum/add-museum.component';
import { DetailsMuseumComponent } from './details-museum/details-museum.component';
import { EditMuseumComponent } from './edit-museum/edit-museum.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', component: MuseumsComponent },
            {
                path: 'add',
                component: AddMuseumComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'edit/:museumId',
                component: EditMuseumComponent,
                canActivate: [AuthGuard],
            },
            { path: ':museumId', component: DetailsMuseumComponent },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MuseumRoutinModule {}
