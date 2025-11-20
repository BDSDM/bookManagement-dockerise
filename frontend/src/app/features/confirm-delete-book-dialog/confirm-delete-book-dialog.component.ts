import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete-book-dialog',
  templateUrl: './confirm-delete-book-dialog.component.html',
  styleUrls: ['./confirm-delete-book-dialog.component.css'],
})
export class ConfirmDeleteBookDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteBookDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string }
  ) {}

  confirm(): void {
    this.dialogRef.close(true);
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}
