import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [NgFor, FormsModule,],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {


  projects: any[] = [];

  project = {
    title: '',
    description: '',
    createdBy: '',
    manager: '',
    teamMembers: '',
    startDate: '',
    endDate: '',
    dueDate: ''
  };

  constructor(private router: Router) {
    this.loadProjects();
  }

  // Load projects from localStorage
  loadProjects() {
    const storedProjects = localStorage.getItem('projects');
    if (storedProjects) {
      this.projects = JSON.parse(storedProjects);
    }
  }

  // Save projects to localStorage
  saveProjects() {
    localStorage.setItem('projects', JSON.stringify(this.projects));
  }

  // Add new project and navigate to the main component
  addProject() {
    if (this.project.title && this.project.manager && this.project.startDate && this.project.endDate) {
      const newProject = { ...this.project, id: Date.now() };
      this.projects.push(newProject);
      this.saveProjects();
      this.resetProjectForm();

      // Navigate to the main component after saving the project
      this.router.navigate(['/main']);
    }
  }

  // Delete project
  deleteProject(id: number) {
    this.projects = this.projects.filter(project => project.id !== id);
    this.saveProjects();
  }

  // Reset form
  resetProjectForm() {
    this.project = { title: '', description: '', createdBy: '', manager: '', teamMembers: '', startDate: '', endDate: '', dueDate: '' };
  }

}
