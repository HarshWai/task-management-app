import { NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  imports: [FormsModule, NgFor],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  projects: any[] = [];
  tasks: any[] = [];
  userName: any;
  loggedInUser: string | null = null;


  constructor(private router: Router) { }

  ngOnInit(): void {
    this.loadProjects();
    this.loadTasks();
    this.loadUserName();

  }

  // Load projects from localStorage
  loadProjects(): void {
    const storedProjects = localStorage.getItem('projects');
    this.projects = storedProjects ? JSON.parse(storedProjects) : [];

  }

  selectProject(projectId: number): void {
    localStorage.setItem('selectedProjectId', projectId.toString());
    this.router.navigate(['/task-list']);
  }
  // Load tasks from localStorage
  loadTasks(): void {
    const storedTasks = localStorage.getItem('tasks');
    this.tasks = storedTasks ? JSON.parse(storedTasks) : [];
  }

  getStatusClass(status: string): string {
    if (status === 'Pending') {
      return 'table-danger';
    } else if (status === 'In Progress') {
      return 'table-warning';
    } else if (status === 'Completed') {
      return 'table-success';
    } else {
      return '';
    }
  }
  editTask(task: any): void {
    localStorage.setItem('selectedTask', JSON.stringify(task));
    this.router.navigate(['/edit-Task']);
  }

  viewProject(project: any): void {
    localStorage.setItem('selectedProject', JSON.stringify(project)); // Store only the selected project
    this.router.navigate(['/viewTask']); // Navigate to viewTask component
  }

  loadUserName(): void {
    const storedUser = localStorage.getItem('loggedInUser'); // ✅ Get logged-in user
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.userName = user.name || 'Guest'; // ✅ Set username properly
    } else {
      this.userName = 'Guest'; // Default if no user is logged in
    }
  }


  // Navigate to dashboard component
  navigateToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
  navigateToaddtask(projectId: number): void {
    this.router.navigate(['/task-list', projectId]);
  }
  navigateToWelcome() {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/']);
  }
  // Delete a project
  deleteProject(projectId: number): void {
    this.projects = this.projects.filter(project => project.id !== projectId);
    localStorage.setItem('projects', JSON.stringify(this.projects));
  }
  // Delete a task
  deleteTask(taskId: number): void {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  navigateToAddTask(): void {
    this.router.navigate(['/add-task']);
  }


}
