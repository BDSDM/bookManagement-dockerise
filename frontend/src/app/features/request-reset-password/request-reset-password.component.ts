import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ResetPasswordService } from 'src/app/core/services/reset-password.service';

@Component({
  selector: 'app-request-reset-password',
  templateUrl: './request-reset-password.component.html',
  styleUrls: ['./request-reset-password.component.css'],
})
export class RequestResetPasswordComponent {
  resetForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<RequestResetPasswordComponent>,
    private resetPasswordService: ResetPasswordService,
    private snackBar: MatSnackBar
  ) {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    if (this.resetForm.valid) {
      this.isSubmitting = true;
      const email = this.resetForm.value.email;
      this.resetPasswordService.requestPasswordReset(email).subscribe({
        next: () => {
          this.snackBar.open('Email de réinitialisation envoyé !', 'Fermer', {
            duration: 3000,
          });
          this.snackBar.open('Email de réinitialisation envoyé !', 'Fermer', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
          this.dialogRef.close(true);
        },
        error: (err) => {
          this.snackBar.open("Erreur lors de l'envoi de l'email.", 'Fermer', {
            duration: 3000,
          });
          this.isSubmitting = false;
        },
      });
    }
  }
}
