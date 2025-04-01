import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({

  selector: 'app-dashboard',
  imports: [FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  // Project Data
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

  // Task Data
  task = {
    title: '',
    assignedTo: '',
    status: 'High',
    estimate: 0,
    timeSpent: 0
  };

  tasks = [
    { id: 1, title: 'Task 1', assignedTo: 'John', status: 'High', estimate: 5, timeSpent: 2 },
    { id: 2, title: 'Task 2', assignedTo: 'Jane', status: 'Medium', estimate: 3, timeSpent: 1 }
  ];

  // Create a new project
  onCreateProject() {
    console.log("Project Created:", this.project);
    // Here you can push the new project into a project list or handle it according to your business logic
  }

  // Create a new task
  onCreateTask() {
    const newTask = {
      id: Date.now(),
      title: this.task.title,
      assignedTo: this.task.assignedTo,
      status: this.task.status,
      estimate: this.task.estimate,
      timeSpent: this.task.timeSpent
    };
    this.tasks.push(newTask);
    this.resetTaskForm();
  }

  // Edit a task
  editTask(task: any) {
    this.task = { ...task }; // Populate form fields with the task data
  }

  // Delete a task
  deleteTask(taskId: number) {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
  }

  // Reset task form after adding a task
  resetTaskForm() {
    this.task = { title: '', assignedTo: '', status: 'High', estimate: 0, timeSpent: 0 };
  }
}
