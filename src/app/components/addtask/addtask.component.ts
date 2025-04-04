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

    // ✅ Ensure correct project and user are assigned
    this.task.user = localStorage.getItem('loggedInUser');
    const storedProjectId = localStorage.getItem('selectedProjectId');

    if (!storedProjectId || isNaN(parseInt(storedProjectId, 10))) {
      console.error("🚨 No valid project selected.");
      alert("Please select a project before adding a task.");
      return;
    }

    this.task.projectId = parseInt(storedProjectId, 10);
    console.log("📌 Task assigned to Project ID:", this.task.projectId);
  }

  saveTask(): void {
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

    if (!this.task.projectId || isNaN(this.task.projectId)) {
      console.error("🚨 No valid project selected when saving task.");
      alert("Please select a valid project before adding a task.");
      return;
    }

    if (this.task.id) {
      // ✅ Update existing task
      tasks = tasks.map((t: any) => (t.id === this.task.id ? this.task : t));
    } else {
      // ✅ Assign a unique ID and add new task
      this.task.id = new Date().getTime();
      tasks.push(this.task);
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.removeItem('selectedTask'); // Clear stored task after editing

    alert(this.task.id ? 'Task updated successfully!' : 'Task added successfully!');

    this.router.navigate(['/task-list', this.task.projectId]); // ✅ Redirect to correct task list
  }
}
