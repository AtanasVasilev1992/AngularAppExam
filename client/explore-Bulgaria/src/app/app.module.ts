import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { UserModule } from './user/user.module';
import { SharedModule } from './shared/shared.module';
import { PlaceModule } from './place/place.module';
import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http';

import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { appInterceptorProvider } from './app.interceptor';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { MuseumModule } from './museum/museum.module';
// import { PlacesComponent } from './place/places/places.component';

@NgModule({
  declarations: [AppComponent, NotFoundComponent, HomeComponent, AuthenticateComponent],
  imports: [
    BrowserModule,
    //UserModule,
    SharedModule,
    PlaceModule,
    CoreModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MuseumModule
  ],
  providers: [appInterceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
