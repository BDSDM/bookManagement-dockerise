import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AdminRequiredComponent } from 'src/app/features/admin-required/admin-required.component';

@Injectable({
  providedIn: 'root',
})
export class AdminrequiredGuard implements CanActivate {
  userRole: string = '';
  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  canActivate(): boolean {
    this.userRole = this.authService.getUserRole() || '';

    if (this.authService.isLoggedIn() && this.userRole === 'admin') {
      return true;
    }

    this.adminRequired();
    return false;
  }
  adminRequired() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '550px';
    dialogConfig.disableClose = true; // Empêche la fermeture en cliquant à l'extérieur
    this.dialog.open(AdminRequiredComponent, dialogConfig);
  }
}
