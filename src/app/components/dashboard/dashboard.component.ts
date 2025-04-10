import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor, NgClass],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  submitted = false;
  projects: any[] = [];
  isDarkMode = false;

  // Team members list
  availableTeamMembers: string[] = ['Alice', 'Bob', 'Charlie', 'David', 'Eve'];

  // Dropdown state
  isDropdownOpen = false;

  project = {
    title: '',
    description: '',
    status: 'New',
    createdBy: '',
    manager: '',
    teamMembers: [] as string[],
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

  // Add project
  addProject() {
    const storedUser = localStorage.getItem('loggedInUser');
    const user = storedUser ? JSON.parse(storedUser) : null;

    if (!user || !user.name) {
      alert("Error: No user is logged in.");
      return;
    }

    const startDate = new Date(this.project.startDate);
    const endDate = new Date(this.project.endDate);

    if (endDate < startDate) {
      alert("Error: End date cannot be earlier than start date.");
      return;
    }

    if (this.project.title && this.project.manager && this.project.startDate && this.project.endDate && this.project.teamMembers.length > 0) {
      const newProject = {
        ...this.project,
        id: Date.now(),
        createdBy: user.name.trim()
      };

      let projects = JSON.parse(localStorage.getItem('projects') || '[]');
      projects.push(newProject);
      localStorage.setItem('projects', JSON.stringify(projects));

      this.resetProjectForm();
      this.router.navigate(['/main']);
      this.notificationService.showSuccess('Project created successfully!');
    } else {
      alert('Please fill all required fields and select at least one team member.');
    }
  }

  // Delete project
  deleteProject(id: number) {
    this.projects = this.projects.filter(project => project.id !== id);
    this.saveProjects();
  }

  // Reset form
  resetProjectForm() {
    this.project = {
      title: '',
      description: '',
      status: 'New',
      createdBy: '',
      manager: '',
      teamMembers: [],
      startDate: '',
      endDate: '',
      dueDate: ''
    };
    this.submitted = false;
  }

  // Submit handler
  onSubmit(form: NgForm) {
    this.submitted = true;

    const startDate = new Date(this.project.startDate);
    const endDate = new Date(this.project.endDate);

    if (endDate < startDate) {
      alert("Error: End date cannot be earlier than start date.");
      return;
    }

    if (form.valid && this.project.teamMembers.length > 0) {
      this.addProject();
    } else if (this.project.teamMembers.length === 0) {
      alert("Please select at least one team member.");
    }
  }

  // Dark mode toggle
  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;

    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  // Cancel button
  cancel(): void {
    this.router.navigate(['/main']);
  }

  // Toggle team members dropdown
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  // Handle team member selection
  onTeamMemberChange(member: string, isChecked: boolean) {
    if (isChecked) {
      if (!this.project.teamMembers.includes(member)) {
        this.project.teamMembers.push(member);
      }
    } else {
      this.project.teamMembers = this.project.teamMembers.filter(m => m !== member);
    }
  }

}