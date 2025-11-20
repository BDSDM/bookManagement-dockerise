import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = `${environment.apiUrlBook}/books`; // URL complète du backend

  constructor(private http: HttpClient) {}

  // 🔹 CREATE
  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(`${this.apiUrl}/add`, book);
  }

  // 🔹 READ ALL
  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/all`);
  }

  // 🔹 READ BY ID
  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${id}`);
  }

  // 🔹 UPDATE
  updateBook(id: number, book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/update/${id}`, book);
  }

  // 🔹 DELETE
  deleteBook(id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`, {
      responseType: 'text',
    });
  }

  // 🔹 FILTRER PAR AUTEUR
  getBooksByAuthor(author: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/author/${author}`);
  }

  // 🔹 FILTRER PAR UTILISATEUR
  getBooksByUser(userId: number): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/user/${userId}`);
  }
}
