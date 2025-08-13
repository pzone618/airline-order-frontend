import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
import { Order } from '../../shared/models';
import { SharedImports } from '../../shared/shared-imports';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [...SharedImports],
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];
  loading = false;

  constructor(
    private orderService: OrderService,
    private message: NzMessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.loading = true;
    this.orderService.getAllOrders().subscribe({
      next: (res) => {
        this.loading = false;
        if (res.status === 200) {
          this.orders = res.data;
        } else {
          this.message.error(res.message || '加载订单失败');
        }
      },
      error: () => {
        this.loading = false;
        this.message.error('加载订单失败，请稍后重试');
      },
    });
  }

  viewOrder(id: number): void {
    this.router.navigate(['/orders', id]);
  }

  editOrder(id: number): void {
    this.message.info(`编辑订单，ID: ${id}，功能待实现`);
  }
}
