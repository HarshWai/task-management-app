import { Injectable } from '@angular/core';


@Injectable({

  providedIn: 'root'
})
export class UserService {
  userName: any;
  router: any;
  constructor() { }

  // Method to login user and store in localStorage
  loginUser(email: string, password: string): boolean {
    // Simple mock validation (You can replace this with actual validation logic)
    if (email === 'test@example.com' && password === 'password123') {
      const user = { email }; // Store user email (you can expand this with more user details)
      localStorage.setItem('user', JSON.stringify(user)); // Store in localStorage
      return true; // Login successful
    }
    return false; // Login failed
  }

  // Method to check if the user is logged in
  isLoggedIn(): boolean {
    const user = localStorage.getItem('user');
    return user !== null; // If user data exists, the user is logged in
  }

  // Method to get the logged-in user's information
  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null; // Return user details if logged in
  }

  // Method to log out the user
  logout(): void {
    localStorage.removeItem('user'); 
  }

  loadUserName(): void {
    const storedUser = localStorage.getItem('loggedInUser'); 
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.userName = user.name || 'Guest'; 
    } else {
      this.userName = 'Guest'; 
    }
  }

  navigateToWelcome() {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/']);
  }

}
