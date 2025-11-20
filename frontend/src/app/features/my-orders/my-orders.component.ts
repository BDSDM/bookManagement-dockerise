// src/app/features/my-orders/my-orders.component.ts
import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/core/models/book.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { OrdersService } from 'src/app/core/services/orders.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
})
export class MyOrdersComponent implements OnInit {
  orders: Book[] = [];
  userId: number = 0;
  isSending: boolean = false; // ← état de l'envoi

  constructor(
    private authService: AuthService,
    private ordersService: OrdersService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.loadOrders();
  }

  // 🔹 Charger les commandes de l'utilisateur connecté
  loadOrders(): void {
    const ordersKey = `orders_${this.userId}`;
    this.orders = JSON.parse(localStorage.getItem(ordersKey) || '[]');
  }

  // 🔹 Bouton "Annuler"
  cancelOrders(): void {
    const ordersKey = `orders_${this.userId}`;
    const hasOrdersKey = `hasOrders_${this.userId}`;

    localStorage.removeItem(ordersKey);
    localStorage.removeItem(hasOrdersKey);

    this.orders = [];
    this.snackBar.open('✅ Vos commandes ont été annulées', 'Fermer', {
      duration: 2500,
    });
  }

  // 🔹 Bouton "Confirmer" → envoie PDF par email
  confirmOrders(): void {
    if (this.orders.length === 0) {
      this.snackBar.open(
        "😔 Vous n'avez aucune commande à confirmer.",
        'Fermer',
        { duration: 2500 }
      );
      return;
    }

    const email = this.authService.getUserEmail();
    if (!email) {
      this.snackBar.open('❌ Impossible de récupérer votre email.', 'Fermer', {
        duration: 2500,
      });
      return;
    }
    this.isSending = true;
    this.ordersService.sendOrdersEmail(email, this.orders).subscribe({
      next: () => {
        this.snackBar.open('📧 Email envoyé avec succès !', 'Fermer', {
          duration: 5000,
        });
        this.cancelOrders(); // supprime les commandes après envoi
        this.snackBar.open(
          '📧 Un email de récapitulation vous a été envoyé !',
          'Fermer',
          {
            duration: 3000,
          }
        );
        this.isSending = false; // ← réactive le bouton
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open("❌ Erreur lors de l'envoi de l'email.", 'Fermer', {
          duration: 3000,
        });
      },
    });
  }
}
