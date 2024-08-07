import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './core/error/error.component';

const routes: Routes = [{path: 'home', redirectTo: ''},
  { path: '', pathMatch: 'full', component: HomeComponent },
  {path: 'auth', loadChildren: ()=> import('./user/user.module').then( m => m.UserModule)},
  {path: 'museums', loadChildren: ()=> import('./museum/museum.module').then(m => m.MuseumModule)},
  {path: 'error', component: ErrorComponent},
  {path: '**', redirectTo: '/404'},
  {path: '404', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
