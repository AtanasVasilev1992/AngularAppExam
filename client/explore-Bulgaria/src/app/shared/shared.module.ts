import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { EmailDirective } from './validators/email.directive';
import { TimePipe } from './pipes/time.pipe';
import { PaginationComponent } from './pagination/pagination.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ShortenTextPipe } from './pipes/shorten-text.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { EmailValidatorDirective } from './utils/email-validator';

@NgModule({
    declarations: [
        LoaderComponent,
        EmailDirective,
        TimePipe,
        PaginationComponent,
        ConfirmDialogComponent,
        ShortenTextPipe,
        FilterPipe,
        EmailValidatorDirective,
    ],
    imports: [CommonModule],
    exports: [
        LoaderComponent,
        EmailDirective,
        TimePipe,
        PaginationComponent,
        ConfirmDialogComponent,
        ShortenTextPipe,
        FilterPipe,
        EmailValidatorDirective,
    ],
})
export class SharedModule {}
