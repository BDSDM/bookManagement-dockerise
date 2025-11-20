import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MatDialog } from '@angular/material/dialog';
import { RefreshTokenPopupComponent } from 'src/app/features/refresh-token-popup/refresh-token-popup.component';

@Injectable({
  providedIn: 'root',
})
export class CheckActivityService {
  private checkInterval = 1000; // Vérifie toutes les secondes
  private jwtHelper = new JwtHelperService();
  private hasCalledLambda = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private dialog: MatDialog,
    private ngZone: NgZone // ✅ Ajout de NgZone ici
  ) {}

  startChecking() {
    setInterval(() => {
      // ✅ Remet l'exécution dans la zone Angular
      this.ngZone.run(() => {
        const token = this.authService.getToken();

        if (!token) return;

        const decoded = this.jwtHelper.decodeToken(token);

        if (!decoded || !decoded.exp) return;

        const expiresInMs = decoded.exp * 1000 - Date.now();

        // Appelle refreshToken() à 20 secondes de l'expiration
        if (expiresInMs <= 20000 && expiresInMs > 0 && !this.hasCalledLambda) {
          this.refreshToken();
          this.hasCalledLambda = true;
        }

        // Token expiré → déconnexion
        if (this.jwtHelper.isTokenExpired(token)) {
          this.dialog.closeAll();
          this.authService.loGout();
        }
      });
    }, this.checkInterval);
  }

  refreshToken() {
    const dialogRef = this.dialog.open(RefreshTokenPopupComponent, {
      width: '400px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        // L'utilisateur a cliqué sur "Oui"
        this.executeRefreshToken();
      } else {
        // L'utilisateur a cliqué sur "Non"
        console.log('Session non prolongée.');
        this.hasCalledLambda = false; // Réinitialise pour autoriser un nouveau test
      }
    });
  }

  private executeRefreshToken() {
    this.userService.refreshAccessToken().subscribe({
      next: (newToken) => {
        localStorage.setItem('token', newToken);
        console.log('Token mis à jour avec succès');
        this.hasCalledLambda = false; // On réinitialise pour pouvoir relancer un test plus tard
      },
      error: (err) => {
        console.error('Erreur lors du rafraîchissement :', err);
        this.authService.loGout();
      },
    });
  }
}
