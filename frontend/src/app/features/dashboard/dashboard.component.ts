import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { UpdateUserDialogComponent } from '../update-user-dialog/update-user-dialog.component';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';
import { ConfirmDeleteUserDialogComponent } from '../confirm-delete-user-dialog/confirm-delete-user-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'actions'];
  dataSource = new MatTableDataSource<User>([]);
  isLoading = true;

  private paginator!: MatPaginator | null;
  private sort!: MatSort | null;

  @ViewChild(MatPaginator)
  set matPaginator(mp: MatPaginator | null) {
    this.paginator = mp;
    this.attachTableFeatures();
  }

  @ViewChild(MatSort)
  set matSort(ms: MatSort | null) {
    this.sort = ms;
    this.attachTableFeatures();
  }

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  private attachTableFeatures(): void {
    if (this.dataSource) {
      if (this.paginator) this.dataSource.paginator = this.paginator;
      if (this.sort) this.dataSource.sort = this.sort;
    }
  }

  loadUsers(): void {
    this.isLoading = true;
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.attachTableFeatures();
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
        this.snackBar.open(
          'Erreur lors du chargement des utilisateurs',
          'Fermer',
          { duration: 3000 }
        );
      },
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
  }

  openUpdateDialog(user: User): void {
    const dialogRef = this.dialog.open(UpdateUserDialogComponent, {
      width: '400px',
      data: { user: { ...user } },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.updateUser(user.id, result).subscribe({
          next: () => {
            this.snackBar.open('Utilisateur mis à jour avec succès', 'Fermer', {
              duration: 3000,
            });
            this.loadUsers();
          },
          error: () => {
            this.snackBar.open('Erreur lors de la mise à jour', 'Fermer', {
              duration: 3000,
            });
          },
        });
      }
    });
  }

  deleteUser(user: User): void {
    // Ouvre la popup de confirmation
    const dialogRef = this.dialog.open(ConfirmDeleteUserDialogComponent, {
      width: '350px',
      data: { name: user.name },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        // L'utilisateur a confirmé la suppression
        this.userService.deleteUser(user.id).subscribe({
          next: () => {
            this.snackBar.open('Utilisateur supprimé', 'Fermer', {
              duration: 3000,
            });
            this.loadUsers();
          },
          error: () => {
            this.snackBar.open('Erreur lors de la suppression', 'Fermer', {
              duration: 3000,
            });
          },
        });
      }
      // Si confirmed = false, l'utilisateur a annulé => rien à faire
    });
  }
}
