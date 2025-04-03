import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-task-list',
  imports: [FormsModule, NgFor, NgClass, RouterLink],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  tasks: any[] = [];
  selectedProjectId: number | null = null;
  loggedInUser: string | null = null;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.loadSelectedProject();
    this.loadTasks();
    window.addEventListener('storage', () => this.loadTasks());
    this.loadUserData();
  }
  loadUserData(): void {
    this.loggedInUser = localStorage.getItem('loggedInUser');
    this.selectedProjectId = parseInt(localStorage.getItem('selectedProjectId') || '0', 10);
  }
  loadSelectedProject(): void {
    const projectId = localStorage.getItem('selectedProjectId');
    this.selectedProjectId = projectId ? parseInt(projectId, 10) : null;
  }
  // Load tasks from localStorage
  loadTasks(): void {
    const storedTasks = localStorage.getItem('tasks');
    const allTasks = storedTasks ? JSON.parse(storedTasks) : [];
    this.tasks = storedTasks ? JSON.parse(storedTasks) : [];
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Pending':
        return 'table-danger';
      case 'In Progress':
        return 'table-warning';
      case 'Completed':
        return 'table-success';
      default:
        return '';
    }
  }

  editTask(task: any): void {
    localStorage.setItem('selectedTask', JSON.stringify(task));
    this.router.navigate(['/edit-task']); // Navigate to edit page
  }

  navigateToAddTask(): void {
    localStorage.removeItem('selectedTask'); // Ensure new task is blank
    this.router.navigate(['/addTask']);
  }

  deleteTask(taskId: number): void {

    this.tasks = this.tasks.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));


  }
}
