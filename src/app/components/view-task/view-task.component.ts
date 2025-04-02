import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-task',
  imports: [NgIf, FormsModule],
  templateUrl: './view-Task.component.html',
  styleUrls: ['./view-Task.component.css']
})
export class ViewTaskComponent {
  selectedProject: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    const storedProject = localStorage.getItem('selectedProject'); // Load only selected project
    this.selectedProject = storedProject ? JSON.parse(storedProject) : null;

    if (this.selectedProject) {
      console.log('Project Title:', this.selectedProject.title);
    } else {
      console.log('No project found!');
    }
  }



  // Get object keys dynamically
  objectKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }

  // Navigate back to Main Component
  goBack(): void {
    this.router.navigate(['/main']);
  }

  // Update Task (You can implement actual update logic here)
  updateProject(): void {
    if (this.selectedProject) {
      let projects = JSON.parse(localStorage.getItem('projects') || '[]');

      let updatedProjects = projects.map((proj: any) =>
        proj.id === this.selectedProject.id ? this.selectedProject : proj
      );

      localStorage.setItem('projects', JSON.stringify(updatedProjects));
      localStorage.setItem('selectedProject', JSON.stringify(this.selectedProject));

      alert('Project updated successfully!');

      // ✅ Navigate back to 'main' after saving
      this.router.navigate(['/main']);
    }
  }

}
