import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { PublicGuard } from '../guards/public.guard';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
    { path: 'login', component: LoginComponent, canActivate: [PublicGuard] },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [PublicGuard],
    },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UserRoutingModule {}
