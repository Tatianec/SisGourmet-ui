import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private employeeAdicionadoSubject = new Subject<void>();
  private apiUrl = 'http://localhost:8080/employees';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/authenticate`, {
      email,
      password,
    });
  }

  listarFuncionarios(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  criarFuncionario(employeeData: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employeeData).pipe(
      tap(() => {
        this.employeeAdicionadoSubject.next();
      })
    );
  }

  excluirFuncionario(id: number): Observable<void> {
    const deleteUrl = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(deleteUrl).pipe(
      tap(() => {
        this.employeeAdicionadoSubject.next();
      })
    );
  }

  atualizarFuncionario(id: number, employeeData: Employee): Observable<void> {
    const updateUrl = `${this.apiUrl}/${id}`;
    return this.http.put<void>(updateUrl, employeeData).pipe(
      tap(() => {
        this.employeeAdicionadoSubject.next();
      })
    );
  }

  onFuncionarioAdicionado(): Observable<void> {
    return this.employeeAdicionadoSubject.asObservable();
  }
}
