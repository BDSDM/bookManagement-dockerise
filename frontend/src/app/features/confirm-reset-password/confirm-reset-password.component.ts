import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ResetPasswordService } from 'src/app/core/services/reset-password.service';

@Component({
  selector: 'app-confirm-reset-password',
  templateUrl: './confirm-reset-password.component.html',
  styleUrls: ['./confirm-reset-password.component.css'],
})
export class ConfirmResetPasswordComponent {
  token: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  message: string = '';
  error: string = '';

  hideNewPassword: boolean = true;
  hideConfirmPassword: boolean = true;

  constructor(
    private resetPasswordService: ResetPasswordService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
  }

  confirmReset() {
    this.resetPasswordService
      .confirmPasswordReset(this.token, this.newPassword)
      .subscribe(
        (response) => {
          this.message = response.message;
          this.error = '';
          this.snackBar.open('Mot de passe modifié avec succès', 'Fermer', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
          this.router.navigate(['/']);
        },
        (error) => {
          this.error = error.error.message || 'Une erreur est survenue.';
          this.message = '';
        }
      );
  }

  annuler() {
    this.router.navigate(['/']);
  }
}
