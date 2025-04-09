import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-signup',
  imports: [FormsModule, RouterLink, NgIf],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  formSubmitted: boolean = false;

  constructor(private router: Router, private notificationService: NotificationService) { }

  // Email format validator
  isValidEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  onSignup(): void {
    this.formSubmitted = true;


    // Check email format
    if (!this.isValidEmail(this.email)) {
      this.notificationService.showWarning('Enter valid email!');
      return;
    }

    let users = JSON.parse(localStorage.getItem('users') || '[]');

    let userExists = users.some((user: any) => user.email === this.email);

    if (userExists) {
      this.notificationService.showInfo('User already exist.');
    } else {
      users.push({ name: this.name, email: this.email, password: this.password });
      localStorage.setItem('users', JSON.stringify(users));
      console.log(users);
      this.router.navigate(['/login']);
    }
  }
}
