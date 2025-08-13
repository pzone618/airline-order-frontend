import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // 1. 导入 map 操作符
import { Order } from '../../shared/models/order.model';

// 定义一个接口来描述后端返回的完整包装对象结构
interface ApiResponse {
  success: boolean;
  code: string;
  message: string;
  data: Order[]; // data 属性才是我们需要的订单数组
}

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = '/api/orders';

  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    return this.http.get<ApiResponse>(this.apiUrl).pipe(
      map(response => response.data)
    );
  }

  getOrderById(id: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${id}`);
  }
  pay(id: string): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/${id}/pay`, {});
  }

  cancel(id: string): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/${id}/cancel`, {});
  }

  retryTicketing(id: string): Observable<void> {
    // 这个请求会立即返回 202, 后端在后台处理
    return this.http.post<void>(`${this.apiUrl}/${id}/retry-ticketing`, {});
  }
}
