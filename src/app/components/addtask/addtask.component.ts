import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-task',
  imports: [FormsModule],
  templateUrl: './addtask.component.html',
  styleUrl: './addtask.component.css'
})
export class AddTaskComponent {
  task: any = {
    id: null, // Ensure ID is set for updates
    title: '',
    assignedTo: '',
    status: 'Pending',
    estimate: '',
    timeSpent: '',
    deadline: '',
    projectId: null,
    user: null
  };

  constructor(private router: Router) { }

  ngOnInit(): void {
    const storedTask = localStorage.getItem('selectedTask');
    if (storedTask) {
      this.task = JSON.parse(storedTask);
    }

    // Assign task to the logged-in user and selected project
    this.task.user = localStorage.getItem('loggedInUser');
    this.task.projectId = parseInt(localStorage.getItem('selectedProjectId') || '0', 10);
  }

  saveTask(): void {
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

    if (this.task.id) {
      // ✅ Update existing task
      tasks = tasks.map((t: any) => (t.id === this.task.id ? this.task : t));
    } else {
      // ✅ Add new task
      this.task.id = new Date().getTime(); // Assign a unique ID
      tasks.push(this.task);
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.removeItem('selectedTask'); // Clear stored task after editing

    alert(this.task.id ? 'Task updated successfully!' : 'Task added successfully!');

    this.router.navigate(['/task-list/:id']); // Redirect to task list
  }
}
