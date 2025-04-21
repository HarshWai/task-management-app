import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, RouterLink, NgIf],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  formSubmitted: boolean = false;
  showPassword: boolean = false;
  constructor(private router: Router, private notificationService: NotificationService) { }


  isValidEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }


  isValidPassword(password: string): boolean {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/;
    return passwordPattern.test(password);
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSignup(): void {
    this.formSubmitted = true;

    if (!this.name || !this.email || !this.password) {
      this.notificationService.showWarning('All fields are required!');
      return;
    }

    if (!this.isValidEmail(this.email)) {
      this.notificationService.showWarning('Enter a valid email!');
      return;
    }


    if (!this.isValidPassword(this.password)) {
      this.notificationService.showWarning('Password must be at least 6 characters long and include uppercase, lowercase, number, and special character.');
      return;
    }

    let users = JSON.parse(localStorage.getItem('users') || '[]');

    let userExists = users.some((user: any) => user.email === this.email);

    if (userExists) {
      this.notificationService.showInfo('User already exists.');
    } else {
      users.push({ name: this.name, email: this.email, password: this.password });
      localStorage.setItem('users', JSON.stringify(users));
      console.log(users);
      this.notificationService.showSuccess('Account created successfully!');
      this.router.navigate(['/login']);
    }
  }
}