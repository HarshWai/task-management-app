import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-add-task',
  imports: [FormsModule, NgIf, NgClass],
  templateUrl: './addtask.component.html',
  styleUrl: './addtask.component.css'
})
export class AddTaskComponent {
  submitted = false;

  task: any = {
    id: null,
    title: '',
    assignedTo: '',
    status: 'Pending',
    estimatedTime: '', // "HH:mm" format from input[type="time"]
    timeSpent: '',     // "HH:mm" format from input[type="time"]
    deadline: '',
    projectId: null,
    user: null
  };

  constructor(
    private router: Router,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    const storedTask = localStorage.getItem('selectedTask');

    if (storedTask) {
      this.task = JSON.parse(storedTask);

      // Convert estimate "2h 30m" to "HH:mm"
      if (this.task.estimate) {
        const [hours, minutes] = this.task.estimate.split(' ').map((part: string) => parseInt(part));
        this.task.estimatedTime = this.formatTime(hours, minutes);
      }

      // Convert timeSpent "1h 45m" to "HH:mm"
      if (this.task.timeSpent) {
        const [hours, minutes]: [number, number] = this.task.timeSpent.split(' ').map((part: string) => parseInt(part));
        this.task.timeSpent = this.formatTime(hours, minutes);
      }
    }

    this.task.user = localStorage.getItem('loggedInUser');
    const storedProjectId = localStorage.getItem('selectedProjectId');

    if (!storedProjectId || isNaN(parseInt(storedProjectId, 10))) {
      alert("Please select a project before adding a task.");
      return;
    }

    this.task.projectId = parseInt(storedProjectId, 10);
  }

  saveTask(): void {
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

    if (!this.task.projectId || isNaN(this.task.projectId)) {
      console.error("No valid project selected when saving task.");
      alert("Please select a valid project before adding a task.");
      return;
    }

    // Convert "HH:mm" to "Xh Ym" format
    if (this.task.estimatedTime) {
      const [hours, minutes] = this.task.estimatedTime.split(':').map(Number);
      this.task.estimate = `${hours}h ${minutes}m`;
    }

    if (this.task.timeSpent) {
      const [hours, minutes] = this.task.timeSpent.split(':').map(Number);
      this.task.timeSpent = `${hours}h ${minutes}m`;
    }

    if (this.task.id) {
      tasks = tasks.map((t: any) => (t.id === this.task.id ? this.task : t));
    } else {
      this.task.id = new Date().getTime();
      tasks.push(this.task);
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.removeItem('selectedTask');

    this.router.navigate(['/task-list', this.task.projectId]);
    this.notificationService.show('Task saved successfully!', 'success');
  }

  onSubmit(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.saveTask();
    }
  }

  // toggleDarkMode(event: any) {
  //   const isChecked = event.target.checked;
  //   if (isChecked) {
  //     document.body.classList.add('dark-mode');
  //   } else {
  //     document.body.classList.remove('dark-mode');
  //   }
  // }

  isDarkMode = false;

  toggleDarkMode(event: any) {
    this.isDarkMode = event.target.checked;

    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }



  // Helper function to format "h m" to "HH:mm"
  private formatTime(hours: number, minutes: number): string {
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}`;
  }


}
