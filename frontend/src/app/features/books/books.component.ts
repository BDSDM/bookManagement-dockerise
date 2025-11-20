import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDeleteBookDialogComponent } from '../confirm-delete-book-dialog/confirm-delete-book-dialog.component';
import { Book } from 'src/app/core/models/book.model';
import { BookService } from 'src/app/core/services/book.service';
import { FileUploadService } from 'src/app/core/services/file-upload.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  books: Book[] = [];
  dataSource = new MatTableDataSource<Book>([]);
  displayedColumns: string[] = [
    'title',
    'author',
    'total',
    'status',
    'image',
    'actions',
  ];

  bookForm: FormGroup;
  editingBook: Book | null = null;
  dialogRef!: MatDialogRef<any>;

  selectedFile!: File;
  previewImage: string | undefined;

  @ViewChild('bookDialog') bookDialog!: TemplateRef<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private bookService: BookService,
    private snackBar: MatSnackBar,
    private fileUploadService: FileUploadService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private authService: AuthService
  ) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      total: [0, [Validators.required, Validators.min(0)]],
      status: [true],
      image: [''],
      userid: [this.authService.getUserId()], // 🔹 initialisation
    });
  }

  ngOnInit(): void {
    this.loadBooks();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  // -------------------- Charger tous les livres --------------------
  loadBooks() {
    this.bookService.getAllBooks().subscribe({
      next: (data) => {
        this.books = data;
        this.dataSource.data = this.books;
        if (this.paginator) this.dataSource.paginator = this.paginator;
      },
      error: (err) => console.error('Erreur API:', err),
    });
  }

  // -------------------- Ouvrir le dialog --------------------
  openDialog(book?: Book) {
    this.editingBook = book || null;

    if (book) {
      this.bookForm.patchValue({
        title: book.title,
        author: book.author,
        total: book.total,
        status: book.status,
        image: book.image,
        userid: book.user ? book.user.id : this.authService.getUserId(), // 🔹 patch userid
      });
      this.previewImage = book.image;
    } else {
      this.resetForm();
    }

    this.dialogRef = this.dialog.open(this.bookDialog);
  }

  // -------------------- Fichier sélectionné --------------------
  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];

      const reader = new FileReader();
      reader.onload = (e: any) => (this.previewImage = e.target.result);
      reader.readAsDataURL(this.selectedFile);
    }
  }

  // -------------------- Submit avec upload --------------------
  submitForm() {
    if (this.selectedFile) {
      this.fileUploadService.uploadImage(this.selectedFile).subscribe({
        next: (url: string) => {
          this.bookForm.patchValue({ image: url });
          this.saveBook();
        },
        error: (err) => console.error('Erreur upload:', err),
      });
    } else {
      this.saveBook();
    }
  }

  // -------------------- Enregistrer le livre --------------------
  private saveBook() {
    const bookData = this.bookForm.value;

    // ✅ Logique automatique : si total > 0 → status = true, sinon false
    bookData.status = bookData.total > 0;

    if (this.editingBook) {
      this.bookService.updateBook(this.editingBook.id!, bookData).subscribe({
        next: () => {
          this.loadBooks();
          this.dialogRef.close();
          this.resetForm();
          this.snackBar.open('✅ Livre mis à jour avec succès', 'Fermer', {
            duration: 2500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: ['snackbar-success'],
          });
        },
        error: (err) => console.error('Erreur update:', err),
      });
    } else {
      this.bookService.addBook(bookData).subscribe({
        next: () => {
          this.loadBooks();
          this.dialogRef.close();
          this.resetForm();
          this.snackBar.open('📘 Livre ajouté avec succès', 'Fermer', {
            duration: 2500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: ['snackbar-success'],
          });
        },
        error: (err) => console.error('Erreur create:', err),
      });
    }
  }

  // -------------------- Supprimer un livre --------------------
  deleteBook(id: number, title: string) {
    const dialogRef = this.dialog.open(ConfirmDeleteBookDialogComponent, {
      width: '400px',
      data: { title },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.bookService.deleteBook(id).subscribe({
          next: () => {
            this.loadBooks();
            this.snackBar.open(
              `📚 Le livre "${title}" a été supprimé.`,
              'Fermer',
              {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'bottom',
                panelClass: ['snackbar-success'],
              }
            );
          },
          error: (err) => console.error('Erreur delete:', err),
        });
      }
    });
  }

  // -------------------- Réinitialiser le formulaire --------------------
  private resetForm() {
    this.bookForm.reset({
      title: '',
      author: '',
      total: 0,
      status: true,
      image: '',
      userid: this.authService.getUserId(), // 🔹 réinitialisation
    });
    this.previewImage = '';
    this.selectedFile = undefined!;
    this.editingBook = null;
  }
}
