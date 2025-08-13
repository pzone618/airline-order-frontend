import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { SharedImports } from '../../shared/shared-imports';
import { Order } from '../../shared/models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [...SharedImports],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  todayOrdersCount = 0;
  weeklyRevenue = 0;
  pendingOrdersCount = 0;
  activeUsersCount = 0; // 你可以从后端获取或模拟数据

  recentOrders: Order[] = [];
  loading = false;

  constructor(
    private orderService: OrderService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.loading = true;
    // 这里简单示例，实际你可能要调用多个接口聚合数据
    this.orderService.getAllOrders().subscribe({
      next: (res) => {
        this.loading = false;
        if (res.status === 200) {
          const orders = res.data;
          this.recentOrders = orders.slice(0, 5);
          this.todayOrdersCount = orders.filter((order) =>
            this.isToday(order.creationDate)
          ).length;
          this.weeklyRevenue = orders.reduce((acc, o) => acc + o.amount, 0);
          this.pendingOrdersCount = orders.filter(
            (order) => order.status === 'PENDING_PAYMENT'
          ).length;
        }
      },
      error: () => {
        this.loading = false;
      },
    });

    this.userService.getAllUsers().subscribe({
      next: (res) => {
        this.loading = false;
        if (res.status === 200) {
          this.activeUsersCount = res.data.length;
        }
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  isToday(dateStr: string): boolean {
    const date = new Date(dateStr);
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }

  viewOrder(id: number): void {
    this.router.navigate(['/orders', id]);
  }
}
