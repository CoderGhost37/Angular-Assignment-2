import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-add-customer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.css',
})
export class AddCustomerComponent {
  constructor(private customerService: CustomerService) {}

  onSubmit(form: NgForm) {
    const value = form.value;
    this.customerService.addCustomer(
      value.name,
      value.email,
      value.phone.toString(),
      value.address
    );
    alert('Customer added successfully!');
    form.reset();
  }
}
