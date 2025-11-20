import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-adminpower',
  templateUrl: './adminpower.component.html',
  styleUrls: ['./adminpower.component.css'],
})
export class AdminpowerComponent {
  constructor(private dialogRef: MatDialogRef<AdminpowerComponent>) {}

  close() {
    this.dialogRef.close();
  }
}
