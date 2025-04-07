import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-add-task',
  imports: [FormsModule],
  templateUrl: './addtask.component.html',
  styleUrl: './addtask.component.css'
})
export class AddTaskComponent {
  task: any = {
    id: null,
    title: '',
    assignedTo: '',
    status: 'Pending',
    estimate: '',
    timeSpent: '',
    deadline: '',
    projectId: null,
    user: null
  };

  constructor(private router: Router, private notificationService: NotificationService) { }

  ngOnInit(): void {
    const storedTask = localStorage.getItem('selectedTask');
    if (storedTask) {
      this.task = JSON.parse(storedTask);
    }

    this.task.user = localStorage.getItem('loggedInUser');
    const storedProjectId = localStorage.getItem('selectedProjectId');

    if (!storedProjectId || isNaN(parseInt(storedProjectId, 10))) {
      alert("Please select a project before adding a task.");
      return;
    }

    this.task.projectId = parseInt(storedProjectId, 10);
  }

  saveTask(): void {
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

    if (!this.task.projectId || isNaN(this.task.projectId)) {
      console.error(" No valid project selected when saving task.");
      alert("Please select a valid project before adding a task.");
      return;
    }

    if (this.task.id) {

      tasks = tasks.map((t: any) => (t.id === this.task.id ? this.task : t));
    } else {

      this.task.id = new Date().getTime();
      tasks.push(this.task);
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.removeItem('selectedTask');

    this.router.navigate(['/task-list', this.task.projectId]);
    this.notificationService.show('Task added successfully!', 'success');
  }
}
