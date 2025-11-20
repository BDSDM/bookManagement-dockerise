import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ColorService {
  private API = environment.API_URL;

  constructor(private http: HttpClient) {}

  /** 🔹 Sauvegarde la couleur sur le serveur pour l'utilisateur courant */
  setColorServer(color: string) {
    return this.http.post<{ color: string }>(
      `${this.API}/color`,
      { color },
      { withCredentials: true }
    );
  }

  /** 🔹 Récupère la couleur sauvegardée sur le serveur */
  getColorServer() {
    return this.http.get<{ color: string }>(`${this.API}/color`, {
      withCredentials: true,
    });
  }

  /** 🔹 Supprime la couleur sauvegardée côté serveur */
  deleteColorServer() {
    return this.http.delete(`${this.API}/color`, {
      withCredentials: true,
    });
  }

  /** 🔹 Ajoute une couleur aux favoris */
  addFavoriteServer(color: string) {
    return this.http.post<{ favorites: string[] }>(
      `${this.API}/color/favorite`,
      { color },
      { withCredentials: true }
    );
  }

  /** 🔹 Récupère toutes les couleurs favorites */
  getFavoritesServer() {
    return this.http.get<{ favorites: string[] }>(
      `${this.API}/color/favorites`,
      { withCredentials: true }
    );
  }

  /** 🔹 Supprime une couleur des favoris */
  removeFavoriteServer(color: string) {
    return this.http.delete<{ favorites: string[] }>(
      `${this.API}/color/favorite`,
      { params: { color }, withCredentials: true }
    );
  }

  /** 🔹 Vide complètement la liste des favoris */
  clearFavoritesServer() {
    return this.http.delete(`${this.API}/color/favorites`, {
      withCredentials: true,
    });
  }

  /** 🔹 Applique la couleur uniquement sur un conteneur spécifique */
  applyColorToBody(color: string, forceImportant = false) {
    if (!color) return;

    const content = document.querySelector<HTMLElement>('.content');
    if (!content) return;

    if (forceImportant) {
      content.style.setProperty('background-color', color, 'important');
    } else {
      content.style.backgroundColor = color;
    }
  }
}
