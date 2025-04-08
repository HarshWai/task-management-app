import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ViewTaskComponent } from './components/view-task/view-task.component';
import { MainComponent } from './components/main/main.component';
import { AddTaskComponent } from './components/addtask/addtask.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AllTaskComponent } from './components/all-task/all-task.component';



export const routes: Routes = [
    { path: 'welcome', component: WelcomeComponent },
    // { path: '', redirectTo: '/welcome', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    {
        path: '', component: LayoutComponent,
        children:
            [
                { path: 'dashboard', component: DashboardComponent },
                { path: 'viewTask', component: ViewTaskComponent },
                { path: 'main', component: MainComponent },
                { path: 'view-task', component: ViewTaskComponent },
                { path: 'addTask', component: AddTaskComponent },
                { path: 'task-list/:id', component: TaskListComponent },
                { path: 'edit-task', component: EditTaskComponent },
                { path: 'all-tasks', component: AllTaskComponent }
            ]
    },

    { path: '**', redirectTo: '/welcome' }
];
