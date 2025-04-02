import { Component, HostListener } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'task-management-app';

  constructor(private router: Router) { }

  @HostListener('window:popstate', ['$event'])
  onBackButton(event: Event) {
    // If no user is logged in, prevent back navigation
    if (!localStorage.getItem('authUser')) {
      this.router.navigate(['/welcome']);
    }
  }
}
