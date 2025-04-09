import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  task: any = {
    id: null,
    title: '',
    assignedTo: '',
    status: 'Pending',
    estimate: '',
    timeSpent: '',
    deadline: ''
  };

  submitted: boolean = false; // ✅ Added submitted flag

  constructor(private router: Router, private notificationService: NotificationService) { }

  ngOnInit(): void {
    const storedTask = localStorage.getItem('selectedTask');
    if (storedTask) {
      this.task = JSON.parse(storedTask);
    }
  }

  updateTask(form: NgForm): void {
    const selectedProjectId = localStorage.getItem('selectedProjectId');
    this.submitted = true; // ✅ Set form as submitted to show validation messages

    if (form.invalid) {
      return; // ✅ Stop if form is invalid
    }

    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

    tasks = tasks.map((t: any) => (t.id === this.task.id ? this.task : t));

    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.removeItem('selectedTask');
    this.notificationService.showSuccess('Task Updated successfully!');
    if (selectedProjectId) {
      this.router.navigate(['/task-list', selectedProjectId]);
    } else {
      this.router.navigate(['/main']); // Fallback if no project ID found
    }
  }

  goBack(): void {
    const selectedProjectId = localStorage.getItem('selectedProjectId');
    if (selectedProjectId) {
      this.router.navigate(['/task-list', selectedProjectId]);
    } else {
      this.router.navigate(['/main']); // Fallback if no project ID found
    }
  }
}
