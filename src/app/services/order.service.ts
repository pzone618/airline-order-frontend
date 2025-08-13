import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../shared/models';

interface BaseResponse<T> {
  status: number;
  message: string;
  data: T;
}

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = '/api/orders';

  constructor(private http: HttpClient) {}

  /** 获取全部订单 */
  getAllOrders(): Observable<BaseResponse<Order[]>> {
    return this.http.get<BaseResponse<Order[]>>(this.apiUrl);
  }

  /** 根据 ID 获取订单详情 */
  getOrderById(id: number): Observable<BaseResponse<Order>> {
    return this.http.get<BaseResponse<Order>>(`${this.apiUrl}/${id}`);
  }
}
