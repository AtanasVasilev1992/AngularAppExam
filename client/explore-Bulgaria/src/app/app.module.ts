import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { PlaceModule } from './place/place.module';
import { CoreModule } from './core/core.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppInterceptor } from './app.interceptor';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { MuseumModule } from './museum/museum.module';
import { AuthService } from './auth.service';
import { AboutComponent } from './about/about.component';
import { JoinSectionComponent } from './home/join-section/join-section.component';

@NgModule({
    declarations: [
        AppComponent,
        NotFoundComponent,
        HomeComponent,
        AuthenticateComponent,
        AboutComponent,
        JoinSectionComponent,
    ],
    imports: [
        BrowserModule,
        SharedModule,
        PlaceModule,
        CoreModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MuseumModule,
        BrowserAnimationsModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AppInterceptor,
            multi: true,
        },
        AuthService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
