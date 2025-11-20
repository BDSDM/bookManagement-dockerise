import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  private baseUrl = `${environment.apiUrlCookie}/cookies`;

  constructor(private http: HttpClient) {}

  /** ------------------ API CALLS ------------------ **/

  // ✅ Crée ou met à jour le cookie lastPage pour un utilisateur connecté
  setLastPage(page: string, email: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/last-page`,
      { page, email },
      { withCredentials: true }
    );
  }

  // ✅ Récupère la dernière page pour un utilisateur
  getLastPage(email: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/last-page`, {
      params: { email },
      withCredentials: true,
    });
  }

  // ✅ Supprime le cookie pour un utilisateur
  deleteLastPage(email: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/last-page`, {
      params: { email },
      withCredentials: true,
    });
  }

  // ✅ Récupère tous les cookies pour debug (facultatif)
  getAllLastPageCookies(): Observable<Record<string, string>> {
    return this.http.get<Record<string, string>>(
      `${this.baseUrl}/all-last-pages`,
      { withCredentials: true }
    );
  }
}
