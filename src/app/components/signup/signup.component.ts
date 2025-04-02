import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [FormsModule, RouterLink, FormsModule, NgIf],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  formSubmitted: boolean = false;
  constructor(private router: Router) { }
  // This method will be called when the user submits the signup form
  onSignup(): void {
    this.formSubmitted = true;
    if (this.name && this.email && this.password) {
      let users = JSON.parse(localStorage.getItem('users') || '[]'); // Get existing users or an empty array
      let userExists = users.some((user: any) => user.email === this.email);

      if (userExists) {
        alert('User already exists! Please log in.');
      } else {
        users.push({ name: this.name, email: this.email, password: this.password });
        localStorage.setItem('users', JSON.stringify(users));
        console.log(users);
        this.router.navigate(['/login']);  // Redirect to login page
      }
    } else {
      let validate = "All fields are required";

    }
  }
}
