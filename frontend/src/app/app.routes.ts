import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { authRoleGuard } from './guards/auth-role.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/landing-page/landing-page.component').then(
        (m) => m.LandingPageComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/dash-board/dash-board.component').then(
        (m) => m.DashboardComponent
      ),
    canActivate: [authGuard, authRoleGuard],
    data: { roles: ['customer', 'admin'] },
  },
  {
    path: 'policy-portal',
    loadComponent: () =>
      import('./pages/policy-portal/policy-portal.component').then(
        (m) => m.PolicyPortalComponent
      ),
    canActivate: [authGuard, authRoleGuard],
    data: { roles: ['customer', 'admin', 'agent'] },
  },
  {
    path: 'buy-policy/:id',
    loadComponent: () =>
      import('./pages/buy-portal/buy-portal.component').then(
        (m) => m.BuyPortalComponent
      ),
    canActivate: [authGuard, authRoleGuard],
    data: { roles: ['customer', 'admin', 'agent'] },
  },
  {
    path: 'repay-policy/:id',
    loadComponent: () =>
      import('./pages/repayment-page/repayment-page.component').then(
        (m) => m.RepaymentPageComponent
      ),
    canActivate: [authGuard, authRoleGuard],
    data: { roles: ['customer'] },
  },
  {
    path: 'claim-policy/:id',
    loadComponent: () =>
      import('./pages/claim-page/claim-page.component').then(
        (m) => m.ClaimPageComponent
      ),
    canActivate: [authGuard, authRoleGuard],
    data: { roles: ['customer'] },
  },
  {
    path: 'policy-details/:id',
    loadComponent: () =>
      import('./pages/policy-details/policy-details.component').then(
        (m) => m.PolicyDetailsComponent
      ),
    canActivate: [authGuard, authRoleGuard],
    data: { roles: ['customer'] },
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./pages/admin-portal/admin-portal.component').then(
        (m) => m.AdminPortalComponent
      ),
    canActivate: [authGuard, authRoleGuard],
    data: { roles: ['admin'] },
  },
  {
    path: 'agent-portal',
    loadComponent: () =>
      import('./pages/agent-portal/agent-portal.component').then(
        (m) => m.AgentPortalComponent
      ),
    canActivate: [authGuard, authRoleGuard],
    data: { roles: ['admin'] },
  },
  {
    path: 'admin/audit',
    loadComponent: () =>
      import('./pages/audit-page/audit-page.component').then(
        (m) => m.AuditPageComponent
      ),
    canActivate: [authGuard, authRoleGuard],
    data: { roles: ['admin'] },
  },
  {
    path: 'admin/summary',
    loadComponent: () =>
      import('./pages/audit-page/audit-page.component').then(
        (m) => m.AuditPageComponent
      ),
    canActivate: [authGuard, authRoleGuard],
    data: { roles: ['admin'] },
  },
];
