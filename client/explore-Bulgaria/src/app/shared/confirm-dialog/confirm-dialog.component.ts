import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {
  @Input() show = false;
  @Input() message = 'Are you sure you want to delete this item?';
  @Input() onConfirm: () => void = () => {};
  @Input() onCancel: () => void = () => {};
}
