import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-task-list',
  imports: [FormsModule, NgFor, NgClass, RouterLink],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  tasks: any[] = [];
  userName: any;
  selectedProjectId: number | null = null;
  loggedInUser: string | null = null;
  selectedStatus: string = 'All';
  allTasks: any[] = [];
  searchTerm: string = '';
  constructor(private router: Router, private route: ActivatedRoute, public navbar: UserService) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.selectedProjectId = Number(params.get('id'));
      console.log('Project ID from URL:', this.selectedProjectId); // Debugging log

      // ✅ Update localStorage with the correct project ID
      localStorage.setItem('selectedProjectId', this.selectedProjectId.toString());

      this.loadTasks();
      this.loadUserName();
    });


    window.addEventListener('storage', () => this.loadTasks());
  }

  // ganesh code


  loadUserData(): void {
    this.loggedInUser = localStorage.getItem('loggedInUser');

    this.selectedProjectId = parseInt(localStorage.getItem('selectedProjectId') || '0', 10);
  }
  convertToHoursMinutes(value: number): string {
    const hours = Math.floor(value);
    const minutes = Math.round((value - hours) * 60);
    // Add leading zeros if needed
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes} hours`;
  }



  loadUserName(): void {
    const storedUser = localStorage.getItem('loggedInUser'); // 
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.userName = user.name || 'Guest'; // 
      console.log("User Name: main", this.userName); // Debugging line
    } else {
      this.userName = 'Guest'; // Default if no user is logged in
    }
  }

  loadSelectedProject(): void {
    const projectId = localStorage.getItem('selectedProjectId');
    this.selectedProjectId = projectId ? parseInt(projectId, 10) : null;
  }
  // Load tasks from localStorage
  loadTasks(): void {
    const storedTasks = localStorage.getItem('tasks');

    if (!storedTasks || !this.selectedProjectId) {
      this.tasks = [];
      this.allTasks = []; // ✅ clear originalTasks as well
      return;
    }

    const allTasks: any[] = JSON.parse(storedTasks);
    this.allTasks = allTasks.filter(task => task.projectId === this.selectedProjectId); // ✅ store original

    this.filterProjects(); // ✅ apply filter after loading tasks
  }

  filterProjects(): void {
    if (this.selectedStatus === 'All') {
      this.tasks = [...this.allTasks]; // ✅ filter from original tasks
    } else {
      this.tasks = this.allTasks.filter(task => task.status === this.selectedStatus);
    }
  }

  searchProjects(): void {
    const term = this.searchTerm.trim().toLowerCase();
    if (term === '') {
      this.tasks = [...this.allTasks]; // Reset to full list when search is cleared
    } else {
      this.tasks = this.allTasks.filter(tasks =>
        tasks.assignedTo.toLowerCase().includes(term)
      );
    }
  }


  getStatusClass(status: string): string {
    switch (status) {
      case 'Pending':
        return 'text-danger';
      case 'In Progress':
        return 'text-warning';
      case 'Completed':
        return 'text-success';
      default:
        return '';
    }
  }

  editTask(task: any): void {
    localStorage.setItem('selectedTask', JSON.stringify(task));
    this.router.navigate(['/edit-task']); // Navigate to edit page
  }

  navigateToAddTask(): void {
    localStorage.removeItem('selectedTask'); // Ensure new task is blank
    this.router.navigate(['/addTask']);
  }

  deleteTask(taskId: number): void {

    this.tasks = this.tasks.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));


  }
}
