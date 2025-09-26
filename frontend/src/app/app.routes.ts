import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'register', loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent) },
    { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) },
    { path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
];
