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
    this.errorMessage = ''; // Clear previous errors
    this.showSignupButton = false; // Hide signup button initially

    let users = JSON.parse(localStorage.getItem('users') || '[]');

    if (!users.length) {
      this.errorMessage = 'No users found. Please sign up first.';
      this.showSignupButton = true;
      return;
    }

    let existingUser = users.find((user: any) => user.email === this.email);

    if (!existingUser) {
      this.errorMessage = 'User not found. Please sign up first.';
      this.showSignupButton = true;
    } else if (existingUser.password !== this.password) {
      this.errorMessage = 'Invalid email or password. Please try again.';
    } else {
      // ✅ Store the full logged-in user details in localStorage
      localStorage.setItem('loggedInUser', JSON.stringify({
        name: existingUser.name,
        email: existingUser.email,
        loginTime: new Date().toISOString() // ✅ Store login timestamp
      }));

      console.log('User Logged In:', existingUser); // ✅ Log user details
      alert('Login successful!');
      this.router.navigate(['/main']);
    }
  }
}



