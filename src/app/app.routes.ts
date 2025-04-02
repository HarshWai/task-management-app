import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ViewTaskComponent } from './components/view-task/view-task.component';
import { MainComponent } from './components/main/main.component';
import { AddtaskComponent } from './components/addtask/addtask.component';


export const routes: Routes = [
    { path: 'welcome', component: WelcomeComponent },
    { path: '', redirectTo: '/welcome', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'viewTask', component: ViewTaskComponent },
    { path: 'main', component: MainComponent },
    { path: 'view-task', component: ViewTaskComponent },
    { path: 'addTask', component: AddtaskComponent },
    { path: '**', redirectTo: '/welcome' }
];
