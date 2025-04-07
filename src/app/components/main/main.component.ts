import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-main',
  imports: [FormsModule, NgFor, NgIf, RouterLink, NgClass],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  projects: any[] = [];
  tasks: any[] = [];
  userName: any;
  loggedInUser: string | null = null;
  selectedStatus: string = 'All';
  allProjects: any[] = [];
  searchTerm: string = '';
  selectedSortOption: string = '';
  isAscending: boolean = true;



  constructor(private router: Router, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.loadProjects();
    this.loadTasks();
    this.loadUserName();
    this.filterProjects();
  }




  loadProjects(): void {
    const storedProjects = localStorage.getItem('projects');
    const storedUser = localStorage.getItem('loggedInUser');

    if (!storedProjects || !storedUser) {
      this.projects = [];
      this.allProjects = [];
      return;
    }

    const user = JSON.parse(storedUser);
    const allProjects: any[] = JSON.parse(storedProjects);

    if (!user.name) {
      this.projects = [];
      this.allProjects = [];
      return;
    }

    // Store original list
    this.allProjects = allProjects.filter(project =>
      project.createdBy?.trim().toLowerCase() === user.name.trim().toLowerCase()
    );

    // Set initial projects to show all
    this.projects = [...this.allProjects];
  }


  filterProjects(): void {
    if (this.selectedStatus === 'All') {
      this.projects = [...this.allProjects]; // Always filter from original
    } else {
      this.projects = this.allProjects.filter(project => project.status === this.selectedStatus);
    }
  }

  searchProjects(): void {
    const term = this.searchTerm.trim().toLowerCase();
    if (term === '') {
      this.projects = [...this.allProjects]; // Reset to full list when search is cleared
    } else {
      this.projects = this.allProjects.filter(project =>
        project.title.toLowerCase().includes(term)
      );
    }
  }

  sortProjects(): void {
    if (this.selectedSortOption === 'startDate') {
      this.projects.sort((a, b) => {
        const dateA = new Date(a.startDate).getTime();
        const dateB = new Date(b.startDate).getTime();
        return dateA - dateB; // Ascending order
      });
    } else if (this.selectedSortOption === 'title') {
      this.projects.sort((a, b) => a.title.localeCompare(b.title)); // Alphabetical A-Z
    }
  }

  toggleDateSortOrder(): void {
    this.isAscending = !this.isAscending;

    this.projects.sort((a, b) => {
      const dateA = new Date(a.startDate).getTime();
      const dateB = new Date(b.startDate).getTime();

      return this.isAscending ? dateA - dateB : dateB - dateA;
    });
  }




  selectProject(projectId: number): void {
    localStorage.setItem('selectedProjectId', projectId.toString());
    // this.loadTasks();
    this.router.navigate(['/task-list', projectId]);
  }

  loadTasks(): void {
    const storedTasks = localStorage.getItem('tasks');
    const selectedProjectId = localStorage.getItem('selectedProjectId');

    // console.log('Stored Tasks:', storedTasks);
    // console.log('Selected Project ID:', selectedProjectId);

    if (!storedTasks || !selectedProjectId) {
      this.tasks = [];
      return;
    }

    const allTasks: any[] = JSON.parse(storedTasks);
    this.tasks = allTasks.filter(task => task.projectId === parseInt(selectedProjectId, 10));

    console.warn('Filtered Tasks for Project:', this.tasks);
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
    this.router.navigate(['/edit-Task']);
  }

  viewProject(project: any): void {
    localStorage.setItem('selectedProject', JSON.stringify(project)); // Store only the selected project
    this.router.navigate(['/viewTask']);
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

  getProjectDueDays(endDate: string): number {
    if (!endDate) return 0; // If no end date is provided, return 0

    const today = new Date(); // Get today's date
    const dueDate = new Date(endDate); // Convert project end date to Date object

    // Calculate the difference in time (milliseconds)
    const timeDifference = dueDate.getTime() - today.getTime();

    // Convert milliseconds to days
    const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    // Return 0 if the project deadline has passed
    return daysRemaining >= 0 ? daysRemaining : 0;
  }


  // Navigate to dashboard component
  navigateToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
  navigateToaddtask(projectId: number): void {
    localStorage.setItem('selectedProjectId', projectId.toString());
    this.router.navigate(['/task-list', projectId]);
  }
  navigateToWelcome() {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/']);
  }
  // Delete a project
  deleteProject(projectId: number): void {
    this.projects = this.projects.filter(project => project.id !== projectId);
    this.notificationService.show('Project deleted successfully!', 'error');
    localStorage.setItem('projects', JSON.stringify(this.projects));
  }
  // Delete a task
  deleteTask(taskId: number): void {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
    this.notificationService.show('Task deleted successfully!');
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  navigateToAddTask(): void {
    this.router.navigate(['/add-task']);
  }



  toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
  }



}
