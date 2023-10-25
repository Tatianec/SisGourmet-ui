
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido.model';
import { Desk } from '../models/desk.model';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  addPedido(pedido: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>(`${this.baseUrl}/pedido`, pedido);
  }

  getPedidosByUserId(userId: number): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.baseUrl}/pedidos/user/${userId}`);
  }

  getMesas(): Observable<Desk[]> {
    return this.http.get<Desk[]>(`${this.baseUrl}/mesas`);
  }

}
