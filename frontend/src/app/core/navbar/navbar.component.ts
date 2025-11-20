import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/features/login/login.component';
import { ConfirmAdminActivationComponent } from 'src/app/features/confirm-admin-activation/confirm-admin-activation.component';
import { UserService } from '../services/user.service';
import { AdminpowerComponent } from 'src/app/features/adminpower/adminpower.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn$!: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // On s’abonne au BehaviorSubject pour suivre l’état connecté
    this.isLoggedIn$ = this.authService.isAuthenticated$;
  }

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

  logout() {
    this.authService.logout();
  }
  onRedButtonClick() {
    const dialogRef = this.dialog.open(ConfirmAdminActivationComponent, {
      width: '400px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Si l'utilisateur confirme
        const userId = this.authService.getUserId();
        if (!userId) {
          console.error('Utilisateur non connecté');
          return;
        }

        this.userService.getUserById(userId).subscribe({
          next: (user) => {
            user.role = 'admin';
            this.userService.updateUser(userId, user).subscribe({
              next: (response) => {
                this.executeRefreshToken();
                this.adminpower();
                console.log('Statut utilisateur mis à jour à admin', response);
              },
              error: (err) => {
                console.error('Erreur lors de la mise à jour du statut', err);
              },
            });
          },
          error: (err) => {
            console.error('Erreur récupération utilisateur', err);
          },
        });
      }
    });
  }
  private executeRefreshToken() {
    this.userService.refreshAccessToken().subscribe({
      next: (newToken) => {
        localStorage.setItem('token', newToken);
        console.log('Token mis à jour avec succès');
      },
      error: (err) => {
        console.error('Erreur lors du rafraîchissement :', err);
        this.authService.logout();
      },
    });
  }

  adminpower() {
    this.dialog.open(AdminpowerComponent, {
      width: '350px',
      disableClose: true,
    });
  }
}
