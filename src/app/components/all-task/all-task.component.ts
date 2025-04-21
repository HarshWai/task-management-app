import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-all-task',
  imports: [NgFor, NgIf],
  templateUrl: './all-task.component.html',
  styleUrl: './all-task.component.css'
})
export class AllTaskComponent implements OnInit {
  projects: any[] = [];
  tasks: any[] = [];

  ngOnInit(): void {
    const storedProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');

    console.log('Stored Projects:', storedProjects);
    console.log('Stored Tasks:', storedTasks);

    this.projects = storedProjects;
    this.tasks = storedTasks;
  }

  getTasksForProject(projectId: number): any[] {
    return this.tasks.filter(task => task.projectId === projectId);
  }
}
