// desk.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Desk } from '../models/desk.model';

@Injectable({
  providedIn: 'root'
})
export class DeskService {
  private apiUrl = 'http://localhost:8080/desk';

  private mesaAdicionadaSubject = new Subject<void>();

  constructor(private http: HttpClient) {}

  getDesks(): Observable<Desk[]> {
    return this.http.get<Desk[]>(this.apiUrl);
  }

  cadastrarMesa(mesaData: Desk): Observable<Desk> {
    return this.http.post<Desk>(this.apiUrl, mesaData).pipe(
      tap(() => {
        this.mesaAdicionadaSubject.next();
      })
    );
  }

  onMesaAdicionada(): Observable<void> {
    return this.mesaAdicionadaSubject.asObservable();
  }

  // Corrija o tipo de retorno para Observable<void>
  deleteMesa(id: number): Observable<void> {
    const deleteUrl = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(deleteUrl).pipe(
      tap(() => {
        this.mesaAdicionadaSubject.next();
      })
    );
  }


  // Corrija o tipo de retorno para Observable<void>
  updateMesa(id: number, mesaData: Desk): Observable<void> {
    const updateUrl = `${this.apiUrl}/${id}`;
    return this.http.put<void>(updateUrl, mesaData).pipe(
      tap(() => {
        this.mesaAdicionadaSubject.next();
      })
    );
  }
}
