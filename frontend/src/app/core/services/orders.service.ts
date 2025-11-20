// src/app/core/services/orders.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';
import { environment } from 'src/app/environments/environment';

interface OrdersEmailRequest {
  email: string;
  orders: Book[];
}

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private apiUrl = environment.apiUrlOrders;

  constructor(private http: HttpClient) {}

  sendOrdersEmail(email: string, orders: Book[]): Observable<string> {
    const payload: OrdersEmailRequest = { email, orders };
    return this.http.post(`${this.apiUrl}/orders/send-email`, payload, {
      responseType: 'text',
    });
  }
}
