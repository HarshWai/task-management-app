import { Component, HostListener } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NotificationComponent } from './components/notification/notification.component';
import { LayoutComponent } from './components/layout/layout.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NotificationComponent,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'task-management-app';

  constructor(private router: Router) { }

  @HostListener('window:popstate', ['$event'])
  onBackButton(event: Event) {

    if (!localStorage.getItem('authUser')) {
      this.router.navigate(['/welcome']);
    }
  }
}
