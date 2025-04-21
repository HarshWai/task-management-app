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
    this.errorMessage = '';
    this.showSignupButton = false;

    if (!this.email) {
      this.errorMessage = 'Email is required.';
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.email)) {
      this.errorMessage = 'Please enter a valid email address.';
      return;
    }

    if (!this.password) {
      this.errorMessage = 'Password is required.';
      return;
    }

    if (this.password.length < 8) {
      this.errorMessage = 'Password must be at least 8 characters long.';
      return;
    }

    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}[\]|;:'",.<>/?]).+$/;
    if (!passwordPattern.test(this.password)) {
      this.errorMessage = 'Password must include 1 uppercase letter, 1 number, and 1 special character.';
      return;
    }


    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === this.email && u.password === this.password);

    if (user) {
      localStorage.setItem('loggedInUser', JSON.stringify({
        name: user.name,
        email: user.email,
        loginTime: new Date().toISOString()
      }));
      console.log('User Logged In:', user);
      this.router.navigate(['/main']);
    } else {
      this.errorMessage = 'Invalid email or password. Please try again.';
    }

    if (!users.length) {
      this.errorMessage = 'No users found. Please sign up first.';
      this.showSignupButton = true;
    }

    let existingUser = users.find((user: any) => user.email === this.email);

    if (!existingUser) {
      this.errorMessage = 'User not found. Please sign up first.';
      this.showSignupButton = true;
    } else if (existingUser.password !== this.password) {
      this.errorMessage = 'Invalid email or password. Please try again.';
    } else {
      localStorage.setItem('loggedInUser', JSON.stringify({
        name: existingUser.name,
        email: existingUser.email,
        loginTime: new Date().toISOString()
      }));

      console.log('User Logged In:', existingUser);

      this.router.navigate(['/main']);
    }
  }
}
