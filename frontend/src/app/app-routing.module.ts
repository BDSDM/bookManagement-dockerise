import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
import { HomeComponent } from './features/home/home.component';
import { BooksComponent } from './features/books/books.component';
import { ThebooksComponent } from './features/thebooks/thebooks.component';
import { MyOrdersComponent } from './features/my-orders/my-orders.component';
import { ColorPickerComponent } from './features/color-picker/color-picker.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ConfirmResetPasswordComponent } from './features/confirm-reset-password/confirm-reset-password.component';
import { CommonGuard } from './core/guards/common.guard';
import { AdminrequiredGuard } from './core/guards/adminrequired.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      {
        path: 'books',
        component: BooksComponent,
        canActivate: [AdminrequiredGuard],
      },
      {
        path: 'thebooks',
        component: ThebooksComponent,
        canActivate: [CommonGuard],
      },
      {
        path: 'my-orders',
        component: MyOrdersComponent,
        canActivate: [CommonGuard],
      },

      {
        path: 'color',
        component: ColorPickerComponent,
        canActivate: [CommonGuard],
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AdminrequiredGuard],
      },
      { path: 'reset-password', component: ConfirmResetPasswordComponent },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
