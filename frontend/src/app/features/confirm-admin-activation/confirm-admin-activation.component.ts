import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-admin-activation',
  templateUrl: './confirm-admin-activation.component.html',
  styleUrls: ['./confirm-admin-activation.component.css'],
})
export class ConfirmAdminActivationComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmAdminActivationComponent>
  ) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
