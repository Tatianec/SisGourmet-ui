import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Pedido } from '../models/pedido.model';
import { AuthService } from './auth.service';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  private baseUrl = 'http://localhost:8080/pedido';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getCurrentUserId(): number | null {
    const userId = this.authService.getUserId();
    return userId !== undefined ? userId : null;
  }


  getPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.baseUrl);
  }

  getPedidoById(id: number): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.baseUrl}/${id}`);
  }


  addPedido(pedido: Pedido): Observable<Pedido> {
    const url = `${this.baseUrl}`;
    return this.http.post<Pedido>(url, pedido);
  }



  deletePedido(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
