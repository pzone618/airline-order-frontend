import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { Order } from '../../shared/models';
import { CommonModule } from '@angular/common';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
  imports: [CommonModule, NzDescriptionsModule, NzButtonModule, NzSpinModule],
})
export class OrderDetailComponent implements OnInit {
  order?: Order;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private orderService: OrderService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.orderService.getOrderById(id).subscribe({
        next: (res) => {
          this.order = res.data; // 后端返回 BaseResponse<OrderDTO>
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        },
      });
    }
  }
}
