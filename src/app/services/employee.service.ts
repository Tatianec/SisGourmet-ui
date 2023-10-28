import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private employeeChangeSubject = new Subject<void>();
  private apiUrl = 'http://localhost:8080/employees';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/authenticate`, {
      email,
      password,
    });
  }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  createEmployee(employeeData: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employeeData).pipe(
      tap(() => this.employeeChangeSubject.next())
    );
  }

  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.employeeChangeSubject.next())
    );
  }

  updateEmployee(id: number, employeeData: Employee): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, employeeData).pipe(
      tap(() => this.employeeChangeSubject.next())
    );
  }

  onEmployeeChange(): Observable<void> {
    return this.employeeChangeSubject.asObservable();
  }
}
