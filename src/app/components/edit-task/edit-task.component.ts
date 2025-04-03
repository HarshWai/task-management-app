import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-task',
  imports: [FormsModule],
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent {
  task: any = {
    id: null,
    title: '',
    assignedTo: '',
    status: 'Pending',
    estimate: '',
    timeSpent: '',
    deadline: ''
  };

  constructor(private router: Router) { }

  ngOnInit(): void {
    const storedTask = localStorage.getItem('selectedTask');
    if (storedTask) {
      this.task = JSON.parse(storedTask);
    }
  }

  updateTask(): void {
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

    tasks = tasks.map((t: any) => (t.id === this.task.id ? this.task : t));

    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.removeItem('selectedTask');

    alert('Task updated successfully!');
    this.router.navigate(['/task-list']);
  }
}
