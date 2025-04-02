import { NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  imports: [FormsModule, NgFor, NgClass],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  projects: any[] = [];
  tasks: any[] = [];
  userName: any;

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

  // Load tasks from localStorage
  loadTasks(): void {
    const storedTasks = localStorage.getItem('tasks');
    this.tasks = storedTasks ? JSON.parse(storedTasks) : [];
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
  navigateToWelcome() {
    this.router.navigate(['/']);
  }
  // Delete a project
  deleteProject(projectId: number): void {
    this.projects = this.projects.filter(project => project.id !== projectId);
    localStorage.setItem('projects', JSON.stringify(this.projects));
  }

  // View a project (navigate to detailed view if implemented)
  viewProject(project: any): void {
    console.log('Viewing project:', project);
  }

  // Delete a task
  deleteTask(taskId: number): void {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  // Edit a task (navigate to edit component if implemented)
  editTask(task: any): void {
    console.log('Editing task:', task);
  }
}
