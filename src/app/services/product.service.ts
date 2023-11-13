import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, throwError, tap } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/product';

  private produtoAdicionadoSubject = new Subject<void>();

  constructor(private http: HttpClient) {}

  // Retorna a lista de produtos
  listarProdutos(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl).pipe(
      catchError(this.handleError)
    );
  }

  getProdutos(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  // Cria um novo produto
  criarProduto(produtoData: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, produtoData).pipe(
      tap(() => {
        this.produtoAdicionadoSubject.next();
      }),
      catchError(this.handleError)
    );
  }

  // Exclui um produto existente pelo ID
  excluirProduto(id: number): Observable<void> {
    const deleteUrl = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(deleteUrl).pipe(
      tap(() => {
        this.produtoAdicionadoSubject.next();
      }),
      catchError(this.handleError)
    );
  }

  // Atualiza um produto existente pelo ID
  atualizarProduto(id: number, produtoData: Product): Observable<void> {
    const updateUrl = `${this.baseUrl}/${id}`;
    return this.http.put<void>(updateUrl, produtoData).pipe(
      tap(() => {
        this.produtoAdicionadoSubject.next();
      }),
      catchError(this.handleError)
    );
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      tap(() => this.produtoAdicionadoSubject.next())
    );
  }

  // Notifica outros componentes quando um produto é adicionado, atualizado ou excluído
  onProdutoAdicionado(): Observable<void> {
    return this.produtoAdicionadoSubject.asObservable();
  }

  // Função de tratamento de erro básico
  private handleError(error: any) {
    console.error('Erro no serviço ProductService', error);
    return throwError(error);
  }
}
