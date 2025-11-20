import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete-user-dialog',
  templateUrl: './confirm-delete-user-dialog.component.html',
  styleUrls: ['./confirm-delete-user-dialog.component.css'],
})
export class ConfirmDeleteUserDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string }
  ) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
