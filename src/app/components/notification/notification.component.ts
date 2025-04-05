import { NgClass, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notification',
  imports: [NgFor, NgClass],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  notifications: { message: string, type: string }[] = [];
  constructor(private notificationService: NotificationService) { }
  // Call this method to show notification
  ngOnInit() {
    this.notificationService.notifications$.subscribe(notification => {
      this.notifications.push(notification);
      setTimeout(() => {
        this.notifications.shift();
      }, 3000);
    });
  }
}
