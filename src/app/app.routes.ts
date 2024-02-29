import { Routes } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';

export const routes: Routes = [
  { path: '', component: CustomerListComponent, pathMatch: 'full' },
  {
    path: 'auth',
    loadComponent: () =>
      import('./auth/auth.component').then((m) => m.AuthComponent),
  },
  {
    path: 'add-customer',
    loadComponent: () =>
      import('./add-customer/add-customer.component').then(
        (m) => m.AddCustomerComponent
      ),
  },
  {
    path: 'edit-customer/:id',
    loadComponent: () =>
      import('./edit-customer/edit-customer.component').then(
        (m) => m.EditCustomerComponent
      ),
  },
];
