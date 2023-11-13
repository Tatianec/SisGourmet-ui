import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, map, tap } from 'rxjs';
import { Desk } from '../models/desk.model';

@Injectable({
  providedIn: 'root'
})
export class DeskService {
  private apiUrl = 'http://localhost:8080/desk';
  private deskChangeSubject = new Subject<void>();

  constructor(private http: HttpClient) {}

  getDesks(): Observable<Desk[]> {
    return this.http.get<Desk[]>(this.apiUrl);
  }

  checkIfNumberExists(nroDesk: number): Observable<boolean> {
    return this.getDesks().pipe(
      map((desks: Desk[]) => desks.some(desk => desk.nro_desk === nroDesk))
    );
  }

  createDesk(deskData: Desk): Observable<Desk> {
    return this.http.post<Desk>(this.apiUrl, deskData).pipe(
      tap(() => this.deskChangeSubject.next())
    );
  }

  onDeskChange(): Observable<void> {
    return this.deskChangeSubject.asObservable();
  }

  deleteDesk(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.deskChangeSubject.next())
    );
  }

  updateDesk(id: number, deskData: Desk): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, deskData).pipe(
      tap(() => this.deskChangeSubject.next())
    );
  }


}
