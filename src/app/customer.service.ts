import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Customer {
  name: string;
  email: string;
  phoneNo: string;
  address: string;

  constructor(name: string, email: string, phoneNo: string, address: string) {
    this.name = name;
    this.email = email;
    this.phoneNo = phoneNo;
    this.address = address;
  }
}

export class CustomerService {
  private customers: Customer[] = [
    {
      name: 'John Doe',
      email: 'johndoe@email.com',
      phoneNo: '1234567890',
      address: '123 Main St, Springfield, IL 62701',
    },
    {
      name: 'Jane Doe',
      email: 'janedoe@email.com',
      phoneNo: '1234567890',
      address: '123 Main St, Springfield, IL 62701',
    },
  ];
  customersChanged = new Subject<Customer[]>();

  constructor() {}

  getCustomers() {
    return this.customers.slice();
  }

  getCustomer(id: number) {
    return this.customers[id];
  }

  addCustomer(name: string, email: string, phoneNo: string, address: string) {
    this.customers.push({
      name,
      email,
      phoneNo,
      address,
    });
    this.customersChanged.next(this.customers.slice());
  }

  updateCustomer(
    id: number,
    name: string,
    email: string,
    phoneNo: string,
    address: string
  ) {
    this.customers[id] = {
      name,
      email,
      phoneNo,
      address,
    };
    this.customersChanged.next(this.customers.slice());
  }

  deleteCustomer(id: number) {
    this.customers.splice(id, 1);
    this.customersChanged.next(this.customers.slice());
  }
}
