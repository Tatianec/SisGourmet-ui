import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private baseUrl = 'http://localhost:8080/pedido';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getCurrentUserId(): number | null {
    return this.authService.getUserId();
  }

  getPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.baseUrl);
  }

  getPedidoById(id: number): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.baseUrl}/${id}`);
  }

// pedido.service.ts

addPedido(pedido: Pedido, productIds: number[]): Observable<Pedido> {
  const url = `${this.baseUrl}`;
  const body = { pedido, productIds };
  return this.http.post<Pedido>(url, body);
}



  deletePedido(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
