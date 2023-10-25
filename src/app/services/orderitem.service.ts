import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderItems } from '../models/order_item.model';

@Injectable({
  providedIn: 'root'
})
export class OrderItemsService {
  private baseUrl = 'http://localhost:8080/orderItems';

  constructor(private http: HttpClient) {}

  createOrderItem(orderItem: any): Observable<OrderItems> {
    const url = `${this.baseUrl}/orderItems`;
    return this.http.post<OrderItems>(url, orderItem);
  }
}
