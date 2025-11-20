import { Component } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/core/models/user.model';
import { LoginComponent } from '../login/login.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user: User = { id: 0, name: '', email: '', password: '' };
  confirmPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  isLoading: boolean = false; // ✅ nouvel état

  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<RegisterComponent>,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  register(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.user.password !== this.confirmPassword) {
      this.errorMessage = 'Les mots de passe ne correspondent pas.';
      return;
    }
    this.isLoading = true; // ✅ on démarre le chargement

    this.authService.register(this.user).subscribe({
      next: () => {
        this.successMessage = 'Inscription réussie.';
        setTimeout(() => this.dialogRef.close(), 20);
        this.snackBar.open(
          'Inscription réussie vous pouvez vous connecter',
          'Fermer',
          {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          }
        );
        this.openConnexionDialog();
      },
      error: (err) => {
        this.errorMessage = 'Email existant !';
        console.error(err);
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false; // ✅ on arrête le chargement
      },
    });
  }

  close(): void {
    this.dialogRef.close();
  }
  openConnexionDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = '400px';
    dialogConfig.data = {
      email: this.user.email,
      password: this.user.password,
    };
    this.dialog.open(LoginComponent, dialogConfig);
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
