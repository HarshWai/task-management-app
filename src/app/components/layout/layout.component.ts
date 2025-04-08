import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  userName: any;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.loadUserName();
  }
  loadUserName(): void {
    const storedUser = localStorage.getItem('loggedInUser'); // 
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.userName = user.name || 'Guest'; // 
      console.log("User Name: main", this.userName); // Debugging line
    } else {
      this.userName = 'Guest'; // Default if no user is logged in
    }
  }
  navigateToWelcome() {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/welcome']);
  }

  toggleTheme(event: any) {
    if (event.target.checked) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

}
