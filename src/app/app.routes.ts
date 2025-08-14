// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { HelloWorld } from './pages/hello-world/hello-world';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { OrderListComponent } from './pages/order-list/order-list.component';
import { OrderDetailComponent } from './pages/order-detail/order-detail.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'hello-world',
    component: HelloWorld,
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'orders',
    component: OrderListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'orders/:id',
    component: OrderDetailComponent,
    canActivate: [authGuard],
  },
  { path: '', redirectTo: '/orders', pathMatch: 'full' },
  { path: '**', redirectTo: '/orders' },
];
