import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:8080/product';

  private produtoAdicionadoSubject = new Subject<void>();

  constructor(private http: HttpClient) {}

  listarProdutos(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  criarProduto(produtoData: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, produtoData).pipe(
      tap(() => {
        this.produtoAdicionadoSubject.next();
      })
    );
  }

  excluirProduto(id: number): Observable<void> {
    const deleteUrl = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(deleteUrl).pipe(
      tap(() => {
        this.produtoAdicionadoSubject.next();
      })
    );
  }

  atualizarProduto(id: number, produtoData: Product): Observable<void> {
    const updateUrl = `${this.apiUrl}/${id}`;
    return this.http.put<void>(updateUrl, produtoData).pipe(
      tap(() => {
        this.produtoAdicionadoSubject.next();
      })
    );
  }

  onProdutoAdicionado(): Observable<void> {
    return this.produtoAdicionadoSubject.asObservable();
  }
}
