import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { EmailDirective } from './validators/email.directive';
import { TimePipe } from './pipes/time.pipe';
import { PaginationComponent } from './pagination/pagination.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';




@NgModule({
  declarations: [
    LoaderComponent,
    EmailDirective,
    TimePipe,
    PaginationComponent,
    ConfirmDialogComponent,

  ],
  imports: [
    CommonModule
  ],
  exports: [LoaderComponent, EmailDirective, TimePipe, PaginationComponent, ConfirmDialogComponent],
})
export class SharedModule { }
