import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Customer, CustomerService } from '../customer.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-customer',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-customer.component.html',
  styleUrl: './edit-customer.component.css',
})
export class EditCustomerComponent {
  @ViewChild('customerForm', { static: false }) customerForm: NgForm;
  customerId: number;
  customer: Customer;

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.customerId = +params['id'];
      this.customer = this.customerService.getCustomer(this.customerId);
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    this.customerService.updateCustomer(
      this.customerId,
      value.name,
      value.email,
      value.phone.toString(),
      value.address
    );
    alert('Customer edited successfully!');
    this.router.navigate(['/']);
  }
}
