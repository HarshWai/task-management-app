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
  notifications: { message: string, type: string, state: string }[] = [];

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    // this.notificationService.notifications$.subscribe(notification => {
    //   // Add notification with 'enter' state
    //   const newNotification = { ...notification, state: 'enter' };
    //   this.notifications.push(newNotification);

    //   // Start transition to visible
    //   setTimeout(() => {
    //     newNotification.state = '';
    //   });

    //   // Remove with animation after 2s
    //   setTimeout(() => {
    //     newNotification.state = 'exit';
    //   }, 2000);

    //   // Finally remove from array after animation ends
    //   setTimeout(() => {
    //     this.notifications = this.notifications.filter(n => n !== newNotification);
    //   }, 2500); // exit animation time
    // });
  }
}
