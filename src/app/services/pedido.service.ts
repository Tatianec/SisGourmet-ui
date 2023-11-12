import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido.model';
import { AuthService } from './auth.service'; // Importar AuthService para acessar o ID do usuário logado

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private baseUrl = 'http://localhost:8080/pedido';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getCurrentUserId(): number | null{
    return this.authService.getUserId(); 
  }
  

  getPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.baseUrl);
  }

  getPedidoById(id: number): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.baseUrl}/${id}`);
  }

  addPedido(pedido: Pedido): Observable<Pedido> {
    const productIds = pedido.products.map(p => p.id_product);
    const url = `${this.baseUrl}?productIds=${productIds.join(',')}`;
    return this.http.post<Pedido>(url, pedido);
  }
  

  deletePedido(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}