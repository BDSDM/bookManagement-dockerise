import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './core/footer/footer.component';
import { LayoutComponent } from './core/layout/layout.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { HomeComponent } from './features/home/home.component';
import { BooksComponent } from './features/books/books.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmLogoutDialogComponent } from './features/confirm-logout-dialog/confirm-logout-dialog.component';
import { RegisterComponent } from './features/register/register.component';
import { LoginComponent } from './features/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { RequestResetPasswordComponent } from './features/request-reset-password/request-reset-password.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmDeleteBookDialogComponent } from './features/confirm-delete-book-dialog/confirm-delete-book-dialog.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ThebooksComponent } from './features/thebooks/thebooks.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { MatGridListModule } from '@angular/material/grid-list';
import { MyOrdersComponent } from './features/my-orders/my-orders.component';
import { RefreshTokenPopupComponent } from './features/refresh-token-popup/refresh-token-popup.component';
import { ColorPickerComponent } from './features/color-picker/color-picker.component';
import { UpdateUserDialogComponent } from './features/update-user-dialog/update-user-dialog.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ConfirmDeleteUserDialogComponent } from './features/confirm-delete-user-dialog/confirm-delete-user-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ConfirmAdminActivationComponent } from './features/confirm-admin-activation/confirm-admin-activation.component';
import { AdminpowerComponent } from './features/adminpower/adminpower.component';
import { ConfirmResetPasswordComponent } from './features/confirm-reset-password/confirm-reset-password.component';
import { AdminRequiredComponent } from './features/admin-required/admin-required.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    LayoutComponent,
    NavbarComponent,
    HomeComponent,
    BooksComponent,
    ConfirmLogoutDialogComponent,
    RegisterComponent,
    LoginComponent,
    RequestResetPasswordComponent,
    ConfirmDeleteBookDialogComponent,
    ThebooksComponent,
    MyOrdersComponent,
    RefreshTokenPopupComponent,
    ColorPickerComponent,
    UpdateUserDialogComponent,
    DashboardComponent,
    ConfirmDeleteUserDialogComponent,
    ConfirmAdminActivationComponent,
    AdminpowerComponent,
    ConfirmResetPasswordComponent,
    AdminRequiredComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    HttpClientModule,
    MatDialogModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatGridListModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
