import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
  Router,
} from '@angular/router';
import { CustomerService } from './customer.service';
import { AuthService } from './auth.service';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  providers: [CustomerService, AuthService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.autoLogin();
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }
}
