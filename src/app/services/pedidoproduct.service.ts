import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderItems } from '../models/order_item.model';

@Injectable({
  providedIn: 'root',
})
export class PedidoProductService {
  private baseUrl = 'http://localhost:8080/pedido_product';

  constructor(private http: HttpClient) {}

  createPedidoProduct(pedidoProduct: any): Observable<any> {
    const url = `${this.baseUrl}`;
    return this.http.post<any>(url, pedidoProduct);
  }
}
