import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { EmailDirective } from './validators/email.directive';
import { TimePipe } from './pipes/time.pipe';




@NgModule({
  declarations: [
    LoaderComponent,
    EmailDirective,
    TimePipe,

  ],
  imports: [
    CommonModule
  ],
  exports: [LoaderComponent, EmailDirective, TimePipe],
})
export class SharedModule { }
