import { Injectable } from '@angular/core';
import { NotificationService } from './notification.service';
import { Task } from '../interfaces/inter';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private notificationService: NotificationService) { }

  addTask(task: Task) {
    // ...add task logic
    this.notificationService.notify('New task added successfully!');
  }

  updateTask(task: Task) {
    // ...update task logic
    this.notificationService.notify('Task updated successfully!');
  }
}
