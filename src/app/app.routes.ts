import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },

  /* 1. 组件是静态导入的，也就是说 OrderListComponent 是在路由配置文件里通过 import（或者在模块中导入）直接引入的。
     2. Angular 在编译和打包时，会把这个组件和它依赖的代码一起打包到主包里。
     3. 当访问 /orders 路由时，组件已经被加载好了，切换路由时速度快。
     4. 但如果项目很大，这种写法会导致所有声明的组件都打包在一起，首次加载包体积较大。
  { path: 'orders', component: OrderListComponent, canActivate: [authGuard] }, */

  /* Standalone Components 的懒加载 方式
    1. 组件不会打包进主包，而是在访问 /orders 路由时，按需异步加载对应组件的代码块（chunk）。
    2. 能明显减少初次加载时的包体积，提高应用启动速度，尤其适合大型应用。
    3. 结合 canActivate 路由守卫做权限控制，访问前会先判断 authGuard。
    4. 该组件必须是 Standalone Component（即组件本身声明了 standalone: true，不依赖于 NgModule） */
  {
    path: '',
    loadComponent: () =>
      import('./layout/layout.component').then((m) => m.LayoutComponent),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'orders',
        loadComponent: () =>
          import('./pages/order-list/order-list.component').then(
            (m) => m.OrderListComponent
          ),
      },
      {
        path: 'orders/:id',
        loadComponent: () =>
          import('./pages/order-detail/order-detail.component').then(
            (m) => m.OrderDetailComponent
          ),
      },
      // 用户列表页
      {
        path: 'users',
        loadComponent: () =>
          import('./pages/user-list/user-list.component').then(
            (m) => m.UserListComponent
          ),
      },
      // 仪表盘页
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
