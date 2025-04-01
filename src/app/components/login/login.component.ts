import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, NgIf, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  showSignupButton: boolean = false;
  errorMessage: string = '';

  constructor(private router: Router) { }

  onLogin(): void {
    let users = JSON.parse(localStorage.getItem('users') || '[]');

    if (users.length === 0) {

      this.showSignupButton = true;
      this.errorMessage = 'No users found. Please sign up first.';
      return;
    }

    let existingUser = users.find((user: any) => user.email === this.email);

    if (!existingUser) {

      this.showSignupButton = true;
      this.errorMessage = 'User not found. Please sign up first.';
    } else if (existingUser.password !== this.password) {

      this.errorMessage = 'Invalid email or password. Please try again.';
    } else {

      alert('Login successful!');
      this.router.navigate(['/dashboard']);
    }
  }

}
