// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { HelloWorld } from './pages/hello-world/hello-world';

export const routes: Routes = [
  {
    path: 'hello-world',
    component: HelloWorld,
  },
  { path: '', redirectTo: '/hello-world', pathMatch: 'full' },
];