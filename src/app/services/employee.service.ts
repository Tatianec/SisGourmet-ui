import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, catchError, tap, throwError } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private employeeChangeSubject = new Subject<void>();
  private apiUrl = 'http://localhost:8080/employees';

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl)
  .pipe(
    catchError((error) => {
      console.error('Error loading employees:', error);
      return throwError('Unable to load employees. Please try again later.');
    })
  );

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


  updateEmployee(id: number, produtoData: Employee): Observable<void> {
    const updateUrl = `${this.apiUrl}/${id}`;
    return this.http.put<void>(updateUrl, produtoData).pipe(
      tap(() => {
        this.employeeChangeSubject.next();
      }),
    );
  }

  onEmployeeChange(): Observable<void> {
    return this.employeeChangeSubject.asObservable();
  }
}
