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

  getProductById(id: number): Observable<Product> {
    const getUrl = `${this.baseUrl}/${id}`;
    return this.http.get<Product>(getUrl).pipe(
      catchError(this.handleError)
    );
  }

  listarProdutos(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl).pipe(
      catchError(this.handleError)
    );
  }

  getProdutos(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  criarProduto(produtoData: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, produtoData).pipe(
      tap(() => {
        this.produtoAdicionadoSubject.next();
      }),
      catchError(this.handleError)
    );
  }

  excluirProduto(id: number): Observable<void> {
    const deleteUrl = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(deleteUrl).pipe(
      tap(() => {
        this.produtoAdicionadoSubject.next();
      }),
      catchError(this.handleError)
    );
  }

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

  onProdutoAdicionado(): Observable<void> {
    return this.produtoAdicionadoSubject.asObservable();
  }

  private handleError(error: any) {
    console.error('Erro no serviço ProductService', error);
    return throwError(error);
  }

  updateProductQuantity(productId: number, quantity: number): Observable<Product> {
    const url = `${this.baseUrl}/${productId}/updateQtdItems`;
    const params = { qtdItems: quantity.toString() };
  
    return this.http.patch<Product>(url, null, { params }).pipe(
      tap(() => this.produtoAdicionadoSubject.next()),
      catchError(this.handleError)
    );
  }
  
}
