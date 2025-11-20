import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-required',
  templateUrl: './admin-required.component.html',
  styleUrls: ['./admin-required.component.css'],
})
export class AdminRequiredComponent {
  constructor(private dialogRef: MatDialogRef<AdminRequiredComponent>) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
