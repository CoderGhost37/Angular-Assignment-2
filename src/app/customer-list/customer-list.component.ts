import { Component, OnDestroy, OnInit } from '@angular/core';
import { Customer, CustomerService } from '../customer.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css',
})
export class CustomerListComponent implements OnInit, OnDestroy {
  customers: Customer[] = [];
  subscription: Subscription;
  userRole: string = null;
  private userSub: Subscription;

  constructor(
    private authService: AuthService,
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userSub = this.authService.user.subscribe((user) => {
      this.userRole = user.role;
    });
    this.subscription = this.customerService.customersChanged.subscribe(
      (customers: Customer[]) => {
        this.customers = customers;
      }
    );
    this.customers = this.customerService.getCustomers();
  }

  editCustomer(id: number) {
    this.router.navigate(['edit-customer', id]);
  }

  deleteCustomer(id: number) {
    if (confirm('Are you sure you want to delete this customer?')) {
      this.customerService.deleteCustomer(id);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.userSub.unsubscribe();
  }
}
