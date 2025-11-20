import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from 'src/app/environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = `${environment.apiUrlUser}/users`;
  private authUrl = `${environment.apiUrlUser}/auth`;

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  refreshAccessToken(): Observable<string> {
    const refreshToken = localStorage.getItem('refreshToken');
    console.log('refreshtoken ' + refreshToken);

    if (!refreshToken) {
      throw new Error('Aucun refresh token trouvé');
    }

    return this.http
      .post<{ accessToken: string }>(`${this.authUrl}/refresh-token`, {
        token: refreshToken,
      })
      .pipe(map((response) => response.accessToken));
  }
}
