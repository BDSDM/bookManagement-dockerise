import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-logout-dialog',
  templateUrl: './confirm-logout-dialog.component.html',
  styleUrls: ['./confirm-logout-dialog.component.css'],
})
export class ConfirmLogoutDialogComponent {
  constructor(private dialogRef: MatDialogRef<ConfirmLogoutDialogComponent>) {}

  confirm() {
    this.dialogRef.close(true); // Confirme la déconnexion
  }

  cancel() {
    this.dialogRef.close(false); // Annule la déconnexion
  }
}
