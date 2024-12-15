import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { EmailDirective } from './validators/email.directive';
import { TimePipe } from './pipes/time.pipe';
import { PaginationComponent } from './pagination/pagination.component';




@NgModule({
  declarations: [
    LoaderComponent,
    EmailDirective,
    TimePipe,
    PaginationComponent,

  ],
  imports: [
    CommonModule
  ],
  exports: [LoaderComponent, EmailDirective, TimePipe, PaginationComponent],
})
export class SharedModule { }
