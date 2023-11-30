import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedInUserId: number | null = null;
  private apiUrl = 'http://localhost:8080/employees';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/authenticate`, {
        email,
        password,
      })
      .pipe(
        tap((response) => {
          if (response && response.success && response.data && response.data.id) {
            this.setLoggedInUserId(response.data.id);
            console.log('Usuário logado com ID:', response.data.id);
          }
        }),
        catchError((error) => {
          console.error('Erro no login:', error);
          throw error;
        })
      );
  }

  logout(): void {
    this.loggedInUserId = null;
    localStorage.removeItem('loggedUserId');
  }

  setLoggedInUserId(id: number | null): void {
    if (id !== null && id !== undefined) {
      this.loggedInUserId = id;
      localStorage.setItem('loggedUserId', id.toString());
    } else {
      console.error('Tentativa de definir ID de usuário como null ou undefined');
    }
  }

  isAuthenticated(): boolean {
    return this.loggedInUserId !== null && this.loggedInUserId !== undefined;
  }

  getUserId(): number | null {
    const storedId = localStorage.getItem('loggedUserId');
    return this.loggedInUserId ?? (storedId ? Number(storedId) : null);
  }
}
