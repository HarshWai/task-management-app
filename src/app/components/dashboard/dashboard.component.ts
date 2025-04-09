import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule, NgIf],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  submitted = false;
  projects: any[] = [];
  isDarkMode = false;
  project = {
    title: '',
    description: '',
    status: '',
    createdBy: '',
    manager: '',
    teamMembers: '',
    startDate: '',
    endDate: '',
    dueDate: '',

  };

  constructor(private router: Router, private notificationService: NotificationService) {
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
    const storedUser = localStorage.getItem('loggedInUser');
    const user = storedUser ? JSON.parse(storedUser) : null;

    if (!user || !user.name) {
      alert("Error: No user is logged in.");
      return;
    }

    // Validate startDate and endDate
    const startDate = new Date(this.project.startDate);
    const endDate = new Date(this.project.endDate);

    if (endDate < startDate) {
      alert("Error: End date cannot be earlier than start date.");
      return;
    }

    if (this.project.title && this.project.manager && this.project.startDate && this.project.endDate) {
      const newProject = {
        ...this.project,
        id: Date.now(),
        createdBy: user.name.trim() // ✅ Automatically assign `createdBy`
      };

      let projects = JSON.parse(localStorage.getItem('projects') || '[]');
      projects.push(newProject);
      localStorage.setItem('projects', JSON.stringify(projects));
      this.resetProjectForm();
      this.router.navigate(['/main']);
      this.notificationService.showSuccess('Project created successfully!');
    }
  }


  // Delete project
  deleteProject(id: number) {
    this.projects = this.projects.filter(project => project.id !== id);
    this.saveProjects();
  }

  // Reset form
  resetProjectForm() {
    this.project = { title: '', description: '', status: '', createdBy: '', manager: '', teamMembers: '', startDate: '', endDate: '', dueDate: '' };
  }
  onSubmit(form: NgForm) {
    this.submitted = true;

    const startDate = new Date(this.project.startDate);
    const endDate = new Date(this.project.endDate);

    if (endDate < startDate) {
      alert("Error: End date cannot be earlier than start date.");
      return;
    }

    if (form.valid) {
      this.addProject();
    }
  }

  // toggleDarkMode() {
  //   document.body.classList.toggle('dark-mode');
  // }




  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;

    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
  goBack(): void {
    this.router.navigate(['/main']);
  }
}
