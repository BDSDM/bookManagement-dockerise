import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ResetPasswordService {
  private apiUrl = `${environment.apiBaseUrl}/reset-password`; // utilise environment.ts

  constructor(private http: HttpClient) {}

  // Envoie la demande de réinitialisation de mot de passe
  requestPasswordReset(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/request`, { email });
  }

  // Confirme la réinitialisation du mot de passe
  confirmPasswordReset(token: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/confirm`, { token, newPassword });
  }
}
