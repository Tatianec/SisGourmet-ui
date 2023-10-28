import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private loggedInUserId: number | null = null;

  setLoggedInUserId(id: number | null): void {
    if (id !== null && id !== undefined) {
      this.loggedInUserId = id;
      localStorage.setItem('loggedUserId', id.toString());
      console.log("ID de usuário definido como:", id);
    } else {
      console.error('Tentativa de definir ID de usuário como null ou undefined');
    }
}

  

  getUserId(): number | null {
    const storedId = localStorage.getItem('loggedUserId');
    return this.loggedInUserId ?? (storedId ? Number(storedId) : null);
  }
  

  logout(): void {
    this.loggedInUserId = null;
    localStorage.removeItem('loggedUserId');
  }
}
