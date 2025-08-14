import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Order } from '../../shared/models/order.model';
import { ApiResponse } from '../../shared/models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = '/api/orders';

  constructor(private http: HttpClient) {}

  // getOrders(): Observable<Order[]> {
  //   return this.http.get<Order[]>(this.apiUrl);
  // }
  // 获取订单列表
  getOrders(): Observable<Order[]> {
    return this.http.get<ApiResponse<Order[]>>(this.apiUrl).pipe(
      map((response: ApiResponse<Order[]>) => {
        // 可以在这里添加错误处理
        if (response.code !== 200) {
          throw new Error(`API Error: ${response.message}`);
        }
        // 返回data数组
        // console.log('response.data:', JSON.stringify(response.data, null, 2));
        return response.data || [];
      })
    );
  }

  // getOrderById(id: string): Observable<Order> {
  //   return this.http.get<Order>(`${this.apiUrl}/${id}`);
  // }
  // 获取单个订单
  getOrderById(id: string): Observable<Order> {
    return this.http.get<ApiResponse<Order>>(`${this.apiUrl}/${id}`).pipe(
      map((response: ApiResponse<Order>) => {
        if (response.code !== 200) {
          throw new Error(`API Error: ${response.message}`);
        }
        return response.data;
      })
    );
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
