import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private dialog: MatDialog) {}
  openConnexionDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.width = '400px'; // largeur personnalisée
    dialogConfig.height = '470px';
    dialogConfig.panelClass = 'custom-dialog-container'; // pour personnaliser le centrage si besoin

    this.dialog.open(LoginComponent, dialogConfig);
  }
}
