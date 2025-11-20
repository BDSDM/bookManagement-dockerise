import { Component, OnInit } from '@angular/core';
import { ColorService } from 'src/app/core/services/color.service';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.css'],
})
export class ColorPickerComponent implements OnInit {
  color = '#8a2be2';
  favorites: string[] = [];
  forceImportant = false;

  constructor(private colorService: ColorService) {}

  ngOnInit(): void {
    // récupère couleur courante depuis le serveur et applique
    this.colorService.getColorServer().subscribe({
      next: (res) => {
        if (res && res.color) {
          this.color = res.color;
          this.colorService.applyColorToBody(this.color, this.forceImportant);
        }
      },
      error: (err) => {
        // si erreur : fallback local
        console.warn('Could not load bg color from server', err);
      },
    });

    // charge la liste des favoris depuis le serveur
    this.loadFavorites();
  }

  apply() {
    this.colorService.setColorServer(this.color).subscribe({
      next: () =>
        this.colorService.applyColorToBody(this.color, this.forceImportant),
      error: (e) => alert('Erreur en sauvegarde de la couleur : ' + e.message),
    });
  }

  addFavorite() {
    this.colorService.addFavoriteServer(this.color).subscribe({
      next: (res) => {
        this.favorites = res.favorites;
      },
      error: (e) => alert('Erreur ajout favori : ' + e.message),
    });
  }

  useFavorite(c: string) {
    this.color = c;
    this.apply();
  }

  removeFavorite(c: string) {
    this.colorService.removeFavoriteServer(c).subscribe({
      next: (res) => (this.favorites = res.favorites),
      error: (e) => alert('Erreur suppression favori : ' + e.message),
    });
  }

  reset() {
    this.colorService.deleteColorServer().subscribe({
      next: () => {
        this.color = '#8a2be2';
        this.colorService.applyColorToBody(this.color, this.forceImportant);
      },
      error: (e) => console.warn(e),
    });
  }

  clearAllFavorites() {
    if (!confirm('Supprimer tous les favoris ?')) return;
    this.colorService.clearFavoritesServer().subscribe({
      next: () => (this.favorites = []),
      error: (e) => console.warn(e),
    });
  }

  private loadFavorites() {
    this.colorService.getFavoritesServer().subscribe({
      next: (res) => {
        this.favorites = res.favorites || [];
      },
      error: (e) => {
        console.warn('Cannot load favorites', e);
      },
    });
  }
}
