import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookService } from 'src/app/core/services/book.service';
import { Book } from 'src/app/core/models/book.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-thebooks',
  templateUrl: './thebooks.component.html',
  styleUrls: ['./thebooks.component.css'],
})
export class ThebooksComponent implements OnInit {
  books: Book[] = [];
  totalBooks: number = 0;
  userName: string = 'Lecteur';
  hasOrders: boolean = false;

  constructor(
    private bookService: BookService,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userName = this.authService.getUserName() || 'Lecteur';
    this.loadUserOrdersStatus(); // 🔥 important
    this.loadBooks();
  }

  /** 🔥 Charge le statut "Mes commandes" du user connecté */
  loadUserOrdersStatus() {
    const userId = this.authService.getUserId();
    const hasOrdersKey = `hasOrders_${userId}`;
    this.hasOrders = localStorage.getItem(hasOrdersKey) === 'true';
  }

  loadBooks(): void {
    this.bookService.getAllBooks().subscribe({
      next: (data) => {
        this.books = data;
        this.totalBooks = data.reduce(
          (sum, book) => sum + (book.total || 0),
          0
        );
      },
      error: () => {
        this.snackBar.open('Erreur lors du chargement des livres.', 'Fermer', {
          duration: 3000,
        });
      },
    });
  }

  /** 🔥 Lorsqu’on clique sur un livre → emprunt */
  onBookClick(book: Book) {
    if (book.total <= 0) {
      this.snackBar.open(
        `😔 Plus d’exemplaires disponibles pour "${book.title}"`,
        'Fermer',
        { duration: 2500 }
      );
      return;
    }

    const userId = this.authService.getUserId();
    const ordersKey = `orders_${userId}`;
    const hasOrdersKey = `hasOrders_${userId}`;

    let orders: Book[] = JSON.parse(localStorage.getItem(ordersKey) || '[]');

    // Ajouter le livre s'il n'est pas déjà dans les commandes
    if (!orders.find((o) => o.id === book.id)) {
      orders.push(book);
    }

    localStorage.setItem(ordersKey, JSON.stringify(orders));
    localStorage.setItem(hasOrdersKey, 'true');

    this.hasOrders = true;

    // Mise à jour du stock côté backend
    const updatedBook: Book = {
      ...book,
      total: book.total - 1,
      status: book.total - 1 > 0,
    };

    this.bookService.updateBook(book.id!, updatedBook).subscribe(() => {
      this.loadBooks();
      this.snackBar.open(`📚 Vous avez emprunté "${book.title}".`, 'Fermer', {
        duration: 2500,
      });
    });
  }

  goToOrders() {
    this.router.navigate(['/my-orders']);
  }
}
